import '../css/homepage.css';
import { Card } from 'antd';
import 'antd/dist/antd.css'; 

import { Layout, Menu, Breadcrumb,Avatar,Button,PageHeader,Typography,Divider,Input,Select,Form,InputNumber,DatePicker  } from 'antd';
import { Row, Col } from 'antd';
import moment from 'moment';
import url from '../url'
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link  } = Typography;
const { Component } = require("react");
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;

const children = [];
    for (let i = 10; i < 15; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
children.push(<Option key={'forest'}>{'forest'}</Option>)
children.push(<Option key={'good air'}>{'good air'}</Option>)
children.push(<Option key={'woods'}>{'woods'}</Option>)
const dateFormat = 'YYYY/MM/DD';

export default class HostActivityPage extends Component{
    state = {

    };


    async AddActivity(activity) {
        const query1 = `mutation activityAdd($id:Int,$title:String,$host_email:String,
        $host_name:String,$host_img:String,$name:String,$phoneNum:String,$camp_address:String,$camp_num:Int,$date: GraphQLDate)
        {
          activityAdd(id:$id,title: $title,host_email:$host_email,host_name:$host_name,host_img:$host_img,
          name:$name,phoneNum:$phoneNum,camp_address:$camp_address,camp_num:$camp_num,date:$date
        ) {
            id title host_email host_name host_img name phoneNum camp_address camp_num date
          }
        }
        `;
        const data = await graphQLFetch(query1,activity);
        if (data) {
          alert('Add successfully')
        }
    }

    handleChange =(value)=> {
        console.log(`selected ${value}`);
    }

    onFinish = (values: any) => {
      values['host_email']=localStorage.getItem('email')
      values['host_name']=localStorage.getItem('name')
      values['host_img']=localStorage.getItem('profileimg')
      
      console.log('Success:', values);
      this.AddActivity(values)
      window.location.reload()
    };


    render(){
        return(
<div style={{height:'900px',padding: '0 50px',marginTop:'2%'}}>
        
        <Row>
          <Col span={6}>
              
          </Col>
          <Col span={12}>

            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              extra={[
                <span></span>,
              ]}
            ></PageHeader>

<Card style={{backgroundColor:'white',height:'600',marginTop:'0%'}}>

<Divider orientation="left" orientationMargin={0} style={{fontSize:20}}
>
      Host-Your-Activity
</Divider>

            {/*<TextArea name='content' rows={15} onChange={this.handleInputChange}/>*/}
<Form
      layout='vertical'
      onFinish={this.onFinish}
      // initialValues={{ layout: formLayout }}
      // onValuesChange={onFormLayoutChange}
    >
      <Form.Item label="Title" name='title' rules={[{ required: true, message: 'Please input your name' }]}>
        <Input  name="title" size='large'/>
      </Form.Item>
      <Form.Item label="Address" name='camp_address'
      rules={[{ required: true, message: 'Please input Address' }]}>
        <Input  name="camp_address" size='large' />
      </Form.Item>
        <Form.Item label="Number of camps" name="camp_num"
        rules={[{ required: true, message: 'Please select the number of camps' }]}>
          <InputNumber size="large" min={0} max={50} defaultValue={0} onChange={this.handleChange}  />
        </Form.Item>
      <Form.Item label="Date" name="date"
      rules={[{ required: true, message: 'Please select the date' }]}>
      <DatePicker size="large" defaultValue={moment('2022/04/01', dateFormat)} format={dateFormat} />
      </Form.Item>
      <Form.Item label="Your Name" name="name"
      rules={[{ required: true, message: 'Please input your name' }]}>
        <Input  name="camp_address" size='large' />
      </Form.Item>
      <Form.Item label="Your Phone Number" name="phoneNum"
      rules={[{ required: true, message: 'Please input your phone number' }]}>
        <Input name="camp_address" size='large' />
      </Form.Item>

      <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
        </Form.Item>
    </Form>
          
</Card>
          </Col>

          <Col span={6}>

          </Col>

        </Row>
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
            body: JSON.stringify( {query, variables} )
        });
        const body = await response.text();
        const result = JSON.parse(body,jsonDateReviver);
        if (result.errors) {
          const error = result.errors[0];
          if (error.extensions.code == 'BAD_USER_INPUT') {
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