// app/dashboard/components/InfoCard.tsx
const getGradeColor = (grade: string): string => {
  switch (grade.toUpperCase()) {
    case "A": return "text-green-600";
    case "B": return "text-lime-500";
    case "C": return "text-yellow-500";
    case "D": return "text-orange-500";
    default: return "text-red-500";
  }
};

export const InfoCard: React.FC<{
  title: string;
  value: string | number;
  isGrade?: boolean;
}> = ({ title, value, isGrade }) => {
  const gradeColor = isGrade ? getGradeColor(value as string) : "";
  return (
    <div className="text-center bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-40">
      <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">{title}</p>
      <p className={`text-5xl font-extrabold mt-1 ${isGrade ? gradeColor : "text-indigo-600"}`}>
        {value}
      </p>
    </div>
  );
};