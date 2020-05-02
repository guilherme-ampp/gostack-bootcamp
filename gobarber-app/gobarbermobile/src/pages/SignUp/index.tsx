import React from 'react';
import {
    Image,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import {
    Container,
    Title,
    BackToSignInButtonText,
    BackToSignInButton,
} from './styles';

const SignUp: React.FC = () => {
    const navigation = useNavigation();

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
                        <Title>Sign Up</Title>
                    </View>
                    <Input name="name" icon="user" placeholder="Name" />
                    <Input name="email" icon="mail" placeholder="Email" />
                    <Input name="password" icon="lock" placeholder="Password" />
                    <Button
                        onPress={() => {
                            console.log('');
                        }}
                    >
                        Create account
                    </Button>
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
