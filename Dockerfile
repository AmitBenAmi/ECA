FROM node:12.13.0

RUN npm install -g @angular/cli
RUN ng build

WORKDIR /dist

CMD ng serve --host 0.0.0.0