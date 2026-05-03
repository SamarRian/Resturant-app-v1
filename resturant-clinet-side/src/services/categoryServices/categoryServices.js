export async function getAllCategories() {
  try {
    const res = await fetch("http://localhost:5000/api/category/all");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch categories");
    }

    return data;
  } catch (error) {
    console.error("getAllCategories Error:", error.message);
    throw error;
  }
}

export async function createCategory(categoryName) {
  try {
    const res = await fetch("http://localhost:5000/api/category/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create category");
    }

    return data;
  } catch (error) {
    console.error("createCategory Error:", error.message);
    throw error;
  }
}

export async function updateCategoryById(id, categoryName) {
  try {
    const res = await fetch(`http://localhost:5000/api/category/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update category");
    }

    return data;
  } catch (error) {
    console.error("updateCategory Error:", error.message);
    throw error;
  }
}

export async function deleteCategoryById(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/category/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete category");
    }

    return data;
  } catch (error) {
    console.error("deleteCategory Error:", error.message);
    throw error;
  }
}

export async function getSingleCategory(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/category/get/${id}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch category");
    }

    return data;
  } catch (error) {
    console.error("getSingleCategory Error:", error.message);
    throw error;
  }
}
