import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is mandatory'),
                email: Yup.string()
                    .required('Email is mandatory')
                    .email('Enter a valid email'),
                password: Yup.string().min(
                    6,
                    'Password must have at least 6 characters',
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }

            // trigger a toast message
        }
    }, []);

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Sign Up</h1>
                        <Input name="name" icon={FiUser} placeholder="Name" />
                        <Input name="email" icon={FiMail} placeholder="Email" />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Password"
                        />
                        <Button type="submit">Sign in</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Back to Log in
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
