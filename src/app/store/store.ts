import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./slices/postSlice";
import { userApi } from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware).concat(userApi.middleware),
        
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
