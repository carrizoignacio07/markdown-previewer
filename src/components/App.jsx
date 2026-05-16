import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../styles/App.css"

marked.setOptions({
    breaks: true
});

const defaultText = `# Heading 1
## Heading 2
\`this is inline code:\`

### Hello world function
\`\`\`
function hello() {
    return "Hello, World!";
}
\`\`\`
**Go to** [freeCodeCamp](https://www.freecodecamp.org), and
> Block Quotes!

## Tecnologies
- HTML.
- CSS.
- JS.
- TS.
- ReactJS.
- Angular.
- VueJS.
- Svelte.
- Java.
- Python.

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export const App = () => {
    const [input, setInput] = useState({ text: defaultText, result: marked.parse(defaultText) });
    const resultRef = useRef();

    const handleChange = (e) => {
        setInput({
            text: e.target.value,
            result: marked.parse(e.target.value)
        });
    };

    useEffect(() => {
        resultRef.current.innerHTML = DOMPurify.sanitize(input.result);
    }, [input.result]);

    useEffect(() => {
        const navigationEntries =
            performance.getEntriesByType("navigation");
        if (navigationEntries.length > 0) {
            const navType = navigationEntries[0].type;
            if (navType === "reload") {
                resultRef.current.innerHTML = DOMPurify.sanitize(input.result);
                console.log("La página fue recargada");
            }
        }
    }, []);

    return (
        <div className='container-xxl d-flex flex-column justify-content-center align-items-center me-auto'>
            <h2 className="mt-5">Write your text Markdown to convert</h2>
            <textarea className="mt-2" id="editor" onChange={handleChange} placeholder='Write your text to be converted' value={input.text}></textarea>
            <h2 className="mt-5">Preview the result HTML</h2>
            {/* <textarea className="mt-2" id="preview" readOnly value={input.result}></textarea> */}
            <div id="preview" readOnly ref={resultRef}></div>
        </div>
    )
}