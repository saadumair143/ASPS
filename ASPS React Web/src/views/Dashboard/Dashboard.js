import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Spinner,
  Row,
  Col,
  CardTitle,
  CardImg,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";
import image_sample from "../../assets/img/theme/team-4-800x800.jpg";
import Header from "components/Headers/Header.js";
import Tooltip from '@material-ui/core/Tooltip';
import _ from "lodash";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      hidden : true,
      activeNav: 1,
      dashboard : '',
      allVideos : "",
      pagesCount: 0,
      currentPage : 0,
      chartExample1Data: "data1",
      isOpenVideo : false,
      currentVideo : ""
    };
  }

  async componentDidMount() {
    
  }

  showModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <>
        <Header />
        <NotificationContainer/>
        <Container className="mt-2" fluid>
          {!this.state.hidden &&
          <CardBody>
            <div style={{
              position: 'absolute', left: '50%', top: '80%',
            }} xs={12}><Spinner style={{ background:"text-success" ,width: '3rem', height: '3rem' }} value={false} /></div>
            </CardBody>
          }
          {this.state.hidden && <div>
          <Row className="mt-2">
                <Col lg="12" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Courses
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {20}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-book" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="12" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Teachers
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {250}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
          </Row>
          <Row className="mt-2">
                <Col lg="12" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Students
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {9000}
                            </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="12" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Members
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {15000}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
          </Row>
          <Row className="mt-2">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Recent News</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Container className="mt-2" fluid>
                    <Row className="mt-2">
                      <div>
                        <h2>Sessional starts from 20-06-2021</h2>
                        <p>Every thing will be fine just go according to plan</p>
                      </div>
                    </Row>
                  </Container>
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
                </CardBody>
              </Card>
            </Col>
          </Row></div>}
        </Container>
      </>
    );
  }
}

export default Dashboard;
