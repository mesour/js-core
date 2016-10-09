export default class Parameters
{

	params = {};

	/**
	 * @param {Mesour} mesour
	 */
	constructor(mesour)
	{
		this.mesour = mesour;
	}

	set(key, value) {
		this.params[key] = value;
	};

}