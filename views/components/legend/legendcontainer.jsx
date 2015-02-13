/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var LegendFeature = require('./legendfeature.jsx');

module.exports = React.createClass({
	propTypes: {
		features: React.PropTypes.array
	},

	render: function() {
		return (
			<div className="legend">
				<h2>Legend</h2>
				{
					_.map(this.props.features, function(feature) {
						return (<LegendFeature feature={feature}/>);
					})
				}
			</div>
		);
	}
});