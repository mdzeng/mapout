/** @jsx React.DOM */

var React = require('react');
var Map = require('./map.jsx');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<Map
					accessToken="pk.eyJ1IjoibWR6ZW5nIiwiYSI6InhoSG81ZTQifQ.LovD-K5qM2thM-5AR7KavQ"
					map="mdzeng.k62j958b"
				/>
			</div>
		);
	}
});