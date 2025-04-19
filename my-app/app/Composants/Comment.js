// Comment.js
const Comment = ({ author, content, date, avatar }) => {
    // Formatage de la date pour un affichage plus convivial
    const formatDate = (dateString) => {
      if (!dateString) return "Date inconnue";
      
      try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      } catch (e) {
        console.error("Erreur de formatage de date:", e);
        return dateString;
      }
    };
  
    return (
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-2">
            <h6 className="card-subtitle text-muted">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt={author || "Utilisateur"} 
                  className="rounded-circle me-2"
                  width="24"
                  height="24"
                />
              ) : (
                <i className="bi bi-person-circle me-2"></i>
              )}
              {author || "Anonyme"}
            </h6>
            <small className="text-muted">
              <i className="bi bi-calendar me-1"></i>
              {formatDate(date)}
            </small>
          </div>
          <p className="card-text">{content || "Aucun contenu"}</p>
        </div>
      </div>
    );
  };
  export default Comment;
  