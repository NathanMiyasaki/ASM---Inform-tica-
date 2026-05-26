import { esc } from '/assets/js/app.js';

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;

    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email:    document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
            }),
        });

        if (res.ok) { window.location.href = '/admin/'; return; }

        const data = await res.json();
        document.getElementById('errorAlert').innerHTML =
            '<div class="alert alert-danger">' + esc(data.error) + '</div>';
    } catch {
        document.getElementById('errorAlert').innerHTML =
            '<div class="alert alert-danger">Erro ao fazer login. Tente novamente.</div>';
    } finally {
        btn.disabled = false;
    }
});
