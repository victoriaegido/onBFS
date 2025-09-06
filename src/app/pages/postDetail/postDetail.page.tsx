import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../store/slices/postSlice";
import { useGetCommentsByPostQuery, useCreateCommentMutation, useDeleteCommentMutation } from "../../store/slices/commentSlice";
import { useGetUsersQuery } from "../../store/slices/userSlice";
import PostCard from "../../components/shared/postCard/postCard.component";
import CommentCard from "../../components/shared/commentCard/commentCard.component";
import Breadcrumbs from "../../components/shared/breadcrumbs/breadcrumb.component";
import './postDetail.page.scss';
import { useTranslation } from 'react-i18next';
import GoButton from '../../../app/components/shared/button/button.component';

const PostDetail = () => {
  const { id } = useParams();
  const postId = id ? Number(id) : 0;
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = user?.id;

  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const { data: comments, isLoading: commentsLoading, refetch: refetchComments } = useGetCommentsByPostQuery(postId);
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const [newComment, setNewComment] = useState('');
  const [createComment, { isLoading: isCreatingComment }] = useCreateCommentMutation();

  const isOwner = currentUserId === post?.userId;

  const { t } = useTranslation();

  // Grupos de categorías equivalentes (español/inglés)
  const categoryGroups: { [key: string]: string[] } = {
    'moda': ['moda', 'fashion', 'Moda', 'Fashion'],
    'tecnologia': ['tecnologia', 'technology', 'Tecnología', 'Technology'],
    'informatica': ['informatica', 'computing', 'Informática', 'Computing'],
    'deportes': ['deportes', 'sports', 'Deportes', 'Sports'],
    'entretenimiento': ['entretenimiento', 'entertainment', 'Entretenimiento', 'Entertainment'],
    'general': ['general', 'General']
  };

  // Mapeo de categorías para mostrar
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

  const getUserName = (userId: number) => {
    const user = users?.find((user) => user.id === userId);
    return user ? user.name : "Desconocido";
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUserId) return;

    try {
      await createComment({
        postId,
        body: newComment,
        userId: currentUserId
      }).unwrap();
      
      setNewComment('');
      refetchComments();
    } catch (error) {
      console.error('Error al crear comentario:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId).unwrap();
      refetchComments();
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  const handleDeleteAllComments = async () => {
    if (!comments || comments.length === 0) return;

    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar todos los comentarios?");
    if (!confirmDelete) return;

    try {
      await Promise.all(comments.map((c) => deleteComment(c.id!).unwrap()));
      refetchComments();
    } catch (error) {
      console.error("Error al eliminar todos los comentarios:", error);
    }
  };

  // Verificaciones de loading y errores
  if (postLoading || commentsLoading || usersLoading) {
    return (
      <div className="post-detail-container">
        <Breadcrumbs/>
        <div>Cargando...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <Breadcrumbs/>
        <div>Post no encontrado</div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <Breadcrumbs/>
      
      <div className="post-detail">
        <div className="post-detail-left">
          <PostCard 
            title={post.title}
            body={post.body}
            category={translateCategory(post.category)}
            showActions={false}
          />
        </div>
        
        <div className="post-detail-right">
          <h3>{t("APP.DET.TITLE")}</h3>
          
          {currentUserId && (
            <form onSubmit={handleSubmitComment} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t("APP.DET.INPUT")}
                className="comment-textarea"
                required
                data-cy="commentInput"
              />
              <div className="buttoncreatecomment">
                <GoButton
                text={isCreatingComment ? t('APP.DET.PUBLISH') : t('APP.DET.COMMENT')}
                variant="submit"
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmitComment(e);
                }}
                data-cy="publishCommentB"
                disabled={isCreatingComment}
              />
              </div>
            </form>
          )}

          {isOwner && comments && comments.length > 0 && (
            <GoButton
              text={t("APP.DET.DELETALL")}
              variant="cancel"
              onClick={handleDeleteAllComments}
            />
          )}
          
          <div className="comments-list">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment-with-action" data-cy="commentCard">
                  <CommentCard 
                    userName={getUserName(comment.userId)} 
                    body={comment.body}
                  />
                  {isOwner && (
                    <GoButton
                      text={t("APP.DET.DELETE")}
                      variant="cancel"
                      onClick={() => handleDeleteComment(comment.id!)}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="no-comments">
                {t("APP.DET.MSG")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;