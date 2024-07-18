// import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import {useEffect} from "react";
import {useReadyStateEffect} from "@/components/cookie-policy/useReadyState";

const cookieConsentCustom = {

    consentModalSelector: '#cc-main .cm-wrapper .cm',

    consentModalButtonsSelector: '[data-role]',

    preferencesModalSelector: '#cc-main .pm-wrapper .pm',

    preferencesOverlaySelector: '#cc-main .pm-wrapper .pm-overlay',

    preferencesModalCloseSelector: '.pm__close-btn',

    preferencesModalSaveSelector: '[data-role="save"]',

    preferencesModalUseAllSelector: '[data-role="all"]',

    preferencesModalInputsSelector: 'input.section__toggle',

    preferencesModalMobileCloseSelector: '.pm__close-btn-top',

    manageCookieLinkSelector: 'cookie-consent__manage-cookie-link',

    init: function () {
        if (!document.getElementById(cookieConsentCustom.manageCookieLinkSelector)) return;
        cookieConsentCustom.cookieConsentInit();
        document.getElementById(cookieConsentCustom.manageCookieLinkSelector).addEventListener('click', function (e) {
            e.preventDefault();

            cookieConsentCustom.showPreferencesModal();
        });
    },

    cookieConsentInit: function () {
        CookieConsent.run({
            "enabled": true,
            cookie: {
                name: 'ConsentCookie'
            },
            "expireDays": 182,
            "categories": {
                "NECESSARY": {
                    "alwaysAcceptable": true,
                    readOnly: true,
                    "cookies": ["puid", "SESSION_KEY", "JSESSIONID", "WSESSIONID", "PUNTER_KEY_EXISTS", "PUNTER_KEY", "PUNTER-SESSION-HASH", "FD_SHOWN", "bonusMark", "viewedNotificationItems", "visitedNavBarItems", "favoriteAuthType", "showLegalAgreement", "ThreeDsMsgAccepted", "ThreeDsMsgClosed", "TopbarBlockedSiteClosed", "BROADCAST", "broadcastPopupShowed", "showLoginDialog", "sportStat", "TopbarUpdateDocumentClosed", "TopbarUnavailabilitySpainAnnounceClosed", "TopbarUnsupportedBrowserClosed", "TopbarVariousAccessClosed", "successChangePassword", "zeroMarginAgreementsDialog", "loyaltyPrizesPromotionClosed", "needParticipateInPromotionAfterLogin", "lhnStorageType", "lhnJWT", "lhnRefresh", "lhnContact", "domainPopupShowed", "panbet.session.isQuizPageFirstVisit", "showRatingDialog", "preventModalShowed", "quizAnswers", "notifyPhoneConfirmed", "notifyIdentificationComplete", "notifyJoinComplete", "identificationStatus", "SHOW_TIMER_COOKIE", "BET_COOKIE", "showResultDistribution", "panbet.hideNicknameNotePopup", "betslipPlaceModeBlock", "BET_CONSTRUCTOR_COOKIE", "notShowCashoutHint", "panbet.showwelcomemessage", "depositdonecookie", "pmessages", "_tok", "X-PunterId", "MARATHON_CLIENT", "timezone", "panbet.sitestyle", "panbet.oddstype", "panbet.openadditionalmarketsseparately", "LIVE_TRENDS_STYLE", "panbet.openeventnameseparately", "justLogged"]
                },
                "PREFERENCE": {"alwaysAcceptable": false, "cookies": ["lang"]},
                "STATISTICS": {
                    "alwaysAcceptable": false,
                    "cookies": [/^(_ga)/, "_gcl_au", /^(amplitude_id_)/, "AMP_", "_dvs", "_dvp", "trevnt", /^(_ym)/, "fhash", "mfhash", "refererId"]
                },
                "TARGETING": {
                    "alwaysAcceptable": false,
                    "cookies": ["pref", "fr", "aff_cookie", "landing-utm-source", "utm-source", "_fbp"]
                },
                "THIRD_PARTY": {
                    "alwaysAcceptable": false,
                    "cookies": ["gaLiveChatChat", "NID", "AEC", "1P_JAR", "_uetsid", "_uetvid"]
                }
            },
            language: {
                default: 'en',
                translations: {}
            }
        }).then(() => {
            /**
             * Show dialog if
             * consent is not valid
             */
            if (!CookieConsent.validConsent()) {
                this.showConsentModal();
            } else {
                const categories = CookieConsent.getConfig('categories');

                let erase = [];

                for (let key in categories) {
                    if (!CookieConsent.acceptedCategory(key)) {
                        erase = erase.concat(categories[key].cookies);
                    }
                }

                CookieConsent.eraseCookies(erase);
            }
        });
    },

    showConsentModal: function () {
        const consentModal = document.querySelector(this.consentModalSelector);
        consentModal.style.visibility = 'visible';
        consentModal.style.opacity = 1;
        consentModal.style.transform = 'none';

        const buttons = consentModal.querySelectorAll(this.consentModalButtonsSelector);

        if (buttons) {
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                button.addEventListener('click', () => {
                    /**
                     * See https://cookieconsent.orestbida.com/reference/api-reference.html#acceptcategory
                     * for more acceptCategory() examples
                     */

                    const acceptValue = button.dataset.role;

                    CookieConsent.acceptCategory(acceptValue);

                    window.location.reload();
                });
            }
        }

        const pmShowButton = consentModal.querySelector('[data-action="show-pm"]');
        pmShowButton.addEventListener('click', () => {
            this.showPreferencesModal();
        })
    },

    showPreferencesModal: function () {
        this.setUserPreferences();

        const preferencesModal = document.querySelector(this.preferencesModalSelector);

        preferencesModal.style.visibility = 'visible';
        preferencesModal.style.opacity = 1;

        const preferencesOverlay = document.querySelector(this.preferencesOverlaySelector);

        preferencesOverlay.style.visibility = 'visible';
        preferencesOverlay.style.opacity = 1;

        const pmCloseButton = preferencesModal.querySelector(this.preferencesModalCloseSelector);

        pmCloseButton.addEventListener('click', () => {
            this.hidePreferencesModal();
        });

        const pmMobileCloseButton = preferencesModal.querySelector(this.preferencesModalMobileCloseSelector);

        pmMobileCloseButton.addEventListener('click', () => {
            this.hidePreferencesModal();
        });

        const saveButton = preferencesModal.querySelector(this.preferencesModalSaveSelector);

        saveButton.addEventListener('click', () => {
            const checkboxes = preferencesModal.querySelectorAll(this.preferencesModalInputsSelector);
            const categories = CookieConsent.getConfig('categories');

            if (checkboxes) {
                let selected = [];
                let erase = [];
                for (let i = 0; i < checkboxes.length; i++) {
                    let checkbox = checkboxes[i];

                    if (checkbox.checked) {
                        selected.push(checkbox.value);
                    } else {
                        erase = erase.concat(categories[checkbox.value].cookies);
                    }
                }

                CookieConsent.acceptCategory(selected);
                CookieConsent.eraseCookies(erase);
            }

            window.location.reload();
        });

        const saveAllButton = preferencesModal.querySelector(this.preferencesModalUseAllSelector);

        saveAllButton.addEventListener('click', () => {
            CookieConsent.acceptCategory('all');
            window.location.reload();
        });
    },

    hidePreferencesModal: function () {
        const preferencesModal = document.querySelector(this.preferencesModalSelector);

        preferencesModal.style.visibility = 'hidden';
        preferencesModal.style.opacity = 0;

        const preferencesOverlay = document.querySelector(this.preferencesOverlaySelector);

        preferencesOverlay.style.visibility = 'hidden';
        preferencesOverlay.style.opacity = 0;
    },

    setUserPreferences: function () {
        const preferencesModal = document.querySelector(this.preferencesModalSelector);
        const userPreferences = CookieConsent.getUserPreferences();
        const inputs = preferencesModal.querySelectorAll('input');


        for (let i = 0; i < inputs.length; i++) {
            if (userPreferences.acceptedCategories.includes(inputs[i].value)) {
                inputs[i].checked = true;
            }
        }
    }
}

export function useCookieConsent() {
    useReadyStateEffect(
        /* callback */ () => {
            cookieConsentCustom.init();
        },
        [],
        "complete"
    );
}
