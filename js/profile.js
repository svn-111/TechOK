document.addEventListener('DOMContentLoaded', () => {
    const profileInfo = document.getElementById('profile-info');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileForm = document.getElementById('edit-profile-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const nameInput = document.getElementById('edit-name');
    const phoneInput = document.getElementById('edit-phone');
    const addressInput = document.getElementById('edit-address');
    const dobInput = document.getElementById('edit-dob');

    // Get logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        showToast('Please log in to view your profile.');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }

    // Display user info
    function displayUserInfo() {
        profileInfo.innerHTML = `
            <div class="profile-detail"><i class="fas fa-user"></i><span><strong>Name:</strong> ${loggedInUser.name}</span></div>
            <div class="profile-detail"><i class="fas fa-envelope"></i><span><strong>Email:</strong> ${loggedInUser.email}</span></div>
            <div class="profile-detail"><i class="fas fa-phone"></i><span><strong>Phone:</strong> ${loggedInUser.phone}</span></div>
            <div class="profile-detail"><i class="fas fa-map-marker-alt"></i><span><strong>Address:</strong> ${loggedInUser.address}</span></div>
            <div class="profile-detail"><i class="fas fa-birthday-cake"></i><span><strong>Date of Birth:</strong> ${loggedInUser.dob}</span></div>
        `;
    }

    displayUserInfo();

    // Edit profile
    editProfileBtn.addEventListener('click', () => {
        nameInput.value = loggedInUser.name;
        phoneInput.value = loggedInUser.phone;
        addressInput.value = loggedInUser.address;
        dobInput.value = loggedInUser.dob;

        profileInfo.classList.add('slide-out');
        editProfileBtn.classList.add('hidden');
        setTimeout(() => {
            profileInfo.style.display = 'none';
            editProfileForm.style.display = 'block';
            editProfileForm.classList.add('slide-in');
        }, 300);
    });

    // Cancel edit
    cancelEditBtn.addEventListener('click', () => {
        editProfileForm.classList.remove('slide-in');
        editProfileForm.classList.add('slide-out');
        setTimeout(() => {
            editProfileForm.style.display = 'none';
            profileInfo.style.display = 'block';
            profileInfo.classList.remove('slide-out');
            profileInfo.classList.add('slide-in');
            editProfileBtn.classList.remove('hidden');
        }, 300);
    });

    // Save profile changes
    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const address = addressInput.value.trim();
        const dob = dobInput.value;

        // Validate inputs
        if (!name || !phone || !address || !dob) {
            showToast('Please fill in all fields.');
            return;
        }

        // Validate phone number
        if (!/^[0-9]{10,15}$/.test(phone)) {
            showToast('Please enter a valid phone number (10-15 digits).');
            return;
        }

        // Validate date of birth
        const today = new Date();
        const dobDate = new Date(dob);
        if (dobDate >= today) {
            showToast('Date of birth must be in the past.');
            return;
        }

        // Update user data
        const userIndex = users.findIndex(user => user.email === loggedInUser.email);
        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                name,
                phone,
                address,
                dob
            };
            localStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));
            saveUsers();

            // Update logged-in user
            Object.assign(loggedInUser, { name, phone, address, dob });

            // Refresh display
            displayUserInfo();
            editProfileForm.classList.remove('slide-in');
            editProfileForm.classList.add('slide-out');
            setTimeout(() => {
                editProfileForm.style.display = 'none';
                profileInfo.style.display = 'block';
                profileInfo.classList.remove('slide-out');
                profileInfo.classList.add('slide-in');
                editProfileBtn.classList.remove('hidden');
            }, 300);

            showToast('Profile updated successfully!');
        }
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