"""
This script runs the BeautyWords application using a development server.
"""

from os import environ
from webapp import app
from webapp.constants import HEROKU_DEPLOY

def start():
    HOST = environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555
    app.run(HOST, PORT)

if __name__ == '__main__':
    if HEROKU_DEPLOY:
        app.run(port=5000)
    else:
        start()
