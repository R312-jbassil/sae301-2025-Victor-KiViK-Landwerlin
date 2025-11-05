import pb from "../../utils/pb";

export const POST = async ({ cookies }) => {
    cookies.delete("pb_auth", { path: "/" });
    pb.authStore.clear();
    
    return new Response(null, { 
        status: 303, 
        headers: { Location: '/compte' } 
    });
};