import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../Auth/LoaderButton";

import styled from 'styled-components';

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      title: "",
      description: "",
      date: ""
    };
  }

  validateForm() {
    return this.state.title.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputTop>
          <FormGroup controlId="title">
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
              componentClass="textarea"
              placeholder="title"
              style={{height:"2rem"}}
            />
          </FormGroup>
          <FormGroup controlId="date">
            <FormControl
              onChange={this.handleChange}
              value={this.state.date}
              componentClass="textarea"
              placeholder="due date"
              style={{height:"2rem"}}

            />
          </FormGroup>
        </InputTop>
        <FormGroup controlId="description">
        <FormControl
            onChange={this.handleChange}
            value={this.state.description}
            componentClass="textarea"
            placeholder="description"
            style={{height:"3rem"}}

        />
        </FormGroup>
        <LoaderButton
        block
        bsStyle="primary"
        bsSize="large"
        disabled={!this.validateForm()}
        type="submit"
        isLoading={this.state.isLoading}
        text="Create"
        loadingText="Creating…"
        style={{height:"1.5rem", lineHeight:"0"}}
        />
      </form>
    );
  }
}


const InputTop = styled.div`
    display: flex;
    flex-direction: row;
`;

