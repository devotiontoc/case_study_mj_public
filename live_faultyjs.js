// faultyScript.js

// 1. Undeclared Variable and Global Scope Pollution
function calculateTotal(price, taxRate) {
    total = price + price * taxRate; // 'total' is not declared with var, let, or const
    return total;
}

calculateTotal(100, 0.08);

// 2. Using '==' Instead of '===' Leading to Type Coercion
function isUserActive(user) {
    if (user.status == "active") { // Should use '===' for strict comparison
        return true;
    } else {
        return false;
    }
}

// 3. Syntax Error Due to Missing Closing Brace
function greetUser(name) {
    if (name) {
        console.log("Hello, " + name);
    else { // Missing closing brace for the 'if' statement
            console.log("Hello, Guest");
        }
    }

// 4. Unsafe Use of 'eval' Function
    function executeUserCode(userCode) {
        eval(userCode); // Using eval can lead to security vulnerabilities
    }

    executeUserCode("alert('This is unsafe!')");

// 5. Missing Error Handling with Asynchronous Operations
    function fetchData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                processData(data);
            });
        // No catch block to handle errors
    }

    fetchData("https://api.example.com/data");

// 6. Incorrect Use of 'this' Keyword in Arrow Functions
    const user = {
        name: "Alice",
        greet: () => {
            console.log("Hello, " + this.name); // Arrow function does not have its own 'this'
        }
    };

    user.greet(); // Outputs: "Hello, undefined"

// 7. Memory Leak Due to Unremoved Event Listeners
    function addClickListener(element) {
        function handleClick() {
            console.log("Element clicked!");
        }

        element.addEventListener("click", handleClick);
        // No way to remove the event listener, leading to potential memory leaks
    }

// Assuming 'button' is a valid DOM element
    const button = document.getElementById("myButton");
    addClickListener(button);

// 8. Improper Variable Scope with 'var' in a Loop
    for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            console.log(i); // All callbacks will log '5' instead of 0-4
        }, 1000);
    }

// 9. Unreachable Code After Return Statement
    function getStatus(isActive) {
        if (isActive) {
            return "Active";
            console.log("This will never be executed"); // Unreachable code
        } else {
            return "Inactive";
        }
    }

// 10. Using Deprecated Synchronous XMLHttpRequest
    function getUserData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/user", false); // Synchronous XHR is deprecated
        xhr.send();
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        }
    }

    const userData = getUserData();
    console.log(userData);

// 11. Missing 'break' Statement in Switch Case
    function getDayName(dayNumber) {
        let dayName;
        switch(dayNumber) {
            case 0:
                dayName = "Sunday";
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            default:
                dayName = "Invalid day";
        }
        return dayName;
    }

    console.log(getDayName(0)); // Outputs: "Monday" instead of "Sunday"

// 12. Incorrect Callback Usage Leading to Callback Hell
    function fetchUserData(userId, callback) {
        fetch(`/api/user/${userId}`)
            .then(response => response.json())
            .then(user => {
                fetch(`/api/user/${user.id}/posts`)
                    .then(response => response.json())
                    .then(posts => {
                        callback(user, posts);
                    });
            });
    }

    fetchUserData(1, (user, posts) => {
        console.log(user, posts);
    });

// 13. Not Returning a Promise in an Async Function
    async function loadData() {
        fetch("https://api.example.com/data")
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        // Missing 'return' statement if intended to return a Promise
    }

    loadData();

// 14. Improper Handling of 'null' or 'undefined' Values
    function getUserName(user) {
        return user.name.toUpperCase(); // If 'user' or 'name' is null/undefined, it will throw an error
    }

    console.log(getUserName(null));

// 15. Leaking Sensitive Information in Error Messages
    function authenticate(user, password) {
        if (user !== "admin" || password !== "password123") {
            throw new Error("Authentication failed: Invalid username or password."); // Reveals which part failed
        }
        return true;
    }

    try {
        authenticate("admin", "wrongPassword");
    } catch (error) {
        console.error(error.message);
    }
