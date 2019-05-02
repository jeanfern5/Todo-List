import React, { Component } from "react";
import { FormGroup, FormControl, Modal } from "react-bootstrap";

import LoaderButton from "../LoaderButton";
import config from '../../config';
import { BoldSpan, ModalForm } from '../Styling/GlobalStyles'



export default class TodoUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      modalShows: false,
      description: "",
      date: "",
    };
  };

  validateForm() {
    return (this.props.date.length > 0);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleUpdate = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try{
        const requestBody = {
            query: `
            mutation {
                updateTodo(todoId:"${this.props.todo_id}", todoInput: { title:"${this.props.title}", description:"${this.state.description || this.props.description || " "}", date: "${this.state.date || this.props.date}" }) {
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

      fetch(`${config.LOCALHOST}`, {
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

                // this.setState(prevState => {
                //   const updatedTodos = [...prevState.todos];
                
                //   updatedTodos.push({
                //     _id: resData.data.updateTodo._id,
                //     title: resData.data.updateTodo.title,
                //     date: resData.data.updateTodo.date,
                //     description: resData.data.updateTodo.description,
                //     user: {
                //       _id: resData.data.updateTodo.user._id
                //     }
                //   });
                //   return { todos: updatedTodos };
                // });

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
    let formatDate = date => date.split('T')[0];

    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered="true"
      style={{ top:'20%' }}
      >
        <ModalForm onSubmit={this.handleUpdate}>
            <Modal.Header closeButton>
                <Modal.Title><BoldSpan>{this.props.title}</BoldSpan></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup controlId="date">
                <FormControl
                    onChange={this.handleChange}
                    value={this.state.date.length > 0 ? this.state.date : formatDate(this.props.date)}
                    type="date"
                />
                </FormGroup>
                <FormGroup controlId="description">
                <FormControl
                    onChange={this.handleChange}
                    value={this.state.description.length > 0 ? this.state.description : (this.props.description.length > 0 ? this.props.description : "")}
                    componentClass="textarea"
                    placeholder={this.props.description.length <= 0 ? "notes..." : ""}
                    style={{height:"7rem"}}

                />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
        </ModalForm>
      </Modal>
    );
  }
}

