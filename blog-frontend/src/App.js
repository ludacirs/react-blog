import React from 'react';
import {Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";
import {Helmet} from "react-helmet-async";

function App() {
  return (
      <div>
          <Helmet>
              <title>MFP</title>
          </Helmet>
        <Route component={PostListPage} path={['/@:username', '/']} exact/>
        <Route component={LoginPage} path={'/login'} />
        <Route component={RegisterPage} path={'/register'}/>
        <Route component={WritePage} path={'/write'}/>
        <Route component={PostPage} path={'/@:username/:postId'}/>
      </div>
  );
}

export default App;
