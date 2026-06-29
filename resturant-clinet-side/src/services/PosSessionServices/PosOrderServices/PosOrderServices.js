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

export async function addOrderItems(orderID, orderItems) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/api/order-items/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId: orderID, items: orderItems }),
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

export async function getSingleOrderById(orderId) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch order");
    }
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function updateOrder(orderId, orderData) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `http://localhost:5000/api/orders/update/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update order");
    }
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
