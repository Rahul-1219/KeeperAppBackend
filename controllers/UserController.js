const User = require("../models/UserModel");
const mongooseConnect = require("../connection/mongooseConnect.js");

module.exports.addNotes = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { notes } = user;
      await User.findByIdAndUpdate(
        user._id,
        {
          notes: [...notes, data],
        },
        { new: true }
      );
    } else {
      await User.create({ email, notes: [data] });
    }
    return res.json({ msg: "Note successfully added to notes list." });
  } catch (error) {
    return res.json({ msg: "Error adding note to the notes list" });
  }
};

module.exports.getNotes = async (req, res) => {
  try {
    let conn = await mongooseConnect();

    const { email } = req.params;
    const user = await User.findOne({ email: email });

    if (user) {
      res.json({
        msg: "Success",
        notes: user.notes,
      });
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
module.exports.deleteNote = async (req, res) => {
  try {
    const { email, noteId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { notes } = user;
      const noteIndex = notes.findIndex((element) => {
        const elementId = element._id.toString();
        return elementId === noteId;
      });

      notes.splice(noteIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          notes: notes,
        },
        { new: true }
      );
      return res.send(notes);
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    return res.json({ msg: "Error while deleting notes" });
  }
};
