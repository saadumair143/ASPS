import React from "react";

// reactstrap components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  CardBody,
  Spinner,
  CardImg,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import ReactTooltip from "react-tooltip";
import _ from "lodash";
import profile from "../../assets/img/icons/profile.png";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import image_sample from "../../assets/img/theme/team-4-800x800.jpg";
import Tooltip from '@material-ui/core/Tooltip';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';

class Teachers extends React.Component {
  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showAddTeacher = this.showAddTeacher.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addNewTeacher = this.addNewTeacher.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
    this.showEditTeacher = this.showEditTeacher.bind(this);
    this.showChangePassword = this.showChangePassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      course: "",
      educationlevel: "",
      phonenumber: "",
      address: "",
      city: "",
      country: "",
      postalcode: "",
      pagesCount: 0,
      currentPage: 0,
      token : "",
      tooltipOpen: false,
      isOpen: false,
      hidden: false,
      add_new_teacher : 0,
      teachers_list : "",
      currentTeacher : "",
      edit_teacher : 0,
      teacher_detail : 0,
      change_password : 1,
      password : "",
      confirm_password : ""
    };
  }
  
  async componentDidMount() {
    await axios.get('http://localhost:5000/teacher/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            teachers_list: response.data,
            hidden: true
          })
        }else{
            this.setState({ hidden: true, teachers_list: []})
        }
      })
      .catch((error) => {
        console.log(error);
      })
    await this.setState({ firstname: "",
                lastname: "",
                email: "",
                course: "",
                course: "",
                educationlevel: "",
                phonenumber: "",
                address: "",
                city: "",
                country: "",
                postalcode: "",
                add_new_teacher : 0,
                currentTeacher : "",
                edit_teacher : 0,
                teacher_detail : 0,
                change_password : 1,
     });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async handleClick(e, index) {
    e.preventDefault();
  }
  
  async showModal(teacher) {
    await this.setState({ isOpen: true, currentTeacher: teacher });
    await this.setState({ 
      firstname: this.state.currentTeacher.firstname,
      lastname: this.state.currentTeacher.lastname,
      email: this.state.currentTeacher.email,
      password: this.state.currentTeacher.password,
      image_url: this.state.currentTeacher.image_url,
      course: this.state.currentTeacher.course,
      educationlevel: this.state.currentTeacher.educationlevel,
      phonenumber: this.state.currentTeacher.phonenumber,
      address: this.state.currentTeacher.address,
      city: this.state.currentTeacher.city,
      country: this.state.currentTeacher.country,
      postalcode: this.state.currentTeacher.postalcode,
    });
  }

  async closeModal() {
    await this.setState({ isOpen: false,add_new_teacher : 0, currentTeacher: "" ,edit_teacher : 0 , teacher_detail : 0, change_password : 1});
  }

  async showAddTeacher(){
    await this.setState({ add_new_teacher : 1 });
  }

  async showEditTeacher() {
    await this.setState({ edit_teacher : 1,
      add_new_teacher:2,
      isOpen: false
    });
  }

  async showChangePassword() {
    await this.setState({ teacher_detail : 1,
      change_password: 0
    });
  }

  async addNewTeacher(){
    if ( this.state.firstname =="" || this.state.lastname =="" || 
          this.state.email =="" || this.state.course =="" || 
          this.state.educationlevel =="" || this.state.phonenumber=="" ||
          this.state.address =="" || this.state.city=="" || this.state.country =="" || this.state.postalcode =="" ){
      NotificationManager.error('All Fields Are Required.');
    }else{
      axios.post(`http://localhost:5000/teacher/add`,{
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: "12345678",
        image_url: "",
        course: this.state.course,
        educationlevel: this.state.educationlevel,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        postalcode: this.state.postalcode,
      })
        .then(res => {
          if (res.data == "Teacher added!") {
            NotificationManager.success('Teacher Added!');
            this.componentDidMount();
          } else {
            console.log(res.data)
            NotificationManager.error("Something went wrong.");
          }
      })
    }
  }

  async updateTeacher(){
    if ( this.state.firstname =="" || this.state.lastname =="" || 
          this.state.email =="" || this.state.course =="" || 
          this.state.educationlevel =="" || this.state.phonenumber=="" ||
          this.state.address =="" || this.state.city=="" || this.state.country =="" || this.state.postalcode =="" ){
      NotificationManager.error('All Fields Are Required.');
    }else{
      axios.post(`http://localhost:5000/teacher/update/`+this.state.currentTeacher._id,{
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        image_url: this.state.image_url,
        course: this.state.course,
        educationlevel: this.state.educationlevel,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        postalcode: this.state.postalcode,
      })
        .then(res => {
          if (res.data == "Teacher updated!") {
            NotificationManager.success('Teacher Updated!');
            this.componentDidMount();
          } else {
            console.log(res.data)
            NotificationManager.error("Something went wrong.");
          }
      })
    }
  }

  async changePassword(){
    if ( this.state.password =="" || this.state.confirm_password =="" ){
      NotificationManager.error('All Fields Are Required.');
    }else if(this.state.password != this.state.confirm_password){
      NotificationManager.error("Mismatch Password");
    }else{
      axios.post(`http://localhost:5000/teacher/update/`+this.state.currentTeacher._id,{
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        image_url: this.state.image_url,
        course: this.state.course,
        educationlevel: this.state.educationlevel,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        postalcode: this.state.postalcode,
      })
        .then(res => {
          if (res.data == "Teacher updated!") {
            NotificationManager.success('Password Updated!');
            this.setState({ teacher_detail : 0,
              change_password: 1
            });
          } else {
            console.log(res.data)
            NotificationManager.error("Something went wrong.");
          }
      })
    }
  }

  renderResultRows(teachers_list) {
    return teachers_list && this.state.teachers_list.map((teacher, key) => {
      {
        return <tr key={key} >
          <td scope="row">{key+1}  </td>
          <td scope="row">{teacher.firstname}  </td>
          <td scope="row">{teacher.lastname}  </td>
          <td scope="row">{teacher.email}  </td>
          <td scope="row">{teacher.course}  </td>
          <td><span>
            <span style={{ cursor: "pointer" }} data-tip="Details" onClick={this.showModal.bind(this, teacher)}> <i className="fa fa-table mr-2 text-info" color="secondary" id={'details-' + key} /></span>
            <ReactTooltip />
          </span></td>
        </tr>
      }
    })
   }

  render() {
    return (
      <>
        <Header />
        <NotificationContainer />
        <Container className="mt-2" fluid>
              {
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Teachers</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                            onClick={this.showAddTeacher}
                        >Add New Teacher
                        </Button>
                        </Col>
                    </Row>
                  </CardHeader>
                  {!this.state.hidden &&
                    <CardBody>
                      <div style={{
                        position: 'absolute', left: '50%', top: '10%',
                      }} xs={12}><Spinner style={{ background:"text-success" ,width: '3rem', height: '3rem' }} value={false} /></div>
                    </CardBody>
                  }
                  {this.state.hidden &&
                  <CardBody>
                    {this.state.add_new_teacher==1 && <div>
                        <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Teacher Information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        First Name
                                    </label>
                                    <Input
                                        name = "firstname"
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="first name"
                                        type="text"
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                    >
                                        Last Name
                                    </label>
                                    <Input
                                        name = "lastname"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="last name"
                                        type="text"
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-first-name"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        name = "email"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="email"
                                        type="email"
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-last-name"
                                    >
                                        Course
                                    </label>
                                    <Input
                                        name = "course"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="course"
                                        type="text"
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-first-name"
                                    >
                                        Education Level
                                    </label>
                                    <Input
                                        name = "educationlevel"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="education level"
                                        type="text"
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-last-name"
                                    >
                                        Phone Number
                                    </label>
                                    <Input
                                        name = "phonenumber"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="phone number"
                                        type="number"
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                          Contact information
                        </h6>
                        <div className="pl-lg-4">
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Address
                                </label>
                                <Input
                                  name = "address"
                                  className="form-control-alternative"
                                  id="input-address"
                                  placeholder="Home Address"
                                  type="text"
                                  onChange={this.onChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  City
                                </label>
                                <Input
                                  name = "city"
                                  className="form-control-alternative"
                                  id="input-city"
                                  placeholder="city"
                                  type="text"
                                  onChange={this.onChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Country
                                </label>
                                <Input
                                  name = "country"
                                  className="form-control-alternative"
                                  id="input-country"
                                  placeholder="country"
                                  type="text"
                                  onChange={this.onChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Postal code
                                </label>
                                <Input
                                  name = "postalcode"
                                  className="form-control-alternative"
                                  id="input-postal-code"
                                  placeholder="postal code"
                                  type="number"
                                  onChange={this.onChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                                <Col lg="5"></Col>
                                <Col lg="6">
                                    <Row>
                                    <div className="text-center">
                                        <Button className="my-4 text-center" color="primary" onClick={this.addNewTeacher}>
                                            Add {!this.state.hidden && <Spinner size="sm" role="status"></Spinner>}
                                        </Button>
                                    </div>
                                    <div className="text-center">
                                        <Button className="mr-4 my-4 text-center" color="danger" onClick={this.closeModal}>
                                            Cancel
                                        </Button>
                                    </div>
                                    </Row>
                                </Col>
                            </Row>
                          </div>
                        </Form>
                        </div>}
                    {this.state.add_new_teacher==0 && <div>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Course</th>
                            <th scope="col">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                          {
                              this.state.teachers_list && this.renderResultRows(this.state.teachers_list)
                          }
                          {
                              this.state.teachers_list && _.size(this.state.teachers_list) === 0 && <td scope="row">{"No Records Found"}  </td>
                          }
                        </tbody>
                    </Table>
                    <nav>
                        <Pagination className="col text-right mt-3">
                    
                        <PaginationItem disabled={this.state.currentPage <= 0}>
                        
                        <PaginationLink
                            onClick={e => this.handleClick(e, this.state.currentPage - 1)}
                            previous
                            href="#"
                        />
                        
                        </PaginationItem>

                        {[...Array(this.state.pagesCount)].map((page, i) => 
                        <PaginationItem active={i === this.state.currentPage} key={i}>
                            <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                            {i+1}
                            </PaginationLink>
                        </PaginationItem>
                        )}

                        <PaginationItem disabled={this.state.currentPage >= this.state.pagesCount - 1}>
                        
                        <PaginationLink
                            onClick={e => this.handleClick(e, this.state.currentPage + 1)}
                            next
                            href="#"
                            />
                        
                        </PaginationItem>
                        
                        </Pagination>
                    </nav>
                    </div>}
                    {this.state.edit_teacher==1 && <div>
                        <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Edit Teacher Information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        First Name
                                    </label>
                                    <Input
                                        name = "firstname"
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="first name"
                                        type="text"
                                        value = {this.state.firstname}
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                    >
                                        Last Name
                                    </label>
                                    <Input
                                        name = "lastname"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="last name"
                                        type="text"
                                        value = {this.state.lastname}
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-first-name"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        name = "email"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="email"
                                        type="email"
                                        value = {this.state.email}
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-last-name"
                                    >
                                        Course
                                    </label>
                                    <Input
                                        name = "course"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="course"
                                        type="text"
                                        value = {this.state.course}
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-first-name"
                                    >
                                        Education Level
                                    </label>
                                    <Input
                                        name = "educationlevel"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="education level"
                                        type="text"
                                        value = {this.state.educationlevel}
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-last-name"
                                    >
                                        Phone Number
                                    </label>
                                    <Input
                                        name = "phonenumber"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="phone number"
                                        type="number"
                                        value = {this.state.phonenumber}
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                          Contact information
                        </h6>
                        <div className="pl-lg-4">
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Address
                                </label>
                                <Input
                                  name = "address"
                                  className="form-control-alternative"
                                  id="input-address"
                                  placeholder="Home Address"
                                  type="text"
                                  value = {this.state.address}
                                  onChange={this.onChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  City
                                </label>
                                <Input
                                  name = "city"
                                  className="form-control-alternative"
                                  id="input-city"
                                  placeholder="city"
                                  type="text"
                                  value = {this.state.city}
                                  onChange={this.onChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Country
                                </label>
                                <Input
                                  name = "country"
                                  className="form-control-alternative"
                                  id="input-country"
                                  placeholder="country"
                                  type="text"
                                  value = {this.state.country}
                                  onChange={this.onChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Postal code
                                </label>
                                <Input
                                  name = "postalcode"
                                  className="form-control-alternative"
                                  id="input-postal-code"
                                  placeholder="postal code"
                                  type="number"
                                  value = {this.state.postalcode}
                                  onChange={this.onChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                                <Col lg="5"></Col>
                                <Col lg="6">
                                    <Row>
                                    <div className="text-center">
                                        <Button className="my-4 text-center" color="primary" onClick={this.updateTeacher}>
                                            Update {!this.state.hidden && <Spinner size="sm" role="status"></Spinner>}
                                        </Button>
                                    </div>
                                    <div className="text-center">
                                        <Button className="mr-4 my-4 text-center" color="danger" onClick={this.closeModal}>
                                            Cancel
                                        </Button>
                                    </div>
                                    </Row>
                                </Col>
                            </Row>
                          </div>
                        </Form>
                        </div>}
                  </CardBody>
                  }
                </Card>
              }
              <Modal isOpen={this.state.isOpen} toggle={this.closeModal}>
                <ModalHeader >{this.state.teacher_detail==0 && <strong>Teacher Detail</strong>}
                  {this.state.change_password==0 && <strong>Change Password</strong>}
                </ModalHeader>
                <ModalBody>
                  {this.state.teacher_detail==0 && 
                    <Col lg='12' md='12' sm='12' xs='12'>
                    <div className="text-muted text-center" style={{height: 180}}>
                      <img className="rounded-circle" src= {profile} style={{width: 160, height: 160}} />
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='6' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">First Name :</strong> {this.state.currentTeacher.firstname}</span>
                        </Col>
                        <Col lg='6' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Last Name :</strong> {this.state.currentTeacher.lastname}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='12' sm='12' xs='12'>
                        <span><strong className="text-dark text-justify"> Email :</strong> {this.state.currentTeacher.email}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='6' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">City :</strong> {this.state.currentTeacher.city}</span>
                        </Col>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Country :</strong> {this.state.currentTeacher.country}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Address :</strong> {this.state.currentTeacher.address}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Phone :</strong> {this.state.currentTeacher.phonenumber}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Postal Code :</strong> {this.state.currentTeacher.postalcode}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Education :</strong> {this.state.currentTeacher.educationlevel}</span>
                        </Col>
                    </div>
                    </Col>
                  }
                  {this.state.change_password==0 && 
                    <Col lg='12' md='12' sm='12' xs='12'>
                    <div className='d-flex mb-2'>
                      <Form>
                        <div className="pl-lg-8">
                          <Row>
                                <Col lg="12">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        name = "password"
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="password"
                                        type="password"
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                <Col lg="12">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                    >
                                        Confirm Password
                                    </label>
                                    <Input
                                        name = "confirm_password"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="confirm password"
                                        type="password"
                                        onChange={this.onChange}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                      </Form>
                    </div>
                    </Col>
                  }
                </ModalBody>
                <ModalFooter>
                  {this.state.teacher_detail==0 &&<Button color="primary" onClick={this.showChangePassword}>Change Password</Button>}
                  {this.state.teacher_detail==0 &&<Button color="success" onClick={this.showEditTeacher}>Edit</Button>}
                  {this.state.teacher_detail==0 && <Button color="danger" onClick={this.closeModal}>Close</Button>}
                  {this.state.change_password==0 &&<Button color="success" onClick={this.changePassword}>Save</Button>}
                </ModalFooter>
              </Modal>
        </Container>
      </>
    );
  }
}

export default Teachers;
