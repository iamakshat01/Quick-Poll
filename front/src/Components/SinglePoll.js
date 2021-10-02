import React, { Component } from 'react';
import { VictoryPie } from "victory";
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



class Poll extends Component{
  
  constructor(props)
  {
    super(props);
    this.state={
      poll:'',
      error:'',
      msg:'',
      view:''
    }
    this.answerclick=this.answerclick.bind(this);
    this.refresh=this.refresh.bind(this);
  }
  componentDidMount()
  {
    // fetch a single poll  
    readone(this.props.match.params.pollId).then((polldata) => {
      if (polldata.error) {
        this.setState({error: polldata.error})
      } else {
        this.setState({poll: polldata})
      }
    })
    
  }
  
  // to refetch the data of poll
  refresh()
  {
    readone(this.props.match.params.pollId).then((polldata) => {
      if (polldata.error) {
        this.setState({error: polldata.error})
      } else {
        this.setState({poll: polldata})
      }
    })
  }
  
  // submitting a vote
  answerclick()
  {
    this.setState({
      ...this.state,
      view:!this.state.view
    })
  }

  render()
  {
    const answers = this.state.poll.options &&
      this.state.poll.options.map(option => (
        option.option && <Button
            onClick={ 
                        () => vote(this.state.poll._id, { answer: option.option })
                              .then((data)=>{
                                if(data.error)
                                  this.setState({msg:'',error: data.error})
                                else
                                  this.setState({error:'', msg: "Your Vote has been successfully recorded"})
                                  this.refresh();
                              })
                    }
            className="btn-primary ml-3"
            color="warning"
            key={option._id}>
            {option.option}
        </Button>
      ));

    const response = this.state.poll.options &&
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

          <VictoryPie 
            data={this.state.poll.options}
            responsive={true}
            startAngle={50}
            endAngle={450}
            height={300}
            animate={{
              duration: 2000
            }}
            colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
            x={(data)=> data.votes>0?data.option:null}
            y={(data)=> data.votes>0?data.votes:null} 
            style={{ 
              labels: { fill: "black", fontSize: 8, fontWeight: "bold" },
              data: {
                fillOpacity: 0.9, stroke: "#c43a31", strokeWidth: 1
              }
            }}
            
          />
           
        </div>}
      </div>
    );
    
  }
}

export default Poll;
