// SCRIPT DE GAMER STORE
// Referencias a las pantallas
const loginSection = document.getElementById('login-section');
const storeSection = document.getElementById('store-section');
const aboutSection = document.getElementById('about-section');
const cart = [];

function iniciarSesion() {
    const usuarioIngresado = document.getElementById('username').value;
    const passwordIngresado = document.getElementById('password').value;

    const cuenta1 = { user: "silmar", pass: "1234" };

    if (usuarioIngresado === cuenta1.user && passwordIngresado === cuenta1.pass) {
        loginSection.classList.add('hidden');
        storeSection.classList.remove('hidden');
        aboutSection.classList.add('hidden');
        
        // 🔊 SONIDO DE INICIO DE SESIÓN
        const sonidoLogin = new Audio('https://www.myinstants.com/media/sounds/xbox-360-achievement-sound.mp3');
        sonidoLogin.play();
        
    } else {
        alert("❌ ACCESO DENEGADO: Usuario o contraseña incorrectos.");
    }
}

function iniciarSesionRedes(red) {
    alert(`Iniciando sesión con ${red}. (Funcionalidad simulada)`);
    loginSection.classList.add('hidden');
    storeSection.classList.remove('hidden');
    aboutSection.classList.add('hidden');
}

function cerrarSesion() {
    storeSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    aboutSection.classList.remove('hidden');
    alert("Sesión cerrada.");
}

function recuperarCuenta() {
    const email = prompt('Ingresa tu correo electrónico para recuperar la cuenta:');
    if (!email) {
        alert('Operación cancelada. Ingresa un correo válido para recuperar la cuenta.');
        return;
    }
    alert(`Se ha enviado un enlace de recuperación al correo ${email}. Revisa tu bandeja de entrada.`);
}

function mostrarCategoria(event, categoria) {
    // Si el primer argumento es string (nombre de categoría), ajustarlo
    if (typeof event === 'string') {
        categoria = event;
        event = null;
    }
    
    // Ocultar todas las categorías
    document.getElementById('perifericos').classList.add('hidden');
    document.getElementById('consolas').classList.add('hidden');
    document.getElementById('monitores').classList.add('hidden');
    document.getElementById('laptops').classList.add('hidden');
    document.getElementById('memorias').classList.add('hidden');
    document.getElementById('ventiladores').classList.add('hidden');
    document.getElementById('placas').classList.add('hidden');
    document.getElementById('licencias').classList.add('hidden');
    
    // Mostrar la categoría seleccionada
    document.getElementById(categoria).classList.remove('hidden');
    
    // Actualizar botones activos si hay event
    if (event && event.target) {
        document.querySelectorAll('.btn-tab').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Reset search when changing category
    document.getElementById('search').value = '';
    buscarProductos();
}

function buscarProductos() {
    const query = document.getElementById('search').value.toLowerCase();
    const feedback = document.getElementById('search-feedback');
    let visibleCount = 0;

    // Buscar solo en la categoría activa (excluyendo most-viewed)
    const activeCategory = document.querySelector('.store-nav').nextElementSibling;
    let searchContainer = document.querySelector('#perifericos');
    
    // Encontrar el grid que NO está hidden
    const allGrids = document.querySelectorAll('.products-grid');
    allGrids.forEach(grid => {
        if (!grid.classList.contains('hidden') && !grid.parentElement.classList.contains('most-viewed')) {
            searchContainer = grid;
        }
    });

    if (searchContainer) {
        const cards = searchContainer.querySelectorAll('.product-card');
        cards.forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            if (name.includes(query)) {
                card.style.display = 'block';
                visibleCount += 1;
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (query && visibleCount === 0) {
        feedback.classList.remove('hidden');
    } else {
        feedback.classList.add('hidden');
    }
}

function interactuarProducto(nombreProducto) {
    // 🔊 SONIDO DE COMPRA / EQUIPAR
    const sonidoComprar = new Audio('https://www.myinstants.com/media/sounds/level-up.mp3');
    sonidoComprar.play();
    
    // Extraer precio del elemento
    const productCard = event.target.closest('.product-card');
    const priceText = productCard.querySelector('p').textContent;
    const price = parseFloat(priceText.replace('$', ''));
    
    cart.push({ name: nombreProducto, price: price });
    renderCarrito();
}

function renderCarrito() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">No hay productos seleccionados.</p>';
        return;
    }

    const list = document.createElement('ul');
    list.className = 'cart-list';

    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${item.name} - $${item.price.toFixed(2)}`;
        list.appendChild(listItem);
        total += item.price;
    });

    cartContainer.appendChild(list);

    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalDiv);
}

function vaciarCarrito() {
    cart.length = 0;
    renderCarrito();
}

function comprar() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Compra realizada por un total de $${total.toFixed(2)}. ¡Gracias por tu compra!`);
    vaciarCarrito();
}
