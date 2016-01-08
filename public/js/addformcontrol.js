$("#addKnopf").attr("disabled", "disabled");
var inputs = $("form#addNew input, form#addNew textarea, form#addNew select");

var validateInputs = function validateInputs(inputs) {
  var validForm = true;
  inputs.each(function(index) {
    var input = $(this);
    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
      $("#addKnopf").attr("disabled", "disabled");
      validForm = false;
    }
  });
  return validForm;
}


inputs.change(function() {
  if (validateInputs(inputs)) {
    $("#addKnopf").removeAttr("disabled");
  }
});
