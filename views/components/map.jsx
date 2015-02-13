var React = require('react');
var Locator = require('./LocationSelector.jsx');
var Legend = require('./legend/legendcontainer.jsx');

var Reflux = require('reflux');
var features = require('../../lib/client/features');
var geojson = {
	type: "FeatureCollection"
};


/*
 * TODO
 * 1) Bug: First feature not drawing
 * 2) CSS + Additional features
 */
module.exports = React.createClass({
	mixins: [
		Reflux.connect(features.store, 'features')
	],

	propTypes: {
		accessToken: React.PropTypes.string,
		map: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			features: [],
			featureLayer: {},
			chooseLocation: true
		};
	},

	componentDidMount: function() {
		L.mapbox.accessToken = this.props.accessToken;
		var map = L.mapbox.map('map', this.props.map);
		featureLayer = L.mapbox.featureLayer(this.state.features).addTo(map);
	},

	componentWillUpdate: function() {
		geojson.features = this.state.features;
		featureLayer.setGeoJSON(geojson);
	},

	addLocation: function(location) {
		features.actions.add({
			location: location
		});
	},

	render: function() {
		return (
			<div>
				<div id="map"/>
				<Locator
					addLocation={this.addLocation}
				/>
				<Legend features={this.state.features}/>
			</div>
		);
	}
});