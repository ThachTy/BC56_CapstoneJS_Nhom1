const NIKE = 'loai1'

export let renderProductList = (list) => {
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