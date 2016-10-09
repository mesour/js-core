export default class Helper
{

	/**
	 * @param {Array} actual
	 */
	static cleanArray(actual)
	{
		var newArray = [];
		for (var i = 0; i < actual.length; i++) {
			if (actual[i]) {
				newArray.push(actual[i]);
			}
		}
		return newArray;
	}

	static parseValue(value, data) {
		if (value.indexOf('{') !== -1 && value.indexOf('}') !== -1) {
			return value.replace(/(\{[^\{]+\})/gi, function replacer(match) {
				var key = match.substr(1, match.length - 2);
				return typeof data[key] !== 'undefined' ? data[key] : ('__UNDEFINED_KEY-' + key + '__');
			});
		} else {
			return value;
		}
	};

}