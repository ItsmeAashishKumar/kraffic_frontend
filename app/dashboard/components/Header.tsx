// app/dashboard/components/Header.tsx
export const Header: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => (
  <header
    className={`fixed top-0 right-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 transition-all duration-300`}
    style={{ left: isCollapsed ? "5rem" : "16rem" }}
  >
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500">User Name</span>
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
        UN
      </div>
    </div>
  </header>
);