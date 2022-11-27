<template>
    <div w="1/4" flex="~ col gap-3">
        <div flex items-center justify-center w="full">
            <UiInput v-model="resourcesStore.filters.search" w="full" placeholder="بحث" icon="ic:sharp-search" type="search" />
        </div>
        <!-- <UiInput  /> -->
        <Categories>
            <span text="xl" font-bold>الفئات</span>



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













        </Categories>
    </div>
</template>



<script setup>
const resourcesStore = useResources()

const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
]
const selectedPerson = ref(people[0])
</script>
