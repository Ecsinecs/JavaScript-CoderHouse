//Constructor
let carrito = [];
let total = 0

class Productos {
  constructor(name, desc, price, img) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.img = img;
  }
}

//Array de los productos
const productos = [];

productos.push(new Productos("Ají Morrón", "Un kilo de pimiento dulce/Ají Morrón natural y fresco.", 760, "./assets/img/aji.jpg"));
productos.push(new Productos("Berenjena", "Un kilo de berenjena natural y fresca.", 640, "./assets/img/berenjena.jpg"));
productos.push(new Productos("Boniato", "Un kilo de boniato natural fresco.", 465, "./assets/img/boniato.jpg"));
productos.push(new Productos("Brocoli", "Un kilo de brocoli natural fresco.", 540, "./assets/img/brocoli.jpg"));
productos.push(new Productos("Calabacín", "Un kilo de calabacín natural fresco.", 430, "./assets/img/calabacin.jpg"));
productos.push(new Productos("Cebolla", "Un kilo de cebolla natural sin quimicos.", 420, "./assets/img/cebolla.jpg"));
productos.push(new Productos("Coles de Brucelas", "500 gramos de coles de brucelas naturales frescas.", 370, "./assets/img/coles de brucelas.jpg"));
productos.push(new Productos("Espinaca", "Dos kilos de espinaca natural sin quimicos.", 670, "./assets/img/espinaca.jpg"));
productos.push(new Productos("Tomate", "Un kilo de tomate natural fresco sin quimicos.", 560, "./assets/img/tomate.jpg"));
productos.push(new Productos("Zanahoria", "Dos kilos de zanahoria natural fresca.", 520, "./assets/img/zanahoria.jpg"));

let container = document.getElementById("container")

//For of del DOM y evento del botón comprar para añadir al carrito
for (const producto of productos) {
    let div = document.createElement("div")
    div.className = "card"
    div.innerHTML = 
    `
    <img class="card__img" src = "${producto.img}" alt="">
    <h2 class="card__title"> ${producto.name} </h2>
    <p class="card__desc"> ${producto.desc} </p>
    <p> $${producto.price}</p>
    <button id="btn${producto.name}" class="card__button"> Comprar <i class="fa-solid fa-cart-plus"></i> </button>
    `;
    container.append(div)

    const btn = document.getElementById(`btn${producto.name}`)

    btn.addEventListener(`click`, () => {
      addCart(producto.name)
    })
}


//Funcion que realizará el añadir el producto al carro y el DOM


let cart = document.getElementById("cart")

const addCart = (prodName) => {
  const item = productos.find((prod) => prod.name === prodName)
  carrito.push(item)
  updateCart()
  localStorage.setItem("localCart", JSON.stringify(carrito))
  console.log(carrito)
  total = total + item.price
  localStorage.setItem("localTotal", JSON.stringify(total))
}

const updateCart = () => {
  cart.innerHTML = `Productos agregados: ${carrito.length}`

  carrito.forEach((prod) => {
    const div = document.createElement("div")
    div.className = (`containerCart__card`)
    div.innerHTML = 
    `
    <img class="containerCart__img" src = "${prod.img}" alt="">
    <div class="containerCart__div">
    <p class="containerCart__name">${prod.name}</p>
    <p>Precio: $${prod.price}</p>
    </div>
    `
    cart.appendChild(div)
  })
 }
//Botón que borrará el carrito
let eraseBtn = document.getElementById("erase")

eraseBtn.addEventListener(`click`, () => {
  eraseCart()
})

function eraseCart () {
  cart.innerHTML = `Productos agregados: 0`
  total = 0
  carrito.length = 0
  console.log(carrito)
  localStorage.setItem("localCart", JSON.stringify(carrito))
  localStorage.setItem("localTotal", JSON.stringify(total))
 }

//Botón para comprar
let buyBtn = document.getElementById("buy")

buyBtn.addEventListener(`click`, () => {
 alert(`¡Compra exitosa! se realizó su compra por un total de $${total}`)
})

//localStorage
carrito = JSON.parse(localStorage.getItem("localCart")) || []
updateCart()

total = JSON.parse(localStorage.getItem("localTotal"))  