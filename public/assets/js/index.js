import { esc } from '/assets/js/app.js';

fetch('/api/products')
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById('products');

        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = '<div class="service-card service-card-empty"><div class="service-card-content"><h3>Em breve</h3><p>Nenhum produto foi cadastrado no painel administrativo ainda.</p></div></div>';
            return;
        }

        container.innerHTML = products.map(p => {
            const img  = p.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80';
            const desc = p.description.length > 110 ? p.description.substring(0, 110) + '...' : p.description;
            return (
                '<article class="service-card">' +
                '<img class="service-card-img product-image" src="' + esc(img) + '" alt="Imagem de ' + esc(p.name) + '">' +
                '<div class="service-card-content">' +
                '<h3>' + esc(p.name) + '</h3>' +
                '<p>' + esc(desc) + '</p>' +
                '<div class="product-card-footer">' +
                '<a class="product-card-action" href="/contato.html?produto=' + encodeURIComponent(p.name) + '">Tenho interesse</a>' +
                '</div></div></article>'
            );
        }).join('');
    })
    .catch(() => {
        const container = document.getElementById('products');
        if (container) {
            container.innerHTML = '<div class="service-card service-card-empty"><div class="service-card-content"><h3>Falha ao carregar</h3><p>Não foi possível carregar os produtos do banco de dados.</p></div></div>';
        }
    });
