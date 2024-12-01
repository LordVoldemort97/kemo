// Function to filter properties based on location
function filterProperties() {
    const filterValue = document.getElementById('location-filter').value;
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach(card => {
        const location = card.getAttribute('data-location');
        card.style.display = (filterValue === 'all' || location === filterValue) ? 'block' : 'none';
    });
}

// Event listener for form submission in Add Property
document.getElementById('property-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const property = {
        name: document.getElementById('property-name').value,
        price: document.getElementById('property-price').value,
        description: document.getElementById('property-description').value,
        location: document.getElementById('property-location').value,
        image: document.getElementById('property-image').files[0]
    };

    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    const reader = new FileReader();
    reader.onload = function(e) {
        property.image = e.target.result;
        properties.push(property);
        localStorage.setItem('properties', JSON.stringify(properties));
        window.location.href = 'property_details.html';
    };
    reader.readAsDataURL(property.image);
});

// Event listener for image preview
// Event listener for image file input change
document.getElementById('property-image')?.addEventListener('change', function() {
    const preview = document.getElementById('image-preview'); // Get the image preview div
    preview.innerHTML = ''; // Clear previous previews

    const file = this.files[0]; // Get the first selected file
    if (file) {
        const reader = new FileReader(); // Create a new FileReader
        reader.onload = function(event) { // Use 'event' instead of 'e'
            const img = document.createElement('img'); // Create an img element
            img.src = event.target.result; // Set the img src to the image data URL
            img.style.maxWidth = '200px'; // Set max width for the image
            img.style.marginTop = '10px'; // Add margin for spacing
            preview.appendChild(img); // Append the img to the preview div
        };
        reader.readAsDataURL(file); // Read the selected file as a data URL
    }
});

// Function to display properties on Property Details page
function displayProperties() {
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    const propertyList = document.getElementById('property-list');
    propertyList.innerHTML = '';

    properties.forEach((property, index) => {
        const propertyDiv = document.createElement('div');
        propertyDiv.innerHTML = `
            <h3>${property.name}</h3>
            <p>Price: $${property.price}</p>
            <p>Description: ${property.description}</p>
            <p>Location: ${property.location}</p>
            <img src="${property.image}" alt="${property.name}" style="max-width: 200px; margin-top: 10px;">
            <button onclick="editProperty(${index})">Edit</button>
            <button onclick="deleteProperty(${index})">Delete</button>
            <hr>
        `;
        propertyList.appendChild(propertyDiv);
    });
}

// Functions to edit and delete properties
function editProperty(index) {
    const properties = JSON.parse(localStorage.getItem('properties'));
    const property = properties[index];
    localStorage.setItem('editIndex', index);
    localStorage.setItem('editProperty', JSON.stringify(property));
    window.location.href = 'edit.html';
}

function deleteProperty(index) {
    const properties = JSON.parse(localStorage.getItem('properties'));
    properties.splice(index, 1);
    localStorage.setItem('properties', JSON.stringify(properties));
    displayProperties();
}

// Event listener for editing property
document.addEventListener('DOMContentLoaded', function() {
    const property = JSON.parse(localStorage.getItem('editProperty'));
    if (property) {
        document.getElementById('property-name').value = property.name;
        document.getElementById('property-price').value = property.price;
        document.getElementById('property-description').value = property.description;
    }
});

// Event listener for updating property
document.getElementById('edit-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const index = localStorage.getItem('editIndex');
    const properties = JSON.parse(localStorage.getItem('properties'));

    properties[index] = {
        name: document.getElementById('property-name').value,
        price: document.getElementById('property-price').value,
        description: document.getElementById('property-description').value
    };
    localStorage.setItem('properties', JSON.stringify(properties));
    alert('Property updated successfully!');
    window.location.href = 'property_details.html';
});

// Event listener for deleting property
document.getElementById('delete-btn')?.addEventListener('click', function() {
    const index = localStorage.getItem('editIndex');
    const properties = JSON.parse(localStorage.getItem('properties'));
    properties.splice(index, 1);
    localStorage.setItem('properties', JSON.stringify(properties));
    alert('Property deleted successfully!');
    window.location.href = 'property_details.html';
});