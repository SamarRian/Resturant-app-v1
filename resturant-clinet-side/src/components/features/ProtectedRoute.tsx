import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWZmZDI0YzY4MzRiYWNiYTg2NWZkOCIsImlhdCI6MTc4NDY3NTYyMCwiZXhwIjoxNzg1MjgwNDIwfQ.S3rGkskz4qWFVS4asZs-sxuoTI4H54o0wiooPI4MyuU
