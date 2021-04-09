import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import {Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    } from 'reactstrap'
import {create} from '../api/api-poll'
import {Link} from 'react-router-dom'

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      options: ['', ''],
      error:'',
      id:'',
      open:''
     
    };
    this.toggleModal=this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addAnswer() {
    this.setState({ options: [...this.state.options, ''] });
  }

  handleAnswer(e, index) {
    const options = [...this.state.options];
    options[index] = e.target.value;
    this.setState({ options });
  }

  toggleModal() {
    this.props.history.push('/poll/'+this.state.id);
    this.setState({
      open: !this.state.open
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const poll={
        "question":this.state.question,
        "options":this.state.options.filter(option => {if(option!='') return option}),
        
    }
   
    create(poll).then((data) => {
        
        if (data.error) {
          this.setState({ ...this.state, error: data.error})
        } else {
              this.setState({ ...this.state, error: '' ,open: true,id:data._id})
        }
    })
  }

  render() {
    
    const options = this.state.options.map((option, i) => (
      <div className="ml-3" key={i}>
        <FormGroup row>
            <Label className="form-label">Option</Label>
            <Col md={6}>
                <Input
                className="form-input"
                type="text"
                value={option}
                key={i}
                onChange={e => this.handleAnswer(e, i)}
                />
            </Col>
        </FormGroup>
      </div>
    ));

    return (
        <div className="container-fluid">
           <div className="col-6 mx-auto mt-5">
            <Form className="form" onSubmit={this.handleSubmit}>
                
                <FormGroup row>
                    <Label className="form-label" htmlFor="question">
                         Question
                    </Label>
                    <Col md={10}>
                        <Input
                        className="form-input"
                        type="text"
                        name="question"
                        value={this.state.question}
                        onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>

                <div>
                    {options}
                </div>
                
                
                <div className="row">
                        <Col  md={{size:4}}>
                            <Button className="btn-sm btn-outline-primary"  type="button" onClick={this.addAnswer}>
                                Add options
                            </Button>
                        </Col>
                        
                </div>   
                
                <div className="row">
                        <Col  md={{size:12}}>
                            <Button className=" btn-warning" type="submit" >
                                Create Poll
                            </Button>
                        </Col>
                        
                </div>   
               

            </Form>
            <Modal isOpen={this.state.open} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Your Poll has been created !</ModalHeader>
              <ModalBody>
                <Button className="btn-primary">
                  <Link style={{color:"#FFF"}} to={"/poll/"+this.state.id}>
                      View
                  </Link>
                </Button>
              </ModalBody>
            </Modal>
            </div>
        </div>
    );
  }
}

export default withRouter(CreatePoll);
