import React,{Component,useState} from 'react';
import {Menu,Layout,Avatar,Image,Dropdown  } from 'antd'
// import './HeadNav.less'
import { AppstoreOutlined, MailOutlined, SettingOutlined,UserOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import {HashRouter,Link,BrowserRouter,Routes,Route} from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import BlogHomepage from './pages/BlogHomepage';
import CartPage from './pages/CartPage';
import PersonalPage from './pages/PersonalPage'
import UserLogin from './comp/UserLogin';
import BlogDetail from './comp/BlogDetail';
import WriteBlog from './comp/WriteBlog';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function AuthBar() {
  const [user, setuser] = useState();
	const forceUpdate = useForceUpdate();

  const logout = () => {
		console.log("Logged out.");
		localStorage.setItem("iflogin", false);
		localStorage.setItem("profileimg", null);
		localStorage.setItem("email", null);
		localStorage.setItem("name", null);
		window.location.reload()
	// setuser("");
  }
  const success = (response) => {
		console.log("Loggin Success.");
		console.log(response);
		// console.log(response.tokenID);
		// setuser(response.Lu.tf);
		// console.log(response.profileObj.imageUrl);
		localStorage.setItem("iflogin", true);
		localStorage.setItem("profileimg", response.profileObj.imageUrl);
		localStorage.setItem("email", response.profileObj.email);
		localStorage.setItem("name", response.profileObj.name);
		window.location.reload()
	// window.profileimg=response.profileObj.imageUrl
	
  }
  const failure = () => {
	console.log("Loggin failure.");
  }

  // console.log(localStorage.getItem('name'))
  // console.log(localStorage.getItem('email'))
  // console.log(localStorage.getItem('profileimg'))
  return (

	<header style={{position:'absolute',height:30,right:10,marginTop:0}}>

	<meta name="google-signin-client_id" content="980512353493-ul0qpbi3k38snikhl4j19ak5e0rek6un.apps.googleusercontent.com" />
	  <GoogleLogin
		clientId="980512353493-ul0qpbi3k38snikhl4j19ak5e0rek6un.apps.googleusercontent.com"
		buttonText="Login"
		onSuccess={success}
		onFailure={failure}/>
	  <GoogleLogout
		clientId="980512353493-ul0qpbi3k38snikhl4j19ak5e0rek6un.apps.googleusercontent.com"
		buttonText="Logout"
		onLogoutSuccess={logout}/>
		{user && <h3>Welcome {user}!</h3>}
	</header>
  )
}

const { Header, Content, Footer } = Layout;
const menu = (
  <Menu >
	<Menu.Item>
	  {/*<a  rel="noopener noreferrer" href="./CartPage" style={{fontSize:20}}>
		My Orders
	  </a>*/}
	  <Link to={`/CartPage`}>
	  <span style={{fontSize:20}}>
		My Booking
	  </span>
	  </Link>
	</Menu.Item>
	<Menu.Item>
	  <Link to={`/PersonalPage`}>
	  <span style={{fontSize:20}}>
		Personal Page
	  </span>
	  </Link>
	</Menu.Item>
  </Menu>
);
const responseGoogle = (response) => {
  console.log(response);
}
function onSignIn(googleUser) {
	console.log(googleUser.getBasicProfile().getImageUrl())
}

export default class HeadNav extends Component {

	state = {
		current: 'home',
	}
	handleClick=(e)=>{ 
		this.setState({current:e.key});
	}

	render(){
		return (
			<div>
					<Menu  mode="horizontal" defaultSelectedKeys={[this.state.current]}
					onClick={this.handleClick} style={{ zIndex: 1, width: '100%',height:70,fontSize:18,fontWeight:'bold'}}
					>
						<Menu.Item key="home"><Link  to="/">Camp-Home</Link></Menu.Item>
						<Menu.Item key="BlogHomepage"><Link  to="/BlogHomepage">Blog-Home</Link></Menu.Item>
						<Dropdown overlay={menu}  placement="bottomRight"  arrow>

						   <Avatar size={52} src={localStorage.getItem('profileimg')} 
							style={{position:'absolute',right:230,marginTop:10,cursor:'pointer'}}/>
						</Dropdown>
						<AuthBar style={{position:'absolute',right:50,marginTop:6}}/> 
						
					</Menu>

			</div>
		)
	}

}
