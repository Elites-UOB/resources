<template>
    <div relative flex="~" v-if="sm">
        <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" bg="p focus:s" p="x-2 sm:x-4" focus:outline-none text="pw focus:white sm" font-medium border="2 s-stroke focus:pw rounded-10px" h="25px" />
    </div>
    <div relative flex="~" v-else>
        <input :type="type" w="full" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" bg="p focus:s" pr="12" pl="4" focus:outline-none text="pw focus:white lg" font-medium border="2 s-stroke focus:pw rounded-15px" h="50px" />
        <icon v-if="icon" absolute :name="icon" w="24px" h="24px" top="16px" right="4" />
    </div>
</template>

<script setup>
defineProps(['icon', 'sm', 'placeholder', 'modelValue', 'type'])
</script>