import React, { useCallback, useRef } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButtonText,
    CreateAccountButton,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    // use must use References when we need to programatically control it
    // and not just react to an event
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignIn = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('Please enter your registered email')
                    .email('Please enter a valid email'),
                password: Yup.string().required('Please enter your password'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            // await signIn({ email: data.email, password: data.password });

            // history.push('/dashboard');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                return;
            }
            Alert.alert('Error authenticating user', 'Please try again later');
        }
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
                <Container>
                    <Image source={logoImg} />

                    <View>
                        <Title>Login</Title>
                    </View>
                    <Form onSubmit={handleSignIn} ref={formRef}>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            name="email"
                            icon="mail"
                            placeholder="Email"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passwordInputRef.current?.focus();
                            }}
                        />
                        <Input
                            secureTextEntry
                            ref={passwordInputRef}
                            name="password"
                            icon="lock"
                            placeholder="Password"
                            returnKeyType="send"
                            textContentType="newPassword"
                            onSubmitEditing={() => {
                                formRef.current?.submitForm();
                            }}
                        />
                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}
                        >
                            Sign in
                        </Button>
                    </Form>

                    <ForgotPassword onPress={() => {}}>
                        <ForgotPasswordText>Forgot password?</ForgotPasswordText>
                    </ForgotPassword>
                </Container>
            </ScrollView>

            <CreateAccountButton
                onPress={() => {
                    navigation.navigate('SignUp');
                }}
            >
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>Create account</CreateAccountButtonText>
            </CreateAccountButton>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
