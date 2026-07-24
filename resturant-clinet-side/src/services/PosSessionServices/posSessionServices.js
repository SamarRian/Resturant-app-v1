import { API_URL } from "../../../DevData/CONSTANTS";

export async function createSession(startingBalance, notes) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/api/session/open`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ startingBalance, notes }),
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

export async function closeSession(id, endingBalance, notes) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_URL}/api/session/close/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ endingBalance, notes }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to Create sessions");
    }
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function getSingleSession(id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/api/session/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to Get session");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
export async function getWeeklySessions() {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/api/session/sales/weekly`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("posservice ", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to Get session");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
