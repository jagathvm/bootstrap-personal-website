function submitForm(event) {
    // Prevent the default form submission
    event.preventDefault();

    var form = document.getElementById('form');

    // Clear previous validation messages
    clearValidationMessages(form);

    // Validation for Firstname
    var firstnameInput = form.querySelector('[name="Firstname"]');
    if (firstnameInput.value.trim() === '') {
        displayValidationMessage(firstnameInput, 'Please enter your Firstname.');
        return false;
    }

    // Validation for Lastname
    var lastnameInput = form.querySelector('[name="Lastname"]');
    if (lastnameInput.value.trim() === '') {
        displayValidationMessage(lastnameInput, 'Please enter your Lastname.');
        return false;
    }

    // Validation for E-Mail
    var emailInput = form.querySelector('[name="E-Mail"]');
    var emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(emailInput.value)) {
        displayValidationMessage(emailInput, 'Please enter a valid email address.');
        return false;
    }

    // Validation for Phone
    var phoneInput = form.querySelector('[name="Phone"]');
    var phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneInput.value)) {
        displayValidationMessage(phoneInput, 'Please enter a valid 10-digit phone number.');
        return false;
    }

    // Validation for Message
    var messageInput = form.querySelector('[name="Message"]');
    if (messageInput.value.trim() === '') {
        displayValidationMessage(messageInput, 'Please enter your message.');
        return false;
    }

    // If all validations pass, proceed with form submission

    // Fetch script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyDlVe484K7W4h47eTPPbMAzttxpKz4upqiuhoo3YZlgzHwCCvIfvAuzaLg3nk4Zfzb/exec';

    // Prepare form data
    const formData = new FormData(form);

    // Submit form data using fetch
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            // Handle success response
            console.log('Success!', data);

            // Reset the form
            form.reset();

            // Show alert after successful submission
            alert('Your response has been recorded.');
        })
        .catch(error => {
            // Handle error response
            console.error('Error!', error.message);

            // Display an error message
            displayErrorMessage(form, 'Error submitting the form. Please try again.');
        });

    return false;
}

// Add event listener to the form
const form = document.forms['submit-to-google-sheet'];
form.addEventListener('submit', submitForm);

// Function to display validation message
function displayValidationMessage(inputElement, message) {
    var validationMessage = document.createElement('div');
    validationMessage.className = 'invalid-feedback';
    validationMessage.innerHTML = message;

    inputElement.classList.add('is-invalid');
    inputElement.parentNode.appendChild(validationMessage);
}

// Function to clear previous validation messages
function clearValidationMessages(form) {
    var validationMessages = form.querySelectorAll('.invalid-feedback');
    validationMessages.forEach(message => message.remove());

    var invalidInputs = form.querySelectorAll('.is-invalid');
    invalidInputs.forEach(input => input.classList.remove('is-invalid'));
}

// Function to display success message
function displaySuccessMessage(form, message) {
    var successMessage = document.createElement('div');
    successMessage.className = 'valid-feedback';
    successMessage.innerHTML = message;

    form.appendChild(successMessage);
}

// Function to display error message
function displayErrorMessage(form, message) {
    var errorMessage = document.createElement('div');
    errorMessage.className = 'invalid-feedback';
    errorMessage.innerHTML = message;

    form.appendChild(errorMessage);
}
