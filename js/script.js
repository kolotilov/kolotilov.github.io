(function(){
	var first_operand = "";
	var second_operand = "";
	var operator = "";
	var is_operator_selected = false;
	var is_first_operand_obtained = false;
	var is_second_operand_obtained = false;
	var is_this_next_operation = false;

	var display = document.getElementById("display");
	var digit_btns = document.querySelectorAll('.digits > a');
	var digit_btns_length = digit_btns.length;
	var operator_btns = document.querySelectorAll(".operators div a");
	var operator_btns_length = operator_btns.length;
	var equals_btn =document.getElementById("equals");
	var clear_btn = document.getElementById("clear");
	var plus_minus_btn = document.getElementById("plus_minus");
	var percent_btn = document.getElementById("percent");
	var result;

	function reset(current_value) {
		display.value = current_value;
		first_operand = current_value;
		second_operand = 0;
		is_first_operand_obtained = false;
		is_second_operand_obtained = false;
		is_this_next_operation = false;
		is_operator_selected = false;
		operator = "";
		
		for (var i = 0; i < operator_btns_length; i++) {
			deleteClass(operator_btns[i], ' selected_operator');
		}
	};

	function get_result(){
		switch (operator) {
			case '/':
			result = (parseFloat(first_operand)) / (parseFloat(second_operand));
			break;

			case 'x':
			result = (parseFloat(first_operand)) * (parseFloat(second_operand));
			break;

			case '-':
			result = (parseFloat(first_operand)) - (parseFloat(second_operand));
			break;

			case '+':
			result = (parseFloat(first_operand)) + (parseFloat(second_operand));
			break;

			default:
			break;
		}
	};

	function deleteClass(element, targetClass){
		element.className = element.className.replace(targetClass, "");
	}

	function addNewClass(element, targetClass){
		element.className = element.className.replace(targetClass, "");
		element.className = element.className + targetClass;
	}

	reset('0')

	// При нажатии кнопок с цифрами
	for (var i = 0; i < digit_btns_length; i++) {
		digit_btns[i].addEventListener("click", function(){
			if (is_this_next_operation == true) {
				reset(this.innerHTML);

			} else if ((is_operator_selected == true) && (is_first_operand_obtained == false)) {
				first_operand = display.value;
				is_first_operand_obtained = true;
				display.value = this.innerHTML;
				second_operand = display.value;
				is_second_operand_obtained = true;

			} else if ((is_operator_selected ==  true) && (is_first_operand_obtained == true)) {
				var current_value = display.value;
				var digit_to_be_added = this.innerHTML;

				var new_value = current_value + digit_to_be_added;
				
				display.value = new_value;
				second_operand = display.value;
				is_second_operand_obtained = true;

			} else {
				var current_value = display.value;
				if (current_value == "0") {
					current_value = "";
				}

				var digit_to_be_added = this.innerHTML;
				var new_value = current_value + digit_to_be_added;
				display.value = new_value;
			}	
		});
	}

	// При нажатии кнопок с арифметическими операциями
	 for (var i = 0; i < operator_btns_length; i++) {

		operator_btns[i].addEventListener("click", function(){

			if (is_this_next_operation == true) {
				reset(display.value);
				is_operand_obtained = false;
				is_this_next_operation = false;
			} 

			if ((is_operator_selected == true) && ((is_first_operand_obtained == true))){
				get_result();
				display.value = result;
				reset(result);
			}

			operator = this.innerHTML;
			is_operator_selected = true;
			
			
			for(var i = 0; i < operator_btns_length; i++) {
				
				deleteClass(operator_btns[i], " selected_operator");
			}

			addNewClass(this, " selected_operator")
			
		});
	}

	// При нажатии кнопки "равно"
	equals_btn.addEventListener("click", function(){
		
		if ((is_first_operand_obtained == true) && (is_second_operand_obtained == true)) {
			get_result();
			display.value = result;
			reset(result);
			is_this_next_operation = true;	
		}
	});

	// При нажатии кнопки "C"
	clear_btn.addEventListener("click", function(){
		reset('0');
	});

	// При нажатии кнопки "+/-"
	plus_minus_btn.addEventListener("click", function(){
		if ((is_first_operand_obtained == false) && (is_second_operand_obtained == false)){
			display.value *= -1;
		} else if (is_first_operand_obtained == true){
			second_operand *= -1;
			display.value = second_operand;
		} else if (is_second_operand_obtained == true){
			first_operand *= -1;
			display.value = first_operand;
		}
	});

	// При нажатии кнопки "%"
	percent_btn.addEventListener("click", function(){
		if ((is_first_operand_obtained == false) && (is_second_operand_obtained == false)){
			display.value /= 100;
		} else if ((is_second_operand_obtained == true) && ((operator == "+") || (operator == "-"))){
			var percent_operand = second_operand / 100;
			var percent_result = first_operand * percent_operand;
			display.value = percent_result;
			second_operand = percent_result;
		} else if ((is_second_operand_obtained == true) && ((operator == "/") || (operator == "x"))){
			second_operand /= 100;
			display.value = second_operand;
		}
	});

})();





