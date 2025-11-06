import pb from "../../utils/pb";

export async function POST({ request, locals }) {
  try {
    const { id } = await request.json();
    const user = locals.user;
    
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: "Non authentifié" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: "ID manquant" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Vérifier que l'utilisateur est propriétaire
    const record = await pb.collection('lunettes').getOne(id);
    if (record.user !== user.id) {
      return new Response(JSON.stringify({ success: false, error: "Accès refusé" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Supprimer
    await pb.collection('lunettes').delete(id);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur suppression:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}