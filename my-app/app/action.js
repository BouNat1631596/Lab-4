'use server';

export async function soumettre(publication) {
  try {
    const response = await fetch('http://localhost:3000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publication),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Erreur lors de la soumission:', error);
    return {
      success: false,
      message: 'Erreur lors de la publication: ' + error.message
    };
  }
}