import React from 'react';
import Notes from 'Notes';
import NoteStore from 'NoteStore'
import NoteActions from 'NoteActions'
import AltContainer from 'alt-container'
import LaneActions from 'LaneActions';
import Editable from 'Editable'

class Lane extends React.Component {
    constructor(props) {
        super(props);

        const id = props.lane.id;
        this.addNote = this.addNote.bind(this, id);
        this.deleteNote = this.deleteNote.bind(this, id);
        this.editName = this.editName.bind(this, id);
        this.onLaneNameClick = this.onLaneNameClick.bind(this, id);
    }

    render() {
        const {lane, ...props} = this.props;

        return (
            <div {...props}>
                <div className="lane-header">
                    <Editable
                        className="lane-name"
                        onEdit={this.editName}
                        onValueClick={this.onLaneNameClick}
                        value={lane.name}
                        editing={lane.editing}
                    />
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
                    <Notes
                        onEdit={this.editNote}
                        onDelete={this.deleteNote}
                        onValueClick={this.onNoteClick}
                    />
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
        NoteActions.update({id: noteId, task, editing: false})
    }

    deleteNote(laneId, noteId) {
        LaneActions.detachFromLane({laneId, noteId});
        NoteActions.delete(noteId)
    }

    onNoteClick(id) {
        NoteActions.update({id, editing: true})
    }

    onLaneNameClick(id) {
        LaneActions.update({id, editing: true})
    }

    editName(id, name) {
        if (name) {
            LaneActions.update({id, name, editing: false})
        }
        else {
            LaneActions.delete(id);
        }
    }
}

export default Lane