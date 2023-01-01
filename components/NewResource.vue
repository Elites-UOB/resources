<template>
    <div v-if="user" id="new-resource">
        <Transition name="add-transition">
            <div v-if="resourcesStore.modals.add" flex="~">
                <div @click.stop="() => { }" overflow-y="auto" flex="~ col gap-8" items-center p="sm:x-4 y-8" mx="lg:0" bg="p dark:pd" w="full" border="2 s-stroke dark:sdd-stroke rounded-15px">
                    <h1 m="b-4 t-0" text-black dark:text-white>
                        <span v-if="editMode">تعديل</span>
                        <span v-else>إضافة</span>
                        مصدر
                    </h1>

                    <h4 v-if="resourcesStore.getCreateError" text-red-500 my-0 flex gap-2>
                        <icon name="ic:twotone-error" w="6" h="6" />
                        {{ resourcesStore.getCreateError }}
                    </h4>

                    <!-- Main Category -->
                    <div flex="~ col sm:row gap-8" w="80% sm:md">
                        <div w="sm:1/2">
                            <h4 m="t-0 b-2">الفئة الرئيسية</h4>
                            <HeadlessListbox v-model="resourcesStore.current.category" z="20">
                                <div class="relative mt-1">
                                    <!-- Button -->
                                    <HeadlessListboxButton transition="all duration-200" class="relative w-full cursor-pointer rounded-lg bg-s dark:bg-sdd dark:hover:bg-sdd-hover hover:bg-s-hover py-2 pr-3 pl-10 border border-s-stroke dark:border-sdd-stroke focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-s" text="right pw dark:pwd hover:black dark:hover:white sm:sm">
                                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                            <icon name="ic:round-arrow-drop-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                        <span class="block truncate">{{ resourcesStore.current.category?.name }}</span>
                                    </HeadlessListboxButton>
                                    <!-- List Options -->
                                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <HeadlessListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s dark:bg-sdd text-base shadow-lg ring-1 ring-s-stroke dark:ring-sdd-stroke focus:outline-none sm:text-sm" p="2">
                                            <HeadlessListboxOption v-for="category in categories" v-slot="{ active, selected }" :key="category.name" :value="category" as="template">
                                                <li list="none" p="y-2 r-10 l-4" my="1" rounded="10px" cursor="pointer" :class="[
                                                    active ? 'relative cursor-default select-none' : 'relative cursor-default select-none',
                                                    selected ? 'bg-b bg-opacity-10' : 'hover:bg-s-hover dark:hover:bg-sdd-hover'
                                                ]">
                                                    <span :class="[
                                                        selected ? 'font-normal' : 'block truncate',
                                                    ]">{{ category.name }}</span>
                                                    <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-3 text-b">
                                                        <icon name="material-symbols:check-small-rounded" class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </HeadlessListboxOption>
                                        </HeadlessListboxOptions>
                                    </transition>
                                </div>
                            </HeadlessListbox>
                        </div>


                        <!-- Sub Category -->
                        <div w="sm:1/2">
                            <h4 m="t-0 b-2">الفئة الثانوية</h4>
                            <HeadlessListbox :disabled="subCategories?.length > 0 ? false : true" v-model="resourcesStore.current.subCategory" z="20">
                                <div class="relative mt-1">
                                    <!-- Button -->
                                    <HeadlessListboxButton transition="all duration-200" class="relative w-full cursor-pointer rounded-lg bg-s dark:bg-sdd dark:hover:bg-sdd-hover hover:bg-s-hover py-2 pr-3 pl-10 border border-s-stroke dark:border-sdd-stroke focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-s" text="right pw dark:pwd hover:black dark:hover:white sm:sm">
                                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                            <icon name="ic:round-arrow-drop-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                        <span class="block truncate">{{ resourcesStore.current.subCategory?.name ?? 'اختر الفئة الثانوية' }}</span>
                                    </HeadlessListboxButton>
                                    <!-- List Options -->
                                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <HeadlessListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s dark:bg-sdd text-base shadow-lg ring-1 ring-s-stroke dark:ring-sdd-stroke focus:outline-none sm:text-sm" p="2">
                                            <HeadlessListboxOption v-for="subCategory in subCategories" v-slot="{ active, selected }" :key="subCategory.name" :value="subCategory" as="template">
                                                <li list="none" p="y-2 r-10 l-4" my="1" rounded="10px" cursor="pointer" :class="[
                                                    active ? 'relative cursor-default select-none' : 'relative cursor-default select-none',
                                                    selected ? 'bg-b bg-opacity-10' : 'hover:bg-s-hover dark:hover:bg-sdd-hover'
                                                ]">
                                                    <span :class="[
                                                        selected ? 'font-normal' : 'block truncate',
                                                    ]">{{ subCategory.name }}</span>
                                                    <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-3 text-b">
                                                        <icon name="material-symbols:check-small-rounded" class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </HeadlessListboxOption>
                                        </HeadlessListboxOptions>
                                    </transition>
                                </div>
                            </HeadlessListbox>
                        </div>
                    </div>

                    <div flex="~ col" w="80% sm:md">
                        <div flex justify-between items-center>
                            <h4 m="t-0 b-2">العنوان</h4>
                            <span :class="!resourcesStore.title?.length ? 'text-red' : resourcesStore.title?.length >= 10 ? 'text-green' : 'text-red'">{{ resourcesStore.title?.length ?? '0' }}/10</span>
                        </div>
                        <UiInput icon="ic:twotone-subtitles" v-model="resourcesStore.title" bg="focus:s-hover" text="pw dark:pwd lg focus:white" mx-auto max-w="full sm:md" min-w="full sm:md" />
                    </div>

                    <div flex="~ col" w="80% sm:md">
                        <div flex justify-between items-center>
                            <h4 m="t-0 b-2" flex gap-2>
                                <span>الوصف</span>
                                <div @click="(preview = !preview)" text="blue-500 hover:blue-600" cursor="pointer">
                                    <icon v-if="preview" name="ic:baseline-remove-red-eye"></icon>
                                    <icon v-else name="ic:outline-remove-red-eye"></icon>
                                </div>
                            </h4>
                            <span :class="!resourcesStore.description?.length ? 'text-red' : resourcesStore.description?.length >= 50 ? 'text-green' : 'text-red'">{{ resourcesStore.description?.length ?? '0' }}/50</span>

                        </div>
                        <div v-if="preview" v-html="markedDescription" border="~ rounded-10px s-stroke dark:sdd-stroke" px-2 pb-2 class="markdown"></div>
                        <textarea v-else v-model="input" class="resize-none" ref="textarea" bg="s dark:sdd dark:focus:sdd-hover focus:s-hover" text="pw dark:pwd lg focus:white" border="~ s-stroke dark:sdd-stroke rounded-10px" p-2 mx-auto max-w="full sm:md" min-w="full sm:md" min-h="100px" />

                        <div text="left">
                            <a @click="resourcesStore.filters.search = 'أساسيات لغة ماركداون Markdown'" href="#resources" w-fit decoration-none un-text="xs blue-500 hover:blue-600" cursor="pointer">شرح الكتابة بإستخدام ماركداون</a>
                        </div>

                    </div>

                    <div flex="~ col gap-2" w="80% sm:md">
                        <div flex justify-between items-center>
                            <h4 m="t-0 b-2" text-right w-full>الروابط</h4>
                            <icon @click="newLink()" cursor="pointer" text="hover:white" name="ic:round-add" w="8" h="8" />
                        </div>
                        <div v-for="(link, index) in resourcesStore.links" :key="link" flex="~ gap-4" my-2 justify-between items-start sm:items-center>
                            <span w="6" select-none>{{ index + 1 }}</span>
                            <div flex="~ col sm:row gap-1 sm:gap-4">
                                <UiInput v-model="link.title" placeholder="أسم الرابط" sm="~" />
                                <UiInput v-model="link.url" flex="grow" placeholder="عنوان الرابط" sm="~" />
                            </div>
                            <div>
                                <icon @click="editMode ? resourcesStore.removeLink(link.id) : removeLink(index)" cursor="pointer" text="red-400 hover:red-500" name="ic:round-delete" w="24px" h="24px" />
                            </div>
                        </div>
                    </div>

                    <!-- <div flex="~ col gap-2" w="80% sm:md">
                        <div flex justify-between items-center>
                            <h4 m="t-0 b-2" text-right w-full>الملفات</h4>
                            <icon @click="newFile()" cursor="pointer" text="hover:white" name="ic:round-add" w="8" h="8" />
                        </div>
                        <div v-for="(file, index) in files" :key="file" flex="~ gap-4" justify-between items-center>
                            <span w="6">{{ index + 1 }}</span>
                            <span text="right" flex="grow">FILE NAME</span>
                            <icon @click="removeFile(index)" cursor="pointer" text="red-400 hover:red-500" name="ic:round-delete" w="24px" h="24px" />
                        </div>
                    </div> -->

                    <UiButton :disabled="resourcesStore.getLodeing ? true : false" @click="resourcesStore.addResource()" w="150px" mt="6">
                        <span v-if="resourcesStore.getLodeing" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        <div v-else>
                            <span v-if="editMode">تعديل</span>
                            <span v-else>إضافة</span>
                        </div>
                    </UiButton>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { marked } from 'marked';

const resourcesStore = useResources()
const user = useSupabaseUser()

await resourcesStore.fetchCategories()



const newLink = () => {
    resourcesStore.links.push({
        title: '',
        url: ''
    })
}

const removeLink = (index) => {
    resourcesStore.links.splice(index, 1)
}

const files = ref([])

const newFile = () => {
    files.value.push({})
}

const removeFile = (index) => {
    files.value.splice(index, 1)
}


const categories = ref([])

watch(() => resourcesStore.getCategories, (val) => {
    categories.value = val.filter(category => category.sub_categories?.length > 0)
}, { immediate: true })

const subCategories = ref([])



// Markdown and Text Area
const { textarea, input } = useTextareaAutosize()
watch(() => input.value, (value) => resourcesStore.description = value, { immediate: true })
const preview = ref(false)
const markedDescription = computed(() => marked.parse(input.value.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")))


// EDIT
const editMode = ref(false)

const flushing = (value = null) => {
    if (value) {
        resourcesStore.current.category = categories.value.find(category => category.id === value.category_id)
        resourcesStore.current.subCategory = resourcesStore.current.category?.sub_categories.find(subCategory => subCategory.id == value.sub_category_id)
        resourcesStore.title = value.title
        resourcesStore.description = value.description
        input.value = value.description
        resourcesStore.links = value.links
        // files.value = value.files
        editMode.value = true
    } else {
        resourcesStore.current.category = categories.value?.[0]
        resourcesStore.current.subCategory = subCategories.value?.[0]
        resourcesStore.title = ''
        resourcesStore.description = ''
        input.value = ''
        resourcesStore.links = []
        editMode.value = false
    }
}

watch(() => resourcesStore.current.category, (val) => {
    subCategories.value = resourcesStore.getCategories.find(c => c?.id === val?.id)?.sub_categories
    if (!editMode.value) resourcesStore.current.subCategory = subCategories.value?.[0]
})


watch(() => resourcesStore.getEditResource, (value) => flushing(value), { immediate: true })




// onMounted(() => flushing())
</script>

<style scoped>
.add-transition-enter-active {
    transition: all 0.2s ease-out;
}

.add-transition-leave-active {
    transition: all 0.2s;
}

.add-transition-enter-from,
.add-transition-leave-to {
    transform: translateY(-60px);
    opacity: 0;
}
</style>
