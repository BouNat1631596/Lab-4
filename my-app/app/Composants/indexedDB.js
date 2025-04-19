// Initialiser la base de données IndexedDB
export function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('BlogsDB', 1);
      
      request.onerror = (event) => {
        console.error('Erreur d\'ouverture de la base de données IndexedDB:', event.target.error);
        reject(event.target.error);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Créer les object stores si ils n'existent pas
        if (!db.objectStoreNames.contains('blogs')) {
          db.createObjectStore('blogs', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('commentaires')) {
          db.createObjectStore('commentaires', { keyPath: 'id' });
        }
      };
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
    });
  }
  
  // Ajouter ou mettre à jour un blog dans IndexedDB
  export async function saveBlogToIndexedDB(blog) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['blogs'], 'readwrite');
        const store = transaction.objectStore('blogs');
        const request = store.put(blog);
        
        request.onsuccess = () => resolve(true);
        request.onerror = (event) => {
          console.error('Erreur lors de la sauvegarde du blog dans IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
      return false;
    }
  }
  
  // Récupérer un blog depuis IndexedDB
  export async function getBlogFromIndexedDB(id) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['blogs'], 'readonly');
        const store = transaction.objectStore('blogs');
        const request = store.get(id);
        
        request.onsuccess = (event) => resolve(event.target.result || null);
        request.onerror = (event) => {
          console.error('Erreur lors de la récupération du blog depuis IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
      return null;
    }
  }
  
  // Récupérer tous les blogs depuis IndexedDB
  export async function getAllBlogsFromIndexedDB() {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['blogs'], 'readonly');
        const store = transaction.objectStore('blogs');
        const request = store.getAll();
        
        request.onsuccess = (event) => resolve(event.target.result || []);
        request.onerror = (event) => {
          console.error('Erreur lors de la récupération des blogs depuis IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
      return [];
    }
  }
  
  // Supprimer un blog de IndexedDB
  export async function deleteBlogFromIndexedDB(id) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['blogs'], 'readwrite');
        const store = transaction.objectStore('blogs');
        const request = store.delete(id);
        
        request.onsuccess = () => resolve(true);
        request.onerror = (event) => {
          console.error('Erreur lors de la suppression du blog dans IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
      return false;
    }
  }
  
  // Fonctions similaires pour les commentaires
  export async function saveCommentToIndexedDB(comment) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['commentaires'], 'readwrite');
        const store = transaction.objectStore('commentaires');
        const request = store.put(comment);
        
        request.onsuccess = () => resolve(true);
        request.onerror = (event) => {
          console.error('Erreur lors de la sauvegarde du commentaire dans IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
      return false;
    }
  }
  
  export async function getCommentFromIndexedDB(id) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['commentaires'], 'readonly');
        const store = transaction.objectStore('commentaires');
        const request = store.get(id);
        
        request.onsuccess = (event) => resolve(event.target.result || null);
        request.onerror = (event) => {
          console.error('Erreur lors de la récupération du commentaire depuis IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
      return null;
    }
  }
  
  export async function getAllCommentsFromIndexedDB() {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['commentaires'], 'readonly');
        const store = transaction.objectStore('commentaires');
        const request = store.getAll();
        
        request.onsuccess = (event) => resolve(event.target.result || []);
        request.onerror = (event) => {
          console.error('Erreur lors de la récupération des commentaires depuis IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
      return [];
    }
  }
  
  export async function deleteCommentFromIndexedDB(id) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['commentaires'], 'readwrite');
        const store = transaction.objectStore('commentaires');
        const request = store.delete(id);
        
        request.onsuccess = () => resolve(true);
        request.onerror = (event) => {
          console.error('Erreur lors de la suppression du commentaire dans IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
      return false;
    }
  }
  
  // Récupérer les commentaires d'un blog spécifique depuis IndexedDB
  export async function getBlogCommentsFromIndexedDB(blogId) {
    try {
      const allComments = await getAllCommentsFromIndexedDB();
      return allComments.filter(comment => comment["publication lier"] === `Blog ${blogId}`);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires du blog depuis IndexedDB:', error);
      return [];
    }
  }
  