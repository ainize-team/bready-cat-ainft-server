FROM node:16.14.2-slim

EXPOSE 3000

# > Install node packages
WORKDIR /app
RUN npm install -g npm@latest
ADD package*.json /app/
RUN npm install

# > ADD file
ADD ./src /app/src
RUN mkdir -p /app/resource/tmp
ADD ./resource/tmp/allblack.png /app/resource/tmp
ADD ./resource/tmp/chaos.png /app/resource/tmp
ADD ./resource/tmp/cheese.png /app/resource/tmp
ADD ./resource/tmp/mackerel.png /app/resource/tmp
ADD ./resource/tmp/milkcow.png /app/resource/tmp
ADD ./resource/tmp/threecolor.png /app/resource/tmp
ADD ./resource/tmp/tuxedo.png /app/resource/tmp

CMD ["npm", "start"]
