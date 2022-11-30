<template>
    <div :class="[
        opened ? 'bg-s border-s-stroke' : 'border-transparent'
    ]" flex="~ col gap-2 sm:gap-3" py="0" border="~ rounded-15px">
        <div @click="opened = !opened" transition="all duration-200" text="hover:white" cursor="pointer" flex justify-between items-center bg="s hover:s-hover" rounded="15px" p="3" :class="{
            'border border-s-stroke rounded-15px': !opened,
        }">
            <!-- Icon and Title -->
            <div flex justify-between items-center gap-2 sm:gap-4>
                <icon :name="resource?.categories?.icon" w="22px sm:40px" h="22px sm:40px" />
                <span font-medium truncate="~" select-none text="xs sm:base" w="180px sm:sm lg:xl">{{ resource.title }}</span>
            </div>

            <!-- Actions -->
            <div flex justify-between items-center gap-2 sm:gap-4>
                <!-- USER OWNED -->
                <icon v-if="user && (userOwned || authStore.isAdmin)" @click.stop="() => { }" name="material-symbols:edit-rounded" text="b" w="18px sm:32px" h="18px sm:32px" />
                <icon v-if="user && (userOwned || authStore.isAdmin)" @click.stop="resourcesStore.removeResource(resource)" name="ic:round-delete" text="red-500 hover:red-400" w="18px sm:32px" h="18px sm:32px" />

                <!-- USER NOT OWNED -->
                <icon v-if="user && !userOwned" @click.stop="resourcesStore.toggleFavourite(resource)" name="ph:heart-duotone" :text="isFavourited ? 'red-500 hover:red-400' : 'pw hover:white'" w="18px sm:32px" h="18px sm:32px" />

                <icon v-if="(resource.verified && !authStore.isAdmin)" name="ph:check-circle-duotone" w="18px sm:32px" h="18px sm:32px" text="green-400" />

                <!-- COPIED -->
                <icon v-if="copied" name="line-md:clipboard-check-twotone" w="18px sm:32px" h="18px sm:32px" duration="200" text="pw hover:white" />
                <icon v-else @click.stop="startShare()" name="ph:share-network-duotone" w="18px sm:32px" h="18px sm:32px" duration="200" text="pw hover:white" />
            </div>
        </div>

        <Transition>
            <div flex="~ col sm:row" gap-2 sm:gap-12 mr="12px sm:64px" v-if="opened" pb="8">
                <div flex="~ col gap-2 sm:gap-4" w="sm:2/3">
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1 select-none>الوصف</span>
                        <p m-0 text="sm sm:base">{{ resource.description }}</p>
                    </div>
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1 select-none>الروابط</span>
                        <ol pr-4 m="0" text="sm sm:base">
                            <li v-for="item in resource.links" :key="item.id"><a target="_blank" un-text="pw" :href="item.url">{{ item.title }}</a></li>
                        </ol>
                    </div>
                </div>
                <div flex="~ sm:col gap-2 sm:gap-4" justify-between sm:justify-start w="sm:1/3" ml-4>
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1 select-none>الإضافة</span>
                        <span> {{ resource.author }} </span>
                        <span text="sm sm:base" select-none>{{ new Date(resource.created_at).toLocaleString('ar-IQ', { timeZone: 'Asia/Baghdad' }) }}</span>
                    </div>
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1 select-none>الفئة</span>
                        <span text="sm sm:base">{{ resource.categories?.name }} - {{ resource.sub_categories?.name }}</span>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const resourcesStore = useResources()
const authStore = useAuth()
const user = useSupabaseUser()
const opened = ref(false)

const props = defineProps({
    resource: {
        type: Object,
    }
})

const isFavourited = computed(() => props.resource?.favourites?.length > 0)
const userOwned = computed(() => props.resource?.user_id == user.value?.id)


// const { share, isSupported } = useShare()

// console.log(isSupported)
// const startShare = () => {
//   share({
//     title: 'Hello',
//     text: 'Hello my friend!',
//   })
// }

const source = ref(`${props.resource.title}

${props.resource.description}
${props.resource.links.map(link => link.title + ' - ' + link.url).join('\n')}

${props.resource.categories.name} - ${props.resource.sub_categories.name}
${props.resource.author}
${new Date(props.resource.created_at).toLocaleString('ar-IQ', { timeZone: 'Asia/Baghdad' })}

https://resources.csitelites.tech

#نظام_مصادر

`)

const { text, copy: startShare, copied, isSupported } = useClipboard({ source, copiedDuring: 5000 })


// await new Promise(resolve => setTimeout(resolve, 2500));


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