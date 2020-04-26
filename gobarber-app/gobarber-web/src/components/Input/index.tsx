import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    /** register the fields with Unform as soon as the component finishes loading up */
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current /** the object to the HTML element */,
            path: 'value' /** property to be read from ref */,
        });
    }, [fieldName, registerField]);

    /** the <input ref={<obj>} /> sets a var to referent the HTML element in the DOM */
    return (
        <Container>
            {Icon && <Icon size={20} />}
            <input defaultValue={defaultValue} ref={inputRef} {...rest} />
        </Container>
    );
};

export default Input;
