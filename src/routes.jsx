import { ProtectedRouteUser, ProtectedRouteAdmin } from "./hoc/ProtectedRoute";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Home from "./pages/Home";
import GetBanners from "./Layout/General/GetBanners";
import BannerById from "./Layout/General/BannerById";
import AllUser from "./Layout/Admin/AllUser";
import LoggedUser from "./Layout/User/Users/LoggedUser";
import Promo from "./Layout/General/Promo";
import PromoById from "./Layout/User/Users/PromoById";
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
import DetailBannerAdmin from "./Layout/Admin/DetailBannerAdmin";
import DetailPromoAdmin from "./Layout/Admin/DetailPromoAdmin";
import DetailCategoryAdmin from "./Layout/Admin/DetailCategoryAdmin";
import DetailActivityAdmin from "./Layout/Admin/DetailActivityAdmin";
import CartPage from "./Layout/User/Users/CartPage";
import ErrorPage from "./pages/ErrorPage";
import ListTransactions from "./Layout/User/Users/ListTransactions";
import TransactionTable from "./Layout/User/Users/TransactionTable";
import DetailTransactionAdmin from "./Layout/Admin/DetailTransactionAdmin";
import MyTransactions from "./Layout/User/Users/MyTransactions";
import Faq from "./components/General/Faq";

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
    path: "/faq",
    element: <Faq />,
  },
  {
    path: "/banner/:id",
    element: <BannerById />,
  },

  {
    path: "/alluser",
    element: (
      <ProtectedRouteAdmin>
        <Sidebar>
          <AllUser />
        </Sidebar>
      </ProtectedRouteAdmin>
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
  {
    path: "/banner-user",
    element: (
      <ProtectedRouteAdmin>
        <Sidebar>
          <BannerUser />
        </Sidebar>
      </ProtectedRouteAdmin>
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
    element: (
      <ProtectedRouteUser>
        <ActivityId />
      </ProtectedRouteUser>
    ),
  },

  {
    path: "/promo-admin",
    element: (
      <ProtectedRouteAdmin>
        <Sidebar>
          <PromoAdmin />
        </Sidebar>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/category-admin",
    element: (
      <ProtectedRouteAdmin>
        <Sidebar>
          <CategoryAdmin />
        </Sidebar>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/activities-admin",
    element: (
      <ProtectedRouteAdmin>
        <Sidebar>
          <ActivitiesAdmin />
        </Sidebar>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/payment-method",
    element: (
      <ProtectedRouteUser>
        <PaymentMethod />
      </ProtectedRouteUser>
    ),
  },
  {
    path: "/list-promo",
    element: <ListPromo />,
  },
  {
    path: "/list-category",
    element: <ListCategory />,
  },
  {
    path: "/detail-banner/:id",
    element: (
      <ProtectedRouteAdmin>
        <DetailBannerAdmin />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/detail-promo/:id",
    element: (
      <ProtectedRouteAdmin>
        <DetailPromoAdmin />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/detail-category/:id",
    element: (
      <ProtectedRouteAdmin>
        <DetailCategoryAdmin />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/detail-activity/:id",
    element: (
      <ProtectedRouteAdmin>
        <DetailActivityAdmin />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRouteUser>
        <CartPage />
      </ProtectedRouteUser>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/list-transactions",
    element: (
      <ProtectedRouteAdmin>
        <ListTransactions />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/transaction-table",
    element: (
      <ProtectedRouteAdmin>
        <Sidebar>
          <TransactionTable />
        </Sidebar>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/detail-transaction/:id",
    element: (
      <ProtectedRouteAdmin>
        <DetailTransactionAdmin />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/my-transactions",
    element: (
      <ProtectedRouteUser>
        <MyTransactions />
      </ProtectedRouteUser>
    ),
  },
];
