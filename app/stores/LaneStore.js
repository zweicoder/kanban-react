import LaneActions from 'LaneActions';
import uuid from 'node-uuid';
import alt from 'Alt';

class LaneStore {
    constructor() {
        this.bindActions(LaneActions);
        this.lanes = [];
    }

    create(lane) {
        this.setState({
            lanes: this.lanes.concat({
                id: uuid.v4(),
                notes: lane.notes || [],
                name: lane.name || 'New lane'
            })
        })
    }
}

export default alt.createStore(LaneStore, 'LaneStore')