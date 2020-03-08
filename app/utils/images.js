function loadDeferredImgs() {
	var imgDefer = document.getElementsByTagName('img');
	// var is_firefox = typeof window.InstallTrigger !== 'undefined';
	// var is_chrome = !!window.chrome && !is_opera && !is_Edge;
	// var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// var is_Edge = navigator.userAgent.indexOf("Edge") > -1;
	// var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	for (var i = 0; i < imgDefer.length; i++) {		
		if (imgDefer[i].getAttribute('data-src')) {
			imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));	
		}
	}
	
}

export { loadDeferredImgs }