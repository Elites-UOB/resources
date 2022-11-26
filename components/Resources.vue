<template>
    <div w="full" flex="~ col gap-3">
        <Resource v-for="item in 10" :key="item" />
    </div>
</template>