<template>
    <div w="full" flex="~ col gap-3">
        <Resource v-for="resource in resourceStore.getFilteredResources" :resource="resource" :key="resource.id" />
    </div>
</template>

<script setup>
const resourceStore = useResources();

await resourceStore.fetch();

</script>