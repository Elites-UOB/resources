<template>
    <div :class="[
        opened ? 'bg-s border-s-stroke' : 'border-transparent'
    ]" flex="~ col sm:gap-3" py="0" border="~ rounded-15px">
        <div @click="opened = !opened" transition="all duration-200" text="hover:white" cursor="pointer" flex justify-between items-center bg="s hover:s-hover" rounded="15px" p="3" :class="{
            'border border-s-stroke rounded-15px': !opened,
        }">
            <!-- Icon and Title -->
            <div flex justify-between items-center gap-2 sm:gap-4>
                <icon name="carbon:software-resource-cluster" w="25px sm:40px" h="25px sm:40px" />
                <span font-medium truncate="~" text="sm sm:base" w="200px sm:sm lg:xl">{{ resource.title }}</span>
            </div>

            <!-- Actions -->
            <div flex justify-between items-center gap-2 sm:gap-4>
                <icon v-if="user" @click.stop="resourcesStore.toggleFavourite(resource)" name="ph:heart-duotone" :text="isFavourited ? 'red-500' : 'pw'" w="24px sm:32px" h="24px sm:32px" />
                <icon v-if="resource.verified" name="ph:check-circle-duotone" w="24px sm:32px" h="24px sm:32px" text="green-400" />
                <icon name="ph:share-network-duotone" w="24px sm:32px" h="24px sm:32px" />
            </div>
        </div>

        <Transition>
            <div flex="~ col sm:row" gap-2 sm:gap-12 mr="12px sm:64px" v-if="opened" pb="8">
                <div flex="~ col gap-2 sm:gap-4" w="sm:2/3">
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1>الوصف</span>
                        <p m-0 text="sm sm:base">{{ resource.description }}</p>
                    </div>
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1>الروابط</span>
                        <ol pr-4 m="0" text="sm sm:base">
                            <li><a un-text="pw" href="https://icones.js.org/collection/ic?s=library">https://icones.js.org/collection/ic?s=library</a></li>
                            <li><a un-text="pw" href="https://icones.js.org/collection/ic?s=library">https://icones.js.org/collection/ic?s=library</a></li>
                            <li><a un-text="pw" href="https://icones.js.org/collection/ic?s=library">https://icones.js.org/collection/ic?s=library</a></li>
                        </ol>
                    </div>
                </div>
                <div flex="~ sm:col gap-2 sm:gap-4" justify-between sm:justify-start w="sm:1/3" ml-4>
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1>الإضافة</span>
                        <span>زين العابدين</span>
                        <span text="sm sm:base">{{new Date(resource.created_at).toLocaleString('ar-IQ', { timeZone: 'Asia/Baghdad' }) }}</span>
                    </div>
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1>الفئة</span>
                        <span text="sm sm:base">{{resource.categories?.name}} - {{resource.sub_categories?.name}}</span>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const resourcesStore = useResources()
const user = useSupabaseUser()
const opened = ref(false)

const props = defineProps({
    resource: {
        type: Object,
    }
})

const isFavourited = computed(() => props.resource?.favourites?.length > 0)
console.log(props.resource)
</script>


<style scoped>
.v-enter-active {
    transition: all 0.3s ease-out;
}

.v-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>