console.log("Welcome to the Community Portal");

window.addEventListener('load', function () {
    alert("Welcome! The page has been fully loaded.");
});

const eventName = "Summer Music Festival";
const eventDate = "August 15, 2024";
let availableSeats = 50;

function updateEventInfo() {
    const eventInfoElement = document.querySelector('.hero-content p');
    if (eventInfoElement) {
        eventInfoElement.innerHTML = `Join us for the ${eventName} on ${eventDate}! Available seats: ${availableSeats}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateEventInfo();

    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (availableSeats > 0) {
                availableSeats--;
                updateEventInfo();
                alert(`Registration successful! ${availableSeats} seats remaining.`);
            } else {
                alert("Sorry, no more seats available!");
            }
        });
    }
}); 