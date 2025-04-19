"use client"
export default () => {
    return (
        <div className="container-fluid csHeaderFooter w-100 mx-0 mb-0">
            <div className="container-fluid d-flex align-items-center justify-content-between py-3">
                {/* Logo à gauche */}
                <img src="/logo3.PNG" alt="Logo" className="col-8 col-lg-2" />
        
                {/* Menu hamburger à droite sur mobile */}
                <div className="col-2 d-lg-none dropdown">
                    <i className="bi bi-list" style={{fontSize: '4rem'}} data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/Pages html/blog.html">Blog</a></li>
                        <li><a className="dropdown-item" href="#">Menu 2</a></li>
                        <li><a className="dropdown-item" href="#">Menu 3</a></li>
                        <li><a className="dropdown-item" href="#">Menu 4</a></li>
                    </ul>
                </div>
                
                {/* Menu desktop */}
                <div className="col-8 d-none d-lg-flex justify-content-center order-2">
                    <h1 className="col-2 fs-4">Menu 1</h1>
                    <h1 className="col-2 fs-4">Menu 2</h1>
                    <h1 className="col-2 fs-4">Menu 3</h1>
                    <h1 className="col-2 fs-4">Menu 4</h1>
                </div>
        
                {/* Icône utilisateur desktop */}
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-circle col-2 d-none d-lg-block order-3" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
            </div>
        </div>
    );
};

// Rendu du composant Header dans l'élément avec l'ID "Header"