import tippy from 'tippy.js';

function setupTippy() {
    tippy('.content a',{
        theme: 'light-border',
        content: (element) => {
            return element.href;
        }
    })
}

export { setupTippy }