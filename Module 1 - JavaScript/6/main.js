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

document.addEventListener('DOMContentLoaded', function () {
    updateEventInfo();
    displayEvents();

    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'filter-controls';
    toggleDiv.innerHTML = `
        <label>
            <input type="checkbox" id="showMusicOnly"> Show Music Events Only
        </label>
    `;
    document.querySelector('.hero-content').appendChild(toggleDiv);

    const addInitialEventsBtn = document.createElement('button');
    addInitialEventsBtn.textContent = 'Add More Music Events';
    addInitialEventsBtn.onclick = () => {
        addNewEvents();
        displayEvents();
    };
    document.querySelector('.hero-content').appendChild(addInitialEventsBtn);

    const addEventBtn = document.createElement('button');
    addEventBtn.textContent = 'Add Sample Event';
    addEventBtn.onclick = () => {
        addEvent({
            name: "Workshop " + Math.floor(Math.random() * 100),
            date: "2024-12-01",
            seats: 30,
            category: "workshop"
        });
    };
    document.querySelector('.hero-content').appendChild(addEventBtn);

    const searchInput = document.createElement('input');
    searchInput.id = 'eventSearch';
    searchInput.placeholder = 'Search events...';
    searchInput.onkeyup = displayEvents;
    document.querySelector('.hero-content').insertBefore(searchInput, addEventBtn);

    const increaseButton = document.getElementById('increaseSeats');
    const decreaseButton = document.getElementById('decreaseSeats');

    if (increaseButton) {
        increaseButton.addEventListener('click', function () {
            availableSeats++;
            updateEventInfo();
        });
    }

    if (decreaseButton) {
        decreaseButton.addEventListener('click', function () {
            if (availableSeats > 0) {
                availableSeats--;
                updateEventInfo();
            } else {
                alert("No more seats to remove!");
            }
        });
    }

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
                    alert(`Registration successful! ${availableSeats} seats remaining.`);
                } else {
                    throw new Error("No seats available");
                }
            } catch (error) {
                alert(`Registration failed: ${error.message}`);
                console.error("Registration error:", error);
            }
        });
    }

    const showMusicOnly = document.getElementById('showMusicOnly');
    if (showMusicOnly) {
        showMusicOnly.addEventListener('change', displayEvents);
    }
}); 