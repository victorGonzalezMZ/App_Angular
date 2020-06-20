FROM node AS builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/angular_app
COPY ./ /usr/src/angular_app

RUN npm install
RUN $(npm bin)/ng build --prod --aot

FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/src/angular_app/dist/app-dashborad/ /usr/share/nginx/html
EXPOSE 80 443

CMD nginx -g 'daemon off;'