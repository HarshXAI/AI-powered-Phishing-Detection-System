import { Outlet } from "react-router-dom";
// ... other imports

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Navigation */}
      <div className="flex-1">
        {/* Main content area */}
        <Outlet /> {/* This renders the nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;