import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export async function POST({ request, locals }) {
  try {
    const data = await request.json();
    const user = locals.user;
    
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: "Non authentifié" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!data.id) {
      return new Response(JSON.stringify({ success: false, error: "ID manquant" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id, ...updateData } = data;

    const record = await pb.collection(Collections.Lunettes).update(id, updateData);

    return new Response(JSON.stringify({ success: true, id: record.id, record }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur mise à jour:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}