function codeguard() {
    var codeBlock = document.getElementsByTagName('code');
    
	for (var i = 0; i < codeBlock.length; i++) {	
		codeBlock[i].setAttribute('v-pre','');	
	}	
}

export { codeguard }