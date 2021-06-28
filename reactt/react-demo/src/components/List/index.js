import React, { Component } from 'react';
import './index.css';
import PubSub from 'pubsub-js';
export default class List extends Component {
  state={
    users:[],
    isFirst:true,
    isLoading:false,
    err:'',
  };
  componentDidMount(){
    this.psEvent=PubSub.subscribe('pubsubEvent',(meg,data)=>{
      this.setState(data);
    })
  }
  componentWillUnmount(){
    PubSub.unsubscribe(this.psEvent);
  }
  render() {
    const{users,isFirst,isLoading,err}=this.state;
    return(
      <div className="row">
      {isFirst ?(
        <h2 style={{textIndent:'20px'}}>欢迎使用，请输入关键字</h2>
      ):isLoading?(
        <h2 style={{textIndent:'30px'}}>加载中请等待...</h2>
      ):err?(
        <h2 style={{color:'#f00',fontSize:'65px',textIndent:'30px'}}>{err.toString()}</h2>
      ):(
    users.map((userObj)=>{
     
      return (
        <div className='card' key={userObj.id}>
          <a href={userObj.url} target='_blank' rel='noreferrer'>
            <img
              alt='thumb'
              src={userObj.avatar_url}
              style={{ width: 100 + 'px' }}
            />
          </a>
          <p className='card-text'>{userObj.login}</p>
        </div>
      );
    })
    )}
    </div>
    );
  }
}
