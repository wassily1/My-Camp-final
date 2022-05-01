import React, { useState,useEffect} from 'react'
import '../css/homepage.css';
import { Card } from 'antd';
import 'antd/dist/antd.css'; 

import { Layout, Menu, Breadcrumb,Avatar,Button,PageHeader,Typography  } from 'antd';
import { StarOutlined  } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { useLocation,useParams  } from "react-router-dom";
import blogs from '../data/blogs'
// import HeadNav from './HeadNav';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link  } = Typography;
const { Component } = require("react");
const { Meta } = Card;

async function findblogById(id) {
  const query = `query getById($id:Int) {
      blogById(id: $id) {
        id title author_id author_name author_img intro content tags posted
      }
    }
  `;
  const byId = {id:id}
  const data = await graphQLFetch(query,byId);
  console.log(data)
  return data;
}

async function collectAdd(collection) {
	const query1 = `mutation collectionAdd($id:Int,$user_email:String,$user_name:String,,
    $user_img:String,$blogid:Int)
    {
      collectionAdd(id:$id,user_email: $user_email,user_name:$user_name,user_img:$user_img,
      blogid:$blogid
    ) {
        id user_email user_name user_img blogid
      }
    }
    `;
    const data = await graphQLFetch(query1,collection);
    if (data) {
      alert('Add successfully')
    }
}

const BlogDetail = () =>{
	const params = useParams()
	const blogid=params.id.toString()
  const [blog,setBlog] = useState('')

  const setblog= async()=>{
    let response = await findblogById(blogid)
    console.log(response)
    setBlog(response['blogById'][0])
  }

  const collect= async()=>{
  	const collection={
  		user_email:localStorage.getItem("email"),
  		user_name:localStorage.getItem("name"),
  		user_img:localStorage.getItem("profileimg"),
  		blogid:blogid
  	}
  	console.log(collection)
    let response = await collectAdd(collection)
    console.log(response)
  }
  
  useEffect( () => {
    setblog();
  }, []);

		return(
<div style={{height:1000,padding: '0 50px',marginTop:'3%'}}>
		

		<Row>
          <Col span={6}>
              

          </Col>
          <Col span={12}>
<PageHeader
		      ghost={false}
		      onBack={() => window.history.back()}
		      title={blog.title}
		      subTitle={'by',blog.author_name}
		      avatar={{ src: blog.author_img }}
		      extra={[<Button key="1" type="primary" size='large'icon={<StarOutlined /> }
		      onClick={ async() =>  collect()}
		      >
          Collect
        </Button>]}
        	
		    >
		    
		    <Paragraph>
		      {blog.intro}
		    </Paragraph>
		    
		    </PageHeader>
<Card style={{backgroundColor:'white',marginTop:'2%',height:500}}>
<Typography>

    <Paragraph>
      {blog.content}
    </Paragraph>

</Typography>		            
</Card>
          </Col>

          <Col span={1}>
          </Col>
          <Col span={5}>

          </Col>

        </Row>
    </div>

			)
	
	// }

}
export default BlogDetail;
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