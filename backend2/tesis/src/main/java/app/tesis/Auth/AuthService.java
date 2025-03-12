package app.tesis.Auth;

import app.tesis.Jwt.JwtService;
import app.tesis.User.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import java.io.IOException;
import java.security.GeneralSecurityException;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final GoogleIdTokenVerifier verifier;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user=userRepository.findByEmail(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        Role role = userService.getRolUser(token);
        return AuthResponse.builder()
            .token(token)
                .role(role)
                .userId(Long.valueOf(user.getId()))
                .firstName(user.getFirstname())
                .lastName(user.getLastname())
                .userName(user.getUsername())
                .email((user.getEmail()))

            .build();

    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getUsername()).isPresent()) {
            throw new RuntimeException("El correo electrónico ya está registrado.");
        }
        User user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode( request.getPassword()))
            .firstname(request.getFirstname())
            .lastname(request.lastname)
                .email(request.getUsername())
            .role(Role.USER)
                .authProvider(AuthProvider.MANUAL)
            .build();

        userRepository.save(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
                .role(user.getRole())
                .userId(Long.valueOf(user.getId()))
                .firstName(user.getFirstname())
                .lastName(user.getLastname())
                .userName(user.getUsername())
                .email(user.getEmail())
            .build();

    }

    public AuthResponse googleLogin(GoogleLoginRequest googleRequest) throws GeneralSecurityException, IOException {
        GoogleIdToken idToken = verifier.verify(googleRequest.getIdToken());
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String username = (String) payload.get("name");

            // Busca al usuario en la base de datos
            User user = userRepository.findByEmail(email).orElseGet(() -> {
                // Si no existe, lo registra automáticamente
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setUsername(username);
                newUser.setAuthProvider(AuthProvider.GOOGLE);
                newUser.setRole(Role.USER);
                return userRepository.save(newUser);
            });

            // Genera el token JWT
            String token = jwtService.getToken(user);
            return AuthResponse.builder()
                    .token(jwtService.getToken(user))
                    .role(user.getRole())
                    .userId(Long.valueOf(user.getId()))
                    .firstName(user.getFirstname())
                    .lastName(user.getLastname())
                    .userName(user.getUsername())
                    .email(user.getEmail())
                    .build();
        } else {
            throw new RuntimeException("Google ID Token inválido");
        }
    }


}
