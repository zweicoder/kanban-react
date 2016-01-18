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
        const onDelete = this.props.onDelete;

        return (
            <div onClick={this.edit}>
                <span>{this.props.task}</span>
                {onDelete? this.renderDelete() : null}
            </div>

        )
    }

    renderDelete = () =>{
        return <button onClick={this.props.onDelete}> X </button>
    };

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
    onEdit: React.PropTypes.func,
    onDelete: React.PropTypes.func
};

Note.defaultProps = {
    onEdit: (body)=> {
    },

    onDelete: (body)=> {
    }
};

export default Note