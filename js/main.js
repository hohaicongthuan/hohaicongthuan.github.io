document.addEventListener('DOMContentLoaded', function() {

    document.getElementsByTagName('form')[0].onsubmit = function(evt) {
        evt.preventDefault();       // Prevent the form from submitting
        handleInput();              // Handle input from user here
        window.scrollTo(0, 150);
    }

    document.getElementsByClassName('terminal')[0].onclick = function() {
        document.getElementById('terminal-input').focus();    
    }

    // Focus on the input
    document.getElementById('terminal-input').focus();

    // Get text value from input
    var inputText = document.getElementById('terminal-input').value.trim();

    // Get text from the result
    // get ElementsByClassName return an array of elements
    var resultText = document.getElementsByClassName('terminal-result')[0].innerHTML;

    // Clear text input
    var clearInput = function() {
        document.getElementById('terminal-input').value = "";
    }

    // Clear console output
    var clearConsole = function() {
        document.getElementsByClassName('terminal-result')[0].innerHTML = "<p>Welcome to NERD MODE!</p>";
    }

    // Scroll to the bottom of the result div
    var scrollToBottom = function() {
        var resultDiv = document.getElementsByClassName('terminal-result')[0];
        resultDiv.scrollTop = resultDiv.scrollHeight;
    }

    // Scroll to the bottom
    scrollToBottom();

    // Print text to the terminal
    var printText = function(textToAdd) {
        document.getElementsByClassName('terminal-result')[0].innerHTML += "<p>" + textToAdd + "</p>";
        scrollToBottom();
    }

    // Get time & date
    var getTimeAndDate = function(postTimeDay) {
        var dateAndTime = new Date();
        var hour = dateAndTime.getHours();
        var min = dateAndTime.getMinutes();
        var day = dateAndTime.getDate();
        var month = dateAndTime.getMonth() + 1;
        var year = dateAndTime.getFullYear();

        if (hour < 10) {
            hour = '0' + hour;
        }

        if (min < 10) {
            min = '0' + min;
        }

        var currentTime = hour + ":" + min;
        var currentDate = day + "/" + month + "/" + year;

        if (postTimeDay == "time") {
            printText(currentTime);
        }

        if (postTimeDay == "date") {
            printText(currentDate);
        }
    }

    // Open link in a new tab
    var openLinkInANewTab = function(link) {
        window.open(link, '_blank');
        clearInput();
    }

    var textReplies = function(textInput) {
        switch(textInput) {
            case "hello":
                printText("Hello There!");
                break;
            case "yo":
            case "what's up":
            case "what's up?":
            case "wassup":
                printText("Yo!");
                break;
            case "date":
                getTimeAndDate('date');
                break;
            case "now":
                getTimeAndDate('date');
                getTimeAndDate('time');
                break;
            case "time":
                getTimeAndDate('time');
                break;
            case "clear":
                clearConsole();
                break;
            case "help":
                printText('help - to print this help information.');
                printText("clear - to clear console's screen.");
                printText("exit - to quit NERD MODE.");
                printText("now - to see what's the time right now.");
                break;
            case "nerd":
                printText("You too! :)");
                break;
            case "exit":
                window.open("index.html", "_self");
                break;
            default:
                printText("<p class='errorText'>Unrecognised command.</p>");
                break;
        }
    }

    var handleInput = function() {
        textInput = document.getElementById('terminal-input').value.trim();
        textInput = textInput.toLowerCase();

        if (textInput != "") {
            printText('<p class="userEnteredText">> ' + textInput + '</p>');
            textReplies(textInput);
            clearInput();
        }
    }
});