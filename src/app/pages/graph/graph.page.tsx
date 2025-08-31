import React, { useState, useEffect } from "react";
import { useGetUsersQuery } from "../../store/slices/userSlice";
import { useGetPostsQuery } from "../../store/slices/postSlice";
import { useGetCommentsQuery } from "../../store/slices/commentSlice";
import Graph from "../../components/shared/graph/graph.component";
import { useTranslation } from "react-i18next";
import "./graph.page.scss";

const GraphPage: React.FC = () => {
  const [postCounts, setPostCounts] = useState<Record<number, number>>({});
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const [isDataReady, setIsDataReady] = useState<boolean>(false);
  const { t } = useTranslation();

  const { data: users, isLoading: usersLoading, error: usersError } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: posts, isLoading: postsLoading } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: comments, isLoading: commentsLoading } = useGetCommentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    setPostCounts({});
    setCommentCounts({});
    setIsDataReady(false);

    if (users && posts && comments && !usersLoading && !postsLoading && !commentsLoading) {
      const newPostCounts: Record<number, number> = {};
      users.forEach((user) => {
        newPostCounts[user.id!] = posts.filter((post) => post.userId === user.id).length;
      });

      const newCommentCounts: Record<number, number> = {};
      users.forEach((user) => {
        newCommentCounts[user.id!] = comments.filter((comment) => comment.userId === user.id).length;
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

  // Categorías para la gráfica
  const categories = users ? users.map((user) => user.name || `User ${user.id}`) : [];

  // Series de la gráfica
  const seriesData = [
    {
      name: t("APP.P.TITLE"),
      data: users ? users.map((user) => postCounts[user.id!]) : [],
      color: "#22c2d4",
    },
    {
      name: t("APP.DET.TITLE"),
      data: users ? users.map((user) => commentCounts[user.id!]) : [],
      color: "#7a4ff3",
    },
  ];

  // Ranking con points que viene de la BD
  const ranking = users
    ?.map((user) => ({
      id: user.id!,
      name: user.name || `User ${user.id}`,
      points: user.points, // <-- ya viene de BD
    }))
    .sort((a, b) => b.points - a.points);

  return (
    <div className="graph-page-container">
      {/* Gráfica */}
      <Graph
        title={t("APP.GRAPH.TITLE")}
        categories={categories}
        seriesData={seriesData}
        chartType="bar"
      />

      {/* Ranking */}
      <section className="ranking-section">
        <h2 className="ranking-title">{t("APP.RANKING.TITLE")}</h2>
        <p className="ranking-subtitle">{t("APP.RANKING.SUBTITLE")}</p>

        <div className="ranking-list">
          {ranking?.map((user, index) => (
            <div
              key={user.id}
              className={`ranking-item ${index < 3 ? "podium" : ""}`}
            >
              <div className="rank-icon">
                {index === 0 && <span className="gold-icon">🥇</span>}
                {index === 1 && <span className="silver-icon">🥈</span>}
                {index === 2 && <span className="bronze-icon">🥉</span>}
                {index > 2 && <span className="rank-number">{index + 1}</span>}
              </div>

              <div className="user-info">
                <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                <div className="user-details">
                  <p className="user-name">{user.name}</p>
                  <p className="user-id">ID: {user.id}</p>
                </div>
              </div>

              <div className="user-points">
                <span className="points-number">{user.points}</span>
                <span className="points-label">{t("APP.POINTS")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GraphPage;
