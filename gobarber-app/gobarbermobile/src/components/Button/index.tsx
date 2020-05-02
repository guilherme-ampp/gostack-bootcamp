import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, ButtonText } from './styles';

// extend the RectButtonProperties to set 'children' as mandatory and
// of type string
interface ButtonProps extends RectButtonProperties {
    children: string;
}

// {...rest} will capture all of the properties passed to the <Button>
// element. Similar to what Python does with *args and **kwargs
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <Container {...rest}>
        <ButtonText>{children}</ButtonText>
    </Container>
);

export default Button;
