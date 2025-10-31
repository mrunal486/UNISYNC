document.addEventListener('DOMContentLoaded', function () {
    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop();

    // Set active class for current page in navigation
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // Hamburger menu toggle for mobile
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    // --- Generic Filter Function ---
    /**
     * Filters a list of cards based on a selected category/type.
     * @param {HTMLElement} filterElement - The select element used for filtering.
     * @param {string} cardSelector - CSS selector for the cards to be filtered.
     * @param {string} dataAttribute - The data attribute on the cards (e.g., 'data-event-type').
     */
    function applyFilter(filterElement, cardSelector, dataAttribute) {
        if (filterElement) {
            const cards = document.querySelectorAll(cardSelector);
            filterElement.addEventListener('change', () => {
                const selectedValue = filterElement.value;

                cards.forEach(card => {
                    const cardValue = card.getAttribute(dataAttribute);
                    if (selectedValue === 'all' || selectedValue === cardValue) {
                        card.style.display = card.tagName === 'DIV' ? 'flex' : 'block'; // Maintain original display type
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }

    // --- Page Specific Logic ---

    // Events Page Filter
    applyFilter(document.getElementById('event-type'), '.event-card', 'data-event-type');

    // Mentorship Page Filter
    applyFilter(document.getElementById('mentor-expertise'), '.mentor-card', 'data-expertise');

    // Jobs Page Filter and Details Toggle
    const jobTypeFilter = document.getElementById('job-type');
    if (jobTypeFilter) {
        applyFilter(jobTypeFilter, '.job-item', 'data-job-type');

        const jobDetailsToggle = document.querySelectorAll('.job-details-toggle a');
        jobDetailsToggle.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const jobItem = toggle.closest('.job-item');
                const jobDescription = jobItem.nextElementSibling;
                // Toggle display of job description
                if (jobDescription.style.display === 'block') {
                    jobDescription.style.display = 'none';
                    toggle.textContent = 'View Details';
                } else {
                    jobDescription.style.display = 'block';
                    toggle.textContent = 'Hide Details';
                }
            });
        });
    }

    // Community Page Filters
    applyFilter(document.getElementById('community-category'), '.community-card', 'data-category');
    applyFilter(document.getElementById('thread-category'), '.thread-item', 'data-thread-category');

    // Signup Page User Type Toggle
    const userTypeSelect = document.getElementById('user-type');
    const studentFields = document.getElementById('student-fields');
    const alumniFields = document.getElementById('alumni-fields');

    if (userTypeSelect && studentFields && alumniFields) {
        // Initial state based on default selection
        if (userTypeSelect.value === 'student') {
            studentFields.style.display = 'block';
            alumniFields.style.display = 'none';
        } else {
            studentFields.style.display = 'none';
            alumniFields.style.display = 'block';
        }

        userTypeSelect.addEventListener('change', () => {
            if (userTypeSelect.value === 'student') {
                studentFields.style.display = 'block';
                alumniFields.style.display = 'none';
            } else {
                studentFields.style.display = 'none';
                alumniFields.style.display = 'block';
            }
        });
    }

    // --- Form Submission Logic ---

    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closeBtn = document.querySelector('.close-btn');

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = 'flex';
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    if(popup) {
        window.addEventListener('click', (e) => {
            if (e.target == popup) {
                popup.style.display = 'none';
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                // Simulate a successful login
                showPopup('User logged in successfully!');
                // Redirect to the dashboard or another page
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                showPopup('Please fill in all fields.');
            }
        });
    }

    // Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (name && email && password) {
                // Simulate a successful signup
                showPopup('User created successfully!');
                // Redirect to the login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showPopup('Please fill in all required fields.');
            }
        });
    }
});
