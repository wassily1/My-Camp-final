import {Form,Input,Button,Checkbox,Card,Layout,Breadcrumb} from 'antd';
import React,{Component} from 'react';
import '../css/homepage.css';

export default class UserLogin extends Component{

	onFinish=(values)=>{ //点击事件
        console.log('Success:',values)
    }

    onFinishFailed=(err)=>{ //点击事件
        console.log('Failed:',err)
    }

    render(){
        return (
        	<Layout>
        	<div style={{textAlign:'center'}}>


        	<div style={{ width: 800, height:600, marginTop:50,position:'absolute',left:'30%',}}>
<Form style={{left:'0%'}}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}

      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        style={{marginTop:50,left:'0%',width:500}}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        style={{width:500}}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        style={{width:500}}
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
      style={{width:500}}
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
</div>

</div>
</Layout>
       	)
    }
}