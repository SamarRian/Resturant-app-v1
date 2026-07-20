import { API_URL } from "../../../DevData/CONSTANTS";

export async function getAllTables() {
  try {
    const res = await fetch(`${API_URL}/api/tables/all`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete deal");
    }
    return data;
  } catch (error) {
    console.error("getTable Error error:", error.message);
    throw error;
  }
}

export async function createTable(tableName) {
  try {
    const res = await fetch(`${API_URL}/api/tables/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create table");
    }

    return data;
  } catch (error) {
    console.error("createTable Error:", error.message);
    throw error;
  }
}

export async function updateTableById(id, tableName) {
  console.log("UDPATETABLE id", id);
  try {
    const res = await fetch(`${API_URL}/api/tables/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update table");
    }

    return data;
  } catch (error) {
    console.error("updateTable Error:", error.message);
    throw error;
  }
}
export async function updateTableStatusById(id, status) {
  console.log("UDPATETABLE id", id);
  try {
    const res = await fetch(`${API_URL}/api/tables/update/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update table status");
    }

    return data;
  } catch (error) {
    console.error("updateTableStatus Error:", error.message);
    throw error;
  }
}

export async function deleteTable(id) {
  try {
    const res = await fetch(`${API_URL}/api/tables/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete table");
    }

    return data;
  } catch (error) {
    console.error("deleteTable Error:", error.message);
    throw error;
  }
}

export async function getSingleTable(id) {
  try {
    const res = await fetch(`${API_URL}/api/tables/get/${id}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch table");
    }

    return data;
  } catch (error) {
    console.error("getSingleTable Error:", error.message);
    throw error;
  }
}
