// Function to include HTML files
function includeHTML() {
    const includes = document.querySelectorAll('[include-html]');
    
    // Loop through each element with include-html attribute
    includes.forEach(element => {
        const file = element.getAttribute('include-html');
        
        if (file) {
            // Make an HTTP request using the file path attribute
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        element.innerHTML = this.responseText;
                    } else {
                        element.innerHTML = `Error loading ${file}`;
                    }
                    
                    // Remove the attribute to prevent future processing
                    element.removeAttribute('include-html');
                    
                    // Run the function again for nested includes
                    includeHTML();
                }
            };
            xhr.open('GET', file, true);
            xhr.send();
        }
    });
}

// Run the include HTML function when DOM is loaded
document.addEventListener('DOMContentLoaded', includeHTML);