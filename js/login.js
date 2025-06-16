document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        // Validate inputs
        if (!email || !password) {
            showToast('Please fill in all fields.');
            return;
        }

        // Check credentials
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Simulate login by storing user session
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            showToast(`Welcome back, ${user.name}!`);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showToast('Invalid email or password.');
        }

        // Clear form
        loginForm.reset();
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