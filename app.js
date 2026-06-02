const menuContainer =
document.getElementById("menuContainer");

const pizzaModal =
document.getElementById("pizzaModal");

const sizeTitle =
document.getElementById("sizeTitle");

const sizeButtons =
document.querySelectorAll(".size-btn");

let selectedProduct = null;
let selectedJuice = null;


/*FUNÇÃO TAMANHO*/

function openSizeModal(produto){

    selectedProduct = produto;

    const container =
    document.getElementById("sizeOptions");

    container.innerHTML = "";

    Object.entries(produto.tamanhos)
    .forEach(([nome,preco]) => {

        container.innerHTML += `

        <button
        class="size-btn"
        onclick="selectSize(
        '${nome}',
        ${preco}
        )">

        ${nome.toUpperCase()}
        - R$ ${preco.toFixed(2)}

        </button>

        `;

    });

    document
    .getElementById("sizeTitle")
    .textContent =
    produto.nome;

    document
    .getElementById("pizzaModal")
    .classList.add("active");

}

/*FUNÇÃO PARA SELECIONAR*/


function selectSize(
tamanho,
preco
){

    addToCart({

        id:
        selectedProduct.id +
        "-" +
        tamanho,

        nome:
        selectedProduct.nome +
        " (" +
        tamanho.toUpperCase() +
        ")",

        preco:preco

    });

    document
    .getElementById("pizzaModal")
    .classList.remove("active");

}


/* =====================
   RENDER MENU
===================== */


function renderMenu(produtos){

    menuContainer.innerHTML = "";

    produtos.forEach(produto => {

        let preco;

        if(produto.tamanhos){

            preco =
            Object.values(produto.tamanhos)[0];

        }else{

            preco = produto.preco;

        }

        menuContainer.innerHTML += `
        <div class="menu-item">

            <img src="${produto.imagem}">

            <h3>${produto.nome}</h3>

            <p>${produto.descricao}</p>

            <span>
                R$ ${preco.toFixed(2)}
            </span>

            <button
            onclick="handleProduct(${produto.id})">

            Adicionar ao Pedido

            </button>

        </div>
        `;
    });
}


/* =====================
   ADICIONAR PRODUTO
===================== */

/*function handleProduct(id){

    const produto =
    menu.find(p => p.id === id);

    if(produto.tamanhos){

        selectedPizza = produto;

        sizeTitle.textContent =
        produto.nome;

        pizzaModal.classList.add("active");

        return;
    }

    addToCart({
        id:produto.id,
        nome:produto.nome,
        preco:produto.preco
    });

}*/

function handleProduct(id){

    const produto =
    menu.find(p => p.id === id);

    if(produto.tamanhos){

        selectedProduct = produto;

document.getElementById("sizeTitle").textContent = produto.nome;

        pizzaModal.classList.add("active");

        return;
    }

    if(produto.sabores){

        selectedJuice = produto;

        openJuiceModal(produto);

        return;
    }

    addToCart({
        id:produto.id,
        nome:produto.nome,
        preco:produto.preco
    });

}

/*FUNÇÃO PARA MONTAR SABORES*/

function openJuiceModal(produto){

    const modal =
    document.getElementById("juiceModal");

    const container =
    document.getElementById("juiceOptions");

    container.innerHTML = "";

    produto.sabores.forEach(sabor => {

        container.innerHTML += `

        <button
        class="size-btn"
        onclick="selectJuice(
            '${sabor.nome}',
            ${sabor.preco}
        )">

        ${sabor.nome}
        - R$ ${sabor.preco.toFixed(2)}

        </button>

        `;

    });

    modal.classList.add("active");

}

/*FUNÇÃO PARA ADICIONAR AO CARRINHO*/

function selectJuice(
sabor,
preco
){

    addToCart({

        id:
        "suco-" + sabor,

        nome:
        "Suco " + sabor,

        preco:preco

    });

    document
    .getElementById("juiceModal")
    .classList.remove("active");

}

document
.getElementById("closeJuiceModal")
.addEventListener("click",()=>{

document
.getElementById("juiceModal")
.classList.remove("active");

});

/* =====================
   TAMANHO DA PIZZA
===================== */

sizeButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        if(!selectedPizza) return;

        const tamanho =
        btn.dataset.size;

        const preco = selectedProduct.tamanhos[tamanho];

        addToCart({

            id:
            selectedProduct.id +
            "-" +
            tamanho,

            nome:
            selectedProduct.nome +
            " (" +
            tamanho.toUpperCase() +
            ")",

            preco:preco

        });

        pizzaModal.classList.remove("active");

    });

});

/* =====================
   FECHAR MODAL
===================== */

document
.getElementById("closePizzaModal")
.addEventListener("click", () => {

    pizzaModal.classList.remove("active");

});

/* =====================
   BUSCA
===================== */

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const termo =
    searchInput.value.toLowerCase();

    const resultado =
    menu.filter(item =>

        item.nome
        .toLowerCase()
        .includes(termo)

    );

    renderMenu(resultado);

});

/* =====================
   FILTROS
===================== */

document
.querySelectorAll("[data-filter]")
.forEach(btn => {

    btn.addEventListener("click", () => {

        const filtro =
        btn.dataset.filter;

        if(filtro === "all"){

            renderMenu(menu);

            return;
        }

        const resultado =
        menu.filter(
            item =>
            item.categoria === filtro
        );

        renderMenu(resultado);

    });

});

/* =====================
   CARRINHO
===================== */

const cartToggle =
document.getElementById("cartToggle");

const closeCart =
document.getElementById("closeCart");

cartToggle.addEventListener("click", () => {

    cartSidebar.classList.add("active");

});

closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

});

/* =====================
   WHATSAPP
===================== */

document
.getElementById("checkoutBtn")
.addEventListener("click", () => {

    if(cart.length === 0){

        alert(
        "Seu pedido está vazio."
        );

        return;
    }

    let total = 0;

    let mensagem =
    "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";

    cart.forEach(item => {

        mensagem +=

        `• ${item.quantidade}x ${item.nome}%0A`;

        total +=
        item.preco *
        item.quantidade;

    });

    mensagem +=

    `%0ATotal: R$ ${total.toFixed(2)}`;

    mensagem +=
    `%0A%0ANome:`;

    mensagem +=
    `%0ATelefone:`;

    const numero =
    "5564999999999";

    const url =
    `https://wa.me/${numero}?text=${mensagem}`;

    window.open(url,"_blank");

});

/* =====================
   SLIDER
===================== */

const slides =
document.querySelectorAll(".slide");

let slideAtual = 0;

setInterval(() => {

    slides.forEach(slide => {

        slide.classList.remove("active");

    });

    slideAtual++;

    if(slideAtual >= slides.length){

        slideAtual = 0;

    }

    slides[slideAtual]
    .classList.add("active");

},3000);