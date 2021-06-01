import React,{Component} from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner
} from "reactstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import history from '../../history';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : "",
      password : "",
      hidden : false
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signin = this.signin.bind(this);
  }

  onUserChange=(e)=>{
    this.setState({user : e.target.value});
  }

  onPasswordChange=(e)=>{
    this.setState({password : e.target.value});
  }

  async signin(){
    await this.setState({hidden:true})
    if ( this.state.user =="" || this.state.password =="" ){
      NotificationManager.error('Credential Required.');
    }else{
      axios.post(`http://localhost:5000/signin/auth`,{
        user : this.state.user,
        password : this.state.password,
        user_type : "admin"
      })
        .then(res => {
          if (res.data.message == "Sign in successfully.") {
            localStorage.setItem('userToken', JSON.stringify(res.data.token));
            NotificationManager.success('Log In Successfully!');
            setTimeout(() => this.props.history.push(`/admin/dashboard`), 1000);
          } else {
            NotificationManager.error(res.data);
          }
          this.setState({hidden: false})
      })
    }
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <NotificationContainer />
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-2">
              <div className="text-muted text-center">
                <medium>Sign in</medium>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-2">
              <div className="text-center text-muted mb-4">
                <small>with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="User" type="email" onChange={this.onUserChange} value={this.state.user}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" onChange={this.onPasswordChange} value={this.state.password}/>
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.signin}>
                    Sign in{this.state.hidden && <Spinner size="sm" role="status"></Spinner>}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}


export default (Login);
