<template>
    <div flex items-center justify-between>
        <!-- Right -->
        <div flex items-center gap-3>
            <icon name="fluent:channel-share-24-filled" w="12" h="12" text="b" />
            <h1>مصادر</h1>
        </div>

        <!-- Left -->
        <div flex gap-8>
            <div flex gap-3>
                <UiButton square>
                    <icon name="ic:round-add" w="8" h="8" />
                </UiButton>

                <UiButton square>
                    <icon name="ph:heart-duotone" w="8" h="8" />
                </UiButton>
    
                <UiButton square>
                    <icon name="material-symbols:library-books-rounded" w="8" h="8" />
                </UiButton>
            </div>

            <UiButton>
                <icon name="ph:user-duotone" w="8" h="8" />
                <span>زين العابدين</span>
            </UiButton>
        </div>
    </div>
</template>