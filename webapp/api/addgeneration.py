from airtable import Airtable
from webapp.api.Response import Response
from webapp.api.getgenerationscounter import get_generations_counter

def add_generation():

    response = Response(True)

    try:
        gen_counter_info = get_generations_counter()

        generations_counter = gen_counter_info['counter']

        airtable = gen_counter_info['table']

        if generations_counter is not None:

            count = generations_counter['fields']['Count']

            count = count + 1

            airtable.update(generations_counter['id'], {'Count' : count}, typecast = True)

    except Exception as e:
        response.status = False
        response.message = str(e)

    return response.compose()
    