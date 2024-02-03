import express from 'express';
import { create } from 'express-handlebars';

const app = express();

const hbs = create({
    helpers: {
        isEquals: (a: string, b: string) => {
            return a == b;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const PORT = 3000;

import weaterRoute from './routes/weather';
app.use(weaterRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});