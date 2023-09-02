const BASE_URL = "https://64de24a0825d19d9bfb22b3d.mockapi.io/product"

let getList = () => {
     console.log('A')
    return axios({
        url: BASE_URL,
        method: "GET",
    });
};
let deleteProduct = (id) =>{
    return axios({
        url : `${BASE_URL}/${id}`,
        method: "DELETE"
   });
};

let addProduct = (product) => {
    return axios ({
        url: BASE_URL,
        method: "POST",
        data: product,
    });
};
//getDetail
let getDetail = (id) => {
    return axios({
        url: `${BASE_URL}/${id}`,
        method: "GET",
    });
};
function updateProduct(id, product) {
    return axios({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        data: product,
    });
};
let productServ = {
    getList,
    deleteProduct,
    addProduct,
    getDetail,
    updateProduct,
};

export default productServ;
