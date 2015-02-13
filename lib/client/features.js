'use strict';
var Reflux = require('reflux');
var request = require('superagent');
var _ = require('lodash');

var actions = Reflux.createActions(['add','remove', 'edit']);

var Store = Reflux.createStore({
	listenables: actions,

	init: function() {
		this.features = [];
	},

	onAdd: function(data) {
		var self = this;
		request.get('/location', data)
		.end(function(res){
			if (res) {
				var feature = {
					"type": "Feature",
					"geometry": {
						"type": "Point",
						"coordinates": [res.body[0].longitude, res.body[0].latitude]
					},
					"properties": {
						"title": data.location,
						"marker-color": "#000"
					}
				};

				if (!_.includes(self.features, feature)) {
					self.features.push(feature);
					self.trigger(self.features);
				}
			}
		});
	},
	onRemove: function(data) {
		if (_.includes(this.features, data)) {
			var i = this.features.indexOf(data);
			if(i != -1) {
				this.features.splice(i, 1);
				this.trigger(this.features);
			}
		}
	},
	onEdit: function(data) {
		var feature = data.feature;
		if (_.includes(this.features, feature)) {
			var i = this.features.indexOf(data);

			var properties = _.clone(this.features[i + 1].properties) || {};
			feature.properties = _.merge(properties, data.properties);
			this.features[i + 1] = feature;
			this.trigger(this.features)
		}
	}
});

module.exports = {
	actions: actions,
	store: Store
};