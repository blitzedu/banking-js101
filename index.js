// User input module
const readline = require("readline")

// Initialize readline module
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const password = "1234"
let verified = false

let money = 0
let loanedMoney = 0

function verifyPassword() {
    if (verified) return true;

    console.log("You have not verified your password yet! To verify, type 'verify <password>'")
    return false;
}

function processCommand(command) {
    // Process all commands
    if (command === "quit") {
        process.exit(0)
    }

    const cmdSegments = command.split(" ")
    const commandAction = cmdSegments[0]
    const commandData = cmdSegments[1]

    if (cmdSegments.length > 2) {
        console.log("Invalid command!")
        return;
    }

    if (commandAction === "deposit") {
        if (!verifyPassword()) return;

        money += parseInt(commandData)
        console.log("Success!")
    } else if (commandAction === "withdraw") {
        if (!verifyPassword()) return;

        if (money < parseInt(commandData)) {
            console.log("Insufficient funds!")
        } else {
            money -= parseInt(commandData)
            console.log("Success!")
        }
    } else if (commandAction === "balance") {
        if (!verifyPassword()) return;

        console.log(`Your balance is ${money}$`)
        if (loanedMoney > 0) {
            console.log(`You owe ${loanedMoney}$`)
        }
    } else if (commandAction === "loan") {
        if (!verifyPassword()) return;

        money += parseInt(commandData)
        loanedMoney += parseInt(commandData)
        console.log("Success!")
    } else if (commandAction === "pay") {
        if (!verifyPassword()) return;

        money -= parseInt(commandData)
        loanedMoney -= parseInt(commandData)
        console.log("Success!")
    } else if (commandAction === "loan-balance") {
        if (!verifyPassword()) return;

        console.log(`You have loaned ${loanedMoney}`)
    } else if (commandAction === "verify") {
        if (commandData === password) {
            verified = true
            console.log("Success!")
        } else {
            console.log("Incorrect password!")
        }
    } else if (commandAction === "help") {
        console.log("Available commands:")
        console.log("deposit <amount>")
        console.log("withdraw <amount>")
        console.log("balance")
        console.log("loan <amount>")
        console.log("pay <amount>")
        console.log("loan-balance")
        console.log("verify <password>")
        console.log("quit")
    }
}

// Listen for user input
rl.on("line", processCommand);