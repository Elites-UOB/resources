import { acceptHMRUpdate, defineStore } from "pinia";
import { AuthError } from "@supabase/supabase-js";

export const useAuth = defineStore("authStore", {
  state: () => ({
    name: null as string | null,
    email: null as string | null,
    password: null as string | null,
    createError: null as string | AuthError | null,

    admin: false,
  }),
  getters: {
    getCreateError: (state) => state.createError,
    isAdmin: (state) => state.admin,
  },

  actions: {
    validation(register: Boolean = false) {
      if (this.name?.length < 3 && register) {
        this.createError = "الاسم يجب ان يكون اكثر من 3 احرف.";
      } else if (!this.email?.includes("@")) {
        this.createError = "البريد الالكتروني غير صحيح.";
      } else if (this.password?.length < 6) {
        this.createError = "كلمة المرور يجب ان تكون اكثر من 6 احرف.";
      } else {
        this.createError = null;
      }

      if (this.createError) return false;
      else return true;
    },

    //Register
    async register() {
      if (!this.validation(true)) return false;

      const client = useSupabaseAuthClient();
      const { data, error } = await client.auth.signUp({
        email: String(this.email),
        password: String(this.password),
        options: {
          data: {
            first_name: this.name as string,
          },
        },
      });
      console.log(data, error);
      if (error) {
        this.createError = "هذا البريد الالكتروني مستخدم من قبل.";
        return false;
      }

      this.login();
    },

    //login
    async login() {
      if (!this.validation()) return false;

      const client = useSupabaseAuthClient();
      const { data, error } = await client.auth.signInWithPassword({
        email: String(this.email),
        password: String(this.password),
      });

      if (error) {
        this.createError = "البريد الالكتروني او كلمة المرور غير صحيحة.";
        return false;
      }

      const resourcesStore = useResources();
      resourcesStore.fetch();
    },

    //UPDATE USER DATA
    async updateUser(name: string) {
      const client = useSupabaseAuthClient();
      const { data, error } = await client.auth.updateUser({
        data: {
          first_name: name,
        },
      });
      if (error) throw error;
    },

    // LogOut
    async logout() {
      const client = useSupabaseAuthClient();
      try {
        const { error } = await client.auth.signOut();
        alert("You have been logged out");
      } catch (error) {
        console.log(error);
      }
    },

    async get_my_claim() {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.rpc("get_my_claims");

      if (data) this.admin = data?.userlevel == 100;
      return { data, error };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
