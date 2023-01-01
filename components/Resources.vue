<template>
    <div class="flex flex-col gap-2 w-full justify-start items-center">
        <section @click="displayCurriculums()" v-if="resourcesStore.displayBanner" select="none" h="auto" w="full" cursor="pointer" title="عرض المناهج" >
            <img :src="ResourcesBanner" border="rounded-15px" alt="Resources Banner" w="full"  />
        </section>
        <section w="full" flex="~ col gap-3"  v-if="resourcesStore.getFilteredResources?.length > 0">
            <Resource v-for="resource in resourcesStore.getFilteredResources" :resource="resource" :key="resource.id" />
            <ResourcesSkeleton v-show="loading" />
        </section>
        <section v-else text="pw dark:pwd lg" flex="~ col gap-4" items-center justify-center bg="p dark:pd" w="full" h="200px" font-medium border="2 s-stroke dark:sdd-stroke rounded-15px" py-6>
            <icon name="fluent-emoji-flat:face-with-head-bandage" saturate-0 brightness-95 dark:brightness-40 w="16" h="16" />
            <span text-4xl text-d>لايوجد مصادر</span>
        </section>
    </div>
</template>

<script setup>
import ResourcesBanner from '../public/newBanner.png'
// import ResourcesBanner from '../public/ResourcesBanner.png'
const resourcesStore = useResources()
const fetchMore = resourcesStore.fetchMore
const loading = ref(false)

function displayCurriculums() {
    resourcesStore.filters.category.name = 'مواد منهجية'
    resourcesStore.displayBanner = false
}

useInfiniteScroll( document , async () => {
    // hide the loading indicator when all data is loaded
    if (resourcesStore?.fetchPagination === 5) return
    loading.value = true
    await fetchMore()
    setTimeout(() => {
        loading.value = false        
    }, 500);
}, { distance: 15 })

watch( () => resourcesStore?.filters?.category , () => resourcesStore.displayBanner = false)
watch( () => resourcesStore.filters.search , () => resourcesStore.displayBanner = false )
</script>