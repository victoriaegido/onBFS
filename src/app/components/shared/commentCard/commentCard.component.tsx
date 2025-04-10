import "./commentCard.component.scss";

interface CommentCardProps {
    userName: string;
    body: string;
  }
  
  const CommentCard: React.FC<CommentCardProps> = ({ userName, body }) => {
    return (
      <div className="comment-card">
        <h4>{userName}</h4>
        <p>{body}</p>
      </div>
    );
  };
  
  export default CommentCard;
  