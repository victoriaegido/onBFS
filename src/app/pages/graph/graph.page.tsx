import React, { useState, useEffect } from "react";
import { useGetUsersQuery } from "../../store/slices/userSlice";
import { useGetPostsQuery } from "../../store/slices/postSlice";
import { useGetCommentsQuery } from "../../store/slices/commentSlice";
import Graph from "../../components/shared/graph/graph.component";
import { useTranslation } from "react-i18next";


const GraphPage: React.FC = () => {
  const [postCounts, setPostCounts] = useState<Record<number, number>>({});
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const [isDataReady, setIsDataReady] = useState<boolean>(false);
  const { t } = useTranslation();

  const { 
    data: users, 
    isLoading: usersLoading, 
    error: usersError 
  } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  
  const { 
    data: posts, 
    isLoading: postsLoading 
  } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  
  const { 
    data: comments, 
    isLoading: commentsLoading 
  } = useGetCommentsQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    setPostCounts({});
    setCommentCounts({});
    setIsDataReady(false);
    
    if (users && posts && comments && !usersLoading && !postsLoading && !commentsLoading) {
      
      const newPostCounts: Record<number, number> = {};
      users.forEach(user => {
        newPostCounts[user.id!] = posts.filter(post => post.userId === user.id).length;
      });

      const newCommentCounts: Record<number, number> = {};
      users.forEach(user => {
        newCommentCounts[user.id!] = comments.filter(comment => comment.userId === user.id).length;
      });
      
      setPostCounts(newPostCounts);
      setCommentCounts(newCommentCounts);
      setIsDataReady(true);
    }
  }, [users, posts, comments, usersLoading, postsLoading, commentsLoading]);

  if (usersLoading || postsLoading || commentsLoading || !isDataReady) {
    return <div>Cargando datos... Por favor espera.</div>;
  }

  if (usersError) {
    return <div>Error al cargar los datos de usuarios</div>;
  }

  const categories = users ? users.map(user => user.name || `User ${user.id}`) : [];
  
  const seriesData = [
    {
      name: "Posts",
      data: users ? users.map(user => postCounts[user.id!]) : [],
      color: "#22c2d4",
    },
    {
      name: t("APP.DET.TITLE"),
      data: users ? users.map(user => commentCounts[user.id!]) : [],
      color: "#7a4ff3",
    },
  ];

  return (
    <div>
      <Graph
        title={t("APP.GRAPH.TITLE")}
        categories={categories}
        seriesData={seriesData}
        chartType="bar"
      />
    </div>
  );
};

export default GraphPage;