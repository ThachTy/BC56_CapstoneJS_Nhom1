
import productServ from "../util/service.js";
import {layThongTin, showDataForm,onSuccess, valid_data, onFail,new_data, rendertList } from "./controller-admin.js";

//render 
let fetchProductList = () => {
    console.log("fetchProductList");
    productServ.getList()
        .then((res) => {
            console.log(res);
            // renderProductList(res.data)
            rendertList(res.data)
         })
         .catch((err) => {
              console.log(err);
         });
}
fetchProductList();
window.addSh = ()=>{
    new_data()
    valid_data(data)
}
let deleteProduct = (id) => {
   productServ.deleteProduct(id)
    .then((res) => {
        console.log(res);
        onSuccess("xoa thanh cong")
        fetchProductList();
    })
    .catch((err) => {
        console.log(err);
    })
};
window.deleteProduct = deleteProduct;

window.addProduct = () => {
    let data = layThongTin();
    if (!valid_data(data)) {
        productServ
    .addProduct(data)
    .then((res) => {
         new bootstrap.Modal(document.querySelector('#myModal')).hide(); 
        onSuccess("Thêm thành công");
        fetchProductList();
    })
    .catch((err) => {
        console.log(err);
    });
    }else onFail("Add Fail!")
    
};

window.editProduct = (id) => {
    new bootstrap.Modal(document.querySelector('#myModal')).show();
    productServ
        .getDetail(id)
        .then((res) => {
            console.log(res);
            showDataForm(res.data);
            window.updateProduct = () => {
                let data = layThongTin();
                productServ.updateProduct(id, data)
                    .then((res) => {
                        console.table(data);
                        fetchProductList();
                        console.log(data)
                        new bootstrap.Modal(document.querySelector('#myModal')).hide();
                        onSuccess("cập nhật thành công")
                     })
                     .catch((err) => {
                          console.log(err);
                     });
                console.log("update");     
            }
        }) 
        .catch((err) => {
            console.log(err);
        });
};
