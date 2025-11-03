// app/dashboard/components/types.ts
export interface Issue {
  issue: string;
  severity: "error" | "warning" | "notice";
  recommendation: string;
}

export interface CategoryReport {
  score: number;
  issues: Issue[];
}

export interface VisualizationData {
  category_bars: Array<{ name: string; score: number; color: string }>;
  issue_type_donut: Array<{ type: string; count: number; color: string }>;
}

export interface AnalysisData {
  overall_score: number;
  seo_grade: string;
  executive_summary: string;
  top_three_actions: string[];
  total_issues: number;
  score_breakdown: Record<string, number>;
  detailed_report: Record<string, CategoryReport>;
  visualization_data: VisualizationData;
}