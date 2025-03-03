import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import GoLoader from "@/app/components/shared/loader/loader.component";


const HomePage = lazy(() => import("@/app/pages/postHome.page"));
const EditPostPage = lazy(() => import("@/app/pages/editPost/postform.page"));
const CreatePostPage = lazy(() => import("@/app/pages/createPost/post.page"));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<GoLoader />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/crear" element={<CreatePostPage />} />
                <Route path="/editar/:id" element={<EditPostPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
