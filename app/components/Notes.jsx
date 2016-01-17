import React from 'react';
import Note from 'Note'

export default ({notes}) => {
    return (
        <ul>{notes.map((note) =>
            //<Note data={note} key={note.id}/>
        <li key={note.id}><Note task={note.task}/></li>
            )}</ul>
    )
}

// This also works, but is messier when inspected in devtools due to having the data object
// passed in show
//export default class Notes extends React.Component {
//    render(){
//        return <div>sup</div>
//    }
//}