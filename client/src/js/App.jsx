//var Router = require('react-router');
var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');
window.React = React;

//Components
var NavBar = require('./components/NavBar.jsx');
var JobListBox = require('./components/JobListBox.jsx');
var Paper = mui.Paper;
var JobStore = require('./stores/JobStore.jsx');


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var Main = React.createClass({
  getInitialState: function() {
    return ({
      jobs: []
    })
  },
  componentWillMount: function() {
    console.log('I am here');
      $.ajax({
        type: "GET",
        url: '/api/listings',
        success: function(data){
          console.log('I did it', data);
        },
        error: function(){
          console.log('I fail it');
        }
      });
      // }).done(function(data){
      //   console.log('I am having data', data);
      //   this.setState({
      //     jobs: data
      //   })
      // }.bind(this))
      // .error(function(){
      //   console.log('I fail you');
      // });
  },
  render: function(){
    console.log('I am in render');
    return (
        <div className="full">
          <NavBar />
          <JobListBox jobs={this.state.jobs}/>
        </div>
      );
  }
});

React.render(<Main />, document.getElementById('app'));
