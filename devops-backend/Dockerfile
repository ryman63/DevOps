FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Копируем JAR
COPY build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]