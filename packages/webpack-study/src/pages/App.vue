<template>
    <router-view />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    setup(props, context) {
        const a = ref('123');

        return {
            a,
        };
    },
});
</script>

<style scoped></style>
