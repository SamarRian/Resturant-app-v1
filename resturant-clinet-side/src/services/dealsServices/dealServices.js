export async function getAllDeals() {
  try {
    const res = await fetch("http://localhost:5000/api/deals/all");
    const data = await res.json();
    if (!res.ok) return;
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function createDeal(deal) {
  try {
    const res = await fetch("http://localhost:5000/api/deals/post", {
      method: "POST",
      body: deal,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create deal");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Create deal error:", error.message);
    throw error;
  }
}
