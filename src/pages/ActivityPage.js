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


async function findactivityById(id) {
  const query = `query getById($id:Int) {
      activityById(id: $id) {
        id title host_email host_name host_img name phoneNum camp_address camp_num date
      }
    }
  
  `;
  const byId = {id:id}
  const data = await graphQLFetch(query,byId);
  return data['activityById'][0]
}


async function AddAorder(Aorder) {
  const query1 = `mutation AorderAdd($Aid: Int,$my_email:String,$title:String,$name: String,
    $camp_address:String,$date: GraphQLDate,$host_email:String,$phoneNum: String,$myname:String,$myphoneNum:String,$peopleNum:Int)
  {
    AorderAdd(Aid: $Aid,my_email:$my_email,title:$title,name:$name,camp_address:$camp_address,date:$date,
    host_email:$host_email,phoneNum:$phoneNum,myname:$myname,myphoneNum:$myphoneNum,peopleNum:$peopleNum
  ) {
      Aid my_email title name camp_address date host_email phoneNum myname myphoneNum peopleNum
    }
  }
  `;
  const data = await graphQLFetch(query1,Aorder);
  if (data) {
    alert('Add successfully')
  }
} 

const ActivityPage = () => {
    const [activity,setActivity] = useState('')
    const [blogs,setBlogs]=useState([])
    const params = useParams()
    const id=params.id

    const setactivity= async()=>{
      let response = await findactivityById(id)
      console.log(response)
      setActivity(response)
      // let tags = response.tags
      // let response1 = await findblogByTags(tags)
      // let response1_s = JSON.stringify(response1)
      // console.log(response)
      // console.log(response1['blogByTags'][0])
      // // console.log(response1_s)
      // setCampsite(response.campdata)
      // setBlogs(response.blogdata)
    }
    // const setblogs= async()=>{
    //   let response0 = await findcampsiteById(campid)
    //   let tags = response0.tags
    //   let response = await findblogByTags(campid)
    //   setBlogs(response)
    // }
    useEffect( () => {
        setactivity();
        // console.log(campsite)
        
    }, []);

    // const numRoom = campsite.countAvailable
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const ButtonGroup = Button.Group;
    const dateFormat = 'YYYY/MM/DD';

    const showModal = () => {
    setVisible(true);
    };

    const onFinish = (values: any) => {
      values['Aid']=activity.id
      values['my_email']=localStorage.getItem('email')
      values['title']=activity.title
      values['name']=activity.name
      values['camp_address']=activity.camp_address
      values['date']=activity.date
      values['host_email']=activity.host_email
      values['phoneNum']=activity.phoneNum
      console.log('Success:', values);
      AddAorder(values)
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
        <div style={{height:1000,padding: '0 50px',marginTop:'2%'}}>
        
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
                <Image src={'/images/campsite3.jpeg'} height='400px' width='700px' />
            </Col>
            <Col span={12} offset={8}>
    <Descriptions size='middle' layout="vertical" contentStyle={{fontSize:22}} labelStyle={{fontSize:18,fontWeight:'bold'}}>
    <Descriptions.Item label="Name" style={{fontSize:40}}>{activity.title}</Descriptions.Item>
    <Descriptions.Item label="Address">{activity.camp_address}</Descriptions.Item>
    {activity.length ===  0 ? 
      <></>
        :
        <Descriptions.Item label="Date">{moment(parseInt(activity.date.getTime())).format("YYYY-MM-DD")}</Descriptions.Item>
    }
    
    <Descriptions.Item label="Host Name"> {activity.host_name}</Descriptions.Item>
    <Descriptions.Item label="Host Phone Number" >{activity.phoneNum}</Descriptions.Item>
    <Descriptions.Item label="Number of camps" >{activity.camp_num}</Descriptions.Item>
    </Descriptions>
    <Button type="primary" size='large' style={{position:'absolute',right:40,bottom:0}}
    onClick={showModal}
    icon={<PlusOutlined/>}>
          Take Part In
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
            label="Your name"
            name="myname"
            rules={[{ required: true, message: 'Please input your name' }]}
          >
          <Input size="large"  />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="myphoneNum"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
          <Input size="large" />
          </Form.Item>

          <Form.Item
            label="People Number"
            name="peopleNum"
            rules={[{ required: true, message: 'Please set the number of people!' }]}
          >
          <InputNumber size="large" min={0} max={20} defaultValue={0} onChange={handleChange}  />
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
        
          
        </div>
    </>
  )
}

export default ActivityPage

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
    const result = JSON.parse(body,jsonDateReviver);

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