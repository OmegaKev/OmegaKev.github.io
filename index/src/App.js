import './App.css';
import proImage from './assets/images/kh_picture.jpg';
import logo from './logo.svg'

const Header = () => {
  return (
    <div className = "header_name">
      Kevin Hall
    </div>
  );
}

const Button = ({handleClick, text}) => {
  return (
    <button className = "left-side_button" onClick = {handleClick}>{text}</button>
  );
}

const MainPageContent = () =>
{
  return (
    <div className = "content-area">
      <div>
        <span>Under Construction...</span>
        <img className = 'logo' src = {logo} alt="React" />
      </div>
    </div>
  );
}

const SideBySideLayout = () =>
{
  return (
    <div className = "side-by-side_layout">
      <div className = "left-column">
        <div>
          <img src = {proImage} alt="Kevin Hall" />
        </div>
        <div>
          <Button handleClick = {() => console.log("About Click")} text = "About" />
          <Button handleClick = {() => console.log("Resume Click")} text = "Resume" />
          <Button handleClick = {() => console.log("Contact Click")} text = "Contact" />
        </div>
      </div>
      <div className = "right-column">
        <Header />
        <MainPageContent />
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
