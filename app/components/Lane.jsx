import React from 'react';
import Notes from 'Notes';
import NoteStore from 'NoteStore'
import NoteActions from 'NoteActions'
import AltContainer from 'alt-container'
import LaneActions from 'LaneActions';

class Lane extends React.Component {
    constructor(props) {
        super(props);

        const id = props.lane.id;
        this.addNote = this.addNote.bind(this, id);
        this.deleteNote = this.deleteNote.bind(this, id);
    }

    render() {
        const {lane, ...props} = this.props;

        return (
            <div {...props}>
                <div className="lane-header">
                    <div className="lane-name"> {lane.name}</div>
                    <div className="lane-add-note">
                        <button onClick={this.addNote}>+</button>
                    </div>
                </div>
                <AltContainer
                    stores={[NoteStore]}
                    inject={{
                        notes: () => NoteStore.get(lane.notes)
                    }}
                >
                    <Notes onEdit={this.editNote} onDelete={this.deleteNote}/>
                </AltContainer >
            </div>
        )
    }

    addNote(laneId) {
        const note = NoteActions.create({
            task: 'Sup'
        });

        LaneActions.attachToLane({laneId, noteId: note.id})
    }

    editNote(noteId, task) {
        NoteActions.update({id: noteId, task})
    }

    deleteNote(laneId, noteId) {
        LaneActions.detachFromLane({laneId, noteId});
        NoteActions.delete(noteId)
    }
}

export default Lane