import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/shared/breadcrumbs/breadcrumb.component";
import PostCard from "../../components/shared/postCard/postCard.component";
import CommentCard from "../../components/shared/commentCard/commentCard.component";
import './userProfile.page.scss';
import { IonIcon } from '@ionic/react';
import { chatbubbleOutline, eyeOutline, readerOutline, trashOutline } from 'ionicons/icons';
import { useGetPostsByUserQuery, useDeletePostMutation } from '../../store/slices/postSlice';
import { useGetCommentsByUserQuery, useDeleteCommentMutation } from '../../store/slices/commentSlice';
import { useGetUsersQuery } from '../../store/slices/userSlice';
import GoButton from '../../../app/components/shared/button/button.component';

interface User {
  id: number;
  name: string;
  points?: number;
}

interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
  category?: string | null;
}

interface Comment {
  id?: number;
  userId: number;
  postId: number;
  body: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');

  const currentUser: User | null = JSON.parse(localStorage.getItem("user") || "{}");
  const userId: number = currentUser?.id || 1;
  const userName: string = currentUser?.name || "Usuario Ejemplo";

  // Obtener todos los usuarios desde la API para conseguir los puntos
  const { data: allUsers } = useGetUsersQuery();
  const userWithPoints = allUsers?.find(user => user.id === userId);

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

  const getCategoryGroup = (category: string | null): string | null => {
    if (!category) return null;
    for (const [groupKey, variants] of Object.entries(categoryGroups)) {
      if (variants.includes(category)) {
        return groupKey;
      }
    }
    return category.toLowerCase();
  };

  const translateCategory = (category: string | null): string => {
    if (!category) return '';
    const groupKey = getCategoryGroup(category);
    if (groupKey && categoryDisplayMap[groupKey]) {
      return t(categoryDisplayMap[groupKey]);
    }
    return category;
  };

  const { 
    data: userPosts = [], 
    isLoading: postsLoading, 
    error: postsError,
    refetch: refetchPosts 
  } = useGetPostsByUserQuery(userId);
  
  const { 
    data: userComments = [], 
    isLoading: commentsLoading, 
    error: commentsError,
    refetch: refetchComments 
  } = useGetCommentsByUserQuery(userId);
  
  const [deletePost, { isLoading: deletePostLoading }] = useDeletePostMutation();
  const [deleteComment, { isLoading: deleteCommentLoading }] = useDeleteCommentMutation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData: User = {
          id: userId,
          name: userName,
          points: userWithPoints?.points || 0
        };
        setProfileUser(userData);

      } catch (err: any) {
        console.error('Error fetching user data:', err);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, userWithPoints?.points]);

  const handleDeleteComment = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("¿Seguro que quieres eliminar este comentario?")) {
      try {
        await deleteComment(id).unwrap();
        console.log(`Comentario con ID ${id} eliminado exitosamente`);
      } catch (error) {
        console.error('Error al eliminar el comentario:', error);
        alert('Error al eliminar el comentario. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleDeletePost = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("¿Seguro que quieres eliminar este post?")) {
      try {
        await deletePost(id).unwrap();
        console.log(`Post con ID ${id} eliminado exitosamente`);
      } catch (error) {
        console.error('Error al eliminar el post:', error);
        alert('Error al eliminar el post. Por favor, inténtalo de nuevo.');
      }
    }
  };

  if (postsLoading || commentsLoading) return <div className="loading">Cargando perfil...</div>;
  if (postsError || commentsError) return <div className="error">Error al cargar los datos</div>;
  if (!profileUser) return <div className="error">{t("APP.UP.USERNOTFOUND")}</div>;

  return (
    <div className="user-profile-container">
      <Breadcrumbs />
      
      <h1>{t("APP.T.USERPROFILE")}</h1>
      
      <div className="user-profile">
        <div className="profile-header">
          <div className="profile-avatar">
            {profileUser.name ? profileUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{profileUser.name}</h2>
            <p className="profile-id">{t("APP.LOGIN.USER")} #{profileUser.id}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{userPosts.length}</span>
                <span className="stat-label">{t("APP.P.TITLE")}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userComments.length}</span>
                <span className="stat-label">{t("APP.DET.TITLE")}</span>
              </div>
              <div className="stat-item clickable" onClick={() => navigate('/graficas')}>
                <span className="stat-number">{userWithPoints?.points || 0}</span>
                <span className="stat-label">{t("APP.POINTS")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <IonIcon icon={readerOutline} />
             {t("APP.P.TITLE")} ({userPosts.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            <IonIcon icon={chatbubbleOutline} />
              {t("APP.DET.TITLE")} ({userComments.length})
          </button>
        </div>

        <div className="profile-content">

          {activeTab === 'posts' && (
            <div className="posts-section">
              {userPosts.length > 0 ? (
                <div className="post-list">
                  {userPosts.map((post) => (
                    <div key={post.id} className="post-item">
                      <PostCard
                        title={post.title}
                        body={post.body}
                        category={translateCategory(post.category)}
                        onView={() => navigate(`/comentario/${post.id}`)}
                        onEdit={() => navigate(`/editar/${post.id}`)}
                        onDelete={(e: React.MouseEvent) => handleDeletePost(post.id!, e)}
                        showActions={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>{t("APP.PROFILE.POST")}</h3>
                  <p>{t("APP.PROFILE.POSTSUB")}</p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <GoButton
                    text={t("APP.CP.TITLE")}
                    variant="submit"
                    onClick={() => navigate('/crear')}
                  />
                  </div>
                </div>
              )}
            </div>
          )}

          
          {activeTab === 'comments' && (
            <div className="comments-section">
              {userComments.length > 0 ? (
                <div className="comments-list">
                  {userComments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-header">
                        <span className="comment-post-info">
                            <IonIcon icon={chatbubbleOutline} />
                           {t("APP.EP.COMMENTON")} <strong>{comment.postId}</strong>
                        </span>
                        <div className="comment-actions">
                          <GoButton
                              text={t("APP.VIEW.POST")}
                              variant="view"
                              onClick={() => {navigate(`/comentario/${comment.postId}`)}}
                              iconSrc={<IonIcon icon={eyeOutline} />}
                          />
                          <div>
                            <GoButton
                                text={t("APP.DET.DELETE")}
                                variant="cancel"
                                onClick={(e) => handleDeleteComment(comment.id!, e)}
                                iconSrc={<IonIcon icon={trashOutline} />}
                                disabled={deleteCommentLoading}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="comment-content">
                        <CommentCard 
                          userName={profileUser.name} 
                          body={comment.body}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>{t("APP.PROFILE.COMMENT")}</h3>
                  <p>{t("APP.PROFILE.COMMENTSUB")}</p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <GoButton
                      text={t("APP.VIEWPOSTS")}
                      variant="view"
                      onClick={() => navigate('/')}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;