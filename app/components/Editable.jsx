import React from 'react';

class Editable extends React.Component {
    render() {
        const {value, onEdit, onValueClick, editing, ...props} = this.props;

        return (
            <div {...props}>
                {editing ? this.renderEdit() : this.renderValue()}
            </div>
        )
    }

    renderEdit = () => {
        return (
            <input type="text"
                   placeholder={this.props.value}
                   onBlur={this.finishEdit} //when item loses focus
                   onKeyPress={this.onKeyPress}
                   ref={this.onInputFocus}
            />
        )
    };

    renderValue = () => {
        const onDelete = this.props.onDelete;
        return (
            <div onClick={this.props.onValueClick}>
                <span className="value">{this.props.value}</span>
                {onDelete? this.renderDelete(): null}
            </div>
        )
    };

    renderDelete = () => {
        return <button className="delete" onClick={this.props.onDelete}> X </button>
    };

    onInputFocus = (c)=> {
        if (c != null) {
            c.value = this.props.value;
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

Editable.propTypes = {
    onEdit: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    onValueClick: React.PropTypes.func
};

Editable.defaultProps = {
    onEdit: (body)=> {
    },

    onValueClick: (body)=> {
    },
};

export default Editable