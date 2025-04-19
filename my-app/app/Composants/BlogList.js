"use client";
import { useMemo, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
const  BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    // Fonction pour charger les blogs depuis l'API
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/blogs');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des blogs:', err);
        setError('Impossible de charger les blogs. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Fonction pour gérer la recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour gérer le tri
  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Filtrer les blogs en fonction du terme de recherche
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => 
      (blog.Titre && blog.Titre.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [blogs, searchTerm]);

  // Trier les blogs en fonction de l'option de tri
  const sortedBlogs = useMemo(() => {
    return [...filteredBlogs].sort((a, b) => {
      switch(sortOption) {
        case 'title':
          return (a.Titre || '').localeCompare(b.Titre || '');
        case 'date':
          return new Date(b.date || 0) - new Date(a.date || 0);
        default:
          return 0;
      }
    });  
  }, [filteredBlogs, sortOption]);

  // Rendu conditionnel pour les différents états
  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border text-accent" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3 textcss">Chargement des articles...</p>
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
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Barre de recherche et options de tri */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Rechercher un article..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-sort-down"></i>
            </span>
            <select 
              className="form-select" 
              value={sortOption}
              onChange={handleSort}
            >
              <option value="default">Tri par défaut</option>
              <option value="title">Tri par titre</option>
              <option value="date">Tri par date (récent)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Affichage des résultats */}
      {sortedBlogs.length === 0 ? (
        <div className="alert bg-dark-secondary textcss p-4 text-center">
          <i className="bi bi-journal-x fs-1 mb-3 d-block text-accent"></i>
          <h4>Aucun article trouvé</h4>
          <p>Aucun article ne correspond à votre recherche.</p>
          {searchTerm && (
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => setSearchTerm('')}
            >
              <i className="bi bi-x-circle me-2"></i>Effacer la recherche
            </button>
          )}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {sortedBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};
export default BlogList;
