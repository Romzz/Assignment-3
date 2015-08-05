// Cowboy coding haha sorry
// ...
// jQuery HELL

(function($) {
	
	var dict = {};
	var copy;
	
    // jQuery -> DOM Manipulation + Event handling
    function onFormSubmit(event) {
        // get all field values
        var data = $(event.target).serializeArray();

        // transform field values array to student object
        var student = {};
        for (var i = 0; i < data.length; i++) {
            var key = data[i].name;
            var value = data[i].value;
            student[key] = value;
        }
		
		// check if student is already in list
		var studentFullName = student.first_name + ' ' + student.last_name;
		$.each(dict, function(key, value) {
			var testFullName = key + ' ' + value;
			if (studentFullName.toLowerCase() == testFullName.toLowerCase()) {
				alert("Duplicate found. Please try again.");
				copy = 1;		// duplicate signal
			}	
		});
		
		// if duplicate not found
		if (copy != 1) {
			// adding to dictionary
			dict[student.first_name] = student.last_name;
			
			// add student info to table
			$("#student-list").find('tbody')
			.prepend($('<tr>')
				.attr('class', 'student')
				.append($('<td>')
					.attr('class', 'first')
					.append($('<p>')
						.text(student.first_name.toLowerCase())
					)
				)
				.append($('<td>')
					.attr('class', 'last')
					.append($('<p>')
						.text(student.last_name.toLowerCase())
					)
				)
				.append($('<td>')
					.append($('<p>')
						.text(student.age)
					)
				)
				.append($('<td>')
						.append($('<a href="#"><span class="glyphicon glyphicon-remove"></span></a>'))
				)
			);
		}
		copy = 0;
		
		// deleting student
        $('tbody').on('click', 'tr.student', function() 
        {
			// delete student from dict
			var firstName = $(this).find('td.first').text();
			var lastName = $(this).find('td.last').text();
			var studentFullName = firstName + ' ' + lastName;

			$.each(dict, function(key, value) {
				var testFullName = key + ' ' + value;
				if (studentFullName.toLowerCase() == testFullName.toLowerCase()) {
					delete dict[firstName];
				}	
			});
			// delete table row
			$(this).remove();
        });
			
		//clear all field after creating a student
        $('.create-form').trigger("reset");
		
        return false;	// end
    }
    $('.create-form').submit(onFormSubmit)


})(jQuery)