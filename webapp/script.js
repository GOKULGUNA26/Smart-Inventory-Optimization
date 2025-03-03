document.querySelectorAll('.services-box').forEach(box => {
    box.addEventListener('click', () => {
        // Add pop class for animation
        box.classList.add('pop');

        // Set a delay for the page redirection to allow the animation to finish
        setTimeout(() => {
            box.classList.remove('pop');

            // Redirect to a new page after animation
            // You can use a specific URL for each service box using the `data-url` attribute
            const targetUrl = box.getAttribute('data-url');
            if (targetUrl) {
                window.location.href = targetUrl; // Redirect to the URL
            }
        }, 600); // Animation duration matches the CSS animation time
    });
});
