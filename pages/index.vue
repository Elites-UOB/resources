<template>
    <div flex="~ col gap-8">
        <!-- HEADER -->
        <Header />
        
        <!-- CONTENT -->
        <div flex gap-16>
            <Filter />
            <Resources />
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Resources - مصادر',
    bodyAttrs: {
        class: 'bg-p text-pw my-12 mx-auto sm:px-6 lg:px-8 px-4 max-w-7xl',
        dir: 'rtl',
    },
})
</script>