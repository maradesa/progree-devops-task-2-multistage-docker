# Stage 1: Build the website
FROM node:alpine AS builder

ARG APP_ENV=development
ENV APP_ENV=$APP_ENV

WORKDIR /app

COPY package.json build.js ./

RUN npm run build


# Stage 2: Secure production image
FROM nginx:alpine

# Create a dedicated non-root user
RUN addgroup -S webgroup && adduser -S -D -H -G webgroup webuser

# Copy the generated website
COPY --from=builder /app/dist /usr/share/nginx/html

# Install our custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Use the dedicated user
USER webuser

# Nginx listens on port 8080
EXPOSE 8080
