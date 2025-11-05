import pb from "../../utils/pb";

export async function POST({ request, locals }) {
  try {
    const data = await request.json();
    console.log("📥 Données reçues:", data);
    
    // Vérifier l'authentification
    const user = locals.user;
    
    if (!user || !user.id) {
      console.error("❌ Utilisateur non connecté");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Utilisateur non connecté" 
        }), 
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    console.log("✅ Utilisateur authentifié:", user.id);

    // Créer l'enregistrement dans PocketBase
    const record = await pb.collection('lunettes').create({
      user: user.id,
      nom: data.nom || 'Sans nom',
      materiau: data.materiau || 'acetate',
      couleur: data.couleur || '#1C2A39',
      pont: parseFloat(data.pont) || 18,
      verres: parseFloat(data.verres) || 52,
      type_verre: data.type_verre || 'transparent',
      svg_data: data.svg_data || '',
      prix: data.prix || 189
    });
    
    console.log("✅ Lunettes sauvegardées - ID:", record.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: record.id,
        message: "Création sauvegardée avec succès"
      }), 
      {
        headers: { "Content-Type": "application/json" },
        status: 200
      }
    );
    
  } catch (error) {
    console.error("❌ Erreur lors de la sauvegarde:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Erreur lors de la sauvegarde"
      }), 
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
