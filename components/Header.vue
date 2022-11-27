<template>
    <div flex items-center justify-between>
        <!-- Right -->
        <div flex items-center gap-3>
            <icon name="fluent:channel-share-24-filled" w="12" h="12" text="b" />
            <h1>مصادر</h1>
        </div>

        <!-- Left -->
        <div flex gap-8>
            <div flex gap-3>
                <NewResource />

                <UiButton square>
                    <icon name="ph:heart-duotone" w="8" h="8" />
                </UiButton>

                <UiButton square>
                    <icon name="material-symbols:library-books-rounded" w="8" h="8" />
                </UiButton>
            </div>

            <Register />

            <UiButton px="6">
                <icon name="ph:user-duotone" w="8" h="8" />
                <span>زين العابدين</span>
            </UiButton>
        </div>
    </div>
</template>

<script setup>
const authStore = useAuth();

</script>