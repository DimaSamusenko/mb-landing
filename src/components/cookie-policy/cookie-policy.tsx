'use client'

import {dictionary} from "@/components/cookie-policy/constants";
import {useCookieConsent} from "@/components/cookie-policy/useCookieconsent";

const defaultLang = 'en';

export default function CookiePolicy() {
    useCookieConsent();

    return (
        <div id="cc-main" data-nosnippet="">
            <div className="cm-wrapper cc--anim">
                <div className="cm cm--box cm--bottom cm--right" role="dialog" aria-modal="true" aria-hidden="false"
                     aria-describedby="cm__desc" aria-labelledby="cm__title">
                    <div tabIndex="-1"></div>
                    <div className="cm__body">
                        <div className="cm__texts">
                            <p id="cm__title" className="cm__title">{getLang('COOKIE_NOTICE_CAPTION')}</p>
                            <p id="cm__desc" className="cm__desc" dangerouslySetInnerHTML={{__html: getLang('COOKIE_NOTICE_MESSAGE')}}></p>
                        </div>
                        <div className="cm__btns">
                            <button type="button" className="cm__btn" data-role="all">
                                <span>{getLang('ALLOW_ALL_COOKIES_LABEL')}</span>
                            </button>
                            <button type="button" className="cm__btn" data-role="NECESSARY">
                                <span>{getLang('REJECT_ALL_COOKIES_LABEL')}</span>
                            </button>
                            <button type="button" className="cm__btn cm__btn--secondary" data-action="show-pm">
                                <span>{getLang('MANAGE_COOKIES_LABEL')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pm-wrapper cc--anim">
                <div className="pm-overlay"></div>
                <div className="pm pm--box" role="dialog" aria-hidden="false" aria-modal="true"
                     aria-labelledby="pm__title">
                    <div tabIndex="-1"></div>
                    <div className="pm__header">
                        <div className="pm__header-nav">
                            <button type="button" className="pm__close-btn-top">
                        <span className="style_inner__vveGT style___size-full__1fEx1">
                            <svg viewBox="0 0 12 20" className="b-svg style_icon__p2Rny" data-test="icon">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M3.414 10l8.293-8.293L10.293.293l-9 9L.586 10l.707.707 9 9 1.414-1.414L3.414 10z"></path>
                            </svg>
                            <symbol viewBox="0 0 12 20" id="larr-bold"><path fillRule="evenodd" clipRule="evenodd"
                                                                             d="M3.414 10l8.293-8.293L10.293.293l-9 9L.586 10l.707.707 9 9 1.414-1.414L3.414 10z"></path></symbol>
                        </span>
                            </button>
                        </div>
                        <span className="pm__title" id="pm__title">{getLang('MANAGE_COOKIES_CAPTION')}</span>
                        <div className="pm__header-nav"></div>
                    </div>
                    <div className="pm__body">
                        <div className="pm__section">
                            <div className="pm__section-desc-wrapper">
                                <p className="pm__section-desc">
                                    {getLang('MANAGE_COOKIES_MESSAGE')}
                                </p>
                            </div>
                        </div>

                        <div className="pm__section-wrapper">
                            <div className="pm__section">
                                <div className="section__toggle-wrapper pm__cursor-auto">
                                    <div className="pm__section-content">
                                        <div className="pm__section-title-wrapper">
                                            <span
                                                className="pm__section-title">{getLang('NECESSARY_COOKIES_CAPTION')}</span>
                                            <span className="section__note">
                                        <span className="pm__always">{getLang('ALWAYS_ACTIVE_HINT')}</span>
                                    </span>
                                        </div>
                                        <div className="pm__section-desc">
                                            {getLang('NECESSARY_COOKIES_MESSAGE')}
                                        </div>
                                    </div>
                                    <div className="pm__actions"></div>
                                </div>
                            </div>
                        </div>

                        <div className="pm__section-wrapper">
                            <div className="pm__section">
                                <label className="section__toggle-wrapper">
                                    <div className="pm__section-content">
                                        <div className="pm__section-title-wrapper">
                                            <span
                                                className="pm__section-title">{getLang('PREFERENCE_COOKIES_CAPTION')}</span>
                                        </div>
                                        <div className="pm__section-desc">
                                            {getLang('PREFERENCE_COOKIES_MESSAGE')}
                                        </div>
                                    </div>

                                    <div className="pm__actions">
                                        <input type="checkbox" className="section__toggle" value="PREFERENCE"/>
                                        <span className="toggle__icon" aria-hidden="true">
                                    <span className="toggle__icon-circle">
                                        <span className="toggle__icon-off">
                                        </span>
                                        <span className="toggle__icon-on">
                                        </span>
                                    </span>
                                </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pm__section-wrapper">
                            <div className="pm__section">
                                <label className="section__toggle-wrapper">
                                    <div className="pm__section-content">
                                        <div className="pm__section-title-wrapper">

                                            <span
                                                className="pm__section-title">{getLang('STATISTICS_COOKIES_CAPTION')}</span>


                                        </div>
                                        <div className="pm__section-desc">
                                            {getLang('STATISTICS_COOKIES_MESSAGE')}
                                        </div>
                                    </div>
                                    <div className="pm__actions">
                                        <input type="checkbox" className="section__toggle" value="STATISTICS"/>
                                        <span className="toggle__icon" aria-hidden="true">
                                            <span className="toggle__icon-circle">
                                                <span className="toggle__icon-off">
                                                </span>
                                                <span className="toggle__icon-on">
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pm__section-wrapper">
                            <div className="pm__section">
                                <label className="section__toggle-wrapper">
                                    <div className="pm__section-content">
                                        <div className="pm__section-title-wrapper">

                                            <span
                                                className="pm__section-title">{getLang('TARGETING_COOKIES_CAPTION')}</span>


                                        </div>

                                        <div className="pm__section-desc">
                                            {getLang('TARGETING_COOKIES_MESSAGE')}
                                        </div>
                                    </div>
                                    <div className="pm__actions">
                                        <input type="checkbox" className="section__toggle" value="TARGETING"/>
                                        <span className="toggle__icon" aria-hidden="true">
                                        <span className="toggle__icon-circle">
                                            <span className="toggle__icon-off">
                                            </span>
                                            <span className="toggle__icon-on">
                                            </span>
                                        </span>
                                    </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pm__section-wrapper">
                            <div className="pm__section">
                                <label className="section__toggle-wrapper">
                                    <div className="pm__section-content">
                                        <div className="pm__section-title-wrapper">
                                            <span
                                                className="pm__section-title">{getLang('THIRD_PARTY_COOKIES_CAPTION')}</span>
                                        </div>
                                        <div className="pm__section-desc" dangerouslySetInnerHTML={{__html: getLang('THIRD_PARTY_COOKIES_MESSAGE')}}>
                                        </div>
                                    </div>
                                    <div className="pm__actions">
                                        <input type="checkbox" className="section__toggle" value="THIRD_PARTY"/>
                                        <span className="toggle__icon" aria-hidden="true">
                                            <span className="toggle__icon-circle">
                                                <span className="toggle__icon-off">
                                                </span>
                                                <span className="toggle__icon-on">
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pm__section-wrapper">
                            <div className="pm__section">
                                <div className="pm__section-desc" dangerouslySetInnerHTML={{__html: getLang('FULL_COOKIE_POLICY_LABEL')}}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pm__footer">
                        <div className="pm__btn-group">
                            <button type="button" className="pm__btn" data-role="save">
                                {getLang('SAVE_COOKIES_LABEL')}
                            </button>
                            <button type="button" className="pm__btn pm__btn--secondary pm__close-btn">
                                {getLang('CANCEL_COOKIES_LABEL')}
                            </button>
                            <button type="button" className="pm__btn pm__btn--secondary" data-role="all">
                                {getLang('ALLOW_ALL_COOKIES_LABEL')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getLang(path: string) {
    const dict = dictionary[defaultLang];
    // @ts-ignore
    return dict[path] || path;
}
