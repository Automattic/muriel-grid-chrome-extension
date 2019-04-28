'use strict';

(function() {
	function insertGridCSS(){
		let css = document.createElement('link');
			css.id = "base-grid-styles";
			css.rel = "stylesheet";
			css.type = "text/css";
			css.href = chrome.extension.getURL('src/css/grid.css');

		if (!document.getElementById('base-grid-styles')) {
			document.head.appendChild(css);
		}
	}

	function createListener(request, sender, sendResponse) {
		if ( request.method == "create" && !document.getElementById('amigrid') ) {
			insertGridCSS();

			let container = document.createElement('div');
			container.setAttribute('class', 'amigrid-container');

			const numColumns = 12;
			let output = '<div class="amigrid-nav-drawer"></div><div class="amigrid-overlay-container" id="amigrid">';

			for ( let i = 0; i < numColumns; i++ ){
				if ( i < 4 ){
					output += '<div class="amigrid-column"></div>';
				} 
				else if ( i < 8 ) {
					output += '<div class="amigrid-column amigrid-col-md"></div>';
				} else {
					output += '<div class="amigrid-column amigrid-col-lg"></div>';
				}
			}

			output += '</div>';

			container.innerHTML = output;

			document.body.appendChild(container);
		}
	}

    chrome.runtime.onMessage.addListener(createListener);

    function destroyListener(request, sender, sendResponse) {
        if (request.method == "destroy" && document.getElementById('amigrid')) {
            document.body.removeChild(document.getElementsByClassName('amigrid-container')[0]);
        }
    }

    chrome.runtime.onMessage.addListener(destroyListener);

    function toggleGridListener(request, sender, sendResponse) {
        if (request.method == "toggleGrid") {
            if (document.getElementById('amigrid')) {
                request.method = 'destroy';
                destroyListener(request, sender, sendResponse);
				chrome.storage.local.set({ "overlay": false }, function(){
					// data is saved
				});
            } else {
                request.method = 'create';
                createListener(request, sender, sendResponse);
				chrome.storage.local.set({ "overlay": true }, function(){
					// data is saved
				});
            }
        }
    }
    chrome.runtime.onMessage.addListener(toggleGridListener);
})();
