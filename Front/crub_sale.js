var pieces = window.document.getElementById("pieces");
var NumbersOfPieces = window.document.getElementById("NumbersOfPieces");
var price = window.document.getElementById("price");
var click = window.document.getElementById("click");
var typeOfpieces = window.document.getElementById("typeOfpieces")
var deo = window.document.getElementById("demo");
var nameAlert = document.getElementById("nameAlert");
var Total = document.getElementById('total')

var index_global;
var id_global;

const urlParams = new URLSearchParams(window.location.search);
const saleId = urlParams.get('id');
console.log('Sale ID:', saleId);

let sale = [];
async function getSale() {
    try {
        const response = await fetch(`http://localhost:3003/api/v1/sale/all/${saleId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch sale data');
        }
        const data = await response.json();
        console.log('Fetched Sale Data:', data);
        sale = data.saling.flat();
        console.log('Sale:', sale);
        displaySale();
        Total.innerHTML = data.totalPriceForMonth;

    } catch (error) {
        console.error('Error fetching sale data:', error);
    }
}

function displaySale() {
    console.log('Displaying Sale:', sale);
    if (!sale) {
        console.log('Sale data is not available.');
        return;
    }
    let test = "";
    for (let i = 0; i < sale.length; i++) {
        let x=sale[i].price * sale[i].NumbersOfPieces;
        test += `<tr>
        <td class="text-center">${i} </td>
        <td  class="text-center"> ${sale[i].pieces}</td>
        <td class="text-center"> ${sale[i].NumbersOfPieces}</td>
        <td class="text-center">${sale[i].price} </td>
        <td class="text-center">${sale[i].typeOfpieces} </td>
        <td class="text-center">${x}</td>
        <td class="text-center"><button onclick="deleteBtn('${sale[i]._id}')" class="btn btn-outline-danger">Delete</button>
        <button onclick="getBtn('${sale[i]._id}', '${i}')" class="btn btn-outline-primary">update</button>
        </td>
        </tr>`;
    }
    deo.innerHTML = test;
}

async function first() {
    await getSale();
    // displaySale();
}
first();

// if (localStorage.getItem("sale") == null) {
//     sale = [];
// } else {
//     cources = [];
//     cources = JSON.parse(localStorage.getItem("sale"));
//     displayCources();
// }

function addSale() {
    fetch(`http://localhost:3003/api/v1/sale/add/${saleId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pieces: pieces.value,
            NumbersOfPieces: NumbersOfPieces.value,
            price: price.value,
            typeOfpieces: typeOfpieces.value,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add sale');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sale added successfully:', data);
            getSale();
        })
        .catch(error => {
            console.error('Error adding sale:', error);
        });
}


click.onclick = function () {
    console.log('inner', click.innerHTML)
    if (click.innerHTML == "ادخال") {
        addSale();
    } else {
        console.log('hhhhhh')
        update(id_global, index_global);
        getSale();
    }
    getSale();
    clear();
}


function clear() {
    price.value = "";
    typeOfpieces.value = "";
    pieces.value = "";
    NumbersOfPieces.value = "";
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
            fetch(`http://localhost:3003/api/v1/sale/delet/${saleId}/${index}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete sale');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Sale deleted successfully:', data);
                    getSale();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .catch(error => {
                    console.error('Error deleting sale:', error);
                    // Handle error
                });
            // sale.splice(index, 1);
            // localStorage.setItem("Cources List", JSON.stringify(cources));

        }
    })
}

function getBtn(id, index) {
    console.log('getBtn', sale)
    console.log('index', index)
    console.log('id', id)
    pieces.value = sale[index].pieces;
    typeOfpieces.value = sale[index].typeOfpieces;
    price.value = sale[index].price;
    NumbersOfPieces.value = sale[index].NumbersOfPieces;
    click.innerHTML = "تعديل";
    index_global = index;
    id_global = id;
}

function update(id, index) {
    console.log('id', id)
    fetch(`http://localhost:3003/api/v1/sale/update/${saleId}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pieces: pieces.value,
            price: price.value,
            NumbersOfPieces: NumbersOfPieces.value,
            typeOfpieces: typeOfpieces.value
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update sale');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sale updated successfully:', data);
            sale[index].pieces = pieces.value;
            sale[index].price = price.value;
            sale[index].NumbersOfPieces = NumbersOfPieces.value;
            sale[index].typeOfpieces = typeOfpieces.value;
            window.console.log(sale);
            click.innerHTML = 'ادخال'
            getSale();
        })
        .catch(error => {
            console.error('Error updating sale:', error);
            // Handle error
        });

}

