import React, { Component } from "react";
import { FormGroup, FormControl, Modal } from "react-bootstrap";
import styled from 'styled-components';

import LoaderButton from "../LoaderButton";
import config from '../../config';


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
    return (this.state.title.length > 0) && (this.state.date.length > 0);
  }

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
                createTodo(todoInput: { title:"${this.state.title}", description:"${this.state.description}", date: "${this.state.date}" }) {
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
                  throw new Error('Create Todo Failed!');
              }
      
              console.log('--->HERE', res.status)
              return res.json();
            })
            .then(resData => {
                if (resData.errors) {
                 alert(resData.errors[0].message);
                }
                
                // this.setState(prevState => {
                //   const updatedTodos = [...prevState.todos];

                //   updatedTodos.push({
                //     _id: resData.data.createTodo._id,
                //     title: resData.data.createTodo.title,
                //     date: resData.data.createTodo.date,
                //     description: resData.data.createTodo.description,
                //   });

                //   return { todos: updatedTodos };
                // });

                this.setState({ isLoading: false }); 
                console.log('Create Todo Data:', resData.data);
            })
            .catch(err => {
                console.log('Create Todo Error:', err);
                this.setState({ isLoading: false });
            })

    } catch(err) {
        alert(err);
        this.setState({ isLoading: false });
    }
  };


  render() {
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered="true"
      style={{ top:'20%' }}
      >
        <Modal.Header closeButton></Modal.Header>
        
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
              <FormGroup controlId="title">
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.title}
                  type="text"
                  placeholder="title"
                />
              </FormGroup>
              <FormGroup controlId="date">
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.date}
                  type="date"
                />
              </FormGroup>
            <FormGroup controlId="description">
            <FormControl
                onChange={this.handleChange}
                value={this.state.description}
                componentClass="textarea"
                placeholder="notes..."
                style={{height:"7rem"}}

            />
            </FormGroup>

            <Modal.Footer>
              <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Create Todo"
              loadingText="Creating…"
              onClick={this.props.onHide}
              />
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}


const Form = styled.form`
    padding: 1rem;
`;
