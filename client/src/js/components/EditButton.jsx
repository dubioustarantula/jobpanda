var React = require('react');
var EditModal = require('./EditModal.jsx');

var EditButton = React.createClass({
	// componentDidMount: function() {
	// 	jobInfo: this.props.editData
	// 	console.log('job-info', jobInfo);
	// },
	openSesame: function() {
		this.refs.modal.openModal();
	},
	render: function() {
		var jobInfo = this.props.editData;
		return (
			<div>
				<p onClick={this.openSesame}>Edit</p>
				<EditModal {...this.state} ref="modal" jobDetails={jobInfo}/>
			</div>
		);
	}
});

module.exports = EditButton;