import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeadNav from './HeadNav'
import { Layout, Menu, Breadcrumb } from 'antd';
import BlogDetail from './comp/BlogDetail';
import WriteBlog from './comp/WriteBlog';
import CartPage from './pages/CartPage';
import PersonalPage from './pages/PersonalPage'
import CampHomepage from './pages/CampHomepage'
import CampsitePage from './pages/CampsitePage'
import BlogHomepage from './pages/BlogHomepage'
import ActivityPage from './pages/ActivityPage'
import HostActivityPage from './pages/HostActivityPage'

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <BrowserRouter>
    <Layout>

      <HeadNav/>


        <Content>
          <Routes>
            <Route path="/" element={<CampHomepage/>} exact/>
            <Route path="/campsite/:id" element={<CampsitePage/>} />
            <Route path="/activity/:id" element={<ActivityPage/>} />
            <Route path="/BlogHomepage" element={<BlogHomepage />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/PersonalPage" element={<PersonalPage />} />
            <Route path="/BlogDetail/:id" element={<BlogDetail />} />
            <Route path="/WriteBlog" element={<WriteBlog />} />
            <Route path="/HostActivityPage" element={<HostActivityPage />} />
          </Routes>
        </Content>

      {/*<Footer/>  */}
    </Layout>
    </BrowserRouter>

  );
}

export default App;
