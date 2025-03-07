# Base image java 17
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/*.jar /app/application.jar

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "application.jar"]
