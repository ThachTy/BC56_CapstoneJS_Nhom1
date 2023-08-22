import productServ from "../util/service.js";
import {renderProductList,layThongTin,showDataForm, } from "./controller-admin.js";

//render 
let fetchProductList = () => {
    console.log("fetchProductList");
    productServ.getList()
        .then((res) => {
            console.log(res);
            renderProductList(res.data)
         })
         .catch((err) => {
              console.log(err);
         });
}
fetchProductList();

let deleteProduct = (id) => {
   productServ.deleteProduct(id)
    .then((res) => {
        console.log(res);
        fetchProductList();
    })
    .catch((err) => {
        console.log(err);
    })
};
window.deleteProduct = deleteProduct;

window.addProduct = () => {
    console.log("yes");
    let data = layThongTin();
    productServ
    .addProduct(data)
    .then((res) => {
         $('#myModal').modal('hide'); 
        // onSuccess("Thêm thành công");
        fetchProductList();
    })
    .catch((err) => {
        console.log(err);
    });
};

window.editProduct = (id) => {
    $('#myModal').modal('show');
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
                        // onSuccess("cập nhật thành công")
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

