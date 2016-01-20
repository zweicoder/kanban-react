import React from 'react';
import Notes from 'Notes';
import NoteStore from 'NoteStore'
import NoteActions from 'NoteActions'
import AltContainer from 'alt-container'

class Lane extends React.Component {
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
                        notes: () => NoteStore.getState().notes || []
                    }}
                >
                    <Notes onEdit={this.editNote} onDelete={this.deleteNote}/>
                </AltContainer >
            </div>
        )
    }

    addNote() {
        NoteActions.create({
            task: 'Sup'
        })
    }

    editNote(id, task) {
        NoteActions.update({id, task})
    }

    deleteNote(id) {
        NoteActions.delete(id)
    }
}

export default Lane