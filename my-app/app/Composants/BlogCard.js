const BlogCard = ({ blog }) => {
  // Destructurer les propriétés du blog
  const { id, Titre, content, image } = blog;

  // Fonction pour tronquer le contenu s'il est trop long
  const truncateContent = (text, maxLength = 100) => {
    if (!text) return "Aucun contenu disponible";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };


  // Fonction pour rediriger vers la page de détails du blog
  const navigateToBlogDetail = () => {
    console.log("Navigating to blog with ID:", id);
    // Assurez-vous que l'ID est correctement transmis
    window.location.href = `blog/${id}`;
  };

  return (
    <div className="col">
      <div 
        className="card h-100 shadow-sm blog-card" 
        onClick={navigateToBlogDetail}
        style={{ cursor: 'pointer' }}
      >
        {/* Image du blog avec fallback */}
        <div className="blog-card__image-container">
          <img 
            src={image || "/m.jpg"} 
            className="blog-card__image card-img-top" 
            alt={Titre || "Blog"} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/m.jpg";
            }}
          />
          
          
        </div>
        
        {/* Titre du blog avec le style dark-secondary */}
        <div className="blog-card__title-wrapper">
          <h5 className="blog-card__title bg-dark-secondary textcss">
            {Titre || "Sans titre"}
          </h5>
        </div>
        
        <div className="card-body d-flex flex-column blog-card__body">
          {/* Contenu du blog */}
          <p className="card-text flex-grow-1 blog-card__text">
            {truncateContent(content)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
