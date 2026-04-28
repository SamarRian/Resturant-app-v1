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
    if (!res.ok) return;
    const data = await res.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
