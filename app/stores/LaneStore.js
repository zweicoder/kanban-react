import LaneActions from 'LaneActions';
import uuid from 'node-uuid';
import alt from 'Alt';
import NoteActions from 'NoteActions';
import assign from 'object-assign'

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

    attachToLane({laneId, noteId}) {
        const lanes = this.lanes.map((lane)=> {
            if (lane.id === laneId) {
                lane.notes = [...lane.notes, noteId];
            }
            return lane
        });

        this.setState({lanes})
    }

    detachFromLane({laneId,noteId}) {
        const lanes = this.lanes.map((lane)=> {
            if (lane.id === laneId) {
                lane.notes = lane.notes.filter((note)=> note.id !== noteId)
            }

            return lane
        });

        this.setState({lanes});
    }

    update(updatedLane) {
        const lanes = this.lanes.map((oldLane)=> {
            return oldLane.id === updatedLane.id ? assign({}, oldLane, updatedLane) : oldLane
        });

        this.setState({lanes});
    }

    delete(id) {
        this.setState({
            lanes: this.lanes.filter((lane)=>lane.id !== id)
        })
    }
}

export default alt.createStore(LaneStore, 'LaneStore')