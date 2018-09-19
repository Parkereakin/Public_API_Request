/*
	Techdegree Project: Unit 5 - Public API Requests
*/

// Global Variables
const searchDiv = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
const newDiv = document.createElement('div');
const employeeDB = [];

fetch('https://randomuser.me/api?results=12')
	.then(response => response.json())
	.then(data => generateEmployees(data.results));

function generateEmployees(data) {
	let galleryHTML = ""
	for (let i=0; i<data.length; i++) {
		galleryHTML += `
			<div class="card">
				<div class="card-img-container">
					<img class="card-img" src="${data[i].picture.large}" alt="profile picture">
				</div>
				<div class="card-info-container">
					<h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
					<p class="card-text">${data[i].email}</p>
					<p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
				</div>
			</div>
		`;
		document.querySelector('#gallery').innerHTML = galleryHTML;
		buildEmployeeDB(data[i])
	}
} 


function buildEmployeeDB(data) {
	employeeDB.push({
		"photo" : data.picture.large,
		"fName" : data.name.first,
		"lName" : data.name.last,
		"name" : `${data.name.first} ${data.name.last}`,
		"email" : data.email,
		"phone" : data.phone,
		"street" : data.location.street,
		"city" : data.location.city,
		"state" : data.location.state,
		"zip" : data.location.postcode,
		"birthday" : data.dob.date
	});
}

/*
// Search markup:
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>

searchDiv.append();
*/



/*
// Modal markup:

<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>

    // IMPORTANT: if you're not going for exceeds 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>

body.append();
*/








