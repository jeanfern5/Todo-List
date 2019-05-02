import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import LoaderButton from "../LoaderButton";
import config from '../../config';
import { BoldSpan, ModalForm } from '../Styling/GlobalStyles'



export default class TodoDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
    };
  };

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
                window.location.reload();
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
        style={{padding:"5px"}}
        >
        </Modal.Header>

        <ModalForm onSubmit={this.handleDelete}>
            <Modal.Body
            style={{lineHeight:"1.25rem"}}
            >
                <div>Are you sure you want to delete
                <br/>
                <BoldSpan>{this.props.title}</BoldSpan>?
                </div>
            </Modal.Body>

            <Modal.Footer>
                <LoaderButton
                bsStyle="danger"
                isLoading={this.state.isLoading}
                text="Delete Todo"
                loadingText="Deleting..."
                onClick={this.props.onHide}
                />
            </Modal.Footer>
        </ModalForm>
      </Modal>
    );
  }
}


