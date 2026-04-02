// Create URL-friendly slug from title
export const createSlug = (title) => {
  return title
    ?.toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

// Find blog using slug
export const findBlogBySlug = (blogs, slug) => {
  return blogs.find((blog) => createSlug(blog.title) === slug);
};
