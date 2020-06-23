from airtable import Airtable
from webapp.api.Response import Response
from webapp.api.getgenerationscounter import get_generations_counter

def get_generations_count():

    response = Response(True)

    try:
        generations_counter = get_generations_counter()['counter']

        if generations_counter is not None:

            count = generations_counter['fields']['Count']

            response.add('count', count)

    except Exception as e:
        response.status = False
        response.message = str(e)

    return response.compose()
    