import React, {Component} from 'react';
import './warningText.css';

export default class WarningText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      const chosenClass = this.props.issue ? "issue notice" : "notice";
        return (
            <div>
                <h1
                  className={chosenClass}
                >
                  *** Please fill this correctly. {this.props.rules}! ***
                </h1>
            </div>
        );
    }
}
