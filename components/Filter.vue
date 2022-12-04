<template>
    <div :class="[resourcesStore.filters.state ? 'flex' : 'hidden']" w="lg:1/4" xl:flex flex="col gap-3">
        <div flex items-center justify-center w="full">
            <UiInput v-model="resourcesStore.filters.search" w="full" placeholder="بحث" icon="ic:sharp-search" type="search" />
        </div>
        <!-- <UiInput  /> -->
        <Categories>
            <span text="xl" font-bold>الفئات</span>



            <div flex justify-between items-center gap-1 v-if="categories?.length > 0">
                <HeadlessListbox v-model="resourcesStore.filters.category" min-w="200px" grow z="40">
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


                <HeadlessMenu v-if="authStore.isAdmin" as="div" class="relative inline-block text-right" z="50">
                    <div>
                        <HeadlessMenuButton bg="transparent" border="0">
                            <icon cursor="pointer" text="pw" name="fe:elipsis-v" w="8" h="8" />
                        </HeadlessMenuButton>
                    </div>

                    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                        <HeadlessMenuItems class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s text-base shadow-lg ring-1 ring-s-stroke focus:outline-none sm:text-sm" min-w="150px" left="0" p="1">
                            <div class="px-1 py-1">
                                <HeadlessMenuItem v-slot="{ active }">
                                    <button @click="resourcesStore.addCategory()" bg="s hover:s-hover" border="0" cursor="pointer" text="pw" :class="['group flex w-full items-center rounded-10px px-2 my-1 py-3 text-sm']">
                                        <icon name="ic:round-add" :active="active" class="ml-2 h-5 w-5" aria-hidden="true" />
                                        إضافة
                                    </button>
                                </HeadlessMenuItem>
                                <HeadlessMenuItem v-if="resourcesStore.getFilters.category?.name !== 'الكل'" @click="() => {}" v-slot="{ active }">
                                    <button @click="resourcesStore.removeCategory()" bg="s hover:s-hover" border="0" cursor="pointer" text="pw" :class="['group flex w-full items-center rounded-10px px-2 my-1 py-3 text-sm']">
                                        <icon name="ic:round-delete" :active="active" class="ml-2 h-5 w-5" aria-hidden="true" />
                                        حذف 
                                    </button>
                                </HeadlessMenuItem>
                            </div>
                        </HeadlessMenuItems>
                    </transition>
                </HeadlessMenu>

            </div>


            <!-- SUB CATEGORIES -->
            <div flex justify-between items-center gap-1 v-if="(subCategories?.length > 0 || authStore.isAdmin)">
                <HeadlessListbox v-model="resourcesStore.filters.subCategory" grow v-if="subCategories?.length > 0" z="20">
                    <div class="relative mt-1">
                        <!-- Button -->
                        <HeadlessListboxButton class="relative w-full cursor-pointer rounded-lg bg-s hover:bg-s-hover py-2 pr-3 pl-10 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-s" text="right pw sm:sm" border="0">
                            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <icon name="ic:round-arrow-drop-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                            <span class="block truncate">{{ resourcesStore.filters.subCategory?.name }}</span>
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

                <div v-else text="sm">
                    لايوجد فئات ثانوية
                </div>


                <HeadlessMenu v-if="authStore.isAdmin" as="div" class="relative inline-block text-right" z="30">
                    <div>
                        <HeadlessMenuButton bg="transparent" border="0">
                            <icon cursor="pointer" text="pw" name="fe:elipsis-v" w="8" h="8" />
                        </HeadlessMenuButton>
                    </div>

                    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                        <HeadlessMenuItems class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s text-base shadow-lg ring-1 ring-s-stroke focus:outline-none sm:text-sm" min-w="150px" left="0" p="1">
                            <div class="px-1 py-1">
                                <HeadlessMenuItem v-slot="{ active }">
                                    <button @click="resourcesStore.addSubCategory()" bg="s hover:s-hover" border="0" cursor="pointer" text="pw" :class="['group flex w-full items-center rounded-10px px-2 my-1 py-3 text-sm']">
                                        <icon name="ic:round-add" :active="active" class="ml-2 h-5 w-5" aria-hidden="true" />
                                        إضافة
                                    </button>
                                </HeadlessMenuItem>
                                <HeadlessMenuItem v-if="(resourcesStore.getFilters.subCategory?.name !== 'الكل' && subCategories?.length > 0)" @click="() => {}" v-slot="{ active }">
                                    <button @click="resourcesStore.removeSubCategory()" bg="s hover:s-hover" border="0" cursor="pointer" text="pw" :class="['group flex w-full items-center rounded-10px px-2 my-1 py-3 text-sm']">
                                        <icon name="ic:round-delete" :active="active" class="ml-2 h-5 w-5" aria-hidden="true" />
                                        حذف 
                                    </button>
                                </HeadlessMenuItem>
                            </div>
                        </HeadlessMenuItems>
                    </transition>
                </HeadlessMenu>

            </div>
        </Categories>

        <Categories>
            <span text="xl" font-bold>الأكثر نشراً</span>
            <div v-for="(publisher, rank) in resourcesStore.getMostPublishers" :key="publisher.name" flex justify-between items-center>
                <div flex gap-2 items-center>
                    <icon v-if="(rank==0)" name="fluent-emoji-flat:1st-place-medal" w="8" h="8"></icon>
                    <icon v-else-if="(rank==1)" name="fluent-emoji-flat:2nd-place-medal" w="8" h="8"></icon>
                    <icon v-else-if="(rank==2)" name="fluent-emoji-flat:3rd-place-medal" w="8" h="8"></icon>
                    <icon v-else name="fluent-emoji-flat:reminder-ribbon" saturate-0 brightness-50 w="8" h="8"></icon>
                    <span text="base pw">{{publisher.name}}</span>
                </div>
                <span text="base pw">{{publisher.count}}</span>

            </div>
        </Categories>
    </div>
</template>



<script setup>
const authStore = useAuth()
const resourcesStore = useResources()
const categories = computed(() => [{ name: 'الكل' }, ...resourcesStore.categories])
resourcesStore.filters.category = categories.value[0]
const subCategories = ref([])
watchEffect(() => {
    subCategories.value = [{ name: 'الكل' }, ...resourcesStore.subCategories.filter((subCategory) => subCategory.category_id === resourcesStore.filters.category.id)]
    resourcesStore.filters.subCategory = subCategories.value[0]
})
</script>
