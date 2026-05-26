customElements.define('site-footer', class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container d-flex flex-column flex-md-row justify-content-between gap-2 admin-footer-inner">
                <p class="mb-0">&copy; ${new Date().getFullYear()} A.S.M Informática.</p>
                <p class="mb-0">Projeto educacional em Node.js, Express, SQLite, Bootstrap e JavaScript.</p>
            </div>`;
    }
});
