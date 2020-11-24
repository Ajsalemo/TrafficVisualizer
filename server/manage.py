import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_swagger_ui import get_swaggerui_blueprint
from models import db

# Load dotenv
load_dotenv()

# Local Postgres environment
POSTGRES_USERNAME = os.getenv('POSTGRES_USERNAME')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')
# Production POstgres environment
AZURE_POSTGRES_USERNAME = os.getenv('AZURE_POSTGRES_USERNAME')
AZURE_POSTGRES_PASSWORD = os.getenv('AZURE_POSTGRES_PASSWORD')
AZURE_POSTGRES_HOST = os.getenv('AZURE_POSTGRES_HOST')
AZURE_POSTGRES_PORT = os.getenv('AZURE_POSTGRES_PORT')
AZURE_POSTGRES_DATABASE = os.getenv('AZURE_POSTGRES_DATABASE')

### Auth0 configuration ###
AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN_NAME')
API_AUDIENCE = os.getenv('AUTH0_API_AUDIENCE')
ALGORITHMS = os.getenv('AUTH0_ALGORITHMS')
AUTH0_FORMATTED_ALGS = ["{ALGORITHMS}"]
############################

app = Flask(__name__)
cors = CORS(app)

### Swagger specific ###
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "TrafficVisualizer"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
### End swagger specific ###


# Local connection string
local_conn_str = f"postgresql://{POSTGRES_USERNAME}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}"
# Production connection string
prod_conn_str = f"postgresql://{AZURE_POSTGRES_USERNAME}:{AZURE_POSTGRES_PASSWORD}@{AZURE_POSTGRES_HOST}:{AZURE_POSTGRES_PORT}/{AZURE_POSTGRES_DATABASE}"

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = prod_conn_str
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
