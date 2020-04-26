import styled from 'styled-components';

export const Container = styled.div`
    /* all 'absolute' positions inside this component will
       be relative to this component and not to the rest of the screen */
    position: relative;

    span {
        width: 160px;
        background: #ff9000;
        padding: 8px 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        /** fade-out transition */
        visibility: hidden;
        transition: visibility 0s 0.2s, opacity 0.2s linear;

        position: absolute;
        /* this will bring the bottom of the span to be exactly on top of the
           container */
        bottom: calc(100% + 12px);
        /* left: 50% and translateX(-50%) will centralize the tooltip  */
        left: 50%;
        transform: translateX(-50%);

        color: #312e38;

        /** this is a hack to create a triangle at the bottom of the tooltip */
        &::before {
            content: '';
            border-style: solid;
            border-color: #ff9000 transparent;
            border-width: 6px 6px 0 6px;
            bottom: 20px;
            top: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    /** fade-in transition */
    &:hover span {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s linear;
    }
`;
