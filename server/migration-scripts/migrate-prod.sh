#!/bin/bash
echo "Running post build migrations"
# Initialize the database(if needed)
flask db init 
# Run migrations
flask db migrate 
# Run upgrades(if any)
flask db upgrade 
echo "Applied post build migrations"
