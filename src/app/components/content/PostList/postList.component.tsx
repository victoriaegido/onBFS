import React, { useState } from "react";
import { useDeletePostMutation, useGetPostsQuery } from "../../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../shared/searchbar/searchbar.component";
import PaginationButton from "../../shared/paging-button/pagingb.component";
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles/icons/libraries/font-awesome/fontawesome-icons-library";
import GoAiguaIcon from "@goaigua/goaigua-styles/icons/icon.component";
import PostCard from "../../shared/postCard/postCard.component";
import "./postlist.component.scss";

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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

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
            <h1>Lista de Posts</h1>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                iconSrc={<GoAiguaIcon icon={FontAwesomeIconsLibrary.MagnifyingGlass}/>}
            />

            {isLoading && <p>Cargando...</p>}
            {error && <p>{JSON.stringify(error)}</p>}

            <div className="post-list">
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <PostCard
                            key={post.id ?? Math.random()}
                            title={post.title}
                            body={post.body}
                            onEdit={() => navigate(`/editar/${post.id}`)}
                            onDelete={(e) => handleDelete(post.id!, e)}
                        />
                    ))
                ) : (
                    <p>No se encontraron posts</p>
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
