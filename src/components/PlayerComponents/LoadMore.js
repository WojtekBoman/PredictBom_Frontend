import React from 'react'
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

class LoadMore extends React.Component {
    render(){
        return(
            <Button size="lg" variant="primary">
                Załaduj więcej
            </Button>
        )
    }
}

export default connect()(LoadMore)