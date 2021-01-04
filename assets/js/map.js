$(function () {
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	if (width >= 1200) {
		width = 535;
		height = 800;
	} else if (width >= 1024 && width < 1200) {
		width = (document.body.clientWidth * 0.9) - 185 - 40 - 20;
		height = width * 1.5;
	} else if (width >= 768 && width < 1024) {
		width = 435;
		height = width * 1.5;
	} else {
		height = width * 1.5;
	}
	var center = [width / 2, height / 2];
	var x = 480,
		y = 480,
		vWidth = 960;
	var k;
	var zoom_time = 1000;
	var path = d3.geoPath();
	var svg_feature = d3
	.select("#map")
	.append("svg")
	.attr("class", "maps")
	.attr("width", width)
	.attr("height", height);
	var div = d3.select("#tooltip").style("display", 'none');
	d3.queue()
		.defer(d3.json, "assets/js/tw-county-topo.json")
		.defer(d3.json, "assets/js/data.json")
		.awaitAll(initialize);
	function initialize(error, results) {
		if (error) {
			throw error;
		}
		var check = false;
		(function (a) {
			if (
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
					a
				) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
					a.substr(0, 4)
				)
			)
			check = true;
		})(navigator.userAgent || navigator.vendor || window.opera);
		var counties_feature = topojson.feature(
			results[0],
			results[0].objects.counties
		).features;
		var data = results[1];
		var dragcontainer = d3
			.drag()
			.on("start", function () {
				div.transition().duration(400).style("display", 'block');
			});
		var g_feature = svg_feature.append("g").call(dragcontainer);
		var countyPaths_feature = g_feature
			.selectAll(".county")
			.data(counties_feature)
			.enter()
			.append("path")
			.attr("class", "county")
			.attr("d", path)
			.on("click", enterCountry);
		if (check) {
			g_feature.attr(
				"transform",
				"translate(" +
					(center[0] - 480 * ((height / 940) * 0.8)) +
					"," +
					(center[1] - 480 * ((height / 940) * 0.8)) +
					")scale(" +
					(height / 940) * 0.8 +
					")"
			);
		} else {
			g_feature.attr(
				"transform",
				"translate(" +
					(center[0] - 480 * ((height / 920) * 0.8)) +
					"," +
					(center[1] - 480 * ((height / 920) * 0.8)) +
					")scale(" +
					(height / 920) * 0.8 +
					")"
			);
		}
		var counties = counties_feature;
		var svg = svg_feature;
		var g = g_feature;
		function enterCountry(d) {
			var enter_country = d.properties.name.substring(0, 3);
			var filtered_country = data.filter(function (item) {
				return item.county.toString().substring(0, 3) == enter_country;
			});
			var filtered_country_name = counties.filter(function (item) {
				return item.properties.name.toString() == enter_country;
			});
			div.transition().duration(200).style("opacity", 1);
			d3.selectAll(".county").classed("active", false);
			d3.select(this).classed("active", true);

			var newslist = "";
			for (let idx = 0; idx < filtered_country[0].travel.length; idx++) {
				newslist += "<li><span class='travel-agency'>" + filtered_country[0].travel[idx].travel_agency + "</span><a class='travel-item' href='" + filtered_country[0].travel[idx].travel_link + "'>" + filtered_country[0].travel[idx].travel_title + "</a></li>"
			}
			div.html(
				"<div class='county-tooltip-head px20'>" +
				"<div class='county-name'>" + filtered_country_name[0].properties.name + "</div>" +
				"<div class='county-second'><a class='county-share' target='_blank'>立即分享<img src='assets/images/share.svg' alt='share'></a>" +
				"<div id='county-tooltip-close' class='county-tooltip-close icon-close'></div>" +
				"</div></div>" +
				"<div class='county-tooltip-video'><div class='embed-responsive embed-responsive-16by9'>" + filtered_country[0].visual + "</div>" +
				"<div class='county-tooltip-accordion accordion'>" +
				"<div class='accordion-item'><div class='accordion-head px30 py10'>" + filtered_country[0].video_title + 
				"<i class='icon icon-down'></i></div><div class='accordion-body'><div class='embed-responsive embed-responsive-16by9'>" +
				"</div></div></div>" +
				"<div class='accordion-item'><div class='accordion-head px30 py10 active'>" + filtered_country[0].travel_title + 
				"<i class='icon icon-down'></i></div>" +
				"<div class='accordion-body' style='display: block;'><ul>" + newslist +
				"</ul></div></div></div>"
			);
			closeTooltips();
			accordion();
		}
	}
});
