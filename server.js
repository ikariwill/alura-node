const http = require('http');

const server = http.createServer(function (req, res){
    let html;
    if(req.url == '/') {
        html = `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Casa do código</h1>
                </body>
            </html>
        `;
    } else if(req.url == '/livros') {
        html = `
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Livros</h1>
            </body>
        </html>
    `;
    }
    res.end(html);
});
server.listen(3000);