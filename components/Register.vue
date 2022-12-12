<template>
    <div>
        <UiButton @click="opened = !opened" px="4">
            <icon name="icon-park-twotone:unlock" w="8" h="8" />
            تسجيل
        </UiButton>


        <Teleport to="body">
            <Transition>
                <div v-if="opened" @click="opened = false" flex="~" items-center justify-center class="fixed inset-0 bg-p dark:bg-pd bg-opacity-80" backdrop-blur="sm" z="100">
                    <div @click.stop="() => { }" overflow-y="auto" flex="~ col gap-8" items-center p="4" bg="p dark:pd" w="xs sm:md" h="lg" border="2 s-stroke dark:sdd-stroke rounded-15px">
                        <span m="b-4 t-8" text-black dark:text-white font-bold text="3xl sm:4xl">
                            <span v-if="isLogin">تسجيل الدخول</span>
                            <span v-if="!isLogin">تسجيل</span>
                        </span>

                        <h4 v-if="authStore.getCreateError" text-red-500 my-0 flex gap-2>
                            <icon name="ic:twotone-error" w="6" h="6" />
                            {{ authStore.getCreateError }}
                        </h4>

                        <div flex="~ col gap-4" w="250px sm:xs" relative>
                            <UiInput v-if="!isLogin" v-model="authStore.name" icon="ph:user-duotone" placeholder="الأسم الثنائي" />
                            <UiInput v-model="authStore.email" icon="ic:twotone-email" placeholder="البريد الالكتروني" type="email" />
                            <UiInput v-if="showPassword"  v-model="authStore.password" icon="fluent:password-16-filled" placeholder="كلمة المرور" type="text"/>
                            <UiInput v-if="!showPassword" v-model="authStore.password" icon="fluent:password-16-filled" placeholder="كلمة المرور" type="password"/>
                            <Icon v-if="showPassword" @click=" () => togglePassword()" name="ic:twotone-remove-red-eye" class="eye-icon" :top="isLogin ? '14.5' : '33' " />
                            <Icon v-if="!showPassword" @click=" () => togglePassword()" name="clarity:eye-hide-line" class="eye-icon" :top="isLogin ? '14.5' : '35' " />
                        </div>

                        <UiButton @click="isLogin ? authStore.login() : authStore.register()" w="150px" mt="0 sm:6">
                            <span v-if="isLogin">تسجيل الدخول</span>
                            <span v-if="!isLogin">تسجيل</span>
                        </UiButton>

                        <div @click="() => { isLogin = !isLogin, authStore.createError = null }" text="hover:black dark:hover:white" cursor="pointer" mt="0 sm:4">
                            <span v-if="isLogin">ليس لديك حساب؟</span>
                            <span v-if="!isLogin">هل تملك حساب</span>
                        </div>

                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
const authStore = useAuth();
const resourcesStore = useResources();
const opened = ref(false)

const isLogin = ref(true)

const user = useSupabaseUser();

const showPassword = ref(false)

function togglePassword() {
    showPassword.value = !showPassword.value
}

function Login(e) {
    isLogin ? authStore.login() : authStore.register()
}

onKeyStroke('Enter', Login)

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

.eye-icon {
    position: absolute;
    right: 88%;
    transform: translateY(165%);
    cursor: pointer;
    width: 20px;
    height: 20px;
}
</style>
