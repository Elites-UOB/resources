<template>
    <div flex="~ col gap-8" my-4 sm:my-12 mx-auto sm:px-6 lg:px-8 px-4 max-w-7xl overflow-y="auto" lg:overflow-y="unset" overflow-x="hidden" lg:overflow-x="unset">
        
        <div id="modals" order="2">
            <NewResource />
        </div>

        <Header order="1" />

        <div id="resources" flex="~ col sm:row" gap-16 min-h="[calc(100vh-25rem)]" order="3">
            <Filter />
            <Resources />
        </div>

        <Footer order="4" />
        <!-- <Suspense>
    
            <template #fallback>
                <div animate-pulse w="screen" h="screen" fixed flex flex-col gap-12 justify-center items-center>
                    <svg w="20px sm:200px" class="self-center" viewBox="0 0 156 189" xmlns="http://www.w3.org/2000/svg">
                        <path fill="pw dark:pwd" transition="all duration-200" class="group-hover:fill-white" d="M76.8455 31.8079L0 0V31.8079L0.000216272 31.8079V63.6157V95.4235V124.874V156.436V156.682L76.8457 189L155.063 156.682V124.874L76.8457 156.682L27.445 136.234V106.783L76.8457 127.231L155.063 95.4235V63.6157L76.8457 95.4235L27.445 74.9756V43.1679L76.8455 63.6157L155.063 31.8079V0L76.8455 31.8079Z" />
                    </svg>
                    <span text-2xl font-bold select-none>
                        جاري التحميل...
                    </span>
                </div>
            </template>
        </Suspense> -->
    </div>
</template>

<script setup>
const route = useRoute()

useHead({
    title: 'Resources - مصادر',
    bodyAttrs: {
        class: 'bg-p dark:bg-pd text-pw dark:text-pwd',
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
resourceStore.fetch();

const authStore = useAuth()
// authStore.get_my_claim()

watch(() => authStore.isAdmin, (val) => resourceStore.fetch())


</script>