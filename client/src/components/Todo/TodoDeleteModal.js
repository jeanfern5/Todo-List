import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';

import LoaderButton from "../LoaderButton";
import config from '../../config';


export default class TodoDelete extends Component {
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

  handleDelete = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try{
        const requestBody = {
            query: `
            mutation deleteOne {
                deleteTodo(todoId:"${this.props.todo_id}"){
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
                  throw new Error('Delete Todo Failed!');
              }
              console.log('Delete Todo Data1:', res);
              return res.json();
            })
            .then(resData => {
                if (resData.errors) {
                 alert(resData.errors[0].message);
                }

                // this.setState(prevState => {
                //   const updatedTodos = [...prevState.todos];
                
                //   updatedTodos.push({
                //     _id: resData.data.deleteTodo._id,
                //     title: resData.data.deleteTodo.title,
                //     date: resData.data.deleteTodo.date,
                //     description: resData.data.deleteTodo.description,
                //     user: {
                //       _id: resData.data.deleteTodo.user._id
                //     }
                //   });
                //   return { todos: updatedTodos };
                // });
                this.setState({ isLoading: false, modalShows: false }); 
                console.log('Delete Todo Data:', resData.data);
            })
            .catch(err => {
                console.log('Delete Todo Error:', err);
                this.setState({ isLoading: false });
            })

    } catch(err) {
        alert(err);
        this.setState({ isLoading: false });
    }
  };


  render() {
    console.log('---->Delete', this.props)
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered="true"
      style={{ top:'20%' }}
      >
        <Form onSubmit={this.handleDelete}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div>Are you sure you want to delete <br/> 
                    <span style={{fontWeight:"bold"}}>{this.props.title}</span>?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <LoaderButton
                block
                bsStyle="danger"
                bsSize="small"
                type="submit"
                isLoading={this.state.isLoading}
                text="Delete Todo"
                loadingText="Deleting..."
                onClick={this.props.onHide}
                />
            </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}


const Form = styled.form`
    padding: 1rem;
`;

