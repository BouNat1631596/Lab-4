// Blog.js - Composant pour afficher les détails d'un blog spécifique
"use client";
import BlogDetails from "./BlogDetails";
import React from "react";
import CommentList from "./CommentList";
import Comment from "./Comment";
import AddComment from "./AddComment";
import route from "next/router";
const Blog = ({id}) => {
    // Récupérer l'ID du blog depuis l'URL
    const blogId = id;
    console.log("ID du blog récupéré de l'URL:", blogId);
    
    // État pour stocker les données du blog
    const [blog, setBlog] = React.useState({
      Titre: "Titre du blog",
      image: "/m.jpg",
      content: "Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE",
      longContent: "Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem",
      captionImage: "/m.jpg",
      caption: "Caption"
    });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    
    // Effet pour charger les données du blog
    React.useEffect(() => {
      const fetchBlogData = async () => {
        if (!blogId) {
          setError("ID de blog non spécifié");
          setLoading(false);
          return;
        }
        
        try {
          setLoading(true);
          console.log("Tentative de récupération du blog avec ID:", blogId);
          
          // Remplacez cette URL par votre API réelle
          const response = await fetch(`http://localhost:3000/blogs/${blogId}`);
          
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Données du blog récupérées:", data);
          setBlog(data);
          setError(null);
        } catch (err) {
          console.error('Erreur lors du chargement du blog:', err);
          setError('Impossible de charger le blog. Veuillez réessayer plus tard.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchBlogData();
    }, [blogId]);
    
    // Affichage pendant le chargement
    if (loading) {
      return (
        <div className="container textcss text-center py-5">
          <div className="spinner-border text-accent" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3">Chargement du blog...</p>
        </div>
      );
    }
    
    // Affichage en cas d'erreur
    if (error) {
      return (
        <div className="container textcss py-5">
          <div className="alert bg-dark-secondary p-4 text-center">
            <i className="bi bi-exclamation-triangle-fill fs-4 mb-3 d-block text-accent"></i>
            <h4>Erreur</h4>
            <p>{error}</p>
            <button className="btn btn-accent mt-3" onClick={() => window.history.back()}>
              Retour
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="container textcss">
        {/* Image principale du blog - structure identique à votre HTML original */}
        <div className="mb-4 text-center">
          <img 
            src={blog.image || "/m.jpg"} 
            className="blog-main-image" 
            alt={blog.Titre || "Image principale du blog"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/m.jpg";
            }}
          />
        </div>
  
        {/* Titre du blog */}
        <h1 className="text-center">{blog.Titre || "Titre du blog"}</h1>
        
        {/* Premier paragraphe */}
        <p className="col-12 mb-5">{blog.content || "Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE"}</p>
        
        {/* Paragraphe plus long */}
        <p className="col-12 mb-5">{blog.longContent || "Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem"}</p>
        
        {/* Image avec légende - structure identique à votre HTML original */}
        <div className="d-flex justify-content-center">
          <div className="card rounded-3 shadow-sm col-6">
            <img 
              src={blog.captionImage || "/m.jpg"} 
              className="card-img-top p-3" 
              style={{maxHeight: "100px", objectFit: "cover"}} 
              alt={blog.caption || "..."}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/m.jpg";
              }}
            />
          </div>
        </div>
        
        {/* Légende */}
        <h6 className="text-center">{blog.caption || "Caption"}</h6>
        
        {/* Dernier paragraphe */}
        <p className="col-12 mb-5">{blog.conclusion || "Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem Some quick example text to build on the card title and make up the bulk of the card's. blah blahb l;ahb bowd fewf ew few efw f ewf EF efWE laporem"}</p>
        
        {/* Section commentaires */}
        <div className="container textcss">
          <h3 className="mb-4">
            <i className="bi bi-chat-left-text me-2"></i>
            Commentaires
          </h3>
          
          {/* Composant pour ajouter un commentaire */}
          <AddComment blogId={blogId} />
          
          {/* Composant pour afficher la liste des commentaires */}
          <div className="mt-5">
            <CommentList blogId={blogId} />
          </div>
        </div>
      </div>
    );
  };
  
export default Blog;
  