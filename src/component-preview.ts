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
        overflow-x: scroll;
    }

    #code {
        background: #1d1e22;
        color: #fff;
        height: calc(100% - 3rem);
        margin: 0;
        padding: 1rem;
    }

    #preview {
        background: #fff;
        height: calc(100% - 3rem);
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
        <div id="preview"></div>
    </div>
</div>
<div id="link" class="hidden"><a href="#">Source code</a></div>
`;

window.customElements.define('component-preview', class ComponentPreview extends HTMLElement {
    constructor() {
        super();

        const html = this.innerHTML;
        const url = this.getAttribute('url');

        // Create shadow DOM based on template
        this.attachShadow({ mode: 'open'})
            .append(template.content.cloneNode(true));

        this.shadowRoot.querySelector('#preview').innerHTML = html;
        this.shadowRoot.querySelector('#code').innerHTML = this.escape(html.trim());

        if (url) {
            this.shadowRoot.querySelector('#link > a').setAttribute('href', url);
            this.shadowRoot.querySelector('#link').classList.remove('hidden');
        }
    }

    public connectedCallback() {
        // called when the component is added to the DOM
        this.shadowRoot.querySelectorAll('ul.nav > li span').forEach((element) => {
            element.addEventListener('click', (event) => {
                if (element.classList.contains('active')) return;

                // deactivate all others
                this.shadowRoot.querySelectorAll('.container > .active').forEach((container) => {
                    container.classList.remove('active');
                });

                this.shadowRoot.querySelectorAll(`.container > #${element.getAttribute('rel')}`).forEach((container) => {
                    container.classList.add('active');
                });

                this.shadowRoot.querySelectorAll('ul.nav > li span.active').forEach((trigger) => trigger.classList.toggle('active'));
                element.classList.toggle('active');
            });
        });
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
