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

class Courses extends React.Component {
  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showAddCourse = this.showAddCourse.bind(this);
    this.addNewCourse = this.addNewCourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showEditCourse = this.showEditCourse.bind(this);
    this.state = {
      coursecode : "",
      coursename : "",
      credithours : "",
      semester : "",
      numberoflectures : "",
      pagesCount: 0,
      currentPage: 0,
      token : "",
      courses_list : [],
      tooltipOpen: false,
      isOpen: false,
      hidden:false,
      course_detail : 0,
      add_new_course : 0,
      currentCourse: '',
      edit_course: 0
    };
  }
  
  async componentDidMount() {
    await axios.get('http://localhost:5000/course/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            courses_list: response.data,
            hidden: true
          })
        }else{
            this.setState({ hidden: true,
                courses_list: [] })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    await this.setState({ coursecode : "",
                coursename : "",
                credithours : "",
                semester : "",
                numberoflectures : "",
                add_new_course : 0,
                currentCourse : "",
                edit_course : 0
     });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async handleClick(e, index) {
    e.preventDefault();
  }

  async showModal(course) {
    await this.setState({ isOpen: true, currentCourse: course });

  }

  closeModal() {
    this.setState({ isOpen: false, add_new_course : 0, edit_course : 0, currentCourse: "" });
  }

  showAddCourse(){
    this.setState({ add_new_course : 1 });
  }

  async showEditCourse() {
    await this.setState({ edit_course : 1,
      add_new_course:2,
      isOpen: false,
      coursecode : this.state.currentCourse.coursecode,
      coursename : this.state.currentCourse.coursename,
      credithours : this.state.currentCourse.credithours,
      semester : this.state.currentCourse.semester,
      numberoflectures : this.state.currentCourse.numberoflectures
    });
  }

  async addNewCourse(){
    if ( this.state.coursecode =="" || this.state.coursename =="" || this.state.credithours =="" || this.state.semester =="" || this.state.numberoflectures=="" ){
      NotificationManager.error('All Fields Are Required.');
    }else{
      axios.post(`http://localhost:5000/course/add`,{
        coursecode : this.state.coursecode,
        coursename : this.state.coursename,
        credithours : this.state.credithours,
        semester : this.state.semester,
        numberoflectures : this.state.numberoflectures
      })
        .then(res => {
          if (res.data == "Course added!") {
            NotificationManager.success('Course Added!');
            this.componentDidMount();
          } else {
            console.log(res.data)
            NotificationManager.error("Something went wrong.");
          }
      })
    }
  }

  async updateCourse(){
    if ( this.state.coursecode =="" || this.state.coursename =="" || this.state.credithours =="" || this.state.semester =="" || this.state.numberoflectures=="" ){
      NotificationManager.error('All Fields Are Required.');
    }else{
      axios.post(`http://localhost:5000/course/update/`+this.state.currentCourse._id,{
        coursecode : this.state.coursecode,
        coursename : this.state.coursename,
        credithours : this.state.credithours,
        semester : this.state.semester,
        numberoflectures : this.state.numberoflectures
      })
        .then(res => {
          if (res.data == "Course updated!") {
            NotificationManager.success('Course Updated!');
            this.componentDidMount();
          } else {
            console.log(res.data)
            NotificationManager.error("Something went wrong.");
          }
      })
    }
  }

  renderResultRows(courses_list) {
    return courses_list && this.state.courses_list.map((course, key) => {
      {
        return <tr key={key} >
          <td scope="row">{key+1}  </td>
          <td scope="row">{course.coursecode}  </td>
          <td scope="row">{course.coursename}  </td>
          <td scope="row">{course.credithours}  </td>
          <td><span>
            <span style={{ cursor: "pointer" }} data-tip="Details" onClick={this.showModal.bind(this, course)}> <i className="fa fa-table mr-2 text-info" color="secondary" id={'details-' + key} /></span>
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
                        <h3 className="mb-0">Courses</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                            onClick={this.showAddCourse}
                        >Add New Course
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
                    {this.state.add_new_course==1 && <div>
                        <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Add New Course
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        Course Code
                                    </label>
                                    <Input
                                        name = "coursecode"
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="Course Code"
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
                                        Course Name
                                    </label>
                                    <Input
                                        name = "coursename"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="Course Name"
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
                                        Credit Hours
                                    </label>
                                    <Input
                                        name = "credithours"
                                        className="form-control-alternative"
                                        id="input-first-name"
                                        placeholder="Credit Hours"
                                        type="number"
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
                                    <Input
                                        name = "semester"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="Which Semester"
                                        type="number"
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
                                        Lectures
                                    </label>
                                    <Input
                                        name = "numberoflectures"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="How many lectures"
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
                                        <Button className="my-4 text-center" color="primary" onClick={this.addNewCourse}>
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
                    {this.state.add_new_course==0 && <div>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Credit Hours</th>
                            <th scope="col">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                          {
                              this.state.courses_list && this.renderResultRows(this.state.courses_list)
                          }
                          {
                              this.state.courses_list && _.size(this.state.courses_list) === 0 && <td scope="row">{"No Records Found"}  </td>
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
                    {this.state.edit_course==1 && <div>
                        <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Edit Course
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        Course Code
                                    </label>
                                    <Input
                                        name = "coursecode"
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="Course Code"
                                        type="text"
                                        value={this.state.coursecode}
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
                                        Course Name
                                    </label>
                                    <Input
                                        name = "coursename"
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="Course Name"
                                        type="text"
                                        value={this.state.coursename}
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
                                        Credit Hours
                                    </label>
                                    <Input
                                        name = "credithours"
                                        className="form-control-alternative"
                                        id="input-first-name"
                                        placeholder="Credit Hours"
                                        type="number"
                                        value={this.state.credithours}
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
                                    <Input
                                        name = "semester"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="Which Semester"
                                        type="number"
                                        value={this.state.semester}
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
                                        Lectures
                                    </label>
                                    <Input
                                        name = "numberoflectures"
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        placeholder="How many lectures"
                                        type="number"
                                        value={this.state.numberoflectures}
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
                                        <Button className="my-4 text-center" color="primary" onClick={this.updateCourse}>
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
                <ModalHeader ><strong>Course Detail</strong></ModalHeader>
                <ModalBody>
                    <Col lg='12' md='12' sm='12' xs='12'>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Course Code :</strong> {this.state.currentCourse.coursecode}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                        <span><strong className="text-dark">Course Name :</strong> {this.state.currentCourse.coursename}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='12' sm='12' xs='12'>
                        <span><strong className="text-dark text-justify"> Credit Hours :</strong> {this.state.currentCourse.credithours}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                            <span><strong className="text-dark">Semester :</strong> {this.state.currentCourse.semester}</span>
                        </Col>
                    </div>
                    <div className='d-flex mb-2'>
                        <Col lg='12' md='8' sm='12' xs='12'>
                            <span><strong className="text-dark">Lectures :</strong> {this.state.currentCourse.numberoflectures}</span>
                        </Col>
                    </div>
                    </Col>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.showEditCourse}>Edit</Button>
                    <Button color="danger" onClick={this.closeModal}>Close</Button>
                </ModalFooter>
              </Modal>
        </Container>
      </>
    );
  }
}

export default Courses;
