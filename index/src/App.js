import './App.css';
import {useState} from 'react';
import React from 'react';
import proImage from './assets/images/kh_picture.jpg';
import logo from './logo.svg'
import * as Toolbox from './ComponentToolbox.js';
import Page_About from './web_pages/About.js';
import Page_Resume from './web_pages/Resume.js';
import Page_Contact from './web_pages/Contact.js';

const Button = ({handleClick, text}) => {
  return (
    <button className = "left-side_button" onClick = {handleClick}>{text}</button>
  );
}

const Page_UnderConstruction = () => {
  return (
    <div>
      <span>Under Construction...</span>
      <img className = 'logo' src = {logo} alt="React" />
    </div>
  );
}

// MainPageContent as a class component to allow reference
class MainPageContent extends React.Component {
  constructor(props) {
    super(props);

    this.default = {page_state: 'Resume'};
    this.state = this.default;
    this.page = {'About Me': Page_About, 
                 'UnderConstruction': Page_UnderConstruction,
                 'Resume': Page_Resume,
                 'Contact': Page_Contact};
  }

  changePage(page){
    let new_page = this.default;

    if(page in this.page)new_page = {page_state: page};
    this.setState(new_page);
  }

  componentDidMount(){
    console.log("MainPageContent: Mounted");
  }

  componentWillUnmount(){
    console.log("MainPageContent: Unmounted");
  }

  render() {
    const Page = this.page[this.state.page_state];

    return (
      <div className = "content-area">
        <Toolbox.Header text={this.state.page_state} />
        <Page />
      </div>
    );
  }
  
}

const SideBySideLayout = () =>
{
  const mpRef = React.useRef();

  return (
    <div className = "side-by-side_layout">
      <div className = "left-column">
        <div>
          <img src = {proImage} alt="Kevin Hall" />
        </div>
        <div>
          <Toolbox.Header text = "Kevin Hall" />
        </div>
        <div>
          <Button handleClick = {() => mpRef.current.changePage('Resume')} text = "Resume" /> 
          <Button handleClick = {() => mpRef.current.changePage('About Me')} text = "About" />
          <Button handleClick = {() => mpRef.current.changePage('Contact')} text = "Contact" />
        </div>
      </div>
      <div className = "right-column">
        <MainPageContent ref={mpRef} />
      </div>
    </div>
  );
}


const App = () => {
  return (
    <SideBySideLayout />
  );
}

export default App;
