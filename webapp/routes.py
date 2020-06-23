"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from webapp import app

from webapp.api.getgenerationscount import get_generations_count
from webapp.api.addgeneration import add_generation
from webapp.api.addvisit import add_visit
from webapp.api.Response import Response

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page and updates the visits counter."""
    add_visit(0)

    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/hall-of-fame')
def hall_of_fame():
    """Renders the supporters hall of fame page and updates the visits counter."""
    add_visit(1)

    return render_template(
        'hall_of_fame.html',
        title='Supporters Hall Of Fame',
        year=datetime.now().year,
    )

@app.route('/privacy')
def privacy():
    """Renders the privacy page and updates the visits counter."""
    add_visit(2)

    return render_template(
        'privacy.html',
        title='Privacy and Cookie policy',
        year=datetime.now().year,
        message='Privacy and Cookie policy.'
    )

# WEB APIs
@app.route('/getgenerationscount')
def getgenerationscount():
    """Returns generations count from Airtable."""
    return get_generations_count()

@app.route('/addgeneration')
def addgeneration():
    """Updates the generations count on Airtable."""
    return add_generation()
