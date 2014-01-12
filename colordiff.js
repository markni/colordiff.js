(function () {
	var root = this;

	var previousColordiff = root.Colordiff;

	var Colordiff;

	if (typeof exports !== 'undefined') {
		Colordiff = exports;
	} else {
		Colordiff = root.Colordiff = {};
	}

	Colordiff.VERSION = '0.0.1';

	Colordiff.noConflict = function () {
		root.Colordiff = previousColordiff;
		return this;
	};


	//Compute the color difference using CIEDE2000 definition
	//see http://en.wikipedia.org/wiki/Color_difference

	//@param color1 {object} such as {L:100,a:0, b:0} or {r:255,g:255,b:255}
	//@param [type] {string} accept ['rgb']



	Colordiff.compare = function (color1, color2, type) {
		var Lab1 = color1;
		var Lab2 = color2;
	    if (typeof type !== 'undefined' && type === 'rgb'){
			Lab1 = rgb2Lab(color1);
			Lab2 = rgb2Lab(color2);
		}

		var L1 = Lab1.L, a1 = Lab1.a, b1 = Lab1.b;
		var L2 = Lab2.L, a2 = Lab2.a, b2 = Lab2.b;
		var C1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2));
		var C2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2));

		var diff_alt_L = L1 - L2;
		var avg_L = (L1 + L2) / 2;
		var avg_C = (C1 + C2) / 2;

		var alt_a1 = a1 + (a1 / 2) * (1 - Math.sqrt(Math.pow(avg_C, 7) / (Math.pow(avg_C, 7) + Math.pow(25, 7))));
		var alt_a2 = a2 + (a2 / 2) * (1 - Math.sqrt(Math.pow(avg_C, 7) / (Math.pow(avg_C, 7) + Math.pow(25, 7))));

		var alt_C1 = Math.sqrt(Math.pow(alt_a1, 2) + Math.pow(b1, 2));
		var alt_C2 = Math.sqrt(Math.pow(alt_a2, 2) + Math.pow(b2, 2));

		var avg_alt_C = (alt_C1 + alt_C2) / 2;
		var diff_alt_C =  alt_C2 - alt_C1;

		var alt_h1 = toDeg(Math.atan2(b1, alt_a1)) % 360;
		var alt_h2 = toDeg(Math.atan2(b2, alt_a2)) % 360;

		var diff_alt_h;

		if (!alt_C1 || !alt_C2) {
			diff_alt_h = 0;
		}

		else if ((alt_h1 - alt_h2) <= 180) {
			diff_alt_h = alt_h2 - alt_h1;
		}
		else if ((alt_h1 - alt_h2) > 180 && alt_h2 <= alt_h1) {
			diff_alt_h = alt_h2 - alt_h1 + 360;
		}
		else if ((alt_h1 - alt_h2) > 180 && alt_h2 > alt_h1) {
			diff_alt_h = alt_h2 - alt_h1 - 360;
		}

		var diff_alt_H = 2 * Math.sqrt(alt_C1 * alt_C2) * Math.sin(toRad(diff_alt_h / 2));

		var avg_alt_H;

		if ((alt_h1 - alt_h2) > 180) {
			avg_alt_H = (alt_h1 + alt_h2 + 360 ) / 2
		}

		else if ((alt_h1 - alt_h2) <= 180) {
			avg_alt_H = (alt_h1 + alt_h2) / 2
		}

		var T = 1 - 0.17 * Math.cos(toRad(avg_alt_H - 30)) + 0.24 * Math.cos(toRad(2 * avg_alt_H)) + 0.32 * Math.cos(toRad(3 * avg_alt_H + 6)) - 0.20 * Math.cos(toRad(4 * avg_alt_H - 63));

		var SL = 1 + 0.015 * Math.pow(diff_alt_L - 50, 2) / Math.sqrt(20 + Math.pow(diff_alt_L - 50, 2));
		var SC = 1 + 0.045 * avg_alt_C;
		var SH = 1 + 0.015 * avg_alt_C * T;

		var RT = -2 * Math.sqrt(Math.pow(avg_alt_C, 7) / (Math.pow(avg_alt_C, 7) + Math.pow(24, 7))) * Math.sin(toRad(60 * Math.exp(-1 * Math.pow((avg_alt_H - 275) / 25, 2))));

		var KL = 1, KC = 1, KH = 1;

		return Math.sqrt(Math.pow(diff_alt_L/ (KL * SL),2) + Math.pow(diff_alt_C/ (KC * SC),2) + Math.pow(diff_alt_H/ (KH * SH),2) + RT*(diff_alt_C / (KC * SC))*(diff_alt_H / (KH * SH)) );

	}

	var toDeg = function (rad) {
		return rad * 180 / Math.PI;
	}

	var toRad = function (deg) {
		return deg * Math.PI / 180;
	}

	var rgb2Lab = function (rgb) {

		for (var key in rgb) {

			rgb[key] = rgb[key] / 255;

			if (rgb[key] > 0.04045) {
				rgb[key] = Math.pow((rgb[key] + 0.055) / 1.055, 2.4);
			}
			else {
				rgb[key] = rgb[key] / 12.92;
			}

			rgb[key] = rgb[key] * 100;

		}

		var x = rgb.r * 0.4124 + rgb.g * 0.3576 + rgb.b * 0.1805;
		var y = rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722;
		var z = rgb.r * 0.0193 + rgb.g * 0.1192 + rgb.b * 0.9505;
		var xyz = {x: x, y: y, z: z};

		xyz.x = xyz.x / 95.047;
		xyz.y = xyz.y / 100;
		xyz.z = xyz.z / 108.883;

		for (var key in xyz) {
			if (xyz[key] > 0.008856) {
				xyz[key] = Math.pow(xyz[key], (1 / 3));

			}
			else {
				xyz[key] = (7.787 * xyz[key]) + (16 / 116);
			}

		}

		var L = (116 * xyz.y) - 16;
		var a = 500 * (xyz.x - xyz.y);
		var b = 200 * (xyz.y - xyz.z);

		return {L: L, a: a, b: b};

	}

}).call(this);

