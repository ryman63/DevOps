FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app
COPY . .
RUN ./gradlew clean build -x test --no-daemon

CMD ["java", "-jar", "build/libs/DevOps-1.0-SNAPSHOT.jar"]
