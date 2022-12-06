<template>
    <div :class="{ 'bg-s': opened }" flex="~ col gap-2 sm:gap-3" py="0" border="~ rounded-15px s-stroke">

        <div @click="opened = !opened" transition="all duration-200" text="hover:white" cursor="pointer" flex justify-between items-center bg="s hover:s-hover" hover:scale-103 class="border border-rounded-15px" p="3" :border="userOwned ? (resource.verified ? 'blue-800' : 'yellow-800') : 's-stroke'" :class="{
            'scale-103 text-white bg-s-hover': opened
        }">


            <!-- Icon and Title -->
            <div :class="options ? 'hidden sm:flex' : 'flex'" justify-between items-center gap-2 sm:gap-4 isolation="isolate" overflow="hidden">
                <icon :name="resource?.categories ? resource?.categories?.icon : 'ant-design:file-unknown-filled'" w="22px sm:40px" h="22px sm:40px" />
                <div flex flex-col>
                    <div :class="opened ? 'hidden' : 'block'" text="xs sm:sm gray-500" w="160px sm:sm lg:xl" font="400">
                        <span>{{ resource.categories?.name ?? 'غير مصنف' }} - {{ resource.sub_categories?.name ?? '' }}</span>

                        <icon v-if="(resource.share_count > 10)" mr-1 name="fluent-emoji-flat:fire" />
                    </div>
                    <span font-medium truncate="~" select-none text="sm sm:base" w="auto sm:100% lg:xl">{{ resource.title }}</span>
                </div>
            </div>


            <!-- Actions -->
            <div :class="!options ? 'hidden sm:flex' : 'flex'" justify-between items-center gap-6 sm:gap-4>
                <!-- USER OWNED -->
                <a href="#header" flex items-center>
                    <icon v-if="user && (userOwned || authStore.isAdmin)" @click.stop="() => { resourcesStore.editResource = resource, resourcesStore.modals.add = true }" name="material-symbols:edit-rounded" text="b" w="18px sm:32px" h="18px sm:32px" />
                </a>

                <icon v-if="user && (userOwned || authStore.isAdmin)" @click.stop="resourcesStore.removeResource(resource)" name="ic:round-delete" text="red-500 hover:red-400" w="18px sm:32px" h="18px sm:32px" />

                <icon v-if="authStore.isAdmin" @click.stop="resourcesStore.toggleVerification(resource)" name="ph:check-circle-duotone" w="18px sm:32px" h="18px sm:32px" :text="resource.verified ? 'green-400' : 'pw hover:white'" />




                <!-- USER NOT OWNED -->
                <icon v-if="user && !userOwned" @click.stop="resourcesStore.toggleFavourite(resource)" name="ph:heart-duotone" :text="isFavourited ? 'red-500 hover:red-400' : 'pw hover:white'" w="18px sm:32px" h="18px sm:32px" />

                <!-- <icon v-if="(resource.verified && !authStore.isAdmin)" name="ph:check-circle-duotone" w="18px sm:32px" h="18px sm:32px" text="green-400" /> -->

                <!-- COPIED -->
                <icon v-if="copied" name="line-md:clipboard-check-twotone" w="18px sm:32px" h="18px sm:32px" duration="200" text="pw hover:white" />
                <icon v-else @click.stop="startShare(); resourcesStore.addShare(resource)" name="ph:share-network-duotone" w="18px sm:32px" h="18px sm:32px" duration="200" text="pw hover:white" />
            </div>


            <!-- Actions Mobile -->
            <div block sm:hidden @click.stop="(options = !options)" bg="transparent" border="0" z="10">
                <icon cursor="pointer" :text="options ? 'b' : 'pw'" name="humbleicons:bars" w="5" h="5" />
            </div>

        </div>

        <Transition>
            <div flex="~ col sm:row" gap-2 sm:gap-12 mr="12px sm:64px" v-if="opened" pb="8">
                <div flex="~ col gap-2 sm:gap-4" w="sm:2/3">
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1 select-none>الوصف</span>
                        <div class="markdown" m-0 text="sm sm:base" ml-3 break-word text-justify v-html="markedDescription"></div>
                    </div>
                    <div v-if="(resource.links.length > 0)" flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1 select-none>الروابط</span>
                        <ol pr-4 m="0" text="sm sm:base">
                            <li v-for="item in resource.links" :key="item.id"><a target="_blank" un-text="pw hover:white base sm:lg" decoration="none" :href="item.url">{{ item.title }}</a></li>
                        </ol>
                    </div>
                </div>
                <div flex="~ sm:col gap-2 sm:gap-4" justify-between sm:justify-start w="sm:1/3" ml-4>
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1 select-none>الإضافة</span>
                        <div flex="~ gap-1 items-center">
                            <span> {{ resource.profiles?.first_name }}</span>
                            <svg text="b" v-if="resource.profiles?.verified" mt-1 xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c-1 .6-1.7 1.8-1.7 3s.7 2.4 1.7 3c-.3 1.2 0 2.5 1 3.4c.8.8 2.1 1.2 3.3 1c.6 1 1.8 1.6 3 1.6s2.4-.6 3-1.7c1.2.3 2.5 0 3.4-1c.8-.8 1.2-2 1-3.3c1-.6 1.6-1.8 1.6-3s-.6-2.4-1.7-3c.3-1.2 0-2.5-1-3.4a3.7 3.7 0 0 0-3.3-1c-.6-1-1.8-1.6-3-1.6Z" />
                                    <path d="m9 12l2 2l4-4" />
                                </g>
                            </svg>
                        </div>
                        <span text="sm sm:base" select-none>{{ new Date(resource.created_at).toLocaleString('ar-IQ', { timeZone: 'Asia/Baghdad' }) }}</span>

                        <span v-if="(userOwned && resource.verified)" text="blue-500">(أنت)</span>
                        <span v-if="(userOwned && !resource.verified)" text="yellow-500">(قيد المراجعة)</span>
                    </div>
                    <div flex="~ col">
                        <span font-bold text="base sm:xl dark" my-1 select-none>الفئة</span>
                        <span text="sm sm:base">{{ resource.categories?.name ?? 'غير مصنف' }} - {{ resource.sub_categories?.name ?? '' }}</span>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { marked } from 'marked';
import PlainTextRenderer from "marked-plaintext"


const resourcesStore = useResources()
const authStore = useAuth()
const user = useSupabaseUser()
const opened = ref(false)
const options = ref(false)

const props = defineProps({
    resource: {
        type: Object,
    }
})

const isFavourited = computed(() => props.resource?.favourites?.length > 0)
const userOwned = computed(() => props.resource?.user_id == user.value?.id)
const isVerified = computed(() => props.resource?.verified == false)

// const subCategory = computed(() => resourcesStore.getSubCategories.find(item => item.id == props.resource.sub_category_id) ?? '')
// const { share, isSupported } = useShare()

// console.log(isSupported)
// const startShare = () => {
//   share({
//     title: 'Hello',
//     text: 'Hello my friend!',
//   })
// }

const convertToPlainText = (markdownText) => {
  const renderer = new PlainTextRenderer()
  renderer.checkbox = (text) => text
  marked.setOptions({sanitize: false})
  return marked(markdownText, { renderer })
}

const source = ref(`${props.resource.title}

${convertToPlainText(props.resource.description)}
${props.resource.links.map(link => link.title + ' - ' + link.url).join('\n')}

${props.resource.categories?.name ?? 'غير مصنف'} - ${props.resource.sub_categories?.name ?? ''}
${props.resource.profiles?.first_name}
${new Date(props.resource.created_at).toLocaleString('ar-IQ', { timeZone: 'Asia/Baghdad' })}

https://resources.csitelites.tech

#نظام_مصادر

`)

const { text, copy: startShare, copied, isSupported } = useClipboard({ source, copiedDuring: 5000 })


// await new Promise(resolve => setTimeout(resolve, 2500));

const markedDescription = computed(() => marked.parse(props.resource.description.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")))



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