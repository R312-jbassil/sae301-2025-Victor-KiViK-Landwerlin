// src/pages/api/generateLunettesConfig.js
import { OpenAI } from 'openai';

const HF_TOKEN = import.meta.env.HF_TOKEN;

if (!HF_TOKEN) {
    console.error("❌ HF_TOKEN manquant dans .env");
}

export const POST = async ({ request }) => {
    try {
        const { prompt } = await request.json();
        
        console.log('🤖 Prompt IA reçu:', prompt);

        if (!HF_TOKEN) {
            throw new Error("Token Hugging Face non configuré. Ajoutez HF_TOKEN dans votre fichier .env");
        }
        
        // Client OpenAI avec Hugging Face
        const client = new OpenAI({
            baseURL: "https://api-inference.huggingface.co/v1/",
            apiKey: HF_TOKEN,
        });
        
        // Prompt système optimisé
        const systemMessage = {
            role: "system",
            content: `Tu es un expert en design de lunettes. Analyse la demande et réponds UNIQUEMENT avec un JSON valide (sans markdown, sans backticks).

Structure obligatoire :
{
  "material": "acetate|metal|bois|bio",
  "color": "#HEXCODE",
  "colorName": "nom français",
  "pont": 14-22,
  "verres": 48-56,
  "lensType": "transparent|teinte|polarise"
}

Couleurs disponibles :
- Bleu marine: #1C2A39 (classique, élégant)
- Brun clair: #BFA58A (doux, raffiné)
- Gris taupe: #6E6B65 (neutre, moderne)
- Écaille: #8B4513 (vintage, caractère)
- Vert sapin: #2C5F2D (naturel, audacieux)
- Camel: #C19A6B (chaleureux, intemporel)
- Noir: #000000 (sobre, universel)
- Beige: #F5F1E8 (discret, minimaliste)

Règles d'interprétation :
- "moderne" ou "épuré" → metal + noir/gris
- "classique" → acetate + bleu marine
- "vintage" → acetate + écaille
- "naturel" → bois/bio + vert/camel
- "soleil" → verres teintés/polarisés
- "léger" → metal + pont 14-16
- "robuste" → acetate + pont 19-22

Exemple :
User: "Je veux des lunettes modernes et légères"
Assistant: {"material":"metal","color":"#000000","colorName":"Noir","pont":15,"verres":50,"lensType":"transparent"}`
        };
        
        // Appel API
        const chatCompletion = await client.chat.completions.create({
            model: "meta-llama/Llama-3.3-70B-Instruct",
            messages: [
                systemMessage,
                { role: "user", content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 300,
        });
        
        const aiResponse = chatCompletion.choices[0].message.content.trim();
        console.log('🤖 Réponse IA brute:', aiResponse);
        
        // Extraction et parsing du JSON
        let configJSON;
        try {
            // Nettoyer la réponse (enlever markdown si présent)
            let cleanedResponse = aiResponse
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            
            configJSON = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('❌ Erreur parsing JSON:', parseError);
            
            // Tentative d'extraction avec regex
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                configJSON = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("Format de réponse invalide de l'IA");
            }
        }
        
        // Validation et valeurs par défaut
        const validMaterials = ['acetate', 'metal', 'bois', 'bio'];
        const validLensTypes = ['transparent', 'teinte', 'polarise'];
        
        if (!validMaterials.includes(configJSON.material)) {
            configJSON.material = 'acetate';
        }
        
        if (!validLensTypes.includes(configJSON.lensType)) {
            configJSON.lensType = 'transparent';
        }
        
        configJSON.pont = Math.max(14, Math.min(22, parseInt(configJSON.pont) || 18));
        configJSON.verres = Math.max(48, Math.min(56, parseInt(configJSON.verres) || 52));
        
        console.log('✅ Configuration validée:', configJSON);
        
        return new Response(
            JSON.stringify({ 
                success: true, 
                config: configJSON,
                raw: aiResponse 
            }), 
            {
                headers: { "Content-Type": "application/json" },
                status: 200
            }
        );
        
    } catch (error) {
        console.error('❌ Erreur génération IA:', error);
        
        let userMessage = error.message;
        
        if (error.message.includes('Token')) {
            userMessage = "Token Hugging Face non configuré. Vérifiez votre fichier .env";
        } else if (error.status === 503) {
            userMessage = "Le modèle IA est en cours de chargement. Réessayez dans 30 secondes.";
        } else if (error.status === 401) {
            userMessage = "Token Hugging Face invalide";
        }
        
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: userMessage,
                details: error.toString()
            }), 
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
};