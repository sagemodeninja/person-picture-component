import { customComponent, CustomComponent } from '@sagemodeninja/custom-component';

@customComponent('person-picture')
export class PersonPicture extends CustomComponent {
    static styles = `
    :host {
        -webkit-user-select: none;
        user-select: none;
    }
    
    .person-picture {
        align-items: center;
        background-color: var(--fill-control-alt-quarternary);
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        height: 32px;
        justify-content: center;
        overflow: hidden;
        width: 32px;
    }
    
    .image {
        height: 100%;
        -webkit-user-drag: none;
        user-drag: none;
        width: 100%;
    }
    
    .initials {
        color: var(--fill-text-primary);
        font-family: 'Segoe UI Variable', sans-serif;
        font-size: 14px;
        font-variation-settings: 'wght' 600, 'opsz' 20;
        line-height: 32px;
        text-transform: uppercase;
    }
    `;

    private _imageElement: HTMLImageElement;
    private _initialsSpan: HTMLSpanElement;
    private _fallbackIcon: HTMLElement;

    static get observedAttributes() {
        return ['image', 'display-name', 'initials'];
    }

    /* Attributes */
    get image(): string {
        return this.getAttribute('image');
    }

    set image(value: string) {
        this.setAttribute('image', value);
        this.setDisplay();
    }

    get displayName(): string {
        return this.getAttribute('display-name');
    }

    set displayName(value: string) {
        this.setAttribute('display-name', value);
        this.setDisplay();
    }

    get initials(): string {
        return this.getAttribute('initials');
    }

    set initials(value: string) {
        this.setAttribute('initials', value);
        this.setDisplay();
    }

    /* DOM */
    get imageElement() {
        this._imageElement ??= this.shadowRoot.querySelector('.image');
        return this._imageElement;
    }

    get initialsSpan() {
        this._initialsSpan ??= this.shadowRoot.querySelector('.initials');
        return this._initialsSpan;
    }

    get fallbackIcon() {
        this._fallbackIcon ??= this.shadowRoot.querySelector('.fallback');
        return this._fallbackIcon;
    }

    render() {
        return `
            <div class="person-picture">
                <img class="image" src="#" alt="User Photo"/>
                <span class="initials"></span>
                <fluent-symbol-icon class="fallback" symbol="Contact" size="20"></fluent-symbol-icon>
            </div>
        `;
    }

    connectedCallback() {
        this.setDisplay();
    }

    attributeChangedCallback() {
        this.setDisplay();
    }

    setDisplay() {
        const initials = this.getInitialsFromDisplayName() ?? this.initials;

        this.imageElement.src = this.image;
        this.initialsSpan.innerText = initials;

        // Display
        this.imageElement.style.display = this.image ? 'block' : 'none';
        this.initialsSpan.style.display = !this.image && initials ? 'block' : 'none';
        this.fallbackIcon.style.display = !this.image && !initials ? 'block' : 'none';
    }

    private getInitialsFromDisplayName(): string {
        const pattern = /^([a-zA-Z]).*\s([a-zA-Z])[a-zA-Z]+$/i;
        return this.displayName?.replace(pattern, `$1$2`);
    }
}
