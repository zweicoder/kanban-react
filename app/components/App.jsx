import React from 'react';
import uuid from 'node-uuid';
import Lanes from 'Lanes';
import LaneActions from 'LaneActions';
import LaneStore from 'LaneStore'

// The basic idea is that you have a container that wraps your component,
// the duty of this container component is to handle all the data fetching
// and communication with the stores, it then renders the corresponding children.
// The sub-components just render markup and are data agnostic thus making them highly reusable.
import AltContainer from 'alt-container';

export default class App extends React.Component {

    render() {
        // ()=> implies return, ()=> { return 'asd'} needs return
        return (
            <div>
                <button className="add-lane" onClick={this.addLane}>+</button>

                <AltContainer
                    stores={[LaneStore]}
                    inject={{
                    lanes: ()=> LaneStore.getState().lanes || []
                    }}
                >
                    <Lanes />
                </AltContainer>
            </div>
        );
    }

    addLane() {
        LaneActions.create({
            name: 'New Lane'
        })
    }

}