console.log("Welcome to the Community Portal");

window.addEventListener('load', function () {
    alert("Welcome! The page has been fully loaded.");
});

class Event {
    constructor(name, date, seats, category, isPast = false) {
        this.name = name;
        this.date = date;
        this.seats = seats;
        this.category = category;
        this.isPast = isPast;
    }

    checkAvailability() {
        return this.seats > 0 && !this.isPast;
    }

    displayDetails() {
        console.log("Event Details:");
        Object.entries(this).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }

    getFormattedName() {
        switch (this.category) {
            case 'workshop':
                return `Workshop on ${this.name}`;
            case 'music':
                return `${this.name} Concert`;
            case 'food':
                return `${this.name} Culinary Experience`;
            default:
                return this.name;
        }
    }
}

const eventName = "Summer Music Festival";
const eventDate = "August 15, 2024";
let availableSeats = 50;

const events = [
    new Event("Community Cleanup", "2024-03-15", 0, "community", true),
    new Event("Food Festival", "2024-08-01", 25, "food", false),
    new Event("Jazz Night", "2024-07-20", 50, "music", false),
    new Event("Rock Concert", "2024-09-15", 100, "music", false),
    new Event("Classical Symphony", "2024-08-30", 75, "music", false)
];

function createRegistrationTracker() {
    const registrations = {};

    return {
        addRegistration: function (category) {
            registrations[category] = (registrations[category] || 0) + 1;
            return registrations[category];
        },
        getRegistrations: function (category) {
            return registrations[category] || 0;
        },
        getAllRegistrations: function () {
            return { ...registrations };
        }
    };
}

const registrationTracker = createRegistrationTracker();

function addEvent(eventDetails) {
    try {
        if (!eventDetails.name || !eventDetails.date || !eventDetails.category) {
            throw new Error("Missing required event details");
        }

        const newEvent = new Event(
            eventDetails.name,
            eventDetails.date,
            eventDetails.seats || 0,
            eventDetails.category,
            false
        );

        console.log("Adding new event:");
        newEvent.displayDetails();

        events.push(newEvent);
        displayEvents(); // Refresh display
        return true;
    } catch (error) {
        console.error("Error adding event:", error);
        return false;
    }
}

function registerUser(eventId, userDetails) {
    try {
        if (!userDetails.name || !userDetails.email) {
            throw new Error("Missing required user details");
        }

        const event = events[eventId];
        if (!event) {
            throw new Error("Event not found");
        }

        if (!event.checkAvailability()) {
            throw new Error("Event is not available for registration");
        }

        event.seats--;
        registrationTracker.addRegistration(event.category);

        console.log("Updated event details after registration:");
        event.displayDetails();

        console.log(`Registration stats for ${event.category}: ${registrationTracker.getRegistrations(event.category)}`);
        return true;
    } catch (error) {
        console.error("Registration error:", error);
        return false;
    }
}

function filterEventsByCategory(callback) {
    return events.filter(event => {
        if (!event.checkAvailability()) {
            return false;
        }
        return callback ? callback(event) : true;
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
    let filteredEvents = showMusicOnly ? getMusicEvents() : filterEventsByCategory(event => {
        const searchInput = document.getElementById('eventSearch');
        if (!searchInput) return true;

        const searchTerm = searchInput.value.toLowerCase();
        return event.name.toLowerCase().includes(searchTerm) ||
            event.category.toLowerCase().includes(searchTerm);
    });

    const formattedEvents = formatEventCards(filteredEvents);

    formattedEvents.forEach((eventCard, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        div.innerHTML = `
            <img src="https://picsum.photos/400/300" alt="${eventCard.title}">
            <div class="event-details">
                <h3>${eventCard.title}</h3>
                <p><strong>Date:</strong> ${eventCard.date}</p>
                <p><strong>Category:</strong> ${eventCard.category}</p>
                <p><strong>Availability:</strong> ${eventCard.seats}</p>
            </div>
            <button onclick="registerUser(${index}, {name: 'Test User', email: 'test@example.com'})" 
                    class="register-btn" ${!eventCard.available ? 'disabled' : ''}>
                    ${eventCard.available ? 'Quick Register' : 'Not Available'}
            </button>
        `;
        carouselContainer.appendChild(div);
    });
}

function addNewEvents() {
    const newEvents = [
        new Event("Blues Festival", "2024-10-01", 80, "music", false),
        new Event("Pop Music Show", "2024-11-15", 120, "music", false)
    ];

    events.push(...newEvents);
    console.log("Added new music events:");
    newEvents.forEach(event => event.displayDetails());
}

function getMusicEvents() {
    return events.filter(event => event.category === 'music' && !event.isPast);
}

function formatEventCards(events) {
    return events.map(event => ({
        title: event.getFormattedName(),
        date: new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        seats: `${event.seats} seats available`,
        category: event.category.charAt(0).toUpperCase() + event.category.slice(1),
        available: event.checkAvailability()
    }));
}

// Question 7: Enhanced DOM manipulation
class EventUI {
    constructor() {
        this.heroSection = document.querySelector('.hero-content');
        this.carouselContainer = document.querySelector('.carousel-container');
        this.registrationForm = document.querySelector('.registration-form');
        this.setupEventListeners();

        // Question 8: Quick search timeout
        this.searchTimeout = null;
    }

    createEventCard(event, index) {
        const card = document.createElement('div');
        card.className = 'carousel-item';
        card.id = `event-${index}`;

        const img = document.createElement('img');
        img.src = `https://picsum.photos/400/300`;
        img.alt = event.title;
        card.appendChild(img);

        const details = document.createElement('div');
        details.className = 'event-details';

        const title = document.createElement('h3');
        title.textContent = event.title;
        details.appendChild(title);

        ['date', 'category', 'seats'].forEach(prop => {
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = `${prop.charAt(0).toUpperCase() + prop.slice(1)}: `;
            p.appendChild(strong);
            p.appendChild(document.createTextNode(event[prop]));
            details.appendChild(p);
        });

        card.appendChild(details);

        // Question 8: Using onclick for register button
        const button = document.createElement('button');
        button.className = 'register-btn';
        button.disabled = !event.available;
        button.textContent = event.available ? 'Quick Register' : 'Not Available';

        if (event.available) {
            // Using onclick property instead of addEventListener
            button.onclick = () => this.handleRegistration(index);
        }

        card.appendChild(button);
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
        const card = document.getElementById(`event-${eventId}`);
        if (!card || !event) return;

        // Update seats display
        const seatsElement = card.querySelector('.event-details p:last-child');
        if (seatsElement) {
            seatsElement.innerHTML = `<strong>Seats:</strong> ${event.seats} available`;
        }

        // Update button state
        const button = card.querySelector('.register-btn');
        if (button) {
            const isAvailable = event.checkAvailability();
            button.disabled = !isAvailable;
            button.textContent = isAvailable ? 'Quick Register' : 'Not Available';
        }
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    setupEventListeners() {
        // Add controls section
        const controls = document.createElement('div');
        controls.className = 'event-controls';

        // Question 8: Enhanced category filter
        const categoryFilter = document.createElement('select');
        categoryFilter.id = 'categoryFilter';
        categoryFilter.className = 'category-filter';

        // Add category options
        const categories = ['all', ...new Set(events.map(event => event.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryFilter.appendChild(option);
        });

        // Question 8: Using onchange for category filter
        categoryFilter.onchange = (e) => {
            const selectedCategory = e.target.value;
            document.getElementById('showMusicOnly').checked = false;
            this.filterAndDisplayEvents(selectedCategory);
        };

        const filterLabel = document.createElement('label');
        filterLabel.textContent = 'Filter by Category: ';
        filterLabel.appendChild(categoryFilter);
        controls.appendChild(filterLabel);

        // Create and add music toggle
        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'filter-controls';
        toggleDiv.innerHTML = `
            <label>
                <input type="checkbox" id="showMusicOnly"> Show Music Events Only
            </label>
        `;
        // Question 8: Using onchange for music toggle
        toggleDiv.querySelector('input').onchange = (e) => {
            if (e.target.checked) {
                document.getElementById('categoryFilter').value = 'all';
            }
            this.refreshDisplay();
        };
        controls.appendChild(toggleDiv);

        // Create search input with enhanced features
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';

        const searchInput = document.createElement('input');
        searchInput.id = 'eventSearch';
        searchInput.className = 'search-input';
        searchInput.placeholder = 'Quick search events...';

        // Question 8: Using keydown for quick search
        searchInput.onkeydown = (e) => {
            // Clear previous timeout
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            // Handle special keys
            if (e.key === 'Escape') {
                searchInput.value = '';
                this.refreshDisplay();
                return;
            }

            // Debounced search
            this.searchTimeout = setTimeout(() => {
                this.refreshDisplay();

                // Show search feedback
                const resultsCount = document.querySelector('.carousel-container').childElementCount;
                this.showNotification(`Found ${resultsCount} matching events`, 'info');
            }, 300);
        };

        const searchIcon = document.createElement('span');
        searchIcon.className = 'search-icon';
        searchIcon.innerHTML = '🔍';
        searchContainer.append(searchIcon, searchInput);
        controls.appendChild(searchContainer);

        // Create and add buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const addMusicEventsBtn = this.createButton('Add More Music Events');
        // Question 8: Using onclick for button
        addMusicEventsBtn.onclick = () => {
            addNewEvents();
            this.refreshDisplay();
            this.showNotification('New music events added!', 'success');
        };

        const addSampleEventBtn = this.createButton('Add Sample Event');
        // Question 8: Using onclick for button
        addSampleEventBtn.onclick = () => {
            addEvent({
                name: "Workshop " + Math.floor(Math.random() * 100),
                date: "2024-12-01",
                seats: 30,
                category: "workshop"
            });
            this.refreshDisplay();
        };

        buttonContainer.append(addMusicEventsBtn, addSampleEventBtn);
        controls.appendChild(buttonContainer);

        // Add to hero section
        this.heroSection.appendChild(controls);

        // Add enhanced styles
        const style = document.createElement('style');
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    }

    // Helper method for filtering events
    filterAndDisplayEvents(category) {
        let filteredEvents = events;

        if (category && category !== 'all') {
            filteredEvents = events.filter(event => event.category === category);
        }

        const formattedEvents = formatEventCards(filteredEvents);
        this.displayFilteredEvents(formattedEvents);
    }

    // Helper method for displaying filtered events
    displayFilteredEvents(formattedEvents) {
        if (!this.carouselContainer) return;

        this.carouselContainer.innerHTML = '';
        formattedEvents.forEach((event, index) => {
            const card = this.createEventCard(event, index);
            this.carouselContainer.appendChild(card);
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
        const button = document.createElement('button');
        button.textContent = text;
        return button;
    }

    refreshDisplay() {
        if (!this.carouselContainer) return;

        this.carouselContainer.innerHTML = '';

        const showMusicOnly = document.getElementById('showMusicOnly')?.checked || false;
        let filteredEvents = showMusicOnly ? getMusicEvents() : filterEventsByCategory(event => {
            const searchInput = document.getElementById('eventSearch');
            if (!searchInput?.value) return true;

            const searchTerm = searchInput.value.toLowerCase();
            return event.name.toLowerCase().includes(searchTerm) ||
                event.category.toLowerCase().includes(searchTerm);
        });

        const formattedEvents = formatEventCards(filteredEvents);

        formattedEvents.forEach((event, index) => {
            const card = this.createEventCard(event, index);
            this.carouselContainer.appendChild(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateEventInfo();

    // Initialize UI manager
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