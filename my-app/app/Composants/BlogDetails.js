"use client";
import React from "react";

const BlogDetails = ({ id }) => {
  const [blog, setBlog] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const blogId = id; // Utiliser l'ID passé en prop

  React.useEffect(() => {
    if (!blogId) {
      setLoading(false);
      return;
    }

    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        
        // Récupération des détails du blog uniquement
        const blogResponse = await fetch(`http://localhost:3000/blogs/${blogId}`);

        if (!blogResponse.ok) {
          throw new Error(`Erreur HTTP: ${blogResponse.status}`);
        }

        const blogData = await blogResponse.json();
        
        setBlog(blogData);
        
        // Mettre à jour le titre de la page
        document.title = blogData.Titre ? `${blogData.Titre} - Blog` : "Blog";
        
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
        document.title = "Erreur - Blog";
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
    
    return () => {
      document.title = "Blog";
    };
  }, [blogId]);

  // Rendu conditionnel pour les différents états
  if (!blogId) {
    return (
      <div className="container">
        <div className="alert bg-dark-secondary textcss p-4 text-center">
          <i className="bi bi-exclamation-triangle-fill fs-1 mb-3 d-block text-accent"></i>
          <h4>Aucun article sélectionné</h4>
          <p>Veuillez sélectionner un article à afficher.</p>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => window.location.href = 'blog.html'}
          >
            <i className="bi bi-journals me-2"></i>Voir tous les articles
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border text-accent" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3 textcss">Chargement des détails de l'article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert bg-dark-secondary textcss p-4 text-center">
          <i className="bi bi-exclamation-triangle-fill fs-1 mb-3 d-block text-accent"></i>
          <h4>Une erreur s'est produite</h4>
          <p>{error}</p>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => window.history.back()}
          >
            <i className="bi bi-arrow-left me-2"></i>Retour
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container">
        <div className="alert bg-dark-secondary textcss p-4 text-center">
          <i className="bi bi-journal-x fs-1 mb-3 d-block text-accent"></i>
          <h4>Article introuvable</h4>
          <p>L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => window.location.href = 'blog.html'}
          >
            <i className="bi bi-journals me-2"></i>Voir tous les articles
          </button>
        </div>
      </div>
    );
  }

  // Formatage de la date si elle existe
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Erreur de formatage de date:", e);
      return dateString;
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Image principale du blog */}
          <div className="text-center mb-4 blog-main-image-container">
            <img 
              src={blog.image || "/m.jpg"} 
              alt={blog.Titre || "Image de l'article"} 
              className="blog-main-image rounded shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/m.jpg";
              }}
            />
          </div>
          
          {/* Titre et métadonnées du blog */}
          <h1 className="text-center textcss mb-4">{blog.Titre}</h1>
          {blog.date && (
            <div className="text-center mb-4">
              <span className="badge bg-secondary">
                <i className="bi bi-calendar me-1"></i>
                {formatDate(blog.date)}
              </span>
            </div>
          )}
          
          {/* Contenu du blog */}
          <div className="bg-light p-4 rounded shadow-sm mb-5">
            <p className="col-12">{blog.content || "Aucun contenu disponible pour cet article."}</p>
          </div>
          
          {/* Section commentaires */}
          <div className="mt-5">
            <CommentList blogId={blogId} />
          </div>
          
          {/* Formulaire d'ajout de commentaire */}
          <div className="mt-4">
            <AddComment blogId={blogId} />
          </div>
          
          {/* Bouton retour */}
          <div className="text-center mt-5">
            <button 
              className="btn btn-outline-primary" 
              onClick={() => window.location.href = 'blog'}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Retour à la liste des articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;