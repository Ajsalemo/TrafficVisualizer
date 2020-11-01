# Build environment
FROM node:12.19.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --silent 
RUN yarn global add react-scripts@4.0.0
COPY . ./
RUN chown -R node:node /app
USER node
RUN yarn build

# Production environment
FROM nginx:stable-alpine
# Add metadata by LABEL
LABEL version="1.0" \
    isProduction="true" \
    description="Visualize Traffic Data" \
    maintainer="Anthony Salemo"
# Copy built files from the first stage
COPY --from=build /app/build /usr/share/nginx/html
# New
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
## Add permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
## Switch to non-root user
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]