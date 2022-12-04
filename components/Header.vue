<template>
    <div id="header" flex="~ col sm:row" gap-4 sm:items-center justify-between>
        <!-- Right -->
        <a href="/" decoration="none" flex items-center gap-3 bg="hover:s-hover" py-4 px-6 rounded-15px cursor="pointer" un-text="pw hover:white" transition="all duration-200">
            <icon name="fluent:channel-share-24-filled" w="8 sm:12" h="8 sm:12" text="b" />
            <span text="2xl lg:4xl" font-bold>مصادر</span>
        </a>

        <!-- Left -->
        <div flex="~" justify-between gap-2 sm:gap-8>
            <div flex gap-3>

                <UiButton alt="فلتر" @click="resourcesStore.filters.state = !resourcesStore.filters.state" square visible xl:hidden :text="resourcesStore.filters.state ? 'b' : 'pw hover:white'">
                    <icon name="ic:twotone-filter-alt" w="4 sm:8" h="4 sm:8" />
                </UiButton>

                <UiButton v-if="user" :text="[resourcesStore.modals.add ? 'b' : 'pw']" :alt="resourcesStore.getEditResource ? 'تعديل مصدر' : 'إضافة مصدر'" @click="() => { resourcesStore.modals.add = !resourcesStore.modals.add, resourcesStore.editResource = null }" square>
                    <icon :name="resourcesStore.getEditResource ? 'material-symbols:edit-rounded' : 'ic:round-add'" w="4 sm:8" h="4 sm:8" />
                </UiButton>

                <UiButton v-if="authStore.isAdmin" alt="غير موثقة" @click="resourcesStore.toggleFilterVerified" square :text="resourcesStore.isVerified ? 'yellow hover:yellow' : 'pw hover:white'">
                    <icon name="mdi:access-point-check" w="4 sm:8" h="4 sm:8" />
                </UiButton>

                <UiButton v-if="user" :alt="`مفضلاتي <br /> [ ${userFavouritesCount} ]`" @click="resourcesStore.toggleFilterFavourite" square :text="resourcesStore.isFavourites ? 'red-500 hover:red-400' : 'pw hover:white'">
                    <icon name="ph:heart-duotone" w="4 sm:8" h="4 sm:8" />
                </UiButton>
                
                <UiButton v-if="user" :alt="`مصادري <br /> [ ${userResourcesCount} ]`" @click="resourcesStore.toggleFilterOwnered" square :text="resourcesStore.isOwnered ? 'b hover:b' : 'pw hover:white'">
                    <icon block name="material-symbols:library-books-rounded" w="4 sm:8" h="4 sm:8" />
                </UiButton>


            </div>

            <Register v-if="!user" />






            <HeadlessMenu v-if="user" as="div" class="relative inline-block text-right" z="20">
                <div>
                    <HeadlessMenuButton bg="transparent" border="0">
                        <UiButton v-if="user" px="lg:6" h="14 sm:auto" w="14 sm:auto">
                            <icon name="ph:user-duotone" w="4 sm:8" h="4 sm:8" />
                            <span hidden sm:block>{{ user.user_metadata.first_name }}</span>
                        </UiButton>
                    </HeadlessMenuButton>
                </div>

                <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                    <HeadlessMenuItems left="0" min-w="200px" class="absolute mt-1 max-h-60 w-full overflow-auto rounded-15px bg-s text-base shadow-lg ring-1 ring-s-stroke focus:outline-none sm:text-sm" p="1">
                        <div class="px-1 py-1">
                            <HeadlessMenuItem v-slot="{ active }">
                                <button @click="update()" bg="s hover:s-hover" border="0" cursor="pointer" text="pw" :class="['group flex w-full items-center rounded-10px px-2 my-1 py-3 text-sm']">
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

function update() {
    const name = prompt("ادخل الاسم الجديد:", `${user.value.user_metadata.first_name}`);
    if (name == null || name == "") {
        const text = "User cancelled the prompt.";
    } else {
        authStore.updateUser(name);
    }
}

const userResourcesCount = computed(() => {
    return resourcesStore.getFilteredResources?.filter(resource => resource.user_id == user.value.id).length;
});
const userFavouritesCount = computed(() => {
    return resourcesStore.getFilteredResources?.filter(resource => resource.favourites?.length > 0).length;
});
</script>