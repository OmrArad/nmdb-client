import Toolbar from "../ui/toolbar/toolbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toolbar />
      <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:px-0 pb-0">
          {children}
        </div>
      </div>
    </>
  );
}
