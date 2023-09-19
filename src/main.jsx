import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// https://github.com/styled-components/styled-components/issues/4049
import { StyleSheetManager } from 'styled-components';
import isValidProp from '@emotion/is-prop-valid';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyleSheetManager shouldForwardProp={propName => isValidProp(propName)}>
            <App />
        </StyleSheetManager>
    </React.StrictMode>,
)


