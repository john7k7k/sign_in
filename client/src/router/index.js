import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Fishdatas from '../views/FishdataView.vue'
import Nav from  '../views/Nav.vue'
import UserData from '../views/UserData.vue'
import editdatas from '../views/Editdatas.vue'
import Accountlist from '../views/AccountList.vue'
import FishDatalist from '../views/FishDatalist.vue'
import SuSectionview from '../views/SignupSectionview.vue'
import SelectInstruction from '../views/SelectInstruction.vue'
const routes = [
  {
    name: "Nav",
    path: "/nav",
    component: Nav ,
    children:[
    
    {
      name: "UserData",
      path: "/user", 
      component: UserData
    },
    
    {
      name: "Accountlist",
      path: "/account/list", 
      component: Accountlist
    },
    {
      name: "FishDatalist",
      path: "/fish/list", 
      component: FishDatalist
    },
    {
      name: "SignupSection",
      path: "/sign/up/pool", 
      component: SuSectionview
    },
    
   ]
  },
  {
    name: "editdatas",
    path: "/:prefix/fish/edit", 
    component: editdatas
  },
  {
    name: "Fishdatas",
    path: "/:prefix/:prefix/fish/", 
    component: Fishdatas
  },
  {
    name: "selectinstruction",
    path: "/select/instruction", 
    component: SelectInstruction
  },
  {
      name: "home",
      path: "/home", 
      component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/sign/up',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/SignUp.vue')
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("../views/error404.vue"),
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next("/404");
  } else {
    next();
  }
  const token = localStorage.getItem('token'); 
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router

