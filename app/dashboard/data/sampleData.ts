
import { AnalysisData } from "../components/types";
export const seoAnalysisData: AnalysisData = {
  overall_score: 68,
  seo_grade: "D",
  executive_summary:
    "The page has a strong performance foundation and clear content but is hindered by key technical SEO omissions, including a missing canonical tag, no structured data, and a broken social sharing image link.",
  top_three_actions: [
    "Add a self-referencing canonical tag to prevent potential duplicate content issues.",
    "Fix the broken Twitter image URL and convert all social sharing URLs (og:url, og:image) to absolute paths.",
    "Implement Schema.org structured data (e.g., Organization, WebSite) to improve search engine understanding and qualify for rich snippets.",
  ],
  total_issues: 9,
  score_breakdown: {
    "Content & Metadata": 65,
    "Structure & Accessibility": 70,
    "Crawlability & Indexability": 60,
    "Site Performance": 90,
    Linking: 55,
    "HTTPS & Security": 100,
    Markup: 50,
  },
  detailed_report: {
    "Content & Metadata": {
      score: 65,
      issues: [
        {
          issue: "Page title is not descriptive",
          severity: "warning",
          recommendation:
            "Expand the page title beyond just 'FundPe.online'. Include primary keywords and a value proposition, such as 'FundPe | Free AI Pitch Deck Analysis for Founders'.",
        },
        {
          issue: "Open Graph URLs are relative",
          severity: "warning",
          recommendation:
            "Convert the og:image and og:url content values to absolute URLs (e.g., 'https://fundpe.online/fund_logo.jpg') to ensure they are correctly processed by all social platforms.",
        },
      ],
    },
    "Structure & Accessibility": {
      score: 70,
      issues: [
        {
          issue: "Form inputs are missing labels",
          severity: "warning",
          recommendation:
            "Add <label> tags programmatically associated with each form <input> for improved accessibility. Relying solely on placeholders is not sufficient for screen readers.",
        },
        {
          issue: "No images with descriptive alt text",
          severity: "notice",
          recommendation:
            "While the page uses SVGs for icons, consider adding relevant images (e.g., product screenshots, founder photos) with descriptive alt text to capture traffic from image search.",
        },
      ],
    },
    "Crawlability & Indexability": {
      score: 60,
      issues: [
        {
          issue: "Canonical tag is missing",
          severity: "warning",
          recommendation:
            'Implement a self-referencing canonical tag (e.g., <link rel="canonical" href="https://fundpe.online/">) to consolidate indexing signals and prevent duplicate content issues from URL parameters.',
        },
        {
          issue: "Meta robots tag is not specified",
          severity: "notice",
          recommendation:
            'Add a meta robots tag (e.g., <meta name="robots" content="index, follow">) to explicitly instruct search engines on how to crawl and index the page. While this is the default behavior, being explicit is a best practice.',
        },
      ],
    },
    "Site Performance": {
      score: 90,
      issues: [
        {
          issue: "Favicon format is not optimal",
          severity: "notice",
          recommendation:
            "The favicon is a .jpg file. Convert it to a more standard format like .ico, .png, or .svg for better browser compatibility and quality.",
        },
      ],
    },
    Linking: {
      score: 55,
      issues: [
        {
          issue: "Broken image link for Twitter Card",
          severity: "error",
          recommendation:
            "The twitter:image meta tag points to '/fung_logo.jpg', which appears to be a typo of '/fund_logo.jpg'. Correct the filename to fix the broken image when the page is shared on Twitter.",
        },
      ],
    },
    "HTTPS & Security": { score: 100, issues: [] },
    Markup: {
      score: 50,
      issues: [
        {
          issue: "Schema.org structured data is missing",
          severity: "warning",
          recommendation:
            "Implement structured data using JSON-LD. At a minimum, add Organization and WebSite schema to help search engines understand your entity and enable features like sitelinks search boxes.",
        },
      ],
    },
  },
  visualization_data: {
    category_bars: [
      { name: "Content & Metadata", score: 65, color: "hsl(40, 70%, 55%)" },
      {
        name: "Structure & Accessibility",
        score: 70,
        color: "hsl(297, 70%, 55%)",
      },
      {
        name: "Crawlability & Indexability",
        score: 60,
        color: "hsl(343, 70%, 55%)",
      },
      { name: "Site Performance", score: 90, color: "hsl(113, 70%, 55%)" },
      { name: "Linking", score: 55, color: "hsl(160, 70%, 55%)" },
      { name: "HTTPS & Security", score: 100, color: "hsl(57, 70%, 55%)" },
      { name: "Markup", score: 50, color: "hsl(352, 70%, 55%)" },
    ],
    issue_type_donut: [
      { type: "Errors", count: 1, color: "hsl(2, 70%, 55%)" },
      { type: "Warnings", count: 5, color: "hsl(294, 70%, 55%)" },
      { type: "Notices", count: 3, color: "hsl(172, 70%, 55%)" },
    ],
  },
};
