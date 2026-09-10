const MAX_CONTENT_LENGTH = 50000;

const schema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: { type: "string" },
          statement: { type: "string" },
          alternatives: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
          correctIndex: { type: "integer", minimum: 0, maximum: 3 },
          explanation: { type: "string" },
          wrongFeedback: { type: "string" },
          evidence: { type: "string" }
        },
        required: ["skill", "statement", "alternatives", "correctIndex", "explanation", "wrongFeedback", "evidence"],
        additionalProperties: false
      }
    }
  },
  required: ["questions"],
  additionalProperties: false
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });
  const gatewayToken = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
  const directToken = process.env.OPENAI_API_KEY;
  const token = gatewayToken || directToken;
  if (!token) {
    return res.status(503).json({ error: "A geração inteligente ainda não está configurada no servidor." });
  }

  const { title = "", subject = "", content = "", count = 10, difficulty = "fgv", focus = "" } = req.body || {};
  const safeCount = [5, 10, 15].includes(Number(count)) ? Number(count) : 10;
  if (typeof content !== "string" || content.trim().length < 300) {
    return res.status(400).json({ error: "O material é curto demais para gerar uma prova fundamentada." });
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return res.status(413).json({ error: "O conteúdo ultrapassa o limite de 50.000 caracteres." });
  }

  const instructions = `Você elabora questões para a 1ª fase da OAB.
Crie exatamente ${safeCount} questões usando EXCLUSIVAMENTE o MATERIAL fornecido.
Não use conhecimento externo, não atualize o texto e não complete lacunas.
Cada questão deve avaliar compreensão ou aplicação, nunca apenas copiar uma frase.
Crie quatro alternativas plausíveis e apenas uma correta.
O campo evidence deve ser uma citação curta e LITERAL do MATERIAL que prove a resposta.
explanation deve explicar a regra e sua aplicação.
wrongFeedback deve explicar a confusão mais provável de quem errou.
Distribua as questões entre pontos diferentes do material.
Dificuldade: ${difficulty}. ${focus ? `Foco solicitado: ${focus}.` : ""}
Se o material não sustentar uma questão com segurança, não invente.`;

  try {
    const response = await fetch(gatewayToken
      ? "https://ai-gateway.vercel.sh/v1/responses"
      : "https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || (gatewayToken ? "openai/gpt-5.6-sol" : "gpt-6-astra"),
        input: [
          { role: "system", content: instructions },
          { role: "user", content: `TÍTULO: ${title}\nMATÉRIA: ${subject}\n\nMATERIAL:\n${content}` }
        ],
        text: { format: { type: "json_schema", name: "oab_grounded_quiz", strict: true, schema } }
      })
    });

    const payload = await response.json();
    if (!response.ok) throw new Error(payload?.error?.message || "Falha no serviço de geração.");
    const outputText = payload.output_text ||
      payload.output?.flatMap(item => item.content || []).find(item => item.type === "output_text")?.text;
    const parsed = JSON.parse(outputText);
    const source = normalize(content);
    const questions = (parsed.questions || []).filter(question =>
      question.alternatives?.length === 4 &&
      Number.isInteger(question.correctIndex) &&
      normalize(question.evidence).length >= 8 &&
      source.includes(normalize(question.evidence))
    );

    if (!questions.length) {
      return res.status(422).json({ error: "A prova foi recusada porque as respostas não puderam ser comprovadas no material." });
    }
    return res.status(200).json({ questions, requested: safeCount, validated: questions.length });
  } catch (error) {
    console.error("quiz_generation_failed", error?.message);
    return res.status(500).json({ error: "Não foi possível gerar uma prova confiável agora. Tente novamente em instantes." });
  }
}

function normalize(value = "") {
  return String(value)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[“”„"'']/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}
