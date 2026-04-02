// import HeroSection from "../sections/HeroSection";
// import ChatSection from "../sections/ChatSection";
// import ChannelsSection from "../sections/ChannelsSection";
// import VoiceSection from "../sections/VoiceSection";
// import VideoSection from "../sections/VideoSection";
// import CTASection from "../sections/CTASection";
// import CallRecordingSection from "../sections/CallRecordingSection";
// import SocialMediaSection from "../sections/SocialMediaSection";
// import ProcessAutomationSection from "../sections/ProcessAutomationSection";
// import CaseStudySection from "../sections/CaseStudySection";

// const Home = () => {
//   return (
//     <>
//       <HeroSection />
//       <ChatSection />
//       {/* <VoiceSection /> */}
//       <CallRecordingSection />
//       <SocialMediaSection />
//       <ProcessAutomationSection />
//       <ChannelsSection />
//       <VideoSection />
//       <CaseStudySection />
//       <CTASection />
//     </>
//   );
// };

// export default Home;
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "../sections/HeroSection";
import ChatSection from "../sections/ChatSection";
import ChannelsSection from "../sections/ChannelsSection";
import VoiceSection from "../sections/VoiceSection";
import VideoSection from "../sections/VideoSection";
import CTASection from "../sections/CTASection";
import CallRecordingSection from "../sections/CallRecordingSection";
import SocialMediaSection from "../sections/SocialMediaSection";
import ProcessAutomationSection from "../sections/ProcessAutomationSection";
import CaseStudySection from "../sections/CaseStudySection";
import BlogGatewaySection from "../sections/BlogGatewaySection";
import PricingSection from "../sections/PricingSection";

const Home = () => {
  return (
    <>
      <HeroSection />

      <ChatSection />

      {/* <VoiceSection /> */}

      <CallRecordingSection />

      <SocialMediaSection />

      <ProcessAutomationSection />

      <ChannelsSection />

      <VideoSection />

      <BlogGatewaySection />

      {/* Case Study Section */}
      <CaseStudySection />

      <PricingSection />

      <CTASection />
    </>
  );
};

export default Home;
