from airtable import Airtable
from webapp.constants import AIRTABLE_BASE_ID

def get_generations_counter():

    result = None
    
    airtable = Airtable(AIRTABLE_BASE_ID, 'GenerationsCounter')

    generations_counter = airtable.match('Name', 'Generations')

    if generations_counter:

        result = {'table': airtable, 'counter' : generations_counter}

   
    return result
    