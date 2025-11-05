// src/pages/api/login.js
import pb from "../../utils/pb";

export const POST = async ({ request, cookies }) => {
    try {
        const { email, password } = await request.json();
        
        console.log('Tentative de connexion:', email);

        // Authentification PocketBase
        const authData = await pb.collection('users').authWithPassword(email, password);
        
        console.log('✅ Connexion réussie:', authData.record.id);

        // Enregistrement du cookie (expire dans 30 jours)
        const cookieValue = pb.authStore.exportToCookie();
        
        cookies.set("pb_auth", cookieValue, {
            path: "/",
            httpOnly: true,
            secure: false, // Mettre true en production HTTPS
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 jours
        });
        
        return new Response(
            JSON.stringify({ 
                success: true,
                user: {
                    id: authData.record.id,
                    email: authData.record.email,
                    name: authData.record.name
                }
            }), 
            { 
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
        
    } catch (err) {
        console.error("❌ Erreur de connexion:", err);
        
        let errorMessage = "Identifiants invalides";
        
        if (err.status === 400) {
            errorMessage = "Email ou mot de passe incorrect";
        } else if (err.status === 0) {
            errorMessage = "Impossible de contacter le serveur PocketBase";
        }
        
        return new Response(
            JSON.stringify({ 
                success: false,
                error: errorMessage 
            }), 
            { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};