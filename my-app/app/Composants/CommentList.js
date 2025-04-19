"use client";
import React from 'react';
import Comment from './Comment';

const CommentList = ({ blogId }) => {
    const [commentaires, setCommentaires] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
  
    const fetchComments = async () => {
      try {
        setLoading(true);
        
        // Utiliser le bon nom de collection (avec trois "m")
        const response = await fetch(`http://localhost:3000/commmentaire`);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("All comments data:", data);
        
        // Filtrer les commentaires pour ce blog spécifique
        const filteredComments = data.filter(comment => 
          comment['publication lier'] === `Blog ${blogId}`
        );
        
        console.log("Filtered comments for blog", blogId, ":", filteredComments);
        setCommentaires(filteredComments);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des commentaires:', err);
        setError('Impossible de charger les commentaires. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
  
    React.useEffect(() => {
      // Ne rien faire si l'ID n'est pas fourni
      if (!blogId) {
        setLoading(false);
        return;
      }
  
      fetchComments();
      
      // Ajouter un écouteur d'événement pour recharger les commentaires
      const handleCommentAdded = () => {
        fetchComments();
      };
      
      window.addEventListener('commentAdded', handleCommentAdded);
      
      // Nettoyer l'écouteur d'événement lors du démontage
      return () => {
        window.removeEventListener('commentAdded', handleCommentAdded);
      };
    }, [blogId]); // Dépendance à l'ID pour recharger si l'ID change
  
    // Affichage pendant le chargement
    if (loading) {
      return (
        <div className="text-center py-3">
          <div className="spinner-border text-accent" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-2 textcss">Chargement des commentaires...</p>
        </div>
      );
    }
  
    // Affichage en cas d'erreur
    if (error) {
      return (
        <div className="alert bg-dark-secondary textcss p-3 text-center">
          <i className="bi bi-exclamation-triangle-fill fs-4 mb-2 d-block text-accent"></i>
          <p>{error}</p>
        </div>
      );
    }
  
    return (
      <div id="comments-container">
        {commentaires.length === 0 ? (
          <div className="text-center textcss">
            <i className="bi bi-chat-left-text fs-4 mb-2 d-block"></i>
            <p>Aucun commentaire pour le moment. Soyez le premier à commenter!</p>
          </div>
        ) : (
          commentaires.map((comment, index) => (
            <Comment 
              key={comment.id || index}
              author={comment.author || "Anonyme"}
              content={comment.contenu}
              date={comment.date}
              avatar={comment.avatar}
            />
          ))
        )}
      </div>
    );
  };
  
  export default CommentList;