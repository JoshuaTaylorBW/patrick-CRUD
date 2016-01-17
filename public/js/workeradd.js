$("#addKnopf").attr("disabled", "disabled");
var inputs = $("#first_name, #last_name, #position");


var validateInputs = function validateInputs(inputs) {
  var validForm = true;
  inputs.each(function(index) {
    var input = $(this);
    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
        if(input.id !== "image") {
      $("#addKnopf").attr("disabled", "disabled");
      validForm = false;
        }
    }
  });
  return validForm;
}


inputs.change(function() {
  if (validateInputs(inputs)) {
    $("#addKnopf").removeAttr("disabled");
  }
});
