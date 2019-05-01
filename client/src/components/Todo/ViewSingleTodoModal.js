import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import { TitleSpan } from '../Styling/GlobalStyles';


export default class ViewSingleTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
    };
  };

  render() {
    let formatDate = date => date.split('T')[0].split('-')[1] + '/' +
                             date.split('T')[0].split('-')[2] + '/' +
                             date.split('T')[0].split('-')[0] 

    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered="true"
      style={{ top:'20%' }}
      >
        <Modal.Header closeButton>
            <Modal.Title> {formatDate(this.props.date)}</Modal.Title>
        </Modal.Header>

        <Modal.Body
        style={{marginBottom:"10px"}}
        >
            <p><TitleSpan>{this.props.title}</TitleSpan></p>
            <br/>
            <p>{this.props.description}</p>
        </Modal.Body>
      </Modal>
    );
  }
}


