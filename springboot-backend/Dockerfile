FROM openjdk:17-jdk
WORKDIR /app
COPY target/*.jar target/application.jar
RUN mv target/*.jar target/application.jar
CMD ["java", "-jar", "target/application.jar"]

