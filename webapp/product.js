// Filter Products by Search Input
function filterProducts() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const rows = document.getElementById('product-table').getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].getElementsByTagName('td');
        let productName = columns[1].innerText.toLowerCase();
        rows[i].style.display = productName.includes(input) ? '' : 'none';
    }
}

// Sort Table by Column
function sortTable(columnIndex) {
    const table = document.getElementById('product-table');
    const rows = Array.from(table.rows);
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText;
        const cellB = rowB.cells[columnIndex].innerText;
        
        if (!isNaN(parseFloat(cellA)) && !isNaN(parseFloat(cellB))) {
            return parseFloat(cellA) - parseFloat(cellB);
        }
        return cellA.localeCompare(cellB);
    });

    rows.forEach(row => table.appendChild(row));
}

// Close Alert
function closeAlert(element) {
    const alertItem = element.parentElement;
    alertItem.style.display = 'none';
}

// Responsive Navbar Toggle
const menuIcon = document.getElementById('menu-icon');
menuIcon.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
});
function changeButtonColor(button) {
    // Add the 'active' class to change the button color to green
    button.classList.add('active');
    // Optionally, change the button text to 'Proceeded'
    button.innerHTML = 'Proceeded';
}
