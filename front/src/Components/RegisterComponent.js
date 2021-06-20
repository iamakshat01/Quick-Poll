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
        Alert,
        } from 'reactstrap'
import {Link} from 'react-router-dom'
import {create} from '../api/api-auth'
import auth from '../api/auth-helper'
import {withRouter} from 'react-router'

class Register extends Component {
    
    constructor(props)
    {
        super(props);
        this.state={
            name:'',
            password:'',
            username:'',
            error:'',
            open:'',
            touched:{
                name:false,
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

    validate=(name,username,password)=>
    {
        const errors={
            name:'',
            password:'',
            username:''
        }

        if(this.state.touched.name && name.length<3)
            errors.name='Name should be greater than 3 characters';

        else if (this.state.touched.name && name.length>15)
            errors.name='Name should be less than 16 characters';

        if(this.state.touched.password && password.length<6)
            errors.password='Password should be greater than 6 characters';

        if(this.state.touched.username && username.length<3)
            errors.username='Username should be greater than 3 characters';

        return errors;
    }
    
    handleSubmit=(event)=>
    {
        
        const user={
          "name":this.state.name,
          "username":this.state.username,
          "password": this.state.password,
          
        }
         
        create(user).then((data) => {
          if (data.error) {
            this.setState({error: data.error})
          } else {

            auth.authenticate(data.token, () => {
                this.setState({error: '' ,open: true})
            })
          }
        })
        event.preventDefault();
    }

    render() { 

        const errors = this.validate(this.state.name,this.state.username, this.state.password);
        return ( 
            <div className="container">
            <div className="row row-content">
                <div className="col-12 col-md-9 mt-5">
                { this.state.error && <Alert color="danger">
                  {this.state.error.message}
                </Alert>}
                <Form onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
                    
                    <FormGroup row>
                        <Label htmlFor="name" md={2}>Name</Label>
                        <Col md={10}>
                            <Input type="text" id="name" name="name"
                            placeholder="Name" value={this.state.name} 
                            valid={errors.name===''}
                            invalid={errors.name!==''}
                            onBlur={this.handleBlur("name")} required/>
                            <FormFeedback>
                                {errors.name}
                            </FormFeedback>

                        </Col>
                    </FormGroup>

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
              <ModalHeader toggle={this.toggleModal}>Register</ModalHeader>
              <ModalBody>
                You have successfully registered ! <br/> 
                <Link to="/login">
              </Link>
              </ModalBody>
            </Modal>
        </div>

         );
    }
}
 
export default withRouter(Register);