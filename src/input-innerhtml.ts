export class InputInnerHtmlComponent extends HTMLElement {
    constructor() {
        super();

        // Create shadow DOM based on template
        this.innerHTML = `<input type="${this.getAttribute('type') || 'text'}" name="${this.getAttribute('name')}">`;
    }
}

window.customElements.define('input-innerhtml', InputInnerHtmlComponent);
