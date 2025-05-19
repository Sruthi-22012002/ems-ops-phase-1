##  Daemonize the services
### 1. Java Backend
* Move out of the project file
  ![image](https://github.com/user-attachments/assets/588ef971-ffe2-4909-823c-f2cec297c1aa)
  * create a /opt/java-backend folder
  * Copy the backend *.jar file to this folder
  * Move to backend folder, run this commands
    ```bash
    mvn clean install
    ```
    ![image](https://github.com/user-attachments/assets/a2a9cd3d-8b23-435d-a4a5-698167105048)
 * open the target folder and copy the *.jar file to opt/java-backend folder
     ```bash
     sudo cp -r /home/sruthi/ems-ops-phase-0/springboot-backend/target/springboot-backend-0.0.1-SNAPSHOT.jar /home/sruthi/opt/java-backend/
     ```
* Create a app_ems.service to  created service file under /etc/systemd/system/
  
 ```bash
 sudo nano /etc/systemd/system/app_ems.service
  ```
 * Paste this code :
      ```bash
       [Unit]
        Description=StudentsystemApplication Java service
        After=syslog.target network.target
        
        [Service]
        SuccessExitStatus=143
        User=sruthi //Os username
        Type=simple
        Restart=on-failure
        RestartSec=10
        
        WorkingDirectory=/opt/java-backend/
        ExecStart=/usr/bin/java -jar springboot-backend-0.0.1-SNAPSHOT.jar
        ExecStop=/bin/kill -15 $MAINPID
        
        [Install]
        WantedBy=multi-user.target
        ```
* Daemon Reload & systemctl cmd
   ```bash
    sudo systemctl daemon-reload
    sudo systemctl start app_ems.service
    systemctl status app_ems.service
  ```
### 2. Frontend
* create a folder opt/react-backend
      ```bash
       mkdir opt/react-backend
      ```
  * move to frontend folder
    > ~/ems-ops-phase-0/react-hooks-frontend$
  * start the application
    ```bash
       npm run build
    ```
> After build the application, build/ folder is created inside the frontend
![image](https://github.com/user-attachments/assets/4019dde1-a0c9-4be8-be46-708f4d828df9)
* Move the folder to /opt/react-backend folder
   ```bash
     sudo cp -r /home/sruthi/ems-ops-phase-0/react-hooks-frontend/build/ /home/sruthi/opt/react-backend/
     ```
* Install Serve node package
   ```bash
   npm install -g serve
   ```
* Create systemD service for frontend
 ```bash
  sudo nano /etc/systemd/system/reactapp_ems.service
```
* Paste this code :
   ```bash
        [Unit]
        Description=StudentsystemApplication React service
        After=syslog.target network.target
        
        [Service]
        SuccessExitStatus=143
        User=sruthi // os username
        Type=simple
        Restart=on-failure
        RestartSec=10
        
        WorkingDirectory=/opt/react-backend/
        ExecStart=serve -s build
        ExecStop=/bin/kill -15 $MAINPID
        
        [Install]
        WantedBy=multi-user.target
    ```
* Daemon Reload & systemctl cmd
  ```bash
    sudo systemctl daemon-reload
    sudo systemctl start reactapp_ems.service
    systemctl status reactapp_ems.service
  ```  
> Both frontend and backend daemonize
  ![image](https://github.com/user-attachments/assets/28174231-172e-4cea-8665-3696bade7e5e)

  
## Dockerize the file
### 1.  react-hooks-frontend
Create a Dockerfile file inside /ems-ops-phase-0/react-hooks-frontend/ folder
    ```bash
    Sudo nano Dockerfile
    ```
  paste this : 
   ```bash
        FROM node:16 AS build

        WORKDIR /app

      # Copy local node_modules to avoid network dependency issues
        COPY package.json package-lock.json ./
       RUN npm config set timeout 600000 \
       && npm config set registry https://registry.npmmirror.com \
      && npm config set strict-ssl false

    COPY . .
    RUN npm install --offline || npm install --legacy-peer-deps --force

    RUN npm run build

    FROM nginx:alpine
    COPY --from=build /app/build /usr/share/nginx/html
   EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
 ```
### 2.  springboot-backend
Create a Dockerfile file inside /ems-ops-phase-0/springboot-backend/ folder
    ```bash
    Sudo nano Dockerfile
    ```
  paste this : 
   ```bash
       # Use OpenJDK 17 as the base image
        FROM openjdk:17-jdk-slim

        # Set the working directory
        WORKDIR /app

        # Copy the JAR file of the Spring Boot application (after building it locally)
        COPY target/springboot-backend-0.0.1-SNAPSHOT.jar app.jar

       # Expose the port that the backend service will listen to
        EXPOSE 8080

       # Run the Spring Boot application
       CMD ["java", "-jar", "app.jar"]
 ```
### 3. docker-compose.yml
create a docker-compose.yml in /ems-ops-pahse-0/ folder
```bash
    Sudo nano docker-compose.yml
    ```
```bash
    version: '3.8'

services:
  # React Frontend Service
  frontend:
    build:
      context: ./react-hooks-frontend
      dockerfile: Dockerfile
    ports:
      - "3002:80"  # React will be served on port 3000
    networks:
      - frontend_network
    depends_on:
      - backend

  # Spring Boot Backend Service
  backend:
    build:
      context: ./springboot-backend
      dockerfile: Dockerfile
    ports:
      - "8081:8080"  # Spring Boot app on port 8080
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://database:3306/employees
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: 0612
    depends_on:
      - database
    networks:
      - frontend_network
      - backend_network

  # MySQL Database Service
  database:
    image: mysql:8
    environment:
      MYSQL_DATABASE: employees
      MYSQL_ROOT_PASSWORD: 0612
    ports:
      - "3307:3306"  # Database accessible on port 3306 (optional)
    volumes:
      - mysql-data:/var/lib/mysql  # Persistent volume for database
    networks:
      - backend_network

# Network Configuration to Isolate Services
networks:
  frontend_network:
    driver: bridge
  backend_network:
    driver: bridge

# Persistent Volume for MySQL Database
volumes:
  mysql-data:
    driver: local
```
### To build the compose file
  ```bash
  docker-compose build
```
### To compose the application
 ```bash
  docker-compose up -d
```
> ## Finally application dockerize and run : 
![image](https://github.com/user-attachments/assets/e2df7c4d-09d4-4bfd-b0db-fbe5e9ecc317)

> ## ⚠️ **Notes:** Attach local volume to Database container in docker-compose.yml file.


