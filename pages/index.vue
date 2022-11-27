<template>
    <div flex="~ col gap-8" overflow-y="auto" lg:overflow-y="unset" overflow-x="hidden" lg:overflow-x="unset" >
        
        <div id="modals" order="2">
            <NewResource />
        </div>

        <!-- HEADER -->
        <Header order="1" />
 
        <!-- CONTENT -->
        <div flex="~ col sm:row" gap-16 min-h="[calc(100vh-25rem)]" order="3">
            <Filter />
            <Resources />
        </div>

        <Footer order="4" />
    </div>
</template>

<script setup>
useHead({
    title: 'Resources - مصادر',
    bodyAttrs: {
        class: 'bg-p text-pw my-4 sm:my-12 mx-auto sm:px-6 lg:px-8 px-4 max-w-7xl',
        dir: 'rtl',
    },
})

const resourceStore = useResources();
await resourceStore.fetch();
</script>