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
/*===========================DOM==============================*/
const TABLEPRODUCT = document.querySelector('#listProduct');



/*============================================================*/
function RenderProduct(listProducts) {
  TABLEPRODUCT.innerHTML = "";
  var text = "";

  for (const product of listProducts) {
    text += `<div class="col">
                        <div class="card w-100 p-3">
                            <div class="card-top">
                                <img src=${product.Image} class="card-img-top d-block w-100" alt="...">
                            </div>
                            <div class="card-body px-0">
                                <h5 class="card-title">${product.Name}</h5>
                                <p class="card-start">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </p>
                                <p class="d-flex justify-content-between align-items-center">
                                    <span class="card-type"> ${product.Type}</span>
                                    <span class="card-price"> ${product.Price}$</span>
                                </p> 
                                <p class="card-text">${product.Desc}</p>
                            </div>
                            <div class="card-footer px-0">
                                <button onclick="AddCart()" data-id=${product.Id} id="AddCart" class="btn btn-primary ml-5">
                                    <i class="fa-solid fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>`;
  }

  TABLEPRODUCT.innerHTML = text;
}

async function GetProducts() {
  //  url tạm thời
  const URL = "../Product.json";
  var respon = await axios.get(URL, {}).then()
  return respon.data;
}

document.body.onload = async function () {
  var products = await GetProducts();
  RenderProduct(products);
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
  var products = await GetProducts();
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
  var products = await GetProducts();
  console.log(type.value);
  if (type.value == "") {
    RenderProduct(products);
  }
  else {
    var listSearch = SearchProducts(products, type.value, "Name")
    RenderProduct(listSearch);
  }
}