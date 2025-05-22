console.log("Welcome to the Community Portal");

window.addEventListener('load', function () {
    alert("Welcome! The page has been fully loaded.");
});

const eventName = "Summer Music Festival";
const eventDate = "August 15, 2024";
let availableSeats = 50;

const events = [
    {
        name: "Community Cleanup",
        date: "2024-03-15",
        seats: 0,
        isPast: true,
        category: "community"
    },
    {
        name: "Food Festival",
        date: "2024-08-01",
        seats: 25,
        isPast: false,
        category: "food"
    },
    {
        name: "Music Concert",
        date: "2024-07-20",
        seats: 50,
        isPast: false,
        category: "music"
    }
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

        const newEvent = {
            name: eventDetails.name,
            date: eventDetails.date,
            seats: eventDetails.seats || 0,
            isPast: false,
            category: eventDetails.category
        };

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

        if (event.seats <= 0) {
            throw new Error("No seats available");
        }

        event.seats--;
        registrationTracker.addRegistration(event.category);

        console.log(`Registration stats for ${event.category}: ${registrationTracker.getRegistrations(event.category)}`);
        return true;
    } catch (error) {
        console.error("Registration error:", error);
        return false;
    }
}

function filterEventsByCategory(callback) {
    return events.filter(event => {
        // First apply basic filters (past events and availability)
        if (event.isPast || event.seats === 0) {
            return false;
        }
        // Then apply the custom callback filter
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

    const filteredEvents = filterEventsByCategory(event => {
        const searchInput = document.getElementById('eventSearch');
        if (!searchInput) return true;

        const searchTerm = searchInput.value.toLowerCase();
        return event.name.toLowerCase().includes(searchTerm) ||
            event.category.toLowerCase().includes(searchTerm);
    });

    filteredEvents.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'carousel-item';
        eventCard.innerHTML = `
            <img src="https://picsum.photos/400/300" alt="${event.name}">
            <h3>${event.name}</h3>
            <p>Category: ${event.category}</p>
            <p>Date: ${event.date}<br>Available Seats: ${event.seats}</p>
            <button onclick="registerUser(${index}, {name: 'Test User', email: 'test@example.com'})" 
                    class="register-btn">Quick Register</button>
        `;
        carouselContainer.appendChild(eventCard);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateEventInfo();
    displayEvents();

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
}); 