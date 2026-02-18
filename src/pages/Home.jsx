import HeroSection from "../sections/HeroSection";
import ChatSection from "../sections/ChatSection";
import ChannelsSection from "../sections/ChannelsSection";
import VoiceSection from "../sections/VoiceSection";
import VideoSection from "../sections/VideoSection";
import CTASection from "../sections/CTASection";
import CallRecordingSection from "../sections/CallRecordingSection";
import SocialMediaSection from "../sections/SocialMediaSection";
import ProcessAutomationSection from "../sections/ProcessAutomationSection";

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
      <CTASection />
    </>
  );
};

export default Home;
