<template>
    <div relative flex="~" v-if="sm" >
        <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" bg="p dark:pd focus:s dark:focus:sdd" p="x-2 sm:x-4" focus:outline-none text="pw dark:pw focus:black dark:focus:white sm" font-medium border="2 s-stroke dark:sdd-stroke focus:pw dark:focus:pwd rounded-10px" />
    </div>
    <div relative flex="~" v-else>
        <input :type="type" w="full" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" bg="p dark:pd focus:s dark:focus:sdd" pr="12" pl="4" focus:outline-none text="pw dark:pw focus:black dark:focus:white lg" font-medium border="2 s-stroke dark:sdd-stroke focus:pw dark:focus:pwd rounded-15px" h="50px" />
        <icon v-if="icon" absolute :name="icon" w="24px" h="24px" top="16px" right="4" />
    </div>
</template>

<script setup>
defineProps(['icon', 'sm', 'placeholder', 'modelValue', 'type'])
</script>
<style>
::-ms-reveal {
  filter: invert(100%);
}
</style>