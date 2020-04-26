import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

/** Create a type based on other types! */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    /** if type= is in props, it will be preferred */
    <Container type="button" {...rest}>
        {children}
    </Container>
);

export default Button;
