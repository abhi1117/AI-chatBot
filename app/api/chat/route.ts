import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // Prevents undefined key
});

export async function POST(req: Request) {
  try {
    console.log("📩 API Hit: /api/chat");

    const { message } = await req.json();
    console.log("✅ Received user message:", message);

    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OpenAI API Key is missing!");
      return new Response(
        JSON.stringify({ error: "OpenAI API Key is missing. Check .env.local." }),
        { status: 500 }
      );
    }

    // Request AI response
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
    });

    console.log("✅ OpenAI Full Response:", JSON.stringify(openaiResponse, null, 2));

    // Extract the reply
    const botReply = openaiResponse.choices?.[0]?.message?.content?.trim();
    console.log("🤖 Bot Reply:", botReply);

    if (!botReply) {
      console.error("❌ OpenAI returned an empty response.");
      return new Response(JSON.stringify({ error: "OpenAI did not return a response." }), { status: 500 });
    }

    return new Response(JSON.stringify({ botReply }), { status: 200 });
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("❌ API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  } else {
    console.error("❌ API Error:", error);
    return new Response(JSON.stringify({ error: "An unknown error occurred" }), { status: 500 });
  }
  }
}