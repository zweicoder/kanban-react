import React from 'react';
import Note from 'Note'

export default ({notes, onEdit, onDelete}) => {
    return (
        <ul className="notes">{notes.map((note) =>
            //<Note data={note} key={note.id}/>
        <li className="note" key={note.id}>
            <Note task={note.task}
                  onEdit={onEdit.bind(null, note.id)}
                  onDelete={onDelete.bind(null,note.id)}
            />
        </li>
            )}</ul>
    )
}