'use strict';
const fs = require('fs');

async function returnImage(path) {
    let image = fs.readFileSync(path)
    let imageBase64 = image.toString('base64')
    return imageBase64
}


module.exports.endpoint = async (event, context, callback) => {
  
    let imageBase64 = await returnImage("test.png")
    
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