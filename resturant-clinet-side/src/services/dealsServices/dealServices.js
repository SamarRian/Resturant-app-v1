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

export async function updateDealVariation(id, variant) {
  try {
    const res = await fetch(`http://localhost:5000/api/deals/post/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variant),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update deal");
    }

    return await res.json();
  } catch (error) {
    console.error("Update deal error:", error.message);
    throw error;
  }
}

export async function getSingleDeal(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/deals/get/${id}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to get single deal");
    }

    console.log("SERVICES DEALS DATA", data);
    return data;
  } catch (error) {
    console.error("get single deal error:", error.message);
    throw error;
  }
}

export async function deleteDeal(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/deals/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete deal");
    }

    return data;
  } catch (error) {
    console.error("Delete deal error:", error.message);
    throw error;
  }
}

export async function deleteDealVariant(dealId, variantId) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/deals/delete/${dealId}/variant/${variantId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete deal");
    }

    return data;
  } catch (error) {
    console.error("Delete variant error:", error.message);
    throw error;
  }
}
