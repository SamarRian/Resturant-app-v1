export async function getAllProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/product/all");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function createProduct(data) {
  try {
    const res = await fetch("http://localhost:5000/api/product/post", {
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
    const res = await fetch(`http://localhost:5000/api/product/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Create Product Failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Single product error:", error.message);
    throw error;
  }
}
