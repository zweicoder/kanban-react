import uuid from 'node-uuid';
import alt from 'Alt';
import NoteActions from 'NoteActions';
import assign from 'object-assign'

class NoteStore {
    constructor() {
        this.bindActions(NoteActions);

        this.notes = [];

        this.exportPublicMethods({
            get: this.get.bind(this)
        })
    }

    create(note) {
        note.id = uuid.v4();
        this.setState({
            notes: [...this.notes, {
                id: note.id,
                task: note.task
            }]
        });

        return note
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

    get(ids) {
        return (ids || [])
            .map((id)=>
                this.notes.find((note) => note.id === id)
            )
            .filter(
                (a) => !!a
            )

    }
}

export default alt.createStore(NoteStore, 'NoteStore')