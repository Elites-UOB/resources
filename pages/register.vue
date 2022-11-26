<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const router = useRouter()

const email = ref('')
const password = ref('')

// Register
const register = async () => {
    const { error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
    })

    if (error) {
        return alert(error)
    }

    router.push('/dashboard')
}
</script>

<template>
    <div>
        <input type="text" v-model="email" />
        <input type="password" v-model="password" />
        <button @click="register()">register</button>
    </div>
</template>
