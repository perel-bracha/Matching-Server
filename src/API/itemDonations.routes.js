const express = require("express");
const router = express.Router();
const itemDonationService = require("../Services/itemDonations.services.js");

router.get("/", async (req, res) => {
  try {
    const donations = await itemDonationService.getAllItemDonations();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const donation = await itemDonationService.getItemDonationById(
      req.params.id
    );
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const donation = req.body;

    if (!donation.apart_name || !donation.item_name) {
      return res.status(400).json({ error: "חסרים שדות חובה" });
    }

    const newDonation =
      await itemDonationService.createItemDonation(donation);

    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedDonation =
      await itemDonationService.updateItemDonation(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await itemDonationService.deleteItemDonation(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
