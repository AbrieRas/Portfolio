<script setup>
    import { v4 as uuidv4 } from 'uuid'
    import { formatDate } from '../utils/utility.js';

    const props = defineProps({
        ID: String,
        CREATED_DATE: String,
        TITLE: String,
        DESCRIPTION: String,
        LANGUAGES: Array,
    });

    const randomId = uuidv4();
    const formattedCreatedDate = formatDate(props.CREATED_DATE);
</script>

<template>
    <div :id="{ randomId }" class="repository-entry">
        <div class="repository-entry-header">
            <div class="column-left">
                {{ TITLE }} ({{ formattedCreatedDate }})
            </div>
            <div class="column-right">
                <ul>
                    <li v-for="language in LANGUAGES" :key="language">{{ language }}</li>
                </ul>
            </div>
        </div>
        <div>
            <p>{{ DESCRIPTION }}</p>
        </div>
    </div>
</template>
