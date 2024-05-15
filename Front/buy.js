document.getElementById("saleForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    fetch('http://localhost:3003/api/v1/buy/addmonth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add sale');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sale added successfully:', data);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sale added successfully',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'buyAllMonth.html';
            });
        })
        .catch(error => {
            console.error('Error adding sale:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add sale',
            });
        });
});



