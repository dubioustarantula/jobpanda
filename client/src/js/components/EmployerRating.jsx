var React = require('react');

var EmployerRating = React.createClass({
	getInitialState: function() {
		return {
			rating: 0.0
		}
	},
	init: function() {
		this.loadRatings();
	},
	loadRatings: function() {
		var employer = this.props.editData.company;
		employer = employer.replace(/\s/g, '');
		var url = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=32350&t.k=iQEfPjNIuRk&userip=173.247.199.46&useragent=&action=employers&q=' + employer;

		$.ajax({
			type: "GET",
			url: url,
			dataType: 'jsonp',
			contentType: 'application/json',
			crossDomain: true,
			success: function(data) {
				console.log(data);
				var glassdoor_rating = data.response.employers[0].overallRating;
				console.log(employer + ' - rating - ' + glassdoor_rating);
				this.setState({rating: glassdoor_rating});
			}.bind(this)
		})
	},
	componentWillMount: function() {
		this.loadRatings();
	},
	render: function() {
		return (
			<div>
				<p>{this.state.rating}</p>
			</div>
		)
	}
});

module.exports = EmployerRating;