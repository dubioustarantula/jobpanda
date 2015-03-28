var React = require('react');
var Reactable = require('reactable');
var mui = require('material-ui');
var LeftNav = mui.LeftNav;
var Table = Reactable.Table;
var Tr = Reactable.Tr;
var unsafe = Reactable.unsafe;

var menuItems = {};
var JobList = React.createClass({
  getInitialState: function() {
    return {
      jobs: this.props.jobs
    }
  },
  handleClick: function() {
      
  },
  render: function(){
    var jobs = this.props.jobs;
    if(!jobs){
      jobs =[];
    }
    console.log('jobs', jobs);
    return (
        <Table 
        className="job-table striped table" 
        data={jobs}
        sortable={true}
        filterable={['location', 'company', 'title', 'source network', 'apply link', 'rating', 'favorite', 'date added', 'status']}
        columns={[
          {key: 'position', label: 'Title'},
          {key: 'company', label: 'Company'}, 
          {key: 'location', label: 'Location'},
          {key: 'posted', label: 'Date Added'},
          {key: 'source', label: 'Source Network'},
          {key: 'apply_link onClick={this.handleClick}', label: 'Apply Link'},
          {key: 'status', label: 'Status'},
          {key: 'glassdoor_rating', label: 'Rating'},
          {key: 'favorite', label: 'Favorite'},
          {key: 'edit', label: 'Edit / Details'}
        ]}
        />
    );
  }
});

module.exports = JobList;