import { esc, checkAdminAuth, errorList, readProductForm } from '/assets/js/app.js';

const id = new URLSearchParams(window.location.search).get('id');

async function init() {
    const ok = await checkAdminAuth();
    if (!ok) return;
    if (!id) { window.location.href = '/admin/'; return; }

    try {
        const res = await fetch('/api/admin/products/' + id);
        if (!res.ok) { window.location.href = '/admin/?status=Produto+n%C3%A3o+encontrado.'; return; }

        const p = await res.json();
        document.getElementById('name').value        = p.name;
        document.getElementById('description').value = p.description;
        document.getElementById('image_url').value   = p.image_url;
        document.getElementById('is_active').checked = p.is_active === 1;
    } catch {
        window.location.href = '/admin/';
    }
}

document.getElementById('editForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const btn        = document.getElementById('submitBtn');
    const errorAlert = document.getElementById('errorAlert');
    btn.disabled     = true;

    try {
        const res  = await fetch('/api/admin/products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(readProductForm()),
        });
        const data = await res.json();

        if (!res.ok) { errorAlert.innerHTML = errorList(data.errors); return; }

        window.location.href = '/admin/?status=Produto+atualizado+com+sucesso.';
    } catch {
        errorAlert.innerHTML = '<div class="alert alert-danger">Erro ao salvar produto. Tente novamente.</div>';
    } finally {
        btn.disabled = false;
    }
});

init();
