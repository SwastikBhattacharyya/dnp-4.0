console.log("Welcome to the Community Portal");

window.addEventListener('load', function () {
    alert("Welcome! The page has been fully loaded.");
});

class Event {
    constructor(name, date, seats = 0, category = 'general', isPast = false) {
        this.name = name;
        this.date = date;
        this.seats = seats;
        this.category = category;
        this.isPast = isPast;
    }

    checkAvailability() {
        const { seats, isPast } = this;
        return seats > 0 && !isPast;
    }

    displayDetails() {
        console.log("Event Details:");
        const entries = Object.entries(this);
        entries.forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }

    getFormattedName() {
        const { name, category } = this;
        switch (category) {
            case 'workshop':
                return `Workshop on ${name}`;
            case 'music':
                return `${name} Concert`;
            case 'food':
                return `${name} Culinary Experience`;
            default:
                return name;
        }
    }
}

const eventName = "Summer Music Festival";
const eventDate = "August 15, 2024";
let availableSeats = 50;

const events = [
    new Event("Community Cleanup", "2024-03-15", 0, "community", true),
    new Event("Food Festival", "2024-08-01", 25, "food"),
    new Event("Jazz Night", "2024-07-20", 50, "music"),
    new Event("Rock Concert", "2024-09-15", 100, "music"),
    new Event("Classical Symphony", "2024-08-30", 75, "music")
];

function createRegistrationTracker() {
    const registrations = {};

    return {
        addRegistration: (category) => {
            registrations[category] = (registrations[category] || 0) + 1;
            return registrations[category];
        },
        getRegistrations: (category) => registrations[category] || 0,
        getAllRegistrations: () => ({ ...registrations })
    };
}

const registrationTracker = createRegistrationTracker();

function addEvent({ name, date, seats = 0, category, isPast = false } = {}) {
    try {
        if (!name || !date || !category) {
            throw new Error("Missing required event details");
        }

        const newEvent = new Event(name, date, seats, category, isPast);
        console.log("Adding new event:");
        newEvent.displayDetails();

        events.push(newEvent);
        displayEvents();
        return true;
    } catch (error) {
        console.error("Error adding event:", error);
        return false;
    }
}

function registerUser(eventId, { name, email } = {}) {
    try {
        if (!name || !email) {
            throw new Error("Missing required user details");
        }

        const event = events[eventId];
        if (!event) {
            throw new Error("Event not found");
        }

        if (!event.checkAvailability()) {
            throw new Error("Event is not available for registration");
        }

        const { category } = event;
        event.seats--;
        registrationTracker.addRegistration(category);

        console.log("Updated event details after registration:");
        event.displayDetails();

        console.log(`Registration stats for ${category}: ${registrationTracker.getRegistrations(category)}`);
        return true;
    } catch (error) {
        console.error("Registration error:", error);
        return false;
    }
}

function filterEventsByCategory(callback = () => true) {
    return [...events].filter(event => {
        if (!event.checkAvailability()) {
            return false;
        }
        return callback(event);
    });
}

function updateEventInfo() {
    const eventInfoElement = document.querySelector('.hero-content p');
    const seatDisplay = document.getElementById('seatDisplay');

    if (eventInfoElement) {
        const eventInfo = `Join us for the ${eventName} on ${eventDate}!`;
        eventInfoElement.innerHTML = `${eventInfo}<br>Available seats: ${availableSeats}`;
    }

    if (seatDisplay) {
        seatDisplay.textContent = availableSeats;
    }
}

function displayEvents() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    carouselContainer.innerHTML = '';

    const showMusicOnly = document.getElementById('showMusicOnly')?.checked || false;
    let filteredEvents = showMusicOnly ?
        [...getMusicEvents()] :
        filterEventsByCategory(event => {
            const searchInput = document.getElementById('eventSearch');
            if (!searchInput?.value) return true;

            const { name, category } = event;
            const searchTerm = searchInput.value.toLowerCase();
            return name.toLowerCase().includes(searchTerm) ||
                category.toLowerCase().includes(searchTerm);
        });

    const formattedEvents = formatEventCards(filteredEvents);
    formattedEvents.forEach((eventCard, index) => {
        const { title, date, category, seats, available } = eventCard;
        const div = document.createElement('div');
        div.className = 'carousel-item';
        div.innerHTML = `
            <img src="https://picsum.photos/400/300" alt="${title}">
            <div class="event-details">
                <h3>${title}</h3>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Availability:</strong> ${seats}</p>
            </div>
            <button onclick="registerUser(${index}, {name: 'Test User', email: 'test@example.com'})" 
                    class="register-btn" ${!available ? 'disabled' : ''}>
                    ${available ? 'Quick Register' : 'Not Available'}
            </button>
        `;
        carouselContainer.appendChild(div);
    });
}

function addNewEvents() {
    const newEvents = [
        new Event("Blues Festival", "2024-10-01", 80, "music"),
        new Event("Pop Music Show", "2024-11-15", 120, "music")
    ];

    events.push(...newEvents);
    console.log("Added new music events:");
    newEvents.forEach(event => event.displayDetails());
}

function getMusicEvents() {
    return [...events].filter(({ category, isPast }) => category === 'music' && !isPast);
}

function formatEventCards(events) {
    return events.map(event => {
        const { seats, category } = event;
        return {
            title: event.getFormattedName(),
            date: new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            seats: `${seats} seats available`,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            available: event.checkAvailability()
        };
    });
}

const API_ENDPOINT = 'https://api.jsonbin.io/v3/b/mock-events';

class LoadingSpinner {
    constructor() {
        this.spinner = document.createElement('div');
        this.spinner.className = 'loading-spinner';
        this.spinner.innerHTML = `
            <div class="spinner"></div>
            <p>Loading events...</p>
        `;
        this.setupStyles();
    }

    setupStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    show() {
        document.body.appendChild(this.spinner);
    }

    hide() {
        this.spinner.remove();
    }
}

class EventApiService {
    constructor() {
        this.endpoint = API_ENDPOINT;
        this.loadingSpinner = new LoadingSpinner();
    }

    fetchEventsWithPromise() {
        this.loadingSpinner.show();

        return fetch(this.endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data.map(event => new Event(
                    event.name,
                    event.date,
                    event.seats,
                    event.category,
                    new Date(event.date) < new Date()
                ));
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                // Return mock data in case of error
                return events;
            })
            .finally(() => {
                this.loadingSpinner.hide();
            });
    }

    // Async/await approach
    async fetchEventsWithAsync() {
        this.loadingSpinner.show();

        try {
            const response = await fetch(this.endpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.map(event => new Event(
                event.name,
                event.date,
                event.seats,
                event.category,
                new Date(event.date) < new Date()
            ));
        } catch (error) {
            console.error('Error fetching events:', error);
            // Return mock data in case of error
            return events;
        } finally {
            this.loadingSpinner.hide();
        }
    }
}

class RegistrationApiService {
    constructor() {
        this.endpoint = 'https://api.mockapi.io/v1/registrations';
        this.loadingSpinner = new LoadingSpinner();
    }

    async submitRegistration(data) {
        this.loadingSpinner.show();

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const result = await response.json();
            return {
                success: true,
                data: result
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        } finally {
            this.loadingSpinner.hide();
        }
    }
}

class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = new Map();
    }

    validateField(field, rules) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        rules.forEach(rule => {
            if (!isValid) return; // Skip if already invalid

            switch (rule.type) {
                case 'required':
                    if (!value) {
                        isValid = false;
                        errorMessage = rule.message || 'This field is required';
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = rule.message || 'Please enter a valid email address';
                    }
                    break;
                case 'minLength':
                    if (value.length < rule.value) {
                        isValid = false;
                        errorMessage = rule.message || `Minimum length is ${rule.value} characters`;
                    }
                    break;
            }
        });

        this.setFieldValidationStatus(field, isValid, errorMessage);
        return isValid;
    }

    setFieldValidationStatus(field, isValid, errorMessage = '') {
        const errorElement = this.getErrorElement(field);

        if (!isValid) {
            field.classList.add('invalid');
            field.classList.remove('valid');
            errorElement.textContent = errorMessage;
            this.errors.set(field.name, errorMessage);
        } else {
            field.classList.add('valid');
            field.classList.remove('invalid');
            errorElement.textContent = '';
            this.errors.delete(field.name);
        }
    }

    getErrorElement(field) {
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        return errorElement;
    }

    hasErrors() {
        return this.errors.size > 0;
    }

    clearErrors() {
        this.errors.clear();
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        const fields = this.form.elements;
        for (let field of fields) {
            field.classList.remove('invalid', 'valid');
        }
    }
}

// Question 14: Using jQuery for event handling and animations
class EventUI {
    constructor() {
        const { heroSection, carouselContainer, registrationForm } = {
            heroSection: document.querySelector('.hero-content'),
            carouselContainer: document.querySelector('.carousel-container'),
            registrationForm: document.querySelector('.registration-form')
        };

        this.heroSection = heroSection;
        this.carouselContainer = carouselContainer;
        this.registrationForm = registrationForm;
        this.apiService = new EventApiService();
        this.registrationApiService = new RegistrationApiService();
        this.setupEventListeners();
        this.searchTimeout = null;

        this.initializeEvents();
        this.setupFormValidation();

        // Add jQuery dependency
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
        document.head.appendChild(jqueryScript);
    }

    initializeEvents() {
        this.apiService.fetchEventsWithPromise()
            .then(fetchedEvents => {
                events.length = 0;
                events.push(...fetchedEvents);
                this.refreshDisplay();
                this.showNotification('Events loaded successfully!', 'success');
            })
            .catch(error => {
                this.showNotification('Failed to load events. Using mock data.', 'error');
                console.error('Error initializing events:', error);
            });
    }

    async loadEventsAsync() {
        try {
            const fetchedEvents = await this.apiService.fetchEventsWithAsync();
            events.length = 0;
            events.push(...fetchedEvents);
            this.refreshDisplay();
            this.showNotification('Events loaded successfully!', 'success');
        } catch (error) {
            this.showNotification('Failed to load events. Using mock data.', 'error');
            console.error('Error loading events:', error);
        }
    }

    createEventCard(event, index) {
        const card = $('<div>')
            .addClass('carousel-item')
            .attr('id', `event-${index}`)
            .hide(); // Initially hidden for fadeIn animation

        const img = $('<img>')
            .attr('src', `https://picsum.photos/400/300`)
            .attr('alt', event.title);

        const details = $('<div>').addClass('event-details');
        const title = $('<h3>').text(event.title);
        details.append(title);

        ['date', 'category', 'seats'].forEach(prop => {
            const p = $('<p>');
            const strong = $('<strong>').text(`${prop.charAt(0).toUpperCase() + prop.slice(1)}: `);
            p.append(strong).append(event[prop]);
            details.append(p);
        });

        const button = $('<button>')
            .addClass('register-btn')
            .prop('disabled', !event.available)
            .text(event.available ? 'Quick Register' : 'Not Available');

        if (event.available) {
            // Question 14: Using jQuery click handler
            button.click(() => this.handleRegistration(index));
        }

        card.append(img, details, button);
        return card;
    }

    handleRegistration(eventId) {
        const result = registerUser(eventId, {
            name: 'Test User',
            email: 'test@example.com'
        });

        if (result) {
            this.updateEventCard(eventId);
            this.showNotification('Registration successful!', 'success');
        } else {
            this.showNotification('Registration failed!', 'error');
        }
    }

    updateEventCard(eventId) {
        const event = events[eventId];
        const $card = $(`#event-${eventId}`);
        if (!$card.length || !event) return;

        // Update seats display with fadeOut/fadeIn animation
        const $seatsElement = $card.find('.event-details p:last-child');
        if ($seatsElement.length) {
            $seatsElement.fadeOut(300, function () {
                $(this).html(`<strong>Seats:</strong> ${event.seats} available`)
                    .fadeIn(300);
            });
        }

        // Update button state with animation
        const $button = $card.find('.register-btn');
        if ($button.length) {
            const isAvailable = event.checkAvailability();
            $button.fadeOut(300, function () {
                $(this)
                    .prop('disabled', !isAvailable)
                    .text(isAvailable ? 'Quick Register' : 'Not Available')
                    .fadeIn(300);
            });
        }
    }

    showNotification(message, type) {
        // Create notification element
        const notification = $('<div>')
            .addClass(`notification ${type}`)
            .text(message);

        // Add to DOM
        $('body').append(notification);

        // Remove after animation
        setTimeout(() => {
            notification.fadeOut(500);
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    setupEventListeners() {
        // Add controls section
        const controls = $('<div>').addClass('event-controls');

        // Question 8: Enhanced category filter
        const categoryFilter = $('<select>').attr('id', 'categoryFilter').addClass('category-filter');

        // Add category options
        const categories = ['all', ...new Set(events.map(event => event.category))];
        categories.forEach(category => {
            const option = $('<option>').val(category).text(category.charAt(0).toUpperCase() + category.slice(1));
            categoryFilter.append(option);
        });

        // Question 8: Using onchange for category filter
        categoryFilter.on('change', (e) => {
            const selectedCategory = $(e.target).val();
            $('#showMusicOnly').prop('checked', false);
            this.filterAndDisplayEvents(selectedCategory);
        });

        const filterLabel = $('<label>').text('Filter by Category: ');
        filterLabel.append(categoryFilter);
        controls.append(filterLabel);

        // Create and add music toggle
        const toggleDiv = $('<div>').addClass('filter-controls');
        toggleDiv.html(`
            <label>
                <input type="checkbox" id="showMusicOnly"> Show Music Events Only
            </label>
        `);
        // Question 8: Using onchange for music toggle
        toggleDiv.find('input').on('change', (e) => {
            if (e.target.checked) {
                $('#categoryFilter').val('all');
            }
            this.refreshDisplay();
        });
        controls.append(toggleDiv);

        // Create search input with enhanced features
        const searchContainer = $('<div>').addClass('search-container');

        const searchInput = $('<input>')
            .attr('id', 'eventSearch')
            .addClass('search-input')
            .attr('placeholder', 'Quick search events...');

        // Question 8: Using keydown for quick search
        searchInput.on('keydown', (e) => {
            // Clear previous timeout
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            // Handle special keys
            if (e.key === 'Escape') {
                searchInput.val('');
                this.refreshDisplay();
                return;
            }

            // Debounced search
            this.searchTimeout = setTimeout(() => {
                this.refreshDisplay();

                // Show search feedback
                const resultsCount = $('.carousel-container').children().length;
                this.showNotification(`Found ${resultsCount} matching events`, 'info');
            }, 300);
        });

        const searchIcon = $('<span>').addClass('search-icon');
        searchIcon.html('🔍');
        searchContainer.append(searchIcon, searchInput);
        controls.append(searchContainer);

        // Create and add buttons
        const buttonContainer = $('<div>').addClass('button-container');

        const addMusicEventsBtn = this.createButton('Add More Music Events');
        // Question 8: Using onclick for button
        addMusicEventsBtn.on('click', () => {
            addNewEvents();
            this.refreshDisplay();
            this.showNotification('New music events added!', 'success');
        });

        const addSampleEventBtn = this.createButton('Add Sample Event');
        // Question 8: Using onclick for button
        addSampleEventBtn.on('click', () => {
            addEvent({
                name: "Workshop " + Math.floor(Math.random() * 100),
                date: "2024-12-01",
                seats: 30,
                category: "workshop"
            });
            this.refreshDisplay();
        });

        buttonContainer.append(addMusicEventsBtn, addSampleEventBtn);
        controls.append(buttonContainer);

        // Add to hero section
        this.heroSection.append(controls);

        // Add enhanced styles
        const style = $('<style>');
        style.text(`
            ${this.getBaseStyles()}
            
            /* Question 8: Enhanced styles */
            .search-container {
                position: relative;
                margin: 10px 0;
            }
            
            .search-icon {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .search-input {
                padding: 8px 8px 8px 35px;
                border: 1px solid #ddd;
                border-radius: 20px;
                width: 200px;
                transition: width 0.3s ease;
            }
            
            .search-input:focus {
                width: 250px;
                outline: none;
                border-color: #4CAF50;
            }
            
            .category-filter {
                padding: 8px;
                border-radius: 4px;
                margin-left: 10px;
                border: 1px solid #ddd;
            }
            
            .notification.info {
                background-color: #2196F3;
            }
        `);
        $('head').append(style);
    }

    // Helper method for filtering events
    filterAndDisplayEvents(category = 'all') {
        let filteredEvents = [...events];

        if (category !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.category === category);
        }

        const formattedEvents = formatEventCards(filteredEvents);
        this.displayFilteredEvents(formattedEvents);
    }

    // Helper method for displaying filtered events
    displayFilteredEvents(formattedEvents) {
        if (!this.carouselContainer) return;

        const $container = $(this.carouselContainer);
        $container.empty();

        const showMusicOnly = $('#showMusicOnly').prop('checked') || false;
        let filteredEvents = showMusicOnly ?
            [...getMusicEvents()] :
            filterEventsByCategory(event => {
                const searchTerm = $('#eventSearch').val()?.toLowerCase() || '';
                if (!searchTerm) return true;
                return event.name.toLowerCase().includes(searchTerm) ||
                    event.category.toLowerCase().includes(searchTerm);
            });

        const formattedEvents = formatEventCards(filteredEvents);

        formattedEvents.forEach((event, index) => {
            const $card = this.createEventCard(event, index);
            $container.append($card);
            // Question 14: Using jQuery fadeIn animation
            $card.fadeIn(500);
        });
    }

    // Base styles getter
    getBaseStyles() {
        return `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 5px;
                color: white;
                z-index: 1000;
                animation: slideIn 0.5s ease-out;
            }
            .notification.success { background-color: #4CAF50; }
            .notification.error { background-color: #f44336; }
            .notification.fade-out {
                opacity: 0;
                transition: opacity 0.5s ease-out;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            .event-controls {
                margin: 20px 0;
                padding: 15px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
            }
            .button-container {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
        `;
    }

    createButton(text) {
        const button = $('<button>').text(text);
        return button;
    }

    refreshDisplay() {
        if (!this.carouselContainer) return;

        const $container = $(this.carouselContainer);
        $container.empty();

        const showMusicOnly = $('#showMusicOnly').prop('checked') || false;
        let filteredEvents = showMusicOnly ?
            [...getMusicEvents()] :
            filterEventsByCategory(event => {
                const searchTerm = $('#eventSearch').val()?.toLowerCase() || '';
                if (!searchTerm) return true;
                return event.name.toLowerCase().includes(searchTerm) ||
                    event.category.toLowerCase().includes(searchTerm);
            });

        const formattedEvents = formatEventCards(filteredEvents);

        formattedEvents.forEach((event, index) => {
            const $card = this.createEventCard(event, index);
            $container.append($card);
            // Question 14: Using jQuery fadeIn animation
            $card.fadeIn(500);
        });
    }

    setupFormValidation() {
        const $form = $('.registration-form');
        if (!$form.length) return;

        // Question 14: Using jQuery for form submission
        $form.on('submit', async (e) => {
            e.preventDefault();

            // Clear previous errors
            this.validator.clearErrors();

            const $submitBtn = $('#registerBtn');
            const $formFields = $form.find('input, select');

            // Disable form during submission
            $formFields.prop('disabled', true);
            $submitBtn.prop('disabled', true);

            try {
                // ... existing validation and submission logic ...

                // Show success animation
                $submitBtn.fadeOut(300, function () {
                    $(this).text('Success!').fadeIn(300);
                });

            } catch (error) {
                this.showNotification(error.message, 'error');
            } finally {
                // Re-enable form
                $formFields.prop('disabled', false);
                $submitBtn.prop('disabled', false);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateEventInfo();

    // Initialize UI manager with API integration
    const eventUI = new EventUI();
    eventUI.refreshDisplay();

    // Handle seat management
    const increaseButton = document.getElementById('increaseSeats');
    const decreaseButton = document.getElementById('decreaseSeats');

    if (increaseButton) {
        increaseButton.addEventListener('click', function () {
            availableSeats++;
            updateEventInfo();
            eventUI.showNotification('Seat added successfully!', 'success');
        });
    }

    if (decreaseButton) {
        decreaseButton.addEventListener('click', function () {
            if (availableSeats > 0) {
                availableSeats--;
                updateEventInfo();
                eventUI.showNotification('Seat removed successfully!', 'success');
            } else {
                eventUI.showNotification('No more seats to remove!', 'error');
            }
        });
    }

    // Handle registration form
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            try {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const selectedEvent = document.getElementById('event').value;

                if (!name || !email || !selectedEvent) {
                    throw new Error("Please fill in all required fields");
                }

                if (!email.includes('@')) {
                    throw new Error("Please enter a valid email address");
                }

                if (availableSeats > 0) {
                    availableSeats--;
                    updateEventInfo();
                    eventUI.showNotification('Registration successful!', 'success');
                } else {
                    throw new Error("No seats available");
                }
            } catch (error) {
                eventUI.showNotification(error.message, 'error');
                console.error("Registration error:", error);
            }
        });
    }
});

/*
 * Question 14: Benefits of Moving to Modern Frameworks like React or Vue
 * 
 * One significant benefit of moving to a framework like React or Vue would be
 * the improved state management and reactivity system. Instead of manually
 * managing DOM updates and animations like we're doing here, these frameworks
 * provide a declarative way to handle UI updates based on state changes.
 * 
 * For example, in React:
 * - No need to manually call fadeIn/fadeOut
 * - State updates automatically trigger re-renders
 * - Virtual DOM efficiently handles DOM updates
 * - Component-based architecture for better code organization
 * - Built-in state management with hooks
 * - Better performance for complex UIs
 * 
 * This would make our code more maintainable, predictable, and easier to test.
 */ 