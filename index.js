// User input module
const readline = require("readline")

// Initialize readline module
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let money = 0
function processCommand(command) {
    // Process all commands
    if (command === "quit") {
        process.exit(0)
    }

    const cmdSegments = command.split(" ")
    const commandAction = cmdSegments[0]
    const commandData = cmdSegments[1]

    if (commandAction === "deposit") {
        money += parseInt(commandData)
        console.log("Success!")
    } else if (commandAction === "withdraw") {
        if (money < parseInt(commandData)) {
            console.log("Insufficient funds!")
        } else {
            money -= parseInt(commandData)
            console.log("Success!")
        }
    }
}

// Listen for user input
rl.on("line", processCommand);