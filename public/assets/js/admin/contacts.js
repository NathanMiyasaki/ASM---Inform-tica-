import { esc, checkAdminAuth } from '/assets/js/app.js';

function formatDate(value) {
    return new Date(value.replace(' ', 'T') + 'Z').toLocaleString('pt-BR');
}

async function loadContacts() {
    const container = document.getElementById('contactsList');

    try {
        const contacts = await fetch('/api/admin/contacts').then(r => r.json());

        if (contacts.length === 0) {
            container.innerHTML = '<div class="alert alert-info mb-0">Nenhuma mensagem recebida ainda.</div>';
            return;
        }

        container.innerHTML = contacts.map(contact =>
            '<article class="border-bottom pb-3 mb-3">' +
            '<div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">' +
            '<div>' +
            '<h2 class="h5 mb-1">' + esc(contact.subject) + '</h2>' +
            '<p class="mb-0 text-muted">' + esc(contact.name) + ' &lt;' + esc(contact.email) + '&gt;</p>' +
            '</div>' +
            '<small class="text-muted">' + esc(formatDate(contact.created_at)) + '</small>' +
            '</div>' +
            '<p class="mb-0">' + esc(contact.message).replace(/\n/g, '<br>') + '</p>' +
            '</article>'
        ).join('');
    } catch {
        container.innerHTML = '<div class="alert alert-danger mb-0">Erro ao carregar mensagens.</div>';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async function () {
    await fetch('/api/admin/logout');
    window.location.href = '/admin/login.html';
});

checkAdminAuth().then(ok => { if (ok) loadContacts(); });
