const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {

    //parses the user input to understand which command was typed
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            //echo functionality added within commandLibrary()
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            //cat functionality added within commandLibrary()
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            //head functionality added within commandLibrary()
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            //tail function in commandLibrary()
            commandLibrary.tail(userInputArray.slice(1));
            break;
        case "reverse":
            //reverse function in commandLibrary()
            console.log("reverse function called")
            commandLibrary.reverse(userInputArray.slice(1).join(" "));
            break;
        default:
            commandLibrary.errorHandler(userInputArray[0]);
    }
}

//where we store the logic of our commands
const commandLibrary = {
    //echo command
    "echo": function(userInput) {
        done(userInput);
    },

    //cat command
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) throw err;
            done(data);
        });
    },

    //head command
    "head": function(fullPath) {
        const fileName = fullPath[0];
        var lines = 5;
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) throw err;
            var fivelines = data.toString('utf8').split(/\r?\n/);
            lineA = fivelines.slice(0, Math.min(lines, fivelines.length))
            done(lineA.join('\n'));
        });
    },

    //tail command
    "tail": function(fullPath) {
        const fileName = fullPath[0];
        var lines = 5;
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) throw err;
            var fivelines = data.toString('utf8').split(/\r?\n/);
            lineA = fivelines.slice(-5);
            done(lineA.join('\n'));
        })
    },

    //reverse function
    "reverse": function(userInput) {
        //split string into substring array
        forwardString = userInput.split('');
        //console.log(forwardString)
        reversedArray = forwardString.reverse();
        //console.log(reversedArray)
        reverseString = reversedArray.join('');
        //console.log(reverseString)
        done(reverseString);
    },

    //error handler
    "errorHandler": function(userInput) {
        done(userInput + " not recognized. Please try again.");
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;