<template>
    <div>
        <UiButton @click="opened = !opened" square>
            <icon name="ic:round-add" w="8" h="8" />
        </UiButton>

        <Teleport to="body">
            <Transition>
                <div v-if="opened" @click="opened = false" flex="~" items-center justify-center class="fixed inset-0 bg-p bg-opacity-80" backdrop-blur="sm" z="20">
                    <div @click.stop="() => { }" overflow-y="auto" flex="~ col gap-8" items-center p="4" bg="p" w="xl" h="3xl" border="2 s-stroke rounded-15px">
                        <h1 m="b-4 t-8" text-white>إضافة مصدر</h1>

                        <!-- Main Category -->
                        <div flex="~ gap-8" w="md">
                            <div w="1/2">
                                <h4 m="t-0 b-2">الفئة الرئيسية</h4>
                                <HeadlessListbox v-model="selectedPerson">
                                    <div class="relative mt-1">
                                        <!-- Button -->
                                        <HeadlessListboxButton class="relative w-full cursor-pointer rounded-lg bg-s hover:bg-s-hover py-2 pr-3 pl-10 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-s" text="right pw sm:sm" border="0">
                                            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                                <icon name="ic:round-arrow-drop-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                            <span class="block truncate">{{ selectedPerson.name }}</span>
                                        </HeadlessListboxButton>
                                        <!-- List Options -->
                                        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <HeadlessListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s text-base shadow-lg ring-1 ring-s-stroke focus:outline-none sm:text-sm" p="2">
                                                <HeadlessListboxOption v-for="category in resourcesStore.getCategories" v-slot="{ active, selected }" :key="category.title" :value="category.id" as="template">
                                                    <li list="none" p="y-2 r-10 l-4" my="1" rounded="10px" cursor="pointer" :class="[
                                                        active ? 'relative cursor-default select-none' : 'relative cursor-default select-none',
                                                        selected ? 'bg-b bg-opacity-10' : 'hover:bg-s-hover '
                                                    ]">
                                                        <span :class="[
                                                            selected ? 'font-normal' : 'block truncate',
                                                        ]">{{ category.title }}</span>
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
                            <div w="1/2">
                                <h4 m="t-0 b-2">الفئة الثانوية</h4>
                                <HeadlessListbox v-model="selectedPerson">
                                    <div class="relative mt-1">
                                        <!-- Button -->
                                        <HeadlessListboxButton class="relative w-full cursor-pointer rounded-lg bg-s hover:bg-s-hover py-2 pr-3 pl-10 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-s" text="right pw sm:sm" border="0">
                                            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                                <icon name="ic:round-arrow-drop-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                            <span class="block truncate">{{ selectedPerson.name }}</span>
                                        </HeadlessListboxButton>
                                        <!-- List Options -->
                                        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <HeadlessListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s text-base shadow-lg ring-1 ring-s-stroke focus:outline-none sm:text-sm" p="2">
                                                <HeadlessListboxOption v-for="person in people" v-slot="{ active, selected }" :key="person.name" :value="person" as="template">
                                                    <li list="none" p="y-2 r-10 l-4" my="1" rounded="10px" cursor="pointer" :class="[
                                                        active ? 'relative cursor-default select-none' : 'relative cursor-default select-none',
                                                        selected ? 'bg-b bg-opacity-10' : 'hover:bg-s-hover '
                                                    ]">
                                                        <span :class="[
                                                            selected ? 'font-normal' : 'block truncate',
                                                        ]">{{ person.name }}</span>
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

                        <div>
                            <h4 m="t-0 b-2">الوصف</h4>
                            <textarea v-model="description" bg="s" border="~ s-stroke rounded-10px" max-w="md" min-w="md" min-h="100px" max-h="250px" />
                        </div>

                        <div flex="~ col gap-2" w-md>
                            <div flex justify-between items-center>
                                <h4 m="t-0 b-2" text-right w-full>الروابط</h4>
                                <icon @click="newLink()" cursor="pointer" text="hover:white" name="ic:round-add" w="8" h="8" />
                            </div>
                            <div v-for="(link, index) in links" :key="link" flex="~ gap-4" justify-between items-center mx="4px">
                                <div flex="~" items-center>
                                    <span w="6">{{ index + 1 }}</span>
                                    <UiInput v-model="link.name" placeholder="أسم الرابط" sm="~" />
                                </div>
                                <UiInput v-model="link.url" flex="grow" placeholder="عنوان الرابط" sm="~" />
                                <div>
                                    <icon @click="removeLink(index)" cursor="pointer" text="red-400 hover:red-500" name="ic:round-delete" w="24px" h="24px" />
                                </div>
                            </div>
                        </div>

                        <div flex="~ col gap-2" w-md>
                            <div flex justify-between items-center>
                                <h4 m="t-0 b-2" text-right w-full>الملفات</h4>
                                <icon @click="newFile()" cursor="pointer" text="hover:white" name="ic:round-add" w="8" h="8" />
                            </div>
                            <div v-for="(file, index) in files" :key="file" flex="~ gap-4" justify-between items-center mx="4px">
                                <span w="6">{{ index + 1 }}</span>
                                <span text="right" flex="grow">FILE NAME</span>
                                <icon @click="removeFile(index)" cursor="pointer" text="red-400 hover:red-500" name="ic:round-delete" w="24px" h="24px" />
                            </div>
                        </div>


                        <UiButton w="150px" mt="6">
                            إضافة
                        </UiButton>



                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
const opened = ref(false)

const resourcesStore = useResources()
const user = useSupabaseUser()

await resourcesStore.fetchCategories()



const description = ref('')

const links = ref([])

const newLink = () => {
    links.value.push({
        name: '',
        url: ''
    })
}

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

const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
]


const selectedPerson = ref(0)
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
