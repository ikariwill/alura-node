class LivroDao{
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * from livros', 
                (err, result) =>  {
                    if (err) return reject('Não foi possível listar os livros');
                    return resolve(result);
                }
            );
        });
    }
}

module.exports = LivroDao;