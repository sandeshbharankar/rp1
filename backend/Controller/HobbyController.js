// HobbyController.js
import express from "express";
import Hobby from "../Model/HobbyModel.js";

const router = express.Router();

// Save user with hobbies
router.post("/add", async (req, res) => {
  try {
    const { name, hobbies } = req.body;
    const newUser = new Hobby({ name, hobbies });
    await newUser.save();
    res.json({ message: "Hobbies saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error while saving hobbies" });
  }
});

// Find people with at least one matching hobby
router.get("/find-similar/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const currentUser = await Hobby.findOne({ name });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const similarPeople = await Hobby.find({
      name: { $ne: name }, // exclude the current user
      hobbies: { $in: currentUser.hobbies } // at least one matching hobby
    });

    if (similarPeople.length === 0) {
      return res.json({ message: "No people matching your hobby." });
    }

    // Create detailed match information with matched hobbies
    const matchDetails = similarPeople.map(person => {
      const matchedHobbies = person.hobbies.filter(hobby => 
        currentUser.hobbies.includes(hobby)
      );
      return {
        name: person.name,
        matchedHobbies: matchedHobbies
      };
    });

    res.json({
      message: "People with similar hobbies found!",
      matches: matchDetails
    });
  } catch (error) {
    res.status(500).json({ error: "Error finding similar hobbies" });
  }
});

export default router;
