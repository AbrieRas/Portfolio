<script setup>
    import { v4 as uuidv4 } from 'uuid'
    import { formatDate } from '../utils/utility.js';

    const props = defineProps({
        ID: String,
        DATES: Object,
        COMPANY: String,
        ROLE: String,
        DESCRIPTION: String,
    });

    const randomId = uuidv4();
    const formattedStartDate = formatDate(props.DATES.start);
    let formattedEndDate;
    props.DATES.end === 'Current'
        ? formattedEndDate = props.DATES.end
        : formattedEndDate = formatDate(props.DATES.end);
</script>

<template>
    <div :id="{ randomId }" class="career-entry">
        <div class="column-left">
            <h3>({{ formattedStartDate }} - {{ formattedEndDate }})</h3>
        </div>
        <div class="column-right">
            <h3>{{ COMPANY }}: {{ ROLE }}</h3>
            <p>{{ DESCRIPTION }}</p>
        </div>
    </div>
</template>
