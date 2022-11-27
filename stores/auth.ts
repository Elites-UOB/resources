import { acceptHMRUpdate, defineStore } from "pinia";
interface Data {
  name: string;
  email: string;
  password: string;
  createError: string;
}
export const useAuth = defineStore("authStore", {
  state: () => ({
    name: null as Data | null,
    email: null as Data | null,
    password: null as Data | null,
    createError: null as Data | null,
  }),
  getters: {
    getCreateError: (state) => state.createError,
  },

  actions: {
    //Register
    async register() {
      const supabase = useSupabaseClient();
      try {
        const { data, error } = await supabase.auth.signUp({
          email: String(this.email),
          password: String(this.password),
          options: {
            data: {
              first_name: this.name,
            },
          },
        });
        this.login();
        alert("Account created successfully");

        if (error) throw error;
      } catch (error) {
        console.log("error", error);
      }
    },

    //login
    async login() {
      const supabase = useSupabaseClient();
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: String(this.email),
          password: String(this.password),
        });
        console.log("data", data);
        alert("Login successfully");

        if (error) throw error;
      } catch (error) {
        console.log("error", error);
      }
    },

    //get user
    // async getUser() {
    //   const user: any = useSupabaseUser();
    //   if (user) {
    //     this.user = user;
    //   }
    // },

    // LogOut
    async logout() {
      const supabase = useSupabaseClient();
      try {
        const { error } = await supabase.auth.signOut();
        alert("You have been logged out");
      } catch (error) {
        console.log(error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
