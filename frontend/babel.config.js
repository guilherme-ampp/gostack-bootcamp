module.exports = {
    presets: [
        '@babel/preset-env',  // convert modern javascript to older javascript based in the browser environment - converting only the necessary functionality not yet supported in the browser
        '@babel/preset-react', // add react functionality to the javascript convertion - understand JSX and convert so the browser understands
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ]
}