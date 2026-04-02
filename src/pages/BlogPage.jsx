// ==========================================================================================
// BLOG PAGE — BlogPage.jsx
// ==========================================================================================

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { createSlug } from "../utils/blogUtils";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyTG_iiJY2lVkhWb5cbVFydhQKg3MWBETuOVRMmyA4UuYNFBRfSwTNXs1x23lweYA0/exec";

// ==========================================================================================
// ANIMATION VARIANTS
// ==========================================================================================
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.13, ease: "easeOut" },
  }),
};

const heroVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ==========================================================================================
// MAIN COMPONENT
// ==========================================================================================
export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // ── Data Fetch ──────────────────────────────────────────────────────────────
  useEffect(() => {
    axios.get(WEB_APP_URL).then((res) => {
      const data = res.data;
      setBlogs(data);
      setFilteredBlogs(data);

      const extracted = data.map((b) => b.category?.trim()).filter((c) => c);
      setCategories(["All", ...new Set(extracted)]);
    });
  }, []);

  // ── Filter Logic ─────────────────────────────────────────────────────────────
  const filterBlogs = (query, category) => {
    let filtered = blogs;

    if (category !== "All") {
      filtered = filtered.filter(
        (b) =>
          b.category?.toLowerCase().trim() === category.toLowerCase().trim(),
      );
    }

    if (query.trim() !== "") {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.subtitle?.toLowerCase().includes(q) ||
          b.content?.toLowerCase().includes(q),
      );
    }

    setFilteredBlogs(filtered);
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    filterBlogs(searchQuery, cat);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    filterBlogs(val, selectedCategory);
  };

  // ==========================================================================================
  // RENDER
  // ==========================================================================================
  return (
    <section className="blog-page">
      {/* ── Background Orbs ─────────────────────────────────────────── */}
      <div className="blog-orb blog-orb--tl" aria-hidden="true" />
      <div className="blog-orb blog-orb--br" aria-hidden="true" />

      <div className="blog-page-container">
        {/* ── Back Button ─────────────────────────────────────────────── */}
        <motion.button
          className="blog-back-btn"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -4 }}
        >
          ← Back to Home
        </motion.button>

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <motion.div
          className="blog-hero"
          variants={heroVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow label */}
          <div className="blog-eyebrow">Strategic Intelligence</div>

          <h1 className="blog-hero__heading">
            Insights That Build
            <br />
            <span className="blog-hero__accent">Real Pipeline</span>
          </h1>

          <p className="blog-hero__body">
            Actionable systems, automation playbooks, and deal-velocity
            frameworks — built for operators who treat growth as infrastructure,
            not guesswork.
          </p>
        </motion.div>

        {/* ── Search ──────────────────────────────────────────────────── */}
        <motion.div
          className="blog-search-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="blog-search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="text"
            placeholder="Search playbooks, strategies, systems…"
            value={searchQuery}
            onChange={handleSearch}
            className="blog-search"
            aria-label="Search blogs"
          />
        </motion.div>

        {/* ── Category Chips ──────────────────────────────────────────── */}
        <motion.div
          className="category-chips"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={i}
              onClick={() => handleCategory(cat)}
              className={`category-chip${selectedCategory === cat ? " active" : ""}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Empty State ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {filteredBlogs.length === 0 && (
            <motion.p
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No playbooks found. Adjust your search or filter to explore more.
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Blog Grid ───────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            className="blog-grid"
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              >
                <Link
                  to={`/blog/${createSlug(blog.title)}`}
                  className="blog-card"
                  aria-label={`Read: ${blog.title}`}
                >
                  {/* Top gradient line */}
                  <div className="blog-card__topline" aria-hidden="true" />

                  {/* Date + Category row */}
                  <div className="blog-card__meta">
                    <span className="blog-card-date">
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {blog.category && (
                      <span className="blog-card-category">
                        {blog.category}
                      </span>
                    )}
                  </div>

                  <h3 className="blog-card__title">{blog.title}</h3>

                  <p className="blog-card__subtitle">{blog.subtitle}</p>

                  <span className="blog-card__cta">Read Playbook →</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
// ==========================================================================================
// BLOG PAGE END
// ==========================================================================================
