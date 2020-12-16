#!/bin/sh
set -e

echo "Starting SSH ..."
service ssh start

# Start Gunicorn
exec gunicorn -b 0.0.0.0:8000 app:app