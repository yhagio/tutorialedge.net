import { setupTippy } from './utils/tippy.ts'
import { loadDeferredImgs } from './utils/images.ts'

import './components/profile.ts'
import './components/redirect.ts'
import './components/logout.ts'
import './components/quiz.ts'

function initialize() {
    loadDeferredImgs()
    setupTippy()
}

initialize();