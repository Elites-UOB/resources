<template>
    <div flex="~ col gap-8" my-4 sm:my-12 mx-auto sm:px-6 lg:px-8 px-4 max-w-7xl overflow-y="auto" lg:overflow-y="unset" overflow-x="hidden" lg:overflow-x="unset">
        <!-- my-4 sm:my-12 mx-auto sm:px-6 lg:px-8 px-4 max-w-7xl -->
        
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
const route = useRoute()

useHead({
    title: 'Resources - مصادر',
    bodyAttrs: {
        class: 'bg-p text-pw',
    },
    htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
    },
    meta: [
        { name: 'og:title', content: 'Resources - مصادر' },
        {
            name: 'og:description', content: "موقع مصادر يحتوي على العديد من المصادر المفيدة مثل المواقع البرمجية والدورات التعليمية والكتب."
        },
        { name: 'og:image', content: "/cover.jpg" },
        { name: 'og:url', content: route.fullPath },
        { name: 'twitter:title', content: 'Resources - مصادر' },
        {
            name: 'twitter:description', content: "موقع مصادر يحتوي على العديد من المصادر المفيدة مثل المواقع البرمجية والدورات التعليمية والكتب."
        },
        { name: 'twitter:image', content: "/cover.jpg" },
        { name: 'twitter:card', content: 'summary_large_image' },

    ]
})

const resourceStore = useResources();
await resourceStore.fetch();

const authStore = useAuth()
await authStore.get_my_claim()
</script>