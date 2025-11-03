// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Plus,
  Code2,
  ArrowRight,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import api from "@/api";

/* -------------------------------------------------
   Types – now include status & snippetId
------------------------------------------------- */
interface Website {
  id: string;
  name: string;
  url: string;
  status: "pending" | "active" | "inactive";
  snippetId: string;
  isActive: boolean; // derived from status === "active"
}

/* -------------------------------------------------
   Component
------------------------------------------------- */
export default function DashboardHome() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  /* ------------------------------------------------------------------
     Fetch all websites from API
  ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchWebsites = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        toast.error("Please log in to view websites");
        setFetching(false);
        return;
      }

      try {
        setFetching(true);
        const response = await api.get("/api/websites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("GET /api/websites response:", response);

        const fetchedSites = response.data?.data || response.data || [];

        const formatted: Website[] = fetchedSites.map((site: any) => {
          const domain = new URL(site.url).hostname;
          const status = (site.status || "pending").toLowerCase() as "pending" | "active" | "inactive";

          return {
            id: site._id || site.id,
            name: domain,
            url: site.url,
            status,
            snippetId: site.snippetId || "",
            isActive: status === "active",
          };
        });

        setWebsites(formatted);
      } catch (err: any) {
        console.error("Failed to fetch websites:", err);
        toast.error(err.response?.data?.message || "Failed to load websites");
      } finally {
        setFetching(false);
      }
    };

    fetchWebsites();
  }, []);

  /* ------------------------------------------------------------------
     Persist to localStorage (optional fallback)
  ------------------------------------------------------------------ */
  useEffect(() => {
    if (websites.length > 0) {
      localStorage.setItem("websites", JSON.stringify(websites));
    }
  }, [websites]);

  /* ------------------------------------------------------------------
     Add website
  ------------------------------------------------------------------ */
  const handleAddWebsite = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("_id");
    if (!token || !user_id) {
      toast.error("You are not logged in");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Adding website…");

    try {
      const response = await api.post(
        "/api/websites",
        { userId: user_id, url: url.trim(), snippetId: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newSite = response.data?.data || response.data;
      const domain = new URL(newSite.url).hostname;

      const siteForUI: Website = {
        id: newSite._id || Date.now().toString(),
        name: domain,
        url: newSite.url,
        status: newSite.status || "pending",
        snippetId: newSite.snippetId || "",
        isActive: (newSite.status || "pending") === "active",
      };

      setWebsites((prev) => [...prev, siteForUI]);
      toast.success("Website added!", { id: toastId });

      setUrl("");
      setIsModalOpen(false);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to add website";
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------
     Toggle active (optional – updates UI only)
  ------------------------------------------------------------------ */
  const toggleActive = (id: string) => {
    setWebsites((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isActive: !w.isActive, status: w.isActive ? "inactive" : "active" }
          : w
      )
    );
  };

  /* ------------------------------------------------------------------
     Copy snippet script
  ------------------------------------------------------------------ */
  const handleCopySnippet = (snippetId: string) => {
    if (!snippetId) {
      toast.error("Snippet ID missing");
      return;
    }

    const baseUrl = "https://ktraffic-backend.onrender.com";
    const script = `(function() {
  const config = { id: '${snippetId}', url: '${baseUrl}', delay: 1500, retries: 3 };
  const cleanHtml = () => {
    let html = document.documentElement.outerHTML;
    html = html.replace(/<script[^>]*>[\\s\\S]*?<\\/script>/gi, '');
    html = html.replace(/<style[^>]*>[\\s\\S]*?<\\/style>/gi, '');
    return html.trim();
  };
  const capture = (attempt = 1) => {
    if (attempt > config.retries) return;
    fetch(\`\${config.url}/api/capture\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Snippet-ID': config.id },
      body: JSON.stringify({
        snippetId: config.id,
        url: location.href,
        html: cleanHtml(),
        title: document.title,
        metadata: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          referrer: document.referrer,
          viewport: window.innerWidth + 'x' + window.innerHeight
        }
      })
    })
    .then(res => res.json())
    .then(data => console.log('HTML captured:', data))
    .catch(err => {
      console.error('Capture failed:', err);
      setTimeout(() => capture(attempt + 1), 1000 * attempt);
    });
  };
  setTimeout(capture, config.delay);
})();`;

    navigator.clipboard
      .writeText(script)
      .then(() => toast.success("Snippet copied! Paste it into your site."))
      .catch(() => toast.error("Failed to copy snippet."));
  };

  /* ------------------------------------------------------------------
     UI
  ------------------------------------------------------------------ */
  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Traffic Here</h1>
          <p className="text-gray-600">Monitor and manage your website traffic sources</p>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Website
          </button>
        </div>

        {/* Loading */}
        {fetching && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <span className="ml-3 text-gray-600">Loading websites...</span>
          </div>
        )}

        {/* Grid */}
        {!fetching && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {websites.map((site) => (
              <div
                key={site.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">{site.name}</h3>
                  <button
                    onClick={() => toggleActive(site.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition ${
                      site.isActive ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {site.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    <span
                      className={
                        site.status === "pending"
                          ? "text-orange-600"
                          : site.isActive
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    >
                      {site.status === "pending"
                        ? "Pending"
                        : site.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleCopySnippet(site.snippetId)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    title="Copy Snippet"
                  >
                    <Code2 className="w-5 h-5" />
                  </button>

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                  >
                    Redirect
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!fetching && websites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No websites added yet. Click “Add Website” to get started.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/90 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Website</h2>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none mb-4"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setUrl("");
                }}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWebsite}
                disabled={loading || !url.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Add Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}