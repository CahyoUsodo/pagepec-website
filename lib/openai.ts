import OpenAI from "openai";
import { prisma } from "./prisma";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatbotResponse(
  message: string,
  sessionId?: string
): Promise<string> {
  // Get FAQ context
  const faqs = await prisma.fAQ.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    take: 10,
  });

  type FAQType = typeof faqs[0];

  const faqContext = faqs
    .map((faq: FAQType) => `Q: ${faq.question}\nA: ${faq.answer}`)
    .join("\n\n");

  // Get content context
  const contents = await prisma.content.findMany({
    take: 5,
  });

  type ContentType = typeof contents[0];

  const contentContext = contents
    .map((content: ContentType) => `${content.title}: ${content.description || ""}`)
    .join("\n");

  const systemPrompt = `Anda adalah asisten chatbot untuk lembaga pendidikan bahasa Inggris. 
Jawab pertanyaan dengan ramah dan informatif dalam bahasa Indonesia.
Gunakan informasi berikut sebagai konteks:

FAQ:
${faqContext}

Informasi Lembaga:
${contentContext}

Jika pertanyaan tidak terkait dengan informasi di atas, jawab dengan sopan dan arahkan ke kontak lembaga.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || 
      "Maaf, saya tidak dapat menjawab pertanyaan tersebut saat ini.";

    // Save to chat history if sessionId provided
    if (sessionId) {
      await prisma.chatHistory.createMany({
        data: [
          {
            sessionId,
            message,
            isUser: true,
          },
          {
            sessionId,
            message: response,
            isUser: false,
          },
        ],
      });
    }

    return response;
  } catch (error) {
    console.error("OpenAI API error:", error);
    
    // Fallback to FAQ matching
    const matchingFaq = faqs.find((faq: FAQType) =>
      faq.question.toLowerCase().includes(message.toLowerCase()) ||
      message.toLowerCase().includes(faq.question.toLowerCase())
    );

    if (matchingFaq) {
      return matchingFaq.answer;
    }

    return "Maaf, terjadi kesalahan. Silakan coba lagi nanti atau hubungi kami langsung.";
  }
}

