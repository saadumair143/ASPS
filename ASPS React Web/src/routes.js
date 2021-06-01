import Dashboard from "views/Dashboard/Dashboard.js";
import Login from "views/Login/Login.js";
import Courses from "views/Courses/Courses.js"
import Teachers from "views/Teachers/Teachers.js"
import Students from "views/Students/Students.js"

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/courses",
    name: "Courses",
    icon: "fa fa-book text-primary",
    component: Courses,
    layout: "/admin"
  },
  {
    path: "/teachers",
    name: "Teachers",
    icon: "fa fa-users text-primary",
    component: Teachers,
    layout: "/admin"
  },
  {
    path: "/students",
    name: "Students",
    icon: "fa fa-users text-primary",
    component: Students,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  }
];
export default routes;
