// src/middleware/index.js
import pb from "../utils/pb";

export const onRequest = async (context, next) => {
    console.log('MIDDLEWARE', context.url.pathname);
    
    // Vérification de l'authentification
    const cookie = context.cookies.get("pb_auth")?.value;
    if (cookie) {
        pb.authStore.loadFromCookie(cookie);
        if (pb.authStore.isValid) {
            context.locals.user = pb.authStore.record;
        }
    }

    // Pour les routes API, exige l'authentification sauf pour /api/login et /api/signup
    if (context.url.pathname.startsWith('/api/')) {
        if (!context.locals.user && 
            context.url.pathname !== '/api/login' && 
            context.url.pathname !== '/api/signup') {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        return next();
    }

    // Pour les pages publiques (pas besoin d'auth)
    const publicPages = ['/', '/atelier', '/contact'];
    if (publicPages.includes(context.url.pathname)) {
        return next();
    }

    // Pour les pages protégées, rediriger vers /compte si non authentifié
    if (!context.locals.user && 
        context.url.pathname !== '/compte') {
        return Response.redirect(new URL('/compte', context.url), 303);
    }

    return next();
};