'use strict';

window.addEventListener('load', function () {

	const gridToggle = document.getElementById('grid-toggle');

	chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {

		const currentChromeTabId = tabs[0].id;

		chrome.tabs.executeScript(currentChromeTabId, {
			file: 'src/grid.js'
		});
		
		gridToggle.addEventListener('click', function(e){
			chrome.tabs.sendMessage(currentChromeTabId, { method: "toggleGrid", tabId: currentChromeTabId });
		});

		chrome.storage.local.get('overlay', function(items){
			if (items.overlay) {
				gridToggle.checked = true;
			}
		});

	});

});
