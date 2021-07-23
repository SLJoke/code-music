import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Profile = () => import('views/profile/Profile')
const Recommend = () => import('views/recommend/Recommend')
const List = () => import('views/list/List')
const SongSheet = () => import('views/songsheet/SongSheet')
const Artist = () => import('views/artist/Artist')
const Search = () => import('views/search/Search')
const Detail = () => import('views/detail/Detail')

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
            },
            {
                path: '/search',
                component: Search
            },
            {
                path: '/playlist/detail',
                component: Detail
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
    mode: 'history'
})

export default router