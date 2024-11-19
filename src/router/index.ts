import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DataStructureView from '../views/DataStructureView.vue'
import ChallengesView from '../views/ChallengesView.vue'
import SortingAlgorithmsView from '../views/SortingAlgorithmsView.vue'
import SortingDetail from '../views/SortingDetail.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/data-structure/:type',
      component: DataStructureView,
      props: true
    },
    {
      path: '/challenges/:type',
      component: ChallengesView,
      props: true
    },
    {
      path: '/sorting-algorithms',
      component: SortingAlgorithmsView
    },
    {
      path: '/sorting-detail/:algorithm', 
      name: 'SortingDetail',
      component: SortingDetail,
    },
  ]
})

export default router