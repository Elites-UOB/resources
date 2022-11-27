<template>
    <div flex="~ col sm:row" gap-4 sm:items-center justify-between>
        <!-- Right -->
        <div flex items-center gap-3>
            <icon name="fluent:channel-share-24-filled" w="8 sm:12" h="8 sm:12" text="b" />
            <span text="2xl lg:4xl" font-bold>مصادر</span>
        </div>

        <!-- Left -->
        <div flex="~" justify-center gap-2 sm:gap-8>
            <div flex gap-3>
                <UiButton @click="resourcesStore.filters.state = !resourcesStore.filters.state" square visible sm:hidden>
                    <icon name="ic:twotone-filter-alt" w="6 sm:8" h="6 sm:8" :text="resourcesStore.filters.state ? 'b' : 'pw'" />
                </UiButton>

                <NewResource />

                <UiButton @click="resourcesStore.toggleFilterFavourite" square>
                    <icon :text="resourcesStore.isFavourites ? 'red-500' : 'pw'" name="ph:heart-duotone" w="6 sm:8" h="6 sm:8" />
                </UiButton>

                <UiButton @click="resourcesStore.toggleFilterOwnered" square>
                    <icon name="material-symbols:library-books-rounded" w="6 sm:8" h="6 sm:8" />
                </UiButton>
            </div>

            <Register v-if="!user" />






            <HeadlessMenu v-if="user" as="div" class="relative inline-block text-right" z="20">
                <div>
                    <HeadlessMenuButton bg="transparent" border="0">
                        <UiButton v-if="user" px="sm:6" h="14 sm:auto" w="14 sm:auto">
                            <icon name="ph:user-duotone" w="6 sm:8" h="6 sm:8" />
                            <span hidden sm:block>{{ user.user_metadata.first_name }}</span>
                        </UiButton>
                    </HeadlessMenuButton>
                </div>

                <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                    <HeadlessMenuItems class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s text-base shadow-lg ring-1 ring-s-stroke focus:outline-none sm:text-sm" p="1">
                        <div class="px-1 py-1">
                            <HeadlessMenuItem v-slot="{ active }">
                                <button bg="s hover:s-hover" border="0" cursor="pointer" text="pw" :class="['group flex w-full items-center rounded-10px px-2 my-1 py-3 text-sm']">
                                    <icon name="material-symbols:edit" :active="active" class="ml-2 h-5 w-5" aria-hidden="true" />
                                    تعديل
                                </button>
                            </HeadlessMenuItem>
                            <HeadlessMenuItem @click="authStore.logout()" v-slot="{ active }">
                                <button bg="s hover:s-hover" border="0" cursor="pointer" text="pw" :class="['group flex w-full items-center rounded-10px px-2 my-1 py-3 text-sm']">
                                    <icon name="material-symbols:lock-person" :active="active" class="ml-2 h-5 w-5" aria-hidden="true" />
                                    تسجيل الخروج
                                </button>
                            </HeadlessMenuItem>
                        </div>
                    </HeadlessMenuItems>
                </transition>
            </HeadlessMenu>

        </div>
    </div>
</template>

<script setup>
const authStore = useAuth();
const resourcesStore = useResources();
const user = useSupabaseUser();
</script>