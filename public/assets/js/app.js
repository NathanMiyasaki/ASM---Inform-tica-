import '/assets/js/components/header.js';
import '/assets/js/components/footer.js';

// --- Utilitários ---

export function esc(str) {
    return String(str).replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
    );
}

export function errorList(errors) {
    return '<div class="alert alert-danger"><ul class="mb-0">' +
        errors.map(e => '<li>' + esc(e) + '</li>').join('') + '</ul></div>';
}

export function readProductForm() {
    return {
        name:        document.getElementById('name').value.trim(),
        description: document.getElementById('description').value.trim(),
        image_url:   document.getElementById('image_url').value.trim(),
        is_active:   document.getElementById('is_active').checked,
    };
}

export async function checkAdminAuth() {
    const res = await fetch('/api/admin/auth');
    if (!res.ok) { window.location.href = '/admin/login.html'; return false; }
    return true;
}
