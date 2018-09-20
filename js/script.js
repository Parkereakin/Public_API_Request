/*
	Techdegree Project: Unit 5 - Public API Requests
*/

// Global Variables
const searchDiv = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
const newDiv = document.createElement('div');
const cards = document.querySelectorAll('.card');
const employeeDB = [];
let employeeName = "";
let employeeInfo = "";
let index = 0;
let active = "inactive";

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
		buildEmployeeDB(data[i]);
	}
} 

function cardClick() {
	document.addEventListener('click', (e) => {
		if (e.target.className === 'card' || e.target.parentNode.className === 'card' || e.target.parentNode.parentNode.className === 'card') {
			if (active === 'inactive') {
				let employee = e.target.closest('.card');
				let children = employee.children;
				for (let i=0; i<children.length; i++) {
					if (children[i].className === 'card-info-container') {
						employeeName = children[i].firstElementChild.textContent;
					}
				}
			}
			getEmployeeInfo(employeeName);
		} else if (e.target.className === 'modal-close-btn' || e.target.textContent === 'X') {
			document.querySelector('.modal-container').remove();
			active = "inactive";
		}  else if (e.target.className === 'modal-container') {
			document.querySelector('.modal-container').remove();
			active = "inactive";
		}  else if (e.target.className === 'modal') {
			e.preventDefault();
		} else if (e.target.className === 'modal-prev btn') {
			document.querySelector('.modal-container').remove();
			if (index <= 0) {
				index = employeeDB.length - 1;
			} else {
				index -= 1;
			}
			buildModal(employeeDB[index]);
		} else if (e.target.className === 'modal-next btn') {
			document.querySelector('.modal-container').remove();
			if (index >= employeeDB.length - 1) {
				index = 0;
			} else {
				index += 1;
			}
			buildModal(employeeDB[index]);
		}
	});
	// Add keyboard functionality using keypress events
	document.addEventListener('keydown', function(e){
		if (active === 'inactive') {
			
		} else {
			if (e.key === 'ArrowLeft') {
				document.querySelector('.modal-container').remove();
				if (index <= 0) {
					index = employeeDB.length - 1;
				} else {
					index -= 1;
				}
				buildModal(employeeDB[index]);
			} else if (e.key === 'ArrowRight') {
				document.querySelector('.modal-container').remove();
				if (index >= employeeDB.length - 1) {
					index = 0;
				} else {
					index += 1;
				}
				buildModal(employeeDB[index]);
			} else {
				e.preventDefault();	
			}
		}
	});
}
cardClick();

function buildEmployeeDB(data) {
	let dob = data.dob.date;
	dob = dob.split('T')[0];
	let year = dob.split('-')[0].substr(2, 2);
	let month = dob.split('-')[1];
	let day = dob.split('-')[2];
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
		"birthday" : `${month}/${day}/${year}`
	});
}

function getEmployeeInfo(employeeName) {
	for (let i=0; i<employeeDB.length; i++) {
		if (employeeName === employeeDB[i].name) {
			index = i;
		}
	}
	buildModal(employeeDB[index]);
}

function buildModal(employeeID) {
	active = "active";
	let modal = "";
	modal += `
		<div class="modal-container">
		    <div class="modal">
		        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
		        <div class="modal-info-container">
		            <img class="modal-img" src="${employeeID.photo}" alt="profile picture">
		            <h3 id="name" class="modal-name cap">${employeeID.name}</h3>
		            <p class="modal-text">${employeeID.email}</p>
		            <p class="modal-text cap">${employeeID.city}</p>
		            <hr>
		            <p class="modal-text">${employeeID.phone}</p>
		            <p class="modal-text">${employeeID.street}, ${employeeID.city}, ${employeeID.state} ${employeeID.zip}</p>
		            <p class="modal-text">Birthday: ${employeeID.birthday}</p>
		        </div>
		    </div>

		    // IMPORTANT: if you're not going for exceeds 
		    <div class="modal-btn-container">
		        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
		        <button type="button" id="modal-next" class="modal-next btn">Next</button>
		    </div>
		</div>
	`;
	document.querySelector('body').innerHTML += modal;
}



/*
// Search markup:
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>

searchDiv.append();
*/







