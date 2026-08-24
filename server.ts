import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google Gen AI helper
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// In-memory store for simulated resident incident reports
interface CommunityReport {
  id: string;
  barangay: string;
  incidentType: "flooding" | "landslide" | "fallen_tree" | "clogged_canal" | "rescue_needed" | "medical";
  locationDetail: string;
  description: string;
  reporterName: string;
  contactNumber: string;
  urgency: "low" | "medium" | "high" | "critical";
  timestamp: string;
  status: "verified" | "dispatching" | "resolved" | "pending";
  waterLevelDepthCm?: number;
  imageUrl?: string;
}

const initialReports: CommunityReport[] = [
  {
    id: "rep-001",
    barangay: "Banaba",
    incidentType: "flooding",
    locationDetail: "Armscor Compound / Lower Riverbank Area",
    description: "Creek water rising rapidly. Knee-deep water reaching perimeter access alley.",
    reporterName: "Kap. E. Santos",
    contactNumber: "0917-555-1024",
    urgency: "high",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    status: "verified",
    waterLevelDepthCm: 55,
  },
  {
    id: "rep-002",
    barangay: "Guitnang Bayan 1",
    incidentType: "clogged_canal",
    locationDetail: "Near San Mateo Public Market & P. Burgos St.",
    description: "Trash accumulated in main culvert causing surface water buildup on road lane.",
    reporterName: "T. Hernandez",
    contactNumber: "0928-555-9310",
    urgency: "medium",
    timestamp: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
    status: "dispatching",
    waterLevelDepthCm: 15,
  },
  {
    id: "rep-003",
    barangay: "Silangan",
    incidentType: "landslide",
    locationDetail: "Purok 4 Mountain Slope Access Road",
    description: "Minor soil loosening observed along slope near electrical post. Traffic barricade installed by tanods.",
    reporterName: "R. Dela Cruz",
    contactNumber: "0995-555-4421",
    urgency: "high",
    timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    status: "verified",
  },
  {
    id: "rep-004",
    barangay: "Ampid 1",
    incidentType: "fallen_tree",
    locationDetail: "Kambal Road near Elementary School",
    description: "Large acacia branch obstructing half the road. No injuries reported.",
    reporterName: "Tanod J. Ramos",
    contactNumber: "0932-555-8819",
    urgency: "medium",
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    status: "resolved",
  }
];

let communityReports: CommunityReport[] = [...initialReports];

// API: Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", municipality: "San Mateo, Rizal", time: new Date().toISOString() });
});

// API: Get Community Reports
app.get("/api/reports", (_req: Request, res: Response) => {
  res.json({ reports: communityReports });
});

// API: Create Community Report
app.post("/api/reports", (req: Request, res: Response) => {
  const {
    barangay,
    incidentType,
    locationDetail,
    description,
    reporterName,
    contactNumber,
    urgency,
    waterLevelDepthCm,
    imageUrl,
  } = req.body;

  if (!barangay || !incidentType || !description) {
    return res.status(400).json({ error: "Barangay, incident type, and description are required." });
  }

  const newReport: CommunityReport = {
    id: `rep-${Date.now()}`,
    barangay,
    incidentType,
    locationDetail: locationDetail || "Not specified",
    description,
    reporterName: reporterName || "Anonymous Resident",
    contactNumber: contactNumber || "N/A",
    urgency: urgency || "medium",
    timestamp: new Date().toISOString(),
    status: "pending",
    waterLevelDepthCm: Number(waterLevelDepthCm) || undefined,
    imageUrl: imageUrl || undefined,
  };

  communityReports.unshift(newReport);
  return res.status(201).json({ success: true, report: newReport });
});

// API: Gemini Disaster Risk & Resilience Advisor
app.post("/api/gemini/advisor", async (req: Request, res: Response) => {
  try {
    const { query, language = "tl", barangay, currentWaterLevel, context } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      // High-quality domain knowledge fallback if GEMINI_API_KEY is not configured
      const fallbackAnswers: Record<string, string> = {
        tl: `**MDRRMO San Mateo Emergency Advisory:**
Para sa kaligtasan sa **${barangay || "San Mateo, Rizal"}**:
1. **Agad na Alamin ang Alert Level**: Kung ang Marikina-San Mateo River level ay umabot sa 16.0m (Alert 2 - Prepare to Evacuate) o 18.0m (Alert 3 - Forced Evacuation), lumikas agad sa itinalagang Evacuation Center (e.g. San Mateo Elementary School, Banaba Evac Center, o Ampid NHS).
2. **Ihanda ang E-Balde / Go Bag**: Dokumento sa waterproof zip, 3-araw na tubig at ready-to-eat food, first aid kit, flashlight, radio, powerbank, at gamot lalo na pamprotekta sa Leptospirosis (Doxycycline kung may reseta).
3. **MDRRMO Hotlines**: (02) 8297-8100 local 129 / BFP: local 136 / PNP: local 114.
4. Patayin ang main electrical breaker bago lumusong o mag-evacuate.`,
        en: `**San Mateo DRRMO Emergency Advisory:**
For disaster preparedness in **${barangay || "San Mateo, Rizal"}**:
1. **Monitor River Thresholds**: River level at 15.0m (Alert 1 - Standby), 16.0m (Alert 2 - Preemptive Evacuation), 18.0m (Alert 3 - Forced Evacuation). Know your nearest shelter (e.g., San Mateo Elementary School or Banaba Evacuation Center).
2. **Prepare 72-Hour Go Bag**: Waterproofed identification papers, 3-day non-perishable food, water purification tablets/bottled water, first aid supplies, flashlight, batteries, and essential medicines.
3. **Emergency Numbers**: MDRRMO Operations Center at (02) 8297-8100 loc 129 | BFP Fire Station: loc 136 | PNP Police: loc 114.
4. Turn off main circuit breakers and gas tanks before vacating flooded areas.`
      };

      return res.json({
        reply: fallbackAnswers[language] || fallbackAnswers.en,
        isFallback: true,
        disclaimer: "Official San Mateo DRRMO baseline safety guidance."
      });
    }

    const systemPrompt = `You are the San Mateo DRRM & Climate Resilience AI Advisor (Municipality of San Mateo, Province of Rizal, Philippines).
You are an expert on disaster risk reduction, flood mitigation along the Marikina-San Mateo River Basin (covering Barangays Ampid 1 & 2, Banaba, Guitnang Bayan 1 & 2, Malanday, Maly, Dulong Bayan 1 & 2, Guinayang, Pintong Bukawe, San Jose, Santa Ana, Silangan, Sto. Niño), earthquake preparedness (West Valley Fault traces), landslide hazards in the upland eastern hills (Pintong Bukawe, Silangan), and family emergency protocols.

Rules:
- Respond in the requested language: "${language === "tl" ? "Tagalog / Filipino" : "English"}".
- Provide clear, actionable, life-saving advice with bullet points and bold highlights.
- Reference actual local San Mateo infrastructure when relevant (e.g., San Mateo Municipal Hall in Guitnang Bayan 1, Ampid River, Batasan-San Mateo Bridge, Banaba Dike, designated evacuation centers).
- Remind users of official MDRRMO Hotline: (02) 8297-8100 local 129.
- If the user asks about flood levels, remind them of official thresholds: 15m (Alert 1 - Yellow/Standby), 16m (Alert 2 - Orange/Preemptive Evac), 18m (Alert 3 - Red/Forced Evac).`;

    const userMessage = `User Query: ${query}
Context info:
- Target Barangay: ${barangay || "General San Mateo"}
- Current River Gauge Level: ${currentWaterLevel ? `${currentWaterLevel} meters` : "Normal Monitoring"}
- Additional context: ${context || "Resident general query"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\n${userMessage}` }] }
      ],
      config: {
        temperature: 0.3,
        maxOutputTokens: 1000,
      }
    });

    const replyText = response.text || "No response generated.";
    return res.json({ reply: replyText, isFallback: false });
  } catch (error: any) {
    console.error("Gemini Advisor Error:", error);
    return res.status(500).json({
      error: "Failed to generate AI guidance",
      details: error?.message || "Unknown error",
      fallbackReply: "Para sa agarang tulong, mangyaring tumawag diretso sa San Mateo MDRRMO sa (02) 8297-8100 local 129 o 911."
    });
  }
});

// Start Server and Vite setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`San Mateo DRRM Hub Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
