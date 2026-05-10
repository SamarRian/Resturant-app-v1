import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/loginForm";
import HomePage from "./pages/Home";
import SignUpForm from "./pages/signUp";
import AddProduct from "./pages/AddProduct";

import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./components/features/ProtectedRoute";
import Layout from "./components/features/Layout";
import AllProduct from "./pages/AllProducts";
import { FormSwitcherProvider } from "./context/FormSwitcherProvider";
import AllDeals from "./pages/AllDeals";
import Table from "./pages/Table";
import Staff from "./pages/Staff";
import Category from "./pages/Category";
import Settings from "./pages/Settings";
import Pos from "./pages/Pos";
import PosProvider from "./context/PosContext/PosProvider";
import Vehical from "./pages/Vehical";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PosProvider>
        <FormSwitcherProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<HomePage />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products" element={<AllProduct />} />
                <Route path="deals" element={<AllDeals />} />
                <Route path="table" element={<Table />} />
                <Route path="staff" element={<Staff />} />
                <Route path="vehical" element={<Vehical />} />
                <Route path="category" element={<Category />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="login" element={<LoginForm />} />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="pos" element={<Pos />} />
            </Routes>
          </BrowserRouter>

          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </FormSwitcherProvider>
      </PosProvider>
    </QueryClientProvider>
  );
}

export default App;
