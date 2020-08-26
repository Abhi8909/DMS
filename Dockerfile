# Use the node 12
FROM node:12

# Set the port to 3000
ENV PORT=3000

# Expose the port so we can access the container
EXPOSE ${PORT}

# Create a repo in the home folder of the user node and make sure to chown to node
RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

# Set the working directory 
WORKDIR /home/node/app

# Copy both lock and package file and chown to node
COPY --chown=node:node package*.json ./

# Run everything using the node user
USER node

# Install the dependencies and clean the cache, we may want to add the ignore devDependencies
RUN npm install && npm cache clean --force --loglevel=error


# Copy the src folder to the app folder
COPY --chown=node:node src /home/node/app/src

# Run the app.js
CMD [ "node", "src/app.js"]