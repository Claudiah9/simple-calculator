const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const specialChars = ['%', '*', '/', '-', '+', '='];
let output = '';

// Defining function to calculate based on button clicked
const calculate = (btnValue) => {
    if (btnValue === '=' && output !== '') {
        try {
            // If output has '%', replace with '/100' before evaluating
            output = eval(output.replace('%', '/100'));
            // Check for division by zero
            if (output === Infinity || output === -Infinity) {
                output = "Error";
            }
        } catch (error) {
            // Handle any errors that occur during evaluation
            output = "Error";
        }
    } else if (btnValue === 'AC') {
        // Clear output if 'AC' is clicked
        output = '';
    } else if (btnValue === 'DEL') {
        // Remove the last character if 'DEL' is clicked
        output = output.toString().slice(0, -1);
    } else {
        // Prevent multiple consecutive special characters
        if (specialChars.includes(btnValue) && specialChars.includes(output.slice(-1))) {
            return;
        }
        // If output is empty and button is a special character, do nothing
        if (output === '' && specialChars.includes(btnValue)) return;

        // Append the button value to the output
        output += btnValue;
    }

    // Update the display value with the current output
    display.value = output;
}

// Add event listener to buttons, call calculate() on click
buttons.forEach((button) => {
    // Button click listener calls calculate() with dataset value as argument
    button.addEventListener('click', (e) => calculate(e.target.dataset.value));
});
