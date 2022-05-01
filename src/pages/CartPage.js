import React from 'react'
import '../css/homepage.css';
import moment from 'moment';
import { Row, Col, Carousel,Card,Layout,Space,Descriptions,Radio,Button,Badge,PageHeader,Statistic,Tag,Empty } from 'antd';
import { FireOutlined, CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { Link,Routes,Route } from 'react-router-dom';
import url from '../url'
const { Header, Content, Footer } = Layout;
const { Component } = require("react");
const { Meta } = Card;
export default class BlogHomepage extends Component{

	state = {
	    orders: [],
      Aorders:[]
	};

  componentDidMount() {
      this.loadData();
  }

  async loadData() {
    const query = `query getByemails($email:String) {
        orderByEmail(email: $email) {
          email campId date name phoneNum numCamp
        }
      }
    `;
    const byEmail = {email:localStorage.getItem('email')}
    const data = await graphQLFetch(query,byEmail);
    if (data) {
      this.setState({ orders: data.orderByEmail});
    }

    const query2 = `query getByemails($email:String) {
        AorderByEmail(email: $email) {
          id Aid my_email title name camp_address date host_email phoneNum myname myphoneNum peopleNum
        }
      }
    `;
    const byEmail2 = {email:localStorage.getItem('email')}
    const data2 = await graphQLFetch(query2,byEmail2);
    if (data2) {
      this.setState({ Aorders: data2.AorderByEmail});
    }
    console.log(data,data2)
  }

	render(){

		return(
	<div style={{height:'100%',padding: '0 50px',marginTop:'2%'}}>
	<Content style={{ padding: '20px 50px',margin: '16px 0',height:'100%'}}>
      <div className="site-layout-content">

          <Row>
          <Col span={3} style={{paddingTop:73}}>
              
          </Col>
          <Col span={20}>
{/*    <Card style={{textAlign:'center',height:'100%'}}>*/}

    <PageHeader
      onBack={() => window.history.back()}
      title="MY Booking"
    >
    </PageHeader>
    
    {this.state.orders.length ===  0 && this.state.Aorders.length ===  0? 
               <Empty description={false} />
            :
            <>
        {
        this.state.orders.map(
            (item,index)=>
            {
                return(
                  <Card style={{width:"60%",height:160,marginBottom:'4%',marginLeft:'3%'}} bordered={true} title='Order' size='small'>
                  <Descriptions
                      size={this.state.size}
                      style={{width:'80%',marginBottom:'3%'}}
                    >
                        <Descriptions.Item label="campId">{item.campId}</Descriptions.Item>
                        <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{item.phoneNum}</Descriptions.Item>
                        <Descriptions.Item label="Email">{item.email}</Descriptions.Item>

                        {/*<Descriptions.Item label="Date">{moment(parseInt(item.date.getTime())).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>*/}
                        <Descriptions.Item label="Number of people">{item.numCamp}</Descriptions.Item>
                        
                  </Descriptions>
                  </Card>
                )
            }
          )
        }
        {
        this.state.Aorders.map(
            (item,index)=>
            {
                return(
                  <Card style={{width:"60%",height:160,marginBottom:'4%',marginLeft:'3%'}} bordered={true} title='Activity Booking' size='small'>
                  <Descriptions
                      size={this.state.size}
                      style={{width:'80%',marginBottom:'3%'}}
                    >
                        <Descriptions.Item label="Title">{item.title}</Descriptions.Item>
                        <Descriptions.Item label="Address">{item.camp_address}</Descriptions.Item>
                        <Descriptions.Item label="Date">{moment(parseInt(item.date.getTime())).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
                        <Descriptions.Item label="Host Name">{item.name}</Descriptions.Item>
                        <Descriptions.Item label="Host Phone Number">{item.phoneNum}</Descriptions.Item>
                        <Descriptions.Item label="My Name">{item.myname}</Descriptions.Item>
                        {/*<Descriptions.Item label="Date">{moment(parseInt(item.date.getTime())).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>*/}
                        <Descriptions.Item label="Number of people">{item.PeopleNum}</Descriptions.Item>
                        
                  </Descriptions>
                  </Card>
                )
            }
          )
        }
        </>
      }
    


    
  {/*  </Card>*/}

          </Col>

          <Col span={2} style={{paddingTop:73}}>
          
          </Col>
        </Row>

      </div>
    </Content>
    	</div>

		)

	}
}
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}