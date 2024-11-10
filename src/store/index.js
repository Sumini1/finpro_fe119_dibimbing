import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../reducer/registerSlice";
import loginReducer from "../reducer/loginSlice";
import bannerReducer from "../reducer/bannerSlice";
import bannerIdReducer from "../reducer/bannerIdSlice";
import AllUserReducer from "../reducer/allUserSlice";
import loggedUserReducer from "../reducer/loggedUserSlice";
import updateUserReducer from "../reducer/updateUserSlice";
import promoReducer from "../reducer/promoSlice";
import promoByIdReducer from "../reducer/promoByIdSlice";
import categoryReducer from "../reducer/categorySlice";
import categoryByIdReducer from "../reducer/categoryByIdSlice";
import activityReducer from "../reducer/activitySlice";
import createBannerReducer from "../reducer/createBannerSlice";
import activityIdReducer from "../reducer/activityIdSlice";
import deleteBannerReducer from "../reducer/deleteBannerSlice";
import createPromoReducer from "../reducer/createPromoSlice";
import updatePromoReducer from "../reducer/updatePromoSlice";
import deletePromoReducer from "../reducer/deletePromoSlice";
import createCategoryReducer from "../reducer/createCategorySlice";
import updateCategoryReducer from "../reducer/updateCategorySlice";
import createActivityReducer from "../reducer/createActivitySlice";
import deleteActivityReducer from "../reducer/deleteActivitySlice";
import paymentMethodReducer from "../reducer/paymentMethodSlice";
import logoutReducer from "../reducer/logoutSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    banner: bannerReducer,
    bannerId: bannerIdReducer,
    AllUser: AllUserReducer,
    loggedUser: loggedUserReducer,
    updateUser: updateUserReducer,
    promo: promoReducer,
    promoById: promoByIdReducer,
    category: categoryReducer,
    categoryById: categoryByIdReducer,
    activity: activityReducer,
    createBanner: createBannerReducer,
    activityId: activityIdReducer,
    deleteBanner: deleteBannerReducer,
    createPromo: createPromoReducer,
    updatePromo: updatePromoReducer,
    deletePromo: deletePromoReducer,
    createCategory: createCategoryReducer,
    updateCategory: updateCategoryReducer,
    createActivity: createActivityReducer,
    deleteActivity: deleteActivityReducer,
    paymentMethod: paymentMethodReducer,
    logout: logoutReducer,
  },
});
