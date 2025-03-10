# Stage 1: Build the JAR using Maven
FROM maven:3.8.3-openjdk-17 AS maven_builder

WORKDIR /app
COPY . .  # Copy all source files to container

RUN mvn clean install -DskipTests  # Build the project
RUN mv target/*.jar target/application.jar  # Rename the JAR file

# Stage 2: Extract dependencies
FROM openjdk:17-jdk-alpine AS builder

WORKDIR /app
COPY --from=maven_builder /app/target/application.jar ./  # Copy built JAR
RUN java -Djarmode=layertools -jar application.jar extract  # Extract layers

# Stage 3: Run the application
FROM openjdk:17-jdk-alpine

WORKDIR /app
COPY --from=builder /app/dependencies/ ./  # Copy dependencies
COPY --from=builder /app/spring-boot-loader/ ./  # Copy Spring Boot loader
COPY --from=builder /app/snapshot-dependencies/ ./  # Copy snapshot dependencies
COPY --from=builder /app/application/ ./  # Copy application classes

EXPOSE 8080
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]

