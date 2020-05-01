import React, { useEffect } from 'react';
import {
    FiAlertCircle,
    FiCheckCircle,
    FiInfo,
    FiXCircle,
} from 'react-icons/fi';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
    message: ToastMessage;
}

const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
    const { removeToast } = useToast();

    /* useEffect will be triggered at every new individual toast that is
       reated */
    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        // when I return a function from a useEffect call, this function will
        // be called as soon as this component ceases to exist.
        return () => {
            clearTimeout(timer);
        };
    }, [message.id, removeToast]);

    return (
        <Container type={message.type} hasDescription={!!message.description}>
            {icons[message.type || 'info']}
            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>
            <button type="button" onClick={() => removeToast(message.id)}>
                <FiXCircle size={18} />
            </button>
        </Container>
    );
};

export default Toast;
