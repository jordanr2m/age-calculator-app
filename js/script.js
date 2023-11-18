// User date inputs
const dayInput = document.querySelector("#day-number");
const monthInput = document.querySelector("#month-number");
const yearInput = document.querySelector("#year-number");
// Submit button
const submitButton = document.querySelector("#submit");

// Error message all
const errorMessageAll = Array.from(document.querySelectorAll(".error-message-all"));
    // console.log(errorMessageAll);
// Other error messages
const errorMessageDay = document.querySelector(".error-message-day");
const errorMessageMonth = document.querySelector(".error-message-month");
const errorMessageYear = document.querySelector(".error-message-year");

// Labels
const labels = Array.from(document.querySelectorAll("label"));
// console.log(labels);

// Dates
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
console.log(currentYear);
let currentMonth = currentDate.getMonth();
console.log(currentMonth);
let currentDay = currentDate.getDate();
console.log(currentDay);

// Results
const yearsResult = document.querySelector("#years-result");


submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const birthday = validateInput();
    if (birthday) {
        calcYears();
    }
});

// Validate user input
const validateInput = function () {
    const userDay = dayInput.value;
    const userMonth = monthInput.value;
    const userYear = yearInput.value;

    // Check that its not blank & is accepted #
    // Day
    if (userDay.length === 0) {
        addError(errorMessageAll, 0);
        addColor(labels, 0)
        dayInput.style.border = "1px solid var(--accent)";
    } else if (userDay < 1 || userDay > 31) {
        removeError(errorMessageAll, 0);
        addColor(labels, 0)
        errorMessageDay.classList.remove("hidden");
    } else {
        removeError(errorMessageAll, 0);
        removeColor(labels, 0);
        errorMessageDay.classList.add("hidden");
        dayInput.style.border = "1px solid var(--border)";
        // return userDay;
    }
    // Month
    if (userMonth.length === 0) {
        addError(errorMessageAll, 1);
        addColor(labels, 1)
        monthInput.style.border = "1px solid var(--accent)";
    } else if (userMonth < 1 || userMonth > 12) {
        removeError(errorMessageAll, 1);
        addColor(labels, 1)
        errorMessageMonth.classList.remove("hidden");
    } else {
        removeError(errorMessageAll, 1);
        removeColor(labels, 1);
        errorMessageMonth.classList.add("hidden");
        monthInput.style.border = "1px solid var(--border)";
        // return userMonth;
    }
    // // Year
    if (userYear.length === 0) {
        addError(errorMessageAll, 2);
        addColor(labels, 2)
        yearInput.style.border = "1px solid var(--accent)";
    } else if (userYear < 1 || userYear > currentYear) {
        removeError(errorMessageAll, 2);
        addColor(labels, 2)
        errorMessageYear.classList.remove("hidden");
    } else {
        removeError(errorMessageAll, 2);
        removeColor(labels, 2);
        errorMessageYear.classList.add("hidden");
        yearInput.style.border = "1px solid var(--border)";
        // return userYear;
    }
}

// Functions to Add & Remove Errors /////
const addError = function (array, index) {
    array[index].classList.remove("hidden");
};
const removeError = function (array, index) {
    array[index].classList.add("hidden");
};

// Function to update Label color
const addColor = function (array, index) {
    array[index].style.color = "var(--accent)";
};
const removeColor = function (array, index) {
    array[index].style.color = "var(--label)";
};

// Function to Calculate Years
const calcYears = function () {
    const userYear = yearInput.value;
    const totalYears = currentYear - userYear;
    console.log(totalYears);
    yearsResult.innerText = totalYears;
};