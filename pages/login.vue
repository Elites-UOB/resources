<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const router = useRouter()

const email = ref('')
const password = ref('')

// Login method using providers
const login = async () => {
    const { error } = await client.auth.signInWithPassword({
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
        <button @click="login()">Login</button>
    </div>
</template>
