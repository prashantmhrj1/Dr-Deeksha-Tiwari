// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}


// Mobile menu click करने के बाद बंद करना

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


// =========================
// CURRENT YEAR
// =========================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


// =========================
// GOOGLE SHEET FORM
// =========================

const registrationForm =
    document.getElementById("registrationForm");

const formMessage =
    document.getElementById("formMessage");


// आपकी Google Apps Script Web App URL

const scriptURL =
    "https://script.google.com/macros/s/AKfycbyd_2FkKXhzlfCoOtXxkSFBk1-hcKRJyuM2SlgZLkbtwreAcqdEnTtEbq-f7QX5T2ZkNw/exec";


// =========================
// FORM SUBMIT
// =========================

if (registrationForm) {

    registrationForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const submitButton =
            registrationForm.querySelector(".submit-btn");


        const formData =
            new FormData(registrationForm);


        submitButton.disabled = true;

        submitButton.textContent =
            "Submitting...";


        formMessage.innerHTML = "";


        // Google Sheet को data भेजें

        fetch(scriptURL, {

            method: "POST",

            body: formData

        })


        .then(response => response.text())


        .then(result => {

            console.log(
                "Google Response:",
                result
            );


            try {

                const data =
                    JSON.parse(result);


                if (data.success) {

                    formMessage.innerHTML = `

                        <div class="success-box">

                            <div class="success-icon">
                                ✓
                            </div>

                            <h3>
                                Registration Successful!
                            </h3>

                            <p>
                                आपकी जानकारी
                                सफलतापूर्वक जमा हो गई है।
                            </p>

                            <div class="registration-number">

                                आपका नंबर:

                                <strong>
                                    ${data.number}
                                </strong>

                            </div>

                        </div>

                    `;


                    // Form खाली करें

                    registrationForm.reset();


                } else {

                    formMessage.innerHTML =
                        "❌ " + data.message;

                }


            } catch (error) {

                console.error(
                    "JSON Error:",
                    error
                );


                formMessage.innerHTML =
                    "❌ Data save हो गया, लेकिन response पढ़ने में समस्या हुई।";

            }


            submitButton.disabled = false;

            submitButton.textContent =
                "Submit";

        })


        .catch(error => {

            console.error(
                "Fetch Error:",
                error
            );


            formMessage.innerHTML =
                "❌ कुछ समस्या हुई।";


            submitButton.disabled = false;

            submitButton.textContent =
                "Submit";

        });

    });

}