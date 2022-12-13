FROM node:16.18.1-slim

# > Install node packages
WORKDIR /app
RUN npm install -g npm@latest
ADD package*.json /app/
RUN npm install

# > Copy file
ADD ./src /app/src

EXPOSE 3000

CMD ["npm", "start"]
