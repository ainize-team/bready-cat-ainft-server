FROM node:16.14.2-slim

EXPOSE 3000

# > Install node packages
WORKDIR /app
RUN npm install -g npm@latest
ADD package*.json /app/
RUN npm install

# > ADD file
ADD ./src /app/src
ADD ./resource/cat /app/resource/cat
RUN mkdir -p /app/resource/tmp

CMD ["npm", "start"]
