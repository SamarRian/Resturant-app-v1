export async function getAllStaff() {
  try {
    const res = await fetch("http://localhost:5000/api/staff/all");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch staff");
    }
    console.log("STAFF SERVICES LOGS", data);

    return data;
  } catch (error) {
    console.error("getAllStaff Error:", error.message);
    throw error;
  }
}

export async function createStaff(personName) {
  try {
    const res = await fetch("http://localhost:5000/api/staff/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create staff");
    }

    return data;
  } catch (error) {
    console.error("createStaff Error:", error.message);
    throw error;
  }
}

export async function updateStaffById(id, personName) {
  try {
    const res = await fetch(`http://localhost:5000/api/staff/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personName }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update staff");
    }

    return data;
  } catch (error) {
    console.error("updateStaff Error:", error.message);
    throw error;
  }
}

export async function deleteStaffById(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/staff/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete staff");
    }

    return data;
  } catch (error) {
    console.error("deleteStaff Error:", error.message);
    throw error;
  }
}

export async function getSingleStaff(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/staff/get/${id}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch staff");
    }

    return data;
  } catch (error) {
    console.error("getSingleStaff Error:", error.message);
    throw error;
  }
}

export async function updateStaffStatus(id, status) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/staff/update/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update staff status");
    }

    return data?.data;
  } catch (error) {
    console.error("updateStaffStatus Error:", error.message);
    throw error;
  }
}
