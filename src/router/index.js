import About from "./../Pages/About/About";
import Posts from "./../Pages/Posts/Posts";
import PostIdPage from "./../Pages/PostIdPage/PostIdPage";
import { Error } from "./../Pages/Error/Error";
import Login from './../Pages/Login/Login';

export const privateRoutes = [
  { path: "/about", component: About, exact: true },
  { path: "/posts", component: Posts, exact: true },
  { path: "/posts/:id", component: PostIdPage, exact: true },
];

export const publicRoutes = [
  { path: "/login", component: Login, exact: true },
  { path: "/error", component: Error, exact: true },
]