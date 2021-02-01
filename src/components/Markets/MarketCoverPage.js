import React from "react";
import { connect } from "react-redux";
import {
  Alert,
  Container,
  Form,
  Button,
  Spinner,
  Image,
  Input,
} from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { setMarketCover } from "../../actions/marketActions";
import BackHeader from "../BackHeader";

class MarketCoverPage extends React.Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
  }

  state = {
    resetButtonDisable: true,
    imageFile: null,
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return <Alert variant="danger">{error}</Alert>;
    }
  }

  renderFileInput = ({ input, type, meta, accept }) => {
    const { mimeType } = this.props;
    return (
      <div>
        <input
          name={input.name}
          type={type}
          accept={accept}
          onChange={(event) => this.handleChange(event, input)}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);

        URL.revokeObjectURL(imageFile);
      };
      this.setState({ imageFile: localImageUrl, resetButtonDisable: false });
      imageObject.src = localImageUrl;
    }
  };

  renderButtonContent() {
    if (
      typeof this.props.loading !== "undefined" &&
      this.props.loading.pending
    ) {
      return (
        <div>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Ładowanie...
        </div>
      );
    } else {
      return "Zatwierdź";
    }
  }

  // renderInfo() {
  //   if(!this.state.imageFile) {
  //       return <Alert className="login-alert" variant="danger">
  //           {"Musisz dodać zdjęcie"}
  //       </Alert>
  //   }

  onSubmit = (marketCover) => {
    this.props.setMarketCover(this.props.match.params.id, marketCover);
  };

  resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    this.props.reset();
    this.setState({ imageFile: null, resetButtonDisable: true });
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <BackHeader title="Edytuj zdjęcie" />
        <hr className="my-4"></hr>
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          encType="multipart/form-data"
        >
          <Field
            ref={(ref) => (this.fileInput = ref)}
            accept="image/*"
            type="file"
            name="marketCover"
            component={this.renderFileInput}
          />
          <div className="img-box">
            {this.state.imageFile && (
              <Image className="img" src={this.state.imageFile} rounded />
            )}
          </div>
          <Button className="form-button" variant="primary" type="submit">
            {this.renderButtonContent()}
          </Button>
          <Button
            className="form-button"
            variant="primary"
            type="reset"
            onClick={this.resetForm}
            disabled={this.state.resetButtonDisable}
          >
            Cofnij zmiany
          </Button>
        </Form>
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (formValues.marketCover) {
    if (!formValues.marketCover.type.includes("image")) {
      errors["marketCover"] = "Wybierz plik który jest obrazem";
    }
  }

  if (!formValues.marketCover) {
    errors["marketCover"] = "Wybierz zdjęcie";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loading: state.loading.SET_MARKET_COVER,
  };
};

const formWrapped = reduxForm({
  form: "editCoverForm",
  validate,
})(MarketCoverPage);

export default connect(mapStateToProps, { setMarketCover })(formWrapped);
