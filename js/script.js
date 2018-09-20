/*
	Techdegree Project: Unit 5 - Public API Requests
*/

// Global Variables
const searchDiv = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
const newDiv = document.createElement('div');
const employeeDB = [];
let employeeName = "";
let employeeInfo = "";
let index = 0;
let active = "inactive";
let searchVal ="";

fetch('https://randomuser.me/api?results=12&nat=us')
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
					<p class="card-text cap">${data[i].location.city}</p>
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
			document.querySelector('#search-input').value = searchVal;
		}  else if (e.target.className === 'modal-container') {
			document.querySelector('.modal-container').remove();
			active = "inactive";
			document.querySelector('#search-input').value = searchVal;
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
	let phone = data.phone.split('-');
	phone = `${phone[0]} ${phone[1]}-${phone[2]}`;
	employeeDB.push({
		"photo" : data.picture.large,
		"fName" : data.name.first,
		"lName" : data.name.last,
		"name" : `${data.name.first} ${data.name.last}`,
		"email" : data.email,
		"phone" : phone,
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
		            <p class="modal-text" style="text-transform: capitalize;">${employeeID.street}, ${employeeID.city}, ${employeeID.state} ${employeeID.zip}</p>
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
	backgroundGradient();
}



function addSearch() {
	let search = "";
	search += `
			<form action="#" method="get">
			    <input type="search" id="search-input" class="search-input" placeholder="Search...">
			    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
			</form>
	`;
	searchDiv.innerHTML = search;
	document.addEventListener("click", (e) => {
		if (e.target.className === 'search-submit') {
			e.preventDefault();
		}
	});
	document.addEventListener("input", (e) => {
		const cards = document.querySelector('.gallery').children;
		if (e.target.tagName === 'INPUT' && e.target.value != "") {
			for (let i = 0; i < cards.length; i++ ) {
				let name = cards[i];
				console.log(name);
				let childElements = name.children;
				console.log(childElements);
				for (let i=0; i<childElements.length; i++) {
					if (childElements[i].className === 'card-info-container') {
						cardName = childElements[i].firstElementChild.textContent;
						console.log(cardName);
						if (cardName.includes(e.target.value) === true) {
							name.style.display = 'flex';
						} else {
							name.style.display = 'none';
						}
					}
				}
			}
		} else {
			for (let i = 0; i < cards.length; i++ ) {
				let name = cards[i];
				name.style.display = 'flex';
			}
		}
		searchVal = e.target.value;
		console.log(searchVal);
	});
}
addSearch();

// The getRgb1 and getRgb2 functions get random numbers to create random rgb colors, and returns rgb colors
function getRgb1() {
	const red = Math.floor((Math.random() * 255) + 1 );
	const green = Math.floor((Math.random() * 255) + 1 );
	const blue = Math.floor((Math.random() * 255) + 1 );
	const rgb1 = `rgb(${red}, ${green}, ${blue})`;
	return rgb1;
}
function getRgb2() {
	const red2 = Math.floor((Math.random() * 255) + 1 );
	const green2 = Math.floor((Math.random() * 255) + 1 );
	const blue2 = Math.floor((Math.random() * 255) + 1 );
	const rgb2 = `rgb(${red2}, ${green2},${blue2})`;
	return rgb2;
}


// The backgroundGradient funtion loads the rgb values from getRgb1 and getRgb2, creates a gradient, and changes the modals background color
function backgroundGradient() {
	const rgb1 = getRgb1();
	const rgb2 = getRgb2();
	const backgroundColor = `linear-gradient(to bottom right, ${rgb1}, ${rgb2})`;
	document.querySelector('.modal').style.backgroundImage = backgroundColor;
	document.querySelector('.modal-btn-container').style.backgroundColor = rgb2;
	document.querySelector('.modal-img').style.border = `2px solid ${rgb2}`;
	document.querySelector('.modal-img').style.boxShadow = `-3px -2px 0px ${rgb2}`;
}

