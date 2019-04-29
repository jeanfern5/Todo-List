import React, { Component } from "react";
import { FormGroup, FormControl, Modal } from "react-bootstrap";
import styled from 'styled-components';

import LoaderButton from "../LoaderButton";
import config from '../../config';


export default class TodoUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      title: "",
      description: "",
      date: "",
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
                    user {
                      _id
                    }
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
      
              return res.json();
            })
            .then(resData => {
                if (resData.errors) {
                 alert(resData.errors[0].message);
                }

                this.setState(prevState => {
                  const updatedTodos = [...prevState.todos];
                
                  updatedTodos.push({
                    _id: resData.data.createTodo._id,
                    title: resData.data.createTodo.title,
                    date: resData.data.createTodo.date,
                    description: resData.data.createTodo.description,
                    user: {
                      _id: resData.data.createTodo.user._id
                    }
                  });
                  return { todos: updatedTodos };
                });

                this.setState({ isLoading: false }); 
                console.log('Create Todo Data:', this.state.todos);
            })
            .catch(err => {
                console.log('Create Todo Error:', err);
            })

    } catch(err) {
        alert(err);
        this.setState({ isLoading: false });
    }
  };


  render() {
    console.log('------>Update1', this.props)
    console.log('------>Update2', this.state)
    let formatDate = date => date.split('T')[0];

    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered="true"
      style={{ top:'20%' }}
      >
      <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title">
            <FormControl
              onChange={this.handleChange}
              value={this.props.title}
              type="text"
              placeholder="title"
            />
          </FormGroup>
          <FormGroup controlId="date">
            <FormControl
            
              onChange={this.handleChange}
              value={formatDate(this.props.date)}
              type="date"
            />
          </FormGroup>
        <FormGroup controlId="description">
        <FormControl
            onChange={this.handleChange}
            value={this.props.description}
            componentClass="textarea"
            placeholder="description..."
            style={{height:"7rem"}}

        />
        </FormGroup>
        <LoaderButton
        block
        bsStyle="primary"
        bsSize="large"
        disabled={!this.validateForm()}
        type="submit"
        isLoading={this.state.isLoading}
        text="Update Todo"
        loadingText="Updating..."
        onClick={this.props.onHide}
        />
      </Form>
      </Modal>
    );
  }
}


const Form = styled.form`
    padding: 1rem;
`;

