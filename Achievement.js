const Achievement = Vue.component('achievement', {
    props: ['date', 'type'],
    template: `<div class="achievement-entry">
        <div class="column-left">
            <h3>({{ date }})</h3>
        </div>
        <div class="column-right">
            <h3>{{ type }}</h3>
        </div>
    </div>`
});
