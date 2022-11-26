<template>
    <button :class="{ 'w-14 h-14': square }" flex gap-2 transition="all duration-200" rounded="15px" text="lg pw hover:white" font-bold border="1 s-stroke" p="3" bg="s hover:s-hover" cursor="pointer">
        <slot />
    </button>
</template>

<script setup>
defineProps(['square'])
</script>