var React = require('react');
var Locator = require('./LocationSelector.jsx');
var Legend = require('./legend/legendcontainer.jsx');

var Reflux = require('reflux');
var features = require('../../lib/client/features');
var _ = require('lodash');
var geojson = {
	type: "FeatureCollection"
};


/*
 * TODO: Bug-First feature not drawing
 */
var map;
module.exports = React.createClass({
	mixins: [
		Reflux.connect(features.store, 'features')
	],

	propTypes: {
		accessToken: React.PropTypes.string,
		mapTitle: React.PropTypes.string
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
		map = L.mapbox.map('map', this.props.mapTitle);
		featureLayer = L.mapbox.featureLayer(this.state.features).addTo(map);
	},

	componentDidUpdate: function() {
		geojson.features = this.state.features;
		featureLayer.setGeoJSON(geojson);
		if (this.state.features && this.state.features.length > 0) {
			var featureCoordinates = _.last(this.state.features).geometry.coordinates;
			var latlng = L.latLng(featureCoordinates[1], featureCoordinates[0]);
			map.setView(latlng);
		}
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