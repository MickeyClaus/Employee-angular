FROM node:16.17.1
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@16.1.1
COPY . .
CMD ng serve --host 0.0.0.0 --disable-host-check

