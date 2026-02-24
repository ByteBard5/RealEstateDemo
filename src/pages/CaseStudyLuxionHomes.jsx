import Hero from "../caseStudies/luxionhomes/Hero";
import Introduction from "../caseStudies/luxionhomes/Introduction";
import Problem from "../caseStudies/luxionhomes/Problem";
import Solution from "../caseStudies/luxionhomes/Solution";
import Workflow from "../caseStudies/luxionhomes/Workflow";
import Results from "../caseStudies/luxionhomes/Results";
import Conclusion from "../caseStudies/luxionhomes/Conclusion";
import CTA from "../caseStudies/luxionhomes/CTA";

export default function CaseStudyLuxionHomes() {
  return (
    <div style={{ background: "#020617", color: "white" }}>
      <Hero />
      <Introduction />
      <Problem />
      <Solution />
      <Workflow />
      <Results />
      <Conclusion />
      <CTA />
    </div>
  );
}
