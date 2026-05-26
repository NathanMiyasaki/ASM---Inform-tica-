const express = require('express');
const session = require('express-session');
const path    = require('path');
const db      = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'minha-startup-secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, 'public')));

function requireAdmin(req, res, next) {
    if (!req.session.adminLoggedIn) return res.status(401).json({ error: 'Não autorizado.' });
    next();
}

function validateProduct(body) {
    const name        = (body.name        || '').trim();
    const description = (body.description || '').trim();
    const image_url   = (body.image_url   || '').trim();
    const is_active   = body.is_active ? 1 : 0;
    const errors      = [];

    if (!name)        errors.push('Informe o nome do produto.');
    if (!description) errors.push('Informe a descrição.');

    return { name, description, image_url, is_active, errors };
}

// Rotas públicas
app.get('/api/products', (req, res) => {
    res.json(db.prepare('SELECT * FROM products WHERE is_active = 1 ORDER BY id DESC').all());
});

app.post('/api/contacts', (req, res) => {
    const name    = (req.body.name    || '').trim();
    const email   = (req.body.email   || '').trim();
    const subject = (req.body.subject || '').trim();
    const message = (req.body.message || '').trim();
    const errors  = [];

    if (!name)    errors.push('Informe seu nome.');
    if (!subject) errors.push('Informe o assunto.');
    if (!message) errors.push('Escreva sua mensagem.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Informe um e-mail válido.');

    if (errors.length > 0) return res.status(422).json({ errors });

    db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)')
        .run(name, email, subject, message);
    res.json({ success: true });
});

// Rotas do admin
app.post('/api/admin/login', (req, res) => {
    const email    = (req.body.email    || '').trim();
    const password = (req.body.password || '').trim();

    if (email === 'theboys@super.com' && password === '123456') {
        req.session.adminLoggedIn = true;
        return res.json({ success: true });
    }
    res.status(401).json({ error: 'Credenciais inválidas.' });
});

app.get('/api/admin/logout', (req, res) => {
    req.session.destroy(() => res.json({ success: true }));
});

app.get('/api/admin/auth', requireAdmin, (req, res) => {
    res.json({ authenticated: true });
});

app.get('/api/admin/products', requireAdmin, (req, res) => {
    res.json(db.prepare('SELECT * FROM products ORDER BY id DESC').all());
});

app.get('/api/admin/contacts', requireAdmin, (req, res) => {
    res.json(db.prepare('SELECT * FROM contacts ORDER BY id DESC').all());
});

app.get('/api/admin/products/:id', requireAdmin, (req, res) => {
    const product = db.prepare('SELECT * FROM products WHERE id = ? LIMIT 1').get(Number(req.params.id));
    if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.json(product);
});

app.post('/api/admin/products', requireAdmin, (req, res) => {
    const { name, description, image_url, is_active, errors } = validateProduct(req.body);
    if (errors.length > 0) return res.status(422).json({ errors });

    db.prepare('INSERT INTO products (name, description, price, image_url, is_active) VALUES (?, ?, ?, ?, ?)')
        .run(name, description, 0, image_url, is_active);
    res.json({ success: true });
});

app.put('/api/admin/products/:id', requireAdmin, (req, res) => {
    const id = Number(req.params.id);
    if (!db.prepare('SELECT id FROM products WHERE id = ?').get(id))
        return res.status(404).json({ error: 'Produto não encontrado.' });

    const { name, description, image_url, is_active, errors } = validateProduct(req.body);
    if (errors.length > 0) return res.status(422).json({ errors });

    db.prepare('UPDATE products SET name=?, description=?, price=?, image_url=?, is_active=? WHERE id=?')
        .run(name, description, 0, image_url, is_active, id);
    res.json({ success: true });
});

app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
    const id = Number(req.params.id);
    if (id > 0) db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
