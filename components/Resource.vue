<template>
    <div :class="[
        opened ? 'bg-s border-s-stroke' : 'border-transparent'
    ]" flex="~ col gap-3" w-full transition="all duration-200" py="0" border="~ rounded-15px">
        <div @click="opened = !opened" cursor="pointer" flex justify-between items-center bg="s hover:s-hover" rounded="15px" p="3" :class="{
            'border border-s-stroke rounded-15px': !opened,
        }">
            <!-- Icon and Title -->
            <div flex justify-between items-center gap-4>
                <icon name="carbon:software-resource-cluster" w="40px" h="40px" />
                <span font-medium truncate="~" w="xl">{{ resource.title }}</span>
            </div>

            <!-- Actions -->
            <div flex justify-between items-center gap-4>
                <icon @click.stop="resourcesStore.toggleFavourite(resource)" name="ph:heart-duotone" :text="isFavourited ? 'red-500' : 'pw'" w="32px" h="32px" />
                <icon v-if="resource.verified" name="ph:check-circle-duotone" w="32px" h="32px" text="green-400" />
                <icon name="ph:share-network-duotone" w="32px" h="32px" />
            </div>
        </div>

        <Transition>
            <div flex gap-12 mr="64px" v-if="opened" pb="8">
                <div flex="~ col gap-4" w="1/2">
                    <div flex="~ col">
                        <h3 text="dark" my-1>الوصف</h3>
                        <p m-0>{{ resource.description }}</p>
                    </div>
                    <div flex="~ col">
                        <h3 text="dark" my-1>الروابط</h3>
                        <ol pr-4 m="0">
                            <li><a un-text="pw" href="https://icones.js.org/collection/ic?s=library">https://icones.js.org/collection/ic?s=library</a></li>
                            <li><a un-text="pw" href="https://icones.js.org/collection/ic?s=library">https://icones.js.org/collection/ic?s=library</a></li>
                            <li><a un-text="pw" href="https://icones.js.org/collection/ic?s=library">https://icones.js.org/collection/ic?s=library</a></li>
                        </ol>
                    </div>
                </div>
                <div flex="~ col gap-4" w="1/2">
                    <div flex="~ col">
                        <h3 text="dark" my-1>الإضافة</h3>
                        <span>زين العابدين</span>
                        <span>30 - 11 - 2022</span>
                    </div>
                    <div flex="~ col">
                        <h3 text="dark" my-1>الفئة</h3>
                        <span>كتب - كتب برمجية</span>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const resourcesStore = useResources()
const opened = ref(false)

const props = defineProps({
    resource: {
        type: Object,
    }
})

const isFavourited = computed(() => props.resource?.favourites?.length > 0)

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