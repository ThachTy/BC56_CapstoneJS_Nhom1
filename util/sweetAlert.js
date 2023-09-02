import sweetalert2 from "https://cdn.jsdelivr.net/npm/sweetalert2@11.7.27/+esm";


let success = function (message) {
    sweetalert2.fire(
        'Successfull !',
        message,
        'success')
}

let sweetAlert = {
    success,
}

export default sweetAlert;