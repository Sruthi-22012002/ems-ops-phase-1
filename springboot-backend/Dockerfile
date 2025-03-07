 # Use OpenJDK 17 as the base image
     FROM openjdk:17-jdk-slim

     # Set the working directory
     WORKDIR /app

	# Copy the compiled JAR file into the container
	COPY ./target/springboot-backend-0.0.1-SNAPSHOT.jar app.jar

    # Expose the port that the backend service will listen to
     EXPOSE 8080

    # Run the Spring Boot application
    CMD ["java", "-jar", "app.jar"]

