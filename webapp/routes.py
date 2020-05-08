"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from webapp import app

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/privacy')
def privacy():
    """Renders the about page."""
    return render_template(
        'privacy.html',
        title='Privacy and Cookie policy',
        year=datetime.now().year,
        message='Privacy and Cookie policy.'
    )
