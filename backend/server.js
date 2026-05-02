// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = 5000;
// const OLLAMA_API = "http://localhost:11434/api/generate";

// // Data Load karna (Rubric aur Transcripts)
// const rubricData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'rubric.json'), 'utf8'));

// app.post('/analyze', async (req, res) => {
//     const { transcript } = req.body;

//     // AI ke liye instructions (System Prompt)
//     const prompt = `
//     Context: DeepThought helps MSMEs by placing Fellows who build systems.
//     Rules:
//     1. Layer 1 (Execution) vs Layer 2 (Systems Building): Flag if the Fellow only does tasks vs building SOPs/trackers.
//     2. Scoring: Use the 1-10 rubric provided. Remember, Level 6 is just task execution. Level 7+ requires problem identification or systems building.
//     3. KPIs: Map to Lead Gen, Lead Conversion, Upselling, Cross-selling, NPS, PAT, TAT, Quality.
//     4. Gaps: Identify if Execution, Systems Building, KPI Impact, or Change Management is missing.

//     Rubric Reference: ${JSON.stringify(rubricData)}
    
//     Transcript to Analyze: "${transcript}"

//     Return ONLY a JSON object with this exact structure:
//     {
//       "score": number,
//       "label": "string",
//       "justification": "one paragraph",
//       "evidence": [{"quote": "string", "signal": "positive|negative", "dimension": "string"}],
//       "kpiMapping": [{"kpi": "string", "evidence": "string"}],
//       "gaps": [{"dimension": "string", "detail": "string"}],
//       "followUpQuestions": [{"question": "string", "targetGap": "string"}]
//     }
//     `;

//     try {
//         const response = await fetch(OLLAMA_API, {
//             method: 'POST',
//             body: JSON.stringify({
//                 model: "llama3",
//                 prompt: prompt,
//                 stream: false,
//                 format: "json"
//             })
//         });

//         const data = await response.json();
//         const parsedResponse = JSON.parse(data.response);
//         res.json(parsedResponse);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Ollama is not responding. Check if it is running." });
//     }
// });

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));











const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// STRICT SYSTEM PROMPT FOR 5 CORE PILLARS
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