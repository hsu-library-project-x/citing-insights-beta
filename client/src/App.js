import React, { Component } from 'react';
import { withRouter, Route,  HashRouter, Redirect} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

import Login from "./Components/Login/Login.jsx";
import Tasks from "./Components/Tasks/Tasks.jsx";
import Navibar from './Components/Navibar/Navibar.jsx';
import SplashScreen from './SplashScreen';
import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";
import ConfigurationForm from "./ConfigurationForm";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: "",
      configurations:null,
      loading: true,
    };
    //window.localStorage.clear();
    this.getConfigurations();

    this.getConfigurations = this.getConfigurations.bind(this);
    this.passInfoLogin = this.passInfoLogin.bind(this);
    this.passInfoLogout = this.passInfoLogout.bind(this);
    this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if()
  // }

  getConfigurations = () => {
    fetch('/api/configurations/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      if(response.status === 200 || response.ok){
        return response.json();
      }
      else{
        alert("Could not access database");
      }
    }).then(json => {
      this.setState({configurations: json[0], loading:false});
    });
  };

  passInfoLogin(isAuthenticated, token, user) {
    this.setState({
      isAuthenticated: isAuthenticated,
      user: user,
      token: token
    });
    //Persist our user into localStorage(right now its the whole object, for production just need token)
    localStorage.setItem("user", JSON.stringify({
      isAuthenticated: isAuthenticated,
      user: user,
      token: token
    }))
  };

  passInfoLogout() {
    
    localStorage.clear();
    sessionStorage.clear();
    this.setState({
      isAuthenticated: false,
      user: null,
      token: ""
    });

  };

  handleConfigurationChange(){
    this.setState({loading:true}, () => this.getConfigurations());
  }

  componentDidMount() {
    const persistedState = localStorage.getItem("user");
    //Test to see if user object is valid
    if (persistedState !== undefined) {
      this.setState(JSON.parse(persistedState));    
    }
  }

  componentWillUnmount(){
    // localStorage.clear();
  }

  render() {
        if(this.state.loading){
          return <SplashScreen />;
        }
        else{
          if(this.state.configurations){
            return( <div className="head">
              <HashRouter history={this.props.history}>
                <Navibar
                    isAuthenticated={this.state.isAuthenticated}
                    passInfoLogout={this.passInfoLogout}
                    user={this.state.user}
                    configurations={this.state.configurations}
                />
                <div id="id01" className="pop content">
                  <Route
                      exact path="/login"
                      render={
                        () =>
                            <Login
                                passInfoLogin={this.passInfoLogin}
                                isAuthenticated={this.state.isAuthenticated}
                                configurations={this.state.configurations}
                            />
                      }
                  />
                  <ProtectedRoute
                      exact path="/"
                      component={Tasks}
                      {...this.state}
                      {...this.props}
                  />
                  <ProtectedRoute
                      path="/tasks"
                      component={Tasks}
                      {...this.state}
                      {...this.props}
                  />
                </div>
                <BottomNavBar
                    isAuthenticated={this.state.isAuthenticated}
                    passInfoLogout={this.passInfoLogout}
                    user={this.state.user}
                    configurations={this.state.configurations}
                />
              </HashRouter>
            </div> );
          }
          else {
            return (
              <ConfigurationForm
                  handleConfigurationChange={this.handleConfigurationChange}
              />);
          }
        }
      }
}
export default App;
