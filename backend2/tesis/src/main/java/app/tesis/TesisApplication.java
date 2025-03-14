package app.tesis;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TesisApplication {

    static {
        // Cargar variables del archivo .env en variables de entorno del sistema
        Dotenv dotenv = Dotenv.load();
        dotenv.entries().forEach(entry ->
                System.setProperty(entry.getKey(), entry.getValue())
        );
    }

    public static void main(String[] args) {
        SpringApplication.run(TesisApplication.class, args);
    }
}
