function handleKeyPress(event) {
  if (event.key === "Enter") {
    var inputText = event.target.value;
    var formData = new FormData();
    formData.append("inputData", inputText);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/cgi-bin/code.cgi", true);
    xhr.onreadystatechange = function() {

      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = xhr.responseText;
        var inputOutputContainer = document.createElement("div");
        inputOutputContainer.classList.add("inputOutputContainer");

        var outputContainer = document.createElement("div");
        outputContainer.classList.add("outputContainer");
        outputContainer.innerText = response;
        var inputContainer = document.createElement("div");

        inputContainer.classList.add("inputContainer");
        
        var prefixSpan = document.createElement("span");
        prefixSpan.innerText = "wsh$";

        var newInput = document.createElement("input");
        newInput.type = "text";
        newInput.classList.add("inputField");
        newInput.onkeypress = handleKeyPress;
        newInput.setAttribute("autofocus", "autofocus");
        inputContainer.appendChild(prefixSpan);
        inputContainer.appendChild(newInput);

        inputOutputContainer.appendChild(outputContainer);
        inputOutputContainer.appendChild(inputContainer);
        var container = document.getElementById("container");
        container.appendChild(inputOutputContainer);

        newInput.focus();
      }
    };
    xhr.send(formData);
    event.preventDefault();
  }
}
