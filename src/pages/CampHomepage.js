import React from 'react'
import '../css/homepage.css';
import { Row, Col, Carousel,Layout,Space,Image,Tabs,Card,Empty } from 'antd'
import { Link } from 'react-router-dom'
import { FireOutlined } from '@ant-design/icons';
import campsites from '../data/campsites'
import CampsiteCard from '../comp/CampsiteCard'
import moment from 'moment';
import url from '../url'
const { Component } = require("react");
const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;
const contentStyle = {
  height: '260px',
  color: '#fff',
  lineHeight: '260px',
  textAlign: 'center',
  background: '#364d79',
};

export default class CampHomepage extends Component {

  state = {
      camps: [],
      activitys:[],
  };

  componentDidMount() {
      this.loadData();
  }

  async loadData() {
      const query = `query {
        campsiteList {
          campId name image description category price countAvailable rating numReview
        }
      }`;

      const data = await graphQLFetch(query);
      if (data) {
        this.setState({ camps: data.campsiteList});
      }

      const query2 = `query {
        activityList {
          id title host_email host_name host_img name phoneNum camp_address camp_num date
        }
      }`;

      const data2 = await graphQLFetch(query2);
      if (data2) {
        this.setState({ activitys: data2.activityList});
      }

      console.log(data)
      console.log(data2)
  }

render(){
  return (
    <div class="homepage" >
<Content style={{ padding: '20px 50px',margin: '16px 0'}}>
 {/*       <h1>Popular Campsites</h1>*/}
    <Carousel autoplay style={{width:"50%",height:"8%",marginLeft:'20%'}}>
        <div>
        <Image src="/images/campsite4.jpeg" width={'50%'} height={'10%'}></Image>

        </div>
        <div>
          <Image src="/images/campsite1.jpeg" width={'50%'} height={'10%'}></Image>
        </div>
        <div>
          <Image src="/images/campsite2.jpeg" width={'50%'} height={'10%'}></Image>
        </div>
        <div>
          <Image src="/images/campsite3.jpeg" width={'50%'} height={'10%'}></Image>
        </div>
    </Carousel>

    <Tabs defaultActiveKey="1" size='large'>
      <TabPane
        tab={
          <span>
            <FireOutlined />
              CAMPSITES
          </span>
        }
        key="1"
      >

        <Row >
        <Space size={[120,0]} style={{paddingLeft:140}} wrap>
         {
            this.state.camps.map((item,index)=>{
                return(
                  <>
                    <CampsiteCard campsite={item} />
                  </>
                )
            })

          }
        </Space>
        </Row>
    </TabPane>

    <TabPane
      tab={
        <span>
          <FireOutlined />
            ACTIVITY
        </span>
      }
      key="2"
    >

    <Row >
    <Space size={[120,0]} style={{paddingLeft:140}} wrap>
    {this.state.activitys.length ===  0 ? 
           <Empty description={false} />
        :
       <>
    {
      this.state.activitys.map(
          (item,index)=>
          {
              return(
                <>
            <Link to={`/activity/${item.id}`}>
            <Card
              hoverable
              style={{ width: 320,marginBottom:50,fontSize:15,fontWeight:'normal'}}
              cover={<img alt="example" src={'/images/campsite3.jpeg'} />}
            >
              <Meta title={item.title}/>
              <span style={{marginTop:'2%'}}>{'Address:  '}</span><span>{item.camp_address}</span><br/>
              <span>{item.camp_num} camps in total</span><br/>
              {/*<Rating value= text={`${campsite.numReview} reviews in total`}/>*/}
              <span>{'Date of Camping:  '}{moment(parseInt(item.date.getTime())).format("YYYY-MM-DD")}</span>
            </Card>
            </Link>
              </>
                  )
              }
            )
      }
      </>
    }
    </Space>
    </Row>
    </TabPane>
    </Tabs>

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