const app = require('./src/config/express-config');

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});