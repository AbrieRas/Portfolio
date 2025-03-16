const Repository = Vue.component('repository', {
    props: ['name', 'languages', 'description'],
    template: `<div class="repository-entry">
        <div class="repository-entry-header">
            <div class="column-left">
                {{ name }}
            </div>
            <div class="column-right">
                <ul>
                    <li v-for="language in languages" :key="language">{{ language }}</li>
                </ul>
            </div>
        </div>
        <div>
            <p>{{ description }}</p>
        </div>
    </div>`
});
