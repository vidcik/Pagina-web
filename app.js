document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("infoButton").addEventListener("click", function() {
        toggleInfoSection();
    });


    function toggleInfoSection() {
        let infoSection = document.getElementById("infoSection");
        infoSection.style.display = infoSection.style.display === "none" ? "block" : "none";
    }


    document.getElementById("encryptionMethod").addEventListener("change", function() {
        let shiftInput = document.getElementById("shift");
        if (this.value === "caesar") {
            shiftInput.style.display = "inline-block";
            showMethodInfo("caesar");
        } else if (this.value === "reverse") {
            shiftInput.style.display = "none";
            showMethodInfo("reverse");
        } else if (this.value === "rot13") {
            shiftInput.style.display = "none";
            showMethodInfo("rot13");
        } else {
            shiftInput.style.display = "none";
            hideAllMethodInfo();
        }
    });

    
    document.getElementById("encryptButton").addEventListener("click", function() {
        encrypt();
    });

    document.getElementById("decryptButton").addEventListener("click", function() {
        decrypt();
    });


    function encrypt() {
        let inputText = document.getElementById("inputText").value;
        let method = document.getElementById("encryptionMethod").value;
        let outputText = "";

        switch (method) {
            case "caesar":
                let shift = parseInt(document.getElementById("shift").value);
                if (isNaN(shift)) {
                    alert("Por favor, introduce un valor válido para el desplazamiento.");
                    return;
                }
                outputText = caesarCipher(inputText, shift);
                break;
            case "reverse":
                outputText = reverseText(inputText);
                break;
            case "rot13":
                outputText = rot13(inputText);
                break;
            default:
                alert("Método de encriptación no válido.");
                return;
        }

        document.getElementById("outputText").value = outputText;
    }

  
    function decrypt() {
        let inputText = document.getElementById("inputText").value;
        let method = document.getElementById("encryptionMethod").value;
        let outputText = "";

        switch (method) {
            case "caesar":
                let shift = parseInt(document.getElementById("shift").value);
                if (isNaN(shift)) {
                    alert("Por favor, introduce un valor válido para el desplazamiento.");
                    return;
                }
                outputText = caesarCipher(inputText, -shift);
                break;
            case "reverse":
                outputText = reverseText(inputText);
                break;
            case "rot13":
                outputText = rot13(inputText);
                break;
            default:
                alert("Método de desencriptación no válido.");
                return;
        }

        document.getElementById("outputText").value = outputText;
    }

    
    function caesarCipher(text, shift) {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                let code = char.charCodeAt(0);
                let base = code >= 65 && code <= 90 ? 65 : 97;
                return String.fromCharCode(((code - base + shift) % 26 + 26) % 26 + base);
            }
            return char;
        }).join('');
    }

    
    function reverseText(text) {
        return text.split('').reverse().join('');
    }

   
    function rot13(text) {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                let code = char.charCodeAt(0);
                let base = code >= 65 && code <= 90 ? 65 : 97;
                return String.fromCharCode(((code - base + 13) % 26 + 26) % 26 + base);
            }
            return char;
        }).join('');
    }

 
    function showMethodInfo(method) {
    
        hideAllMethodInfo();

      
        let methodInfo = document.getElementById(method + "Info");
        if (methodInfo) {
            methodInfo.style.display = "block";
        }
    }


    function hideAllMethodInfo() {
        document.querySelectorAll(".method-info").forEach(info => {
            info.style.display = "none";
        });
    }
});
