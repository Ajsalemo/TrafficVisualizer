#!/bin/bash
# Simple migration script to save some keystrokes
pipenv shell 
# Initialize the database(if needed)
flask db init 
# Run migrations
flask db migrate 
# Run upgrades(if any)
flask db upgrade 
# Start Flask after migrations
export FLASK_ENV=development 
export FLASK_APP=app.py 
echo "Flask App is set to $FLASK_APP in an $FLASK_ENV environment" && \
flask run