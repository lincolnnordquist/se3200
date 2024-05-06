console.log('connected');

function loadTicketsFromServer() {
    fetch("http://localhost:8080/tickets")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        var tickets = data;
        activeTicketsWrapper.innerHTML = '';
        tickets.forEach(generateTicketElements)
    })
    .catch((error) => {
        console.log("Error getting tickets: ", error);
    })
}

function createNewTicketOnServer() {
    var inputEntrantName = document.getElementById('input-entrant-name');
    var inputEntrantAge = document.getElementById('input-entrant-age');
    var inputGuestName = document.getElementById('input-guest-name');

    var data = "entrant_name=" + encodeURIComponent(inputEntrantName.value);;
    data += "&entrant_age=" + encodeURIComponent(inputEntrantAge.value);
    data += "&guest_name=" + encodeURIComponent(inputGuestName.value);

    console.log("data to be sent to the server: ", data);

    fetch("http://localhost:8080/tickets", {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include'
    }).then((response) => {
        inputEntrantAge.value = '';
        inputEntrantName.value = '';
        inputGuestName.value = '';
        console.log("response here: ", response);
        loadTicketsFromServer();
    }).catch((error) => {
        console.log("403 Forbidden. You are not allowed to create tickets.");
        alert("The oompa loompas have already received your ticket.");
    });
};

var activeTicketsWrapper = document.querySelector('section');
function generateTicketElements(ticketData) {
    var ticketElement = document.createElement('div');
    ticketElement.className = 'ticket';

    var imageElement = document.createElement('img');
    imageElement.src = 'images/willy-wonka.png';
    imageElement.style.width = '50px';
    imageElement.style.height = 'auto';
    imageElement.style.float = 'right';
    imageElement.style.marginRight = '10px';

    var entrantNameElement = document.createElement('div');
    entrantNameElement.className = 'entrant-name';
    entrantNameElement.textContent = 'Entrant Name: ' + ticketData.entrant_name;
    entrantNameElement.style.marginBottom = '10px';


    var entrantAgeElement = document.createElement('div');
    entrantAgeElement.className = 'entrant-age';
    entrantAgeElement.textContent = 'Entrant Age: ' + ticketData.entrant_age;
    entrantAgeElement.style.marginBottom = '10px';


    var guestNameElement = document.createElement('div');
    guestNameElement.className = 'guest-name';
    guestNameElement.textContent = 'Guest Name: ' + ticketData.guest_name;
    guestNameElement.style.marginBottom = '10px';


    var dayOfWeek = new Date().getDay();
    console.log("day of the week: ", dayOfWeek);
    if (ticketData.random_token === dayOfWeek) {
        // This is a golden ticket
        ticketElement.style.background = 'linear-gradient(to right, gold 50%, orange 100%)';
        ticketElement.style.color = 'black';
    } else {
        ticketElement.style.background = 'linear-gradient(to right, purple 20%, gold 100%)';
        ticketElement.style.color = 'white';
    }

    ticketElement.style.border = '2px solid gold';
    ticketElement.style.padding = '20px';
    ticketElement.style.margin = '10px';
    ticketElement.style.borderRadius = '10px';
    ticketElement.style.width = '250px'; 
    ticketElement.style.height = '100px';

    entrantNameElement.style.fontWeight = 'bold';
    entrantAgeElement.style.fontWeight = 'bold';
    guestNameElement.style.fontWeight = 'bold';

    ticketElement.appendChild(imageElement);
    ticketElement.appendChild(entrantNameElement);
    ticketElement.appendChild(entrantAgeElement);
    ticketElement.appendChild(guestNameElement);

    activeTicketsWrapper.appendChild(ticketElement);
}

var addTicketButton = document.getElementById('add-ticket-button');
addTicketButton.onclick = createNewTicketOnServer;

loadTicketsFromServer();