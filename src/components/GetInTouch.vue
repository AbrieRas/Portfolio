<script setup>
import { ref, computed } from 'vue';
import { sanitizeInput } from '../utils/utility.js'; // or write your own

const serverDomain = 'https://portfolio-server-p1ot.onrender.com';
const headers = {
	'Content-Type': 'application/json',
	'Request-Origin-Header': 'Same-Origin',
};

const name = ref('');
const surname = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const submitted = ref(false);
const thankYouMessage = ref('');

const emailIsValid = computed(() => email.value.includes('@'));
const formIsValid = computed(() => name.value && surname.value && emailIsValid.value);

const submit = async () => {
  if (!formIsValid.value) return
    const payload = {
        fullName: sanitizeInput(`${name.value} ${surname.value}`),
        from: sanitizeInput(email.value),
        subject: sanitizeInput(subject.value),
        message: sanitizeInput(message.value),
    }
    try {
        const response = await fetch(`${serverDomain}/email-message`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error(`Status ${response.status}`)
        const text = await response.text()
        thankYouMessage.value = text
    } catch (error) {
        console.error('Send failed:', error)
        thankYouMessage.value = 'Sorry, something went wrong. Please try again later.'
    } finally {
        submitted.value = true
    }
};
</script>

<template>
	<div id="get-in-touch">
		<h1>Get in touch</h1>
		<div id="get-in-touch-body">

            <!-- left side -->
			<div class="column-left">
				<div id="email-box">
					<div>
                        <img class="icon" src="../assets/envelope-regular.svg" />
                        <strong> Email</strong>
                    </div>
					<div>
                        <a href="mailto:abraham.ras97@gmail.com?subject=Feedback on Abrie CV">
                            abraham.ras97@gmail.com
                        </a>
                    </div>
				</div>
				<div id="mobile-box">
					<div>
                        <img class="icon" src="../assets/mobile-screen-button-solid.svg" />
                        <strong> Mobile</strong>
                    </div>
					<div>
                        <a href="tel:27799489329" target="_blank">
                            +27 79 948 9329
                        </a>
                    </div>
				</div>
			</div>

            <!-- right side -->
			<form
                id="email-form"
                class="column-right"
                v-if="!submitted"
                @submit.prevent="submit"
            >
				<div class="inner-column-left">
					<label for="name">Name *</label>
					<input
                        id="name"
                        name="name"
                        type="text"
                        autocomplete="name"
                        tabindex="1"
                        v-model.trim="name"
                        required
                    />

					<label for="email">Email *</label>
					<input
						id="email"
						name="email"
						type="text"
						autocomplete="email"
						tabindex="3"
						v-model.trim="email"
						:class="{ invalid: email && !emailIsValid}"
                        required
					/>
                    <p v-if="email && !emailIsValid" class="error">
                        Please enter a valid email address.
                    </p>
				</div>

				<div class="inner-column-right">
					<label for="surname">Surname *</label>
					<input
                        id="surname"
                        name="surname"
                        type="text"
                        tabindex="2"
                        v-model.trim="surname"
                        required
                    />

					<label for="subject">Subject</label>
					<input
                        id="subject"
                        name="subject"
                        type="text"
                        tabindex="4"
                        required
                    />
				</div>

				<label for="message">Message</label>
				<textarea
                    id="message"
                    name="message"
                    tabindex="5"
                    v-model.trim="message"
                    rows="4"
                ></textarea>

				<div
                    id="submit"
                    tabindex="6"
                    :class="{ active: formIsValid, disabled: !formIsValid }"
                    @click="submit"
                >
                    Send
                </div>
			</form>

            <!-- thank-you message -->
            <div v-else class="column-right thank-you">
                <h2>Thank you!</h2>
                <p>{{ thankYouMessage }}</p>
                <img src="../assets/Self-Thanking.png" alt="Thank you" />
            </div>
		</div>
	</div>
</template>

<style scoped>
.invalid {
	background-color: #ffeded;
	border-color: #da5252;
}

#submit {
	text-align: center;
	border: 2px solid black;
	border-radius: 10px;
	margin: 0% auto;
	width: 80%;
	padding: 25px;
	word-wrap: break-word;
	font-weight: bold;
	color: #000000;
	cursor: default;
	background-color: gray;
	color: #ffffff;
	transition: background-color 0.5s;
}

#submit.active {
	background-color: #aff8a2;
	color: #000000;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.error {
    color: #e74c3c;
    font-size: 0.875rem;
    position: absolute;
    margin-top: -18px;
    margin-left: 5px;
}

#submit.disabled {
    background: #b2bec3;
    cursor: not-allowed;
}

#submit.active:hover {
    background: #2271b3;
}

.thank-you {
    text-align: center;
    padding: 1rem;
}

.thank-you img {
    max-width: 100%;
    margin-top: 1rem;
    border-radius: 0.5rem;
}
</style>