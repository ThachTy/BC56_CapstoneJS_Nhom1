const NIKE = 'loai1'

export let renderProductList = (list) => {
    let contentHTTML = "";
    list.reverse().forEach(({id, name, price, discount, status, image, description, brand}) => {

        let trString= `<tr>
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>${price}</td>
                            <td><"${image}"></td>
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
