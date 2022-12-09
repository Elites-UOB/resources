<template>
    <div w="full" flex="~ col gap-3" v-if="(resourceStore.getFilteredResources?.length > 0)">
        <Resource v-for="resource in resourceStore.getFilteredResources" :resource="resource" :key="resource.id" />
    </div>
    <div v-else text="pw dark:pwd lg" flex flex-col gap-4 items-center justify-center bg="p dark:pd" w="auto sm:full" h="200px" font-medium border="2 s-stroke dark:sdd-stroke rounded-15px" p="6">
        <icon name="fluent-emoji-flat:face-with-head-bandage" saturate-0 brightness-95 dark:brightness-40 w="16" h="16" />
        <span text-4xl text-d>لايوجد مصادر</span>
    </div>
</template>

<script setup>
const resourceStore = useResources();
</script>