import { acceptHMRUpdate, defineStore } from "pinia";

export const useResources = defineStore("resourcesStore", {
  state: () => ({
    resources: [],
    categories: [],
    subCategories: [],
    links: [],
    isLoding: false,
    createError: null as string | null,

    filters: {
      state: false,
      ownered: false,

      favourites: false,
      search: "",
      category: null,
      subCategory: null,
    },

    current: {
      category: null,
      subCategory: null,
    },

    editResource: null,

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
    getLodeing: (state) => state.isLoding,
    getEditResource: (state) => state.editResource,
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
      if (state.filters.category) {
        if (state.filters.category?.name !== "الكل")
          resources = resources.filter(
            (resource) =>
              resource.categories?.name === state.filters.category?.name
          );
      }

      if (state.filters.subCategory) {
        if (
          state.filters.category?.name !== "الكل" &&
          state.filters.subCategory?.name !== "الكل"
        )
          resources = resources.filter(
            (resource) =>
              resource.sub_categories?.name === state.filters.subCategory?.name
          );
      }

      return resources;
    },
  },

  actions: {
    //get resources
    async fetch() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      const auth = useAuth();
      try {
        if (user.value) {
          if (auth.isAdmin) {
            let { data, error } = await supabase
              .from("resources")
              .select(
                "*,profiles(id,first_name,verified), favourites(*), categories(id,name,icon), sub_categories(id,name),links(id,title,url)"
              )
              .order("created_at", { ascending: false })
              .eq("favourites.user_id", user.value?.id);
            this.resources = data;
          } else {
            let { data, error } = await supabase
              .from("resources")
              .select(
                "*,profiles(id,first_name,verified), favourites(*), categories(id,name,icon), sub_categories(id,name),links(id,title,url)"
              )
              .order("created_at", { ascending: false })
              .eq("favourites.user_id", user.value?.id)
              .eq("verified", true);

            this.resources = data;
          }
        } else {
          let { data, error } = await supabase
            .from("resources")
            .select(
              "*, categories(id,name,icon), sub_categories(id,name),links(id,title,url)"
            )
            .order("created_at", { ascending: false })
            .eq("verified", true);
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
      const { data, error } = await supabase
        .from("categories")
        .select("*, sub_categories(id,name)");
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
      this.filters.ownered = false;
      this.filters.favourites = !this.filters.favourites;
    },

    toggleFilterOwnered() {
      this.filters.favourites = false;
      this.filters.ownered = !this.filters.ownered;
    },

    //validation
    validation(resource: Boolean = false) {
      if (String(this.title).length < 10 && resource) {
        this.createError = "العنوان يجب ان يكون اكثر من 10 احرف.";
      } else if (String(this.description).length < 50) {
        this.createError = "الوصف قصير جداً.";
      } else if (!this.current.category.id) {
        this.createError = "الرجاء اختيار الفئة الرئسية.";
      } else if (!this.current.subCategory.id) {
        this.createError = "الرجاء اختيار الفئة الفرعية.";
      } else {
        this.createError = null;
      }

      if (this.createError) return false;
      else return true;
    },

    // INSERT
    async addResource() {
      if (!this.validation(true)) return false;
      this.isLoding = true;
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      let data = null as any,
        error = null as any;

      if (this.editResource) {
        const { data: d, error: e } = await supabase
          .from("resources")
          .update({
            title: this.title,
            description: this.description,
            category_id: this.current.category.id,
            sub_category_id: this.current.subCategory.id,
          })
          .eq("id", this.editResource.id)
          .select("*");

        data = d;
        error = e;

        if (error) throw error;
        this.editResource = null;
        this.modals.add = false;
      } else {
        const { data: d, error: e } = await supabase
          .from("resources")
          .insert({
            user_id: user.value?.id,
            profile_id: user.value?.id,
            title: this.title,
            description: this.description,
            category_id: this.current.category.id,
            sub_category_id: this.current.subCategory.id,
          })
          .select("*");

        data = d;
        error = e;
      }
      if (this.links.length > 0 && data && !this.editResource) {
        this.links.forEach(async (link: any) => {
          await supabase
            .from("links")
            .insert({
              resource_id: data[0].id,
              title: link.title,
              url: link.url,
            })
            .select("*");
        });
        await this.fetch();
      }
      if (error) throw error;

      await this.fetch();
      this.title = "";
      this.description = "";
      this.current.category = this.getCategories?.[0];
      this.current.subCategory = null;

      this.isLoding = false;
    },

    async removeLink(link: any) {
      if (!confirm("هل أنت متأكد؟")) return false;

      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", link);

      if (error) throw error;

      await this.fetch();
    },

    async removeResource(resource: any) {
      if (!confirm("هل أنت متأكد؟")) return false;

      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("resources")
        .delete()
        .eq("id", resource.id);
      if (error) throw error;

      this.resources = this.resources.filter((r: any) => r.id !== resource.id);
      await this.fetch();
    },

    async addCategory() {
      const supabase = useSupabaseClient();
      let categoryName = prompt("أسم الفئة", "");
      let iconName = prompt("أسم الايقونة", "");

      if (
        categoryName !== null &&
        categoryName.trim() !== "" &&
        iconName !== null &&
        iconName.trim() !== ""
      ) {
        const { data, error } = await supabase
          .from("categories")
          .insert({
            name: categoryName,
            icon: iconName,
          })
          .select("*");
        if (error) throw error;
        await this.fetchCategories();
        alert("Create Succssfully");
      }
    },

    async removeCategory() {
      const category = this.categories.find(
        (c) => c.name === this.filters.category.name
      );
      const categoryId = category?.id;
      // REMOVE CATEGORY
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId);
      if (error) throw error;
      await this.fetchCategories();
      alert("Delete Succssfully");
    },

    async addSubCategory() {
      const supabase = useSupabaseClient();
      const category = this.categories.find(
        (c) => c.name === this.filters.category.name
      );
      const categoryId = category?.id;

      let categoryName = prompt("أسم الفئة الفرعية", "");

      if (categoryName !== null && categoryName.trim() !== "") {
        const { data, error } = await supabase
          .from("sub_categories")
          .insert({
            name: categoryName,
            category_id: categoryId,
          })
          .select("*");
        if (error) throw error;
        await this.fetchSubCategories();
        alert("Create Succssfully");
      }
    },

    async removeSubCategory() {
      const supabase = useSupabaseClient();
      const subCategory = this.subCategories.find(
        (c) => c.name === this.filters.subCategory.name
      );
      const subCategoryId = subCategory?.id;
      // REMOVE SUB CATEGORY
      const { data, error } = await supabase
        .from("sub_categories")
        .delete()
        .eq("id", subCategoryId);
      if (error) throw error;
      alert("Delete Succssfully");
      this.fetchSubCategories();
    },

    async toggleVerification(resource: any) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("resources")
        .update({ verified: !resource.verified })
        .eq("id", resource.id);
      await this.fetch();
      if (error) throw error;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useResources, import.meta.hot));
}
