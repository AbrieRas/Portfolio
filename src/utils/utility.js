export const formatDate = (dateStr) => {
	const date = new Date(dateStr);
	if (isNaN(date)) return '';

	// Return abbreviated month and full year with intl library
	return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}

// utility.js

// export const switchDisplay = () => {
// 	const emailForm = document.getElementById('email-form');
// 	emailForm.style.display = emailForm.style.display === 'none' ? 'block' : 'none';
// };

// export const appendImageToGetInTouch = (message) => {
// 	const getInTouchElement = document.getElementById('get-in-touch-body');
// 	const tempDiv = document.createElement('div');
// 	tempDiv.className = 'column-right';

// 	const thanksText = document.createElement('h2');
// 	thanksText.textContent = message;

// 	const thanksImage = document.createElement('img');
// 	thanksImage.src = '../assets/Self-Thanking.png';
// 	thanksImage.alt = 'Thank you image';

// 	tempDiv.appendChild(thanksText);
// 	tempDiv.appendChild(thanksImage);
// 	getInTouchElement.appendChild(tempDiv);

// 	setTimeout(() => {
// 		getInTouchElement.removeChild(tempDiv);
// 		switchDisplay();
// 	}, 10000);
// };

// export const handleSubmitSuccess = (message) => {
// 	switchDisplay();
// 	appendImageToGetInTouch(message);
// };

// export const formIsValid = () => {
// 	const submitButton = document.getElementById('submit');
// 	return !submitButton.hasAttribute('disabled');
// };

export const sanitizeInput = (input) => {
	const tempElement = document.createElement('div');
	tempElement.innerText = input;
	const sanitized = tempElement.innerHTML
		.trim()
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/`/g, "&#96;");
	tempElement.remove();
	return sanitized;
};

// const addSubmitButtonFunctionality = () => {
// 	document.getElementById('submit').addEventListener('click', () => {
// 		if (formIsValid()) {
// 			const sanatizedName = sanitizeInput(`${sanitizeInput(document.getElementById('name').value)} ${sanitizeInput(document.getElementById('surname').value)}`);
// 			const sanatizedEmail = sanitizeInput(document.getElementById('email').value);
// 			const sanatizedSubject = sanitizeInput(document.getElementById('subject').value);
// 			const sanatizedMessage = sanitizeInput(document.getElementById('message').value);

// 			const mailData = {
// 				fullName: sanatizedName,
// 				from: sanatizedEmail,
// 				subject: sanatizedSubject,
// 				message: sanatizedMessage,
// 			};

// 			fetch('https://portfolio-server-p1ot.onrender.com/email-message', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					'Request-Origin-Header': 'Same-Origin',
// 				},
// 				body: JSON.stringify(mailData),
// 			})
// 			.then(response => {
// 				if (!response.ok) throw new Error(`Bad request.`);
// 				return response.text();
// 			})
// 			.then(data => handleSubmitSuccess(data))
// 			.catch(error => console.log('An error occurred:', error));
// 		} else {
// 			console.log('Form is not valid. Submission aborted. Please fill in Name, Surname and Email.');
// 		}
// 	});
// };

// Smooth scroll to section by ID
export const hrefTo = (src) => {
	const targetSection = document.getElementById(src);
	if (targetSection) {
		targetSection.scrollIntoView({ behavior: 'smooth' });
	}
};

export const addBackToTopButtonFunctionality = () => {
	const backToTopButton = document.getElementById('back-to-top');
	const triggerPoint = document.getElementById('career');

	window.addEventListener('scroll', () => {
		if (window.scrollY >= triggerPoint.offsetTop) {
			backToTopButton.style.opacity = '1';
			backToTopButton.style.width = '50px';
			backToTopButton.style.height = '50px';
			backToTopButton.style.fontSize = '30px';
		} else {
			backToTopButton.style.opacity = '0';
			backToTopButton.style.width = '0px';
			backToTopButton.style.height = '0px';
			backToTopButton.style.fontSize = '0px';
		}
	});

	backToTopButton.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
};

// Optional init function to wire up scroll buttons and form
export const initUIEventListeners = () => {
	const careerClasses = document.querySelectorAll('.career');
	const achievementsClasses = document.querySelectorAll('.achievements');
	const repositoriesClasses = document.querySelectorAll('.repositories');
	const getInTouchClasses = document.querySelectorAll('.get-in-touch');

	for (let i = 0; i < careerClasses.length; i++) {
		careerClasses[i].addEventListener('click', () => hrefTo('career'));
		achievementsClasses[i].addEventListener('click', () => hrefTo('achievements'));
		repositoriesClasses[i].addEventListener('click', () => hrefTo('repositories'));
		getInTouchClasses[i].addEventListener('click', () => hrefTo('get-in-touch'));
	}

	// addSubmitButtonFunctionality();
	addBackToTopButtonFunctionality();
};
