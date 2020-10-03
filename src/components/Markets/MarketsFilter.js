import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-bootstrap';
import {selectCategory, unselectCategory} from '../../actions/filterActions';
// import {filterConstants} from '../../constants/filterConstants';

class MarketsFilter extends React.Component {

    state = {
        filters: []
    }

 

    // onInputSearchChange = (e) => {
        
    //     this.setState({filters:{text:e.target.value}})
    //     console.log(this.state);
    //     this.props.dispatch(updateFilters(this.state.filters))
    // }

    handleCategory = (e) => {
        const actualFilters = this.state.filters;
        if(this.props.selectedCategories.includes(e.target.value)) {
            this.props.dispatch(unselectCategory(e.target.value))
        }else{
            this.props.dispatch(selectCategory(e.target.value))
        }
        console.log(e.target.active);
        console.log(e.target.value);
        // this.props.dispatch(updateFilters(e.target.value));
    }

    render() {

        console.log(this.state.filters);
        return (
            <div>
             <Form.Label><h4>Sortuj według</h4></Form.Label>
                <Form.Control as="select">
                <option>Od najstarszych</option>
                <option>Od najnowszych</option>
                <option>Nabliższego czasu zakończenia</option>
                <option>Najdalszego czasu zakończenia</option>
                </Form.Control>
           
             <div className="mb-3">
                 <h4>Kategorie</h4>
                <Form.Group>
                 <Form.Check
                 onClick={this.handleCategory}
                 label={"Sport"}
                 value={"sport"}
                 name="checkbox"
                type="checkbox"
                 />
                 <Form.Check
                 onClick={this.handleCategory}
                 label={"Celebryci"}
                 value="cel"
                 name="selectedCategory"
                type="checkbox"
                 />
                 <Form.Check
                 onClick={this.handleCategory}
                 label={"Polityka"}
                 value="pol"
                 name="checkbox"
                type="checkbox"
                 />
                 <Form.Check
                 onClick={this.handleCategory}
                 label={"Gospodarka"}
                 value="gosp"
                 name="selectedCategory"
                type="checkbox"
                 />
                 <Form.Check
                 onClick={this.handleCategory}
                 label={"Inne"}
                 value="inne"
                 name="selectedCategory"
                type="checkbox"
                 />
                 </Form.Group>
            </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selectedCategories: state.filter.selectedCategories
    }
}

const mapDispatchToProps = dispatch => {
    return{
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MarketsFilter)