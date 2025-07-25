//url for production
export let url = "";

if (import.meta.env.NODE_ENV === "development") {
    url = "";
} else {
    url = window.location.host.split("/")[1];
    if (url) {
        url = `/${window.location.host.split("/")[1]}`;
    } else url = import.meta.env.BASE_URL; /// ADD YOUR CPANEL SUB-URL
}

//Function to validate and return errors for a form
export const checkForm = (formData) => {
    let errorState = {};
    Object.keys(formData).forEach((item) => {
        if (formData[item] === null || formData[item] === "") {
            errorState[item] = "This field is required";
        }
    });
    return errorState;
};

//Function that returns the first or first two letters from a name
export const findUpper = (string) => {
    let extractedString = [];

    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === string.charAt(i).toUpperCase() && string.charAt(i) !== " ") {
            extractedString.push(string.charAt(i));
        }
    }
    if (extractedString.length > 1) {
        return extractedString[0] + extractedString[1];
    } else {
        return extractedString[0];
    }
};

//Function that calculates the form current date
export const setDeadline = (days) => {
    let todayDate = new Date();
    let newDate = new Date(todayDate);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};

// Function to structure date ex : Jun 4, 2011;
export const getDateStructured = (date) => {
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();
    return monthNames[m] + " " + d + ", " + y;
};

// Function to structure date ex: YYYY-MM-DD
export const setDateForPicker = (rdate) => {
    let d = rdate.getDate();
    d < 10 && (d = "0" + d);
    let m = rdate.getMonth() + 1;
    m < 10 && (m = "0" + m);
    let y = rdate.getFullYear();
    rdate = y + "-" + m + "-" + d;

    return rdate;
};

// Set deadlines for projects
export const setDeadlineDays = (deadline) => {
    let currentDate = new Date();
    let difference = deadline.getTime() - currentDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
};

//Date formatter function
export const dateFormatterAlt = (date, reverse) => {
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();
    reverse ? (date = m + "-" + d + "-" + y) : (date = y + "-" + d + "-" + m);
    return date;
};

//Date formatter function
export const dateFormatter = (date, reverse) => {
    let dateformat = date.split("/");
    //let date = dateformat[1]+"-"+dateformat[2]+"-"+dateformat[0];
    reverse
        ? (date = dateformat[2] + "-" + dateformat[0] + "-" + dateformat[1])
        : (date = dateformat[1] + "-" + dateformat[2] + "-" + dateformat[0]);

    return date;
};

//today's Date
export const todaysDate = new Date();

//current Time
export const currentTime = () => {
    let hours = todaysDate.getHours();
    let minutes = todaysDate.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
};

//Percentage calculation
export const calcPercentage = (str1, str2) => {
    let result = Number(str2) / Number(str1);
    result = result * 100;
    return Math.floor(result);
};

export const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + " " + truncate(str.substr(n - 1, str.length), n) : str;
};

// returns upload url
export const getUploadParams = () => {
    return {url: "https://httpbin.org/post"};
};

export const bulkActionOptions = [
    {value: "suspend", label: "Suspend User"},
    {value: "delete", label: "Delete User"},
];

// Converts KB to MB
export const bytesToMegaBytes = (bytes) => {
    let result = bytes / (1024 * 1024);
    return result.toFixed(2);
};

export const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const numberFormat = (number) => {
    const nf = new Intl.NumberFormat('id-ID');
    return nf.format(String(number).replace(/\./g, ""));
}

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const role = (roleId) => {
    switch (roleId) {
        case '1':
            return "Administrator";
        case '2':
            return "Operator Madrasah";
        case '3':
            return "Bendahara"
        case '4':
            return "Teller"
        case '5':
            return "Walikelas"
        default:
            return "Pengunjung"
    }
}