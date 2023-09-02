// valid
export let valid_id = (id) => {
    if (id === "") {
        document.getElementById("id").value = "Khong duoc de trong"
        return true
    }
    return false
}