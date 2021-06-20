import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import {vote,readone} from '../api/api-poll';
import {Alert, Button} from "reactstrap"
import {
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import config from '../config'

var colset=["#ffa600","#d45087","#003f5c","#f95d6a","#ffa600"]
var c=0;
const color = () => {
  c++;
  c=c%4
  return (
    colset[c]
  );
};

class Poll extends Component{
  
  constructor(props)
  {
    super(props);
    this.state={
      poll:'',
      chart:{},
      error:'',
      msg:'',
      view:''
    }
    this.answerclick=this.answerclick.bind(this);
    this.refresh=this.refresh.bind(this);
  }
  componentDidMount()
  {
    readone(this.props.match.params.pollId).then((polldata) => {
      if (polldata.error) {
        this.setState({error: polldata.error})
      } else {
        this.setState({poll: polldata})
        c=0;
        this.setState({
          chart:{

            labels: this.state.poll.options.map(option => {if(option.option!=='') return option.option}),
            datasets: [
                {
                  label: this.state.poll.question,
                  backgroundColor: this.state.poll.options.map(option => color()),
                  borderColor: '#323643',
                  data: this.state.poll.options.map(option => option.votes),
                },
              ],
          }
        }) 
      }
    })
    
  }
  refresh()
  {
    readone(this.props.match.params.pollId).then((polldata) => {
      if (polldata.error) {
        this.setState({error: polldata.error})
      } else {
        this.setState({poll: polldata})
        this.setState({
          chart:{

            labels: polldata.options.map(option => {if(option.option!=='') return option.option}),
            datasets: [
                {
                  label: polldata.question,
                  backgroundColor: polldata.options.map(option => color()),
                  borderColor: '#323643',
                  data: polldata.options.map(option => option.votes),
                },
              ],
          }
        }) 
      }
    })
  }
  answerclick()
  {
    this.setState({
      ...this.state,
      view:!this.state.view
    })
  }
  render()
  {
    const answers =
    this.state.poll.options &&
    this.state.poll.options.map(option => (
      option.option && <Button
        onClick={ 
                    () => vote(this.state.poll._id, { answer: option.option })
                          .then((data)=>{
                            if(data.error)
                              this.setState({msg:'',error: data.error})
                            else
                              this.setState({error:'', msg: "Your Vote has been successfully recorded"})
                              c=0;
                              readone(this.props.match.params.pollId).then((polldata) => {
                                if (polldata.error) {
                                  this.setState({error: polldata.error})
                                } else {
                                  this.setState({poll: polldata})
                                  this.setState({
                                    chart:{
                          
                                      labels: polldata.options.map(option => {if(option.option!=='') return option.option}),
                                      datasets: [
                                          {
                                            label: polldata.question,
                                            backgroundColor: polldata.options.map(option => color()),
                                            borderColor: '#323643',
                                            data: polldata.options.map(option => option.votes),
                                          },
                                        ],
                                    }
                                  }) 
                                }
                              })


                          })
                }
        className="btn-primary ml-3"
        color="warning"
        key={option._id}>
        {option.option}
      </Button>));

      const response =
      this.state.poll.options &&
      this.state.poll.options.map(option => (
        option.option && <Button
          className="btn-primary ml-3"
          color="info"
          key={option._id}>
          {option.option}
          <br></br>
          {option.votes}
        </Button>
      ));

    return (
      <div className="container mt-5">
        {this.state.error && <Alert className="col-md-6 mx-auto" color="danger">{this.state.error.message}</Alert>}
        {this.state.msg && <Alert className="col-md-8 mx-auto" color="primary">{this.state.msg}</Alert>}
          <h4 class="col-md-10 mx-auto"><Alert color="info">{this.state.poll.question}</Alert></h4>
        <div className="buttons_center mt-4 mb-4">{answers}</div> 

        <div>
            <h6>Share It On!</h6>
            <FacebookShareButton
              url={config.base+'/poll/'+this.props.match.params.pollId}
              imageURL={''}
              quote={this.state.poll.question} 
              className="m-2">
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <TwitterShareButton
              url={config.base+'/poll/'+this.props.match.params.pollId}
              title={this.state.poll.question}
              media={''}
              className="m-2">
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>


            <WhatsappShareButton
              url={config.base+'/poll/'+this.props.match.params.pollId}
              title= {this.state.poll.question}
              media={''}
              className="m-2">
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>


            <LinkedinShareButton
              url={config.base+'/poll/'+this.props.match.params.pollId}
              title={this.state.poll.question}
              media={''}
              className="m-2">
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>


            <EmailShareButton
              url={config.base+'poll/'+this.props.match.params.pollId}
              title={this.state.poll.question}
              media={''}
              className="m-2">
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          
        </div>
        <Button onClick={this.answerclick}>View Results</Button>
        <Button className="ml-2" onClick={this.refresh}><i class="fa fa-refresh" aria-hidden="true"></i></Button>
        {this.state.view && <div className="container mt-5">
          <div className="container mt-3 mb-3">{response}</div>
          <Pie data={this.state.chart} /> 
        </div>}
        
      </div>
    );
    
  }
}

export default (Poll);
