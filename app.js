// Vue
const app = new Vue({
	el: '#app',
	/* Enable production mode */
	productionTip: false,
	data: {
		name: '',
		surname: '',
		email: '',
		careers: [],
		achievements: [],
		repositories: [],
        serverDomain: 'https://portfolio-server-p1ot.onrender.com',
        fetchOptions: {
            method: 'GET',
            headers: {
                'Request-Origin-Header': 'Same-Origin',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        }
	},
	computed: {
		emailIsValid: function () {
			return this.email.includes('@');
		},
		formIsValid: function () {
			return this.name && this.surname && this.emailIsValid;
		},
		emailClasses: function () {
			return {
				touched: this.email.length !== 0,
				invalid: this.email && !this.emailIsValid,
			};
		},
	},
	created() {
		this.fetchCareers();
		this.fetchAchievements();
		this.fetchRepositories();
	},
	methods: {
		fetchCareers() {
			fetch(`${serverDomain}/retrieve/Careers`, this.fetchOptions)
				.then((response) => response.json())
				.then((data) => {
					this.careers = data;
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		},
		fetchAchievements() {
			fetch(`${serverDomain}/retrieve/Achievements`, this.fetchOptions)
				.then((response) => response.json())
				.then((data) => {
					this.achievements = data;
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		},
		fetchRepositories() {
			fetch(`${serverDomain}/retrieve/Repositories`, this.fetchOptions)
				.then((response) => response.json())
				.then((data) => {
					// Convert the comma-separated language key string into an array
					data.forEach((repository) => {
						if (repository.languages) {
							repository.languages = repository.languages.split(',').map((lang) => lang.trim());
						}
					});
					this.repositories = data;
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		},
	},
});
