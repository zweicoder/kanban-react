import React from 'react';
import Notes from 'Notes';
import uuid from 'node-uuid';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Write Resume'
                },
                {
                    id: uuid.v4(),
                    task: 'Learn React'
                },
                {
                    id: uuid.v4(),
                    task: 'Be awesome'
                }
            ]
        }
    }

    // Using property initializer via a babel preset that binds properties
    // to with the App instance. https://github.com/jeffmo/es-class-fields-and-static-properties
    addNote = () => {
        this.setState({
            notes: [...this.state.notes, {
                id: uuid.v4(),
                task: 'Some Task here'
            }]
        })
    };

    render() {
        // ()=> implies return, ()=> { return 'asd'} needs return

        const notes = this.state.notes;
        return (
            <div>
                <button onClick={this.addNote}>+</button>

                <Notes notes={notes}/>
            </div>
        );
    }
}