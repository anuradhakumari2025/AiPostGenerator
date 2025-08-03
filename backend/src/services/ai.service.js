const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});

async function generatePostCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction:  
      `You are a social media assistant that writes catchy one-line captions with relevant hashtags and emojis. Your responses must be concise and stylish.`,
    },
  });
  return response.text;
}

module.exports = generatePostCaption;
