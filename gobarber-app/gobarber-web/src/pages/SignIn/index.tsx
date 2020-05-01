import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/AuthContext';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const { signIn } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('Please enter your registered email')
                        .email('Please enter a valid email'),
                    password: Yup.string().required(
                        'Please enter your password',
                    ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                signIn({ email: data.email, password: data.password });
            } catch (err) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        },
        [signIn],
    );

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form onSubmit={handleSubmit} ref={formRef}>
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
