// Handle environment variables for both CRA and Vite
const apiKey = (typeof process !== 'undefined' && process.env) 
  ? process.env.REACT_APP_API_KEY 
  : (typeof import.meta !== 'undefined' && import.meta.env) 
    ? import.meta.env.VITE_API_KEY 
    : null;

export async function generateFlashcards(userPrompt, numCards) {
  console.log('generateFlashcards called with:', { userPrompt, numCards });
  console.log('API key available:', !!apiKey);
  console.log('API key first 10 chars:', apiKey ? apiKey.substring(0, 10) + '...' : 'N/A');
  
  if (!apiKey) {
    console.error('API key not found. Make sure REACT_APP_API_KEY is set in your .env file');
    throw new Error('API key not configured. Please add REACT_APP_API_KEY to your .env file.');
  }

  const fullPrompt = `You are an AI flashcard generator.

Your task is to generate a set of flashcards based on the user's input topic or content.

Rules and Guidelines:
1. Each flashcard must focus on only one concept or fact. Do not combine multiple ideas into a single card.
2. The number of flashcards should scale with content density — generate more cards if there are many key points.
3. If the user specifies a number of cards, return exactly that many. Otherwise, use your best judgment.
4. Assign a difficulty level ("easy", "medium", or "difficult") based on how familiar or complex the concept is. create the order based on difficulty.
5. Keep flashcard text clear, concise, and suitable for quick learning.
6. If applicable, include an image URL to visually support the concept. If not, use an empty string "".

Required Output Format:
Return only a valid JSON array. Each flashcard must follow this exact format:

[
{
    "title": "What is the powerhouse of the cell?",
    "info": "The mitochondrion",
    "difficulty": "medium",
    "image": ""
}
]

Your actual output should be an array like the example above, with multiple flashcard objects depending on the content.

Do not include any explanations, commentary, or markdown formatting in your response. Only return a clean JSON array.

---

### USER INPUT:
${userPrompt} ${numCards ? `\nLimit to ${numCards} cards.` : ""}
`;

  try {
    console.log('Making API request to:', `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.substring(0, 10)}...`);
    
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }]
      })
    });

    console.log('Response status:', res.status);
    console.log('Response ok:', res.ok);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }

    const data = await res.json();
    console.log('API Response:', data);

    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response format from API');
    }

    const text = data.candidates[0].content.parts[0].text;
    console.log('Raw text response:', text);
    
    try {
      const flashcards = JSON.parse(text);
      console.log('Parsed flashcards:', flashcards);
      return flashcards;
    } catch (parseError) {
      console.error('Failed to parse JSON response:', text);
      console.error('Parse error:', parseError);
      throw new Error('Invalid JSON response from API');
    }
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
}