var prevName = "";

module.exports = {
  Parse: function (input) {
    var output = {
      remove: false,
      change: false,
      value: "",

      beforeSpaces: 0,
      nextSpaces: 0
    };

    var name = input.substr(7, 16).trim();
    var keywords = input.substr(44).trim();

    input = input.trimRight();

    if (prevName != "") {
      name = prevName;
      prevName = "";
    }
    if (input.endsWith("...")) {
      prevName = input.substr(0, input.length - 3);
      output.remove = true;
    } else {
      switch (input[24].toUpperCase()) {
        case 'B':
          output.value = ("Dcl-Proc " + name + " " + keywords).trimRight();
          output.nextSpaces = 2;
          break;
        case 'E':
          output.beforeSpaces = -2;
          output.value = "End-Proc";
          break;
      }
    }

    if (output.value !== "") {
      output.change = true;
      output.value = output.value.trimRight() + ';';
    }
    return output;
  }
}