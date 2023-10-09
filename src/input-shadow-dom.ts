const template = document.createElement('template');
template.innerHTML = `
<input type="" name="">
`;

export class InputShadowDomComponent extends HTMLElement {
    constructor() {
        super();

        // Create shadow DOM based on template
        this.attachShadow({ mode: 'open'})
            .append(template.content.cloneNode(true));

        this.shadowRoot.querySelector('input').setAttribute('type', this.getAttribute('type') || 'text');
        this.shadowRoot.querySelector('input').setAttribute('name', this.getAttribute('name'));
    }
}

window.customElements.define('input-shadow-dom', InputShadowDomComponent);
