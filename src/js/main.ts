export const main = (function main() {
    if(!document) {
        return;
    }

    document.addEventListener('click', clickHandler, false);
    document.addEventListener('contextmenu', rightClick, false);
    document.addEventListener('mousedown', middleClick, false);

    function clickHandler(eventObj) {
        let target = eventObj.target;
        let targetAnchor = null;
        do {
            if (target && 'A' === target.tagName?.toUpperCase()) {
                targetAnchor = target;
                break;
            }
            target = target.parentNode;
        } while (target);
        if (targetAnchor && targetAnchor?.classList.contains('cta')) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const separator = target.href?.indexOf('?') !== -1 ? "&" : "?";
            const newHref = target.href + separator + urlParams.toString();

            const originalHref = target.href;
            target.href = newHref;
            target.target = '_blank';
            setTimeout(function () {
                target.href = originalHref;
            }, 150);
        }
    }

    function middleClick(e) {
        if (e.which === 2) {
            clickHandler(e);
        }
    }

    function rightClick(e) {
        if (e.which === 3) {
            clickHandler(e);
        }
    }

}).toString();

