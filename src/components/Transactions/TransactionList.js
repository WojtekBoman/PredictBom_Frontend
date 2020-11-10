import React from 'react';
import {connect} from 'react-redux';

class TransactionList extends React.Component {
    render() {
        return(
            <div>
                TransactionList
            </div>
        )
    }
}

export default connect()(TransactionList);