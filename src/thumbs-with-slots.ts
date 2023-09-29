// A webcomponent using no abstractions, based on https://www.webcomponents.org/introduction

const template = document.createElement('template');
template.innerHTML = `
<style>
    button:not(.active) { filter: grayscale(); }
    slot:not(.active) { display: none; }
</style>
<div>
    <button id="up">👍</button>
    <button id="down">👎</button>
    <slot name="success-upvote"></slot>
    <slot name="success-downvote"></slot>
    <slot name="failure"></slot>
</div>
`;

export class ThumbsWithSlotsComponent extends HTMLElement {
    constructor() {
        super();

        // Create shadow DOM based on template
        this.attachShadow({ mode: 'open'})
            .append(template.content.cloneNode(true));
    }

    private up(): void {
        this.shadowRoot.querySelectorAll('button').forEach(button => button.classList.remove('active'));
        this.shadowRoot.querySelector('#up').classList.add('active');
        this.respond('success-upvote');
    }

    private down(): void {
        this.shadowRoot.querySelectorAll('button').forEach(button => button.classList.remove('active'));
        this.shadowRoot.querySelector('#down').classList.add('active');
        this.respond('success-downvote');
    }

    private respond(success: string) {
        this.shadowRoot.querySelectorAll('slot').forEach(slot => slot.classList.remove('active'));

        const slot = Math.round(Math.random() * 10) < 2
            ? 'failure'
            : success;

        this.shadowRoot.querySelector(`slot[name="${slot}"]`).classList.add('active');
    }

    public connectedCallback() {
        // called when the component is added to the DOM
        // Add event listeners
        this.shadowRoot.querySelector('#up').addEventListener('click', () => this.up());
        this.shadowRoot.querySelector('#down').addEventListener('click', () => this.down());
    }

    public disconnectedCallback() {
        // called when the component is removed from the DOM
    }
}
window.customElements.define('thumbs-with-slots', ThumbsWithSlotsComponent);
