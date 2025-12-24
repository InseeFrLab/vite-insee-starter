
# build environment
FROM node:22-alpine as build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --network-timeout 1000000
RUN yarn build

# production environment
FROM nginxinc/nginx-unprivileged:1.29-alpine

# Define non-root user variables
ENV NGINX_USER_ID=101
ENV NGINX_GROUP_ID=101
ENV NGINX_USER=nginx

# Temporarily switch to root to install dependencies and configure Nginx
USER root

# Remove default Nginx config and replace it with our own
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf  
COPY --from=build /app/dist /usr/share/nginx/tmp_html/

# Generating /entrypoint.sh  
# Be mindful that the entrypoint is generated a build time but the 
# bash code is executed at container startup.
RUN echo $'#!/bin/sh                    \n\
cd /usr/share/nginx                     \n\
rm -rf ./html/* ./html/.* 2>/dev/null   \n\
cp -r ./tmp_html/. ./html/              \n\
./html/vite-env.sh                      \n\
exec nginx -g "daemon off;"             \n\
' > /usr/share/nginx/entrypoint.sh

# Ensure non-root user has ownership of necessary directories
RUN chown -R $NGINX_USER_ID:$NGINX_GROUP_ID /usr/share/nginx /usr/share/nginx/entrypoint.sh && \
    chmod +x /usr/share/nginx/entrypoint.sh

# Switch back to non-root user for security
USER $NGINX_USER_ID
EXPOSE 8080

# Run the entrypoint script
ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]
