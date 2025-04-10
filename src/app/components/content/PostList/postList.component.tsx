import React, { useState } from "react";
import { useDeletePostMutation, useGetPostsQuery } from "../../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../shared/searchbar/searchbar.component";
import PaginationButton from "../../shared/paging-button/pagingb.component";
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles/icons/libraries/font-awesome/fontawesome-icons-library";
import GoAiguaIcon from "@goaigua/goaigua-styles/icons/icon.component";
import PostCard from "../../shared/postCard/postCard.component";
import "./postlist.component.scss";
import { useTranslation } from "react-i18next";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}


const PostList: React.FC = () => {
    const navigate = useNavigate();
    const { data: posts = [], isLoading, error} = useGetPostsQuery();
    const [deletePost] = useDeletePostMutation();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    const user= JSON.parse(localStorage.getItem("user") || "{}");
    const currentUserId = user?.id;


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const { t } = useTranslation();

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("¿Seguro que quieres eliminar este post?")) {
          try {
            await deletePost(id).unwrap();
            console.log(`Post con ID ${id} eliminado.`);
          } catch (error) {
            console.error("Error al eliminar el post:", error);
          }
        }
      };

    return (
        <div className="post-list-container">
            <h1>{t("APP.HOME.TITLE")}</h1>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                iconSrc={<GoAiguaIcon icon={FontAwesomeIconsLibrary.MagnifyingGlass}/>}
            />

            {isLoading && <p>{t("APP.HOME.LOADING")}</p>}
            {error && <p>{JSON.stringify(error)}</p>}

            <div className="post-list">
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <div key={post.id}>
                            <PostCard
                                title={post.title}
                                body={post.body}
                                onView={() => navigate(`/comentario/${post.id}`)}
                                onEdit={() => navigate(`/editar/${post.id}`)}
                                {...(post.userId === currentUserId && {
                                    onDelete: (e: React.MouseEvent) => handleDelete(post.id!, e),
                                })}
                            />
                        </div>
                    ))
                ) : (
                    <p>{t("APP.HOME.MSG")}</p>
                )}
            </div>

            <div className="pagination">
                <PaginationButton
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <GoAiguaIcon icon={FontAwesomeIconsLibrary.CaretLeft} />
                </PaginationButton>
                {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map(
                    (_, index) => (
                        <PaginationButton
                            key={index}
                            onClick={() => paginate(index + 1)}
                            active={currentPage === index + 1}
                        >
                            {index + 1}
                        </PaginationButton>
                    )
                )}
                <PaginationButton
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                        currentPage ===
                        Math.ceil(filteredPosts.length / postsPerPage)
                    }
                >
                    <GoAiguaIcon icon={FontAwesomeIconsLibrary.CaretRight} />
                </PaginationButton>
            </div>
        </div>
    );
};

export default PostList;
