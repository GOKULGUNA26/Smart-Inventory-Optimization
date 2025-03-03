document.addEventListener('DOMContentLoaded', function () {
    // Handle close alert button
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            this.parentElement.style.display = 'none';
        });
    });

    // Handle search button click
    document.getElementById('search-btn').addEventListener('click', function () {
        const selectedProduct = document.getElementById('product-select').value;
        const selectedType = document.getElementById('type-select').value;

        if (selectedProduct !== "Select Product" && selectedType !== "Select Type") {
            alert(`You searched for Product: ${selectedProduct}, Type: ${selectedType}`);
        } else {
            alert('Please select both product and type.');
        }
    });
});
document.getElementById('goBackBtn').addEventListener('click', function() {
    window.history.back(); // Navigates back to the previous page
});

