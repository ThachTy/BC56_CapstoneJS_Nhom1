/* Carousel */
// function carouselNext() {
//   const carouselItem = document.querySelectorAll('.carousel__item')
//   const carousel = document.querySelector('.carousel__content')
//   carousel.appendChild(carouselItem[0])
// }
// function carouselPrev() {
//   const carouselItem = document.querySelectorAll('.carousel__item')
//   const carousel = document.querySelector('.carousel__content')
//   carousel.prepend(carouselItem[carouselItem.length - 1])
// }
// document.querySelector('.btn-next').onclick = carouselNext
// document.querySelector('.btn-prev').onclick = carouselPrev

/*
 Object Product
        "Name": "Oriental Wooden Chicken",
        "Price": "521.00",
        "Image": "https://loremflickr.com/640/480/sports",
        "Desc": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        "Type": "Plastic",
        "Id": "39"
*/



/*===========================GLOBAL===========================*/
var arraySearch = [];
var listProducts = [];
/*===========================DOM==============================*/
const TABLE_PRODUCT = document.querySelector('#listProduct');
const BODY_CART = document.querySelector('#cartBody');





const URL_CART = "https://64c62b5ec853c26efadb28e8.mockapi.io/Cart/";
const URL_PRODUCTS = "https://64c62b5ec853c26efadb28e8.mockapi.io/Product/";
/*============================================================*/
function RenderProduct(list) {
  TABLE_PRODUCT.innerHTML = "";
  var text = "";

  for (const product of list) {
    text += `<div class="col">
                <div class="card">
                    <img src=${product.Image} alt="">
                    <div class="card-content">
                      <div class="card-title">
                        <h5>
                          ${product.Name}
                        </h5>
                        <span>$${product.Price}</span>
                      
                      </div>
                        
                      <p>
                        ${product.Desc}
                      </p>
                    </div>
                    <a onclick="AddCart(${product.Id})" class="btn-Add" role="button">
                        <i class="bi bi-bag-plus-fill"></i>
                    </a>
                </div>
            </div>`;
  }
  TABLE_PRODUCT.innerHTML = text;
}

async function GetAPI(URL, id = "") {
  URL += id;
  var respon = await axios.get(URL, {}).then()
  return respon.data;
}

async function PutAPI(URL, id, data = []) {
  URL += id;
  var respon = await axios.put(URL, { Products: data }).then()
  return respon.request;
}

document.body.onload = async function () {
  // Product
  var products = await GetAPI(URL_PRODUCTS);
  RenderProduct(products);

  // Cart
  var prodctFromCart = await GetProductsFromCart("1");
  listProducts = await GetProductsFromCart();
  RenderCart(prodctFromCart.reverse());

}

function SearchProducts(list = [], valueSearch = "", key) {
  var listSearch = [];
  valueSearch = stringToSlug(valueSearch);
  for (const product of list) {
    const SEARCH = stringToSlug(product[`${key}`]);
    if (SEARCH.search(valueSearch) != -1) {
      listSearch.push(product);
    }
  }
  return listSearch;
}


document.querySelector('#categories').onchange = async function (event) {
  var slect = event.target;
  var products = await GetAPI(URL_PRODUCTS);
  if (slect.options.selectedIndex == 0) {
    RenderProduct(products);
  }
  else {
    var listSearch = SearchProducts(products, slect.value, "Type");
    RenderProduct(listSearch);
  }
}

document.querySelector('#typeSearch').onkeyup = async function (event) {
  var type = event.target;
  var products = await GetAPI(URL_PRODUCTS);
  if (type.value == "") {
    RenderProduct(products);
  }
  else {
    var listSearch = SearchProducts(products, type.value, "Name")
    RenderProduct(listSearch);
  }
}


/*==========================CART================================*/
function RenderCart(list) {
  document.getElementById('numberItems').innerText = `(${list.length} items)`;

  BODY_CART.innerHTML = "";
  var text = "";


  for (let index = list.length - 1; 0 <= index; index--) {
    const products = list[index];
    // const total = products.Price * quantity.value;

    text += `<!-- Cart Item -->
                <div class="cart-items ">
                    <div class="cart-img"><img src=${products.Image} alt=""></div>
                    <div class="cart-detail">
                        <div class="details">
                            <p id="nameProduct">${products.Name}</p>
                            <a class="btn-remove" onclick=RemoveProduct(${products.Id}) role="button">
                              <i class="bi bi-x"></i>
                            </a>
                            <div class="row">
                                <span class="col">Quantity:</span>
                                <p id="quantityProduct" data-id=${products.Id} class="col quantity">1</p>
                            </div>
                            <div class="row">
                                <span class="col">Price:</span>
                                <p id="priceProduct" class="col price">${products.Price}</p>
                            </div>
                            <div class="row">
                                <span class="col">Total</span>
                                <p id="totalProduct" data-id=${products.Id} class="col total">${products.Price}</p>
                            </div>
                        </div>
                        <div class="cart-quantity">
                            <button onclick="UpNumber(${products.Id})" class="btn-plus" type="button"><i class="bi bi-plus-circle"></i></button>
                            <input onchange="ChangeNumber(${products.Id})" data-id=${products.Id} id="numberProduct" type="number" value="1" min=0>
                            <button onclick="DownNumber(${products.Id})" class="btn-dash" type="button"><i class="bi bi-dash-circle"></i></button>
                        </div>
                    </div>
                </div>`;
  }

  BODY_CART.innerHTML = text;
  Total();
}

async function AddCart(id) {
  let product = await GetAPI(URL_PRODUCTS, id);

  // Kiểm tra resquest thành công mới add vào danh sách
  if (true) {
    AddListProducts(product);
    RenderCart(listProducts);
    // Kiểm tra put thành công mới render danh sách cart
    let respon = await PutAPI(URL_CART, "1", listProducts);
  }
}

async function GetProductsFromCart(idCart = "1") {
  let cart = await GetAPI(URL_CART, idCart);
  return cart.Products;
}


// Kiểm tra Product có trong listProduct không
// Nếu CÓ => return
// KHÔNG => push vào danh sách
async function AddListProducts(object) {

  for (const iterator of listProducts) {
    if (iterator.Id == object.Id) {
      return;
    }
  }
  listProducts.push(object);

}


// Remove Product from Cart
async function RemoveProduct(id) {
  for (let index = 0; index < listProducts.length; index++) {
    if (id == listProducts[index].Id) {
      listProducts.splice(index, 1);
    }
  }
  PutAPI(URL_CART, "1", listProducts);
  RenderCart(listProducts);
}


window.DownNumber = function (id) {
  var number = document.querySelector(`input[data-id="${id}"]`);
  const QUANTITY = document.querySelector(`#quantityProduct[data-id="${id}"]`);

  if (number.value * 1 > 0) {
    number.value = number.value * 1 - 1;
    QUANTITY.innerText = number.value;
    TotalProduct(id);
  }
}

window.UpNumber = function (id) {
  var number = document.querySelector(`input[data-id="${id}"]`);
  const QUANTITY = document.querySelector(`#quantityProduct[data-id="${id}"]`);

  number.value = number.value * 1 + 1;
  QUANTITY.innerText = number.value;
  TotalProduct(id);
}

window.ChangeNumber = function (id) {

  TotalProduct(id);

}


function TotalProduct(id) {
  const QUANTITY = document.querySelector(`#quantityProduct[data-id="${id}"]`);
  const TOTAL_PRODUCT = document.querySelector(`#totalProduct[data-id="${id}"]`);

  var price = document.getElementById('priceProduct').innerText * 1;
  var inputNumber = document.querySelector(`input[data-id="${id}"]`).value * 1;

  if (inputNumber >= 0) {
    QUANTITY.innerText = inputNumber;
    TOTAL_PRODUCT.innerText = (price * inputNumber);
    Total();
  }
}

function Total() {
  const TOTAL = document.getElementById('total');
  const TOTAL_PRODUCTS = document.querySelectorAll('.total');
  var sum = 0;

  for (const iterator of TOTAL_PRODUCTS) {
    sum += new Number(iterator.innerText);
  }

  TOTAL.innerText = sum.toLocaleString() + "$";
}