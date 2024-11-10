import ProtectedRoute from "./hoc/protectedRoute";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Home from "./pages/Home";
import GetBanners from "./Layout/General/GetBanners";
import BannerById from "./Layout/General/BannerById";
import AllUser from "./Layout/Admin/AllUser";
import LoggedUser from "./Layout/User/Users/LoggedUser";
import Promo from "./Layout/General/Promo";
import PromoById from "./Layout/General/PromoById";
import ModalUserUpdate from "./components/Users/ModalUserUpdate";
import BannerUser from "./Layout/Admin/BannerUser";
import Category from "./Layout/General/Category";
import CategoryById from "./Layout/General/CategoryById";
import Activity from "./Layout/General/Activity";
import ActivityId from "./Layout/General/ActivityId";
import Sidebar from "./Layout/Admin/Sidebar";
import PromoAdmin from "./Layout/Admin/PromoAdmin";
import CategoryAdmin from "./Layout/Admin/CategoryAdmin";
import ActivitiesAdmin from "./Layout/Admin/ActivitiesAdmin";
import PaymentMethod from "./Layout/User/PaymentMethod";
import ListPromo from "./Layout/General/ListPromo";
import ListCategory from "./Layout/General/ListCategory";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/banners",
    element: <GetBanners />,
  },
  {
    path: "/banner/:id",
    element: <BannerById />,
  },
  {
    path: "/alluser",
    element: (
      <Sidebar>
        <AllUser />
      </Sidebar>
    ),
  },
  {
    path: "/logged-user",
    element: <LoggedUser />,
  },
  {
    path: "/promo",
    element: <Promo />,
  },
  {
    path: "/promo/:id",
    element: <PromoById />,
  },
  // {
  //   path : "/update-user",
  //   element : <ModalUserUpdate />
  // }
  {
    path: "/banner-user",
    element: (
      <Sidebar>
        <BannerUser />
      </Sidebar>
    ),
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/category/:id",
    element: <CategoryById />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
  {
    path: "/activity/:id",
    element: <ActivityId />,
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
  },
  {
    path: "/promo-admin",
    element: (
      <Sidebar>
        <PromoAdmin />
      </Sidebar>
    ),
  },
  {
    path: "/category-admin",
    element: (
      <Sidebar>
        <CategoryAdmin />
      </Sidebar>
    ),
  },
  {
    path: "/activities-admin",
    element: (
      <Sidebar>
        <ActivitiesAdmin />
      </Sidebar>
    ),
  },
  {
    path: "/payment-method",
    element: <PaymentMethod />,
  },
  {
    path: "/list-promo",
    element: <ListPromo />,
  },
  {
    path: "/list-category",
    element: <ListCategory />,
  }
];
