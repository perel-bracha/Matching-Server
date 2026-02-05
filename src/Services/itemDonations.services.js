const db = require("../DB/db.js");

async function getAllItemDonations() {
  const [rows] = await db.query("SELECT * FROM itemDonations");
  return rows;
}

async function getItemDonationById(id) {
  const [rows] = await db.query(
    "SELECT * FROM itemDonations WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function createItemDonation(donation) {
  const { apart_name, item_name } = donation;

  const [result] = await db.query(
    "INSERT INTO itemDonations (apart_name, item_name) VALUES (?, ?)",
    [apart_name, item_name]
  );

  return { id: result.insertId, apart_name, item_name };
}

async function updateItemDonation(id, donation) {
  const { apart_name, item_name } = donation;

  await db.query(
    "UPDATE itemDonations SET apart_name = ?, item_name = ? WHERE id = ?",
    [apart_name, item_name, id]
  );

  return { id, apart_name, item_name };
}

async function deleteItemDonation(id) {
  await db.query("DELETE FROM itemDonations WHERE id = ?", [id]);
}

module.exports = {
  getAllItemDonations,
  getItemDonationById,
  createItemDonation,
  updateItemDonation,
  deleteItemDonation,
};
