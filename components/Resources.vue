<template>
    <div class="flex flex-col gap-2 h-full w-full" >
        <section h="auto" w="full">
            <img :src="ResourcesBanner" rounded="lg" alt="Resources Banner" w="full" h="100%"/>
        </section>
        <section w="full" flex="~ col gap-3"  v-if="resourcesStore.getFilteredResources?.length > 0">
            <Resource v-for="resource in resourcesStore.getFilteredResources" :resource="resource" :key="resource.id" />
            <ResourcesSkeleton/>
        </section>
        <section v-else text="pw dark:pwd lg" flex="~ col gap-4" items-center justify-center bg="p dark:pd" w="auto sm:full"
            h="200px" font-medium border="2 s-stroke dark:sdd-stroke rounded-15px" p="6">
            <icon name="fluent-emoji-flat:face-with-head-bandage" saturate-0 brightness-95 dark:brightness-40 w="16"
                h="16" />
            <span text-4xl text-d>لايوجد مصادر</span>
        </section>
    </div>
</template>

<script setup>
import ResourcesBanner from '../public/ResourcesBanner.png'
const resourcesStore = useResources()
const fetchMore = resourcesStore.fetchMore
const loading = ref(false)

useInfiniteScroll(document, async () => {
    loading.value = true
    await fetchMore()
    setTimeout(() => {
        loading.value = false
    }, 2000);
}, { distance: 15 })

</script>