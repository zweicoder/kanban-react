import React from 'react';
import Editable from 'Editable';

export default ({notes, onEdit, onDelete, onValueClick}) => {
    return (
        <ul className="notes">{notes.map((note) =>
        <li className="note" key={note.id}>
            <Editable
                editing={note.editing}
                value={note.task}
                onValueClick={onValueClick.bind(null,note.id)}
                onEdit={onEdit.bind(null, note.id)}
                onDelete={onDelete.bind(null,note.id)}
            />
        </li>
            )}</ul>
    )
}