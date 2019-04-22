import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../Auth/LoaderButton";

import styled from 'styled-components';

export default class TodoForm extends Component {
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
                        email
                    }
                }
            }
          `
        }
    
        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(res => {
              console.log('----->res', res)
              if ((res.status !== 200) && (res.status !== 201)) {
                  throw new Error('Create Todo Failed!');
              }
      
              return res.json();
            })
            .then(resData => {
              console.log('Create Todo Data:', resData);
            })
            .catch(err => {
                console.log('Create Todo Error:', err);
            })
        
    } catch(err) {
        alert(err);
        this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputTop>
          <FormGroup controlId="title">
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
              type="text"
              placeholder="title"
              style={{height:"2rem", width:"110%"}}
            />
          </FormGroup>
          <FormGroup controlId="date">
            <FormControl
              onChange={this.handleChange}
              value={this.state.date}
              type="date"
              style={{height:"2rem", width:"87%", marginLeft:"12%"}}
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

