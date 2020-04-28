import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database'; // we just need to execute the file! - Python style
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// middleware for exception handler are specific and need 4 paameters
// 1 - err
// 2 - request
// 3 - response
// 4 - next function
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        // known error!
        return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
    }

    console.error(err); // for debugging

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('Server is listening at 3333');
});
