export async function generateOrder() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/orders/post", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to create Session");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function getOrderByID(orderID) {
  const res = await fetch(`http://localhost:5000/api/orders/get/${orderID}`, {
    method: "GET",
    headers: {},
  });
}
