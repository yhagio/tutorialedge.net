import { setupTippy } from './content/tippy.ts'
import { loadDeferredImgs } from './content/images.ts'

function initialize() {
    loadDeferredImgs()
    setupTippy()
}

initialize();