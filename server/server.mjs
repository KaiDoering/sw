import compression from 'compression';
import express from 'express';

const app = express();
const port = 8080;

app.use(compression());

app.get('/health', (_, res) => res.sendStatus(200));
app.use('/', express.static('assets'));

app.listen(port, () => console.log(`Server listening on port ${port}!`));
