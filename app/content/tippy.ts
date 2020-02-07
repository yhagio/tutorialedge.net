import tippy from 'tippy.js';

function setupTippy() {
    tippy('.content a',{
        theme: 'light-border',
        content: (element: any) => {
            return element.href;
        }
    })
}

export { setupTippy }