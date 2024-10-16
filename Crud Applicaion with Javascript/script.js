let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById('ads');
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit")

let mode = "create";
let tmp;


//get total 
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = "Total:";
        total.style.background = "#ff0000"
    }
}

// create product 
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value,
        price: price.value,
        ads: ads.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (title.value != "" && price.value != "" && category.value != "" && newPro.count < 10) {
        if (mode === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mode = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
    }


    //save local storage
    localStorage.setItem('product', JSON.stringify(dataPro))
    clear();
    showData()

}


//clear inputs
function clear() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "Total:";


}


//read
function showData() {
    getTotal();
    let table = "";
    for (let i = 0; i < dataPro.length; ++i) {
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="update(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All</button>`;
    } else { btnDelete.innerHTML = "" };
}

showData();


//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

//delete all
function deleteAll() {
    dataPro.splice(0)
    localStorage.clear();
    showData();
}


//update
function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update';
    getTotal();
    mode = "update";
    tmp = i;
    scroll({

        top: 0,
        behavior: 'smooth'
    })

}


//search

let searchmode = 'title'
let search = document.getElementById("search")

function mysearchmode(id) {
    if (id == "searchTitle") {
        searchmode = 'title'
    } else {
        searchmode = 'category'
    }
    search.placeholder = 'search by ' + searchmode;

    search.focus()
}

function searchdata(value) {
    value = value.toLowerCase();
    let table = "";

    for (let i = 0; i < dataPro.length; i++) {

        if (searchmode === 'title' && dataPro[i].title.toLowerCase().includes(value)) {
            table += `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
        } else if (searchmode !== 'title' && dataPro[i].category.toLowerCase().includes(value)) {
            table += `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
        }
    }
    document.getElementById("tbody").innerHTML = table;
}