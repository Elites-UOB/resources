import { acceptHMRUpdate, defineStore } from "pinia";

export const useResources = defineStore("resourcesStore", {
  state: () => ({
    resources: [],
    categories: [],
    subCategories: [],

    filters: {
      state: false,

      favourites: false,
      search: "",
      category: null,
      subCategory: null,
    }
  }),
  getters: {
    getResources: (state) => state.resources,
    getFilters: (state) => state.filters,
    getCategories: (state) => state.categories,
    getSubCategories: (state) => state.subCategories,
    isFavourites: (state) => state.filters.favourites,
    getFilteredResources: (state) => {
      let resources = state.resources;

      if (state.filters.favourites) {
        resources = resources.filter((resource) => resource.favourites?.length > 0);
      }

      if (state.filters.search) {
        resources = resources.filter((resource) => resource.title.toLowerCase().includes(state.filters.search.toLowerCase()));
      }

      // if (state.filters.category) {
      //   resources = resources.filter((resource) => resource.category === state.filters.category);
      // }

      // if (state.filters.subCategory) {
      //   resources = resources.filter((resource) => resource.subCategory === state.filters.subCategory);
      // }

      return resources;
    }
  },

  actions: {
    //get resources
    async fetch() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      try {
        if (user.value) {
          let { data, error } = await supabase.from("resources").select("*, favourites(*), categories(id,name), sub_categories(id,name)").eq('favourites.user_id', user.value?.id);
          if (error) throw error;
          this.resources = data;
        } else {
          let { data, error } = await supabase.from("resources").select("*, categories(id,name), sub_categories(id,name)");
          if (error) throw error;
          this.resources = data;
        }
        await this.fetchCategories();
        await this.fetchSubCategories();
      } catch (error) {
        console.log("error", error);
      }
    },

    async fetchCategories() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.from("categories").select();
      this.categories = data;
    },

    async fetchSubCategories() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.from("sub_categories").select();
      this.subCategories = data;
    },


    // Toggle Favourite
    async toggleFavourite(resource: any) {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();

      // Check if already favourited
      const favourite = resource.favourites.find((favourite: any) => favourite.user_id === user.value?.id);

      // If already favourited, delete favourite
      if (favourite) {
        resource.favourites = resource.favourites.filter((favourite: any) => favourite.id !== favourite.id)
        const { data, error } = await supabase.from("favourites").delete().eq("id", favourite.id).eq("user_id", user.value?.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("favourites").insert({
          resource_id: resource.id,
          user_id: user.value?.id,
        }).select("*");
        if (error) throw error;
        resource.favourites.push(data[0]);
      }
    },


    // FILTERS
    toggleFilterFavourite(){
      this.filters.favourites = !this.filters.favourites
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useResources, import.meta.hot));
}
