import { writeFileSync, readFileSync } from 'fs'
import chalk from 'chalk'

/**
 * List all notes
 */
const listNotes = () => {
    console.log(chalk.inverse.bold('Your notes:'))

    const notes = loadNotes()

    notes.forEach(note => {
        console.log(`- ${note.title}`)
    })
}

/**
 * Get a note by title
 * @param {string} title 
 */
const getNote = title => {
    const notes = loadNotes()

    const selectedNote = notes.find(note => note.title === title)

    if (!selectedNote) {
        const errorMsg = chalk.red.inverse.bold('Note not found. Try again')
        console.log(errorMsg)
        return false
    }

    console.log(chalk.inverse.bold(`- ${selectedNote.title}`))
    console.log(selectedNote.body)
}

/**
 * Add a new note in 'notes.json'
 * @param {string} title 
 * @param {string} body 
 * @returns boolean
 */
const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicatedNote = notes.find(note => note.title === title)

    if (duplicatedNote) {
        const errorMsg = chalk.red.inverse.bold('This title is already in use. Try again')
        console.log(errorMsg)
        return false
    }

    notes.push({
        title,
        body
    })

    saveNotes(notes)

    return true
}

/**
 * Remove a note in 'notes.json'
 * @param {string} title 
 * @returns boolean
 */
const removeNote = (title) => {
    const notes = loadNotes()

    const noteExists = notes.find(note => note.title === title)

    if (!noteExists) {
        const errorMsg = chalk.red.inverse.bold('Note not found. Try again')
        console.log(errorMsg)
        return false
    }

    const newNotes = notes.filter(note => note.title !== title)

    saveNotes(newNotes)

    return true
}

/**
 * Save the new note content in 'notes.json'
 * @param {object} notes 
 */
const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    writeFileSync('notes.json', dataJSON)
}

/**
 * Load 'notes.jon' and return as object
 * @returns object|array
 */
const loadNotes = () => {
    try {
        const dataJSON = readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

export {
    listNotes,
    addNote,
    removeNote,
    getNote
}