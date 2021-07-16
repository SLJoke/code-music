import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Profile = () => import('views/profile/Profile')
const Recommend = () => import('views/recommend/Recommend')
const List = () => import('views/list/List')
const SongSheet = () => import('views/songsheet/SongSheet')
const Artist = () => import('views/artist/Artist')
const MusicPlayer = () => import('components/content/player/Player')

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
    },
    {
        path: '/musicplayer',
        component: MusicPlayer
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router