<template>
    <div w-full>
        <div class="animate-pulse flex gap-1 py-4 px-4 items-center justify-between" w="full" border="~ rounded-15px s-stroke dark:sdd-stroke 3px rounded-15px">
            <div class="rounded-md bg-gray-400 dark:bg-sdd-hover" w="20px md:30px" h="20px md:30px"/>
            <div class="flex-1 space-y-3 px-4">
                <div flex gap="3" w="40%">
                     <div class="h-2 bg-gray-400 dark:bg-sdd-hover rounded col-span-1 w-50"/>
                     <div class="h-2 bg-gray-400 dark:bg-sdd-hover rounded col-span-1 w-30 "/>
                 </div>
                <div class="h-2 bg-gray-400 dark:bg-sdd-hover rounded" w="60 sm:full"/>
            </div>
            <div class="rounded-full bg-gray-400 dark:bg-sdd-hover" w="20px md:30px" h="20px md:30px"/>
        </div>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}
</style>