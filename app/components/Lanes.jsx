import Lane from 'Lane';
import React from 'react'

export default (({lanes}) => {
    return (
        <div className="lanes">{lanes.map((lane) =>
        <Lane className="lane" key={lane.id} lane={lane}/>
            )}</div>
    )
})