import React from 'react';
import {Container,Row,Col,Image,Button} from 'react-bootstrap';
import Poland from '../img/Poland.png'

class HomePage extends React.Component {

    render(){
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                    <header>
                        <h2>Dołącz do PredictBom już dziś !</h2>
                        <hr className="my-4"></hr>
                    </header>
                    <Row>
                        <Col sm={6}>
                            <h4>Dlaczego warto do nas dołączyć ?</h4>
                            <p className="text-muted">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.    
                            </p>
                        </Col>
                        <Col sm={6}>
                        <Image className="toMarket" variant="top" src={Poland} style={{width: "100%",
                            objectFit: "cover"}}/>
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Button variant="dark" style={{marginRight:"10px"}}>
                            Załóż konto
                        </Button>
                        <Button variant="dark">
                            Zaloguj się 
                        </Button>
                    </div>
            </Container>
        )
    }
}

export default HomePage;