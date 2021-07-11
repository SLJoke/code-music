import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Home = () => import('pages/home/Home')
const Profile = () => import('pages/profile/Profile')
const Recommend = () => import('pages/home/recommend/Recommend')
const List = () => import('pages/home/list/List')
const SongSheet = () => import('pages/home/songsheet/SongSheet')
const Artist = () => import('pages/home/artist/Artist')

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '',
                redirect: 'recommend'
            },
            {
                path: 'recommend',
                component: Recommend
            },
            {
                path: 'list',
                component: List
            },
            {
                path: 'songsheet',
                component: SongSheet
            },
            {
                path: 'artist',
                component: Artist
            }
        ]
    },
    {
        path: '/profile',
        component: Profile
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash'
})

export default router