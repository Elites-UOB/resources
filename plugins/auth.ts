export default defineNuxtPlugin(nuxtApp => {
    const client = useSupabaseAuthClient()
    // client.auth.onAuthStateChange((event, session) => {
    //     if (session && event === 'SIGNED_IN') {

    //     } else {

    //     }
    // })
})
  