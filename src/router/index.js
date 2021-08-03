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
const Fav =() => import('views/fav/Fav')

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {
            isShow: true
        },
        children: [
            {
                path: '',
                redirect: 'recommend'
            },
            {
                path: 'recommend',
                component: Recommend,
                meta: {
                    isShow: true
                }
            },
            {
                path: 'list',
                component: List,
                meta: {
                    isShow: true
                }
            },
            {
                path: 'songsheet',
                component: SongSheet,
                meta: {
                    isShow: true
                }
            },
            {
                path: 'artist',
                component: Artist,
                meta: {
                    isShow: true
                }
            },
            {
                path: '/search',
                component: Search,
                meta: {
                    isShow: false
                }
            },
            {
                path: '/fav',
                component: Fav,
                meta: {
                    isShow: false
                }
            },
            {
                path: '/playlist/detail',
                component: Detail,
                meta: {
                    isShow: false
                }
            }
        ]
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            isShow: true
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router