import React from 'react';

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    render() {
        if (this.state.editing) {
            return (
                <input type="text"
                       autofocus={true}
                       placeholder={this.props.task}
                       onBlur={this.finishEdit}
                       onKeyPress={this.onKeyPress}
                />
            )
        }

        return <div onClick={this.edit}>{this.props.task}</div>
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.finishEdit(e)
        }
    };

    edit = () => {
        this.setState({
            editing: true
        })
    };

    finishEdit = (e) => {
        this.props.onEdit(e.target.value)

        this.setState({
            editing: false
        })
    };
}

Note.propTypes = {
    onEdit: React.PropTypes.func
};

Note.defaultProps = {
    onEdit: (body)=> {
    }
};

export default Note