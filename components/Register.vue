<template>
    <div>
        <UiButton @click="opened = !opened" px="4">
            <icon name="icon-park-twotone:unlock" w="8" h="8" />
            تسجيل
        </UiButton>
        

        <Teleport to="body">
            <Transition>
                <div v-if="opened" @click="opened = false" flex="~" items-center justify-center class="fixed inset-0 bg-p bg-opacity-80" backdrop-blur="sm" z="20">
                    <div @click.stop="() => { }" overflow-y="auto" flex="~ col gap-8" items-center p="4" bg="p" w="md" h="md" border="2 s-stroke rounded-15px">
                        <h1 m="b-4 t-8" text-white>
                            <span v-if="isLogin">تسجيل الدخول</span>
                            <span v-if="!isLogin">تسجيل</span>
                        </h1>

                        <div flex="~ col gap-4" w="xs">
                            <UiInput v-model="email" icon="ph:user-duotone" placeholder="البريد الالكتروني" />
                            <UiInput v-model="password" icon="fluent:password-16-filled" placeholder="كلمة المرور" />
                        </div>



                        <UiButton w="150px" mt="6">
                            <span v-if="isLogin">تسجيل الدخول</span>
                            <span v-if="!isLogin">تسجيل</span>
                        </UiButton>

                        <div @click="isLogin = !isLogin" text="hover:white" cursor="pointer">
                            <span v-if="isLogin">ليس لديك حساب؟</span>
                            <span v-if="!isLogin">تسجيل الدخول</span>
                        </div>


                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
const opened = ref(false)

const isLogin = ref(true)

const email = ref('')
const password = ref('')

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
