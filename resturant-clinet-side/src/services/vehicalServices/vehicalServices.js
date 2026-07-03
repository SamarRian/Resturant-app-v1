export async function getAllVehicals() {
  try {
    const res = await fetch("http://localhost:5000/api/vehical/all");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to get vehical");
    }

    return data?.data;
  } catch (error) {
    console.error("getVehical Error error:", error.message);
    throw error;
  }
}
export async function createVehical(vehicalNumber) {
  try {
    const res = await fetch("http://localhost:5000/api/vehical/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vehicalNumber }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create vehical");
    }

    return data?.data;
  } catch (error) {
    console.error("createVehical Error:", error.message);
    throw error;
  }
}

export async function updateVehical(id, updateData) {
  try {
    const res = await fetch(`http://localhost:5000/api/vehical/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update vehical");
    }

    return data?.data;
  } catch (error) {
    console.error("updateVehical Error:", error.message);
    throw error;
  }
}

export async function deleteVehical(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/vehical/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete vehical");
    }

    return data?.data;
  } catch (error) {
    console.error("deleteVehical Error:", error.message);
    throw error;
  }
}

export async function getSingleVehical(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/vehical/get/${id}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to get vehical");
    }

    console.log("GET SINGLE VEHICAL", data.data);
    return data?.data;
  } catch (error) {
    console.error("getSingleVehical Error:", error.message);
    throw error;
  }
}
