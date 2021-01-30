const Note = require('../models/note')

const notes_index = (req, res) => {
    Note.find()
    .then((result) => {
        res.render('notes/index.ejs', {notes: result})
    })
    .catch((error) => {
        console.log(`Error Fetching Data from Database: ${error}`)
    })
}

const load_notes_create = (req, res) => {
    res.render('notes/create_notes.ejs')
}

const save_new_note = (req, res) => {
    const noteDetails = new Note(req.body);
    saveNoteDetailsAndRedirect('save', res, noteDetails, '')
}

const load_one_note = (req, res) => {
    const noteId = req.params.id;
    Note.findById(noteId)
        .then((result) => {
            res.render('notes/note_details.ejs', {note: result})
        })
        .catch((error) => {
            console.log(`Error Fetching Data from Database: ${error}`)
        })
    
}

const load_notes_edit = (req, res) => {
    const noteId = req.params.id;
    Note.findById(noteId)
        .then((result) => {
            res.render('notes/edit_notes.ejs', {note: result})
        })
        .catch((error) => {
            console.log(`Error Fetching Data from Database: ${error}`)
        })
}

const delete_note = (req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.redirect('/')
        })
        .catch((error) => {
            console.log(`Error Deleting Data from Database: ${error}`)
        })
}

const edit_note = (req, res) => {
    const editFormDetails = new Note(req.body)
    Note.findById(req.params.id)
        .then((result) => {
            console.log(`RESULTA NA SA EDIT: ${result}`)
            const editNoteDetailsFromDb = result;
            saveNoteDetailsAndRedirect('edit', res, editNoteDetailsFromDb, editFormDetails )
        })
        .catch((error) => {
            console.log(`Error Fetching Data from Database: ${error}`)
        })
}

function saveNoteDetailsAndRedirect(action, res, noteFormDetails, editNoteDetailsFromDb) {
    if (action === 'edit'){
        noteFormDetails.title = editNoteDetailsFromDb.title
        noteFormDetails.content = editNoteDetailsFromDb.content
    }
    console.log(`Note Form Details: ${noteFormDetails}`)
    //Save Note Data To Database
    noteFormDetails.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((error) => {
            console.log(`Error Saving Data To Database: ${error}`)
        })
}

module.exports = {
    notes_index,
    load_notes_create,
    save_new_note,
    load_one_note,
    load_notes_edit,
    delete_note,
    edit_note
}