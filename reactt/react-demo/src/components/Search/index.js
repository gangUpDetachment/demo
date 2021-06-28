import React, { Component } from 'react'
import axios from 'axios';
import PubSub from 'pubsub-js';
export default class Search extends Component {
  keyword = React.createRef();
  search=()=>{
    const {current:{value:keyword},}=this.keyword;
    PubSub.publish('pubsubEvent',{
      isFirst:false,
      isLoading:true,
    })
    //可以根据关键字进行搜索操作
    axios.get(`https://api.github.com/search/users?q=${keyword}`).then(
      (res)=>{
       // console.log(res);
        PubSub.publish('pubsubEvent',{
          isLoading:false,
          users:res.data.items,
        })
       // this.props.saveUsers(res.data.items);
      },
      err=>{
        console.log(err);
        PubSub.publish('pubsubEvent',{
          isLoading:false,
          err,
        })
      }
    )
  };
  render() {
    return (
      <section className='jumbotron'>
      <h3 className='jumbotron-heading'>Search Github Users 搜索用户在github</h3>
      <div>
        <input type='text' ref={this.keyword} placeholder='请输入你要搜索的用户名称/enter the name you search/' />
        &nbsp;<button onClick={this.search}>Search</button>
      </div>
    </section>
    )
  }
}
