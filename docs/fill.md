# Happyflow Fill Command

The `happyflow fill` command is used to populate a new project folder with the necessary boilerplate code and configuration files. It does so based on a user-provided description of the desired program. 

## Example Usage

Here's an example of how the `happyflow fill` command might be used:

```
happyflow fill
? Explain your program in a few words:   Microservice called genres. It is going to be implemented with Flask. It should have three routes: POST /genre, GET /genres DELETE /genre/{id} . It should have deployment and service Kubernetes config files. It should produce genre_created and genre_removed events on Kafka.
```

## Output

After running the `happyflow fill` command with the above description, it will create the following structure:

```
.
├── app.py
├── deployment.yaml
├── response.json
└── service.yaml
```

In this example, `app.py` is the main Flask application file that contains the three routes (POST /genre, GET /genres, DELETE /genre/{id}). `deployment.yaml` and `service.yaml` are Kubernetes configuration files for deploying and servicing the microservice. The microservice will produce `genre_created` and `genre_removed` events on Kafka which is handled by the logic inside `app.py`. `response.json` could be a file used to structure the responses from the Flask routes.
