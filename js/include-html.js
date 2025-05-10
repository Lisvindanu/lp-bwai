// Enhanced include-html.js with better error handling and debugging
function includeHTML() {
    console.log("includeHTML function running");
    const includes = document.querySelectorAll('[include-html]');
    console.log("Found " + includes.length + " elements with include-html attribute");
    
    if (includes.length === 0) {
        console.log("No include-html elements found. If sections are missing, check CSS visibility.");
        return;
    }
    
    // Process each element with include-html attribute
    includes.forEach(element => {
        const file = element.getAttribute('include-html');
        console.log("Processing file: " + file);
        
        if (!file) {
            console.error("Empty include-html attribute found");
            return;
        }
        
        // Try multiple potential paths if the file might be in different locations
        tryLoadFile(element, file);
    });
}

// Try loading the file from multiple potential paths
function tryLoadFile(element, originalFile) {
    // Possible paths to try (no prefix, with sections/ prefix)
    const possiblePaths = [
        originalFile,
        originalFile.includes('/') ? originalFile : 'sections/' + originalFile
    ];
    
    // Try each path until one works
    tryNextPath(element, possiblePaths, 0);
}

// Recursive function to try loading from the next path
function tryNextPath(element, paths, index) {
    if (index >= paths.length) {
        // All paths failed
        console.error(`Failed to load file from all possible paths: ${paths.join(', ')}`);
        element.innerHTML = `<div class="py-4 px-6 bg-red-100 text-red-600 rounded">
            <p class="font-bold">Error loading content</p>
            <p>Please refresh the page or contact support if the issue persists.</p>
        </div>`;
        element.removeAttribute('include-html');
        return;
    }
    
    const file = paths[index];
    console.log(`Trying to load from path (${index+1}/${paths.length}): ${file}`);
    
    // Make an HTTP request using the file path
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // Success - insert content and remove attribute
                element.innerHTML = this.responseText;
                element.removeAttribute('include-html');
                console.log(`Successfully loaded: ${file}`);
                
                // Initialize content after load
                initializeLoadedContent(element);
                
                // Process nested includes
                includeHTML();
            } else {
                console.warn(`Failed to load ${file} with status: ${this.status}. Trying next path.`);
                // Try the next path
                tryNextPath(element, paths, index + 1);
            }
        }
    };
    
    xhr.open('GET', file, true);
    xhr.send();
}

// Initialize content after it's been loaded
function initializeLoadedContent(element) {
    // Ensure the section is visible
    showSection(element);
    
    // Fire an event that content was loaded
    const event = new CustomEvent('content-loaded', { detail: { element } });
    document.dispatchEvent(event);
}

// Make sure the section is visible
function showSection(element) {
    // Get the ID of the element or its parent sections
    let section = element;
    while (section && !section.id && section !== document.body) {
        section = section.parentElement;
    }
    
    if (section && section.id) {
        // Ensure the section is visible by overriding any CSS that might hide it
        const fixStyle = document.createElement('style');
        fixStyle.textContent = `
            #${section.id} {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                height: auto !important;
                overflow: visible !important;
                position: relative !important;
                z-index: 5 !important;
            }
        `;
        document.head.appendChild(fixStyle);
        console.log(`Applied visibility fix for section #${section.id}`);
    }
}

// Make sure the document is loaded before running
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM loaded, calling includeHTML");
        includeHTML();
        
        // Also add a fallback timer in case something went wrong
        setTimeout(function() {
            const includes = document.querySelectorAll('[include-html]');
            if (includes.length > 0) {
                console.log("Fallback: Still found include-html elements, calling includeHTML again");
                includeHTML();
            }
            
            // Double-check if sections are visible
            ensureSectionsVisible();
        }, 2000);
    });
} else {
    // Document already loaded
    console.log("Document already loaded, calling includeHTML immediately");
    includeHTML();
}

// Extra safety measure to ensure all sections are visible
function ensureSectionsVisible() {
    const problematicSections = ['schedule', 'registration'];
    
    problematicSections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            console.log(`Applying visibility fix for #${id}`);
            section.style.display = 'block';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
            section.style.height = 'auto';
            section.style.overflow = 'visible';
            section.style.position = 'relative';
            section.style.zIndex = '5';
        } else {
            console.warn(`Section #${id} not found in DOM`);
        }
    });
}