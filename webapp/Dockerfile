FROM openjdk:11

ENV SA_LOGIC_API_URL=https://localhost:5000

ADD target/webapp-0.0.1-SNAPSHOT.jar /

EXPOSE 8080

CMD ["java", "-jar", "webapp-0.0.1-SNAPSHOT.jar", "--sa.logic.api.url=${SA_LOGIC_URL}"]