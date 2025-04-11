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
  

  if (postLoading || commentsLoading || usersLoading) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      <Breadcrumbs/>
      
      <div className="post-detail">
        <div className="post-detail-left">
          <PostCard 
            title={post!.title} 
            body={post!.body} 
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
              />
              <button 
                type="submit" 
                className="comment-button"
                disabled={isCreatingComment}
              >
                {isCreatingComment ? t('APP.DET.PUBLISH') : t('APP.DET.COMMENT')}
              </button>
            </form>
          )}
          
          {!currentUserId && (
            <div className="login-message">
              Inicia sesión para dejar un comentario
            </div>
          )}

          {isOwner && comments && comments.length > 0 && (
            <button onClick={handleDeleteAllComments} className="delete-all-button">
              {t("APP.DET.DELETALL")}
            </button>
          )}
          
          <div className="comments-list">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment-with-action">
                  <CommentCard 
                    userName={getUserName(comment.userId)} 
                    body={comment.body}
                  />
                  {isOwner && (
                    <button
                      className="delete-comment-button"
                      onClick={() => handleDeleteComment(comment.id!)}
                    >
                      {t("APP.DET.DELETE")}
                    </button>
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