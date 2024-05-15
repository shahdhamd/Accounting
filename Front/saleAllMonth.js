const getData = () => {
    fetch('http://localhost:3003/api/v1/sale/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {

            const tableBody = document.getElementById('demo');
            tableBody.innerHTML = '';
            data.show.forEach((item, index) => {
                const row = `
                <tr>
                    <th scope="row"  class="text-center">${index + 1}</th>
                    <td class="text-center">${item.month}</td>
                    <td class="text-center">${item.companyName}</td>
                    <td class="text-center"><button class="btn btn-outline-primary" onclick="handleAddButton('${item._id}')">اضافة</button>
                    <button class="btn btn-outline-danger" onclick="handleDelete('${item._id}')">حذف</button></td>
                </tr>
            `;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);

        });
}

getData()
function handleAddButton(itemId) {
    window.location.href = `crub_sale.html?id=${itemId}`;
}


const handleDelete = (id) => {
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
            fetch(`http://localhost:3003/api/v1/sale/delet/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete buy');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Delete successfully:', data);
                    getData();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .catch(error => {
                    console.error('Error deleting buy:', error);
                });
        }
    })

}