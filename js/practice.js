const submitButton = document.querySelector("#submit");
// Dates
let currentTime = new Date();
let currentDate = currentTime.getDate();
let currentMonth = currentTime.getMonth() + 1; // starts at 0
let currentYear = currentTime.getFullYear();

// Inputs and response ps - use let bc will change
let dayInput = document.querySelector("#day-number");
let monthInput = document.querySelector("#month-number");
let yearInput = document.querySelector("#year-number");
let dayInfo = document.querySelector("#days-result");
let monthsInfo = document.querySelector("#months-result");
let yearsInfo = document.querySelector("#years-result");

// Inputs, labels & error msgs
const inputs = document.querySelectorAll("input[type=number]");
const errorMsgs = document.querySelectorAll(".error-message-all");
const labels = document.querySelectorAll("label");
const errorMessageDay = document.querySelector(".error-message-day");
const errorMessageMonth = document.querySelector(".error-message-month");
const errorMessageYear = document.querySelector(".error-message-year");


submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    validateInput();
    calcDateTillNow();
});

// validate input
function validateInput() {
    let addedMonth = monthInput.value;
    let addedYear = yearInput.value;
    let addedDate = dayInput.value;
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    // if (!addedMonth && !addedDate && !addedYear) {
    //     inputs.forEach((input) => input.style.border = "1px solid var(--accent)");
    //     errorMsgs.forEach((msg) => msg.classList.remove("hidden"));
    //     labels.forEach((label) => label.style.color = "var(--accent)");
    // } else if (addedDate < 1 || addedDate > 31) {
    //     errorMessageDay.classList.remove("hidden");
    // } else if (addedMonth < 1 || addedMonth > 12) {
    //     errorMessageMonth.classList.remove("hidden");
    // } else if (addedYear < 1 || addedYear > currentYear) {
    //     errorMessageYear.classList.remove("hidden");
    // }
}

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
    // } else if (monthResult == 0) {
    //     yearResult; // Don't use return here!! If month result is 0, do not change yearResult
    // }
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