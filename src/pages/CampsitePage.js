import React,{ useState,useEffect  } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Layout,Form,Menu,InputNumber,Empty, List,Descriptions,Rate,Button,PageHeader,Typography,Divider,Input,Select,Card,Image} from 'antd';
import { Row, Col,Space,Modal,DatePicker } from 'antd';
import { PlusOutlined,MinusOutlined } from '@ant-design/icons';
import moment from 'moment';

import Rating from '../comp/Rating'
import campsites from '../data/campsites'

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const { Option } = Select;


async function findcampsiteById(campId) {
  const query = `query getById($campId:String) {
      campsiteById(campId: $campId) {
        campId name image description category price countAvailable rating numReview tags
      }
    }
  
  `;
  const bycampId = {campId:campId}
  const campdata = await graphQLFetch(query,bycampId);

  let tags= campdata['campsiteById'][0].tags
  const query1 = `query getByTags($tags:[String]) {
      blogByTags(tags: $tags) {
        title intro author_name posted
      }
    }
  `;
  const byTags = {tags:tags}
  const blogdata = await graphQLFetch(query1,byTags);

  // return data['campsiteById'][0];
  return {
    campdata:campdata['campsiteById'][0],
    blogdata:blogdata['blogByTags']
  }
}

async function findblogByTags(tags) {
  const query = `query getByTags($tags:[String]) {
      blogByTags(tags: $tags) {
        title intro author_name posted
      }
    }
  `;
  const byTags = {tags:tags}
  const data = await graphQLFetch(query,byTags);
  return data;
}

async function Addorder(order) {
  const query1 = `mutation orderAdd($email: String,$campId:String,$name:String,$date:GraphQLDate,
      $phoneNum:String,$numCamp:Int)
  {
    orderAdd(email: $email,campId:$campId,name:$name,date:$date,phoneNum:$phoneNum,numCamp:$numCamp
  ) {
      email campId name date phoneNum numCamp
    }
  }
  `;
  const data = await graphQLFetch(query1,order);
  if (data) {
    alert('Add successfully')
  }
} 

const CampsitePage = () => {
    const [campsite,setCampsite] = useState('')
    const [blogs,setBlogs]=useState([])
    const params = useParams()
    const campid=params.id.toString()

    const setcamp= async()=>{
      let response = await findcampsiteById(campid)
      console.log(response.campdata)
      console.log(response.blogdata)
      
      // let tags = response.tags
      // let response1 = await findblogByTags(tags)
      // let response1_s = JSON.stringify(response1)
      // console.log(response)
      // console.log(response1['blogByTags'][0])
      // // console.log(response1_s)
      setCampsite(response.campdata)
      setBlogs(response.blogdata)
    }
    // const setblogs= async()=>{
    //   let response0 = await findcampsiteById(campid)
    //   let tags = response0.tags
    //   let response = await findblogByTags(campid)
    //   setBlogs(response)
    // }
    useEffect( () => {
        setcamp();
        // console.log(campsite)
        
    }, []);

    console.log(blogs)

    const numRoom = campsite.countAvailable
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const ButtonGroup = Button.Group;
    const dateFormat = 'YYYY/MM/DD';

    const showModal = () => {
    setVisible(true);
    };

    const onFinish = (values: any) => {
      values['campId']=campsite.campId
      values['email']=localStorage.getItem('email')
      console.log('Success:', values);
      Addorder(values)
      window.location.reload()
    };

    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    };

    const handleChange=(value) =>{
      console.log(`selected ${value}`);
    }


    return (
    <>
        <div style={{height:'100%',padding: '0 50px',marginTop:'2%'}}>
        
        <Row>
          <Col span={2}>
          </Col>
          <Col span={20}>
            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              extra={[
                <span></span>,
              ]}
            ></PageHeader>
        <Card style={{backgroundColor:'white',marginTop:'0%'}}>
        <Row>
            <Col span={4}>
                <Image src={campsite.image} height='400px' width='700px' />
            </Col>
            <Col span={12} offset={8}>
    <Descriptions size='middle' layout="vertical" contentStyle={{fontSize:22}} labelStyle={{fontSize:18,fontWeight:'bold'}}>
    <Descriptions.Item label="Name" style={{fontSize:40}}>{campsite.name}</Descriptions.Item>
    <Descriptions.Item label="Category">{campsite.category}</Descriptions.Item>
    <Descriptions.Item label="Rating"><Rate disabled value={campsite.rating} /></Descriptions.Item>
    <Descriptions.Item label="Price"> ${campsite.price} /Camp</Descriptions.Item>
    <Descriptions.Item label="Description" span={2}>{campsite.description}</Descriptions.Item>
    </Descriptions>
    <Button type="primary" size='large' style={{position:'absolute',right:40,bottom:0}}
    onClick={showModal}
    icon={<PlusOutlined/>}>
          Reserve
        </Button>
    <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        style={{ top: 200 }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer=""
      >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
          <Space direction="vertical" size={10}>
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name' }]}
          >
          <Input size="large"  />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNum"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
          <Input size="large" />
          </Form.Item>

          <Form.Item
            label="People Number"
            name="numCamp"
          >
          <InputNumber size="large" min={0} max={20} defaultValue={0} onChange={handleChange}  />
          </Form.Item>
          
          <Form.Item
            label="Date"
            name="date"
          >
          <DatePicker size="large" defaultValue={moment('2022/04/01', dateFormat)} format={dateFormat} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </Form.Item>
          </Space>
           </Form>
    </Modal>

            </Col>
        </Row>
        </Card>
          </Col>
        </Row>
        
          
            
        <Row style={{marginTop:'2%'}}>
        <Col span={1}>
        </Col>    
        <Col span={9}>
        <Divider orientation="left" style={{fontSize:25}}>Related Blogs</Divider>
         {blogs.length ===  0 ? 
               <Empty description={false} />
            :
            <>
                {

            blogs.map(
                (item)=>
                {
                    return(
            <Card hoverable headStyle={{textAlign:'center',fontSize:22,fontWeight:'bold'}} 
            bodyStyle={{fontSize:18,textAlign:'left',fontWeight:600}}
            // cover={<img alt="example" src="/images/campsite1.jpeg" />}
            style={{ width: '100%', height:200, marginBottom:50}}
            >
            <Row>
            <Col span={8}>
            <img height='110%' width='85%' alt="example" src="/images/campsite1.jpeg" />     
            </Col>   
            <Col span={16}>
            <a>{item.title}</a>
            <p>{item.intro}</p>
            <a style={{position:'absolute',right:'1%',bottom:'1%',fontSize:15,color:'grey',fontWeight:400}}>by {item.author_name}.</a>
            </Col>
            </Row>
            </Card>
                    )
                }


                )
            }
            </>
            }
        </Col>
      </Row>
        
        

        </div>

        
    </>
  )
}

export default CampsitePage


async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body);

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