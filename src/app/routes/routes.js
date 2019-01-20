const LivroDao =  require('../dao/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send(
            `
                <html>
                    <head>
                        <title>Início</title>
                    </head>
                    <body>
                        <h1>Início</h1>
                    </body>
                </html>
            `
        );
    });
    
    app.get('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => {
                    res.marko(
                        require('../views/livros/lista/lista.marko'), {livros}
                    );
                }
            )
            .catch(err => console.log(err));
    });

    app.get('/livros/cadastro', (req, res) => {
        res.marko(
            require('../views/livros/form/form.marko')
        );
    });

    app.post('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        livroDao.inserir(req.body)
            .then(res.redirect('/livros'))
            .catch(err => console.log(err));
    });
};