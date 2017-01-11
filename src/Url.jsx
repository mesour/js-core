/**
 * @class jQuery
 */

export default class Url
{

    mesourClosure;

	/**
	 * @param {Mesour} mesour
	 */
	constructor(mesourClosure)
	{
		this.mesourClosure = mesourClosure;
	}

	getMesour()
	{
		return this.mesourClosure();
	}

	createLink(link, handle, data, post)
	{
		let url = window.location.pathname;
		data = !data ? {} : data;

		let newArgs = {};
		jQuery.each(data, function (key, value) {
			newArgs['m_' + link + '-' + key] = value;
		});

		let args = {};
		args['m_do'] = link + '-' + handle;
		if(this.getMesour().parameters.params) {
			for(let i in this.getMesour().parameters.params) {
				if(!this.getMesour().parameters.params.hasOwnProperty(i)) {
					continue;
				}
				args[i] = this.getMesour().parameters.params[i];
			}
		}
		if (!post) {
			args = jQuery.extend(args, this.getCurrentQuery(), newArgs);
			let serialized = Url.serialize(args);
			if (serialized && serialized !== '') {
				url += '?' + serialized;
			}
			return url;
		} else {
			args['m_do'] = link + '-' + handle;
			let currentData = jQuery.extend(this.getCurrentQuery(), newArgs);
			let serialized = Url.serialize(args);
			if (serialized && serialized !== '') {
				url += '?' + serialized;
			}
			return [url, currentData];
		}
	}

	/**
	 * @param {boolean} full
	 * @returns {object}
	 */
	getCurrentQuery(full)
	{
		let query = window.location.search.substr(1);
		let vars = query.split('&');
		let data = {};
		for (let i = 0; i < vars.length; i++) {
			let pair = vars[i].split('=');
			let key = decodeURIComponent(pair[0]),
				value = decodeURIComponent(pair[1]);
			if (!key || (!full && key.substr(0, 2) === 'm_')) {
				continue;
			}
			data[key] = value;
		}
		return data;
	}

	/**
	 * @param {Object} obj
	 * @param {string} [prefix]
	 * @returns {string}
	 */
	static serialize(obj, prefix)
	{
		let str = [];
		for (let p in obj) {
			if (obj.hasOwnProperty(p)) {
				let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
				str.push(typeof v == "object" ?
					Url.serialize(v, k) :
				encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
		}
		return str.join("&");
	}

}