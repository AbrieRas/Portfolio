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
        },
		loadingText: "Loading.",
		loadingDotAmount: 1,
		loading: true,
		loadingInterval: null,
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
		this.startLoadingAnimation();
		this.fetchCareers();
		this.fetchAchievements();
		this.fetchRepositories();
	},
	methods: {
		startLoadingAnimation() {
			this.loadingInterval = setInterval(() => {
				this.loadingDotAmount = (this.loadingDotAmount % 3) + 1;
				this.loadingText = "Loading" + ".".repeat(this.loadingDotAmount);
			}, 500);
		},
		fetchCareers() {
			fetch(`${this.serverDomain}/retrieve/Careers`, this.fetchOptions)
				.then((response) => response.json())
				.then((data) => {
					this.careers = data;
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		},
		fetchAchievements() {
			fetch(`${this.serverDomain}/retrieve/Achievements`, this.fetchOptions)
				.then((response) => response.json())
				.then((data) => {
					this.achievements = data;
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		},
		fetchRepositories() {
			fetch(`${this.serverDomain}/retrieve/Repositories`, this.fetchOptions)
				.then((response) => response.json())
				.then((data) => {
					// Convert the comma-separated language key string into an array
					data.forEach((repository) => {
						if (repository.languages) {
							repository.languages = repository.languages.split(',').map((lang) => lang.trim());
						}
					});
					this.repositories = data;

					// Disable loading animation
					this.loading = false;
					clearInterval(this.interval);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		},
	},
});
