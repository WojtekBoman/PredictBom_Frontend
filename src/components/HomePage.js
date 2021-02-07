import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Poland from "../img/Poland.png";
import { connect } from "react-redux";
import "./HomePage.scss";

const HomePage = (props) => {
  return (
    <Container className="bg-light border rounded shadow-container create-market-container">
      <header>
        <h2>Dołącz do PredictBom już dziś !</h2>
        <hr className="my-4"></hr>
      </header>
      <Row>
        <Col sm={6}>
          <Image variant="top" src={Poland} className="img-cover" />
        </Col>
        <Col sm={6}>
          <div className="advantages home-info">
            <h4>Dlaczego warto do nas dołączyć ?</h4>
            <p className="text-muted">
              <strong>
                PredictBom jest darmową aplikacją związaną z rynkami
                prognostycznymi.
              </strong>
              Weź udział w rynkach dotyczących najciekawszych wydarzeń
              dziejących się w naszym kraju z zakresu kilku kategorii.
            </p>
          </div>
          <div className="rules home-info">
            <h4>Zasady gry</h4>
            <p className="text-muted">
              Gracze PredictBom otrzymują możliwość obrotu akcjami na wielu
              interesujących rynkach prognoz. Ceny akcji wahają się między 0 a 1
              $, gdzie za każdą akcję na poprawną opcję zakładową otrzymują 1 $.
              Wykaż się umiejętnosciami prognostycznymi i kupuj akcje po jak
              najbardziej korzystnych cenach i sprzedawaj je aby jak najbardziej
              zwiększyć swój budżet. Zakupione akcje znajdziesz w zakładce
              kontrakty. Aby gra była uczciwa i najbogatsi gracze nie wykupowali
              wszystkich akcji dla danego rynku,{" "}
              <strong>
                dziennie możliwy jest zakup 1000 akcji na wybraną opcję
                zakładową.
              </strong>
            </p>
          </div>
          <div className="bonus home-info">
            <h4>Odwiedzaj nas codziennie aby odebrać bonus !</h4>
            <p className="text-muted">
              Nie zawsze będziesz dobrze obstawiać, aby odzyskać budżet
              odwiedzaj nas codziennie!{" "}
              <strong>
                Przy pierwszym logowaniu każdego dnia otrzymasz 100$.
              </strong>
            </p>
          </div>
          {!props.loggedIn && (
            <div className="text-center">
              <LinkContainer to="/register" className="link-button">
                <Button variant="dark">Dołącz do PredictBom</Button>
              </LinkContainer>
            </div>
          )}
          <div className="text-center">
            <LinkContainer to="/markets" className="link-button">
              <Button variant="dark">Przeglądaj rynki</Button>
            </LinkContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps)(HomePage);
