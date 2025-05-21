<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderSection from './components/HeaderSection.vue';
import Intro from './components/Intro.vue';
import Career from './components/Career.vue';
import Achievement from './components/Achievement.vue';
import Repository from './components/Repository.vue';
import GetInTouch from './components/GetInTouch.vue';
import FooterSection from './components/FooterSection.vue';

const careers = ref([]);
const achievements = ref([]);
const repositories = ref([]);

const serverDomain = 'https://portfolio-server-p1ot.onrender.com';
const fetchOptions = {
	method: 'GET',
	headers: {
		'Request-Origin-Header': 'Same-Origin',
		'Content-Type': 'application/json',
	},
	mode: 'cors',
};

const loading = ref(true);
const loadingText = ref('Loading.');
const loadingDotAmount = ref(1);
let loadingInterval = null;

const startLoadingAnimation = () => {
	loadingInterval = setInterval(() => {
		loadingDotAmount.value = (loadingDotAmount.value % 3) + 1;
		loadingText.value = 'Loading' + '.'.repeat(loadingDotAmount.value);
	}, 500);
};

const fetchCareers = () => {
	fetch(`${serverDomain}/retrieve/Careers`, fetchOptions)
		.then((response) => response.json())
		.then((data) => {
			careers.value = data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};

const fetchAchievements = () => {
	fetch(`${serverDomain}/retrieve/Achievements`, fetchOptions)
		.then((response) => response.json())
		.then((data) => {
			achievements.value = data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};

const fetchRepositories = () => {
	fetch(`${serverDomain}/retrieve/Repositories`, fetchOptions)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((repository) => {
				if (repository.LANGUAGES) {
					repository.LANGUAGES = repository.LANGUAGES
                        .split(',')
                        .map((lang) => lang.trim());
				}
			});
			repositories.value = data;
			loading.value = false;
			clearInterval(loadingInterval);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};

const hrefTo = (src) => {
	const targetSection = document.getElementById(src);
	if (targetSection) {
		targetSection.scrollIntoView({ behavior: 'smooth' });
	}
};

const addBackToTopButtonFunctionality = () => {
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

const initScrollEventListeners = () => {
	const careerTriggers = document.querySelectorAll('.career');
	const achievementTriggers = document.querySelectorAll('.achievements');
	const repositoryTriggers = document.querySelectorAll('.repositories');
	const getInTouchTriggers = document.querySelectorAll('.get-in-touch');

	for (let i = 0; i < careerTriggers.length; i++) {
		careerTriggers[i].addEventListener('click', () => hrefTo('career'));
		achievementTriggers[i].addEventListener('click', () => hrefTo('achievements'));
		repositoryTriggers[i].addEventListener('click', () => hrefTo('repositories'));
		getInTouchTriggers[i].addEventListener('click', () => hrefTo('get-in-touch'));
	}

	addBackToTopButtonFunctionality();
};

onMounted(() => {
	startLoadingAnimation();
	fetchCareers();
	fetchAchievements();
	fetchRepositories();
    initScrollEventListeners();
});
</script>

<template>
    <div id="back-to-top">&#8593;</div>

    <HeaderSection />
    
    <div id="content">
        <Intro />

        <hr />

        <div id="career">
            <h1>Career</h1>

            <h1 v-if="loading">{{ loadingText }}</h1>
            <span v-else>
                <Career
                    v-for="career in careers"
                    :key="career.ID"
                    :ID="career.ID"
                    :DATES="career.DATES"
                    :COMPANY="career.COMPANY"
                    :ROLE="career.ROLE"
                    :DESCRIPTION="career.DESCRIPTION"
                />
            </span>
        </div>

        <hr />

        <div id="achievements">
            <h1>Achievements</h1>

            <h1 v-if="loading">{{ loadingText }}</h1>
            <span v-else>
                <achievement
                    v-for="achievement in achievements"
                    :key="achievement.ID"
                    :ID="achievement.ID"
                    :CREATED_DATE="achievement.CREATED_DATE"
                    :TYPE="achievement.TYPE" />
            </span>
        </div>

        <hr />

        <div id="repositories">
            <h1>Repositories</h1>

            <h1 v-if="loading">{{ loadingText }}</h1>
            <span v-else>
                <repository
                    v-for="repository in repositories"
                    :key="repository.ID"
                    :ID="repository.ID"
                    :TITLE="repository.TITLE"
                    :CREATED_DATE="repository.CREATED_DATE"
                    :DESCRIPTION="repository.DESCRIPTION"
                    :LANGUAGES="repository.LANGUAGES" />
            </span>
        </div>

        <hr />

        <GetInTouch />

    </div>

    <hr />

    <FooterSection />

</template>
