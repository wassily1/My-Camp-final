import '../css/homepage.css';
import { Card } from 'antd';
import 'antd/dist/antd.css'; 

import { Layout, Menu, Breadcrumb,Avatar,Button,PageHeader,Typography,Divider,Input,Select  } from 'antd';
import { Row, Col } from 'antd';
// import HeadNav from './HeadNav';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link  } = Typography;
const { Component } = require("react");
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;

const children = [];
children.push(<Option key={'forest'}>{'forest'}</Option>)
children.push(<Option key={'good air'}>{'good air'}</Option>)
children.push(<Option key={'woods'}>{'woods'}</Option>)
children.push(<Option key={'mountain'}>{'mountain'}</Option>)
children.push(<Option key={'hiking'}>{'hiking'}</Option>)
children.push(<Option key={'quiet'}>{'quiet'}</Option>)
children.push(<Option key={'climbing'}>{'climbing'}</Option>)
children.push(<Option key={'lake'}>{'lake'}</Option>)


export default class BlogDetail extends Component{
    state = {
        title: '',
        author_id:'',
        author_name:'',
        intro:'',
        content:'',
        tags:'',
        posted:'',
    };


    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // var d = new Date();
        // let timevalue=d.getTime();
        // timevalue = new Date(timevalue).toLocaleDateString("en-US")
        // this.setState({ timestamp: timevalue });
    }
    handleSubmit = (e) => {

        const title = this.state.title;
        const author_id = localStorage.getItem('email');
        const author_name = localStorage.getItem('name');
        const author_img = localStorage.getItem('profileimg');
        const intro = this.state.intro;
        const content = this.state.content;
        const tags = this.state.tags;
        const cover_img='/images/campsite2.jpeg'
        
        var d = new Date();
        let timevalue=d.getTime();
        timevalue = new Date(timevalue)
        const posted = timevalue;

        const blog = {
            title:title, author_id:author_id, author_name:author_name,intro:intro,
            content:content,tags:tags,posted:posted,cover_img:cover_img
        }
        console.log(blog)
        this.AddBlog(blog)
        // window.location.reload()
    }
    async AddBlog(blog) {
        const query1 = `mutation blogAdd($title: String,$author_id:String,$author_name:String,$intro:String,
            $content:String,$tags:[String],$posted:GraphQLDate,$cover_img:String)
        {
          blogAdd(title: $title,author_id:$author_id,author_name:$author_name,intro:$intro,content:$content,tags:$tags,posted:$posted,
          cover_img:$cover_img
        ) {
            title author_id author_name intro content tags posted cover_img
          }
        }
        `;
        const data = await graphQLFetch(query1,blog);
        if (data) {
          alert('Add successfully')
        }
    }
    handleChange =(value)=> {
        this.setState({tags:value});
        console.log(`selected ${value}`);
    }


    render(){
        return(
<div style={{height:'100%',padding: '0 50px',marginTop:'2%'}}>
        
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

<Card style={{backgroundColor:'white',marginTop:'0%'}}>

<Divider orientation="left" orientationMargin={0} style={{fontSize:20}}
>
      Write-your-blog
</Divider>
            <span style={{fontSize:22}}>Title</span>
            <Input name='title' size="large" placeholder="" onChange={this.handleInputChange}/>
            <span style={{fontSize:22}}>Introduction</span>
            <Input name='intro' size="large" placeholder="" onChange={this.handleInputChange}/>
            <span style={{fontSize:22}}>Content</span>
            <TextArea name='content' rows={15} onChange={this.handleInputChange}/>

            <span style={{fontSize:22}}>Tags</span>
            <Select
        mode="multiple"
        size="default"
        placeholder="Please select"
        defaultValue={[]}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {children}
      </Select>
      <Row style={{ marginTop: '2%'}}>
      <Col span={21}></Col>
      <Col span={2}>
      <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
      </Col>
      </Row>           
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
        const response = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( {query, variables} )
        });
        const body = await response.text();
        const result = JSON.parse(body);
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