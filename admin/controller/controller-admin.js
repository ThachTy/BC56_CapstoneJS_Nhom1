const NIKE = 'loai1'

export let rendertList = (list) => {
    render(list)
    window.search = () => {
        var name = document.getElementById('searchName').value
        console.log(name)
        if (name === "") {
            render(list)
        }
        else {
            const results = list.filter((list) => list.name.toLowerCase().startsWith(name.toLowerCase()));
            console.log(results.length)
            render(results)
        }
    }
    function render(list){
        let contentHTTML = "";
        list.reverse().forEach(({id, name, price, discount, status, image, description, brand}) => {
                let trString= `<tr>
                                    <td>${id}</td>
                                    <td>${name}</td>
                                    <td>${price}</td>
                                    <td><img style = "width:300px; height:150px" src="${image}"></td>
                                    <td>${description}</td>
                                    <td>
                                        <button class='btn-danger btn' 
                                        onclick="deleteProduct(${id})">Xóa</button>
                                        <button class='btn-primary btn'
                                        onclick="editProduct(${id})">Sửa</button>
                                    </td>
                                    
                            </tr>`
                contentHTTML+= trString;
            });
            document.getElementById("tableDanhSach").innerHTML = contentHTTML;
        }
    
};


export let layThongTin=() => {
    let id = document.getElementById("idName").value;
    let name = document.getElementById("shoeName").value;
    let price = document.getElementById("price").value;
    let discount = document.getElementById("discount").value;
    let status = document.getElementById("status").value;
    let image = document.getElementById("imgLink").value;
    let description = document.getElementById("description").value;
    let brand = document.getElementById("brand").value;
    console.log(status)
    return {
       id, name, price, discount, status, image, description, brand,
    };
}

export let showDataForm = (data) => {
    let {id, name, price, discount, status, image, description, brand} = data;
    document.getElementById("idName").value = id;
    document.getElementById("shoeName").value = name;
    document.getElementById("price").value = price;
    document.getElementById("discount").value = discount;
    document.getElementById("status").value = status;
    document.getElementById("imgLink").value = image;
    document.getElementById("description").value =description;
    document.getElementById("brand").value = brand;
    
};
// export let rendertList = (list) => {
//     let i = 0
//     renderProductList(list)
//     console.table(list)
//     window.search = () => {
//         var type = document.querySelector('#selLoai').value
//         var pro = []
//         if (type === "all") {
//             renderProductList(list)
//         }
//         if (type === "Nike") {
//             for (i = 0; i < list.length; i++){
//                 if (list[i].type === "Nike"){
//                     pro.push({...list[i]});
//                 }
//             }
//             console.table(pro)
//             renderProductList(pro);
//         }
//         if (type === "Adidas") {
//             for (i = 0; i < list.length; i++) {
//                 if (list[i].type ==="Adidas" ){
//                     pro.push(list[i]);
//                 }
//             }
//             renderProductList(pro)
//         }
//     }
// }
export let onSuccess = (message) => {
    Swal.fire(message,"","success");
}
export let onFail = (message) => {
    Swal.fire(message, "", "error")
}

// valid 
export let valid_data = (data) => {
    let { id,
        name,
        price,
        discount,
        status,
        image,
        description, } = data, ret = 0
    let noti_id = document.getElementById("noti_req_id")
    let noti_name = document.getElementById("noti_req_name")
    let noti_price = document.getElementById("noti_req_price")
    let noti_discount = document.getElementById("noti_req_discount")
    let noti_status = document.getElementById("noti_req_status")
    let noti_image = document.getElementById("noti_req_image")
    let noti_description = document.getElementById("noti_req_description")
    //id
    if (id === "") {
        noti_id.style.display = "block"
        ret = 1
    } else {
        noti_id.style.display = "none"
    }
    if (name === "") {
        noti_name.style.display = "block"
        ret = 1
    } else {
        noti_name.style.display = "none"
    }
    if (price === "" || price < 0) {
        noti_price.style.display = "block"
        ret = 1
    } else {
        noti_price.style.display = "none"
    }
    if (discount === "") {
        noti_discount.style.display = "block"
        ret = 1
    } else {
        noti_discount.style.display = "none"
    }
    if (status === 'select all') {
        noti_status.style.display = "block"
        ret = 1
    } else {
        noti_status.style.display = "none"
    }
    if (image === "") {
        noti_image.style.display = "block"
        ret = 1
    } else {
        noti_image.style.display = "none"
    }
    if (description === "") {
        noti_description.style.display = "block"
        ret = 1
    } else {
        noti_description.style.display = "none"
    }
    if (ret == 1) {
        return true
    } else return false
}

// new data add
export let new_data = () => {
    document.querySelector("input[id='idName']").value = ""
    document.querySelector("input[id='shoeName']").value = ""
    document.querySelector("input[id='price']").value = ""
    document.querySelector("input[id='discount']").value = ""
    document.querySelector("#status").value = 'select all'
    document.querySelector("input[id='imgLink']").value = ""
    document.querySelector("input[id='description']").value = ""
    document.querySelector("#brand").value = 'Select brand'

    
}