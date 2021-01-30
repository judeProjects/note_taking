const express = require('express');
const notesController = require('../controller/notesController.js');

const router = express.Router();

// FETCH ALL DATA FROM DATABASE
router.get('/', notesController.notes_index)

// SAVE DATA TO DATABASE
router.post('/', notesController.save_new_note)

// LOAD NOTES CREATE PAGE
router.get('/create', notesController.load_notes_create)

// GET ONE NOTE based from ID
router.get("/:id", notesController.load_one_note)

// LOAD EDIT PAGE
router.get('/edit/:id', notesController.load_notes_edit)

// EDIT NOTES = method put
router.put('/:id', notesController.edit_note)

// DELETE NOTES = method delete
router.delete('/:id', notesController.delete_note)


module.exports = router