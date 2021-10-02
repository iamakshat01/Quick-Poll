import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { read, readall } from '../api/api-poll';
import classnames from 'classnames';
import auth from '../api/auth-helper';

class Polls extends Component {
  constructor(props) {
    super(props);
    this.state={
        userpolls:[],
        allpolls:[],
        activeTab:'1'
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab)
  {
    if(this.state.activeTab !== tab) 
        this.setState({
            activeTab:tab
    })
  }

  componentDidMount() {
    
    // fetch user polls only if user is signedIn
    if(auth.isAuthenticated()) {
      read().then((data) => {
        if (data.error) {
          this.setState({error: data.error})
        } else {

              this.setState({userpolls: data })
        }
      })
    }
    
    // fetch all polls from database
    readall().then((data) => {
        if (data.error) {
          this.setState({error: data.error})
        } else {
          this.setState({allpolls: data })
        }
    })

  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/poll/${id}`);
  }

  render() {
    

    const allpolls = this.state.allpolls.map(poll => (
      <li className=" list-group-item list-group-item-info" onClick={() => this.handleSelect(poll._id)} key={poll._id}>
         <i className="fa fa-pie-chart" aria-hidden="true"></i> {poll.question} 
      </li>
    ));

    const userpolls = this.state.userpolls.map(poll => (
        <li className=" list-group-item list-group-item-info" onClick={() => this.handleSelect(poll._id)} key={poll._id}>
          <i className="fa fa-pie-chart" aria-hidden="true"></i> {poll.question}
        </li>
    ));

    return (
      <Fragment>
         <Nav className="mt-4 justify-content-center" tabs>
            <NavItem className="mr-2">
            <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
            >
                All Polls
            </NavLink>
            </NavItem>
            {auth.isAuthenticated() && <NavItem className="ml-2">
            <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
            >
                Your Polls
            </NavLink>
            </NavItem>}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
            <Row>
                <Col className="mx-auto" md="8">
                    <ul className="list-group polls">{allpolls}</ul>
                </Col>
            </Row>
            </TabPane>
            <TabPane tabId="2">
            <Row>
                <Col className="mx-auto" md="8">
                    <ul className="list-group polls">{userpolls}</ul>
                </Col>
            </Row>
            </TabPane>
        </TabContent>
      </Fragment>
    );
  }
}

export default withRouter(Polls);
