import React from 'react';
import {connect} from 'react-redux';
import {Button,InputGroup,FormControl} from 'react-bootstrap';
import {updateSearch,changePage} from '../../actions/filterActions';

class SearchBar extends React.Component {

    state = {
        searchText: ""
    }

    onInputSearchChange = (e) => {
        this.setState({searchText:e.target.value});
    }

    onSubmitSearch = () => {
        this.props.dispatch(updateSearch(this.state.searchText));
    }

    render() {
        return(
                   <div>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <Button variant="outline-dark" onClick={this.onSubmitSearch}>Szukaj</Button>
    </InputGroup.Prepend>
    <FormControl onChange={this.onInputSearchChange} aria-describedby="basic-addon1" />
  </InputGroup></div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return{
        dispatch
    }
}

export default connect(null,mapDispatchToProps)(SearchBar)