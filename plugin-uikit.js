// VERY IMPORTAMENT!!! this version is base on uikit framwork.
// add functional for set min max and step when after htmlNumberSpinner. 2022/07/18
(function ($) {
	$.fn.htmlNumberSpinner = function (options) {
		if (!options) {
			options = {
				onchange: function () {
				},
				onclick: function () {
				}
			}
		}

		if (!options.onChange) {
			options.onChange = function () {
			};
		}
		if (!options.onClick) {
			options.onClick = function () {
			};
		}

		/* creating the counter buttons */
		$(this).append("<div class='btn decrementer'>-</div> <input class='number-input' type='number'/> <div class='btn incrementer'>+</div>");


		/* default value and variables and jquery elements*/
		var defaultValue = 0, inputValue;
		var numberInput$ = $(this).find('.number-input');
		var incrementerEl$ = $(this).find('.incrementer');
		var decrementerEl$ = $(this).find('.decrementer');

		/* hide the default number input spinner */
		$(this).append("<style>" +
			"input[type=number]::-webkit-inner-spin-button, \n" +
			"input[type=number]::-webkit-outer-spin-button { \n" +
			"    -webkit-appearance: none;\n" +
			"    -moz-appearance: none;\n" +
			"    appearance: none;\n" +
			"    margin: 0; \n" +
			"}</style>");

		/* styling the counter buttons */
		// $(this).find('.btn').css({"display":"inline-block", "width":"50px", "height":"30px", "font-size":"25px", "text-align":"center", "vertical-align":"middle", "line-height":"1", "cursor":"pointer", "user-select":"none"});
		$(this).find('.btn').addClass('uk-button uk-button-default uk-button-small');
		// incrementerEl$.css({"background-color":"slateblue", "color":"white", "border": "1px solid slateblue"});
		incrementerEl$.addClass('uk-button-primary');

		// decrementerEl$.css({"background-color":"hotpink", "color":"white", "font-size":"25px", "border": "1px solid hotpink"});
		numberInput$.addClass('uk-input uk-form-small uk-form-width-xsmall uk-text-center');
		// numberInput$.css({
		//     "background-color":"white",
		//     "border": "1px solid",
		//     "color":"black",
		//     "text-align":"center",
		//     "width":"55px",
		//     "font-size":"18px",
		//     "line-height":"normal",
		//     "padding":"0",
		//     "outline":"none",
		//     "border-left-color": "hotpink",
		//     "border-right-color": "slateblue",
		//     "border-top-color": "lightblue",
		//     "border-bottom-color": "lightblue"
		// });


		/* props - dynamic attributes */
		var minAttributeValue = $(this).attr("min");
		var maxAttributeValue = $(this).attr("max");
		var stepAttributeValue = $(this).attr("step");

		if (minAttributeValue) {
			numberInput$.attr("min", +minAttributeValue);
		}

		if (maxAttributeValue) {
			numberInput$.attr("max", +maxAttributeValue);
		}

		if (stepAttributeValue) {
			numberInput$.attr("step", +stepAttributeValue);
		}


		/* set the default value into the input */
		inputValue = minAttributeValue ? minAttributeValue : defaultValue;
		numberInput$.val(inputValue);

		/* incrementer functionality */
		incrementerEl$.click(function () {
			var $inputEl = $(this).parent().find('.number-input');
			inputValue = $inputEl.val();
			maxAttributeValue = $inputEl.attr('max');
			stepAttributeValue = $inputEl.attr('step');

			if (maxAttributeValue) {
				if (maxAttributeValue == inputValue) {
					return;
				}
			}
			if (stepAttributeValue) {
				inputValue = $inputEl.val();
				$inputEl.val((+inputValue) + (+stepAttributeValue));
				options.onClick.call(this);
				numberInput$.trigger('change');
				return;
			}
			inputValue = $inputEl.val();
			$inputEl.val(++inputValue);
		});

		/* decrementer functionality */
		decrementerEl$.click(function () {
			var $inputEl = $(this).parent().find('.number-input');
			inputValue = $inputEl.val();
			minAttributeValue = $inputEl.attr('min');
			stepAttributeValue = $inputEl.attr('step');

			if (minAttributeValue) {
				if (minAttributeValue == inputValue) {
					return;
				}
			}
			if (stepAttributeValue) {
				inputValue = $inputEl.val();
				$inputEl.val((+inputValue) - (+stepAttributeValue));
				options.onClick.call(this);
				numberInput$.trigger('change');
				return;
			}
			inputValue = $inputEl.val();
			$inputEl.val(--inputValue);
		});

		numberInput$.on('change', function () {
			var $inputEl = $(this);
			inputValue = $inputEl.val();
			minAttributeValue = $inputEl.attr('min');
			maxAttributeValue = $inputEl.attr('max');
			stepAttributeValue = $inputEl.attr('step');

			if (!maxAttributeValue || !minAttributeValue) return;
			var currentValue = $inputEl.val();
			if ((+currentValue) > (+maxAttributeValue)) {
				$(this).val(maxAttributeValue);
				return true;
			}
			if ((+currentValue) < (+minAttributeValue)) {
				$(this).val(minAttributeValue);
				return true;
			}

			options.onChange.call(this);
		})

	};

	$.fn.getSpinnerValue = function () {
		return $(this).find('.number-input').val();
	};

	$.fn.setSpinnerValue = function (val) {
		return $(this).find('.number-input').val(val);
	};

	$.fn.setSpinnerStep = function (val) {
		return $(this).find('.number-input').attr('step', val);
	};
	$.fn.setSpinnerMin = function (val) {
		return $(this).find('.number-input').attr('min', val);
	};
	$.fn.setSpinnerMax = function (val) {
		return $(this).find('.number-input').attr('max', val);
	};

}(jQuery));
