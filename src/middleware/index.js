// src/middleware/index.js
import pb from "../utils/pb";

export const onRequest = async (context, next) => {
    console.log('MIDDLEWARE - URL:', context.url.pathname);
    
    // Vérification de l'authentification via cookie
    const cookie = context.cookies.get("pb_auth")?.value;
    
    if (cookie) {
        try {
            pb.authStore.loadFromCookie(cookie);
            if (pb.authStore.isValid) {
                context.locals.user = pb.authStore.model;
                console.log('✅ Utilisateur authentifié:', pb.authStore.model?.id);
            }
        } catch (error) {
            console.error('Erreur lecture cookie:', error);
        }
    }

    // Routes API - authentification requise sauf login/signup
    if (context.url.pathname.startsWith('/api/')) {
        const publicApiRoutes = ['/api/login', '/api/signup'];
        
        if (!publicApiRoutes.includes(context.url.pathname) && !context.locals.user) {
            return new Response(
                JSON.stringify({ error: "Non authentifié" }), 
                { 
                    status: 401,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        return next();
    }

    // Pages publiques (pas d'auth requise)
    const publicPages = ['/', '/atelier', '/contact', '/compte'];
    if (publicPages.includes(context.url.pathname)) {
        return next();
    }

    // Pages protégées - redirection si non connecté
    const protectedPages = ['/configurateur', '/modeles', '/produit'];
    const isProtected = protectedPages.some(page => context.url.pathname.startsWith(page));
    
    if (isProtected && !context.locals.user) {
        console.log('❌ Accès refusé - Redirection vers /compte');
        return Response.redirect(new URL('/compte', context.url), 303);
    }

    return next();
};