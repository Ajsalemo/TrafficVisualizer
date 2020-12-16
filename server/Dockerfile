FROM python:3.8-slim
WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY ./ /app

# COPY sshd_config /etc/ssh/
COPY init_container.sh /opt/
COPY sshd_config /etc/ssh/

# Start and enable SSH
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
	&& apt-get install -y --no-install-recommends openssh-server \
	&& echo "$SSH_PASSWD" | chpasswd \
    && chmod u+x /opt/init_container.sh

EXPOSE 8000 2222
# CMD ["gunicorn"  , "-b", "0.0.0.0:8000", "app:app"]
ENTRYPOINT [ "/opt/init_container.sh" ] 