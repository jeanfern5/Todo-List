import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';

import config from '../../config';


export default class ViewSingleTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
    };
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try{
        const requestBody = {
            query: `
            mutation {
                getSingleTodo(todoId:"${this.props.todo_id}") {
                    _id
                    title
                    description
                    date
                }
            }
          `
        };

        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.TOKEN
            }
            })
            .then(res => {
              if ((res.status !== 200) && (res.status !== 201)) {
                  throw new Error('Update Todo Failed!');
              }
              console.log('Update Todo Data1:', res);
              return res.json();
            })
            .then(resData => {
                if (resData.errors) {
                 alert(resData.errors[0].message);
                }

                this.setState({ isLoading: false }); 
                console.log('Update Todo Data:', resData.data);
            })
            .catch(err => {
                console.log('Update Todo Error:', err);
                this.setState({ isLoading: false });
            })

    } catch(err) {
        alert(err);
        this.setState({ isLoading: false });
    }
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
        <Form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {formatDate(this.props.date)}
                <br/>
                {this.props.description}
            </Modal.Body>

            {/* <Modal.Footer>
                {formatDate(this.props.date)}
            </Modal.Footer> */}
        </Form>
      </Modal>
    );
  }
}


const Form = styled.form`
    padding: 1rem;
`;

