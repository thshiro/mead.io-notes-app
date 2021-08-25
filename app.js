import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as notes from './notes.js'
import * as utils from './utils.js'

const yarg = yargs(hideBin(process.argv))

yarg.version('1.0.0')

// ADD
yarg.command({
    command: 'add',
    describe: '- Add a new note',
    builder: {
        title: {
            describe: '- Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: '- Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const result = notes.addNote(argv.title, argv.body)
        if (result === true) {
            utils.doneMsg()
        }
    }
})

// REMOVE
yarg.command({
    command: 'remove',
    describe: '- Remove a note',
    builder: {
        title: {
            describe: '- Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const result = notes.removeNote(argv.title)
        if (result === true) {
            utils.doneMsg()
        }
    }
})

// LIST
yarg.command({
    command: 'list',
    describe: '- List all notes',
    handler() {
        notes.listNotes()
    }
})

// READ
yarg.command({
    command: 'read',
    describe: '- Read a note',
    builder: {
        title: {
            describe: '- Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.getNote(argv.title)
    }
})

yarg.parse()