import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
    function handleSubmit(data: object): void {
        console.log(data);
    }

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form onSubmit={handleSubmit}>
                    <h1>Log in</h1>
                    <Input name="email" icon={FiMail} placeholder="Email" />
                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Password"
                    />
                    <Button type="submit">Sign in</Button>

                    <a href="forgot">Forgot password</a>
                </Form>

                <a href="signup">
                    <FiLogIn />
                    Sign up
                </a>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
