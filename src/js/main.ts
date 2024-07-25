export const main = (function main() {
    if(!document) {
        return;
    }
    document.addEventListener('click', (event) => {
        let target = event.target;
        if (target?.tagName !== 'A') {
            target = target?.closest("A");
        }

        if (!target || !target?.classList.contains('cta')) {
            return;
        }
        event.preventDefault();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const separator = target?.href?.indexOf('?') !== -1 ? "&" : "?";
        window.open(target?.href + separator + urlParams.toString());
    });
}).toString();

