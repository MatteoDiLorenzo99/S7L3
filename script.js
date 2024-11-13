// Endpoint API per ottenere i libri
const API_URL = "https://striveschool-api.herokuapp.com/books";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funzione per caricare i libri dall'API
async function loadBooks() {
  const response = await fetch(API_URL);
  const books = await response.json();
  displayBooks(books);
}

// Funzione per visualizzare i libri
function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  books.forEach(book => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 col-lg-3 mb-4";
    
    col.innerHTML = `
      <div class="card">
        <img src="${book.img}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">€${book.price}</p>
          <button class="btn btn-danger" onclick="removeBook(this)">Scarta</button>
          <button class="btn btn-success ms-2" onclick="addToCart('${book.title}', ${book.price})">Compra ora</button>
        </div>
      </div>
    `;
    bookList.appendChild(col);
  });
}

// Funzione per rimuovere un libro dalla visualizzazione
function removeBook(button) {
  const card = button.closest(".col-12");
  card.remove();
}

// Funzione per aggiungere un libro al carrello
function addToCart(title, price) {
  cart.push({ title, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Funzione per aggiornare il carrello nella pagina
function updateCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = ""; // Svuota la lista del carrello
  
  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
      ${item.title} - €${item.price}
      <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Rimuovi</button>
    `;
    cartList.appendChild(listItem);
  });
}

// Funzione per rimuovere un libro dal carrello
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Funzione per acquistare i libri nel carrello
function compraOra() {
  if (cart.length > 0) {
    alert("Acquisto completato!");
    cart = [];
    localStorage.removeItem("cart");
    updateCart();
  } else {
    alert("Il carrello è vuoto!");
  }
}

// Carica i libri e aggiorna il carrello all'avvio
loadBooks();
updateCart();
