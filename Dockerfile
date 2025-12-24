
# build environment
FROM node:22-alpine as build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --network-timeout 1000000
RUN yarn build

# production environment
FROM nginxinc/nginx-unprivileged:1.29-alpine

# Non root user
ENV NGINX_USER_ID=101
ENV NGINX_GROUP_ID=101
ENV NGINX_USER=nginx


RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=$NGINX_USER:$NGINX_USER --from=build /app/nginx.conf /etc/nginx/conf.d/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --chown=$NGINX_USER:$NGINX_USER --from=build /app/dist .

USER $NGINX_USER_ID
EXPOSE 8080

ENTRYPOINT sh -c "./vite-envs.sh && nginx -g 'daemon off;'"
