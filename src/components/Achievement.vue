<script setup>
    import { v4 as uuidv4 } from 'uuid'
    import { formatDate } from '../utils/utility.js';

    const props = defineProps({
        ID: String,
        CREATED_DATE: String,
        TYPE: String,
    });

    const randomId = uuidv4();
    const formattedCreatedDate = formatDate(props.CREATED_DATE);
</script>

<template>
    <div :id="{ randomId }" class="achievement-entry">
        <div class="column-left">
            <h3>({{ formattedCreatedDate }})</h3>
        </div>
        <div class="column-right">
            <h3>{{ TYPE }}</h3>
        </div>
    </div>
</template>
