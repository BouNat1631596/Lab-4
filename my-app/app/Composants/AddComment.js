"use client";
// AddComment.js
import React from 'react';
const AddComment = ({ blogId }) => {
    const [newComment, setNewComment] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState(null);
    const [submitSuccess, setSubmitSuccess] = React.useState(false);
  
    // Fonction pour ajouter un commentaire
    const handleSubmitComment = async (e) => {
      e.preventDefault();
      
      // Validation basique
      if (!newComment.trim()) {
        setSubmitError("Le commentaire ne peut pas être vide.");
        return;
      }
      
      if (!blogId) {
        setSubmitError("Impossible d'identifier l'article de blog.");
        return;
      }
      
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
      
      try {
        // Créer l'objet commentaire selon la structure de votre BD
        const commentData = {
          id: Date.now().toString(), // Générer un ID unique
          "publication lier": `Blog ${blogId}`,
          date: new Date().toLocaleDateString('fr-FR'), // Format JJ/MM/AAAA comme dans vos exemples
          contenu: newComment, // Utiliser "contenu" au lieu de "content"
          author: author.trim() || 'Anonyme' // Ajouter l'auteur même s'il n'est pas dans votre structure actuelle
        };
        
        console.log("Sending comment data:", commentData);
        
        // Utiliser le bon nom de collection (avec trois "m")
        const response = await fetch('http://localhost:3000/commmentaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        });
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        // Réinitialiser le formulaire après succès
        setNewComment('');
        setAuthor('');
        setSubmitSuccess(true);
        
        // Déclencher un événement personnalisé pour informer CommentList qu'il doit se rafraîchir
        const event = new CustomEvent('commentAdded', { detail: { blogId } });
        window.dispatchEvent(event);
        
      } catch (err) {
        console.error('Erreur lors de l\'ajout du commentaire:', err);
        setSubmitError('Impossible d\'ajouter votre commentaire. Veuillez réessayer plus tard.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="mb-4">
        {submitSuccess && (
          <div className="alert alert-success" role="alert">
            <i className="bi bi-check-circle me-2"></i>
            Votre commentaire a été ajouté avec succès!
          </div>
        )}
        
        {submitError && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {submitError}
          </div>
        )}
        
        <form onSubmit={handleSubmitComment}>
          <div className="mb-3">
            <label htmlFor="commentAuthor" className="form-label">Votre nom (optionnel)</label>
            <input 
              type="text" 
              className="form-control" 
              id="commentAuthor"
              placeholder="Anonyme"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          
          <div data-mdb-input-init className="form-outline w-100 mb-3">
            <label htmlFor="textAreaExample" className="form-label">Commentaires</label>
            <textarea 
              className="form-control" 
              id="textAreaExample" 
              rows="4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="text-end mb-5">
            <button 
              type="submit" 
              className="btn btn-primary mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Envoi en cours...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  };
  export default AddComment;
  