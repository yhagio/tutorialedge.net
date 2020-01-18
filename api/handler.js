'use strict';
const fs = require('fs');

module.exports.endpoint = (event, context, callback) => {
  
    let image = fs.readFileSync("test.png")

    let imageBase64 = image.toString('base64')
    
    const response = {
        statusCode: 200,
        body: imageBase64,
        headers: {
            'Content-Type': 'image/png'
        },
        isBase64Encoded: true
    };

    callback(null, response);
  
};