import boto3

def index(event, context):
    
    response = {
        "statusCode": 200,
        "body": "Success",
        "headers": {
            "Access-Control-Allow-Origin": "*"
        }
    }

    return response