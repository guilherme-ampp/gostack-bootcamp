// import is not yet supported by Node.js 12 - it needs to use 'require'
// but we TypeScript we can use it!
import express from 'express';
import { helloTypeScript } from './routes';

const app = express();

app.get('/', helloTypeScript);

app.listen(3333);