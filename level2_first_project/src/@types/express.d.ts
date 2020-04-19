declare namespace Express {
    // this will append to the existing definition of Request
    export interface Request {
        user: {
            id: string;
        };
    }
}
