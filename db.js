const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'database');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new Database(path.join(dir, 'app.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    image_url TEXT DEFAULT '',
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const count = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
if (count === 0) {
  const insert = db.prepare(
    'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)'
  );
  insert.run(
    'App de Gestão',
    'Aplicativo web para gestão de tarefas, equipes e projetos com interface moderna e intuitiva.',
    0,
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80'
  );
  insert.run(
    'Painel Analytics',
    'Dashboard web com métricas de uso, vendas e comportamento de clientes em tempo real.',
    0,
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'
  );
}

module.exports = db;
