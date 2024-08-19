// netlify/functions/save-comment.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const { userComment, userName } = JSON.parse(event.body);
        const filePath = path.join(__dirname, 'comments.json');
        
        let comments = [];
        if (fs.existsSync(filePath)) {
            comments = JSON.parse(fs.readFileSync(filePath));
        }
        
        comments.push({ userName, userComment });
        fs.writeFileSync(filePath, JSON.stringify(comments));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Comment saved successfully' })
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method not allowed' })
    };
};
