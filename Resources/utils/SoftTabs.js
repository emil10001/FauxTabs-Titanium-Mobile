/***
 * calc is a simple calculator to convert percentages to pixels
 */
var calc = (function(){
	return {
		x_pct : function(pct){
			return ((pct/100.0) * Ti.Platform.displayCaps.platformWidth);
		},
		y_pct : function(pct){
			return ((pct/100.0) * Ti.Platform.displayCaps.platformHeight);
		},
		x_pct_of : function(pct,width){
			return ((pct/100.0) * width);
		},
		y_pct_of : function(pct,height){
			return ((pct/100.0) * height);
		},
		auto_fit : function(num_elements,totalSize){
			return (totalSize/num_elements);
		}
	}
})();

/***
 * SoftTabs
 * param Ti.UI.View baseView 	- The base view that will be acted upon, everything gets added to this view
 * param float barHeight 			- height of the button bar and buttons within the bar, given as a percentage of the baseView
 * param String topOrBottom 	- either "top" or "bottom", should bar placement be relative to the top or the bottom of the baseView
 * param float barPosFromTop 		- placement of the button bar relative to the topOrBottom, given as a percentage of the baseView
 *  
 */
function SoftTabs(baseView, barHeight, topOrBottom, barPosFromTopOrBottom ){
	var tabs;

	barHeight = calc.y_pct(barHeight);
	barPosFromTopOrBottom = calc.y_pct(barPosFromTopOrBottom);
	
	if ("top" === topOrBottom){
		tabs = {
			buttonBar 		:	Ti.UI.createView({
				height  	: barHeight,
				width   	: baseView.getWidth(),
				top			: barPosFromTopOrBottom,
				left		: 0,
				layout		: "horizontal"
			})	,
			curView		: Ti.UI.createView({ 
				title 		: "curView", 
			    top	  		: barPosFromTopOrBottom + barHeight,
			    left		: 0,
			    height		: baseView.getHeight() - (barPosFromTopOrBottom + barHeight),
			    width		: baseView.getWidth()
			}), 
			tmpView     : Ti.UI.createView({ title : "tmpView" }),
			buttonViews : []
		}
	}
	else {
		tabs = {
			buttonBar 		:	Ti.UI.createView({
				height  	: barHeight,
				width   	: baseView.getWidth(),
				bottom		: barPosFromTopOrBottom,
				left		: 0,
				layout		: "horizontal"
			})	, 
			curView		: Ti.UI.createView({ 
				title 		: "curView", 
			    bottom 		: barPosFromTopOrBottom + barHeight,
			    left		: 0,
			    height		: baseView.getHeight() - (barPosFromTopOrBottom + barHeight),
			    width		: baseView.getWidth()
			}), 
			tmpView     : Ti.UI.createView({ title : "tmpView" }),
			buttonViews : []
		}
	}
	
	function getButtonView(mTitle){
		for (var i in tabs.buttonViews){
			if (mTitle === tabs.buttonViews[i].button.title){
				return tabs.buttonViews[i];
			}
		}
	}
	
	baseView.add(tabs.buttonBar);
	baseView.add(tabs.curView);
	
	return {
		/***
		 * return the tabs JSON object
		 */
		getTabs : function(){
			return tabs;
		},
		/***
		 * adds a tab to the view, adds a button to the button bar, 
		 * and an associated view to be controlled by that button
		 */
		addTab		 : function(mTitle, viewHeight, viewTopOrBottom, viewPosFromTopOrBottom){
			// Calculate the proper width of the buttons
			var buttonWidth = calc.auto_fit(( tabs.buttonViews.length + 1 ), baseView.getWidth() );
			 
			viewHeight = calc.y_pct_of(viewHeight,tabs.curView.getHeight());
			viewPosFromTopOrBottom = calc.y_pct_of(viewPosFromTopOrBottom,tabs.curView.getHeight());
			
			// resize previously added buttons
			for (var i in tabs.buttonViews){
				tabs.buttonViews[i].button.setWidth(buttonWidth);
			}
			
			var button = Ti.UI.createButton({
				title			: mTitle,
				height			: barHeight,
				width			: buttonWidth
			});
			
			// add new button to the buttonBar
			tabs.buttonBar.add(button);
			
			var tabView;
			if ("top" === viewTopOrBottom){
				tabView = Ti.UI.createView({
					title			: mTitle,
					height			: viewHeight,
					width			: baseView.getWidth(),
					top			 	: viewPosFromTopOrBottom,
					left 			: 0
				});
			}
			else {
				tabView = Ti.UI.createView({
					title			: mTitle,
					height			: viewHeight,
					width			: baseView.getWidth(),
					bottom 			: viewPosFromTopOrBottom,
					left 			: 0
				});
			}
			tabs.buttonViews.push({ 
				"button" : button,
				"tabView" : tabView
			});
			
			// on button click, remove all views from baseView and add the proper one
			button.addEventListener('click', function(){
				tabs.curView.remove(tabs.tmpView);
				var tmpView = getButtonView(mTitle).tabView;
				tabs.curView.add(tmpView);
				tabs.tmpView = tmpView;
			});
		},
		addContentToTab	: function(mTitle,content){
			getButtonView(mTitle).tabView.add(content);
		},
		getTab			: function(mTitle){
			return getButtonView(mTitle).tabView;
		}
	};
}

module.exports = SoftTabs;