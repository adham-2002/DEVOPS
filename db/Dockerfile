# Custom MongoDB Image with Init Script
FROM mongo:latest

# Copy initialization script
COPY ./init-mongo.js /docker-entrypoint-initdb.d/

# Set permissions
RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.js