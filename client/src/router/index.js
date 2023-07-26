import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Fishdatas from '../views/FishdataView.vue'
import Nav from  '../views/Nav.vue'
import UserData from '../views/UserData.vue'
import editdatas from '../views/Editdatas.vue'
import Fishdatas3 from '../views/FishdataView3.vue'
const routes = [
  {
    name: "Nav",
    path: "/home",
    component: Nav ,
    children:[
    {
      name: "home",
      path: "/home", 
      component: HomeView
    },
    {
      name: "Fishdatas",
      path: "/Fishdatas-Section1", 
      component: Fishdatas
    },
    {
      name: "Fishdatas3",
      path: "/Fishdatas-Section2", 
      component: Fishdatas3
    },
    {
      name: "UserData",
      path: "/UserData", 
      component: UserData
    },
    {
      name: "editdatas",
      path: "/EditDatas", 
      component: editdatas
    },
   ]
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/SignUp',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/SignUp.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
