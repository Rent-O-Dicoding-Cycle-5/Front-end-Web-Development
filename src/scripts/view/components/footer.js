class footerBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        
        `;
  }
}

customElements.define('app-footer', footerBar);
