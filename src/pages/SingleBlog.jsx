import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { findBlogBySlug } from "../utils/blogUtils";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyTG_iiJY2lVkhWb5cbVFydhQKg3MWBETuOVRMmyA4UuYNFBRfSwTNXs1x23lweYA0/exec";

/* ============================================================
   SINGLE BLOG PAGE
   ============================================================ */
const SingleBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(WEB_APP_URL).then((res) => {
      const blogs = res.data;
      const matchedBlog = findBlogBySlug(blogs, slug);
      setBlog(matchedBlog);
      setLoading(false);
    });
  }, [slug]);

  /* ── LOADING STATE ── */
  if (loading) {
    return (
      <div className="single-loading">
        <div className="single-loading__inner">
          <div className="single-loading__spinner"></div>
          <p className="single-loading__text">Loading insight…</p>
        </div>
      </div>
    );
  }

  /* ── NOT FOUND STATE ── */
  if (!blog) {
    return (
      <div className="single-loading">
        <motion.div
          className="not-found"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="sb-eyebrow-pill">404 — Not Found</span>
          <h2>This article doesn't exist</h2>
          <p>It may have been moved or is no longer available.</p>
          <button className="back-btn" onClick={() => navigate("/blog")}>
            ← Back to Blog
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── MAIN RENDER ── */
  return (
    <AnimatePresence>
      <section className="cs-section single-blog-page">

        {/* ── BACKGROUND ORBS ── */}
        <div className="sb-orb sb-orb--tl" aria-hidden="true"></div>
        <div className="sb-orb sb-orb--br" aria-hidden="true"></div>

        {/* ── GRID BACKGROUND ── */}
        <div className="cs-grid-bg" aria-hidden="true"></div>

        {/* ── PARTICLES ── */}
        <div className="cs-particles" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="cs-container">

          {/* ── BACK BUTTON ── */}
          <motion.button
            className="back-btn"
            onClick={() => navigate("/blog")}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -4 }}
          >
            ← Back to Blog
          </motion.button>

          {/* ── HEADER ── */}
          <motion.div
            className="cs-section-header sb-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Eyebrow pill */}
            <div className="sb-eyebrow-pill">
              <span>Deep Dive</span>
            </div>

            {/* Title */}
            <h1 className="cs-section-title sb-title">
              {blog.title}
            </h1>

            {/* Subtitle */}
            {blog.subtitle && (
              <p className="sb-subtitle">{blog.subtitle}</p>
            )}

            {/* Meta */}
            <div className="sb-meta">
              {blog.author && (
                <span className="sb-meta__author">By {blog.author}</span>
              )}
              <span className="sb-meta__divider">•</span>
              <span className="sb-meta__date">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

          </motion.div>

          {/* ── BODY ── */}
          <div className="cs-intro-body">

            {/* LEFT SPINE */}
            <div className="cs-intro-spine" aria-hidden="true"></div>

            {/* CONTENT */}
            <motion.div
              className="cs-intro-content blog-content"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
            >
              {/* MAIN HTML CONTENT */}
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />

              {/* HIGHLIGHT BOX */}
              <motion.div
                className="cs-intro-highlight sb-highlight"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Top gradient line */}
                <div className="sb-highlight__topline" aria-hidden="true"></div>

                <div className="cs-highlight-glow" aria-hidden="true"></div>

                <p>
                  <span className="cs-highlight-strong">
                    We help teams turn insights into scalable execution.
                  </span>
                  <br />
                  If this gave you a new perspective, imagine what a fully
                  automated, ROI-driven system could compound for your pipeline.
                </p>
              </motion.div>

            </motion.div>
          </div>
          {/* ── BODY END ── */}

        </div>
      </section>
    </AnimatePresence>
  );
};

export default SingleBlog;