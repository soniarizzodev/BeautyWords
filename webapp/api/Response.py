from flask import jsonify

class Response():
    """API Response Manager
    """

    def __init__(self, status, message=''):
        """Response object constructor

        Params:
            status (boolean) - Response status
            message (string) - Response status message
        """
        self.status = status
        self.message = message
        self.data = {}

    def add(self, key, data):
        """Add data to the response

        Params:
            key (string) - Keyword for new data
            data (object) - New data
        """
        self.data[key] = data

    def compose(self):
        """Create a response json object

        Return:
            jwonifyed response
        """

        response = {
                'status': self.status,
                'message': self.message,
                'data': self.data
                }

        return jsonify(response)
