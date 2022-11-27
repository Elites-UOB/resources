import { acceptHMRUpdate, defineStore } from "pinia";

export const useResources = defineStore("resourcesStore", {
  state: () => ({
    resources: [],
    categories: [],
    subCategories: [],
    createError: null as string | null,

    filters: {
      state: false,
      ownered: false,

      favourites: false,
      search: "",
      category: null,
      subCategory: null,
    },

    modals: {
      add: false,
    },

    //Resource Form
    title: null as string | null,
    description: null as string | null,
  }),
  getters: {
    getResources: (state) => state.resources,
    getFilters: (state) => state.filters,
    getCategories: (state) => state.categories,
    getSubCategories: (state) => state.subCategories,
    isFavourites: (state) => state.filters.favourites,
    isOwnered: (state) => state.filters.ownered,
    getCreateError: (state) => state.createError,
    getFilteredResources: (state) => {
      let resources = state.resources;

      if (state.filters.favourites) {
        resources = resources.filter(
          (resource) => resource.favourites?.length > 0
        );
      }

      if (state.filters.search) {
        resources = resources.filter((resource) =>
          resource.title
            .toLowerCase()
            .includes(state.filters.search.toLowerCase())
        );
      }
      if (state.filters.ownered) {
        const user = useSupabaseUser();
        resources = resources.filter(
          (resource) => resource.user_id === user.value?.id
        );
      }
      // if (state.filters.category) {
      //   resources = resources.filter((resource) => resource.category === state.filters.category);
      // }

      // if (state.filters.subCategory) {
      //   resources = resources.filter((resource) => resource.subCategory === state.filters.subCategory);
      // }

      return resources;
    },
  },

  actions: {
    //get resources
    async fetch() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      try {
        if (user.value) {
          let { data, error } = await supabase
            .from("resources")
            .select(
              "*, favourites(*), categories(id,name), sub_categories(id,name)"
            )
            .eq("favourites.user_id", user.value?.id);
          if (error) throw error;
          this.resources = data;
        } else {
          let { data, error } = await supabase
            .from("resources")
            .select("*, categories(id,name), sub_categories(id,name)");
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
      const favourite = resource.favourites.find(
        (favourite: any) => favourite.user_id === user.value?.id
      );

      // If already favourited, delete favourite
      if (favourite) {
        resource.favourites = resource.favourites.filter(
          (favourite: any) => favourite.id !== favourite.id
        );
        const { data, error } = await supabase
          .from("favourites")
          .delete()
          .eq("id", favourite.id)
          .eq("user_id", user.value?.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("favourites")
          .insert({
            resource_id: resource.id,
            user_id: user.value?.id,
          })
          .select("*");
        if (error) throw error;
        resource.favourites.push(data[0]);
      }
    },

    // FILTERS
    toggleFilterFavourite() {
      this.filters.favourites = !this.filters.favourites;
    },

    toggleFilterOwnered() {
      this.filters.ownered = !this.filters.ownered;
    },

    //validation
    // validation(resource: Boolean = false) {
    //   if (this.resourceData.title?.length < 3 && resource) {
    //     this.createError = "العنوان يجب ان يكون اكثر من 3 احرف.";
    //   } else if (this.resourceData.description?.length < 50) {
    //     this.createError = "الوصف قصير جداً.";
    //   } else if (!this.resourceData.category_id) {
    //     this.createError = "يرجى اختيار الفئة .";
    //   } else {
    //     this.createError = null;
    //   }

    //   if (this.createError) return false;
    //   else return true;
    // },

    // INSERT
    async insertResource() {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient();
      try {
        const { data, error } = await supabase
          .from("resources")
          .insert({
            user_id: user.value?.id,
            title: this.title ?? "العنوان",
            description: this.description,
            category_id: this.filters.category.id,
            sub_category_id: this.filters.subCategory.id,
          })
          .select("*");
        this.fetch();
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useResources, import.meta.hot));
}
