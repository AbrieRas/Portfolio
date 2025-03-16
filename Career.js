const Career = Vue.component('career', {
    props: ['dates', 'company', 'role', 'description'],
    template: `<div class="career-entry">
        <div class="column-left">
            <h3>({{ dates }})</h3>
        </div>
        <div class="column-right">
            <h3>{{ company }}: {{ role }}</h3>
            <p>{{ description }}</p>
        </div>
    </div>`
});
