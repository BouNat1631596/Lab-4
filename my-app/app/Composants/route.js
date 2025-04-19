import { NextResponse } from 'next/server';
import { readDB, writeDB, formatDate } from '@/utils/db';

// GET - Obtenir un blog par son ID
export async function GET(request, { params }) {
  try {
    const id = params.id;
    const db = readDB();
    const blog = db.blogs.find(blog => blog.id === id);
    
    if (!blog) {
      return NextResponse.json(
        { message: 'Blog non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la récupération du blog' },
      { status: 500 }
    );
  }
}

// PUT - Modifier un blog
export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const body = await request.json();
    const db = readDB();
    const index = db.blogs.findIndex(blog => blog.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { message: 'Blog non trouvé' },
        { status: 404 }
      );
    }
    
    // Mettre à jour les champs fournis
    if (body.Titre) db.blogs[index].Titre = body.Titre;
    if (body.auteur) db.blogs[index].auteur = body.auteur;
    if (body.content) db.blogs[index].content = body.content;
    if (body.image) db.blogs[index].image = body.image;
    if (body.longContent) db.blogs[index].longContent = body.longContent;
    if (body.captionImage) db.blogs[index].captionImage = body.captionImage;
    if (body.caption) db.blogs[index].caption = body.caption;
    if (body.conclusion) db.blogs[index].conclusion = body.conclusion;
    
    // Mettre à jour la date
    db.blogs[index].date = formatDate();
    
    if (writeDB(db)) {
      return NextResponse.json(db.blogs[index]);
    } else {
      return NextResponse.json(
        { message: 'Erreur lors de la mise à jour du blog' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la modification du blog' },
      { status: 400 }
    );
  }
}

// DELETE - Supprimer un blog
export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const db = readDB();
    const index = db.blogs.findIndex(blog => blog.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { message: 'Blog non trouvé' },
        { status: 404 }
      );
    }
    
    // Supprimer le blog
    const deletedBlog = db.blogs.splice(index, 1)[0];
    
    // Supprimer également les commentaires associés
    db.commmentaire = db.commmentaire.filter(
      comment => comment["publication lier"] !== `Blog ${id}`
    );
    
    if (writeDB(db)) {
      return NextResponse.json({ 
        message: 'Blog supprimé avec succès', 
        blog: deletedBlog 
      });
    } else {
      return NextResponse.json(
        { message: 'Erreur lors de la suppression du blog' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la suppression du blog' },
      { status: 500 }
    );
  }
}
