# Build environment
FROM node:12.19.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --silent 
RUN yarn global add react-scripts@4.0.0
COPY . ./
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
# Overwriting the containers NGINX conf with our NGINX conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./init_container.sh /opt
COPY sshd_config /etc/ssh/
# ----------------------------------------------------------------- #
# Use this to add SSH 
# Start and enable SSH
# Set the working directory to /etc/ssh and generate SSH keys 
WORKDIR /etc/ssh/
RUN apk add openssh \
     && echo "root:Docker!" | chpasswd \
     && chmod +x /opt/init_container.sh \
     && ssh-keygen -A

# ----------------------------------------------------------------- #
# Expose needed ports
EXPOSE 8080 2222

ENTRYPOINT [ "/opt/init_container.sh" ] 