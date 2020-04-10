import { Request, Response } from 'express';

import createUser from '../services/CreateUser';

export function helloTypeScript(request: Request, response: Response) {
    const user = createUser({name: 'Guilherme', 
                            email: 'guilherme.ampp@gmail.com', 
                            password: 'abc@123',
                            techs: [
                                'node', 
                                'react', 
                                'react-native', 
                                {title: 'Python', experience: 10},
                            ]});
    console.log(user.name);
    return response.json({message: "Hello TypeScript!"});
}