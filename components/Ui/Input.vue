<template>
    <div relative flex="~">
        <input w="full" placeholder="بحث" bg="p" pr="12" pl="4" focus:outline-none text="pw lg" font-medium border="2 s-stroke focus:pw rounded-15px" h="50px" />
        <icon v-if="icon" absolute :name="icon" w="24px" h="24px" top="16px" right="4" />
    </div>
</template>

<script setup>
defineProps(['icon'])
</script>