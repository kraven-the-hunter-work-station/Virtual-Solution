import ThemeToggle from './ThemeToggle';

export function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-4">Welcome to the admin dashboard.</p>
        
        {/* Theme toggle in top right corner for admin dashboard */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
