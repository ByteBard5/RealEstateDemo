import Hero from "../caseStudies/conversionEngine/Hero";
import Introduction from "../caseStudies/conversionEngine/Introduction";
import Problem from "../caseStudies/conversionEngine/Problem";
import Solution from "../caseStudies/conversionEngine/Solution";
import SystemArchitecture from "../caseStudies/conversionEngine/SystemArchitecture";
import Results from "../caseStudies/conversionEngine/Results";
import Conclusion from "../caseStudies/conversionEngine/Conclusion";
import CTA from "../caseStudies/conversionEngine/CTA";

export default function CaseStudyConversionEngine() {
  return (
    <div
      style={{
        background: "#020617",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Hero />

      <Introduction />

      <Problem />

      <Solution />

      <SystemArchitecture />

      <Results />

      <Conclusion />

      <CTA />
    </div>
  );
}
