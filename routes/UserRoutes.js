const {
  addNotes,
  getNotes,
  deleteNote,
} = require("../controllers/UserController");

const router = require("express").Router();

router.post("/add", addNotes);
router.get("/notes/:email", getNotes);
router.put("/delete", deleteNote);

module.exports = router;
