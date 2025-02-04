FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY src/app/Backend/pom.xml .
RUN mvn dependency:go-offline
COPY src/app/Backend/src ./src
RUN mvn clean package -DskipTests

#FROM amazoncorretto:17
#WORKDIR /app
#COPY --from=build /build/target/*.jar app.jar
#EXPOSE 8081
#ENTRYPOINT ["java", "-jar", "app.jar"]

FROM amazoncorretto:17  
WORKDIR /app  
COPY --from=build /build/target/*.jar app.jar  
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]