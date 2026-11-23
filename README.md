
# Multi-Stage Docker Website

## Project Overview

This project demonstrates how to build and deploy a website using a multi-stage Docker build.

The goal is to separate the application build environment from the production runtime environment, exclude unnecessary dependencies, and apply basic container security practices.

## Technologies Used

- Docker
- Docker Compose
- Node.js
- Nginx
- Alpine Linux

## Project Structure

```text
multistage-project/
├── nginx/
│   └── nginx.conf
├── build.js
├── package.json
├── Dockerfile
├── .dockerignore
├── compose.yaml
└── README.md
```

## Multi-Stage Build

The Dockerfile uses two stages.

### Stage 1: Builder

- Uses Node.js Alpine.
- Copies the application build files.
- Runs the build script.
- Generates the website inside the `dist` directory.

### Stage 2: Production

- Uses Nginx Alpine.
- Copies only the generated website from the builder stage.
- Uses a custom Nginx configuration.
- Runs Nginx as a dedicated non-root user.

This keeps Node.js and the build environment out of the final production image.

## Build the Image

```bash
sudo docker build --build-arg APP_ENV=production -t multistage-website:nonroot .
```

## Run with Docker

```bash
sudo docker run -d --name nonroot-test -p 8085:8080 multistage-website:nonroot
```

Access the website at:

http://localhost:8085

## Docker Compose

Start the service:

```bash
sudo docker compose up -d
```

Check its status:

```bash
sudo docker compose ps
```

Stop and remove the service:

```bash
sudo docker compose down
```

## Security Practices

### Non-root execution

A dedicated user named `webuser` was created in the production image.

The running container was verified using:

```bash
sudo docker exec compose-website id
```

Expected identity:

```text
uid=100(webuser) gid=102(webgroup) groups=102(webgroup)
```

### BuildKit secrets

A temporary BuildKit secret mount was tested during the build process. The secret was not copied into the final image.

### Dockerignore

The `.dockerignore` file excludes environment files and files containing secret-related names from the build context.

## Verification

The following checks were performed:

1. Built the multi-stage Docker image successfully.
2. Confirmed Node.js was not available in the production container.
3. Verified that the container runs as `webuser`, not root.
4. Confirmed Nginx serves the website successfully.
5. Verified that the production environment is displayed.
6. Deployed the image using Docker Compose.

## Learning Outcomes

This project provided practical experience with:

- Multi-stage Docker builds.
- Separating build-time and runtime dependencies.
- Docker image inspection.
- Build-time environment configuration.
- BuildKit secret handling.
- Non-root container execution.
- Custom Nginx configuration.
- Docker port mapping and Compose deployment.

# Multi-Stage Docker Website

