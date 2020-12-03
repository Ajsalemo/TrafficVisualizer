FROM python:3.8-slim
WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY ./ /app

EXPOSE 8000
CMD ["gunicorn"  , "-b", "0.0.0.0:8000", "app:app"]