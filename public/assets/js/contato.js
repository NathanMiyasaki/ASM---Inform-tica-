import { esc, errorList } from '/assets/js/app.js';

const produto = new URLSearchParams(window.location.search).get('produto');
if (produto) document.getElementById('subject').value = produto;

document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const btn      = document.getElementById('submitBtn');
    const feedback = document.getElementById('feedback');

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const clientErrors = [];
    if (!name)    clientErrors.push('Informe seu nome.');
    if (!subject) clientErrors.push('Informe o assunto.');
    if (!message) clientErrors.push('Escreva sua mensagem.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) clientErrors.push('Informe um e-mail válido.');

    if (clientErrors.length > 0) {
        feedback.innerHTML = errorList(clientErrors);
        return;
    }

    btn.disabled = true;

    try {
        const res = await fetch('/api/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await res.json();

        if (!res.ok) {
            feedback.innerHTML = errorList(data.errors);
            return;
        }

        feedback.innerHTML = '<div class="alert alert-success js-success-alert">Mensagem enviada com sucesso.</div>';
        this.reset();
        feedback.querySelector('.js-success-alert').animate(
            [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 350, easing: 'ease-out' }
        );
    } catch {
        feedback.innerHTML = '<div class="alert alert-danger">Erro ao enviar mensagem. Tente novamente.</div>';
    } finally {
        btn.disabled = false;
    }
});
