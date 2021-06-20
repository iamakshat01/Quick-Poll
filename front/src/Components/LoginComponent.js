import React,{Component} from 'react';
import {Button,
        Form,
        FormGroup,
        Label,
        Input,
        Col,
        FormFeedback, 
        Modal,
        ModalHeader,
        ModalBody,
        Alert} from 'reactstrap'
import {signin} from '../api/api-auth'
import auth from '../api/auth-helper'
import {withRouter} from 'react-router'

class Login extends Component {
    
    constructor(props)
    {
        super(props);
        this.state={
            password:'',
            username:'',
            error:'',
            open:'',
            touched:{
                password:false,
                username:false
            }
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }

    handleBlur=(field)=>(evt)=>
    {
        this.setState(
            {
                touched:{...this.state.touched,[field]:true}
            }
        )
    }

    toggleModal() {
      this.props.history.push('/');
      this.setState({
        open: !this.state.open
      });
    }

    handleInputChange=(event)=>
    {
        const target = event.target;
        const value = target.value;
        const name=target.name;
        this.setState({[name]:value})
    }

    
    validate=(username,password)=>
    {
        const errors={
            password:'',
            username:''
        }

        if(this.state.touched.password && password.length<0)
            errors.password='Password is required';

        if(this.state.touched.username && username.length<0)
            errors.username='Username is required';

        return errors;
    }
    handleSubmit=(event)=>
    {
        const user={
          "username":this.state.username,
          "password": this.state.password,
        }

        event.preventDefault();

        signin(user).then((data) => {
          
          if (data.error) {
            
            this.setState({error: data.error})
            
          } else {
            
            auth.authenticate(data.token, () => {
                this.setState({error: '' ,open: true})
            })
          }
        })
        
    }

    render() { 

        const errors = this.validate(this.state.username, this.state.password);

        return ( 
            <div className="container">
            <div className="row row-content">
                <div className="col-12 col-md-9 mt-5">
                { this.state.error.message && <Alert color="danger">
                  {this.state.error.message}
                </Alert>}
                <Form onSubmit={this.handleSubmit} onChange={this.handleInputChange}>

                    <FormGroup row>
                        <Label htmlFor="username" md={2}>Username</Label>
                        <Col md={10}>
                            <Input type="username" id="username" name="username"
                            placeholder="Username" value={this.state.username} 
                            valid={errors.username===''}
                            invalid={errors.username!==''}
                            onBlur={this.handleBlur("username")}/>
                            <FormFeedback>
                                {errors.username}
                            </FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="password" md={2}>Password</Label>
                        <Col md={10}>
                            <Input type="password" id="password" name="password"
                            placeholder="Password" value={this.state.password}
                            valid={errors.password===''}
                            invalid={errors.password!==''}
                            onBlur={this.handleBlur("password")} />
                            <FormFeedback>
                                {errors.password}
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    
                    <FormGroup row>
                        <Col md={{size:10,offset:2}}>
                            <Button type="submit" color="primary">
                            Submit
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                </div>
            </div>
            <Modal isOpen={this.state.open} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
              <ModalBody>
                You have successfully Logged In ! <br/> 
              </ModalBody>
            </Modal>
        </div>

         );
    }
}
 
export default withRouter(Login);