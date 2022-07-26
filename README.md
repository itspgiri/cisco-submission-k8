##  Introduction

This was the final automation task, in which we were needed to use all the concepts that we learnt through the IaC and Dockers sessions hosted during the CISCO Women in Cyber Security BOOST 2.0 Program.

## Task Details:
Hey everyone,
Here is the final assessment question.

**Part 1:**
Create a container image that does the following:

    1. Runs an API server
    2. Serves a path / that responds to
            a. GET
                    i. with 200 OK text "CWiCS Assessment"
    3. Serves a path /cc that responds to
            a. GET
                    i. With 200 OK text "POST to this endpoint with JSON to convert to YAML"
            b. POST body of any valid JSON
                    i. Sends POST to service-counter at /count with empty body to expect a 200 OK
                    ii. Sends POST to service-converter at /convert with the input JSON
                    iii. Responds with the output and status code of service-converter
            c. POST body of anything else (invalid JSON)
                    i. Any non 2xx error code (4xx/5xx)
    4. Write terraform templates to build the container image

**Part 2:**

    Create k8s manifests that will deploy the following:
    1. Deployment and service for service-converter with label selector component="converter"
            a. With the env for the pod
                    i. SERVE_PATH set to "convert"
                    ii. PART_OF set to "CWiCS"
            b. PART_OF should be mounted from a ConfigMap
            c. Replica set to 2
    2. Deployment and service for service-counter with persistent volume (claim 1GB) at /data with label selector component="counter"
            a. With the env for the pod
                    i. FILENAME set to "dump.txt"
                    ii. IDENTITY set to <your-github-username>
                    iii. SERVE_PATH set to "count"
                    iv. PART_OF set to "CWiCS"
            b. PART_OF should be mounted from a ConfigMap
            c. IDENTITY should be set using Secrets (Secrets should not be committed to a repo directly, but for this assignment, please do)
    3. Deployment and service for the above created container with label selector component="api". 
    4. Ingress for the 3rd deployment/service above at <your-github-username>.example.com with HTTP

Remember to label all related objects (deployment, podspec, service and ingress). For configmap and secret, label it with component=config. Use creative names for the resources for bonus points :)

Use your github username for the namespace on all resources. You do not need to create a namespace yourself

**Reference:**

 - Images: Both images listen on 8080 
 - service-counter:
   ghcr.io/adyanth/docker-k8s-final-assessment:counter-latest
  - service-converter:
   ghcr.io/adyanth/docker-k8s-final-assessment:converter-latest Fork
   this repo to start working on your submission:
   https://github.com/adyanth/docker-k8s-submission-template. 
   - This will build the containers for you based on the Dockerfile have.

## Running the Express App

We'll  initially first build the image from our docker file.

    docker build -t express-app .

Creating a writeable container layer over the  image

    docker run -it -d -p 3000:3000 express-app
## Run Manifests

Using minikube, the Docker driver allows us to install Kubernetes into an existing Docker.

    minikube start --driver docker

We'll use kubectl to create pods.

    kubectl apply -f config.yaml
    kubectl apply -f secret.yaml
    kubectl apply -f service-converter.yaml
    kubectl apply -f service-container.yaml

## Important Links

 - Link Report: [Link here](https://docs.google.com/document/d/1uVHJLEZDdnes1gSwPpANSfoz-ufzYkcdwadIFVkgwao/edit?ouid=105452273350412625466&usp=docs_home&ths=true)
 -   Final Submission: [Link here](https://github.com/itspgiri/cisco-submission-k8) 
-  Original Submission: [Link here](https://github.com/itspgiri/docker-k8s-submission-template)

> Submission by Priyanka Giri





