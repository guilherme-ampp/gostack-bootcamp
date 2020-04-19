import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // validate token in the request
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing!', 401);
    }

    // extract Bearer <token string>
    // leave the first variable in the deconstruction of the return blank
    // that means we should ignore that
    const [, token] = authHeader.split(' ');

    // the verify() method takes in the token and our application secret string
    // used to generate valid tokens for our users
    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub } = decoded as TokenPayload; // casting object into a type
        // information included into the request object will be
        // available for all next middlewares and routes
        request.user = { id: sub };
        // if the token is valid, the decoded
        return next();
    } catch {
        // verify() will throw an error - we should catch and throw our own
        throw new AppError('Invalid JWT token!', 401);
    }
}
