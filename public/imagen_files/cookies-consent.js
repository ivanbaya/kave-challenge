//#region initialize
const TIMES_LOOP = 75, WAIT_TIME = 100;
let clicked_consent = false;
let created_listener_policy = false;
var consents = {
    'essentials': true,
    'analytics_storage': false,
    'ad_storage': false,
    'functional_storage': false,
    'personalization_storage': false,
    'security_storage': false,
};
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

const default_gtag = () => {
    try {
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'functional_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'denied'
        });

        dataLayer.push({
            'event': 'default_consent'
        });

    } catch (e) {
        console.error('ERROR: ' + e);
    }

};

const reset_consents = () => {
    consents.essentials = true;
    consents.ad_storage = false;
    consents.analytics_storage = false;
    consents.functional_storage = false;
    consents.personalization_storage = false;
    consents.security_storage = false;
}
//#endregion initialize

//#region Updates
const check_consent_item = (elem) => {
    for (const i in elem) {
        switch (elem[i]) {
            case 'analytics':
                if (!consents.analytics_storage)
                    return false;
                break;
            case 'ad':
                if (!consents.ad_storage)
                    return false;
                break;
            case 'functionality':
                if (!consents.functional_storage)
                    return false;
                break;
            default:
                return false;
        }
    }
    return true;
};

const update_third_party_scripts = () => {
    document.querySelectorAll("[data-cookie]").forEach(async function (elem) {
        let my_cookies = elem.dataset.cookie.split('-'); //Check if cookie need more permissions
        if (check_consent_item(my_cookies)) { //If all permissions need it are accepted, then go in for execute
            if(typeof(elem.dataset.cookierequired) !== 'undefined'){
                //Activate link de photslurp
                const photoSlurpLinkElement=document.getElementById("photoSlurpPageLink");
                    if (photoSlurpLinkElement) {
                        photoSlurpLinkElement.classList.remove("isHidden");
                    }
                // Hide button and text "Required Cookies"
                const featureNeedsCookiesElement = document.getElementById("featureNeedsCookies");
                if (featureNeedsCookiesElement) featureNeedsCookiesElement.innerHTML="";
            }
            if (elem.tagName === 'SCRIPT') {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.textContent = elem.textContent;

                if (typeof elem.dataset.src !== 'undefined') {
                    script.src = elem.dataset.src;
                }

                script.onload = script.textContent;
                elem.parentNode.insertBefore(script, elem);
                elem.parentNode.removeChild(elem);
            }
          
        }
        else if(typeof(elem.dataset.cookierequired) !== 'undefined') {
            const name_cookie_check = "OptanonAlertBoxClosed";
            if (exist_cookie(name_cookie_check)) {
                let element = document.getElementById("featureNeedsCookies")
                if(element) {
                    if(element.innerHTML===""){
                        element.innerHTML=`<p>${cookiesTranslateService.toUseThisFunctionalityYouNeedToEnableOurCookies}</p><button id='ot-sdk-btn' class="ot-sdk-show-settings">${cookiesTranslateService.enableCookieSettings}</button>`;
                        check_button_cookie_policy();
                    }
                }
            }
        }
    });
};

const update_gtag = () => {
    try {
        gtag('consent', 'update', {
            'ad_storage': consents.ad_storage === true ? 'granted' : 'denied',
            'analytics_storage': consents.analytics_storage === true ? 'granted' : 'denied',
            'functional_storage': consents.functional_storage === true ? 'granted' : 'denied',
            'personalization_storage': consents.personalization_storage === true ? 'granted' : 'denied',
            'security_storage': consents.security_storage === true ? 'granted' : 'denied'
        });
    } catch (e) {
        console.error('ERROR: ' + e);
    }

    dataLayer.push({
        'event': 'update_consent',
        'consents': {
            'ad_storage': consents.ad_storage,
            'analytics_storage': consents.analytics_storage,
            'functional_storage': consents.functional_storage,
            'personalization_storage': consents.personalization_storage,
            'security_storage': consents.security_storage,
        }
    });

    if (clicked_consent) {
        dataLayer.push({
            'event': 'update_consent_with_click'
        });
    }
};

const wait_third_party_scripts = async () => {
    var times = 0;
    while (document.readyState !== "complete" && times < TIMES_LOOP) {
        await sleep(WAIT_TIME);
        times++;
    }
    update_third_party_scripts();
};

const consents_updated = () => {
    update_gtag();
    if (clicked_consent) {
        wait_third_party_scripts();
        const name_consent = "Consents";
        localStorage.setItem(name_consent, JSON.stringify(consents));
    }
    else {
        wait_third_party_scripts();
    }
};
//#endregion Updates

//#region Create our wrapper
const create_our_wrapper = () => {
    let myHtml = `
        <div class="our-wrapper">
            <h2>Cookies consent</h2>
            <div class="type-cookie">
                <h4>Essentials</h4>
                <label class="switch-button">
                    <div class="no-slide"></div>
                </label>
            </div>
            <div class="type-cookie">
                <h4>Functionals</h4>
                <label class="switch-button">
                    <input type="checkbox" id="cookie-functional"></input>
                    <div class="slide round"></div>
                </label>
            </div>
            <div class="type-cookie">
                <h4>Analytics</h4>
                <label class="switch-button">
                    <input type="checkbox" id="cookie-analytics"></input>
                    <div class="slide round"></div>
                </label>
            </div>
            <div class="type-cookie">
                <h4>Advertising</h4>
                <label class="switch-button">
                    <input type="checkbox" id="cookie-advertising"></input>
                    <div class="slide round"></div>
                </label>
            </div>
            <div class="consent-buttons">
                <button onclick=consent_choices()>Confirm My Choices</button>
                <button onclick=consent_all()>Allow all</button>
            </div>
        </div>`;

    document.body.innerHTML += myHtml;
}

const save_consents_in_local = () => {
    const wrapper = document.getElementsByClassName('our-wrapper');
    if (wrapper) {
        for (var i = 0; i < wrapper.length; i++)
            document.body.removeChild(wrapper[i]);
    }

    clicked_consent = true;
    const name_consent = "Consents";
    localStorage.setItem(name_consent, JSON.stringify(consents));
    consents_updated();
    check_button_cookie_policy();
}

function consent_choices() {
    consents.essentials = true;
    consents.functional_storage = document.getElementById('cookie-functional').checked;
    consents.analytics_storage = document.getElementById('cookie-analytics').checked;
    consents.ad_storage = document.getElementById('cookie-advertising').checked;

    save_consents_in_local();
}

function consent_all() {
    consents.essentials = true;
    consents.analytics_storage = true;
    consents.ad_storage = true;
    consents.functional_storage = true;
    consents.personalization_storage = true;
    consents.security_storage = true;

    save_consents_in_local();
}
//#endregion Create our wrapper

//#region if nothing exist of OneTrust
const wait_document_body = () => {
    if (document.body != null) {
        wait_wrapper(true);
    }
}

const get_cookies_by_local_storage = (name) => {
    const consent_local = JSON.parse(localStorage.getItem(name));
    if (consent_local === null) {
        wait_document_body();
    }
    else {
        consents = consent_local;
        consents_updated();
    }
}
//#endregion if nothing exist of OneTrust

//#region if OnetrustActiveGroups fails but has cookies OT


const change_consents_cookie_one_trust = (values) => {
    if (values === null) {
        return null;
    }

    let list_values = values.split("%");

    if (list_values.length % 2 !== 0) {
        return null;
    }

    for (let i = 0; i < list_values.length; i += 2) {
        const type_consent = list_values[i][list_values[i].length - 1];
        const approved = list_values[i + 1][list_values[i + 1].length - 1] === 1;
        switch (type_consent) {
            case '1':
                consents.essentials = approved;
                break;
            case '3':
                consents.functional_storage = approved;
                break;
            case '4':
                consents.analytics_storage = approved;
                consents.ad_storage = approved; //actually analytics and ads are the same cookie in OT
                break;
        }
    }
    consents_updated();
}

const get_values_from_string_cookies = (name, base, separator) => {
    if (name === null || base === null || separator === null) {
        return null;
    }
    let prefix = name + "=";
    let index = base.indexOf(prefix);
    if (index === -1) {
        return null;
    }
    let end = base.indexOf(separator, index);
    end = end === -1 ? base.length : end;

    return decodeURI(base.substring(index + prefix.length, end));
};

const get_consent_one_trust = () => {
    const name_cookie_values = "OptanonConsent";
    const name_param = "groups";
    const string_value_consent = get_values_from_string_cookies(name_param, get_values_from_string_cookies(name_cookie_values, document.cookie, ";"), "&");
    if (change_consents_cookie_one_trust(string_value_consent) === null) {
        const name_consent = "Consents";
        get_cookies_by_local_storage(name_consent);
    }
};
//#endregion if OnetrustActiveGroups fails but has cookies OT

const exist_cookie = (name) => {
    let prefix = name + "=";
    const index = document.cookie.indexOf(prefix);
    return index !== -1
};

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const get_cookies_permission_values = (located = true) => {
    let active_groups;
    if (!located) {
        if (typeof OptanonActiveGroups === 'undefined') {
            return null;
        }
        else {
            active_groups = OptanonActiveGroups.split(',');
        }
    }
    else {
        active_groups = OnetrustActiveGroups.split(',');
    }
    for (i = 0; i < active_groups.length; i++) {
        switch (active_groups[i]) {
            case 'C0001':
                consents.essentials = true;
                break;
            case 'C0003':
                consents.functional_storage = true;
                break;
            case 'C0004':
                consents.analytics_storage = true;
                consents.ad_storage = true; //actually analytics and ads are the same cookie in OT
                break;
        }
    }
    consents_updated();
    return true;
}

const wait_one_trust = async () => {
    var times = 0;
    while (typeof OnetrustActiveGroups === 'undefined' && times < TIMES_LOOP) {
        await sleep(WAIT_TIME);
        times++;
        if (document.readyState !== "complete") {
            times = 0;
        }
    }

    if (typeof OnetrustActiveGroups !== 'undefined') {
        get_cookies_permission_values();
    }
    else if (times === TIMES_LOOP && typeof OnetrustActiveGroups === 'undefined' && get_cookies_permission_values(false) === null) {
        get_consent_one_trust();
    }

};

const listeners_one_trust = () => {
    clicked_consent = true;

    document.getElementById("onetrust-accept-btn-handler").addEventListener("click", (e) => {
        e.preventDefault()
        wait_one_trust();
    });

    document.getElementById("accept-recommended-btn-handler").addEventListener("click", (e) => {
        e.preventDefault()
        wait_one_trust();
    });

    document.getElementsByClassName("save-preference-btn-handler")[0].addEventListener("click", (e) => {
        e.preventDefault()
        wait_one_trust();
    });
};

const listeners_one_trust_cookie_policy = async () => {
    clicked_consent = true;
    var element = document.getElementById("ot-pc-content");
    var times = 0;
    while (times < TIMES_LOOP && element === null) {
        await sleep(WAIT_TIME);
        times++;
        if (document.readyState !== "complete") {
            times = 0;
        }
    }

    if (!created_listener_policy) {
        if (document.getElementById("ot-pc-content") !== null) {
            created_listener_policy = true;

            document.getElementById("accept-recommended-btn-handler").addEventListener("click", (e) => {
                e.preventDefault()
                reset_consents();
                wait_one_trust();
            });

            document.getElementsByClassName("save-preference-btn-handler")[0].addEventListener("click", (e) => {
                e.preventDefault()
                reset_consents();
                wait_one_trust();
            });
        }
    }
};

const wait_wrapper = async (second_call = false) => {
    var times = 0;
    var banner = document.getElementById("onetrust-consent-sdk");
    while (banner === null && times < TIMES_LOOP) {
        await sleep(WAIT_TIME);
        banner = document.getElementById("onetrust-consent-sdk");
        times++;

        if (document.readyState !== "complete") {
            times = 0
        }
    }

    if (banner !== null) {
        listeners_one_trust();
    }
    else if (banner === null && times === TIMES_LOOP && !second_call) {
        get_cookies_by_local_storage("Consents");
    }
}

const check_previous_consent = () => {
    const name_cookie_check = "OptanonAlertBoxClosed";

    if (exist_cookie(name_cookie_check)) {
        wait_one_trust();
    }
    else {
        wait_wrapper();
    }
};

const check_button_cookie_policy = () => {
    button_consent = document.getElementById('ot-sdk-btn');
    if (button_consent === null) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function () {
                if (!created_listener_policy) {
                    button_consent = document.getElementById('ot-sdk-btn');
                    if (button_consent !== null) {
                        button_consent.addEventListener("click", (e) => {
                            e.preventDefault();
                            listeners_one_trust_cookie_policy();
                        });
                    }
                }
            });
        }
        else if (!created_listener_policy) {
            button_consent = document.getElementById('ot-sdk-btn');
            if (button_consent !== null) {
                button_consent.addEventListener("click", (e) => {
                    e.preventDefault();
                    listeners_one_trust_cookie_policy();
                });
            }
        }
    }
    else {
        if (!created_listener_policy) {
            button_consent.addEventListener("click", (e) => {
                e.preventDefault()
                listeners_one_trust_cookie_policy();
            });
        }
    }
}

// Calling Functions
default_gtag();
check_previous_consent();
check_button_cookie_policy();