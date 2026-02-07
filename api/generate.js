import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that writes LinkedIn posts.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return res.status(200).json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).json({ error: "OpenAI request failed" });
  }
}
