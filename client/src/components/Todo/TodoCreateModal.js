import React, { Component } from "react";
import { FormGroup, FormControl, Modal } from "react-bootstrap";

import LoaderButton from "../LoaderButton";
import { ModalForm } from '../Styling/GlobalStyles';


export default class TodoCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      title: "",
      description: "",
      date: "",
      todos: this.props.todos,
    };
  };

  validateForm() {
    return (this.props.title.length > 0) && (this.props.date.length > 0);
  }

  render() {
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered="true"
      style={{ top:'20%' }}
      >
        <Modal.Header 
        closeButton
        style={{padding:"0", border:"none", margin:"5px 5px 0 0"}}
        >
        </Modal.Header>
        
      
        <ModalForm onSubmit={this.props.handle_create_todo}>
          <FormGroup controlId="title">
            <FormControl
              onChange={this.props.handle_change}
              value={this.props.title}
              type="text"
              placeholder="title"
            />
          </FormGroup>
          <FormGroup controlId="date">
            <FormControl
              onChange={this.props.handle_change}
              value={this.props.date}
              type="date"
            />
          </FormGroup>
          <FormGroup controlId="description">
          <FormControl
              onChange={this.props.handle_change}
              value={this.props.description}
              componentClass="textarea"
              placeholder="notes..."
              style={{height:"7rem"}}
          />
          </FormGroup>

          <LoaderButton
          disabled={!this.validateForm()}
          text="Create Todo"
          loadingText="Creating…"
          onClick={this.props.onHide}
          />
        </ModalForm>
        
      </Modal>
    );
  }
}
