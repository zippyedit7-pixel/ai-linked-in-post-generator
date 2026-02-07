export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Create a professional LinkedIn post in simple Hinglish based on this: ${prompt}`
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      text: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "AI error" });
  }
}
