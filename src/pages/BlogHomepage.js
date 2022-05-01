import '../css/homepage.css';
import 'antd/dist/antd.css'; 
import moment from 'moment';
import { Layout, Menu, Breadcrumb,Avatar,Button,Tabs,Card   } from 'antd';
import { Row, Col } from 'antd';
import { FireOutlined, CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { Link,Routes,Route } from 'react-router-dom';
import BlogDetail from '../comp/BlogDetail';
import WriteBlog from '../comp/WriteBlog';
import blogs from '../data/blogs'

const { Header, Content, Footer } = Layout;
const { Component } = require("react");
const { Meta } = Card;
const { TabPane } = Tabs;


export default class BlogHomepage extends Component{
    state = {
        blogs: []
    };

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
          blogList {
            id title intro author_name posted cover_img
          }
        }`;

        const data = await graphQLFetch(query);
        if (data) {
          this.setState({ blogs: data.blogList });
        }
        console.log(data)
    }

    render(){

        // const free = []
        // for(var i=0;i<(25-this.state.data.length);i++){
        //     free . push ( <span class="free"></span>)
        // }

        return(

            <div class="homepage">
            
    <Content style={{ height:'100%',padding: '20px 50px',margin: '16px 0' }}>

      <div className="site-layout-content">

          <Row>
          <Col span={3} style={{paddingTop:73}}>
            {/*  
              <Card hoverable style={{ width: '60%', height:150, marginBottom:50 }}
              >
                <Meta title="Title" description="Intro..." />
            </Card>*/}
          </Col>
          <Col span={12}>
          <Tabs defaultActiveKey="1" size='large'>
            <TabPane
              tab={
                <span>
                  <CalendarOutlined />
                    NEW RELEASE
                </span>
              }
              key="1"
            >
           
            {

            this.state.blogs.map(
                (item,index)=>
                {
                    return(
            <Link  to={`/BlogDetail/${item.id}`}>
            <Card hoverable headStyle={{textAlign:'center',fontSize:22,fontWeight:'bold'}} 
            bodyStyle={{fontSize:18,textAlign:'left',fontWeight:600}}
            // cover={<img alt="example" src="/images/campsite1.jpeg" />}
            style={{ width: '100%', height:220, marginBottom:50}}
            >
            <Row>
            <Col span={8}>
            <img height='110%' width='85%' alt="example" src={item.cover_img} />     
            </Col>   
            <Col span={16}>
            <a>{item.title}</a>
            <p>{item.intro}</p>
            <a style={{position:'absolute',right:'1%',bottom:'1%',fontSize:15,color:'grey',fontWeight:400}}>by {item.author_name}. {moment(parseInt(item.posted.getTime())).format("YYYY-MM-DD HH:mm:ss")}</a>
            </Col>
            </Row>
            </Card>
            </Link>
                    )
                }


                )
            }
                {/*<Card hoverable headStyle={{textAlign:'center',fontSize:22,fontWeight:'bold'}} 
                bodyStyle={{fontSize:18,textAlign:'left',fontWeight:600}} 
                style={{ width: '100%', height:150, marginBottom:50 ,}}  title="Title"
                >
                    <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} description="Intro..." />
                <a style={{position:'absolute',right:'1%',bottom:'1%',fontSize:15,color:'grey',fontWeight:400}}>28/03/22</a>
                </Card>


                <Card hoverable headStyle={{textAlign:'center',fontSize:22,fontWeight:'bold'}} 
                bodyStyle={{fontSize:18,textAlign:'left',fontWeight:600}} 
                style={{ width: '100%', height:150, marginBottom:50 ,}}  title="Title"
                >
                    <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} description="Intro..." />
                <a style={{position:'absolute',right:'1%',bottom:'1%',fontSize:15,color:'grey',fontWeight:400}}>28/03/22</a>
                </Card>*/}
            </TabPane>   

            {/*<TabPane
              tab={
                <span>
                  <CalendarOutlined />
                  
                </span>
              }
              key="2"
            >
                <Card hoverable headStyle={{textAlign:'center',fontSize:22,fontWeight:'bold'}} 
                bodyStyle={{fontSize:18,textAlign:'left',fontWeight:600}} 
                style={{ width: '100%', height:150, marginBottom:50 ,}}  title="Title"
                >
                    <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} description="Intro..." />
                <a style={{position:'absolute',right:'1%',bottom:'1%',fontSize:15,color:'grey',fontWeight:400}}>28/03/22</a>
                </Card>
                <Card hoverable headStyle={{textAlign:'center',fontSize:22,fontWeight:'bold'}} 
                bodyStyle={{fontSize:18,textAlign:'left',fontWeight:600}} 
                style={{ width: '100%', height:150, marginBottom:50 ,}}  title="Title"
                >
                    <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} description="Intro..." />
                <a style={{position:'absolute',right:'1%',bottom:'1%',fontSize:15,color:'grey',fontWeight:400}}>28/03/22</a>
                </Card>
            </TabPane>      */} 
        </Tabs>
          </Col>
          <Col span={1} ></Col>
          <Col span={5} style={{paddingTop:73}}>
          <Row>
            <Link  to={`/WriteBlog`}>
              <Button  style={{width:330,height:60,fontWeight:'bold'}} size="large"
              icon={<EditOutlined />}
              >Write My Blog</Button>
            </Link>

            <Link  to={`/HostActivityPage`}>
            <Button shape="round" style={{width:330,height:60,marginTop:'12%',fontWeight:'bold'}} size="large"
                icon={<EditOutlined />}
                >Host An Activity</Button>
            </Link>
            </Row>
          </Col>
        </Row>
          <Row>
              <Link  to={`/WriteBlog`}>
                
              </Link>
          </Row>


      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>@MY-CAMP</Footer>

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
    const response = await fetch('http://localhost:8000/graphql', {
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