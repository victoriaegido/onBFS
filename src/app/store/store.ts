import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./slices/postSlice";
import { userApi } from "./slices/userSlice";
import { commentApi } from "./slices/commentSlice";

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware).concat(userApi.middleware).concat(commentApi.middleware),
        
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
