import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import CaseStudyJawitz from "./pages/CaseStudyJawitz";
import CaseStudyLuxionHomes from "./pages/CaseStudyLuxionHomes";
import CaseStudyConversionEngine from "./pages/CaseStudyConversionEngine";

import BlogPage from "./pages/BlogPage"; // ✅ NEW

import SingleBlog from "./pages/SingleBlog";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Case Study Section link (scrolls to section) */}
        <Route path="/case-study" element={<Home />} />

        {/* =========================
        BLOG ROUTES
        ========================= */}

        {/* Blog Listing Page */}
        <Route path="/blog" element={<BlogPage />} />

        {/* Single Blog Page (we’ll build next) */}
        <Route path="/blog/:slug" element={<SingleBlog />} />

        {/* =========================
        CASE STUDIES
        ========================= */}

        {/* Case Study 1 — Cape Town */}
        <Route
          path="/case-study/capetown-real-estate"
          element={<CaseStudyJawitz />}
        />

        {/* Case Study 2 — New York */}
        <Route
          path="/case-study/newyork-salesforce-automation"
          element={<CaseStudyLuxionHomes />}
        />

        {/* Case Study 3 — Conversion Engine */}
        <Route
          path="/case-study/real-estate-conversion-engine"
          element={<CaseStudyConversionEngine />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
