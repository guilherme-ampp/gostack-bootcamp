import React from 'react';
import {
    Image,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

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

const SignIn: React.FC = () => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
            >
                <Container>
                    <Image source={logoImg} />

                    <View>
                        <Title>Login</Title>
                    </View>
                    <Input name="email" icon="mail" placeholder="Email" />
                    <Input name="password" icon="lock" placeholder="Password" />
                    <Button
                        onPress={() => {
                            console.log('');
                        }}
                    >
                        Sign in
                    </Button>

                    <ForgotPassword onPress={() => {}}>
                        <ForgotPasswordText>
                            Forgot password?
                        </ForgotPasswordText>
                    </ForgotPassword>
                </Container>
            </ScrollView>

            <CreateAccountButton onPress={() => {}}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>
                    Create account
                </CreateAccountButtonText>
            </CreateAccountButton>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
