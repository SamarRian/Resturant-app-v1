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
      <FormSwitcherProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<HomePage />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products" element={<AllProduct />} />
            </Route>
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignUpForm />} />
          </Routes>
        </BrowserRouter>

        <Toaster />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </FormSwitcherProvider>
    </QueryClientProvider>
  );
}

export default App;
