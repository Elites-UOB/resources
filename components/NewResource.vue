<template>
    <div v-if="user">
        <Transition name="add-transition">
            <div v-if="resourcesStore.modals.add" flex="~">
                <div @click.stop="() => { }" overflow-y="auto" flex="~ col gap-8" items-center p="sm:x-4 y-8" mx="lg:0" bg="p" w="full" border="2 s-stroke rounded-15px">
                    <h1 m="b-4 t-0" text-white>إضافة مصدر</h1>

                    <h4 v-if="resourcesStore.getCreateError" text-red-500 my-0 flex gap-2>
                        <icon name="ic:twotone-error" w="6" h="6" />
                        {{ resourcesStore.getCreateError }}
                    </h4>

                    <!-- Main Category -->
                    <div flex="~ col sm:row gap-8" w="80% sm:md">
                        <div w="sm:1/2">
                            <h4 m="t-0 b-2">الفئة الرئيسية</h4>
                            <HeadlessListbox v-model="resourcesStore.filters.category" z="20">
                                <div class="relative mt-1">
                                    <!-- Button -->
                                    <HeadlessListboxButton transition="all duration-200" class="relative w-full cursor-pointer rounded-lg bg-s hover:bg-s-hover py-2 pr-3 pl-10 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-s" text="right pw hover:white sm:sm" border="0">
                                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                            <icon name="ic:round-arrow-drop-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                        <span class="block truncate">{{ resourcesStore.filters.category?.name }}</span>
                                    </HeadlessListboxButton>
                                    <!-- List Options -->
                                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <HeadlessListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s text-base shadow-lg ring-1 ring-s-stroke focus:outline-none sm:text-sm" p="2">
                                            <HeadlessListboxOption v-for="category in categories" v-slot="{ active, selected }" :key="category.name" :value="category" as="template">
                                                <li list="none" p="y-2 r-10 l-4" my="1" rounded="10px" cursor="pointer" :class="[
                                                    active ? 'relative cursor-default select-none' : 'relative cursor-default select-none',
                                                    selected ? 'bg-b bg-opacity-10' : 'hover:bg-s-hover '
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
                            <HeadlessListbox :disabled="subCategories?.length > 0 ? false : true" v-model="resourcesStore.filters.subCategory" z="20">
                                <div class="relative mt-1">
                                    <!-- Button -->
                                    <HeadlessListboxButton transition="all duration-200" class="relative w-full cursor-pointer rounded-lg bg-s hover:bg-s-hover py-2 pr-3 pl-10 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-s" text="right pw hover:white sm:sm" border="0">
                                        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                            <icon name="ic:round-arrow-drop-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                        <span class="block truncate">{{ resourcesStore.filters.subCategory?.name ?? 'اختر الفئة الرئيسية' }}</span>
                                    </HeadlessListboxButton>
                                    <!-- List Options -->
                                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <HeadlessListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s text-base shadow-lg ring-1 ring-s-stroke focus:outline-none sm:text-sm" p="2">
                                            <HeadlessListboxOption v-for="subCategory in subCategories" v-slot="{ active, selected }" :key="subCategory.name" :value="subCategory" as="template">
                                                <li list="none" p="y-2 r-10 l-4" my="1" rounded="10px" cursor="pointer" :class="[
                                                    active ? 'relative cursor-default select-none' : 'relative cursor-default select-none',
                                                    selected ? 'bg-b bg-opacity-10' : 'hover:bg-s-hover '
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
                            <span text="pw">{{ resourcesStore.title?.length ?? '0' }}/10</span>
                        </div>
                        <UiInput icon="ic:twotone-subtitles" v-model="resourcesStore.title" bg="focus:s-hover" text="pw lg focus:white" mx-auto max-w="full sm:md" min-w="full sm:md" />
                    </div>

                    <div flex="~ col" w="80% sm:md">
                        <div flex justify-between items-center>
                            <h4 m="t-0 b-2">الوصف</h4>
                            <span text="pw">{{ resourcesStore.description?.length ?? '0' }}/50</span>
                        </div>
                        <textarea v-model="resourcesStore.description" bg="s focus:s-hover" text="pw lg focus:white" border="~ s-stroke rounded-10px" mx-auto max-w="full sm:md" min-w="full sm:md" min-h="100px" max-h="250px" />
                    </div>

                    <div flex="~ col gap-2" w="80% sm:md">
                        <div flex justify-between items-center>
                            <h4 m="t-0 b-2" text-right w-full>الروابط</h4>
                            <icon @click="newLink()" cursor="pointer" text="hover:white" name="ic:round-add" w="8" h="8" />
                        </div>
                        <div v-for="(link, index) in links" :key="link" flex="~ gap-4" my-2 justify-between items-start sm:items-center>
                            <span w="6">{{ index + 1 }}</span>
                            <div flex="~ col sm:row gap-1 sm:gap-4">
                                <UiInput v-model="link.title" placeholder="أسم الرابط" sm="~" />
                                <UiInput v-model="link.url" flex="grow" placeholder="عنوان الرابط" sm="~" />
                            </div>
                            <div>
                                <icon @click="removeLink(index)" cursor="pointer" text="red-400 hover:red-500" name="ic:round-delete" w="24px" h="24px" />
                            </div>
                        </div>
                    </div>

                    <div flex="~ col gap-2" w="80% sm:md">
                        <div flex justify-between items-center>
                            <h4 m="t-0 b-2" text-right w-full>الملفات</h4>
                            <icon @click="newFile()" cursor="pointer" text="hover:white" name="ic:round-add" w="8" h="8" />
                        </div>
                        <div v-for="(file, index) in files" :key="file" flex="~ gap-4" justify-between items-center>
                            <span w="6">{{ index + 1 }}</span>
                            <span text="right" flex="grow">FILE NAME</span>
                            <icon @click="removeFile(index)" cursor="pointer" text="red-400 hover:red-500" name="ic:round-delete" w="24px" h="24px" />
                        </div>
                    </div>

                    <UiButton @click="resourcesStore.insertResource()" w="150px" mt="6">
                        إضافة
                    </UiButton>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const resourcesStore = useResources()
const user = useSupabaseUser()

await resourcesStore.fetchCategories()


const links = ref([])

const newLink = () => {
    links.value.push({
        title: '',
        url: ''
    })
}

resourcesStore.links = links.value


const removeLink = (index) => {
    links.value.splice(index, 1)
}

const files = ref([])

const newFile = () => {
    files.value.push({})
}

const removeFile = (index) => {
    files.value.splice(index, 1)
}

const categories = computed(() => resourcesStore.categories.filter(category => category.sub_categories?.length > 0))
resourcesStore.filters.category = categories.value[0]
const selectedPerson = ref(0)

const subCategories = ref([])
watchEffect(() => {
    subCategories.value = resourcesStore.subCategories.filter((subCategory) => subCategory.category_id === resourcesStore.filters.category.id)
    resourcesStore.filters.subCategory = subCategories.value[0]
})
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
