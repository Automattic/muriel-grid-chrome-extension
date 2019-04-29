'use strict';

window.addEventListener('load', function () {

	const gridToggle = document.getElementById('grid-toggle');
	const navdrawerToggle = document.getElementById('navdrawer-toggle');

	chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {

		const currentChromeTabId = tabs[0].id;

		chrome.tabs.executeScript(currentChromeTabId, {
			file: 'src/grid.js'
		});
		
		gridToggle.addEventListener('click', function(e){
			chrome.tabs.sendMessage(currentChromeTabId, { method: "toggleGrid", tabId: currentChromeTabId });
		});

		navdrawerToggle.addEventListener('click', function(e){
			chrome.tabs.sendMessage(currentChromeTabId, { method: "toggleNav", tabId: currentChromeTabId });
		});

	});

});
