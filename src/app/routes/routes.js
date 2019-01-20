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

    app.get('/livros/cadastro/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.buscarPorId(id)
            .then(livro => {
                    res.marko(
                        require('../views/livros/form/form.marko'), 
                        { livro: livro }
                    );
                }
            )
            .catch(err => console.log(err));
    });

    app.get('/livros/cadastro', (req, res) => {
        res.marko(
            require('../views/livros/form/form.marko'),
            { livro: {} }
        );
    });

    app.post('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        livroDao.inserir(req.body)
            .then(res.redirect('/livros'))
            .catch(err => console.log(err));
    });

    app.put('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        livroDao.atualizar(req.body)
            .then(res.redirect('/livros'))
            .catch(err => console.log(err));
    });

    app.delete('/livros/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.remover(id)
            .then(() =>  res.status(200).end())
            .catch(err => console.log(err));
    });
};