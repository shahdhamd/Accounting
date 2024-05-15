var pieces = window.document.getElementById("pieces");
var NumbersOfPieces = window.document.getElementById("NumbersOfPieces");
var price = window.document.getElementById("price");
var click = window.document.getElementById("click");
var typeOfpieces = window.document.getElementById("typeOfpieces")
var deo = window.document.getElementById("demo");
var nameAlert = document.getElementById("nameAlert");
var Total=document.getElementById('total')
var index_global;
var id_global;

const urlParams = new URLSearchParams(window.location.search);
const buyId = urlParams.get('id');
console.log('buy ID:', buyId);
let buy = [];
async function getBuy() {
    try {
        const response = await fetch(`http://localhost:3003/api/v1/buy/all/${buyId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch buy data');
        }
        const data = await response.json();
        console.log('Fetched Buy Data:', data);
        buy = data.buying.flat();
        console.log('Buy:', buy);
        displayBuy();
        Total.innerHTML=data.totalPriceForMonth
    } catch (error) {
        console.error('Error fetching Buy data:', error);
    }
}

function displayBuy() {
    console.log('Displaying Buy:', buy);
    if (!buy) {
        console.log('buy data is not available.');
        return;
    }
    let test = "";
    for (let i = 0; i < buy.length; i++) {
        let x=buy[i].price * buy[i].NumbersOfPieces;
        test += `<tr>
        <td class="text-center">${i} </td>
        <td  class="text-center"> ${buy[i].pieces}</td>
        <td class="text-center"> ${buy[i].NumbersOfPieces}</td>
        <td class="text-center">${buy[i].price} </td>
        <td class="text-center">${buy[i].typeOfpieces} </td>
        <td class="text-center">${x}</td>
        <td class="text-center"><button onclick="deleteBtn('${buy[i]._id}')" class="btn btn-outline-danger">Delete</button>
        <button onclick="getBtn('${buy[i]._id}', '${i}')" class="btn btn-outline-primary">update</button>
        </td>
        </tr>`;
    }
    deo.innerHTML = test;
}

async function first() {
    await getBuy();
    // displaySale();
}
first();

function addBuy() {
    fetch(`http://localhost:3003/api/v1/buy/add/${buyId}`, {
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
                throw new Error('Failed to add buy');
            }
            return response.json();
        })
        .then(data => {
            console.log('buy added successfully:', data);
            getBuy();
        })
        .catch(error => {
            console.error('Error adding buy:', error);
        });
}


click.onclick = function () {
    console.log('inner', click.innerHTML)
    if (click.innerHTML == "ادخال") {
        addBuy();
    } else {
        console.log('hhhhhh')
        update(id_global, index_global);
        getBuy();
    }
    getBuy();
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
            fetch(`http://localhost:3003/api/v1/buy/delet/${buyId}/${index}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete buy');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('buy deleted successfully:', data);
                    getBuy();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .catch(error => {
                    console.error('Error deleting buy:', error);
                    // Handle error
                });
            // sale.splice(index, 1);
            // localStorage.setItem("Cources List", JSON.stringify(cources));

        }
    })
}

function getBtn(id, index) {
    console.log('getBtn', buy)
    console.log('index', index)
    console.log('id', id)
    pieces.value = buy[index].pieces;
    typeOfpieces.value = buy[index].typeOfpieces;
    price.value = buy[index].price;
    NumbersOfPieces.value = buy[index].NumbersOfPieces;
    click.innerHTML = "تعديل";
    index_global = index;
    id_global = id;
}

function update(id, index) {
    console.log('id', id)
    fetch(`http://localhost:3003/api/v1/buy/update/${buyId}/${id}`, {
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
                throw new Error('Failed to update buy');
            }
            return response.json();
        })
        .then(data => {
            console.log('buy updated successfully:', data);
            buy[index].pieces = pieces.value;
            buy[index].price = price.value;
            buy[index].NumbersOfPieces = NumbersOfPieces.value;
            buy[index].typeOfpieces = typeOfpieces.value;
            window.console.log(buy);
            click.innerHTML = 'ادخال'
            getBuy();
        })
        .catch(error => {
            console.error('Error updating buy:', error);
        });

}

