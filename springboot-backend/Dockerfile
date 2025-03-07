FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY springboot-backend-0.0.1-SNAPSHOT.jar /app/application.jar

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "application.jar"]
