import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Home = () => import('pages/home/Home')
const Profile = () => import('pages/profile/Profile')
const Recommend = () => import('pages/recommend/Recommend')
const List = () => import('pages/list/List')
const SongSheet = () => import('pages/songsheet/SongSheet')
const Artist = () => import('pages/artist/Artist')

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