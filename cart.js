let cart = [];

const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function addToCart(produto){

    const itemExistente = cart.find(
        item => item.id === produto.id
    );

    if(itemExistente){

        itemExistente.quantidade++;

    }else{

        cart.push({
            ...produto,
            quantidade:1
        });

    }

    updateCart();
}

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;
    let totalItens = 0;

    cart.forEach(item => {

        total += item.preco * item.quantidade;
        totalItens += item.quantidade;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div class="cart-item-info">

                <strong>${item.nome}</strong>

                <p>
                R$ ${item.preco.toFixed(2)}
                </p>

            </div>

            <div class="cart-item-actions">

                <button onclick="decreaseQuantity('${item.id}')">
                -
                </button>

                <span>${item.quantidade}</span>

                <button onclick="increaseQuantity('${item.id}')">
                +
                </button>

                <button
                class="remove-item"
                onclick="removeItem('${item.id}')">

                🗑

                </button>

            </div>

        </div>

        `;

    });

    cartTotal.textContent =
    total.toFixed(2);

    cartCount.textContent =
    totalItens;
}

function increaseQuantity(id){

    const item =
    cart.find(i => i.id == id);

    if(!item) return;

    item.quantidade++;

    updateCart();
}

function decreaseQuantity(id){

    const item =
    cart.find(i => i.id == id);

    if(!item) return;

    item.quantidade--;

    if(item.quantidade <= 0){

        cart =
        cart.filter(i => i.id != id);

    }

    updateCart();
}

function removeItem(id){

    cart =
    cart.filter(i => i.id != id);

    updateCart();
}