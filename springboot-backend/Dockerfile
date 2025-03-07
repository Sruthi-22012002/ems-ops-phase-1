FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/springboot-backend-0.0.1-SNAPSHOT.jar /app/springboot-backend-0.0.1-SNAPSHOT.jar

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "springboot-backend-0.0.1-SNAPSHOT.jar"]
