export async function getAllTables() {
  try {
    const res = await fetch("http://localhost:5000/api/tables/all");
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
    const res = await fetch("http://localhost:5000/api/tables/post", {
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
    const res = await fetch(`http://localhost:5000/api/tables/update/${id}`, {
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

export async function deleteTable(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/tables/delete/${id}`, {
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
    const res = await fetch(`http://localhost:5000/api/tables/get/${id}`);

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
