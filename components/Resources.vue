<template>
    <div class="flex flex-col gap-2 h-full w-full justify-center items-center">
        <section v-if="!resourcesStore.filters.search" @click="displayMethodologies()" select="none" h="auto" w="full" cursor="pointer" title="عرض المناهج" >
            <img :src="ResourcesBanner" border="rounded-15px" alt="Resources Banner" w="full" h="100%"/>
        </section>
        <section w="full" flex="~ col gap-3"  v-if="resourcesStore.getFilteredResources?.length > 0">
            <Resource v-for="resource in resourcesStore.getFilteredResources" :resource="resource" :key="resource.id" />
            <ResourcesSkeleton v-show="loading" />
        </section>
        <section v-else text="pw dark:pwd lg" flex="~ col gap-4" items-center justify-center bg="p dark:pd" w="full"
            h="200px" font-medium border="2 s-stroke dark:sdd-stroke rounded-15px" py-6>
            <icon name="fluent-emoji-flat:face-with-head-bandage" saturate-0 brightness-95 dark:brightness-40 w="16" h="16" />
            <span text-4xl text-d>لايوجد مصادر</span>
        </section>
    </div>
</template>

<script setup>
import ResourcesBanner from '../public/ResourcesBanner.png'
const resourcesStore = useResources()
const fetchMore = resourcesStore.fetchMore
const loading = ref(false)

function displayMethodologies() {
    resourcesStore.filters.search = 'منهج المرحلة'
}

useInfiniteScroll(document, async () => {
    loading.value = true
    await fetchMore()
    loading.value = false
}, { distance: 15 })

</script>