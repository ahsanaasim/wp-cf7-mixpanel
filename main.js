var form = document.getElementsByClassName("wpcf7-form")[0];
form.addEventListener('submit', (event) => {
    var element = {};
    var validated = true;
    var email = "";
    var name = "";
    Array.from(form.elements).forEach((input) => {
        if (input.name == 'user-name' && input.value) {
            element['$name'] = input.value;
            name = input.value;
        } else if (input.name == 'user-email' && input.value) {
            element['$email'] = input.value
            email = input.value;

        }


        if (input.getAttribute("aria-required")) {
            if (!input.value) {
                validated = false;
            }
        }
        if (!input.name.includes('_wpcf7')) {
            element[input.name] = input.value
        }
    });
    if (validated) {
        if (email && name) {
            mixpanel.alias(email);
            mixpanel.identify(email);
            mixpanel.people.set(element);
        }

        mixpanel.track("EV Charging Market Research Paper Form Submitted (Download)", element);
    } else {
        console.log('validation failed')
    }
});
