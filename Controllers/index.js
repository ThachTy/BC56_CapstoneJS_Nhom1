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
                    <a href="#" class="btn-Add">
                        <i class="bi bi-bag-plus-fill"></i>
                    </a>
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
  if (type.value == "") {
    RenderProduct(products);
  }
  else {
    var listSearch = SearchProducts(products, type.value, "Name")
    RenderProduct(listSearch);
  }
}