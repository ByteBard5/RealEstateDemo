import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
PREMIUM RECORDINGS DATA
Now includes:
- shortTitle (card)
- fullTitle (modal)
- description
- benefits
- stats
*/

const recordings = [
  {
    shortTitle: "After Hours Lead Handling",
    fullTitle:
      "Capture and Convert Every After-Hours Lead Automatically — Even When Your Team Is Offline",

    audio: "/demo-audios/after_hours_lead_handling_german.m4a",
    image: "/demo-images/Image1.png",

    description:
      "A buyer inquiry for a $480,000 property represents a potential $12,000–$14,400 commission opportunity, yet many of these calls happen outside business hours when no one is available to respond. When the inquiry is handled instantly, the buyer’s budget, intent, and purchase timeline are captured while interest is highest and decision momentum is active. Instead of the buyer moving on to competitors by the next day, the viewing is secured immediately — protecting valuable revenue and positioning your agency to win the deal.",

    benefits: [
      "Answers and qualifies buyers instantly after hours",
      "Captures budget, timeline, and property preferences",
      "Books qualified viewing appointments automatically",
      "Prevents high-value buyers from going to competitors",
    ],

    stats: [
      "+37% increase in booked appointments",
      "+62% faster lead response time",
      "-48% reduction in lost inbound leads",
    ],
  },

  {
    shortTitle: "Buyer Qualification",
    fullTitle:
      "Automatically Qualify Buyers and Prioritize High-Intent Prospects Without Human Effort",

    audio: "/demo-audios/automatic_buyer_qualification_english.m4a",
    image: "/demo-images/Image2.png",

    description:
      "A buyer with a $750,000 budget and mortgage pre-approval represents a potential $18,750–$22,500 commission opportunity, yet agents often spend 15–20 minutes screening every inquiry to find prospects like this. When budget, financing status, and a confirmed 30-day purchase timeline are qualified upfront, only serious, ready-to-buy prospects move forward to your team. Instead of wasting valuable selling hours on low-intent callers, agent time is focused entirely on high-probability opportunities — increasing closing rates and protecting significant commission revenue.",

    benefits: [
      "Identifies serious buyers with verified budgets",
      "Captures buying timeline and financing readiness",
      "Filters out low-intent or unqualified callers",
      "Sends only high-value prospects to your agents",
    ],

    stats: [
      "+29% higher closing rates",
      "-52% time wasted on unqualified leads",
      "+41% faster deal cycles",
    ],
  },

  {
    shortTitle: "Viewing Scheduling",
    fullTitle:
      "Automatically Schedule Property Viewings Without Any Manual Coordination",

    audio: "/demo-audios/automatic_viewing_scheduling_british.m4a",
    image: "/demo-images/Image3.png",

    description:
      "A buyer interested in a $620,000 property represents a potential $15,500–$18,600 commission opportunity, and fast scheduling plays a critical role in securing the deal. When availability is confirmed instantly and the viewing is booked while interest is highest, decision momentum is preserved and buyer commitment strengthens. Instead of delays, missed coordination, or the buyer choosing another agency, the opportunity is secured immediately — significantly increasing the likelihood of converting interest into a successful closing.",

    benefits: [
      "Books property viewings during the first call",
      "Eliminates manual scheduling delays",
      "Captures buyers while intent is strongest",
      "Increases likelihood of closing the deal",
    ],

    stats: [
      "+33% more scheduled viewings",
      "-71% scheduling friction",
      "+26% faster conversions",
    ],
  },

  {
    shortTitle: "Buyer Lead Capture",
    fullTitle:
      "Capture Buyer Leads Instantly and Turn Inbound Calls Into Real Opportunities",

    audio: "/demo-audios/hindi_buyer_lead_capture.m4a",
    image: "/demo-images/Image4.png",

    description:
      "A buyer interested in a $540,000 home represents a potential $13,500–$16,200 commission opportunity, but incomplete details or delayed qualification often result in lost revenue. When full contact information, preferred location, exact budget, financing readiness, and purchase timeline are captured immediately, the opportunity becomes clear and actionable from the start. Instead of agents chasing missing details or losing momentum, a fully qualified, ready-to-convert buyer moves forward efficiently — significantly increasing the chances of securing the deal and closing the commission.",

    benefits: [
      "Captures complete buyer profiles automatically",
      "Stores lead details instantly in your system",
      "Ensures no high-value lead information is lost",
      "Enables faster and more effective follow-ups",
    ],

    stats: [
      "+39% increase in usable leads",
      "+58% faster follow-ups",
      "+22% higher deal conversion",
    ],
  },

  {
    shortTitle: "Lead Handling",
    fullTitle:
      "Handle Inbound Leads Professionally Without Hiring Additional Staff",

    audio: "/demo-audios/kuwait_english.m4a",
    image: "/demo-images/Image5.png",

    description:
      "The AI answers buyer inquiries within seconds, provides property details, and qualifies their budget and purchase timeline instantly. With a typical 2.5–3% commission on a $690,000 property, this represents a potential $17,250–$20,700 revenue opportunity. While most agencies miss these calls or respond too late — allowing serious buyers to move on to competitors — the AI captures and qualifies the lead immediately, ensuring valuable commission opportunities are secured and moved closer to closing.",

    benefits: [
      "Ensures every inbound call is answered instantly",
      "Provides professional and consistent responses",
      "Captures valuable buyer opportunities automatically",
      "Reduces dependency on additional staff",
    ],

    stats: [
      "-63% missed calls",
      "+34% improved customer satisfaction",
      "+27% more appointments booked",
    ],
  },

  {
    shortTitle: "Missed Call Recovery",
    fullTitle: "Recover Lost Opportunities Automatically From Missed Calls",

    audio: "/demo-audios/missed_call_recovery_English.m4a",
    image: "/demo-images/Image6.png",

    description:
      "A missed call from a buyer interested in a $580,000 property could mean losing a $14,500–$17,400 commission opportunity. When missed inquiries are followed up instantly, buyer intent is captured while interest is still high, their budget and timeline are qualified, and the opportunity is secured before competitors have a chance to respond — turning what would have been lost revenue into a high-probability closing opportunity.",

    benefits: [
      "Automatically calls missed prospects back instantly",
      "Recovers high-value lost opportunities",
      "Captures buyer intent while interest is fresh",
      "Prevents revenue loss from missed calls",
    ],

    stats: [
      "+31% recovered leads",
      "+24% revenue recovery",
      "-67% lost opportunities",
    ],
  },

  {
    shortTitle: "Multilingual Handling",
    fullTitle: "Serve International Buyers Fluently in Multiple Languages",

    audio: "/demo-audios/multilingual.m4a",
    image: "/demo-images/Image7.png",

    description:
      "An international buyer interested in a $920,000 investment property represents a potential $23,000–$27,600 commission opportunity. When communication happens fluently in the buyer’s native language, trust is established faster and their investment intent, budget, and timeline are clearly qualified without friction. Instead of losing high-value overseas clients due to language barriers or slow responses, the opportunity is captured early and positioned for a smooth, high-probability closing.",

    benefits: [
      "Communicates fluently in multiple languages",
      "Captures international buyer opportunities",
      "Builds trust with overseas investors",
      "Expands your global market reach",
    ],

    stats: [
      "+44% international conversion",
      "+36% client satisfaction",
      "+21% global deal volume",
    ],
  },

  {
    shortTitle: "New Buyer Capture",
    fullTitle:
      "Instantly Capture and Convert New Buyer Inquiries Before Competitors Do",

    audio: "/demo-audios/new_buyer_lead_capture_English.m4a",
    image: "/demo-images/Image8.png",

    description:
      "A buyer actively searching for a $710,000 property represents a potential $17,750–$21,300 commission opportunity and is often contacting multiple agencies at the same time. When response happens instantly, their requirements, budget, preferred location, and purchase timeline are captured while intent is highest and decision momentum is strongest. Instead of losing the opportunity to faster competitors, the viewing is secured immediately — positioning your agency as the first and most trusted choice, and significantly increasing the probability of closing the deal.",

    benefits: [
      "Responds to new inquiries instantly",
      "Captures complete buyer intent and requirements",
      "Books appointments during initial contact",
      "Prevents competitors from winning the deal",
    ],

    stats: [
      "+47% increase in captured buyers",
      "+38% higher appointment booking",
      "-53% lead loss to competitors",
    ],
  },

  {
    shortTitle: "Objection Handling",
    fullTitle: "Handle Buyer Objections Professionally and Keep Deals Alive",

    audio: "/demo-audios/objection_handling_british.m4a",
    image: "/demo-images/Image9.png",

    description:
      "A buyer hesitating over pricing concerns on a $640,000 property puts a potential $16,000–$19,200 commission at risk of slipping away. When objections are addressed confidently, the property’s value is reinforced, financing options are clarified, and urgency is re-established while interest is still active. Instead of the deal collapsing due to uncertainty or delayed follow-up, the buyer remains engaged and guided forward — significantly increasing the likelihood of converting hesitation into a successful closing.",

    benefits: [
      "Handles pricing and timing objections confidently",
      "Maintains buyer engagement and interest",
      "Prevents deals from falling apart prematurely",
      "Increases overall closing probability",
    ],

    stats: [
      "+23% deal recovery rate",
      "+31% improved trust",
      "+18% higher conversions",
    ],
  },

  {
    shortTitle: "Seller Lead Capture",
    fullTitle: "Capture Seller Leads Automatically and Increase Listing Volume",

    audio: "/demo-audios/Seller Lead Capture_Kuwait.m4a",
    image: "/demo-images/Image10.png",

    description:
      "A homeowner looking to sell an $820,000 property represents a potential $20,500–$24,600 commission opportunity and a valuable addition to your listing inventory. When property details, selling timeline, motivation, and expectations are captured immediately, the listing process begins while the seller’s intent is strongest and commitment is highest. Instead of the seller exploring multiple agencies and listing elsewhere, the consultation is secured early — positioning your agency to win the listing and control a high-value transaction from the start.",

    benefits: [
      "Captures seller intent and property details instantly",
      "Books listing consultations automatically",
      "Expands your property inventory pipeline",
      "Increases listing acquisition success rate",
    ],

    stats: [
      "+34% more listings",
      "+29% faster acquisition",
      "+41% pipeline growth",
    ],
  },

  {
    shortTitle: "Property Recommendation",
    fullTitle: "Recommend the Right Properties Instantly Based on Buyer Needs",

    audio: "/demo-audios/Smart Property Recommendation_British.m4a",
    image: "/demo-images/Image11.png",

    description:
      "A buyer with a $600,000 budget represents a potential $15,000–$18,000 commission opportunity and is more likely to move forward when shown relevant options quickly. When matching properties are presented instantly based on their preferred location, budget, and requirements, engagement increases and decision momentum builds while interest is still fresh. Instead of the buyer continuing their search elsewhere due to slow or generic responses, the opportunity is strengthened early — positioning your agency to guide the buyer toward a successful purchase and closing.",

    benefits: [
      "Matches buyers with relevant properties instantly",
      "Improves buyer engagement and interest",
      "Accelerates purchasing decisions",
      "Increases likelihood of closing",
    ],

    stats: [
      "+36% faster decisions",
      "+27% conversion increase",
      "+42% improved engagement",
    ],
  },

  {
    shortTitle: "Call Transfer to Agent",
    fullTitle:
      "Transfer Qualified Calls Directly to Agents at the Perfect Moment",

    audio: "/demo-audios/Transfer Call_English.m4a",
    image: "/demo-images/Image12.png",

    description:
      "A qualified buyer with a $950,000 budget represents a potential $23,750–$28,500 commission opportunity and is significantly more valuable than unverified inquiries. When their budget, purchase timeline, and intent are clearly confirmed before agent involvement, conversations become more focused, productive, and conversion-driven. Instead of agents spending time on low-intent callers, only serious, ready-to-close prospects reach your team — maximizing efficiency and increasing the likelihood of securing high-value deals.",

    benefits: [
      "Transfers only serious, qualified buyers",
      "Protects agent time from low-intent callers",
      "Increases agent productivity and efficiency",
      "Improves closing success rates",
    ],

    stats: [
      "+28% higher agent productivity",
      "+19% higher closing rate",
      "-46% wasted agent time",
    ],
  },
];

export default function CallRecordingSection() {
  const [activeRecording, setActiveRecording] = useState(null);
  const audioRef = useRef(null);

  function openRecording(recording) {
    setActiveRecording(recording);
  }

  function closeRecording() {
    if (audioRef.current) audioRef.current.pause();
    setActiveRecording(null);
  }

  return (
    <section className="call-recordings-section">
      <div className="call-recordings-intro">
        <h2>See How Every Call Becomes a Revenue Opportunity</h2>

        <p>
          These examples demonstrate how buyer and seller inquiries are handled
          — capturing intent, qualifying opportunities, and moving prospects
          toward closing automatically. Each scenario reflects real revenue
          opportunities that most agencies miss due to delayed response or
          missed calls.
        </p>
      </div>

      <div className="recordings-grid">
        {recordings.map((rec, index) => (
          <motion.div
            key={index}
            className="recording-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            onClick={() => openRecording(rec)}
          >
            <div className="recording-image-wrapper">
              <img src={rec.image} alt={rec.shortTitle} />

              <div className="play-overlay">
                <div className="play-button">▶</div>
              </div>
            </div>

            <div className="recording-info">
              <h3>{rec.shortTitle}</h3>

              <button className="watch-btn">Play Recording</button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeRecording && (
          <motion.div
            className="recording-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeRecording}
          >
            <motion.div
              className="recording-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activeRecording.image} className="modal-image" />

              <h3 className="modal-title">{activeRecording.fullTitle}</h3>

              <audio
                key={activeRecording.audio}
                ref={audioRef}
                controls
                autoPlay
                className="modal-audio"
              >
                <source src={activeRecording.audio} type="audio/mpeg" />
              </audio>

              <p className="modal-description">{activeRecording.description}</p>

              <div className="modal-benefits">
                {activeRecording.benefits.map((b, i) => (
                  <div key={i} className="benefit-item">
                    ✓ {b}
                  </div>
                ))}
              </div>

              <div className="modal-stats">
                {activeRecording.stats.map((s, i) => (
                  <div key={i} className="stat-item">
                    {s}
                  </div>
                ))}
              </div>

              <button className="close-btn" onClick={closeRecording}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
