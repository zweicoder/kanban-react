import uuid from 'node-uuid';
import alt from 'Alt';
import NoteActions from 'NoteActions';
import assign from 'object-assign'

class NoteStore {
    constructor() {
        this.bindActions(NoteActions);

        this.notes = []
    }

    create(note) {
        this.setState({
            notes: [...this.notes, {
                id: uuid.v4(),
                task: note.task
            }]
        })
    }

    update({id, task}) {
        const notes = this.notes.map((note)=> {
            return note.id === id ? {id, task} : note
        });

        this.setState({notes});
    }

    delete(id) {
        const notes = this.notes.filter((note)=> {
            return note.id !== id
        });

        this.setState({notes})
    }
}

export default alt.createStore(NoteStore, 'NoteStore')