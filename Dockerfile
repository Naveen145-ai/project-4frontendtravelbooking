FROM node:alphine3.21 as build

#Build App

WORKDIR /App
copy package.json .
RUN npm install
copy . . .
RUN npm run build

#SERVER with Nginx

FROM n:1.29-alphine-perl
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]