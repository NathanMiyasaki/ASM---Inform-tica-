import { esc, checkAdminAuth, errorList, readProductForm } from '/assets/js/app.js';

checkAdminAuth();

document.getElementById('createForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const btn        = document.getElementById('submitBtn');
    const errorAlert = document.getElementById('errorAlert');
    btn.disabled     = true;

    try {
        const res  = await fetch('/api/admin/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(readProductForm()),
        });
        const data = await res.json();

        if (!res.ok) { errorAlert.innerHTML = errorList(data.errors); return; }

        window.location.href = '/admin/?status=Produto+criado+com+sucesso.';
    } catch {
        errorAlert.innerHTML = '<div class="alert alert-danger">Erro ao salvar produto. Tente novamente.</div>';
    } finally {
        btn.disabled = false;
    }
});
