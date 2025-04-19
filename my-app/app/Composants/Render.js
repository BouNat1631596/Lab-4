// Render.js - Point d'entrée principal de l'application React
function App() {
  // Déterminer quelle page afficher en fonction du nom de fichier
  const currentPage = window.location.pathname.split('/').pop();
  
  return (
    <>
      <Header />
      {currentPage === 'blog.html' ? (
        <Blog />
      ) : (
        <BlogList />
      )}
      <Footer />
    </>
  );
}

// Rendre l'application dans l'élément root
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
