// Script for smooth scroll to top and dynamic machine status
document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top button logic
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '&#9650;';
    scrollTopBtn.id = 'scrollTopBtn';
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });

    // Dynamic machine status update
    const machineStatus = document.getElementById('machine-status');
    let statusIndex = 0;
    const statuses = [
        "Allocating resources to available machines...",
        "Calibrating machine 1 for optimal performance...",
        "Monitoring machine 2 efficiency...",
        "All machines are operating at full capacity."
    ];

    setInterval(() => {
        machineStatus.textContent = statuses[statusIndex];
        statusIndex = (statusIndex + 1) % statuses.length;
    }, 3000); // Change status every 3 seconds
});
