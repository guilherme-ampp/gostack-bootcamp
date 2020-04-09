import React from 'react';

// the first argument of the component function
// has the properties passed to the component in the JSX code
// one of the built-in props is under the 'children' key
// it returns all of the content inside the tag of the component
export default function Header(props) {
    const { title } = props;
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}