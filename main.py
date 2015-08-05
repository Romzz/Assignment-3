import webapp2
from google.appengine.ext import ndb
import jinja2
import os
import logging

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class CreateStudentPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

app = webapp2.WSGIApplication([
    ('/', CreateStudentPage)
], debug=True)