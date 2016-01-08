var inputs = $("form#editForm input, form#editForm textarea, form#editForm select");

var validateInputs = function validateInputs(inputs) {
  var validForm = true;
  inputs.each(function(index) {
    var input = $(this);
    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
      $("#editKnopf").attr("disabled", "disabled");
      validForm = false;
    }
  });
  return validForm;
}


inputs.change(function() {
  if (validateInputs(inputs)) {
    $("#editKnopf").removeAttr("disabled");
  }
});
