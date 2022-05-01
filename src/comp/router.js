import React,{Component} from 'react';
import {Menu} from 'antd'
// import './HeadNav.less'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {HashRouter,Route,Switch} from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import HomeText from './HomeText';

export default class Router extends Component{
	render(){
		return(

			<div id="router">
				<HashRouter>
					<Switch>
						<Route path="/" component={HomeText} exact/>
						<Route path="/home" component={DefaultLayout} />
					</Switch>
				</HashRouter>
			</div>
			)
	}

}