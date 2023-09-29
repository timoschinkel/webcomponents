// A webcomponent using no abstractions, based on https://www.webcomponents.org/introduction

const template = document.createElement('template');
template.innerHTML = `
<style>
    button:not(.active) { filter: grayscale(); }
</style>
<div>
    <button id="up">👍</button>
    <button id="down">👎</button>
    <input type="test" name="url"><button id="update">update</button>
    <div id="out"></div>
</div>
`;

const escape = (text: string): string => {
    // A simple, but small utility to leverage the browsers escaping to prevent XSS
    const element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

export class ThumbsWithAttributeComponent extends HTMLElement {
    private url: string = '';
    constructor() {
        super();

        // Create shadow DOM based on template
        this.attachShadow({ mode: 'open'})
            .append(template.content.cloneNode(true));

        //this.url = this.getAttribute('url');
    }

    private up(): void {
        this.shadowRoot.querySelectorAll('button').forEach(button => button.classList.remove('active'));
        this.shadowRoot.querySelector('#up').classList.add('active');
        this.shadowRoot.querySelector('#out').innerHTML = escape(`Sending an upvote to ${this.url}`);
    }

    private down(): void {
        this.shadowRoot.querySelectorAll('button').forEach(button => button.classList.remove('active'));
        this.shadowRoot.querySelector('#down').classList.add('active');
        this.shadowRoot.querySelector('#out').innerHTML = escape(`Sending a down to ${this.url}`);
    }

    private updateUrl(): void {
        // In order to keep the outward facing attributes, and the internal state of the webcomponent
        // consistent, I like to use `setAttribute()` to change any attributes, and capture this event
        // via attributeChangedCallback(). In that method can I then update the internal state of the
        // webcomponent.
        this.setAttribute('url', (this.shadowRoot.querySelector('input[name=url]') as HTMLInputElement).value);
    }

    public connectedCallback() {
        // called when the component is added to the DOM
        // Add event listeners
        this.shadowRoot.querySelector('#up').addEventListener('click', () => this.up());
        this.shadowRoot.querySelector('#down').addEventListener('click', () => this.down());
        this.shadowRoot.querySelector('#update').addEventListener('click', () => this.updateUrl());
    }

    public disconnectedCallback() {
        // called when the component is removed from the DOM
    }

    // Attributes

    static get observedAttributes() {
        // Returns an array of all observed attributes. Only attributes in this list will trigger
        // the attributeChangedCallback() method below.
        return ['url'];
    }

    public attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
        if (name === 'url') {
            this.url = `${newVal}`;
            (this.shadowRoot.querySelector('input[name=url]') as HTMLInputElement).value = this.url;
        }
    }
}
window.customElements.define('thumbs-with-attribute', ThumbsWithAttributeComponent);
