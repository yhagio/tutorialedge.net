import { setupTippy } from './content/tippy.ts'
import { loadDeferredImgs } from './content/images.ts'
import { Router } from './router/index.ts'

function initialize() {
    loadDeferredImgs()
    setupTippy()
    let router = new Router();
}

initialize();