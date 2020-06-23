import datetime
from airtable import Airtable
from webapp.api.Response import Response
from webapp.constants import PAGE_TABLES
from webapp.constants import AIRTABLE_BASE_ID

def add_visit(page_id):

    response = Response(True)

    try:
        airtable = Airtable(AIRTABLE_BASE_ID, PAGE_TABLES[int(page_id)])

        today = datetime.date.today().strftime("%d-%m-%Y")

        existing_day = airtable.match('Date', today)

        if existing_day:

            visits = existing_day['fields']['Visits']

            visits = visits + 1

            airtable.update(existing_day['id'], {'Visits' : visits}, typecast = True)

        else:        

            new_record = {'Date' : today, 'Visits' : 1}

            airtable.insert(new_record)

    except Exception as e:
        response.status = False
        response.message = str(e)

    return response.compose()
    