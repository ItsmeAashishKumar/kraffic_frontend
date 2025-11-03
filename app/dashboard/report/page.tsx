// app/dashboard/report/page.tsx
import { SEOAnalysisDashboard } from "../components/SEOAnalysisDashboard";
import { seoAnalysisData } from "../data/sampleData";

export default function ReportPage() {
  return <SEOAnalysisDashboard analysis={seoAnalysisData} />;
}