export async function createSettings(settingsData) {
  try {
    const res = await fetch("http://localhost:5000/api/settings/post", {
      method: "POST",

      body: settingsData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create settings");
    }

    return data;
  } catch (error) {
    console.error("createSettings Error:", error.message);
    throw error;
  }
}

export async function getAllSettings() {
  try {
    const res = await fetch("http://localhost:5000/api/settings/all");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to create settings");
    }
    console.log("GETSETTINGS LOOGS", data);

    return data;
  } catch (error) {
    console.error("createSettings Error:", error.message);
    throw error;
  }
}

export async function updateSettingsById(id, formData) {
  try {
    const res = await fetch(`http://localhost:5000/api/settings/update/${id}`, {
      method: "PUT",

      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update settings");
    }

    return data;
  } catch (error) {
    console.error("updateSettings Error:", error.message);
    throw error;
  }
}
