# Étape 1 : Utiliser l'image officielle OpenJDK 17
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers Maven nécessaires (le wrapper et le POM)
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Résoudre les dépendances Maven
RUN ./mvnw dependency:resolve

# Copier le code source
COPY src ./src

# Construire l'application (en utilisant Maven)
RUN ./mvnw clean package -DskipTests

# Exposer le port de l'application backend
EXPOSE 8080

# Lancer l'application avec Java en spécifiant le chemin absolu du fichier JAR
CMD ["java", "-jar", "target/*.jar"]
