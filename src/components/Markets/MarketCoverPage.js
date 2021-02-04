import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Form,
  Button,
  Image
} from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { setMarketCover } from "../../actions/marketActions";
import BackHeader from "../BackHeader";
import { renderFileInput } from "../../helpers/FormInputs";
import { renderButtonContent } from "../../helpers/LoadingContent";

class MarketCoverPage extends React.Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
  }

  state = {
    resetButtonDisable: true,
    imageFile: null,
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
            component={renderFileInput}
            methodToHandle={this.handleChange}
          />
          <div className="img-box">
            {this.state.imageFile && (
              <Image className="img" src={this.state.imageFile} rounded />
            )}
          </div>
          <Button className="form-button" variant="primary" type="submit">
            {renderButtonContent(this.props.loading,"Zatwierdź")}
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
