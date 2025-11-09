import { GoogleGenAI, Modality } from "@google/genai";
import { stripBase64Prefix, getMimeTypeFromDataUrl } from '../utils/imageUtils';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateSwappedHairImage = async (userImage: string, hairImage: string): Promise<string> => {
  const model = 'gemini-2.5-flash-image';
  
  const userImagePart = {
    inlineData: {
      data: stripBase64Prefix(userImage),
      mimeType: getMimeTypeFromDataUrl(userImage),
    },
  };

  const hairImagePart = {
    inlineData: {
      data: stripBase64Prefix(hairImage),
      mimeType: getMimeTypeFromDataUrl(hairImage),
    },
  };

  const textPart = {
    text: `Tu es un expert en retouche photo IA. Ta tâche est de réaliser une greffe de cheveux numérique.
- La première image est la photo de la personne cible.
- La deuxième image contient la coiffure à appliquer.
Instructions :
1. Prends la coiffure de la deuxième image.
2. Applique cette coiffure sur la tête de la personne dans la première image.
3. Conserve IMPÉRATIVEMENT le visage, l'expression, le corps et l'arrière-plan d'origine de la première image.
4. Le résultat doit être une image photoréaliste où la nouvelle coiffure semble naturelle sur la personne. Ne modifie rien d'autre.
5. Transforme l'image finale en un portrait de studio professionnel. Utilise un éclairage flatteur et un arrière-plan neutre (gris clair ou uni) pour mettre en valeur le sujet.`
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [userImagePart, hairImagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const candidate = response.candidates?.[0];
    const firstPart = candidate?.content?.parts?.[0];

    if (firstPart && firstPart.inlineData) {
      const base64ImageBytes = firstPart.inlineData.data;
      const mimeType = firstPart.inlineData.mimeType;
      return `data:${mimeType};base64,${base64ImageBytes}`;
    } else {
      if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
        throw new Error(`La génération a été bloquée : ${candidate.finishReason}`);
      }
      throw new Error("Aucune image n'a été générée par l'API.");
    }

  } catch (error) {
    console.error("Erreur de l'API Gemini:", error);
     if (error instanceof Error) {
        throw error;
    }
    throw new Error("L'appel à l'API Gemini a échoué.");
  }
};