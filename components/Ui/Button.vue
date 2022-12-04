<template>
    <button class="group" relative="~" :class="{ 'w-14 h-14': square }" flex justify-center items-center gap-2 transition="all duration-200" rounded="15px" text="lg center pw hover:white" font-bold border="1 s-stroke" p="3" bg="s hover:s-hover" cursor="pointer">
        <slot />

        <div v-if="alt" v-html="alt" group-hover:flex hidden absolute z="30" px-3 py-2 bottom="-45px" w="full" h="20px" items-center justify-center text="10px" bg="dark" rounded-10px transition="all duration-200">
            
        </div>
    </button>
</template>

<script setup>
defineProps(['square', 'alt'])
</script>