// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//
// create base UI tab and root window
// this is all pretty basic stuff
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});
win1.add(label1);
var view1 = Ti.UI.createView({
	width: Ti.Platform.displayCaps.getPlatformWidth(),
	height: Ti.Platform.displayCaps.getPlatformHeight(),
	top:0,
	left : 0
});
win1.add(view1);
win1.open();

var Tabs = require('utils/SoftTabs');

// Now, we create our tabs instance
var tabs = new Tabs(view1, 15, "bottom", 0);

// and add a couple of tabs
tabs.addTab("tab 1", 50, "top", 0);

// "tab 2" is the title of the tab, button and view
// 50 - means 50% of view1, which is the view you're working off of
// "bottom" indicates that the buttonBar (tab bar) should be positioned relative to the bottom of view1
// 0 is the distance from the bottom to place the buttonBar
tabs.addTab("tab 2", 50, "bottom", 0);

// Create a few undimensioned views,
// undimensioned is easier since you want them to fill the tab's view 
var viewTop1 = Titanium.UI.createView({
    backgroundColor: 'Green'
});
var viewTop2 = Titanium.UI.createView({
    backgroundColor: 'Blue'
});
var viewsTop1 = Titanium.UI.createView({
    backgroundColor: 'Red'
});
var viewsTop2 = Titanium.UI.createView({
    backgroundColor: 'Yellow'
});

// Now, we add a view to a specified tab
tabs.addContentToTab("tab 1",viewTop1);
tabs.addContentToTab("tab 2",viewTop2);

// The following line allows us to add a new tab group within tabs
var subTabs = new Tabs(tabs.getTab("tab 1"), 10, "top", 0);

subTabs.addTab("sTab 1", 10, "top", 0);
subTabs.addTab("sTab 2", 100, "bottom", 0);

subTabs.addContentToTab("sTab 1",viewsTop1);
subTabs.addContentToTab("sTab 2",viewsTop2);
