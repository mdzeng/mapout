var React = require('react');

module.exports = React.createClass({
	addLocation: function(event) {
		event.preventDefault();
		var location = this.refs.location.getDOMNode().value;
		this.props.addLocation(location);
	},

	render: function() {
		return (
			<div className="locator-selector">
				<form onSubmit={this.addLocation}>
					<input type="text" id="location" ref="location" placeholder="Address"/>
					<input type="submit" value=''/>
				</form>
			</div>
		);
	}
});