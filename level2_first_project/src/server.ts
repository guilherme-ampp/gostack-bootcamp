import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database'; // we just need to execute the file! - Python style
import uploadConfig from './config/upload';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log('Server is listening at 3333');
});
