import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import GoLoader from "../../app/components/shared/loader/loader.component";
import LoginForm from "../components/shared/loginForm/loginForm.component";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import RegisterForm from "../components/shared/registerForm/registerForm.component";

const HomePage = lazy(() => import("../../app/pages/postHome.page"));
const EditPostPage = lazy(
    () => import("../../app/pages/editPost/postform.page")
);
const CreatePostPage = lazy(
    () => import("../../app/pages/createPost/post.page")
);

export const AppRoutes = () => {
    return (
        <Suspense fallback={<GoLoader />}>
            <Routes>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
                <Route path="/crear" element={<ProtectedRoute> <CreatePostPage /> </ProtectedRoute>} />
                <Route path="/editar/:id" element={<ProtectedRoute> <EditPostPage /> </ProtectedRoute> } />
                
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
