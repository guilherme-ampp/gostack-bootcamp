import express from 'express';
import routes from './routes';
import './database'; // we just need to execute the file! - Python style

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Server is listening at 3333');
});
