const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        background: #cacaca;
        display: block;
        font-family: var(--font-family);
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    h3 {
        margin: 0;
        padding: 0;
    }

    .hidden { display: none; }

    .grid > * {
        margin: 0.5em;
        max-width: 100%;
        overflow: hidden;
    }

    #code {
        background: #1d1e22;
        color: #fff;
        height: calc(100% - 3rem);
        margin: 0;
        overflow-x: auto;
        padding: 1rem;
    }

    #preview {
        background: #fff;
        height: calc(100% - 3rem);
        overflow-x: auto;
        padding: 1rem;
    }

    #link {
        margin: 0 0 .5rem .5rem
    }

    a { color: #000; text-decoration: none; }
    a:hover { text-decoration: underline; }
</style>

<div class="grid container">
    <div>
        <h3>Code</h3>
        <pre id="code"><code></code></pre>
    </div>
    <div>
        <h3>Result</h3>
        <div id="preview">
            <slot></slot>
        </div>
    </div>
</div>
<div id="link" class="hidden"><a href="#">Source code</a></div>
`;

window.customElements.define('component-preview', class ComponentPreview extends HTMLElement {
    constructor() {
        super();

        // Create shadow DOM based on template
        this.attachShadow({ mode: 'open'})
            .append(template.content.cloneNode(true));
    }

    public connectedCallback() {
        this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
            const html = (this.shadowRoot.querySelector('slot') as HTMLSlotElement).assignedNodes().reduce(
                (carry, current: Element | Text) => current instanceof Element
                    ? `${carry} ${current.outerHTML}`
                    : `${carry} ${current.textContent}`,
                ''
            );
            this.shadowRoot.querySelector('#code').innerHTML = this.escape(html.trim());
        });

        const url = this.getAttribute('url');
        if (url) {
            this.shadowRoot.querySelector('#link > a').setAttribute('href', url);
            this.shadowRoot.querySelector('#link').classList.remove('hidden');
        }
    }

    public disconnectedCallback() {
        // called when the component is removed from the DOM
    }

    private escape(text: string): string {
        // A simple, but small utility to leverage the browsers escaping to prevent XSS
        const element = document.createElement('div');
        element.innerText = text;
        return element.innerHTML;
    }
});
