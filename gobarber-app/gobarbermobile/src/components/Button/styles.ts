import styled from 'styled-components/native';
// RectButton is cross-platform!
import { RectButton } from 'react-native-gesture-handler';

// every time we need to style a component outside of the styled-component
// set, we call styled() as a method
export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    background: #ff9000;
    border-radius: 10px;
    margin-top: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 18px;
`;
