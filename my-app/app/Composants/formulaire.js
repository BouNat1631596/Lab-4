'use client';

import { useState } from 'react';
import { soumettre } from '../action';

export default function Formulaire() {
  const [titre, setTitre] = useState('');
  const [auteur, setAuteur] = useState('');
  const [contenu, setContenu] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [erreur, setErreur] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier que tous les champs sont remplis
    if (!titre || !auteur || !contenu) {
      setErreur('Tous les champs sont obligatoires');
      return;
    }
    
    // Afficher la boîte de dialogue de confirmation
    setShowConfirmDialog(true);
  };

  const confirmerSoumission = async () => {
    try {
      // Création de l'objet publication
      const nouvellePublication = {
        Titre: titre,
        auteur: auteur,
        date: new Date().toLocaleDateString('fr-FR'),
        content: contenu,
        image: "./m.jpg"
      };
      
      // Appel de la server action
      const resultat = await soumettre(nouvellePublication);
      
      if (resultat.success) {
        // Rediriger vers la page d'accueil
        window.location.href = "/";
      } else {
        setErreur(resultat.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setErreur('Erreur lors de la publication: ' + error.message);
    } finally {
      setShowConfirmDialog(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nouvelle Publication</h1>
      
      {erreur && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {erreur}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titre" className="block mb-1">Titre</label>
          <input
            id="titre"
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="auteur" className="block mb-1">Auteur</label>
          <input
            id="auteur"
            type="text"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="contenu" className="block mb-1">Contenu</label>
          <textarea
            id="contenu"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            className="w-full px-3 py-2 border rounded h-40"
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Publier
        </button>
      </form>
      
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirmation</h2>
            <p className="mb-6">Êtes-vous sûr de vouloir publier cet article?</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 border rounded"
              >
                Annuler
              </button>
              <button 
                onClick={confirmerSoumission}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
