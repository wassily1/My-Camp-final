import '../css/homepage.css';
import 'antd/dist/antd.css'; 
import moment from 'moment';
import { Layout, Menu, Breadcrumb,Avatar,Button,Tabs,Card,Empty   } from 'antd';
import { Row, Col } from 'antd';
import { FireOutlined, CalendarOutlined, EditOutlined,StarOutlined  } from '@ant-design/icons';
import { Link,Routes,Route } from 'react-router-dom';
import BlogDetail from '../comp/BlogDetail';
import WriteBlog from '../comp/WriteBlog';
import url from '../url'

const { Header, Content, Footer } = Layout;
const { Component } = require("react");
const { Meta } = Card;
const { TabPane } = Tabs;


export default class PersonalPage extends Component{
    state = {
        blogs: [],
        blogids:[],
        collections:[]
    };

    componentDidMount() {
        console.log(url)
      this.loadData();
    }

    async loadData() {
        const query = `query getByemails($email:String) {
            blogByEmail(email: $email) {
              title author_id author_name intro content tags posted
            }
          }
        `;
        const byEmail = {email:localStorage.getItem('email')}
        const data = await graphQLFetch(query,byEmail);
        if (data) {
          this.setState({ blogs: data.blogByEmail});
        }
        console.log(this.state.blogs)

        const query2 = `query getByemail($email:String) {
            collectionByEmail(email: $email) {
              id user_email user_name user_img blogid
            }
          }
        `;
        const data2 = await graphQLFetch(query2,byEmail);
        const blogids=[]
        if (data2) {
          data2.collectionByEmail.map(
          (item,index)=>{
                blogids.push(item.blogid)
            }
          )  
          this.setState({ blogids: blogids});
        }
        console.log(this.state.blogids)

        const query3 = `query getById($ids:[Int]) {
            blogByIds(ids: $ids) {
              id title author_id author_name intro content tags posted
            }
          }
        `;
        const byids = {ids:blogids}
        const data3 = await graphQLFetch(query3,byids);
        if (data3) {
          this.setState({ collections: data3.blogByIds});
        }
        console.log(this.state.collections)

    }


    render(){

        return(
            <div class="homepage">

    <Content style={{ height:'800px',padding: '20px 50px',margin: '16px 0' }}>

      <div className="site-layout-content">

          <Row>
          <Col span={6} style={{paddingTop:73}}>
            <Card hoverable style={{ width: '80%', height:'80%', marginBottom:30 }}>
                <Meta title="MY PROFILE" description=" " />
            <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={localStorage.getItem("profileimg")}
            />
            <p style={{marginTop:'8%',fontSize:25}}>{localStorage.getItem("name")}</p>
            <p style={{fontSize:20}}>{localStorage.getItem("email")}</p>
            </Card>
          </Col>
          <Col span={12}>
          <Tabs defaultActiveKey="1" size='large'>
            <TabPane
              tab={
                <span>
                  <CalendarOutlined />
                    MY BLOGS
                </span>
              }
              key="1"
            >
       {this.state.blogs.length ===  0? 
           <Empty description={false} />
        :
        <>
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
                <img height='110%' width='85%' alt="example" src="/images/campsite1.jpeg" />     
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
                    })
                }
                }
            </>
        }
                
{/*                <Card hoverable headStyle={{textAlign:'center',fontSize:22,fontWeight:'bold'}} 
                bodyStyle={{fontSize:18,textAlign:'left',fontWeight:600}}
                // cover={<img alt="example" src="/images/campsite1.jpeg" />}
                style={{ width: '100%', height:220, marginBottom:50}}
                >
                <Row>
                <Col span={8}>
                <img height={170} width={280} alt="example" src="/images/campsite1.jpeg" />
                    <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} description="Intro..." />
             
                </Col>   
                <Col span={16}>

                <a>Title1</a>
                <p>Intro...</p>
                <a style={{position:'absolute',right:'25%',bottom:'1%',fontSize:15,color:'grey',fontWeight:400}}>by ...</a>
                <a style={{position:'absolute',right:'1%',bottom:'1%',fontSize:15,color:'grey',fontWeight:400}}>28/03/22</a>
                </Col>
                </Row>
                </Card>*/}


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

            <TabPane
              tab={
                <span>
                  <StarOutlined />
                  MY LIKE
                </span>
              }
              key="2"
            >
        {this.state.collections.length ===  0? 
           <Empty description={false} />
        :
        <>
        {              
                this.state.collections.map(
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
                <img height='110%' width='85%' alt="example" src="/images/campsite1.jpeg" />     
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
                    })
                }
                
            </>
        }
            </TabPane>       
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

      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>

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