import React, { useState } from "react";
import { useDeletePostMutation, useGetPostsQuery } from "../../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../shared/searchbar/searchbar.component";
import PaginationButton from "../../shared/paging-button/pagingb.component";
import PostCard from "../../shared/postCard/postCard.component";
import "./postlist.component.scss";
import { useTranslation } from "react-i18next";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { caretBackOutline } from "ionicons/icons";
import { caretForwardOutline } from "ionicons/icons";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    category: string | null;
}

const PostList: React.FC = () => {
    const navigate = useNavigate();
    const { data: posts = [], isLoading, error} = useGetPostsQuery();
    const [deletePost] = useDeletePostMutation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    const user= JSON.parse(localStorage.getItem("user") || "{}");
    const currentUserId = user?.id;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const { t } = useTranslation();

    // Verifica que estos mapeos estén completos y consistentes
const categoryGroups: { [key: string]: string[] } = {
    'moda': ['moda', 'fashion', 'Moda', 'Fashion'],
    'tecnologia': ['tecnologia', 'technology', 'Tecnología', 'Technology'],
    'informatica': ['informatica', 'computing', 'Informática', 'Computing'],
    'deportes': ['deportes', 'sports', 'Deportes', 'Sports'],
    'entretenimiento': ['entretenimiento', 'entertainment', 'Entretenimiento', 'Entertainment'],
    'general': ['general', 'General']
};

const categoryDisplayMap: { [key: string]: string } = {
    'moda': 'APP.C.FASHION',
    'tecnologia': 'APP.C.TECNO',
    'informatica': 'APP.C.INF',
    'deportes': 'APP.C.SPORTS',
    'entretenimiento': 'APP.C.ENT',        
    'general': 'APP.C.GEN'                 
};

    // Función para obtener el grupo de una categoría
    const getCategoryGroup = (category: string | null): string | null => {
        if (!category) return null;
        for (const [groupKey, variants] of Object.entries(categoryGroups)) {
            if (variants.includes(category)) {
                return groupKey;
            }
        }
        return category.toLowerCase();
    };

    // Función para traducir categoría
    const translateCategory = (category: string | null): string => {
        if (!category) return '';
        const groupKey = getCategoryGroup(category);
        if (groupKey && categoryDisplayMap[groupKey]) {
            return t(categoryDisplayMap[groupKey]);
        }
        return category;
    };

    // Obtener grupos únicos para el dropdown (no todas las variantes)
    const uniqueCategoryGroups = Array.from(
        new Set(
            posts
                .map(post => getCategoryGroup(post.category))
                .filter(group => group !== null)
        )
    );

    // Filtrar posts por término de búsqueda Y categoría
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "" || 
                               getCategoryGroup(post.category) === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="post-list-container">
            <h1>{t("APP.HOME.TITLE")}</h1>
            <p>{t("APP.HOME.SUB")}</p>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                iconSrc={<IonIcon icon={searchOutline}/>}
            />

            <div className="category-filter-container">
                <select 
                    value={selectedCategory} 
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="category-select"
                >
                    <option value="">{t("APP.PL.CATEGORY")}</option>
                    {uniqueCategoryGroups.map((groupKey) => (
                        <option key={groupKey} value={groupKey}>
                            {t(categoryDisplayMap[groupKey] || groupKey)}
                        </option>
                    ))}
                </select>
            </div>

            {(searchTerm || selectedCategory) && (
                <div className="active-filters">
                    {searchTerm && <span className="filter-tag">{t("APP.FILTER.B")} "{searchTerm}"</span>}
                    {selectedCategory && <span className="filter-tag">{t("APP.CATEGORY")}: {t(categoryDisplayMap[selectedCategory] || selectedCategory)}</span>}
                    <button 
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("");
                            setCurrentPage(1);
                        }}
                        className="clear-filters"
                    >
                        {t("APP.C.CF")}
                    </button>
                </div>
            )}

            {isLoading && <p>{t("APP.HOME.LOADING")}</p>}
            {error && <p>{JSON.stringify(error)}</p>}

            <div className="post-list">
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <div key={post.id}>
                            <PostCard
                                title={post.title}
                                body={post.body}
                                category={translateCategory(post.category)}
                                onView={() => navigate(`/comentario/${post.id}`)}
                                onEdit={() => navigate(`/editar/${post.id}`)}
                                {...(post.userId === currentUserId && {
                                    onDelete: (e: React.MouseEvent) => handleDelete(post.id!, e),
                                })}
                            />
                        </div>
                    ))
                ) : (
                    <p>No se encontraron posts con los filtros aplicados</p>
                )}
            </div>

            <div className="pagination">
                <PaginationButton
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <IonIcon icon={caretBackOutline} />
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
                    <IonIcon icon={caretForwardOutline} />
                </PaginationButton>
            </div>
        </div>
    );
};

export default PostList;