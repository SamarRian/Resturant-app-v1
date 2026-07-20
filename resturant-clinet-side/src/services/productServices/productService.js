import { API_URL } from "../../../DevData/CONSTANTS";

export async function getAllProducts() {
  try {
    const res = await fetch(`${API_URL}/api/product/all`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function createProduct(data) {
  try {
    const res = await fetch(`${API_URL}/api/product/post`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Create Product Failed");
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Create product error:", error.message);
    throw error;
  }
}

export async function getSingleProduct(id) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${API_URL}/api/product/${id}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch product (Status: ${res.status})`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout for product:", id);
      throw new Error("Request timeout - server took too long to respond");
    }
    console.error("Single product error:", error.message);
    throw error;
  }
}
