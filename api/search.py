import boto3

def search(event, context):

    response = {
        "statusCode": 200,
        "body": "Hello World",
        'headers': {
            'Access-Control-Allow-Origin': '*"'
        }
    }

    return response