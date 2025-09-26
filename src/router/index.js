import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import FavouritesView from "@/views/FavouritesView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: FavouritesView,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
