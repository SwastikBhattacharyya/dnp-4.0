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
        isPast: true
    },
    {
        name: "Food Festival",
        date: "2024-08-01",
        seats: 25,
        isPast: false
    },
    {
        name: "Music Concert",
        date: "2024-07-20",
        seats: 50,
        isPast: false
    }
];

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

    events.forEach(event => {
        if (event.isPast || event.seats === 0) {
            return;
        }

        const eventCard = document.createElement('div');
        eventCard.className = 'carousel-item';
        eventCard.innerHTML = `
            <img src="https://picsum.photos/400/300" alt="${event.name}">
            <h3>${event.name}</h3>
            <p>Date: ${event.date}<br>Available Seats: ${event.seats}</p>
        `;
        carouselContainer.appendChild(eventCard);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateEventInfo();
    displayEvents();

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