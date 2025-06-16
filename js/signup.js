document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const dobInput = document.getElementById('dob');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const phone = phoneInput.value.trim();
        const address = addressInput.value.trim();
        const dob = dobInput.value;

        // Validate inputs
        if (!name || !email || !password || !phone || !address || !dob) {
            showToast('Please fill in all fields.');
            return;
        }

        // Validate phone number (basic check for digits)
        if (!/^[0-9]{10,15}$/.test(phone)) {
            showToast('Please enter a valid phone number (10-15 digits).');
            return;
        }

        // Validate date of birth (must be in the past)
        const today = new Date();
        const dobDate = new Date(dob);
        if (dobDate >= today) {
            showToast('Date of birth must be in the past.');
            return;
        }

        // Check if email already exists
        if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
            showToast('Email already registered.');
            return;
        }

        // Add user to users array
        users.push({
            name,
            email: email.toLowerCase(),
            password, // Note: In production, hash the password
            phone,
            address,
            dob
        });

        // Save to localStorage
        saveUsers();

        // Show success message and redirect to login
        showToast('Account created successfully! Please log in.');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

        // Clear form
        signupForm.reset();
    });

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
});