function convertCode() {
  var lines = $('#input').val().split('\n');

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/convert", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({lines}));
  xhr.onload = function () {
      var data = JSON.parse(this.responseText);
      $('#output').val(data.lines.join('\n'));
  }

  //$('#myTextarea').val('');
}