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

let container = document.getElementById("container")

//Obtener productos
const obtenerProductos = async ()=>{
  const resp = await fetch("./productos.json")
  const data = await resp.json();
  data.forEach(el => {
    productos.push(new Productos(el.name, el.desc, el.price, el.img))
  })
  mostrarDOM()
}

//For of del DOM y evento del botón comprar para añadir al carrito
function mostrarDOM (){
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
  Swal.fire({
    title: '¿Desea eliminar los productos del carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF0A2E',
    cancelButtonColor: '#0AFF94',
    confirmButtonText: '¡Eliminalos!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Carrito eliminado.',
        showConfirmButton: false,
        timer: 1350
      })
      eraseCart()
    }
  })
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
  if (carrito.length === 0) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No hay productos en el carrito.',
      showConfirmButton: false,
      timer: 1350
    })
   }
   else {

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Compra exitosa!',
      text: `Se realizó su compra por un total de $${total}`,
      showConfirmButton: false,
      timer: 2000
    })
    eraseCart()
   }
})

//localStorage
carrito = JSON.parse(localStorage.getItem("localCart")) || []
updateCart()

total = JSON.parse(localStorage.getItem("localTotal"))

//Obtiene los productos y los muestra en el html
obtenerProductos()
mostrarDOM()