import pb from "../../utils/pb";

export async function POST({ request }) {
  try {
    const data = await request.json();
    console.log("Received data to save:", data);
    
    // Vérifier que l'utilisateur est présent
    if (!data.user) {
      return new Response(
        JSON.stringify({ success: false, error: "Utilisateur non connecté" }), 
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const record = await pb.collection('lunettes').create({
      user: data.user,
      nom: data.nom || 'Sans nom',
      materiau: data.materiau,
      couleur: data.couleur,
      pont: data.pont,
      verres: data.verres,
      type_verre: data.type_verre,
      svg_data: data.svg_data,
      prix: data.prix || 189
    });
    
    console.log("Lunettes saved with ID:", record.id);

    return new Response(JSON.stringify({ success: true, id: record.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving lunettes:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }), 
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}