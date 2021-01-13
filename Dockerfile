# We build from an official Node image from Docker
FROM node:14-buster-slim

# Create app directory
# This will create /app folder inside the image
# Everything from here will be copied to /app
WORKDIR /app

# Install app dependencies
# Copy our source code into the image
COPY . ./

# Install all dependencies
# This will create a node_modules folder inside docker image
RUN ./build.sh

WORKDIR /app/server

#Expose the port that our Node Express server will run
EXPOSE 3001

# Define the runtime command
# This will execute when we run our docker image
CMD ["node", "index.js"]
