
# build environment
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

# production environment
FROM nginxinc/nginx-unprivileged:1.25-alpine

# Non root user
ENV NGINX_USER_ID=101
ENV NGINX_GROUP_ID=101
ENV NGINX_USER=nginx

USER $NGINX_USER_ID

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf    
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
ENTRYPOINT sh -c "./vite-envs.sh && nginx -g 'daemon off;'"