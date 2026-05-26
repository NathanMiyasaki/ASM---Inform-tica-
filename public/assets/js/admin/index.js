import { esc, checkAdminAuth } from '/assets/js/app.js';

const status = new URLSearchParams(window.location.search).get('status');
if (status) {
    document.getElementById('statusAlert').innerHTML =
        '<div class="alert alert-success">' + esc(status) + '</div>';
}

async function loadProducts() {
    try {
        const products = await fetch('/api/admin/products').then(r => r.json());
        const tbody    = document.getElementById('productsBody');

        if (products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3">Nenhum produto cadastrado.</td></tr>';
            return;
        }

        tbody.innerHTML = products.map(p =>
            '<tr>' +
            '<td>' + esc(p.name) + '</td>' +
            '<td>' + (p.is_active ? 'Ativo' : 'Inativo') + '</td>' +
            '<td class="text-end">' +
            '<a class="btn btn-sm btn-outline-primary" href="/admin/edit.html?id=' + p.id + '">Editar</a> ' +
            '<button class="btn btn-sm btn-outline-danger" data-id="' + p.id + '">Excluir</button>' +
            '</td></tr>'
        ).join('');
    } catch {
        document.getElementById('productsBody').innerHTML =
            '<tr><td colspan="3" class="text-danger">Erro ao carregar produtos.</td></tr>';
    }
}

document.getElementById('productsBody').addEventListener('click', async function (e) {
    const btn = e.target.closest('[data-id]');
    if (!btn || !confirm('Tem certeza que deseja excluir este produto?')) return;
    await fetch('/api/admin/products/' + btn.dataset.id, { method: 'DELETE' });
    loadProducts();
});

document.getElementById('logoutBtn').addEventListener('click', async function () {
    await fetch('/api/admin/logout');
    window.location.href = '/admin/login.html';
});

checkAdminAuth().then(ok => { if (ok) loadProducts(); });
