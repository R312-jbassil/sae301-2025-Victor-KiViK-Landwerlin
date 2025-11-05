// src/pages/api/generateLunettesConfig.js
import { OpenAI } from 'openai';

const HF_TOKEN = process.env.HF_TOKEN;
if (!HF_TOKEN) {
    throw new Error("HF_TOKEN introuvable. Ajoutez-le à votre fichier .env (ex: .env.local) et redémarrez le serveur.");
}

export const POST = async ({ request }) => {
    try {
        const { prompt } = await request.json();
        
        console.log('Prompt reçu:', prompt);
        
        // Initialisation du client OpenAI avec Hugging Face
        const client = new OpenAI({
            baseURL: "https://api-inference.huggingface.co/v1/",
            apiKey: HF_TOKEN,
        });
        
        // Message système pour guider l'IA
        const systemMessage = {
            role: "system",
            content: `Tu es un assistant expert en configuration de lunettes. 
Tu dois analyser la demande de l'utilisateur et retourner UNIQUEMENT un objet JSON valide avec cette structure exacte :
{
  "material": "acetate|metal|bois|bio",
  "color": "#HEXCODE",
  "colorName": "nom de la couleur",
  "pont": number (entre 14 et 22),
  "verres": number (entre 48 et 56),
  "lensType": "transparent|teinte|polarise"
}

Couleurs disponibles :
- Bleu marine: #1C2A39
- Brun clair: #BFA58A
- Gris taupe: #6E6B65
- Écaille: #8B4513
- Vert sapin: #2C5F2D
- Camel: #C19A6B
- Noir: #000000
- Beige: #F5F1E8

Exemples de correspondances :
- "moderne et élégant" → métal, couleurs sobres (noir, gris taupe)
- "naturel et écologique" → bois ou bio, couleurs chaudes (camel, vert sapin)
- "classique" → acétate, bleu marine ou écaille
- "rétro/vintage" → acétate, écaille ou brun clair
- "minimaliste" → métal, noir ou gris taupe
- "protection solaire" → verres teintés ou polarisés
- "léger" → métal, pont 14-16mm
- "robuste" → acétate, pont 18-22mm

Réponds UNIQUEMENT avec le JSON, sans texte additionnel.`
        };
        
        // Appel à l'API Hugging Face
        const chatCompletion = await client.chat.completions.create({
            model: "meta-llama/Llama-3.3-70B-Instruct",
            messages: [
                systemMessage,
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 500,
        });
        
        const aiResponse = chatCompletion.choices[0].message.content;
        console.log('Réponse brute de l\'IA:', aiResponse);
        
        // Extraction du JSON de la réponse
        let configJSON;
        try {
            // Essayer de parser directement
            configJSON = JSON.parse(aiResponse);
        } catch (e) {
            // Si échec, essayer d'extraire le JSON avec regex
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                configJSON = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("Impossible d'extraire la configuration JSON");
            }
        }
        
        // Validation de la configuration
        const validMaterials = ['acetate', 'metal', 'bois', 'bio'];
        const validLensTypes = ['transparent', 'teinte', 'polarise'];
        
        if (!validMaterials.includes(configJSON.material)) {
            configJSON.material = 'acetate';
        }
        
        if (!validLensTypes.includes(configJSON.lensType)) {
            configJSON.lensType = 'transparent';
        }
        
        if (configJSON.pont < 14 || configJSON.pont > 22) {
            configJSON.pont = 18;
        }
        
        if (configJSON.verres < 48 || configJSON.verres > 56) {
            configJSON.verres = 52;
        }
        
        console.log('Configuration validée:', configJSON);
        
        return new Response(
            JSON.stringify({ 
                success: true, 
                config: configJSON,
                raw: aiResponse 
            }), 
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        
    } catch (error) {
        console.error('Erreur lors de la génération:', error);
        
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: error.message,
                details: error.toString()
            }), 
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
};