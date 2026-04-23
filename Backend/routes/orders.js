const express = require("express");
const db = require("../firebase/firebase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const phone = req.query.phone;
    const limit = Math.min(Number(req.query.limit) || 20, 50);
    let query = db.collection("orders").orderBy("createdAt", "desc").limit(limit);

    if (phone) {
      query = query.where("customer.phone", "==", phone);
    }

    const snapshot = await query.get();
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { customer, items, totals, notes } = req.body;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return res
        .status(400)
        .json({ error: "Customer name, phone, and address are required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "At least one order item is required" });
    }

    const orderPayload = {
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || "",
        address: customer.address,
      },
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category || item.type || "General",
        unitPrice: Number(item.unitPrice ?? item.price ?? 0),
        quantity: Number(item.quantity ?? 1),
        lineTotal: Number(
          item.lineTotal ??
            (Number(item.unitPrice ?? item.price ?? 0) * Number(item.quantity ?? 1))
        ),
        metadata: item.metadata || {},
      })),
      totals: {
        subtotal: Number(totals?.subtotal ?? 0),
        deliveryFee: Number(totals?.deliveryFee ?? 0),
        grandTotal: Number(totals?.grandTotal ?? 0),
      },
      notes: notes || "",
      status: "PLACED",
      source: "web",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection("orders").add(orderPayload);
    return res.status(201).json({ id: docRef.id, ...orderPayload });
  } catch (error) {
    console.error("Failed to place order:", error);
    return res.status(500).json({ error: "Failed to place order" });
  }
});

module.exports = router;
