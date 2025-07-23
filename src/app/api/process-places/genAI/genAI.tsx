// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI, Type } from "@google/genai";

const user_preferences = {
  // Example user preferences
  likes: ["beach", "lighthouse", "sea food", "pizza"],
  dislikes: ["crowded places", "fast food"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get_suggestions(places: any[]) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "application/json",
    systemInstruction: [
      {
        text: `You are a hyper-personalized AI, realtime travel guide who proactively informs users about places/events/information/fact they might like based on their preferences and past interactions. But you make sure to not be irritating or spammy by suggesting something every time. You know when to stay shut. You speak only when you find a really interesting place/event/info/fact that matches the user's preferences. When you don't have anything interesting to say, you return has_suggestions property as false. You wil be given user preferences and a list of places nearby to the user. You will return a list of suggestions that match the user's preferences(if any). If you don't have any suggestions, return has_suggestions as false. If you have suggestions, return has_suggestions as true and a list of suggestions with the following properties: message, place_id, place_name, location (lat, lng). The message should be a short description of why the place is interesting based on user preferences like - "That's a nice sunset spot", (if you think user is an extrovert based on their preferences) - "You'd love this bar close to you", (if the user is into science) - "There's a science museum close to you".
        Here are user preferences : ${JSON.stringify(user_preferences)}`,
      },
    ],
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        has_suggestions: { type: Type.BOOLEAN },
        suggestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              message: {
                type: Type.STRING,
              },
              place_id: {
                type: Type.STRING,
              },
              place_name: {
                type: Type.STRING,
              },
              location: {
                type: Type.OBJECT,
                properties: {
                  lat: {
                    type: Type.NUMBER,
                  },
                  lng: {
                    type: Type.NUMBER,
                  },
                },
                required: ["lat", "lng"],
              },
            },
            required: ["message", "place_id", "place_name", "location"],
          },
        },
      },
      required: ["has_suggestions", "suggestions"],
    },
  };
  const model = "gemini-2.5-flash-lite";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: JSON.stringify({ places }),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const text = response.text ?? "";
  console.log("Response:", text);
  return text;
}

export { get_suggestions };
