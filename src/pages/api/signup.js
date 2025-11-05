// src/pages/api/signup.js
import pb from "../../utils/pb";

export const POST = async ({ request }) => {
  const { name, email, password, passwordConfirm } = await request.json();

  try {
    const record = await pb.collection('users').create({
      name,
      email,
      password,
      passwordConfirm,
      emailVisibility: true
    });

    return new Response(JSON.stringify({ id: record.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Erreur inscription :", err);

    let errorMessage = "Création impossible";
    const fieldErrors = err?.data?.data;
    if (fieldErrors?.email) errorMessage = "Cet email est déjà utilisé";
    else if (fieldErrors?.password) errorMessage = "Mot de passe non conforme";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};
