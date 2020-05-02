import React, { useCallback, useRef } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import { Container, Title, BackToSignInButtonText, BackToSignInButton } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is mandatory'),
                email: Yup.string().required('Email is mandatory').email('Enter a valid email'),
                password: Yup.string().min(6, 'Password must have at least 6 characters'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);
            Alert.alert('Registration successful', 'You may now log into the app');

            navigation.goBack();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }
            Alert.alert('Error registering new user', 'Please try again later');
        }
    }, []);

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

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
                        <Title>Sign Up</Title>
                    </View>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            autoCorrect
                            autoCapitalize="words"
                            name="name"
                            icon="user"
                            placeholder="Name"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                emailInputRef.current?.focus();
                            }}
                        />
                        <Input
                            ref={emailInputRef}
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
                            onSubmitEditing={() => {
                                formRef.current?.submitForm();
                            }}
                        />
                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}
                        >
                            Create account
                        </Button>
                    </Form>
                </Container>
            </ScrollView>

            <BackToSignInButton
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignInButtonText>Back to sign in</BackToSignInButtonText>
            </BackToSignInButton>
        </KeyboardAvoidingView>
    );
};

export default SignUp;
