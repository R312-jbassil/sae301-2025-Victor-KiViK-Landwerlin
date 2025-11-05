import pb from "../../utils/pb";

export const POST = async ({ request }) => {
    const { name, email, password, passwordConfirm } = await request.json();
    
    try {
        const record = await pb.collection('users').create({
            name,
            email,
            password,
            passwordConfirm,
            emailVisibility: true,
        });

        console.log("Utilisateur créé avec succès:", record.id);
        
        return new Response(
            JSON.stringify({ 
                success: true, 
                message: "Compte créé avec succès",
                userId: record.id 
            }), 
            { status: 201 }
        );
    } catch (err) {
        console.error("Erreur lors de la création du compte:", err);
        
        let errorMessage = "Erreur lors de la création du compte";
        
        if (err.data?.data) {
            const errors = err.data.data;
            if (errors.email) {
                errorMessage = "Cet email est déjà utilisé";
            } else if (errors.password) {
                errorMessage = "Le mot de passe ne respecte pas les critères requis";
            }
        }
        
        return new Response(
            JSON.stringify({ error: errorMessage }), 
            { status: 400 }
        );
    }
};