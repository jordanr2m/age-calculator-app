const submitButton = document.querySelector("#submit");
// Dates
let currentTime = new Date();
let currentDate = currentTime.getDate();
let currentMonth = currentTime.getMonth() + 1; // starts at 0 by default
let currentYear = currentTime.getFullYear();

// Inputs & response paragraphs
const dayInput = document.querySelector("#day-number");
const monthInput = document.querySelector("#month-number");
const yearInput = document.querySelector("#year-number");
const dayInfo = document.querySelector("#days-result");
const monthsInfo = document.querySelector("#months-result");
const yearsInfo = document.querySelector("#years-result");

// Labels & error msgs
const labels = document.querySelectorAll("label");
const errorMessageDay = document.querySelector(".error-message-day");
const errorMessageMonth = document.querySelector(".error-message-month");
const errorMessageYear = document.querySelector(".error-message-year");
// Error message all array
const errorMessageAll = Array.from(document.querySelectorAll(".error-message-all"));


submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    let addedMonth = monthInput.value;
    let addedYear = yearInput.value;
    let addedDate = dayInput.value;
    const validDate = validateInput(addedDate, addedMonth, addedYear);
    // console.log(validDate);
    if (validDate) {
        calcDateTillNow();
    }
});

// validate input
function validateInput(inputD, inputM, inputY) {
    // Check that its not blank & is accepted #
    // Day
    if (inputD.length === 0) {
        addError(errorMessageAll, 0);
        addColor(labels, 0)
        dayInput.style.border = "1px solid var(--accent)";
    } else if (inputD < 1 || inputD > 31) {
        removeError(errorMessageAll, 0);
        addColor(labels, 0)
        dayInput.style.border = "1px solid var(--accent)";
        errorMessageDay.classList.remove("hidden");
    } else {
        removeError(errorMessageAll, 0);
        removeColor(labels, 0);
        errorMessageDay.classList.add("hidden");
        dayInput.style.border = "1px solid var(--border)";
    }
    // Month
    if (inputM.length === 0) {
        addError(errorMessageAll, 1);
        addColor(labels, 1)
        monthInput.style.border = "1px solid var(--accent)";
    } else if (inputM < 1 || inputM > 12) {
        removeError(errorMessageAll, 1);
        addColor(labels, 1)
        monthInput.style.border = "1px solid var(--accent)";
        errorMessageMonth.classList.remove("hidden");
    } else {
        removeError(errorMessageAll, 1);
        removeColor(labels, 1);
        errorMessageMonth.classList.add("hidden");
        monthInput.style.border = "1px solid var(--border)";
    }
    // Year
    if (inputY.length === 0) {
        addError(errorMessageAll, 2);
        addColor(labels, 2)
        yearInput.style.border = "1px solid var(--accent)";
    } else if (inputY < 0 || inputY > currentYear) {
        removeError(errorMessageAll, 2);
        addColor(labels, 2)
        yearInput.style.border = "1px solid var(--accent)";
        errorMessageYear.classList.remove("hidden");
    } else {
        removeError(errorMessageAll, 2);
        removeColor(labels, 2);
        errorMessageYear.classList.add("hidden");
        yearInput.style.border = "1px solid var(--border)";
    }
    return inputD, inputM, inputY; // return all inputs so that they can be used by subsequent code
};

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

// Perform calculation
function calcDateTillNow() {
    // target user values with let
    let addedMonth = monthInput.value;
    let addedYear = yearInput.value;
    let addedDate = dayInput.value;

    // create results variables with let
    let monthResult = currentMonth - addedMonth;
    let dateResult = currentDate - addedDate;
    let yearResult = currentYear - addedYear;

    // calculations - calc months if monthResult is negative or 0
    if (monthResult < 0) {
        monthResult = currentMonth + 12 - addedMonth; // add an extra year to current month by taking 12 months away from the yearResult (below)
        yearResult--;
    }
    
    // calc days if dateResult is negative or 0
    if (dateResult < 0) {
        if (
            // Months with 31 days
            monthResult == 1 ||
            monthResult == 3 ||
            monthResult == 5 ||
            monthResult == 7 ||
            monthResult == 8 ||
            monthResult == 10 ||
            monthResult == 12
        ) {
            dateResult = 31 + currentDate - addedDate;
            monthResult--;
            // February (no Leap years)
        } else if (monthResult == 2) {
            dateResult = 28 + currentDate - addedDate;
            monthResult--;
        } else if (
            // Months with 30 days
            monthResult == 4 ||
            monthResult == 6 ||
            monthResult == 9 ||
            monthResult == 11
        ) {
            dateResult = 30 + currentDate - addedDate;
            monthResult--;
        } else if (monthResult == 0) {
            monthResult = 12; // Take 12 months from the years
            yearResult--;
            dateResult = 31 + currentDate - addedDate; // Take 31 days from month (Dec or Jan?)
            monthResult--;
        }
    }
    dayInfo.innerText = dateResult;
    monthsInfo.innerText = monthResult;
    yearsInfo.innerText = yearResult;
};