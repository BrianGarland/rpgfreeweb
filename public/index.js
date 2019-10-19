
function convertCode() {
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  
  var lines = input.value.split('\n');
  //var lines = $('#input').val().split('\n');

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/convert", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({lines}));
  xhr.onload = function () {
      var data = JSON.parse(this.responseText);
      output.value = data.lines.join('\n');
  }

  //$('#myTextarea').val('');
}