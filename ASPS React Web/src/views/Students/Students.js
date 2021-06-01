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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Header from "components/Headers/Header.js";
import ReactTooltip from "react-tooltip";
import _ from "lodash";
import profile from "../../assets/img/icons/profile.png";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import image_sample from "../../assets/img/theme/team-4-800x800.jpg";
import Tooltip from '@material-ui/core/Tooltip';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';

class Students extends React.Component {
  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showAddStudent = this.showAddStudent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addNewStudent = this.addNewStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.showEditStudent = this.showEditStudent.bind(this);
    this.showChangePassword = this.showChangePassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      semester: "",
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
      hidden: false,
      user_detail : 0,
      add_new_student : 0,
      currentStudent : "",
      students_list : "",
      edit_student : 0,
      student_detail : 0,
      change_password : 1,
      password : "",
      confirm_password : ""
    };
  }
  
  async componentDidMount() {
    await axios.get('http://localhost:5000/student/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              students_list: response.data,
              hidden: true
            })
          }else{
              this.setState({ hidden: true, students_list: []})
          }
        })
        .catch((error) => {
          console.log(error);
        })
      await this.setState({ firstname: "",
                  lastname: "",
                  email: "",
                  semester: "",
                  educationlevel: "",
                  phonenumber: "",
                  address: "",
                  city: "",
                  country: "",
                  postalcode: "",
                  add_new_student : 0,
                  currentStudent : "",
                  edit_student: 0,
                  student_detail : 0,
                  change_password : 1,
       });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async handleClick(e, index) {
    e.preventDefault();
  }

  async handleClickVideo(e, index) {
    e.preventDefault();
  }

  async showModal(student) {
    await this.setState({ isOpen: true, currentStudent : student });
    await this.setState({ 
      firstname: this.state.currentStudent.firstname,
      lastname: this.state.currentStudent.lastname,
      email: this.state.currentStudent.email,
      password: this.state.currentStudent.password,
      image_url: this.state.currentStudent.image_url,
      semester: this.state.currentStudent.semester,
      educationlevel: this.state.currentStudent.educationlevel,
      phonenumber: this.state.currentStudent.phonenumber,
      address: this.state.currentStudent.address,
      city: this.state.currentStudent.city,
      country: this.state.currentStudent.country,
      postalcode: this.state.currentStudent.postalcode,
    });
  }

  async closeModal() {
    await this.setState({ isOpen: false, add_new_student : 0, currentStudent : "", edit_student:0 , student_detail:0 , change_password : 1});
  }

  async showAddStudent(){
    await this.setState({ add_new_student : 1 });
  }

  async showChangePassword() {
    await this.setState({ student_detail : 1,
      change_password: 0
    });
  }

  async showEditStudent() {
    await this.setState({ edit_student : 1,
      add_new_student:2,
      isOpen: false,
      firstname: this.state.currentStudent.firstname,
      lastname: this.state.currentStudent.lastname,
      email: this.state.currentStudent.email,
      password: this.state.currentStudent.password,
      image_url: this.state.currentStudent.image_url,
      semester: this.state.currentStudent.semester,
      educationlevel: this.state.currentStudent.educationlevel,
      phonenumber: this.state.currentStudent.phonenumber,
      address: this.state.currentStudent.address,
      city: this.state.currentStudent.city,
      country: this.state.currentStudent.country,
      postalcode: this.state.currentStudent.postalcode,
    });
  }

  async addNewStudent(){
    if ( this.state.firstname =="" || this.state.lastname =="" || 
          this.state.email =="" || this.state.semester =="" || 
          this.state.educationlevel =="" || this.state.phonenumber=="" ||
          this.state.address =="" || this.state.city=="" || this.state.country =="" || this.state.postalcode =="" ){
      NotificationManager.error('All Fields Are Required.');
    }else{
      axios.post(`http://localhost:5000/student/add`,{
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: "12345678",
        image_url: "",
        semester: this.state.semester,
        educationlevel: this.state.educationlevel,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        postalcode: this.state.postalcode,
      })
        .then(res => {
          if (res.data == "Student added!") {
            NotificationManager.success('Student Added!');
            this.componentDidMount();
          } else {
            console.log(res.data)
            NotificationManager.error("Something went wrong.");
          }
      })
    }
  }

  async updateStudent(){
    if ( this.state.firstname =="" || this.state.lastname =="" || 
          this.state.email =="" || this.state.semester =="" || 
          this.state.educationlevel =="" || this.state.phonenumber=="" ||
          this.state.address =="" || this.state.city=="" || this.state.country =="" || this.state.postalcode =="" ){
      NotificationManager.error('All Fields Are Required.');
    }else{
      axios.post(`http://localhost:5000/student/update/`+this.state.currentStudent._id,{
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        image_url: this.state.image_url,
        semester: this.state.semester,
        educationlevel: this.state.educationlevel,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        postalcode: this.state.postalcode,
      })
        .then(res => {
          if (res.data == "Student updated!") {
            NotificationManager.success('Student Updated!');
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
      axios.post(`http://localhost:5000/student/update/`+this.state.currentStudent._id,{
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        image_url: this.state.image_url,
        semester: this.state.semester,
        educationlevel: this.state.educationlevel,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        postalcode: this.state.postalcode,
      })
        .then(res => {
          if (res.data == "Student updated!") {
            NotificationManager.success('Password Updated!');
            this.setState({ student_detail : 0,
              change_password: 1
            });
          } else {
            console.log(res.data)
            NotificationManager.error("Something went wrong.");
          }
      })
    }
  }

  renderResultRows(students_list) {
    return students_list && this.state.students_list.map((student, key) => {
      {
        return <tr key={key} >
          <td scope="row">{key+1}  </td>
          <td scope="row">{student.firstname}  </td>
          <td scope="row">{student.lastname}  </td>
          <td scope="row">{student.email}  </td>
          <td scope="row">{student.semester}  </td>
          <td><span>
            <span style={{ cursor: "pointer" }} data-tip="Details" onClick={this.showModal.bind(this, student)}> <i className="fa fa-table mr-2 text-info" color="secondary" id={'details-' + key} /></span>
            <ReactTooltip />
          </span></td>
        </tr>
      }
    })
   }

  render() {
    const sizes = ["C1", "C2", "C3"];
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
                        <h3 className="mb-0">Students</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                            onClick={this.showAddStudent}
                        >Add New Student
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
                    {this.state.add_new_student==1 && <div>
                        <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Student Information
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
                                        name= "firstname"
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
                                    <Input name= "lastname"
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
                                    <Input name= "email"
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
                                        Semester
                                    </label>
                                    <Input name= "semester"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="which semester"
                                        type="number"
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
                                    <Input name= "educationlevel"
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
                                    <Input name= "phonenumber"
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
                                <Input name= "address"
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
                                <Input name= "city"
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
                                <Input name= "country"
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
                                <Input name= "postalcode"
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
                                        <Button className="my-4 text-center" color="primary" onClick={this.addNewStudent}>
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
                    {this.state.add_new_student==0 && <div>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Semester</th>
                            <th scope="col">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                          {
                              this.state.students_list && this.renderResultRows(this.state.students_list)
                          }
                          {
                              this.state.students_list && _.size(this.state.students_list) === 0 && <td scope="row">{"No Records Found"}  </td>
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
                    {this.state.edit_student==1 && <div>
                        <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Edit Student Information
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
                                        name= "firstname"
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="first name"
                                        type="text"
                                        value={this.state.firstname}
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
                                    <Input name= "lastname"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="last name"
                                        type="text"
                                        value={this.state.lastname}
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
                                    <Input name= "email"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="email"
                                        type="email"
                                        value={this.state.email}
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
                                        Semester
                                    </label>
                                    <Input name= "semester"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="which semester"
                                        type="number"
                                        value={this.state.semester}
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
                                    <Input name= "educationlevel"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="education level"
                                        type="text"
                                        value={this.state.educationlevel}
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
                                    <Input name= "phonenumber"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="phone number"
                                        type="number"
                                        value={this.state.phonenumber}
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
                                <Input name= "address"
                                  className="form-control-alternative"
                                  id="input-address"
                                  placeholder="Home Address"
                                  type="text"
                                  value={this.state.address}
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
                                <Input name= "city"
                                  className="form-control-alternative"
                                  id="input-city"
                                  placeholder="city"
                                  type="text"
                                  value={this.state.city}
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
                                <Input name= "country"
                                  className="form-control-alternative"
                                  id="input-country"
                                  placeholder="country"
                                  type="text"
                                  value={this.state.country}
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
                                <Input name= "postalcode"
                                  className="form-control-alternative"
                                  id="input-postal-code"
                                  placeholder="postal code"
                                  type="number"
                                  value={this.state.postalcode}
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
                                        <Button className="my-4 text-center" color="primary" onClick={this.updateStudent}>
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
                <ModalHeader >
                  {this.state.student_detail==0 && <strong>Student Detail</strong>}
                  {this.state.change_password==0 && <strong>Change Password</strong>}
                </ModalHeader>
                <ModalBody>
                  {this.state.student_detail==0 && 
                    <Col lg='12' md='12' sm='12' xs='12'>
                    <div className="text-muted text-center" style={{height: 180}}>
                      <img className="rounded-circle" src= {profile} style={{width: 160, height: 160}} />
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='6' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">First Name :</strong> {this.state.currentStudent.firstname}</span>
                        </Col>
                        <Col lg='6' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Last Name :</strong> {this.state.currentStudent.lastname}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='12' sm='12' xs='12'>
                        <span><strong className="text-dark text-justify"> Email :</strong> {this.state.currentStudent.email}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='6' md='8' sm='12' xs='12'>
                            <span><strong className="text-dark">Semester :</strong> {this.state.currentStudent.semester}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='6' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">City :</strong> {this.state.currentStudent.city}</span>
                        </Col>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Country :</strong> {this.state.currentStudent.country}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Address :</strong> {this.state.currentStudent.address}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Phone :</strong> {this.state.currentStudent.phonenumber}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Postal Code :</strong> {this.state.currentStudent.postalcode}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Education Level :</strong> {this.state.currentStudent.educationlevel}</span>
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
                  {this.state.student_detail==0 &&<Button color="primary" onClick={this.showChangePassword}>Change Password</Button>}
                  {this.state.student_detail==0 &&<Button color="success" onClick={this.showEditStudent}>Edit</Button>}
                  {this.state.student_detail==0 && <Button color="danger" onClick={this.closeModal}>Close</Button>}
                  {this.state.change_password==0 &&<Button color="success" onClick={this.changePassword}>Save</Button>}
                </ModalFooter>
              </Modal>
        </Container>
      </>
    );
  }
}

export default Students;
