import productServ from "../admin/util/service.js";
import sweetAlert from "../util/sweetAlert.js";
import Product from "../Models/Product.js";


/*=========================== GLOBAL ================================*/
var listProducts = [];

/*============================ DOM ====================================*/
const TABLE_PRODUCT = document.querySelector('#listProduct');
const BODY_CART = document.querySelector('#cartBody');
const URL_CART = "https://64c62b5ec853c26efadb28e8.mockapi.io/Cart/";


/*============================ EVENT ==================================*/
document.body.onload = async function () {
  // Product
  await productServ.getList().then((res) => {
    RenderProduct(res.data);
  }).catch(console.log);

  // Cart
  if (GetLocalStorage("cart")) {
    const productFromCart = GetLocalStorage("cart");
    ChangeToProduct(productFromCart);
    RenderCart(listProducts);
  }
}

document.querySelector('#categories').onchange = async function (event) {
  var slect = event.target;

  await productServ.getList().then((res) => {
    if (slect.options.selectedIndex == 0) {
      RenderProduct(res.data);
    }
    else {
      var listSearch = SearchProducts(res.data, slect.value, "brand");
      RenderProduct(listSearch);
    }
  }).catch(console.log);
}

document.querySelector('#typeSearch').onkeydown = async function (event) {
  var type = event.target;

  await productServ.getList().then(function (res) {
    if (type.value.length == 0) {
      RenderProduct(res.data);
    }
    else {
      var listSearch = SearchProducts(res.data, type.value, "name")
      RenderProduct(listSearch);
    }
  }).catch(console.log);
}

// Remove Product from Cart
window.RemoveProduct = async function (id) {
  for (let index = 0; index < listProducts.length; index++) {
    if (id == listProducts[index].id) {
      listProducts.splice(index, 1);
    }
  }
  PostLocalStorage(listProducts);
  RenderCart(listProducts);
  await PutAPI(URL_CART, "1", listProducts);
}

window.AddCart = function (id) {
  // Lấy Object Product theo Id => res.data
  productServ.getDetail(id).then(async function (res) {
    // Kiểm tra resquest thành công mới add vào danh sách
    if (CheckIntoListProduct(res.data)) {
      ChangeToProduct([res.data]);
      PostLocalStorage(listProducts);
      RenderCart(listProducts);
      // Kiểm tra put thành công mới render danh sách cart
      await PutAPI(URL_CART, "1", listProducts);
    }
  }).catch(console.log);
}


window.DownNumber = function (id) {
  var number = document.querySelector(`input[data-id="${id}"]`);
  const QUANTITY = document.querySelector(`#quantityProduct[data-id="${id}"]`);

  if (number.value * 1 > 0) {
    number.value = number.value * 1 - 1;
    QUANTITY.innerText = number.value;
    for (const iterator of listProducts) {
      if (iterator.id == id) {
        iterator.quantity = number.value * 1;
      }
    }
    TotalProduct(id);
    PostLocalStorage(listProducts);
  }
}

window.UpNumber = function (id) {
  var number = document.querySelector(`input[data-id="${id}"]`);
  const QUANTITY = document.querySelector(`#quantityProduct[data-id="${id}"]`);

  number.value = number.value * 1 + 1;
  QUANTITY.innerText = number.value;
  for (const iterator of listProducts) {
    if (iterator.id == id) {
      iterator.quantity = number.value * 1;
    }
  }
  TotalProduct(id);
  PostLocalStorage(listProducts);
}

window.ChangeNumber = function (target, id) {
  const inputNumber = target.value;

  for (const iterator of listProducts) {
    if (iterator.id == id) {
      iterator.quantity = inputNumber;
    }
  }
  TotalProduct(id);
  PostLocalStorage(listProducts);
}

document.getElementById('btnCheckOut').onclick = function () {
  if (listProducts.length != 0) {
    listProducts = [];
    RenderCart(listProducts);
    document.querySelectorAll('.total').innerText = "0.00$";
    PostLocalStorage(listProducts);
    sweetAlert.success("You've successfully paid !");

    const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasScrolling');
    bsOffcanvas._isShown = true;
    bsOffcanvas.toggle('show');
  }
  else {
    sweetAlert.error("Cart is Emty !!!");
  }
}

/*============================ PRODUCT ================================*/
function RenderProduct(list) {
  TABLE_PRODUCT.innerHTML = "";
  var text = "";

  for (const product of list) {
    text += `<div class="col mb-2 mb-sm-3  mb-md-3 p-lg-1">
                <div class="card">
                    <img src=${product.image} alt="">
                    <div class="card-content">
                      <div class="card-title">
                        <h5>
                          ${product.name}
                        </h5>
                        <span>$${(product.price * 1).toLocaleString()}</span>
                      </div>
                      <p>
                        ${product.description}
                      </p>
                    </div>
                    <a onclick="AddCart(${product.id})" class="btn-Add" role="button">
                        <i class="bi bi-bag-plus-fill"></i>
                    </a>
                </div>
            </div>`;
  }
  TABLE_PRODUCT.innerHTML = text;
}


async function PutAPI(URL, id, data = []) {
  URL += id;
  var respon = await axios.put(URL, { Products: data }).then()
  return respon.request;
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

/*========================== CART ======================================*/
function RenderCart(list) {
  document.getElementById('numberItems').innerText = `(${list.length} items)`;

  BODY_CART.innerHTML = "";
  var text = "";

  for (let index = list.length - 1; 0 <= index; index--) {
    const products = list[index];
    text += `<!-- Cart Item -->
                <div class="cart-items ">
                    <div class="cart-img"><img src=${products.image} alt=""></div>
                    <div class="cart-detail">
                        <div class="details">
                            <p id="nameProduct">${products.name}</p>
                            <a class="btn-remove" onclick=RemoveProduct(${products.id}) role="button">
                              <i class="bi bi-x"></i>
                            </a>
                            <div class="row">
                                <span class="col">Quantity:</span>
                                <p id="quantityProduct" data-id=${products.id} class="col quantity">${products.quantity}</p>
                            </div>
                            <div class="row">
                                <span class="col">Price:</span>
                                <p id="priceProduct-${products.id}" class="col price" data-price=${products.price}>${products.price.toLocaleString()}$</p>
                            </div>
                            <div class="row">
                                <span class="col">Total</span>
                                <p id="totalProduct" class="col total"  data-id=${products.id} data-totalPrice=${products.Total()}>${products.Total().toLocaleString()}$</p>
                            </div>
                        </div>
                        <div class="cart-quantity">
                            <button onclick="UpNumber(${products.id})" class="btn-plus" type="button"><i class="bi bi-plus-circle"></i></button>
                            <input onchange="ChangeNumber(this,${products.id})" data-id=${products.id} id="numberProduct" type="number" value="${products.quantity}" min=0>
                            <button onclick="DownNumber(${products.id})" class="btn-dash" type="button"><i class="bi bi-dash-circle"></i></button>
                        </div>
                    </div>
                </div>`;
  }

  BODY_CART.innerHTML = text;
  Total();
}

function ChangeToProduct(array = []) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    var product = new Product(element.id, element.name,
      element.price, element.image,
      element.brand, element.quantity)
    listProducts.push(product);
  }
}


// Kiểm tra Product có trong listProduct không
// Nếu CÓ => return false
// KHÔNG => return true
function CheckIntoListProduct(object) {
  for (const iterator of listProducts) {
    if (iterator.id == object.id) {
      return false;
    }
  }
  return true
}

function TotalProduct(id) {
  const QUANTITY = document.querySelector(`#quantityProduct[data-id="${id}"]`);
  const TOTAL_PRODUCT = document.querySelector(`#totalProduct[data-id="${id}"]`);

  var price = document.querySelector(`#priceProduct-${id}`).getAttribute("data-price") * 1;
  var inputNumber = document.querySelector(`input[data-id="${id}"]`).value * 1;

  if (inputNumber >= 0) {
    QUANTITY.innerText = inputNumber;
    TOTAL_PRODUCT.innerText = ChangeCurrency(price * inputNumber);
    TOTAL_PRODUCT.setAttribute(`data-totalPrice`, price * inputNumber);
    Total();
  }
}


function Total() {
  const TOTAL = document.getElementById('total');
  const TOTAL_PRODUCTS = document.querySelectorAll('.total');
  var sum = 0;

  for (const iterator of TOTAL_PRODUCTS) {
    sum += new Number(iterator.getAttribute('data-totalPrice'));
  }
  TOTAL.innerText = ChangeCurrency(sum);
}


function ChangeCurrency(price) {
  var dollar = (price * 1).toLocaleString() + "$";
  return dollar;
}

function PostLocalStorage(list) {
  var listJSON = JSON.stringify(list);
  localStorage.setItem("cart", listJSON);
}

function GetLocalStorage(text = "cart") {
  var string = localStorage.getItem(text);
  if (localStorage.getItem(text)) {
    return JSON.parse(string);
  }
  else
    return false;
}