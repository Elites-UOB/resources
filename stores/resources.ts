import { acceptHMRUpdate, defineStore } from "pinia";

export const useResources = defineStore("resourcesStore", {
  state: () => ({
    resources: [],
  }),
  getters: {
    getResources: (state) => state.resources,
  },

  actions: {
    //get resources
    async fetch() {
      const supabase = useSupabaseClient();
      try {
        const { data, error } = await supabase.from("resources").select();
        console.log("data", data);
        this.resources = data;
        if (error) throw error;
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useResources, import.meta.hot));
}
