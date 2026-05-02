const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const systemPrompt = `
Analyze the supervisor transcript strictly based on the provided rubric.
You MUST return ONLY a valid JSON object. Do not include any extra text.

The JSON must include these 5 fields:
1. "score": (number 1-10)
2. "label": (string, e.g., "Consistent Performer", "High Potential")
3. "kpiMapping": (array of objects [{ "kpi": "string" }])
4. "evidence": (array of objects [{ "quote": "string", "interpretation": "string", "signal": "positive/negative" }])
5. "gaps": (string, identify specific technical or behavioral gaps)

STRICT RULES:
- Capture both positive and negative signals.
- Ensure "interpretation" and "gaps" are detailed for the psychologist interns.
`;

app.post('/analyze', async (req, res) => {
  const { transcript } = req.body;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "llama3", // Aapke system pe llama3:latest hai, isliye ye use kar rahe hain
      prompt: `${systemPrompt}\n\nTranscript: ${transcript}`,
      stream: false,
      format: "json"
    });

    const result = JSON.parse(response.data.response);
    res.json(result);
  } catch (error) {
    console.error("Ollama Error:", error.message);
    res.status(500).json({ error: "AI processing failed. Check if Ollama is running." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});