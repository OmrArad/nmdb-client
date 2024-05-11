import UserDashboard from "../components/dashboard/userDashboard";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <UserDashboard />
      {children}
    </div>
  );
}
