customElements.define('site-header', class extends HTMLElement {
    connectedCallback() {
        const active = this.getAttribute('active') || '';
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light admin-navbar">
                <div class="container">
                    <a class="navbar-brand fw-bold" href="/">A.S.M Informática</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Alternar navegação">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="mainNavbar">
                        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                            <li class="nav-item"><a class="nav-link ${active === 'inicio' ? 'active' : ''}" href="/">Início</a></li>
                            <li class="nav-item"><a class="nav-link ${active === 'contato' ? 'active' : ''}" href="/contato.html">Contato</a></li>
                            <li class="nav-item"><a class="nav-link ${active === 'admin' ? 'active' : ''}" href="/admin/">Admin</a></li>
                        </ul>
                    </div>
                </div>
            </nav>`;
    }
});
