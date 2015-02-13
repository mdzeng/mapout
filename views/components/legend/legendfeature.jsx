/** @jsx React.DOM */

var React = require('react');
var features = require('../../../lib/client/features');

//TODO: Consider implementing color picker
module.exports = React.createClass({
	/*
	Sample feature json:
	{
		type: "Feature",
		geometry: {
			type: "Point",
			coordinates: [-77.0699790, 38.893577]
		},
		properties: {
		  "title": "Meg's Home",
		  "description": "Rosslyn is Cool",
		  "marker-color": "#3c4e5a",
		  "marker-size": "large",
		  "marker-symbol": "building"
		}
	},
	 */
	componentDidMount: function() {
		if (this.props.feature.properties && this.props.feature.properties.title) {
			this.refs.name.getDOMNode().value = this.props.feature.properties.title.substring(0,30);
		}
	},

	clearName: function() {
		this.refs.name.getDOMNode().value = '';
	},

	editName: function() {
		var title = this.refs.name.getDOMNode().value;
		if (title) {
			features.actions.edit({
				feature: this.props.feature,
				properties: {
					title: title
				}
			});
			this.refs.name.getDOMNode().value = title;

		}
	},

	editColor: function() {
			var color = this.refs.color.getDOMNode().value;
			if (color) {
				features.actions.edit({
					feature: this.props.feature,
					properties: {
						"marker-color": color
					}
				});
			}
		},

	deleteFeature: function() {
		features.actions.remove(this.props.feature);
	},

	render: function() {
		return (
			<div>
				<span>
					<input
						ref="color"
						type="color"
						defaultValue="#bbb"
						onChange={this.editColor}/>
				</span>
				<textarea
					ref="name"
					className="legend-name"
					cols="20"
					rows="1"
					onDoubleClick={this.clearName}
					onKeyUp={this.editName}
					defaultValue="Enter a name"
				></textarea>

				<span className="delete" onClick={this.deleteFeature}/>
			</div>
		);
	}
});