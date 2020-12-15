import React from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchRanking} from '../../actions/rankingActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import {alertActions} from '../../actions/alertActions';
import BackButton from '../../helpers/BackButton';


class Ranking extends React.Component {

    componentDidMount() {
        this.props.fetchRanking();
    }

    componentWillUnmount(){
        this.props.clear();
    }

    renderLoading = () => {
        if((typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
            return(
                <Container className="text-center bg-light border rounded shadow-container create-market-container">
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <h3>Pobieranie rankingu</h3>
                </Container>
            )
        }
    }

    renderError = () => {
        if(this.props.alert.payload){
            return(
                <Container className="text-center bg-light border rounded shadow-container create-market-container">
                    <h3>Wystąpił błąd</h3>
                </Container>
            )
        }
    }

    renderRanking(){
        if(this.props.ranking && !((typeof this.props.loading !== 'undefined') && this.props.loading.pending)){
            return(
                <Container className="bg-light border rounded shadow-container create-market-container">
                    <header style={{display:"inline-block"}}>
                        <BackButton />
                        <h2 style={{display:"inline-block"}}>Top 100 graczy</h2>
                    </header>
                    <hr className="my-4"></hr>
                    <Table striped bordered hover>
                        <thead>
                        <th>
                            <FontAwesomeIcon style={{marginRight:"5px"}} icon={faTrophy} />
                             Pozycja
                        </th>
                        <th>Użytkownik</th>
                        <th>Budżet [$]</th>
                        </thead>
                        <tbody>
                            {this.props.ranking.map((user,index) => 
                            <tr>
                            <td>{index+1}</td>
                            <td>{user.username}</td>
                            <td>{Math.round((user.budget + Number.EPSILON) * 100) / 100}</td>
                          </tr>
                            )}
                        </tbody>
                    </Table>
                </Container>
            )
        }
    }

render() {
    return(
        <div>
            {this.renderLoading()}
            {this.renderRanking()}
            {this.renderError()}
        </div>
    )
 }

}

const mapStateToProps = (state) => {
    return {
        loading: state.loading.FETCH_RANKING,
        alert: state.alert,
        ranking: state.ranking
    }
}

export default connect(mapStateToProps,{fetchRanking,clear:alertActions.clear})(Ranking);