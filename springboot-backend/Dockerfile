FROM openjdk:17-jdk

WORKDIR /app

# Copy JAR file and rename it directly
COPY target/*.jar application.jar

# Expose the required port
EXPOSE 8080

# Set the command to run the application
CMD ["java", "-jar", "application.jar"]

