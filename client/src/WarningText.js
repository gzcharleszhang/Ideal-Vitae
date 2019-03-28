import React, {Component} from 'react';
import './warningText.css'

class WarningText extends Component {
    constructor(props) {
        super(props);

    };

    render() {
      const chosenClass = this.props.issue ? "notice issue" : "notice";
        return (
            <div>
                <h1 className={chosenClass}> *** Please fill this correctly. {this.props.rules}! ***</h1>
            </div>
        )
    }
}

export default WarningText;
