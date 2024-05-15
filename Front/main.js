var name_cou = window.document.getElementById("name_cou");
var cat_cou = window.document.getElementById("cat_cou");
var price_cou = window.document.getElementById("price_cou");
var click = window.document.getElementById("click");
var deo = window.document.getElementById("demo");
var nameAlert = document.getElementById("nameAlert");
var index_global;
var cources;
if (localStorage.getItem("Cources List") == null) {
    cources = [];
} else {
    cources = [];
    cources = JSON.parse(localStorage.getItem("Cources List"));
    displayCources();
}
click.onclick = function () {
    if (click.innerHTML == "add") {
        addCources();
    } else {
        update(index_global);
        displayCources();
    }
    localStorage.setItem("Cources List", JSON.stringify(cources));
    displayCources();
    clear();
}

function addCources() {
    var cource = {
        name: name_cou.value,
        cat: cat_cou.value,
        price: price_cou.value,
        // sale: sale_cou
    };
    cources.push(cource);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'cource add successfull',
        showConfirmButton: false,
        timer: 1500
    })
}

function displayCources() {
    var test = "";
    for (var i = 0; i < cources.length; i++) {
        test += `<tr>
        <td>${i} </td>
        <td> ${cources[i].name}</td>
        <td> ${cources[i].cat}</td>
        <td>${cources[i].price} </td>
        <td><button onclick="deleteBtn(${i})" class="btn btn-outline-danger">Delete</button>
        <button onclick="getBtn(${i})" class="btn btn-outline-primary">update</button></td>
        </tr>`;
    }
    window.console.log(test);
    deo.innerHTML = test;
}

function clear() {
    name_cou.value = "";
    cat_cou.value = "";
    price_cou.value = "";
}

function deleteBtn(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            cources.splice(index, 1);
            localStorage.setItem("Cources List", JSON.stringify(cources));
            displayCources();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}

function search(e) {
    var test = "";
    for (var i = 0; i < cources.length; i++) {
        if (cources[i].name.toLowerCase().includes(e.toLowerCase()))
            test += `<tr>
        <td>${i} </td>
        <td> ${cources[i].name}</td>
        <td> ${cources[i].cat}</td>
        <td>${cources[i].price} </td>
        <td><button onclick="deleteBtn(${i})" class="btn btn-outline-danger">Delete</button>
        <button class="btn btn-outline-primary">update</button></td>
        </tr>`;
    }
    window.console.log(test);
    deo.innerHTML = test;
}

function getBtn(e) {
    name_cou.value = cources[e].name;
    cat_cou.value = cources[e].cat;
    price_cou.value = cources[e].price;
    click.innerHTML = "update";
    index_global = e;
}

function update(e) {
    cources[e].name = name_cou.value;
    cources[e].cat = cat_cou.value;
    cources[e].price = price_cou.value;
    window.console.log(cources);
    localStorage.setItem("Cources List", JSON.stringify(cources));
}

name_cou.onkeyup = function () {
    var namepatter = /^[A-Z][a-z]{2,8}$/;
    if (namepatter.test(name_cou.value)) {
        click.removeAttribute("disabled");
        name_cou.classList.add("is-valid");
        name_cou.classList.remove("is-invalid");
        nameAlert.classList.add('d-none');

    } else {
        click.setAttribute("disabled", "disabled");
        name_cou.classList.replace("is-valid", "is-invalid");
        nameAlert.classList.add('d-block');
        nameAlert.classList.remove('d-none');

    }
}
