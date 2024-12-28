FROM openjdk:17-jdk-slim


#Repertoire de travail
WORKDIR / app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency : resolve

COPY src ./src

RUN ./mvnw  package -DskipTests


EXPOSE 8080

#Command

CMD [ "java", -"jar", "target/*jar"]