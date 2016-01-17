import React from 'react';
import ReactDOM from 'react-dom';

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
                       placeholder={this.props.task}
                       onBlur={this.finishEdit} //when item loses focus
                       onKeyPress={this.onKeyPress}
                       ref={this.onInputFocus}
                />
            )
        }

        return <div onClick={this.edit}>{this.props.task}</div>
    }

    onInputFocus = (c)=> {
        if (c != null) {
            c.value = this.props.task;
            c.focus();
        }
    };

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
        this.props.onEdit(e.target.value);

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