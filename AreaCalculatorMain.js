/* (C) 2020 VisualCalcs, LLC, all rights reserved */
var mouseState = 'moving';
var drawingMode = 'lines';

var Precision = 1;
var lineArray = [];
var undoLineArray = [];
var leftLineArray = [];
var firstLineDrawn = false;
var rectsDetected = false;
var ClosedSection = false;
var AllowDeleteLines = true;
var LastDrawingMode = 'lines';
var ConstructionLineMode = false;

var WasClosed = false;
var dragFromLineID = 999;

var rectArray = [];

var arcArray = [];
var chamferArray = [];

var linearDimArray = [];
var AngularDimArray = [];
var undolinearDimArray = [];
var relAngleArray = [];

var geoArray = [];

var labelArray = [];

var loadArray = [];

var SRPArray = [];

var previewStartx = 0;
var previewStarty = 0;

var Scale = 0;
var firstAcceptedValue = true;

var ElementID = 0;

var rasterArray = [];
var checkPixelsArray = [];

var AuxArray = [];

var dimToMove = [];
var labelToMove = 999;
var xRelative = 0;
var yRelative = 0;

var LastSelectedDimID = 999;
var LastSelectedDimType = "linear";

var showDims = true;
var rectDetectDone = false;

var dispCx = 0;
var dispCy = 0;

var zeroX = 0;
var zeroY = 0;

var CxToReport = 0;
var CyToReport = 0;

var actualCx = 0;
var actualCy = 0;
var MasterIxx = 0;
var MasterIyy = 0;
var MasterArea = 0;

var MasterCx = 0;
var MasterCy = 0;

var MasterAlpha = 0;
var	MasterIxp = 0;
var MasterIyp = 0;
var	MasterIxy = 0;

var MasterLoadPosX = 0;
var MasterLoadPosY= 0;

var MasterQ = 0;
var Mastert = 0;

var Masterq = 0;
var MaxShearStress = 0;

var Stability = 'stabilized';

var OutputStrings = ' ';

var ShowMax = true;

var SRPidtoDrag = 999;
var HandleToDrag = 999;

var CurrentGroupID = 0;

var TempDispPointX = 0;
var TempDispPointY = 0;

var TempDispPointX2 = 0;
var TempDispPointY2 = 0;

var RectGroupArray = [];

var FilletCutoutList = [];

var ShowGroups = true;

var HVSnap = false;

var TopTextX = 5;
var TopTextY = 15;

var FillColor = 'inside1';

var CurrentFileName = 'New Cross Section';
var CurrentMode = 'Lines';

var doNotFindArea = false;

var InFlagArea = false;

var analysisID = 0;

//Setup canvas object and properties.
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var imgcanvas = document.querySelector('imagecanvas');
var ci = canvas.getContext('2d');

var imageObj = new Image();

var	imgXloc = 40
var	imgYloc = 90
var	imgWidth = 50;
var	imgHeight = 50;
var	imgAR = imgWidth / imgHeight;

imageObj.onload = function() {
    ci.drawImage(imageObj, 40, 90);

    if(whiteBackground == true){
        imgHeight = c.canvas.height;
        imgWidth = c.canvas.width;
    }

    else{
    	imgWidth = imageObj.width;
    	imgHeight = imageObj.height;
    	imgAR = imgWidth / imgHeight;

    	imgWidth = c.canvas.width - 50;
    	imgHeight = imgWidth / imgAR;

    	if(imgHeight > c.canvas.height - 50){
    	    imgHeight = c.canvas.height - 50;
    	    imgWidth = imgHeight * imgAR;
    	}
    }

	Redraw();
};

imageObj.src = 'whitepix.PNG';

var whiteBackground = true;

//Need to empty the value in the (hidden) load field so that changes are detected when re-loading the previously loaded file.
document.getElementById('imgupload').onclick = function () {
    //console.log('show no load div');
    this.value = null;
};

var mouse = {
	x: undefined,
	y: undefined
}

var colorIndex = 0;
var colorArray = ['#99B898', '#FECEA8', '#FF847C', '#E84A5F', '#2A363B'];


c.canvas.width  = window.innerWidth;
c.canvas.height = window.innerHeight;

var imageData = c.getImageData(0, 0, 100, 100);
var data = imageData.data;

var StressGradientShown = false;

n=0;

var CsysX = 100;
var CsysY = 100;

var MouseInKeepOut = false;

var mouseInResultsGrab = false;

var mouseInFilletsInput = false;

var showZeroZero = false;

var InputFreze = false;

var ChangePreviewValue = null;

var draggedDimension = false;

var CancelledRequest = false;
var ListenForResize = false;
var disconnectCancelledRequest = false;

var drawingHV = false;

var ControlDown = false;

var connectedPointsArray = [];

var StartTextOff = false;

var dragLinesArray = [];

var InToolsMenu = false;

var firstAfterLoad = false;

var dragBoxStartX = 0;
var dragBoxStartY = 0;

var userMoves = [];
var redoMove = [];

var InitialDimX = 0;
var InitialDimY = 0;

var InitialHandleDimX = 0;
var InitialHandleDimY = 0;

var MovedDim = 0;

var zindex = 0;
var RedoMoves = [];

var AngleSelectedLine1 = 999;
var FirstClickAngle = 999;
var FirstDragAngle = 999;
var AngleArcDirection = 'null'

var unConnectedLinesArray = [];

var undoFilletArray = [];

var welcomeDisplayed = true;

var TouchMode = false;

var ActiveError = null;

var Units = "ft"

var LineColor = 'black';
var LineThickness=2.5
var intersectColor = 'blue'
var ImageShown = false;
var DimColor = 'white'

var logQ = [];

var remainingCredits = 20;

highlightButtonImg('linesb');

InputFreze = true

var downhappened = false;
var dragginghappened = false;
var lastMouseInOrOut = false;

const compareNumbers = (a, b) => a - b;

unloadScrollBars();

const snipcursor = document.querySelector(".snipcursor");
const erasecursor = document.querySelector(".erasecursor");

init();

PrintToLog('----------------Area Calculator Session----------------');

whatbrowser()


if (navigator.userAgent.match(/Android/i)){
    PrintToLog('User Agent: Android Mobile');
}
if (navigator.userAgent.match(/iPhone/i)){
    PrintToLog('User Agent: Iphone');
}
if (navigator.userAgent.match(/iPad/i)){
    PrintToLog('User Agent: Ipad');
}
if (navigator.userAgent.match(/iPod/i)){
    PrintToLog('User Agent: Ipod');
}
if (navigator.userAgent.match(/BlackBerry/i)){
    PrintToLog('User Agent: Blackberry');
}
if (navigator.userAgent.match(/Windows Phone/i)){
    PrintToLog('User Agent: Windows Phone');
}

// Next, if it is running on a widnows laptop or desktop, adjust css accordingly.
if (navigator.appVersion.indexOf("Win")!=-1){
    PrintToLog('App Version: Windows');
}

// Last, if it is running on a mac laptop or desktop, adjust css accordingly.
if(navigator.appVersion.indexOf("Mac") != -1){
    PrintToLog('App Version: Mac');
}

function whatbrowser(){

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if(isFirefox == true){
        PrintToLog('Broswer: Firefox');
    }
    if(isChrome == true){
        PrintToLog('Broswer: Chrome');
    }
    if(isSafari == true){
        PrintToLog('Broswer: Safari');
    }
    if(isOpera == true){
        PrintToLog('Broswer: Opera');
    }
    if(isIE == true){
        PrintToLog('Broswer: IE');
    }
    if(isEdge == true){
        PrintToLog('Broswer: Edge');
    }
    if(isEdgeChromium == true){
        PrintToLog('Broswer: Chromium');
    }
    if(isBlink == true){
        //PrintToLog('Blink Engine');
    }
}


drawingMode = 'lines';

function mainLoop(){

    if(closeOrOpenSection() == true && StressGradientShown == false && doNotFindArea == false){
        SendShape()
        document.getElementById("loader").style.visibility = "visible";
        bottomLeftPoint();
	    UtilityPointDraw(displayProperties);
	    StressGradientShown = true;
    }

    switchToPointer();

	if(lineArray.length > 1 && Scale == 0){
		displayError('noscale','Dimension first line before drawing next line. \n\nFor help, press ? button.');
		l = lineArray[lineArray.length - 1];
		deleteline(l.lineID);
	}

	Redraw();

    if (mouseInDrawingArea() == true) {
	    lastMouseInOrOut = true;
		switch(drawingMode){
			case 'lines':
			LastDrawingMode = 'lines';
			AllowDeleteLines = true;
				switch(mouseState){
					case 'moving':
					    isonendpoint();
						isonline(mouse.x, mouse.y, 'UI');
						dragginghappened = false;
						if(ControlDown == false){
						    isonendpoint();
						    isoncentroid();
						    isonzerozero();
						}
						isonfillet(mouse.x,mouse.y);
                        isonHandle(mouse.x, mouse.y);

						if(drawingHV == true && ControlDown == false){
						    suggestHVSnap();
						}
						//isonLoadPoint(mouse.x, mouse.y);
						isonlabel(mouse.x,mouse.y,10,35);
						break;
					case 'down':
                        eptomove = isonendpoint();
                        //Get lines and start/end data to pass into move function.
                        endpointsToMove = getEPs(eptomove);

                            if(endpointsToMove != 0){
                                dragepundoLines = [];
                                for(var i = 0; i < endpointsToMove.length; i++){
                                        var undoLineJSON = JSON.parse(JSON.stringify(endpointsToMove[i][1]));
                                        dragepundoLines.push(undoLineJSON);
                                }
                            //Only update User Moves if at mouseup, a drag has happened.
                        	//updateUserMoves(['moveep', undoLines]);
                            }

                        linetomove = isonline(mouse.x, mouse.y, 'UI');
                        endpointoffsets = offsetsFromEndpoints(linetomove);

                        //console.log('Line To Move: ', linetomove)

                            if(linetomove != 999){
                                //Need to get line IDs of everything that gets altered.
                                draglineundoLines = [];
                                for(var i = 0; i < endpointoffsets[4].length; i++){
                                        var undoLineJSON = JSON.parse(JSON.stringify(endpointoffsets[4][i][2]));
                                        draglineundoLines.push(undoLineJSON);
                                }

                                //Also, need to throw the actual line that was moved in there:
                                for(var i = 0; i < lineArray.length; i++){
                                    if(linetomove == lineArray[i].lineID){
                                        undoLineJSON = JSON.parse(JSON.stringify(lineArray[i]));
                                        draglineundoLines.push(undoLineJSON);
                                    }
                                }
                            //Only update User Moves if at mouseup, a drag has happened.
                        	//updateUserMoves(['moveline', draglineundoLines]);
                            }

                        //writedebugToOutputbox('downpressed')
                        //writedebugToOutputbox(mouseInResultsGrab)
						if(mouseInResultsGrab == true){
							setRelatives(mouse.x, mouse.y, 0, 'resultsbox', 0, 0);
							drawingMode = 'dragresultsbox';
						}

					    //clear circles around unconnected endpoints:
					    unConnectedLinesArray = [];
					    downhappened = true;



						//If the user has clicked on a highlighted dimension:
						dimToMove = isondim(mouse.x,mouse.y,10,27);

						//console.log('Dim To Move: ', dimToMove)
						if(dimToMove[0] != 999){
						    //Save the starting location for the moved dimension for undo:
						    //Go through the dim arrays and find the initial x and y location:
						    if(dimToMove[1] == 'linear' || dimToMove[1] == 'fillet'){
    						    for(var k = 0; k < linearDimArray.length; k++){
    						        if(linearDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = linearDimArray[k].x;
    						            InitialDimY = linearDimArray[k].y;
    						        }
    						    }
						    }
						    else if(dimToMove[1] == 'angular'){
    						    for(var k = 0; k < AngularDimArray.length; k++){
    						        if(AngularDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = AngularDimArray[k].x;
    						            InitialDimY = AngularDimArray[k].y;
    						        }
    						    }
						    }
						    //d...
						    else if(dimToMove[1] == 'relangular'){
    						    for(var k = 0; k < relAngleArray.length; k++){
    						        if(relAngleArray[k].elementID == dimToMove[0]){
    						            InitialDimX = relAngleArray[k].x;
    						            InitialDimY = relAngleArray[k].y;
    						        }
    						    }
						    }
							setRelatives(mouse.x, mouse.y, dimToMove[0], 'dim', 0, dimToMove[1]);
							//console.log('Setting drawingMode to dragdimension.')
							    drawingMode = 'dragdimension';
						}
						if(isonLoadPoint(mouse.x,mouse.y) != 999){
							setRelatives(mouse.x, mouse.y, 'null', 'loadpoint');
							drawingMode = 'dragloadpoint';
						}

						//If the user has clicked on a highlighted label:
						if(isonlabel(mouse.x,mouse.y,10,27) != 999){
							labelToMove = isonlabel(mouse.x,mouse.y,10,35);
							setRelatives(mouse.x, mouse.y, labelToMove, 'label');
							drawingMode = 'draglabel';
						}


						else if(isonSRP(mouse.x,mouse.y) != 999){
							SRPidtoDrag = isonSRP(mouse.x,mouse.y);
							setRelatives(mouse.x, mouse.y, 'null', 'SRP', SRPidtoDrag);
							drawingMode = 'dragSRP';
						}
						//w...
						else if(isonHandle(mouse.x,mouse.y) != 999){
							HandleToDrag = isonHandle(mouse.x, mouse.y);
    						    for(var k = 0; k < relAngleArray.length; k++){
    						        if(relAngleArray[k].elementID == HandleToDrag){
    						            InitialHandleDimX = relAngleArray[k].handlex;
    						            InitialHandleDimY = relAngleArray[k].handley;
    						        }
    						    }
							setRelatives(mouse.x, mouse.y, 'null', 'SRP', HandleToDrag);
							drawingMode = 'draghandle';
						}
						else{
						//start a line preview - don't instantiate a new line, but save start point in case the line is kept.
						linePreviewStart();
						}
						break;
					case 'dragging':
					    dragginghappened = true;
					    if(downhappened == false){
					        break;
					    }
                        //change the endpoints found above to the location of the mouse while dragging.
                        draggedendpoints = moveEPs(endpointsToMove);
                        //Move the line that is selected above.
                        draggedlines = moveLine(linetomove, endpointoffsets);
						//draw moving preview of the line
						if(draggedendpoints == 0 && draggedlines == 0){
						    linePreviewDrag();
						//determine the line of origin (if there is one) for the dragging line:
						//highlight endpoints
						if(ControlDown == false){
    					    isoncentroid();
    						isonzerozero();
    						isonendpoint('draggingMode',dragFromLineID);
    						if(drawingHV == true){
    						    suggestHVSnap();
    						}
						  }
						}

						else{
						    doNotFindArea = true;
	                        StressGradientShown = false;
						}
						break;
					case 'up':
                        if(dragginghappened == false){
                            break;
                        }
					    downhappened = false;

						doNotFindArea = false;

                        if(draggedendpoints != 0){
                            updateUserMoves(['moveep', dragepundoLines]);
                            PrintToLog('Dragged an Endpoint')
                        }
                        else if(draggedlines != 0){
                        	updateUserMoves(['moveline', draglineundoLines]);
                            PrintToLog('Dragged a Line.')
                        }
                        else{
    					    //New line will be created - increment the ElementID.
    					    ElementID += 1;
    						//create a new line.
    						createNewLine();
    						updateUserMoves(['newline',ElementID]);
    					    GenerateInverse();
    						//filter for zero length lines.
    						removeZeroLengthLines();
                        }
						//After a new line has been made, check to see if the section is open or closed:
                        closeOrOpenSection();
						break;
				}
				break;
			case 'dragdimension':
				switch(mouseState){
					case 'moving':

						break;
					case 'dragging':
						if(dimToMove[1] != 'linear'){
							moveDim(mouse.x,mouse.y, dimToMove[0], dimToMove[1]);
							Redraw();
						}

                        //Move the line that is selected above.
                        //draggedlines = moveLine(linetomove, endpointoffsets);

						draggedDimension = true;

                        draggedlines = moveLine(linetomove, endpointoffsets);
                        doNotFindArea = true;
	                    StressGradientShown = false;

						break;
					case 'down':
						break;
					case 'up':
						if((draggedDimension == false) && (LastDrawingMode != 'snip') && (LastDrawingMode != 'erase')){
								changeDimension();
						}
					    else{
    					    draggedDimension = false;

    					    //If the user presses enter, the last selected dim and type will be passed into a function that changes the corresponding dimension.
							if(dimToMove[1] != 'angular'){
    						updateUserMoves(['movedim', dimToMove[0], dimToMove[1], InitialDimX, InitialDimY]);
    						GenerateInverse();
							}
					    }

                        if(draggedlines != 0){
                        	updateUserMoves(['moveline', draglineundoLines]);
                            PrintToLog('Dragged a Line.')
						    doNotFindArea = false;
                        }

						dimToMove = 999;
						drawingMode = LastDrawingMode;
						xRelative = 0;
						yRelative = 0;
						break;
				}
				break;
			case 'draglabel':
				switch(mouseState){
					case 'moving':

						break;
					case 'dragging':

						moveLabel(mouse.x,mouse.y, labelToMove);

						break;
					case 'down':
						break;
					case 'up':
						labelToMove = 1001;
						drawingMode = LastDrawingMode;
						xRelative = 0;
						yRelative = 0;
						break;
				}
				break;
			case 'dragresultsbox':
				switch(mouseState){
					case 'moving':

						break;
					case 'dragging':

						moveResultsBox(mouse.x,mouse.y);

						break;
					case 'down':
						break;
					case 'up':
						drawingMode = LastDrawingMode;
						xRelative = 0;
						yRelative = 0;
						break;
				}
				break;
			case 'dragradiusbox':
				switch(mouseState){
					case 'moving':
						moveRadiusBox(mouse.x,mouse.y);
						break;
					case 'dragging':

						moveRadiusBox(mouse.x,mouse.y);

						break;
					case 'down':
						break;
					case 'up':
						drawingMode = LastDrawingMode;
						xRelative = 0;
						yRelative = 0;
						break;
				}
				break;
			case 'dragloadpoint':
				if(MasterIxx != 0){
					clearStressCalcs();
				}
				switch(mouseState){
					case 'moving':

						break;
					case 'dragging':
						moveLoadPoint(mouse.x,mouse.y);
						isonendpoint();
						if(isoncentroid() == true){
							drawEndpoint(MasterCx / Scale, MasterCy / Scale);
						}

						break;
					case 'down':
						break;
					case 'up':
						var endpointArray = isonendpoint();
						if(endpointArray[0] == true){
							moveLoadPoint(endpointArray[1], endpointArray[2],'absolute');
							MasterLoadPosX =  endpointArray[1] * Scale - MasterCx;
							MasterLoadPosY = -(endpointArray[2] * Scale - MasterCy);
						}
						else if(isoncentroid() == true){
							moveLoadPoint(MasterCx / Scale, MasterCy / Scale, 'absolute');
							MasterLoadPosX = 0;
							MasterLoadPosY = 0;
						}
						else{
							moveLoadPoint(MasterLoadPosX/Scale + MasterCx/Scale, -MasterLoadPosY/Scale + MasterCy/Scale, 'absolute');
						}
						//Re run stress calcs fornew load point.
                        ClearStressVis('moveload');
						Button6Clicked();
						drawingMode = LastDrawingMode;
						xRelative = 0;
						yRelative = 0;
						break;
				}
				break;

				case 'dragSRP':
						if(MasterIxx != 0){
							clearStressCalcs();
						}
						switch(mouseState){
							case 'moving':

								break;
							case 'dragging':
								moveSRP(mouse.x,mouse.y,'nonabsolute',SRPidtoDrag);
								isonendpoint();
								if(isoncentroid() == true){
									drawEndpoint(MasterCx / Scale, MasterCy / Scale);
								}

								break;
							case 'down':
								break;
							case 'up':
								var endpointArray = isonendpoint();
								if(endpointArray[0] == true){
									moveSRP(endpointArray[1], endpointArray[2],'absolute',SRPidtoDrag);
									//Add calcs to output for each SRP here.
								}
								else if(isoncentroid() == true){
									moveSRP(MasterCx / Scale, MasterCy / Scale, 'absolute',SRPidtoDrag);
									//Calcs to output for that SRP here.
								}
								//For now, if the SRP isn't snapped to something, just move back to arbitrary starting location.
								else{
									moveSRP(50,50, 'absolute', SRPidtoDrag);
								}
								//Re run stress calcs fornew load point.
								Button6Clicked();
								drawingMode = 'loads';
								break;
						}
				case 'draghandle':
						switch(mouseState){
							case 'moving':
								break;
							case 'dragging':
								moveHandle(mouse.x,mouse.y,'nonabsolute',HandleToDrag);
								break;
							case 'down':
								break;
							case 'up':
    						    updateUserMoves(['movedhandle', HandleToDrag, InitialHandleDimX, InitialHandleDimY]);
    						    GenerateInverse();
							    drawingMode = LastDrawingMode;
								break;
						}
					break;

			case 'fillets':
			LastDrawingMode = 'fillets';
			AllowDeleteLines = true;
				switch(mouseState){
					case 'moving':
						//Highlight lines and dimensions. Helps with cleaning up dimensions.
						isondim(mouse.x,mouse.y,10,27);
						isonline(mouse.x, mouse.y, 'UI');
						isonfillet(mouse.x,mouse.y);
                        isonHandle(mouse.x, mouse.y);
						var endpointArray = isonendpoint('fillets');
						if(endpointArray[0] == true){
							var radius = GetRadiusInput() / Scale;
							FilletPreview(endpointArray[1], endpointArray[2], radius);
						}
						break;
					case 'dragging':

						break;
					case 'down':
                        ////console.log(mouseInRadiusBox());
						if(mouseInRadiusBox() == true){
							setRelatives(mouse.x, mouse.y, 0, 'radiusbox', 0, 0);
							drawingMode = 'dragradiusbox';
						}
						if(mouseInResultsGrab == true){
							setRelatives(mouse.x, mouse.y, 0, 'resultsbox', 0, 0);
							drawingMode = 'dragresultsbox';
						}
					    //clear circles around unconnected endpoints:
					    unConnectedLinesArray = [];
						//If the user has clicked on a highlighted dimension:
						dimToMove = isondim(mouse.x,mouse.y,10,27);
						if(dimToMove[0] != 999){
						    //Save the starting location for the moved dimension for undo:
						    //Go through the dim arrays and find the initial x and y location:
						    if(dimToMove[1] == 'linear' || dimToMove[1] == 'fillet'){
    						    for(var k = 0; k < linearDimArray.length; k++){
    						        if(linearDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = linearDimArray[k].x;
    						            InitialDimY = linearDimArray[k].y;
    						        }
    						    }
						    }
						    else if(dimToMove[1] == 'angular'){
    						    for(var k = 0; k < AngularDimArray.length; k++){
    						        if(AngularDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = AngularDimArray[k].x;
    						            InitialDimY = AngularDimArray[k].y;
    						        }
    						    }
						    }
						    else if(dimToMove[1] == 'relangular'){
    						    for(var k = 0; k < relAngleArray.length; k++){
    						        if(relAngleArray[k].elementID == dimToMove[0]){
    						            InitialDimX = relAngleArray[k].x;
    						            InitialDimY = relAngleArray[k].y;
    						        }
    						    }
						    }
							setRelatives(mouse.x, mouse.y, dimToMove[0], 'dim', 0, dimToMove[1]);
							drawingMode = 'dragdimension';
						}
						else if(isonHandle(mouse.x,mouse.y) != 999){
							HandleToDrag = isonHandle(mouse.x, mouse.y);
    						    for(var k = 0; k < relAngleArray.length; k++){
    						        if(relAngleArray[k].elementID == HandleToDrag){
    						            InitialHandleDimX = relAngleArray[k].handlex;
    						            InitialHandleDimY = relAngleArray[k].handley;
    						        }
    						    }
							setRelatives(mouse.x, mouse.y, 'null', 'SRP', HandleToDrag);
							drawingMode = 'draghandle';
						}
						//If the user has clicked on a highlighted label:
						if(isonlabel(mouse.x,mouse.y,10,27) != 999){
							labelToMove = isonlabel(mouse.x,mouse.y,10,35);
							setRelatives(mouse.x, mouse.y, labelToMove, 'label');
							drawingMode = 'draglabel';
						}
						else if(isonLoadPoint(mouse.x,mouse.y) != 999){
								setRelatives(mouse.x, mouse.y, 'null', 'loadpoint');
								drawingMode = 'dragloadpoint';
						}
						else{
						    var endpointArray = isonendpoint('fillets');
							if(endpointArray[0] == true){
								var filletx = endpointArray[1];
								var fillety = endpointArray[2];
								var radius = GetRadiusInput() / Scale;

								var Filletprops = FilletPreview(filletx, fillety, radius);
								//If the dimension doesn't work for the fillet radius, the fourth member of fillet props will be 999.
								if(Filletprops[3] != 999){
									if(isNaN(radius) == false){
										ElementID += 1;
										arcArray.push(new Arc(Filletprops[0],Filletprops[1],Filletprops[2],Filletprops[3],Filletprops[4],ElementID,0,0,0,0,"black",Filletprops[11], Filletprops[12],Filletprops[15], Filletprops[16],Filletprops[5],Filletprops[7]));
										////console.log(Filletprops[9], Filletprops[10], Filletprops[11], Filletprops[12], Filletprops[13], Filletprops[14], Filletprops[15], Filletprops[16]);
                                        var undoLine1ID = Filletprops[5];
                                        var undoLine2ID = Filletprops[7];
                                        for(var k = 0; k < lineArray.length; k++){
                                            if(lineArray[k].lineID == undoLine1ID){
                                                var undoLine1 = JSON.parse(JSON.stringify(lineArray[k]));
                                            }
                                            else if(lineArray[k].lineID == undoLine2ID){
                                                var undoLine2 = JSON.parse(JSON.stringify(lineArray[k]));
                                            }
                                        }

                                        createFilletDim(ElementID);
										//Before the lines are shortened, save their object forms in undo array so they can be recalled if need be.
										updateUserMoves(['newfillet', ElementID, undoLine1, undoLine2]);
										//dd...
                                        updateUndoFilletArray(['newfillet', ElementID, undoLine1, undoLine2]);
										shortenLinesforFillet(Filletprops[9], Filletprops[10], Filletprops[11], Filletprops[12], Filletprops[13], Filletprops[14], Filletprops[15], Filletprops[16]);
                                        //Also, append the undo filletarray entry with the line data after the lines are shortened. This includes ghost points.
                                        //If you just do that for this line, then all subsequent changes are lost. Do it for every line in the appendUndoFilletsArray after every edit.



                                        // ONLY UPDATE THIS IF A LINE IS FOUND!

                                        for(var l = 0; l < undoFilletArray.length; l++){

                                            var line1found = false;
                                            var line2found = false;

                                            var ul1 = undoFilletArray[l][2].lineID;
                                            var ul2 = undoFilletArray[l][3].lineID;
                                            var thiselementID = undoFilletArray[l][1];

                                            for(var k = 0; k < lineArray.length; k++){
                                                if(lineArray[k].lineID == ul1){
                                                    var undoLine1 = JSON.parse(JSON.stringify(lineArray[k]));
                                                    var line1found = true;
                                                }
                                                else if(lineArray[k].lineID == ul2){
                                                    var undoLine2 = JSON.parse(JSON.stringify(lineArray[k]));
                                                    var line2found = true;
                                                }
                                            }

                                           for(var k = 0; k < linearDimArray.length; k++){
                                                if(linearDimArray[k].elementID == ul1){
                                                    var undolineardim1 = JSON.parse(JSON.stringify(linearDimArray[k]));
                                                }
                                                else if(linearDimArray[k].elementID == ul2){
                                                    var undolineardim2 = JSON.parse(JSON.stringify(linearDimArray[k]));
                                                }
                                            }

                                           for(var k = 0; k < AngularDimArray.length; k++){
                                                if(AngularDimArray[k].elementID == ul1){
                                                    var undoangulardim1 = JSON.parse(JSON.stringify(AngularDimArray[k]));
                                                }
                                                else if(AngularDimArray[k].elementID == ul2){
                                                    var undoangulardim2 = JSON.parse(JSON.stringify(AngularDimArray[k]));
                                                }
                                            }


                                            if(line1found == true && line2found == true){
                                                appendUndoFilletArray(['newfillet', thiselementID, undoLine1, undoLine2, undolineardim1, undoangulardim1, undolineardim2, undoangulardim2]);
                                            }

                                            //ALSO ADD MOVES FOR WHEN ONLY ONE OF THE LINES IS FOUND?

                                        }

										ClearStressVis();

										//Call this function after shortenlines so that the shortened lines
										//can be used.
										GenerateInverse();
                                        updateHandles();
    									closeOrOpenSection();
									}
								}
								else{
								    if(isNaN(radius) == true){
									    displayError('emptyradius',"It looks like you haven't entered a value in the radius box!");
								    }
								    else{
									    displayError('badradius',"Radius too large or invalid endpoint selection!");
								    }

								}
							}
						}
						break;
					case 'up':
						break;
				}
				break;

			case 'snip':
			LastDrawingMode = 'snip';

			AllowDeleteLines = true;
				switch(mouseState){
					case 'moving':
						//Highlight lines and dimensions. Helps with cleaning up dimensions.
						isondim(mouse.x,mouse.y,10,27);
				        isonHandle(mouse.x, mouse.y);
                        var selectedLine = isonline(mouse.x, mouse.y, 'SNIP');
						if(selectedLine != 999){
						    Snip(selectedLine,true);
						}
                        var selectedFillet = isonfillet(mouse.x, mouse.y, 'SNIP');
                        if(selectedFillet != 999){
                            SnipFillet(selectedFillet,true);
                        }
						break;
					case 'dragging':
            			if(TouchMode == true){
            			    //mouse.x = mouse.x - 35;
            			    //mouse.y = mouse.y - 35;
                            //document.getElementById('snipcursor').style['top'] =  '-21px';
                            //document.getElementById('snipcursor').style['left'] =  '-36px';
            			}
					   var dragLinesOutArray = drawDragLines(mouse.x, mouse.y);
					   var selectedLine1 = dragLinesOutArray[0];
					   var selectedLine2 = isonline(mouse.x, mouse.y, 'SNIP');
    						if((selectedLine1 != 999) || (selectedLine2 != 999)){
    						    if(selectedLine1 != 999){
    						        Snip(selectedLine1,false);
    						    }
    						    else{
     						        Snip(selectedLine2,false);
    						    }
    						}
					    var selectedFillet1 = dragLinesOutArray[1];
                        var selectedFillet2 = isonfillet(mouse.x, mouse.y, 'SNIP');
						if((selectedFillet1 != 999) || (selectedFillet2 != 999)){
						    if(selectedFillet1 != 999){
						        SnipFillet(selectedFillet1,false);
						    }
						    else{
 						        SnipFillet(selectedFillet2,false);
						    }
						}
						break;
					case 'down':
            			if(TouchMode == true){
            			    //mouse.x = mouse.x - 35;
            			    //mouse.y = mouse.y - 35;
                            //document.getElementById('snipcursor').style['top'] =  '-21px';
                            //document.getElementById('snipcursor').style['left'] =  '-36px';
            			}
						if(mouseInResultsGrab == true){
							setRelatives(mouse.x, mouse.y, 0, 'resultsbox', 0, 0);
							drawingMode = 'dragresultsbox';
						}
					    //clear circles around unconnected endpoints:
					    unConnectedLinesArray = [];
						//If the user has clicked on a highlighted dimension:
						dimToMove = isondim(mouse.x,mouse.y,10,27);
						if(dimToMove[0] != 999){
						    //Save the starting location for the moved dimension for undo:
						    //Go through the dim arrays and find the initial x and y location:
						    if(dimToMove[1] == 'linear' || dimToMove[1] == 'fillet'){
    						    for(var k = 0; k < linearDimArray.length; k++){
    						        if(linearDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = linearDimArray[k].x;
    						            InitialDimY = linearDimArray[k].y;
    						        }
    						    }
						    }
						    else if(dimToMove[1] == 'angular'){
    						    for(var k = 0; k < AngularDimArray.length; k++){
    						        if(AngularDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = AngularDimArray[k].x;
    						            InitialDimY = AngularDimArray[k].y;
    						        }
    						    }
						    }
						    else if(dimToMove[1] == 'relangular'){
    						    for(var k = 0; k < relAngleArray.length; k++){
    						        if(relAngleArray[k].elementID == dimToMove[0]){
                                			relAngleArray.splice(k,1);
                                		}
                                	}

						    }
							setRelatives(mouse.x, mouse.y, dimToMove[0], 'dim', 0, dimToMove[1]);
							drawingMode = 'dragdimension';
						}
						else if(isonHandle(mouse.x,mouse.y) != 999){
							HandleToDrag = isonHandle(mouse.x, mouse.y);
    						    for(var k = 0; k < relAngleArray.length; k++){
    						        if(relAngleArray[k].elementID == HandleToDrag){
    						            InitialHandleDimX = relAngleArray[k].handlex;
    						            InitialHandleDimY = relAngleArray[k].handley;
    						        }
    						    }
							setRelatives(mouse.x, mouse.y, 'null', 'SRP', HandleToDrag);
							drawingMode = 'draghandle';
						}
						else{
    						isondim(mouse.x,mouse.y,10,27);
                            var selectedLine = isonline(mouse.x, mouse.y, 'SNIP');
    						if(selectedLine != 999){
    						    Snip(selectedLine,false);
    						}
                            var selectedFillet = isonfillet(mouse.x, mouse.y, 'SNIP');
                            if(selectedFillet != 999){
                                SnipFillet(selectedFillet,false);
                            }
						}
						//filter for zero length lines.
						removeZeroLengthLines();
						//See if the section is open or closed after the modification.
						closeOrOpenSection();
						break;
					case 'up':
					    dragLinesArray = [];
						break;
				}
				break;

			case 'erase':
			LastDrawingMode = 'erase';
			AllowDeleteLines = true;
				switch(mouseState){
					case 'moving':
						//Highlight lines and dimensions. Helps with cleaning up dimensions.
						//isondim(mouse.x,mouse.y,10,27);
                        isonline(mouse.x, mouse.y, 'UI');
                        isonfillet(mouse.x,mouse.y);
						break;
					case 'dragging':
					    //isondim(mouse.x,mouse.y,10,27);
                        selectDragBox(mouse.x,mouse.y);
					    /*
					    var selectedLine1 = drawDragLines(mouse.x, mouse.y);
					    var selectedLine2 = isonline(mouse.x, mouse.y, 'SNIP');
    						if((selectedLine1 != 999) || (selectedLine2 != 999)){
    						    if(selectedLine1 != 999){
    						        deleteline(selectedLine1);
    						        deletedim(selectedLine1);
    						    }
    						    else{
    						        deleteline(selectedLine2);
    						        deletedim(selectedLine2);
    						    }
    						}
                        var selectedFillet = isonfillet(mouse.x, mouse.y);
						if(selectedFillet != 999){
						    deletefillet(selectedFillet);
	                        deletedim(selectedFillet);
						}
						*/
						break;
					case 'down':
						if(mouseInResultsGrab == true){
							setRelatives(mouse.x, mouse.y, 0, 'resultsbox', 0, 0);
							drawingMode = 'dragresultsbox';
						}
					    //clear circles around unconnected endpoints:
					    unConnectedLinesArray = [];
						//If the user has clicked on a highlighted dimension:
						dimToMove = isondim(mouse.x,mouse.y,10,27);
						if(dimToMove[0] != 999){
						    for(var k = 0; k < linearDimArray.length; k++){
						        if(linearDimArray[k].elementID == dimToMove[0]){
						            var hideshowline = dimToMove[0];
						            var hideshowstate = linearDimArray[k].showDim;
									updateUserMoves(['hsdim', hideshowline, 'linear', hideshowstate]);
						            GenerateInverse();
						        }
						    }
                        displayDimension();
						}
						else{
    						isondim(mouse.x,mouse.y,10,27);
                            var selectedLine = isonline(mouse.x, mouse.y, 'UI');
    						if(selectedLine != 999){
    						    deleteline(selectedLine);
		                        deletedim(selectedLine);
    						}
                            var selectedFillet = isonfillet(mouse.x, mouse.y);
    						if(selectedFillet != 999){
    						    deletefillet(selectedFillet);
		                        deletedim(selectedFillet);
    						}
						}
						dragBoxStartX = mouse.x;
						dragBoxStartY = mouse.y;
						//filter for zero length lines.
						removeZeroLengthLines();
						//See if the section is open or closed fter the modification.
						closeOrOpenSection();
						break;
					case 'up':
					    dragLinesArray = [];
					    deleteDragBoxContents(mouse.x, mouse.y);
						break;
				}
				break;

			case 'linearDim':
			LastDrawingMode = 'linearDim';
			AllowDeleteLines = true;
				switch(mouseState){
					case 'moving':
						//Highlight lines and dimensions. Helps with cleaning up dimensions.
						isondim(mouse.x,mouse.y,10,27);
                        isonline(mouse.x, mouse.y, 'UI');
                        isonfillet(mouse.x,mouse.y);
                        isonHandle(mouse.x, mouse.y);
						break;
					case 'dragging':

						break;
					case 'down':
						if(mouseInResultsGrab == true){
							setRelatives(mouse.x, mouse.y, 0, 'resultsbox', 0, 0);
							drawingMode = 'dragresultsbox';
						}
					    //clear circles around unconnected endpoints:
					    unConnectedLinesArray = [];
						//If the user has clicked on a highlighted dimension:
						dimToMove = isondim(mouse.x,mouse.y,10,27);
						if(dimToMove[0] != 999){
						    //Save the starting location for the moved dimension for undo:
						    //Go through the dim arrays and find the initial x and y location:
						    if(dimToMove[1] == 'linear' || dimToMove[1] == 'fillet'){
    						    for(var k = 0; k < linearDimArray.length; k++){
    						        if(linearDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = linearDimArray[k].x;
    						            InitialDimY = linearDimArray[k].y;
    						        }
    						    }
						    }
						    else if(dimToMove[1] == 'angular'){
    						    for(var k = 0; k < AngularDimArray.length; k++){
    						        if(AngularDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = AngularDimArray[k].x;
    						            InitialDimY = AngularDimArray[k].y;
    						        }
    						    }
						    }
						    else if(dimToMove[1] == 'relangular'){
    						    for(var k = 0; k < relAngleArray.length; k++){
    						        if(relAngleArray[k].elementID == dimToMove[0]){
    						            InitialDimX = relAngleArray[k].x;
    						            InitialDimY = relAngleArray[k].y;
    						        }
    						    }
						    }
							setRelatives(mouse.x, mouse.y, dimToMove[0], 'dim', 0, dimToMove[1]);
							drawingMode = 'dragdimension';
						}
						else if(isonHandle(mouse.x,mouse.y) != 999){
							HandleToDrag = isonHandle(mouse.x, mouse.y);
    						    for(var k = 0; k < relAngleArray.length; k++){
    						        if(relAngleArray[k].elementID == HandleToDrag){
    						            InitialHandleDimX = relAngleArray[k].handlex;
    						            InitialHandleDimY = relAngleArray[k].handley;
    						        }
    						    }
							setRelatives(mouse.x, mouse.y, 'null', 'SRP', HandleToDrag);
							drawingMode = 'draghandle';
						}

						else{
    						isondim(mouse.x,mouse.y,10,27);
                            var selectedLine = isonline(mouse.x, mouse.y, 'UI');
    						if(selectedLine != 999){
    						    //get selectedline object, and save the show/hide state as well as the
    						    //id so it can be undone.
    						    for(var k = 0; k < linearDimArray.length; k++){
    						        if(linearDimArray[k].elementID == selectedLine){
    						            var hideshowline = selectedLine;
    						            var hideshowstate = linearDimArray[k].showDim;
										updateUserMoves(['hsdim', hideshowline, 'linear', hideshowstate]);
    						            GenerateInverse();
    						        }
    						    }
    						//Then change the display state.
    						displayDimension('line');
    						}
                            var selectedFillet = isonfillet(mouse.x, mouse.y);
    						if(selectedFillet != 999){
    						    for(var k = 0; k < linearDimArray.length; k++){
    						        if(linearDimArray[k].elementID == selectedFillet){
    						            var hideshowline = selectedFillet;
    						            var hideshowstate = linearDimArray[k].showDim;
										updateUserMoves(['hsdim', selectedFillet, 'linear', hideshowstate]);
    						            GenerateInverse();
    						        }
    						    }
                            displayDimension('line');
    						}
						}
						//filter for zero length lines.
						removeZeroLengthLines();
						//See if the section is open or closed after the modification.
						closeOrOpenSection();
						break;
					case 'up':
						break;
				}
				break;

			case 'angularDim':
			LastDrawingMode = 'angularDim';
			AllowDeleteLines = true;
				switch(mouseState){
					case 'moving':
						//Highlight lines and dimensions. Helps with cleaning up dimensions.
						isondim(mouse.x,mouse.y,10,27);
                        isonline(mouse.x, mouse.y, 'UI');
                        deselectFillets();
						break;
					case 'dragging':

						break;
					case 'down':
						if(mouseInResultsGrab == true){
							setRelatives(mouse.x, mouse.y, 0, 'resultsbox', 0, 0);
							drawingMode = 'dragresultsbox';
						}
					    //clear circles around unconnected endpoints:
					    unConnectedLinesArray = [];
						//If the user has clicked on a highlighted dimension:
						dimToMove = isondim(mouse.x,mouse.y,10,27);
						if(dimToMove[0] != 999){
						    //Save the starting location for the moved dimension for undo:
						    //Go through the dim arrays and find the initial x and y location:
						    if(dimToMove[1] == 'linear' || dimToMove[1] == 'fillet'){
    						    for(var k = 0; k < linearDimArray.length; k++){
    						        if(linearDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = linearDimArray[k].x;
    						            InitialDimY = linearDimArray[k].y;
    						        }
    						    }
						    }
						    else if(dimToMove[1] == 'angular'){
    						    for(var k = 0; k < AngularDimArray.length; k++){
    						        if(AngularDimArray[k].elementID == dimToMove[0]){
    						            InitialDimX = AngularDimArray[k].x;
    						            InitialDimY = AngularDimArray[k].y;
    						        }
    						    }
						    }
							setRelatives(mouse.x, mouse.y, dimToMove[0], 'dim', 0, dimToMove[1]);
							drawingMode = 'dragdimension';
						}

						else{
    						isondim(mouse.x,mouse.y,10,27);
                            var selectedLine = isonline(mouse.x, mouse.y, 'UI');
    						if(selectedLine != 999){
    						    for(var k = 0; k < AngularDimArray.length; k++){
    						        if(AngularDimArray[k].elementID == selectedLine){
    						            var hideshowline = selectedLine;
    						            var hideshowstate = AngularDimArray[k].showDim;
										updateUserMoves(['hsdim', hideshowline, 'angular', hideshowstate]);
    						            GenerateInverse();
    						        }
    						    }
    						    displayDimension('angle');
    						}
						}
						//filter for zero length lines.
						removeZeroLengthLines();
						//See if the section is open or closed after the modification.
						closeOrOpenSection();
						break;
					case 'up':
						break;
				}
				break;
			//Using chamfer button as a stand in for snipping tool button. No longer using it to draw chamfers.
			case 'chamfers':
			LastDrawingMode = 'chamfers';
			AllowDeleteLines = true;
				switch(mouseState){
					case 'moving':
						//Highlight lines and dimensions. Helps with cleaning up dimensions.
						isondim(mouse.x,mouse.y,10,27);
						isonfillet(mouse.x, mouse.y);
						//var endpointArray = isonendpoint('fillets');
	                    var selectedLine = isonline(mouse.x, mouse.y, 'UI');
						if(selectedLine != 999){
							//var chamferDim = GetInput() / Scale;
							//ChamferPreview(endpointArray[1], endpointArray[2], chamferDim);
							SnipPreview(selectedLine);
						}
						break;
					case 'dragging':

						break;
					case 'down':
						//If the user has clicked on a highlighted dimension:
						if(isondim(mouse.x,mouse.y,10,27) != 999){
							dimToMove = isondim(mouse.x,mouse.y,10,27);
							setRelatives(mouse.x, mouse.y, dimToMove[0],'dim', 0,dimToMove[1]);
							drawingMode = 'dragdimension';
						}
						else{
							var endpointArray = isonendpoint('fillets');
							if(endpointArray[0] == true){
								var chamferx = endpointArray[1];
								var chamfery = endpointArray[2];
								var chamferDim = GetInput() / Scale;
								var Chamferprops = ChamferPreview(chamferx, chamfery, chamferDim);
								if(isNaN(chamferDim) == false){
									ElementID += 1;
									chamferArray.push(new Chamfer(Chamferprops[0],Chamferprops[1],Chamferprops[2],Chamferprops[3],ElementID, Chamferprops[12], Chamferprops[13], Chamferprops[14], Chamferprops[15], Chamferprops[16], chamferx, chamfery, Chamferprops[17]));
									shortenLinesforFillet(Chamferprops[5], Chamferprops[6], Chamferprops[7], Chamferprops[8], Chamferprops[9], Chamferprops[10], Chamferprops[11]);
									fillChamfer(ElementID);
									createChamferDim(ElementID);
								}
							}
						}
						break;
					case 'up':

						break;
				}
				break;
			case 'angledimbetweenlines':
			LastDrawingMode = 'angledimbetweenlines';
					AllowDeleteLines = true;
						switch(mouseState){
							case 'moving':
					            isonendpoint();
                                isonline(mouse.x, mouse.y, 'Rel');
	                            isondim(mouse.x,mouse.y,10,27);
	                            isonHandle(mouse.x, mouse.y);
                                deselectFillets();
								break;
							case 'down':
        						if(mouseInResultsGrab == true){
        							setRelatives(mouse.x, mouse.y, 0, 'resultsbox', 0, 0);
        							drawingMode = 'dragresultsbox';
        						}
        					    //clear circles around unconnected endpoints:
        					    unConnectedLinesArray = [];
							    //Sets a global variable to the first selected lineID. This is global to avoid resetting
							    //when break is performed.
                                AngleSelectedLine1 = isonline(mouse.x, mouse.y, 'Rel');
                                //A global variable to grab the angle of mouse relative to
                                //the relevant endpoint at the first click.
                                FirstClickAngle = calcClickAngle(mouse.x, mouse.y, AngleSelectedLine1);
                                dimToMove = isondim(mouse.x,mouse.y,10,27);
                                if(dimToMove[0] != 999){
                                	//Save the starting location for the moved dimension for undo:
                                	//Go through the dim arrays and find the initial x and y location:
                                	if(dimToMove[1] == 'linear' || dimToMove[1] == 'fillet'){
                                		for(var k = 0; k < linearDimArray.length; k++){
                                			if(linearDimArray[k].elementID == dimToMove[0]){
                                				InitialDimX = linearDimArray[k].x;
                                				InitialDimY = linearDimArray[k].y;
                                			}
                                		}
                                	}
                                	else if(dimToMove[1] == 'angular'){
                                		for(var k = 0; k < AngularDimArray.length; k++){
                                			if(AngularDimArray[k].elementID == dimToMove[0]){
                                				InitialDimX = AngularDimArray[k].x;
                                				InitialDimY = AngularDimArray[k].y;
                                			}
                                		}
                                	}
                                	else if(dimToMove[1] == 'relangular'){
                                		for(var k = 0; k < relAngleArray.length; k++){
                                			if(relAngleArray[k].elementID == dimToMove[0]){
                                				InitialDimX = relAngleArray[k].x;
                                				InitialDimY = relAngleArray[k].y;
                                			}
                                		}
                                	}
                                	setRelatives(mouse.x, mouse.y, dimToMove[0], 'dim', 0, dimToMove[1]);
                                    drawingMode = 'dragdimension';
                                }

                                else if(isonHandle(mouse.x,mouse.y) != 999){
                                	HandleToDrag = isonHandle(mouse.x, mouse.y);
            						    for(var k = 0; k < relAngleArray.length; k++){
            						        if(relAngleArray[k].elementID == HandleToDrag){
            						            InitialHandleDimX = relAngleArray[k].handlex;
            						            InitialHandleDimY = relAngleArray[k].handley;
            						        }
            						    }
                                	setRelatives(mouse.x, mouse.y, 'null', 'SRP', HandleToDrag);
                                	drawingMode = 'draghandle';
                                }

								break;
							case 'dragging':
                                isonline(mouse.x, mouse.y, 'Rel');
                                if(FirstDragAngle == 999){
                                    FirstDragAngle = calcClickAngle(mouse.x, mouse.y, AngleSelectedLine1);
                                    if(FirstDragAngle > FirstClickAngle){
                                        AngleArcDirection = 'cw';
                                    }
                                    else if(FirstDragAngle <= FirstClickAngle){
                                        AngleArcDirection = 'ccw';
                                    }
                                }
                                if(AngleSelectedLine1 != 999){
                                    drawAngleArc(mouse.x, mouse.y, AngleSelectedLine1,AngleArcDirection);
                                }
								break;
							case 'up':
                                var selectedLine2 = isonline(mouse.x, mouse.y, 'Rel');
                                if(AngleSelectedLine1 != 999 && selectedLine2 != 999){
                                    //create a new relangledim:
                                    var relAngleData = drawAngleArcSnap(mouse.x, mouse.y, AngleSelectedLine1,AngleArcDirection, selectedLine2);
                                    createRelAngleDim(relAngleData[0], relAngleData[1], relAngleData[2], relAngleData[3], relAngleData[4], relAngleData[5],relAngleData[8],relAngleData[6], relAngleData[7], relAngleData[9]);
                                }

                                var clickedonendpoint = isonendpoint();
                                if(clickedonendpoint[0] != false){
                                    //get lines common to the clicked endpoint.
                                    linesforangle = linesCommonToNode(clickedonendpoint[1], clickedonendpoint[2])
                                    //If there are exactly 2, plug them into the below routine.
                                    var relAngleData = drawAngleArcSnap(clickedonendpoint[1]+15, clickedonendpoint[2] - 15, linesforangle[0],'cw', linesforangle[5]);
                                    createRelAngleDim(relAngleData[0], relAngleData[1], relAngleData[2], relAngleData[3], relAngleData[4], relAngleData[5],relAngleData[8],relAngleData[6], relAngleData[7], relAngleData[9]);
                                }
                                ////console.log('line 2:', selectedLine2);
                                //changeAngleBetween(AngleSelectedLine1, selectedLine2);
                                //resets global varible.
                                AngleSelectedLine1 = 999;
                                FirstClickAngle = 999;
                                FirstDragAngle = 999;
								break;
							}
			    	break;

			case 'loads':
			LastDrawingMode = 'loads';
					AllowDeleteLines = false;
					//mouseoverstress(mouse.x, mouse.y);
						switch(mouseState){
							case 'moving':
								//Highlight lines and dimensions. Helps with cleaning up dimensions.
								isonendpoint('null','null', true, mouse.x, mouse.y)
								isonLoadPoint(mouse.x, mouse.y);
								if(SRPArray.length > 0){
									isonSRP(mouse.x,mouse.y);
								}
								isondim(mouse.x,mouse.y,10,27);
								isonline(mouse.x,mouse.y,'UI');
								isonlabel(mouse.x,mouse.y,10,35);
								//Here is where the hover to see stress value function goes.
								break;
							case 'down':
								//If the user has clicked on a highlighted dimension:
								if(isondim(mouse.x,mouse.y,10,27) != 999){
									dimToMove = isondim(mouse.x,mouse.y,10,27);
									setRelatives(mouse.x, mouse.y, dimToMove[0], 'dim', 0, dimToMove[1]);
									drawingMode = 'dragdimension';
								}
								//If the user has clicked on a highlighted label:
								if(isonlabel(mouse.x,mouse.y,10,27) != 999){
									labelToMove = isonlabel(mouse.x,mouse.y,10,35);
									setRelatives(mouse.x, mouse.y, labelToMove, 'label');
									drawingMode = 'draglabel';
								}
								//If the user has clicked on the load point:
								if(isonLoadPoint(mouse.x,mouse.y) != 999){
									setRelatives(mouse.x, mouse.y, 'null', 'loadpoint');
									drawingMode = 'dragloadpoint';
								}
								else if(isonSRP(mouse.x,mouse.y) != 999){
										SRPidtoDrag = isonSRP(mouse.x,mouse.y);
										setRelatives(mouse.x, mouse.y, 'null', 'SRP', SRPidtoDrag);
										drawingMode = 'dragSRP';
								}
								else{
									linePreviewStart();
								}
								break;
							case 'dragging':
								linePreviewDrag('constLine');
								//determine the line of origin (if there is one) for the dragging line:
								//highlight endpoints
								isonendpoint('draggingMode',dragFromLineID);
								//suggest snap lines
								suggestHVSnap();

								break;
							case 'up':
								//create a new line.
								createNewLine('constLine');
								//filter for zero length lines.
								removeZeroLengthLines();
								break;
							}
			case 'resizeimg':
			LastDrawingMode = 'resizeimg';
					AllowDeleteLines = false;
						switch(mouseState){
							case 'moving':
								break;
							case 'down':

								break;
							case 'dragging':
								resizeImg();
								break;
							case 'up':

								break;
							}
			case 'movemode':
			LastDrawingMode = 'movemode';
					AllowDeleteLines = false;
						switch(mouseState){
							case 'moving':
						        isonendpoint();
						        isonline(mouse.x, mouse.y, 'UI');
								break;
							case 'down':
							    //Clicking on an endpoint initiates a drag - get initial ep loc
							    //so that the lines that need to be moved can be found.
                                eptomove = isonendpoint();
                                //Get lines and start/end data to pass into move function.
                                endpointsToMove = getEPs(eptomove);
                                linetomove = isonline(mouse.x, mouse.y, 'UI');
                                endpointoffsets = offsetsFromEndpoints(linetomove);
								break;
							case 'dragging':
                                //change the endpoints found above to the location of the mouse while dragging.
                                moveEPs(endpointsToMove);
                                //Move the line that is selected above.
                                moveLine(linetomove, endpointoffsets);
                                break;
							case 'up':

								break;
							}
			break;
		}
	}
	else {
	    lastMouseInOrOut = false;
	}
}

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
///////////////////Experimental point/line drag functionality below////////////////////////////////

//Button is clicked, set to movemode.
function setMoveMode(){
    drawingMode = 'movemode'
}

function offsetsFromEndpoints(line){
    if (line == 999){
        return 999;
    }

    for(i = 0; i < lineArray.length; i++){
        if(lineArray[i].lineID == line){
            var mLsx = lineArray[i].startx;
            var mLsy = lineArray[i].starty;
            var mLex = lineArray[i].endx;
            var mLey = lineArray[i].endy;
            sx = mouse.x - lineArray[i].startx;
            sy = mouse.y - lineArray[i].starty;
            ex = mouse.x - lineArray[i].endx;
            ey = mouse.y - lineArray[i].endy;
        }
    }

    //Also, find any lines attached to the line being moved. Note whether attached at start or end.
    //Save sx, sy, ex, and ey so that lines to move can be found.

    var endpointsToMove = [];

    for(i = 0; i < lineArray.length; i++){
        if((Tol(lineArray[i].startx, mLsx, .001) && Tol(lineArray[i].starty, mLsy, .001)) && lineArray[i].lineID != line){
            endpointsToMove.push(['start', 'start', lineArray[i]]);
        }
        if((Tol(lineArray[i].startx, mLex, .001) && Tol(lineArray[i].starty, mLey, .001)) && lineArray[i].lineID != line){
            endpointsToMove.push(['end', 'start', lineArray[i]]);
        }
        if((Tol(lineArray[i].endx, mLsx, .001) && Tol(lineArray[i].endy, mLsy, .001)) && lineArray[i].lineID != line){
            endpointsToMove.push(['start', 'end', lineArray[i]]);
        }
        if((Tol(lineArray[i].endx, mLex, .001) && Tol(lineArray[i].endy, mLey, .001)) && lineArray[i].lineID != line){
            endpointsToMove.push(['end', 'end', lineArray[i]]);
        }
    }

    var retArray = [sx, sy, ex, ey, endpointsToMove]

    return retArray;
}

function moveLine(line, offsets){
    if(line == 999){
        return 0
    }

    if(document.getElementById("results").style.visibility == "visible"){
        ClearStressVis();
    }

    //Need to determine attached line angles. If the target line is attached to:
    // vert and horizontal lines: don't move. (Changed - this sucks. )
    // 1 or more horizontal lines: only allow horizontal motion.
    // 1 or more vertical lines" only allow vertical motion.
    //Any other combo - allow any motion.

    //Finding attached line states:

    var vertcount = 0;
    var horizcount = 0;
    for(i = 0; i < offsets[4].length; i++){
        //Vertical:
        if(Tol(offsets[4][i][2].startx, offsets[4][i][2].endx, .0001)){
            vertcount += 1;
        }
        //Horizontal:
        else if(Tol(offsets[4][i][2].starty, offsets[4][i][2].endy, .0001)){
            horizcount += 1;
        }
    }

    //limit to vertical motion.
    if(vertcount > 0 && horizcount == 0){

        for(i = 0; i < lineArray.length; i++){
            if(lineArray[i].lineID == line){
                var l = lineArray[i];
                //lineArray[i].startx = mouse.x - offsets[0];
                lineArray[i].starty = mouse.y - offsets[1];
                //lineArray[i].endx = mouse.x - offsets[2];
                lineArray[i].endy = mouse.y - offsets[3];

                updateLinearDimension(line);
            }
        }

    }

    //limit to horizontal motion.
    else if(vertcount == 0 && horizcount > 0){

        for(i = 0; i < lineArray.length; i++){
            if(lineArray[i].lineID == line){
                var l = lineArray[i];
                lineArray[i].startx = mouse.x - offsets[0];
                //lineArray[i].starty = mouse.y - offsets[1];
                lineArray[i].endx = mouse.x - offsets[2];
                //lineArray[i].endy = mouse.y - offsets[3];

                updateLinearDimension(line);
            }
        }

    }

    //Allow movement in any direction.
    else{

        for(i = 0; i < lineArray.length; i++){
            if(lineArray[i].lineID == line){
                var l = lineArray[i];
                lineArray[i].startx = mouse.x - offsets[0];
                lineArray[i].starty = mouse.y - offsets[1];
                lineArray[i].endx = mouse.x - offsets[2];
                lineArray[i].endy = mouse.y - offsets[3];

                updateLinearDimension(line);
            }
        }

    }

    //Attach connected points:
    for(i = 0; i < offsets[4].length; i++){
        for(j = 0; j < lineArray.length; j++){
            if(lineArray[j].lineID == offsets[4][i][2].lineID){
                if(offsets[4][i][0] == 'start' && offsets[4][i][1] == 'start'){
                    lineArray[j].startx = l.startx
                    lineArray[j].starty = l.starty
                }
                if(offsets[4][i][0] == 'end' && offsets[4][i][1] == 'start'){
                    lineArray[j].startx = l.endx
                    lineArray[j].starty = l.endy
                }

                if(offsets[4][i][0] == 'start' && offsets[4][i][1] == 'end'){
                    lineArray[j].endx = l.startx
                    lineArray[j].endy = l.starty
                }
                if(offsets[4][i][0] == 'end' && offsets[4][i][1] == 'end'){
                    lineArray[j].endx = l.endx
                    lineArray[j].endy = l.endy
                }
                updateLinearDimension(lineArray[j].lineID);

                lineArray[j].angle = updateAngle(lineArray[j].startx, lineArray[j].starty, lineArray[j].endx, lineArray[j].endy);
                attachedAngleDimsID(lineArray[j].lineID);
            }
        }
    }

    closeOrOpenSection();

    Redraw();

    return 1;
}


//Get the endpoints into an array:
function getEPs(eptomove){

    //First, if it wasn't on an endpoint when clicked, do nothing.
    if (eptomove[0] == false){
        return 0;
    }

    var linesToMove = [];

    //Make an array containing all of the lines with endpoints common to the selected node.
    for(var i = 0; i < lineArray.length; i++){
        if((Tol(lineArray[i].endx, eptomove[1], .001) && Tol(lineArray[i].endy, eptomove[2], .001))){
            linesToMove.push(['end', lineArray[i]]);
        }

        else if(Tol(lineArray[i].startx, eptomove[1], .001) && Tol(lineArray[i].starty, eptomove[2], .001)){
            linesToMove.push(['start',lineArray[i]]);
        }
    }

    return linesToMove;
}

//Move those endpoints around while dragging:
//Need to:
//1) Clear results when this happens. DONE.
//1a) Update connection points. DONE.
//2) Update linear dimensions and dimension tags as this happens. DONE.
//3) Delete associated angular dimension tags as this happens. DONE.

//TODO
//4) Add this to the undo stack.
function moveEPs(ep){
    if (ep == 0){
        return 0;
    }

    if (ep.length <= 1){
        return 0;
    }

    if(document.getElementById("results").style.visibility == "visible"){
        ClearStressVis();
    }


    for(var i= 0; i < ep.length; i++){
        if(ep[i][0] == 'start'){
            ep[i][1].startx = mouse.x;
            ep[i][1].starty = mouse.y;
            updateLinearDimension(ep[i][1].lineID);
            ep[i][1].angle = updateAngle(ep[i][1].startx, ep[i][1].starty, ep[i][1].endx, ep[i][1].endy);
            attachedAngleDims(ep);
        }

        else if(ep[i][0] == 'end'){
            ep[i][1].endx = mouse.x;
            ep[i][1].endy = mouse.y;
            updateLinearDimension(ep[i][1].lineID);
            ep[i][1].angle = updateAngle(ep[i][1].startx, ep[i][1].starty, ep[i][1].endx, ep[i][1].endy);
            attachedAngleDims(ep);
        }
    }

    closeOrOpenSection();
    Redraw();
    return 1;

}


function updateAngle(sx, sy, ex, ey){

    //Calculate the angle of the line as drawn (this might be overwritten by snap):
    var angle = lineAngleFromOrigin(sx, sy, ex, ey);

    //transform angle to start at x axis and go positive C.C:
    angle = angle - 90;
    if(angle <= 0){
    	angle = angle + 360;
    }
    angle = 360 - angle;

    return angle

}

//Find any relative angle dimensions attached to any moved lines. Just delete them for now.
function attachedAngleDims(ep){

    if (ep == 0){
        return 0;
    }

    for(j=0; j < ep.length; j++){
    	for(var i = 0; i < relAngleArray.length; i++){
    		a = relAngleArray[i];
    		if(a.line1ID == ep[j][1].lineID || a.line2ID == ep[j][1].lineID){
    			relAngleArray.splice(i,1);
    		}
    	}
    }
}

//Find any relative angle dimensions attached to any moved lines. Just delete them for now.
function attachedAngleDimsID(id){

    if (id == 999){
        return 0;
    }

	for(var i = 0; i < relAngleArray.length; i++){
		a = relAngleArray[i];
		if(a.line1ID == id || a.line2ID == id){
			relAngleArray.splice(i,1);
		}
	}
}



//////////////////////////////////////////////////////////////////////////////////////////////
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


function resizeImg(){

	imgWidth = mouse.x-imgXloc;
	imgHeight = imgWidth / imgAR;

    cancelClicked()

}

function isonResizeHandle(){

	//Get location of bottom right point.
	resizeHandleX = imgXloc + imgWidth;
	resizeHandleY = imgYloc + imgHeight;

	var distToHandle = Math.pow((Math.pow(resizeHandleX - (mouse.x - xRelative),2))+Math.pow(resizeHandleY - (mouse.y - yRelative),2),.5);
	if(distToHandle < 10){
	    drawEndpoint((resizeHandleX),(resizeHandleY));
		return true;
	}
	else{
		return false;
	}
}

document.getElementById('imgupload').onchange = function (evt) {
    PrintToLog('Trace from image clicked')
        cancelClicked()
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = () => showImage(fr);
        fr.readAsDataURL(files[0]);
    }
}

function showImage(fileReader) {
	PrintToLog('Uploaded an Image')
	ImageShown = true;
    imageObj.src = fileReader.result;
	imgWidth = imageObj.width;
	imgHeight = imageObj.height;

    whiteBackground = false;

	//Hide the dialogue:
	todcancelClicked();
}

/*
imageObj.onload = function() {
ci.drawImage(imageObj, 69, 50);
	imgWidth = imageObj.width;
	imgHeight = imageObj.height;
	imgAR = imgWidth / imgHeight;
	imgWidth = 200;
	imgHeight = imgWidth / imgAR;
};

imageObj.src = 'blueprint.jpg';
*/

//Redraws the screen:
function Redraw(){

    c.clearRect(0,0,window.innerWidth, window.innerHeight);
	c.putImageData(imageData, 0, 0);
	if (document.getElementById('results').style.visibility != 'visible'){
	    try{
	        ci.drawImage(imageObj, imgXloc, imgYloc, imgWidth,imgHeight);
	    }

        catch(err){
            displayError('badimg', 'Image type not supported.');
        }
	}

	else{
    ci.globalAlpha = 0.2;
	ci.drawImage(imageObj, imgXloc, imgYloc, imgWidth,imgHeight);
    ci.globalAlpha = 1;
	}

//TopTextValue.drawTopText(TopTextValue.text,TopTextX,TopTextY);

    //If the first line has not been drawn,
    if(lineArray.length == 0 && arcArray.length == 0){
        StartText("Click, drag, and release to draw first line.");
    }

    //If the first line has not been dimensioned, but is drawn:
    if(lineArray.length == 1 && arcArray.length == 0 && Scale == 0){
        StartText("Enter length of first line.");
    }

        //If the first line has not been drawn and dimensioned.
    if(lineArray.length == 1 && arcArray.length == 0 && Scale != 0){
        StartText("Click on any dimension to edit.");
        StartText("Hold Control to turn off snaps.", 20);
    }

    if(lineArray.length > 1){
        StartTextOff = true;
    }

    //Draw the drag lines:
    if(dragLinesArray.length > 1){
        for(var i = 1; i < dragLinesArray.length; i++){
    			c.setLineDash([]);
    		    c.lineWidth = 1;
        		c.beginPath();
        		c.moveTo(dragLinesArray[i-1][0], dragLinesArray[i-1][1]);
        		c.lineTo(dragLinesArray[i][0], dragLinesArray[i][1]);
        		c.strokeStyle = 'red';
        		c.stroke();
        		c.lineWidth = 4;
        		c.setLineDash([]);
        }
    }

	//redraw all of the rectangles:
	/*for(var i = 0; i < rectArray.length; i++){
		r = rectArray[i];
		r.drawrect();
	}
	*/

	//redraw all of the lines:
	for(var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
		l.drawline(LineColor);
	}

	//redraw all of the fillets:
	for (var i = 0; i < arcArray.length; i++){
		a = arcArray[i];
		var color = a.color;
		a.drawarc(color);
	}

	/*redraw all of the chamfers:
	for (var i = 0; i < chamferArray.length; i++){
		ch = chamferArray[i];
		ch.drawchamfer("black");
	}
	*/

	//redraw all dims, if dims are requested:
	if(showDims == true){
		for(var i = 0; i < linearDimArray.length; i++){
			d = linearDimArray[i];
			if(d.showDim == true){
                d.drawdim(d.value,d.x,d.y,'black');
				//d.drawdimline(d.x, d.y);
			}
		}

		for(var i = 0; i < AngularDimArray.length; i++){
			d = AngularDimArray[i];
			if(d.showDim == true){
				//d.drawdim(d.value,d.x,d.y,'black');
				//d.drawdimarc(d.startx, d.starty);
			}
		}
	}

	//Show angular dims regarless of showdim state.
	for(var i = 0; i < relAngleArray.length; i++){
		d = relAngleArray[i];
		if(d.showDim == true){
		    ////console.log(d.centroidx, d.centroidy, d.radstart, d.radend);
			d.drawdim(d.value,d.x,d.y,'black');
			d.drawdimarc(d.x,d.y);
			d.drawarchandle('gray',0);
            d.drawchangemarker('black',2);
		}
	}

	if(dispCx != 0){
		//drawCentroid(dispCx, dispCy, MasterAlpha);
	}

	if(zeroX != 0 & showZeroZero == true){
		//drawZeroZero(zeroX, zeroY);
	}

	//redraw all labels:
	for(var i = 0; i < labelArray.length; i++){
		la = labelArray[i];
		if(la.type == "max"){
			if(ShowMax == true){
				la.drawlabel(la.value, la.xloc, la.yloc, 'black');
			}
		}
		else{
			la.drawlabel(la.value, la.xloc, la.yloc, 'black');
		}
	}

    //redraw the connectedPoints:
    for(var i = 0; i< connectedPointsArray.length; i++){
        var cP = connectedPointsArray[i];
        drawConnectionPoint(cP[0], cP[1]);
    }

    //If it contains things, draw the unconnectedlinesarray:
    for(var i = 0; i < unConnectedLinesArray.length; i++){
        c.beginPath();
    	c.arc(unConnectedLinesArray[i][0],unConnectedLinesArray[i][1],25, Math.PI*2, false);
		c.lineWidth = 1.5;
	    c.setLineDash([3,3]);
		c.strokeStyle = 'red';
		c.stroke();
    }

    //draw clearing pixel (for some reason, the style of the last thing drawn always gets messed up
    //so a tiny line is drawn in the corner)
    drawConnectionPoint(10, 10);



//DIAGNOSTIC, TURN OFF BEFORE RELEASE:
    //diagnostic to show aux points:
    /*
    for(var i = 0; i < AuxArray.length; i++){
        var cP = AuxArray[i];
            drawAddpoint(cP[0]/Scale, cP[1]/Scale, cP[2]);
	}
	*/
	/*redraw the load point:
	for(var i = 0; i < loadArray.length; i++){
		lo = loadArray[i];
		lo.drawLoadPoint(lo.x, lo.y, "black");
	}
	*/

	/*redraw SRPs:
	for(var i = 0; i < SRPArray.length; i++){
		Sa = SRPArray[i];
		Sa.drawSRP(Sa.x, Sa.y, "black", Sa.SRPid);
	}
	*/

	//coordinateSystem();


}




//To detect location of clicks (becomes more important with touch...)
//See if the click happened in the tools menu:

/*
document.getElementById('results').addEventListener('click', function(){
    //writedebugToOutputbox('click in results area');
});

document.getElementById('resultskeepout').addEventListener('click', function(){
    //writedebugToOutputbox('click in resultskeepout area');
});

document.getElementById('resultsgrab').addEventListener('click', function(){
    //writedebugToOutputbox('click in resultsgrab area');
});

document.getElementById('toolsmenu').addEventListener('click', function(){
    //writedebugToOutputbox('click in toolsmenu area');
});

*/
document.getElementById('menubar').addEventListener('click', function(){
    	//document.getElementById('inputBox').value = "";
    	//document.getElementById("inputBox").focus();
    	//document.getElementById("inputBox").select;
});



//Because touch can't do mouseenter/mouseleave, this just compares the coordinates of the cursor with the bounding box of the tool area.
function mouseInToolArea(){

    var toolsMenuBox = document.getElementById('toolsmenu').getBoundingClientRect();

    var inToolArea = false;
    var heightIn = false;
    var widthIn = false;

    if(mouse.x > toolsMenuBox.left && mouse.x < toolsMenuBox.right){
        widthIn = true;
    }
    if(mouse.y > toolsMenuBox.top && mouse.y < toolsMenuBox.bottom){
        heightIn = true;
    }

    if(heightIn == true && widthIn == true){
        inToolArea = true;
        //writedebugToOutputbox('In Tool Area.');
        InToolsMenu == true;
    }
    else{
        InToolsMenu = false;
    }

    return inToolArea;
}

//Because touch can't do mouseenter/mouseleave, this just compares the coordinates of the cursor with the bounding box of the tool area.
function mouseInFlagArea(){

    var toolsMenuBox = document.getElementById('pricinglink').getBoundingClientRect();

    var logoBox = document.getElementById('logospace').getBoundingClientRect();

    var inToolArea = false;
    var heightIn = false;
    var widthIn = false;

    if((mouse.x > toolsMenuBox.left && mouse.x < toolsMenuBox.right) || (mouse.x > logoBox.left && mouse.x < logoBox.right)){
        widthIn = true;
    }
    if((mouse.y > toolsMenuBox.top && mouse.y < toolsMenuBox.bottom) || (mouse.y > logoBox.top && mouse.y < logoBox.bottom)){
        heightIn = true;
    }

    if(heightIn == true && widthIn == true){
        inToolArea = true;
        InFlagArea == true;
    }
    else{
        InFlagArea = false;
    }

    return inToolArea;
}

//Because touch can't do mouseenter/mouseleave, this just compares the coordinates of the cursor with the bounding box of the menu area.
function mouseInMenuArea(){

    var MenuBox = document.getElementById('menubar').getBoundingClientRect();

    var inMenuArea = false;
    var heightIn = false;
    var widthIn = false;

    if(mouse.x > MenuBox.left && mouse.x < MenuBox.right){
        widthIn = true;
    }
    if(mouse.y > MenuBox.top && mouse.y < MenuBox.bottom){
        heightIn = true;
    }

    if(heightIn == true && widthIn == true){
        inMenuArea = true;
        //writedebugToOutputbox('In Menu Area.');
    }

    return inMenuArea;

}

//Because touch can't do mouseenter/mouseleave, this just compares the coordinates of the cursor with the bounding box of the results grab area.
function mouseInRG(){

    var MenuBox = document.getElementById('resultsgrab').getBoundingClientRect();

    var inMenuArea = false;
    var heightIn = false;
    var widthIn = false;

    if(mouse.x >= MenuBox.left - 10 && mouse.x <= MenuBox.right + 10){
        widthIn = true;
    }
    if(mouse.y >= MenuBox.top - 10 && mouse.y <= MenuBox.bottom + 10){
        heightIn = true;
    }

    if(heightIn == true && widthIn == true){
        inMenuArea = true;
        //writedebugToOutputbox('In Menu Area.');
        mouseInResultsGrab = true;
    }
    else{
        mouseInResultsGrab = false;
    }

    return inMenuArea;

}

//Because touch can't do mouseenter/mouseleave, this just compares the coordinates of the cursor with the bounding box of the results keepout area.
function mouseInResultsKeepout(){

    var MenuBox = document.getElementById('resultskeepout').getBoundingClientRect();

    var inMenuArea = false;
    var heightIn = false;
    var widthIn = false;

    if(document.getElementById('resultskeepout').style.visibility == 'visible'){

        if(mouse.x > MenuBox.left && mouse.x < MenuBox.right){
            widthIn = true;
        }
        if(mouse.y > MenuBox.top && mouse.y < MenuBox.bottom){
            heightIn = true;
        }

        if(heightIn == true && widthIn == true){
            inMenuArea = true;
            if(drawingMode != 'dragresultsbox'){
                mouseState = 'moving';
                MouseInKeepOut = true;
            }
        }
        else{
            //if(drawingMode != 'dragresultsbox'){
              //  mouseState = 'moving';
                MouseInKeepOut = false;
        //    }
        }
    }


    return inMenuArea;

}

//Because touch can't do mouseenter/mouseleave, this just compares the coordinates of the cursor with the bounding box of the tool area.
function mouseInRadiusBox(){

    var toolsMenuBox = document.getElementById('filletsInput').getBoundingClientRect();

    var inToolArea = false;
    var heightIn = false;
    var widthIn = false;

    if(mouse.x > toolsMenuBox.left && mouse.x < toolsMenuBox.right){
        widthIn = true;
    }
    if(mouse.y > toolsMenuBox.top && mouse.y < toolsMenuBox.bottom){
        heightIn = true;
    }

    if((heightIn == true && widthIn == true) || (mouseInFilletsInput == true)){
        inToolArea = true;
        ////console.log('in filletinput')
    }
    else if(mouseInFilletsInput == false){
        inToolArea = false;
    }

    else{
         inToolArea = false;
    }

    return inToolArea;
}


document.getElementById('pricinglink').addEventListener('mouseenter', function(){
    InFlagArea = true;
}, false);

document.getElementById('pricinglink').addEventListener('mouseleave', function(){
    InFlagArea = false;
}, false);

document.getElementById('canvas').addEventListener('mousedown', function(){
    if(drawingMode != 'dragresultsbox'){
        mouseState = 'moving';
        MouseInKeepOut = false;
    }
    InToolsMenu = false;
});



document.getElementById('canvas').addEventListener('mouseenter', function(){
    //writedebugToOutputbox('mouseentercanvasarea');
}, false);

document.getElementById('results').addEventListener('mouseenter', function(){
    if(drawingMode != 'dragresultsbox'){
        mouseState = 'moving';
    }
}, false);

document.getElementById('results').addEventListener('mouseleave', function(){
    if(drawingMode != 'dragresultsbox'){
        mouseState = 'moving';
    }
}, false);

document.getElementById('resultskeepout').addEventListener('mouseenter', function(){
    if(drawingMode != 'dragresultsbox'){
        mouseState = 'moving';
        MouseInKeepOut = true;
    }
}, false);

document.getElementById('resultskeepout').addEventListener('mouseleave', function(){
    if(drawingMode != 'dragresultsbox'){
        mouseState = 'moving';
        MouseInKeepOut = false;
    }
}, false);

document.getElementById('resultsgrab').addEventListener('mouseenter', function(){
    mouseInResultsGrab = true;
}, false);

document.getElementById('resultsgrab').addEventListener('mouseleave', function(){
    mouseInResultsGrab = false;
}, false);

//document.getElementById('filletsInput').addEventListener('mouseenter', function(){
  //  mouseInFilletsInput = true;
//}, false);

//document.getElementById('filletsInput').addEventListener('mouseleave', function(){
  //  mouseInFilletsInput = false;
//}, false);

document.getElementById('toolsmenu').addEventListener('mouseenter', function(){
    if(drawingMode != 'fillets'){
        mouseState = 'moving';
        MouseInKeepOut = true;
        InToolsMenu = true;
    }
}, false);

document.getElementById('toolsmenu').addEventListener('mouseleave', function(){
    mouseState = 'moving';
    MouseInKeepOut = false;
    InToolsMenu = false;
}, false);


document.getElementById('menubar').addEventListener('mouseenter', function(){
    mouseState = 'moving';
   MouseInKeepOut = true;
}, false);

document.getElementById('menubar').addEventListener('mouseleave', function(){
    mouseState = 'moving';
    MouseInKeepOut = false;
}, false);

function switchToPointer(){
    if(InToolsMenu == true){
        //Empty the dragLinesArray:
        dragLinesArray = [];
        //Switch cursor to pointer anytime in this div:
        document.getElementById("snipcursor").style.visibility = "hidden";
        document.getElementById("erasecursor").style.visibility = "hidden";
        document.body.style.cursor = "pointer";
    }
    else if(MouseInKeepOut ==true){
        //Empty the dragLinesArray:
        dragLinesArray = [];
        //Switch cursor to pointer anytime in this div:
        document.getElementById("snipcursor").style.visibility = "hidden";
        document.getElementById("erasecursor").style.visibility = "hidden";
        document.body.style.cursor = "default";
    }
    else if(drawingMode == 'snip'){
        document.getElementById("snipcursor").style.visibility = "visible";
        document.body.style.cursor = "none";
    }
    else if(drawingMode == 'erase'){
        document.getElementById("erasecursor").style.visibility = "visible";
        document.body.style.cursor = "none";
    }
    else if(drawingMode == 'dragdimension'){
        document.getElementById("snipcursor").style.visibility = "hidden";
        document.getElementById("erasecursor").style.visibility = "hidden";
        document.body.style.cursor = "crosshair";
    }
    else if(drawingMode == 'draghandle'){
        document.getElementById("snipcursor").style.visibility = "hidden";
        document.getElementById("erasecursor").style.visibility = "hidden";
        document.body.style.cursor = "crosshair";
    }
    else{
        document.body.style.cursor = "crosshair";
    }
}


function selectDragBox(x,y){

    	c.fillStyle = 'rgba(200, 200, 200, 0.3)';
		c.fillRect(dragBoxStartX, dragBoxStartY, x -dragBoxStartX, y -dragBoxStartY);
		c.stroke();

        c.lineWidth = 1;
		c.setLineDash([10,10]);
		c.strokeStyle = 'black';
		c.beginPath();
		c.rect(dragBoxStartX, dragBoxStartY, x -dragBoxStartX, y -dragBoxStartY);
		c.stroke();

}

function hsdims(){
	if (showDims == true){
		showDims = false;
        var hsdimsbtn = document.getElementById("hsdims");
        hsdimsbtn.innerHTML = 'Show Dims.';
    PrintToLog('Hide Dimensions Clicked')

	}
	else{
		showDims = true;
        var hsdimsbtn = document.getElementById("hsdims");
        hsdimsbtn.innerHTML = 'Hide Dimensions';
        PrintToLog('Show Dimensions Clicked')
	}
	Redraw();
}


function setColor(){

		document.getElementById("coloralert").style.visibility = "visible";
		document.getElementById("colorgrab").style.visibility = "visible";
		document.getElementById("colorheader").style.visibility = "visible";
		document.getElementById("colortext").style.visibility = "visible";
		document.getElementById("color1btn").style.visibility = "visible";
		document.getElementById("color2btn").style.visibility = "visible";
		document.getElementById("color3btn").style.visibility = "visible";
		document.getElementById("color4btn").style.visibility = "visible";
		document.getElementById("smokescreen").style.visibility = "visible";
		InputFreze = true;
	    PrintToLog('Set Line Color Clicked')
}

function closeColorOptions(){
		document.getElementById("coloralert").style.visibility = "hidden";
		document.getElementById("colorgrab").style.visibility = "hidden";
		document.getElementById("colorheader").style.visibility = "hidden";
		document.getElementById("colortext").style.visibility = "hidden";
		document.getElementById("color1btn").style.visibility = "hidden";
		document.getElementById("color2btn").style.visibility = "hidden";
		document.getElementById("color3btn").style.visibility = "hidden";
		document.getElementById("color4btn").style.visibility = "hidden";
		document.getElementById("smokescreen").style.visibility = "hidden";
		InputFreze = false;
		Redraw();
}

function rerunAfterColorChange(){
        SendShape()
        document.getElementById("loader").style.visibility = "visible";
        bottomLeftPoint();
	    UtilityPointDraw(displayProperties);
	    StressGradientShown = true;
}

function color1Clicked(){
	LineColor ='#dedede';
	intersectColor = 'gray'
	DimColor = 'black'
	FillColor = 'inside1'
	closeColorOptions();
    ClearStressVis();
    rerunAfterColorChange()
	PrintToLog('Color Set To gray')
}
function color2Clicked(){
	LineColor ='#0BD9B0';
	intersectColor = '#0086CB'
	DimColor = 'black'
	FillColor = 'inside2'
	closeColorOptions();
    ClearStressVis();
    rerunAfterColorChange()
	PrintToLog('Color Set To green')

}
function color3Clicked(){
	LineColor ='#0077B3';
	intersectColor = 'blue'
	DimColor = 'white'
	FillColor = 'inside3'
	closeColorOptions();
    ClearStressVis();
    rerunAfterColorChange()
	PrintToLog('Color Set To blue')
}
function color4Clicked(){
	LineColor ='black';
	intersectColor = 'blue'
	DimColor = 'white'
	FillColor = 'inside1'
	closeColorOptions();
    ClearStressVis();
    rerunAfterColorChange()
	PrintToLog('Color Set To black')
}


//brings up resize image popup, sets drawingmode to resizsimg, and greys the resize image button + resets buttons.

function setResizeMode(){

	PrintToLog('Resize Image Clicked')

	if (ImageShown == false){
		displayError('noimg', 'No image to resize. Click Load Image to select.');
	}
	else{
		drawingMode = 'resizeimg';

		document.getElementById("resizealert").style.visibility = "visible";
		document.getElementById("resizegrab").style.visibility = "visible";
		document.getElementById("resizecancelbtn").style.visibility = "visible";
		document.getElementById("resizetext").style.visibility = "visible";
		document.getElementById("resizeokbtn").style.visibility = "visible";
		deselectButtons();
		document.getElementById("resizeimg").style.background = "grey";
		document.getElementById("toolsmenu").style.visibility = "hidden";

	}


}

//closes resize image popup, sets drawingmode to lines, ungreys resize image button.
function resizecancelClicked(){
	PrintToLog('Resize Cancel Clicked')

	drawingMode = 'lines';

	document.getElementById("resizealert").style.visibility = "hidden";
    document.getElementById("resizegrab").style.visibility = "hidden";
    document.getElementById("resizecancelbtn").style.visibility = "hidden";
    document.getElementById("resizetext").style.visibility = "hidden";
    document.getElementById("resizeokbtn").style.visibility = "hidden";
	document.getElementById("resizeimg").style.background = "#dedede";
	highlightButtonImg('linesb');
	document.getElementById("toolsmenu").style.visibility = "visible";


//ASD

	}

function deleteDragBoxContents(endx,endy){

    //For lines and fillets, go through arrays and check to see if both endpoints of all
    //entities are within bounds of deleteDragBox.

    //A counter to remember how many steps must be undone to get back to original state:
    var elementCount = 0;

    //for lines:
    var deleteArray = [];

    for(var i = 0; i < lineArray.length; i++){
        if(isbetween(lineArray[i].startx,dragBoxStartX,endx) && isbetween(lineArray[i].starty,dragBoxStartY,endy)){
             if(isbetween(lineArray[i].endx,dragBoxStartX,endx) && isbetween(lineArray[i].endy,dragBoxStartY,endy)){
	            var lineToDelete = lineArray[i].lineID;
	            elementCount += 1;
	            deleteArray.push(lineToDelete);
            }
        }
    }

    for(var i = 0; i < deleteArray.length; i++){
        deleteline(deleteArray[i]);
	    deletedim(deleteArray[i]);
    }

    //for fillets:
    deleteArray = [];

    for(var i = 0; i < arcArray.length; i++){
        if(isbetween(arcArray[i].endpoint1x,dragBoxStartX,endx) && isbetween(arcArray[i].endpoint1y,dragBoxStartY,endy)){
             if(isbetween(arcArray[i].endpoint2x,dragBoxStartX,endx) && isbetween(arcArray[i].endpoint2y,dragBoxStartY,endy)){
	            var arcToDelete = arcArray[i].arcID;
	            elementCount += 1;
	            deleteArray.push(arcToDelete);
            }
        }
    }

    for(var i = 0; i < deleteArray.length; i++){
        deletefillet(deleteArray[i], false, true);
	    deletedim(deleteArray[i]);
    }

}

//returns true is x is between b1 and b2, returns false if x is not between b1 and b2.
function isbetween(x,b1,b2, inclusive){
    var isbetween = false;
    var tolerance = .00000001;

    if(inclusive == true){
        if((x >= b1) && (b2 >= x)){
            isbetween = true;
        }
        else if((x >= b2) && (b1 >= x)){
            isbetween = true;
        }
        else if(Tol(x,b1,tolerance) || Tol(b2,x,tolerance)){
            isbetween = true;
        }
    }
    else{
        //for the case that b1 > b2:
        if((x > b1) && (b2 > x)){
            isbetween = true;
        }
        else if((x > b2) && (b1 > x)){
            isbetween = true;
        }
    }
    return isbetween;
}

function updateUserMoves(move){
    userMoves.push([move]);
    redoMoves = [];
    //Empty the redo array. Everytime the user does somethign that could be undone, the chain for redos must be broken.
}

function updateRedoMoves(move){
    redoMove = move;
    //rindex = userMoves.length - 1;
}

//dd...
function updateUndoFilletArray(move){
    undoFilletArray.push(move);
}

function appendUndoFilletArray(move){
    //go through undo
    for(var i = 0; i < undoFilletArray.length; i++){
        if(undoFilletArray[i][1] == move[1]){
                undoFilletArray[i][4] = move[2];
                undoFilletArray[i][5] = move[3];
                undoFilletArray[i][6] = move[4];
                undoFilletArray[i][7] = move[5];
                undoFilletArray[i][8] = move[6];
                undoFilletArray[i][9] = move[7];
            }
    }
}

/*
document.getElementById('outputbox').addEventListener('mouseenter', function(){
    mouseState = 'moving';
    MouseInKeepOut = true;
}, false);


document.getElementById('outputbox').addEventListener('mouseleave', function(){
    mouseState = 'moving';
    MouseInKeepOut = false;
}, false);

*/
//This function determines if the cursor is in the drawing area or elsewhere:
function mouseInDrawingArea(){

    var inbounds = true;
    //First, we know the mouse isn't in the drawing area if it is above the area of the drawing area:
    /*
    if(mouse.y < 0 ||  mouse.y > 1000){
        inbounds = false;
    }
    if(mouse.x <0 || mouse.x >1200){
        inbounds = false;
        mouseState = 'moving';
    }
    */
    if(mouse.x < 0 || mouse.y < 0 || mouse.x > canvas.width || mouse.y > canvas.height){
        inbounds = false;
    }

    if(mouseInToolArea() == true){
         inbounds = false;
    }

    if(InToolsMenu == true){
        inbounds = false;
    }

    if(drawingMode != 'dragresultsbox' && drawingMode != 'dragradiusbox'){
        mouseInResultsKeepout();

        if(MouseInKeepOut == true){
            inbounds = false;
        }
    }


    if(mouseInMenuArea() == true){
        inbounds = false;
    }

    if(mouseInFlagArea() == true){
         inbounds = false;
    }

    if(InFlagArea == true){
         inbounds = false;
    }
    //Also, check to see if the mouse is in the ResultsGrab area and set global accordingly.
    mouseInRG();

    return inbounds
}


//This function creates a new line object:
function Line(startx, starty, endx, endy, dim, lineID, lineLength, constLine, angle,startxghost,startyghost, endxghost, endyghost, midpointX, midpointY){

	this.endx = endx;
	this.endy = endy;
	this.startx = startx;
	this.starty = starty;

	this.dim = dim;
	this.lineID = lineID;
	this.lineLength = lineLength;
	this.constLine = constLine;
	this.angle = angle;

	this.midpointX = midpointX;
    this.midpointY = midpointY;

	this.startxghost = startxghost;
	this.startyghost = startyghost;
	this.endxghost = endxghost;
	this.endyghost = endyghost;

	this.drawline = function(color){

		if(this.constLine == true){
			var clr = color;
			c.setLineDash([6, 6]);
		    c.lineWidth = 1;
		}
		else{
			var clr = color;
			c.setLineDash([]);
		    c.lineWidth = LineThickness;
		}

		c.beginPath();
		c.moveTo(this.startx, this.starty);
		c.lineTo(this.endx, this.endy);
		c.strokeStyle = clr;
		c.stroke();
		c.lineWidth = LineThickness;
		c.setLineDash([]);

		c.beginPath();

		if(firstLineDrawn == false){
			firstLineDrawn = true;
		}
	}
}


//This function packages the lines and arcs data to work with the backend python script.

//0: 'line' or 'arc'
//1: x_min
//2: x_max
//3: m for line or x value of centroid for arc
//4: b for line or y value of centroid for arc
//5: empty for line, r for arc
//6: empty for line, rad start for arc
//7: empty for line, rad end for arc

function packageForPy(lines,arcs){

	var lineOrArc = 'null';
	var m = 0;
	var yFromBottom = 0;
	var b = 0;
	var retArray = [];
	var addArray = [];
	var retString = '[['

	for(var i = 0; i < lines.length; i++){
    	var l = lines[i];
	    if(l.constLine != true){
    		lineOrArc = 'line';
    		//Min and max are found and assigned:
    		if(l.startx > l.endx){
    			xmin = l.endx * Scale;
    			xmax = l.startx * Scale;
    		}
    		else if(l.startx < l.endx){
    			xmin = l.startx * Scale;
    			xmax = l.endx * Scale;
    		}
    		else{
    			xmin = 'vert';
    			xmax = l.endx * Scale;
    		}
    		//m is found:
    		m = (l.endy - l.starty)/(l.startx - l.endx);


    		//as another check, if m is really large or really small, lable as vert:

    		if(Math.abs(m) > 10000){
    		    xmin = 'vert';
    			xmax = l.endx * Scale;
    		}
    		//y is zero at top of window - if b is calc'd using that value, things get wierd. turn y value into from bottom of page.
    		yFromBottom = (canvas.height - l.starty);
    		b = yFromBottom * Scale - m * (l.startx * Scale);

    		//add all of that data to an output array.

    		if(i != 0){
    			retString += ',[';
    		}

    		addArray = [lineOrArc, xmin, xmax, m, b, 'null', 'null', 'null'];
    		for(var j = 0; j < addArray.length; j++){
    			if(isNaN(addArray[j]) || addArray[j] == Infinity || addArray[j] == -Infinity){
    				retString += '\'';
    			}
    			retString += addArray[j];
    			if(isNaN(addArray[j]) || addArray[j] == Infinity || addArray[j] == -Infinity){
    				retString += '\'';
    			}
    			if(j != addArray.length - 1){
    				retString += ',';
    			}
    			if(j == addArray.length - 1){
    				retString += ']';
    			}
    		}
	    }
	}

	//Now for arcs:

	for(var i = 0; i< arcArray.length; i++){

		lineOrArc = 'arc';
		var a = arcArray[i];

		//Some treatement of the start and end radians:

		var rstart = 0;
		var rend = 0;

        //if less than zero, add 2pi. Check again and add 2pi if still somehow negative.
		if(a.radstart < 0){
			rstart = a.radstart + 2*Math.PI;
    		if(rstart < 0){
    			rstart = rstart + 2*Math.PI;
    		}
		}

		//If greater than 2pi, subtratct 2pi. Check again and subtract if still somehow greater than 2pi.
		else if (a.radstart > 2*Math.PI){
			rstart = a.radstart - 2*Math.PI;
    		if(rstart > 2*Math.PI){
    			rstart = rstart - 2*Math.PI;
    		}
		}

		else{
		    rstart = a.radstart;
		}

		//reverse direction to python-script land:
        rstart = 2*Math.PI - rstart;

        //Same treatment for ends:
		if(a.radend < 0){
			rend = a.radend + 2*Math.PI;
    		if(rend < 0){
    			rend = rend + 2*Math.PI;
    		}
		}

		else if (a.radend > 2*Math.PI){
			rend = a.radend - 2*Math.PI;
    		if(rend > 2*Math.PI){
    			rend = rend - 2*Math.PI;
    		}
		}

		else{
		    rend = a.radend;
		}

		//reverse direction to python-script land:
        rend = 2*Math.PI - rend;

		//radians now go from 0 to 2pi ccw. Easy to work with.

		//Figure out how many radians between start and end:

		var arcRads = 0;

		if(rstart > rend){
			arcRads = rstart - rend;
		}
		else if(rstart < rend){
			arcRads = rstart + 2*Math.PI-rend;
		}

        //here is the parameter we are tweaking:
		var arcIncrement = arcRads / 100000;

		//Three variables used to find max and min x values.
		var xTest = 0;
		var localXMin = 999999;
		var localXMax = 0;

		//if rstart is greater than rend, the arc doesn't cross the zero radian line, therefore just go from start to end.
		if(rstart > rend){
			for(var rTest = rstart; rTest > rend; rTest = rTest - arcIncrement){
				xTest = a.centroidx*Scale + a.radius*Scale*Math.cos(rTest);
				if(xTest < localXMin){
					localXMin = xTest;
				}
				if(xTest > localXMax){
					localXMax = xTest;
				}
			}
		}

		//if rend is greater than rstart, the arc crosses the zero radian line. Start at 2pi and subtract.
		if(rend > rstart){
			for(var rTest = rstart; rTest > 0; rTest = rTest - arcIncrement){
				xTest = a.centroidx*Scale + a.radius*Scale*Math.cos(rTest);
				if(xTest < localXMin){
					localXMin = xTest;
				}
				if(xTest > localXMax){
					localXMax = xTest;
				}
			}
			for(var rTest = 2*Math.PI; rTest >= rend; rTest = rTest - arcIncrement){
				xTest = a.centroidx*Scale + a.radius*Scale*Math.cos(rTest);
				if(xTest < localXMin){
					localXMin = xTest;
				}
				if(xTest > localXMax){
					localXMax = xTest;
				}
			}
		}

		//Populate the output array with arc data:

		retString += ',[\'';

		centroidyFromBottom = (canvas.height - a.centroidy);

		addArray = [lineOrArc+'\'', localXMin, localXMax, a.centroidx*Scale, centroidyFromBottom*Scale, a.radius*Scale,rstart,rend];

		for(var j = 0; j < addArray.length; j++){
			retString += addArray[j];
			if(j != addArray.length - 1){
				retString += ',';
			}
			if(j == addArray.length - 1){
				retString += ']';
			}
		}
		//visual confirmation that the xmin/xmax functions are working:
		//lineArray.push(new Line(localXMax/Scale, 100, localXMin/Scale, 100, 123, 123, 123));
	}

    retString += ',' + analysisID.toString()+ ','
	retString += ']';

	//A little cleanup to detect and correct the error generated by the first element being a construction line:

	if(retString.substr(0,4) == '[[,['){
	    retString = retString.replace('[[,[','[[');
	}

    //console.log(retString)
	return retString;
}

function MinPointsOnArcs(){

    var currentXMin = 999999;
    var currentYMin = 0;

    for(var i = 0; i< arcArray.length; i++){
    //Some treatement of the start and end radians:



        var a = arcArray[i];

        rstart = Math.PI - a.radstart;
        rend = Math.PI - a.radend;


    //radians now go from 0 to 2pi ccw. Easy to work with.

    //Figure out how many radians between start and end:

        var arcRads = 0;

        if(rstart > rend){
    	    arcRads = rstart - rend;
        }

        else if(rstart < rend){
    	    arcRads = rstart + 2*Math.PI-rend;
        }

        var arcIncrement = arcRads / 4999;

        //Four variables used to find min x and y values.
        var xTest = 0;
        var yTest = 0;
        var localXMin = 999999;
        var localYMin = 0;

        //if rstart is greater than rend, the arc doesn't cross the zero radian line, therefore just go from start to end.
        if(rstart > rend){
    	    for(var rTest = rstart; rTest > rend; rTest = rTest - arcIncrement){
    		    xTest = a.centroidx*Scale - a.radius*Scale*Math.cos(rTest);
    		    yTest = a.centroidy*Scale + a.radius*Scale*Math.sin(rTest);
    		    if(xTest < localXMin){
    			    localXMin = xTest;
    		    }
    		    if(yTest > localYMin){
    			    localYMin = yTest;
    		    }
    	    }
        }

        //if rend is greater than rstart, the arc crosses the zero radian line. Start at 2pi and subtract.
        if(rend > rstart){
        	for(var rTest = rstart; rTest > 0; rTest = rTest - arcIncrement){
        		xTest = a.centroidx*Scale - a.radius*Scale*Math.cos(rTest);
    		    yTest = a.centroidy*Scale + a.radius*Scale*Math.sin(rTest);
        		if(xTest < localXMin){
        			localXMin = xTest;
        		}
    		    if(yTest > localYMin){
    			    localYMin = yTest;
    		    }
        	}

        	for(var rTest = 2*Math.PI; rTest >= rend; rTest = rTest - arcIncrement){
        		xTest = a.centroidx*Scale - a.radius*Scale*Math.cos(rTest);
    		    yTest = a.centroidy*Scale + a.radius*Scale*Math.sin(rTest);
        		if(xTest < localXMin){
        			localXMin = xTest;
        		}
    		    if(yTest > localYMin){
    			    localYMin = yTest;
    		    }
        	}
        }


        if(localXMin < currentXMin){
            currentXMin = localXMin;
        }

        if(localYMin > currentYMin){
            currentYMin = localYMin;
        }

    }

    var retArray = [currentXMin / Scale, currentYMin / Scale];
    return retArray
}

/* Saved: function MinPointsOnArcs(){

    var currentXMin = 999999;
    var currentYMin = 0;

    for(var i = 0; i< arcArray.length; i++){
    //Some treatement of the start and end radians:

        var a = arcArray[i];

        var rstart = 0;
        var rend = 0;

        if(a.radstart > Math.PI){
    	    rstart = Math.PI - a.radstart;
        }

        else if(a.radstart < -Math.PI){
    	    rstart = 2*Math.PI + a.radstart;
        }

        else{
    	    rstart = a.radstart;
        }

        if(a.radend > Math.PI){
    	    rend = a.radend;
        }

        else if(a.radend < -Math.PI){
    	    rend = 2*Math.PI + a.radend;
        }

        else{
    	    rend = a.radend;
        }

    //Next, translate everything into a 0 to 2pi framework:
    //if the radian value is negative, take difference between abs value and PI. Add that to PI.

        if(rstart < 0){
    	    rstart = 2*Math.PI - Math.abs(rstart) ;
        }

        if(rend<0){
    	    rend = 2*Math.PI - Math.abs(rend);
        }

    //Now, flip direction so it is "standard":

        rstart = 2*Math.PI - rstart;
        rend = 2*Math.PI - rend;


    //radians now go from 0 to 2pi ccw. Easy to work with.

    //Figure out how many radians between start and end:

        var arcRads = 0;

        if(rstart > rend){
    	    arcRads = rstart - rend;
        }

        else if(rstart < rend){
    	    arcRads = rstart + 2*Math.PI-rend;
        }

        var arcIncrement = arcRads / 4999;

        //Four variables used to find min x and y values.
        var xTest = 0;
        var yTest = 0;
        var localXMin = 999999;
        var localYMin = 0;


        //INFINITE LOOP BUG HERE!
        //if rstart is greater than rend, the arc doesn't cross the zero radian line, therefore just go from start to end.
        if(rstart > rend){
    	    for(var rTest = rstart; rTest > rend; rTest = rTest - arcIncrement){
    		    xTest = a.centroidx*Scale + a.radius*Scale*Math.cos(rTest);
    		    yTest = a.centroidy*Scale - a.radius*Scale*Math.sin(rTest);
    		    drawEndpoint(xTest,yTest);
    		    if(xTest < localXMin){
    			    localXMin = xTest;
    		    }
    		    if(yTest > localYMin){
    			    localYMin = yTest;
    		    }
    	    }
        }

        //if rend is greater than rstart, the arc crosses the zero radian line. Start at 2pi and subtract.
        if(rend > rstart){
        	for(var rTest = rstart; rTest > 0; rTest = rTest - arcIncrement){
        		xTest = a.centroidx*Scale + a.radius*Scale*Math.cos(rTest);
    		    yTest = a.centroidy*Scale - a.radius*Scale*Math.sin(rTest);
        		if(xTest < localXMin){
        			localXMin = xTest;
        		}
    		    if(yTest > localYMin){
    			    localYMin = yTest;
    		    }
        	}

        	for(var rTest = 2*Math.PI; rTest >= rend; rTest = rTest - arcIncrement){
        		xTest = a.centroidx*Scale + a.radius*Scale*Math.cos(rTest);
    		    yTest = a.centroidy*Scale - a.radius*Scale*Math.sin(rTest);
        		if(xTest < localXMin){
        			localXMin = xTest;
        		}
    		    if(yTest > localYMin){
    			    localYMin = yTest;
    		    }
        	}
        }


        if(localXMin < currentXMin){
            currentXMin = localXMin;
        }

        if(localYMin > currentYMin){
            currentYMin = localYMin;
        }
    }

    var retArray = [currentXMin / Scale, currentYMin / Scale];

    return retArray

}

*/

function Rectangle(cx, cy, b, w, color, groupid){

	this.cx = cx;
	this.cy = cy;
	this.b = b;
	this.w = w;
	this.color = color;
	this.groupid = 0;

	this.drawrect = function(){
		c.fillStyle = color;
		c.fillRect(cx - b /2, cy - w/2, b, w);
		c.stroke();
	}
}

//This function creates a new chamfer object:
function Chamfer(startx, starty, endx, endy, ChamferID, inOrOut, topleftx, toplefty, chamferDim, caseNumber, fx, fy, gID){

	this.endx = endx;
	this.endy = endy;
	this.startx = startx;
	this.starty = starty;
	this.ChamferID = ChamferID;
	this.inOrOut = inOrOut;
	this.topleftx = topleftx;
	this.toplefty = toplefty;
	this.chamferDim = chamferDim;
	this.caseNumber = caseNumber;
	this.fx = fx;
	this.fy = fy;
	this.groupID = gID;

	this.drawchamfer = function(color){

		c.beginPath();
		c.moveTo(this.startx, this.starty);
		c.lineTo(this.endx, this.endy);
		c.strokeStyle = color;
		c.stroke();
	}
}

function LinearDimension(value, x, y, elementID, showDim, startx, starty, endx, endy, orientation, startx1, starty1, endx1, endy1, startx2, starty2, endx2, endy2,type,angle,xoffset1,yoffset1, xoffset2, yoffset2, perpOffset){

	this.value = value;
	this.x = x;
	this.y = y;
	this.elementID = elementID;
	this.showDim = showDim;
	this.startx = startx;
	this.starty = starty;
	this.endx = endx;
	this.endy = endy;
	this.orientation = orientation;
	this.startx1 = startx1;
	this.starty1 = starty1;
	this.endx1 = endx1;
	this.endy1 = endy1;
	this.startx2 = startx2;
	this.starty2 = starty2;
	this.endx2 = endx2;
	this.endy2 = endy2;
	this.type = "linear";
	this.angle = angle;
	this.xoffset1 = xoffset1;
	this.yoffset1 = yoffset1;
	this.xoffset2 = xoffset2;
	this.yoffset2 = yoffset2;
	this.perpOffset = perpOffset;
	this.bbheight = 10;
	this.bbwidth = 27;
	this.selectForChange = false;
	this.boxwidth = 20;

	this.drawdim = function(valuetopass,xpass,ypass,color){

	    //The first line will be the only one with a dimension value of 0. Use that
	    //information to set it to selectForChange mode.

	    if(this.value == 0 && lineArray.length == 1){
	        this.selectForChange = true;
	    }

	    if(Tol(this.value, 0 , .001) && this.selectForChange == false){
	         this.showDim = false;
	    }

	    //Can't change fillet radii:
	    //Whep, now you can
	    //if(this.orientation == 'fillet'){
	      //  this.selectForChange = false;
	    //}

		//Draw cicle behind.

		//ASD

	    if(this.selectForChange == false){
    	    //while operating on this object, may as well grab the number of digits:
    	    valuetopass = valuetopass.toFixed(Precision);

			numberofdigits = String(valuetopass).match(/\d/g).length;

			//SDF

			////console.log(numberofdigits)
			this.boxwidth = numberofdigits * 5 + 10;
			c.fillStyle = LineColor;
			c.fillRect(xpass-1,ypass+2, this.boxwidth, -12);
			c.stroke();

    		this.digits = String(valuetopass).match(/\d/g).length;

    		if(TouchMode != true){
    	        this.bbwidth = this.digits*8;
    		}
    		else{
    	        this.bbwidth = this.digits*20;
    	        this.bbheight = 20;
    		}
    		c.font = "11px Arial";
    		c.fillStyle = DimColor;
    		c.fillText(valuetopass,xpass,ypass);
    		c.fillStyle = DimColor;
	    }
	    else{
			c.fillStyle = LineColor;
			c.fillRect(xpass-1,ypass+2, this.boxwidth, -12);
			c.stroke();
	        if(ChangePreviewValue == null){
    		    c.font = "11px Arial";
    		    c.fillStyle = DimColor;
    		    c.fillText(' |...',xpass,ypass);
    		    c.fillStyle = DimColor;
	        }
	        else{
                if (String(ChangePreviewValue).match(/\d/g) != null){
    				numberofdigits = String(ChangePreviewValue).match(/\d/g).length;
    				boxwidth = numberofdigits * 5 + 10;

    				c.fillStyle = LineColor;
    				c.fillRect(xpass-1,ypass+2, boxwidth, -12);
    				c.stroke();
        		    c.font = "11px Arial";
        		    c.fillStyle = DimColor;
        		    c.fillText(ChangePreviewValue + '|',xpass,ypass);
        		    c.fillStyle = DimColor;
                }
	        }
	    }
	}


	this.drawdimline = function(xtopass,ytopass){

		//assign initial values:
		this.startx1 = this.startx;
		this.starty1 = this.starty;
		this.endx1 = this.endx;
		this.endy1 = this.endy;
		this.startx2 = this.startx;
		this.starty2 = this.starty;
		this.endx2 = this.endx;
		this.endy2 = this.endy;
		this.angle = this.angle;

		c.strokeStyle = 'black';
		c.lineWidth = .5;

		var offsetdistance = this.offset;
		var startx1 = 0;
		var starty1 = 0;
		var endx1 = 0;
		var endy1 = 0;
		//Need to find the distance from the starting point to the line along the line and perpendicular to the line:

		//distance from startx1, starty1 to xtopass, ytopass:
		var totalDist = Math.pow(Math.pow(this.startx - xtopass,2)+Math.pow(this.starty-ytopass,2),.5);

		var Phi = lineAngleFromOrigin(this.startx, this.starty, xtopass, ytopass);

		//transform angle to start at x axis and go positive C.C:
		Phi = Phi - 90;
		if(Phi <= 0){
			Phi = Phi + 360;
		}
		Phi = 360 - Phi;

		//Find angle between line and label location.
		var deltaPhi = Phi - this.angle;

		//Calculate distances from the line to the label along and perpendicular to the line.
		var distAlong =  totalDist*(Math.cos((Math.PI/180)*deltaPhi));
		var distPerp = totalDist*(Math.sin((Math.PI/180)*deltaPhi));

		offsetdistance = distPerp + this.perpOffset;

		//Take one end, and find location of end of line.
		startx1 = this.startx - offsetdistance*(Math.sin((Math.PI/180)*this.angle));
		starty1 = this.starty - offsetdistance*(Math.cos((Math.PI/180)*this.angle));

		endx1 = xtopass - this.xoffset1*(Math.cos((Math.PI/180)*this.angle)) - this.perpOffset*(Math.sin((Math.PI/180)*this.angle));
		endy1 = ytopass + this.yoffset1*(Math.sin((Math.PI/180)*this.angle))- this.perpOffset*(Math.cos((Math.PI/180)*this.angle));

		//Take other end, draw to next to tag.
		startx2 = this.endx - offsetdistance*(Math.sin((Math.PI/180)*this.angle));
		starty2 = this.endy - offsetdistance*(Math.cos((Math.PI/180)*this.angle));

		//For some reason, the start values often end up shy of a round number.

		starty2 = Math.round(starty2);
		starty1 = Math.round(starty1);
		startx1 = Math.round(startx1);
		startx2 = Math.round(startx2);

		endx2 = xtopass + this.xoffset2*(Math.cos((Math.PI/180)*this.angle)) - this.perpOffset*(Math.sin((Math.PI/180)*this.angle));
		endy2 = ytopass - this.yoffset2*(Math.sin((Math.PI/180)*this.angle))- this.perpOffset*(Math.cos((Math.PI/180)*this.angle));


//Set of conditionals that hide lines when they extend past the end of the line they are connected to. Avoids drawing line through dimension tag.

		var dontShowLine1 = false;
		var dontShowLine2 = false;

		if(this.angle > 0 && this.angle <=90){

			if(((endx1 <= startx1) || (Tol(endx1,startx1,1))) && ((endy1 >= starty1)|| (Tol(endy1, starty1,1)))){
				dontShowLine1 = true;
			}
			else if(((endx2 >= startx2) || (Tol(endx2,startx2,1)))  && ((endy2 <= starty2) || (Tol(endy2, starty2,1)))){
				dontShowLine2 = true;
			}
		}

		else if(this.angle == 0 || this.angle == 360){

			if(endx1 <= startx1 || (Tol(endx1,startx1,1))){
				dontShowLine1 = true;
			}
			else if(endx2 >= startx2 || (Tol(endx2,startx2,1))){
				dontShowLine2 = true;
			}

		}

		else if(this.angle > 90 && this.angle <=180){

			if(((endx1 >= startx1) || (Tol(endx1,startx1,1))) && ((endy1 >= starty1)|| (Tol(endy1, starty1,1)))){
				dontShowLine1 = true;
			}
			else if(((endx2 <= startx2) || (Tol(endx2,startx2,1)))  && ((endy2 <= starty2) || (Tol(endy2, starty2,1)))){
				dontShowLine2 = true;
			}
		}

		else if(this.angle > 180 && this.angle <=270){
			if(((endx1 >= startx1) || (Tol(endx1,startx1,1))) && ((endy1 <= starty1)|| (Tol(endy1, starty1,1)))){
				dontShowLine1 = true;
			}
			else if(((endx2 <= startx2) || (Tol(endx2,startx2,1)))  && ((endy2 >= starty2) || (Tol(endy2, starty2,1)))){
				dontShowLine2 = true;
			}
		}

		else if(this.angle > 270 && this.angle <=360){
			if(((endx1 <= startx1) || (Tol(endx1,startx1,1))) && ((endy1 <= starty1)|| (Tol(endy1, starty1,1)))){
				dontShowLine1 = true;
			}
			else if(((endx2 >= startx2) || (Tol(endx2,startx2,1)))  && ((endy2 >= starty2) || (Tol(endy2, starty2,1)))){
				dontShowLine2 = true;
			}
		}

		if(dontShowLine1 == false){
			c.beginPath();
			c.moveTo(startx1 , starty1);
			c.lineTo(endx1, endy1);
			c.stroke();
		}

		if(dontShowLine2 == false){
			c.beginPath();
			c.moveTo(startx2 , starty2);
			c.lineTo(endx2, endy2);
			c.stroke();
		}

		//Draw two lines connecting the endpoints with the dimension line.
		c.setLineDash([1, 2]);
		c.beginPath();
		c.moveTo(this.startx, this.starty);
		c.lineTo(startx1, starty1);
		c.stroke();

		c.beginPath();
		c.moveTo(this.endx, this.endy);
		c.lineTo(startx2, starty2);
		c.stroke();
		c.setLineDash([]);

        if(this.orientation == 'fillet'){
    		c.setLineDash([1, 2]);
			c.beginPath();
			c.moveTo(this.startx, this.starty);
    		c.lineTo(this.endx, this.endy);
    		c.stroke();
    		c.setLineDash([]);
    	}

		else{
			c.lineWidth = 2;//don't draw a dimesnsion line.
		}
	}

    c.lineWidth = 2;
}

function AngularDimension(value, x, y, elementID, showDim, startx, starty){

	this.value = value;
	this.x = x;
	this.y = y;
	this.elementID = elementID;
	this.showDim = showDim;
	this.type = "angular";
	this.startx = startx;
	this.starty = starty;
	this.bbheight = 10;
	this.bbwidth = 27;
	this.selectForChange = false;
	this.insideAngle = false;

	this.drawdim = function(valuetopass,xpass,ypass,color){


	    var displayValueArray = arcDisplayValue(this.value);

	    this.caseNumber = displayValueArray[0];
	    this.displayValue = displayValueArray[1];
	    this.startOffset = displayValueArray[2];

/*
	    var radius = 25;

	    //First, find the line attached to the dimension:
	    var originx = 0;
	    var originy = 0;

	    for(var i = 0; i < lineArray.length; i++){
	        if(lineArray[i].lineID == this.elementID){
	            originx = l.startx;
	            originy = l.starty;
	        }
	    }

		var avgtheta = ((2*Math.PI - (this.displayValue+this.startOffset)*(Math.PI/180)) + (2*Math.PI - this.startOffset*(Math.PI/180)))/2;
		var xfromcentroid = radius * Math.cos(avgtheta);
		var yfromcentroid = radius * Math.sin(avgtheta);

		ypass = originy + yfromcentroid;
		xpass = originx + xfromcentroid;

*/

	    //This part of the function determines if the dimension tag is inside or outside the
	    //dimarc arc. That is, is it between the dotted line and the target line or not?


	    //First, find the maximum and minimum x and y locations based on radius distance
	    //away from centroid:

	    //For each case, calling the dotted line 0 degrees, we calculate rsin theta (max y value)
	    //and rcos theta (max x value).

	    //If (x > 0 && x < rcos(theta)) && (y > 0 && y < rsin(theta))
	    //Where 0,0 is at the l.startx, l.starty and measured in the appropriate direction
	    //based on case
	    //Then the tag is inside the angle.

        /*
	    //Next, find the distance from the origin to the tag (radius)

	    var r = Math.sqrt(Math.pow(originx-xpass,2)+Math.pow(originy - ypass,2));

	    //only taking into account case 1 (from horizontal line):
	    //console.log('case number: ',this.caseNumber);

	    if((ypass < originy) && (ypass > originy - r*Math.sin(this.displayValue*(Math.PI/180))) && (xpass > originx)){
	        //console.log('within y bounds');
	        this.insideAngle = true;
	    }
	    else{
	        this.insideAngle = false;
	    }
	    */


	    valuetopass = this.displayValue;

        //To prevent the user from selecting the angle for edit before setting the first linear dimension:
	    if(Scale == 0){
	        this.selectForChange = false;
	    }

	    if(this.selectForChange == false){
    	    valuetopass = valuetopass.toFixed(Precision);
    		this.digits = String(valuetopass).match(/\d/g).length;
    	    this.bbwidth = this.digits*8;
    		c.font = "14px Arial";
    		c.fillStyle = color;
    		c.fillText(valuetopass,xpass,ypass);
    		c.fillStyle = 'black';
	    }
	    else{
	        if(ChangePreviewValue == null){
    		    c.font = "14px Arial";
    		    c.fillStyle = 'blue';
    		    c.fillText(' |...',xpass,ypass);
    		    c.fillStyle = 'black';
	        }
	        else{
    		    c.font = "14px Arial";
    		    c.fillStyle = 'blue';
    		    c.fillText(ChangePreviewValue + '|',xpass,ypass);
    		    c.fillStyle = 'black';
	        }
	    }

	}


	this.drawdimarc = function(xtopass,ytopass){
	    var maxRadius = 25;
    	//var radius = Math.pow(Math.pow((this.x - xtopass),2)+Math.pow((this.y - ytopass),2),.5);
    	//if(radius > maxRadius){
    	    radius = maxRadius;
    	//}

		var avgtheta = ((2*Math.PI - (this.displayValue+this.startOffset)*(Math.PI/180)) + (2*Math.PI - this.startOffset*(Math.PI/180)))/2;
		var xfromcentroid = radius * Math.cos(avgtheta);
		var yfromcentroid = radius * Math.sin(avgtheta);

		var dimlineYstart = ytopass + yfromcentroid;
		var dimlineXstart = xtopass + xfromcentroid;

        //calculate the angle from the beginning of the leader line to the end of the leader line.
    	var leaderAngle = lineAngleFromOrigin(dimlineXstart,dimlineYstart,this.x,this.y);

    	//If on the left hand side of vertical, shift the endpoint to the right some amount to be on the other side of the tag:
    	if(leaderAngle > 196 && leaderAngle < 345){
    	    leaderEndx = this.x + 9*this.digits;
    	    leaderEndy = this.y - 5;
    	}
    	else{
    	    leaderEndx = this.x;
    	    leaderEndy = this.y - 5;
    	}


	    //if(this.insideAngle == true){
	        //draw an arc inside the angle:
	        ////console.log(radius, this.x, this.y, xtopass, ytopass);
    		c.beginPath();
    		c.strokeStyle = 'black';
    		c.lineWidth = .5;
    		c.arc(xtopass, ytopass, radius,2*Math.PI - (this.displayValue+this.startOffset)*(Math.PI/180),2*Math.PI - this.startOffset*(Math.PI/180),false);
    		c.stroke();

    		//draw leader line:
     		c.setLineDash([]);
    		c.beginPath();
    		c.moveTo(leaderEndx, leaderEndy);
            c.lineTo(dimlineXstart,dimlineYstart);
    		c.stroke();

            //draw the horizontal line:
    		c.setLineDash([1, 2]);
    		c.beginPath();
    		c.moveTo(xtopass, ytopass);
    		if(this.caseNumber == 1){
    		    c.lineTo(xtopass + radius, ytopass);
    		}
    		else if(this.caseNumber == 2){
    		    c.lineTo(xtopass, ytopass - radius);
    		}
    		else if(this.caseNumber == 3){
    		    c.lineTo(xtopass - radius, ytopass);
    		}
    		else if(this.caseNumber == 4){
    		    c.lineTo(xtopass, ytopass + radius);
    		}
    		c.stroke();
    		c.setLineDash([]);
    		c.lineWidth = 2;
	    //}
	    /*

    	else{

    	    //Place leader line at the mid point of the arc.
    	    /*

            var angleDelta = 0;
            var theta = lineAngleFromOrigin(xtopass, ytopass, this.x, this.y);

            if(theta > 90 && theta < 270){
                angleDelta = Math.abs(theta - 90);
            }
            else if(theta >= 0 && theta < 90 - this.displayValue){
                angleDelta = Math.abs(90 - this.displayValue - theta);
            }
            else if(theta >=270 && theta <=360){
                angleDelta = Math.abs(360-theta + 90 - this.displayValue);
            }

            //console.log(angleDelta);

    		c.beginPath();
    		c.strokeStyle = 'black';
    		c.lineWidth = .5;
    		c.arc(xtopass, ytopass, radius,2*Math.PI - (this.displayValue+this.startOffset)*(Math.PI/180),2*Math.PI - this.startOffset*(Math.PI/180),false);
    		c.stroke();


    	    //draw the horizontal line:
    		c.setLineDash([1, 2]);
    		c.beginPath();
    		c.moveTo(xtopass, ytopass);
    		if(this.caseNumber == 1){
    		    c.lineTo(xtopass + radius, ytopass);
    		}
    		else if(this.caseNumber == 2){
    		    c.lineTo(xtopass, ytopass - radius);
    		}
    		else if(this.caseNumber == 3){
    		    c.lineTo(xtopass - radius, ytopass);
    		}
    		else if(this.caseNumber == 4){
    		    c.lineTo(xtopass, ytopass + radius);
    		}
    		c.stroke();
    		c.setLineDash([]);
    		c.lineWidth = 2;
    	}
    	            */
	}

}

//d...
function AngleRelDimension(value, x, y, elementID, showDim, radstart, radend, centroidx, centroidy, radius, line1ID, line2ID, direction,handlex, handley, changemarkerx, changemarkery,displayFlippedArc){

	this.value = value;
	this.x = x;
	this.y = y;
	this.elementID = elementID;
	this.showDim = showDim;
	this.type = "relangular";
    this.radstart = radstart;
    this.radend = radend;
    this.radius = radius;
    this.centroidx = centroidx;
    this.centroidy = centroidy;
	this.bbheight = 10;
	this.bbwidth = 27;
	this.selectForChange = false;
	this.insideAngle = false;
	this.line1ID = line1ID;
	this.line2ID = line2ID;
	this.direction = direction;
	this.handlex = handlex;
	this.handley = handley;
	this.changemarkerx = changemarkerx;
	this.changemarkery = changemarkery;
    this.displayFlippedArc = displayFlippedArc;


	this.drawdim = function(valuetopass,xpass,ypass,color){

        if(this.displayFlippedArc == true){
            valuetopass = 360 - this.value;
        }
        else{
            valuetopass = this.value;
        }

        //To prevent the user from selecting the angle for edit before setting the first linear dimension:
	    if(Scale == 0){
	        this.selectForChange = false;
	    }

	    if(this.selectForChange == false){
    	    valuetopass = valuetopass.toFixed(Precision);
    		this.digits = String(valuetopass).match(/\d/g).length;
    		if(TouchMode != true){
    	        this.bbwidth = this.digits*8;
    		}
    		else{
    	        this.bbwidth = this.digits*20;
    	        this.bbheight = 20;
    		}
    		c.font = "14px Arial";
    		c.fillStyle = color;
    		c.fillText(valuetopass,xpass,ypass);
    		c.fillStyle = 'black';
	    }
	    else{
	        if(ChangePreviewValue == null){
    		    c.font = "14px Arial";
    		    c.fillStyle = 'blue';
    		    c.fillText(' |...',xpass,ypass);
    		    c.fillStyle = 'black';
	        }
	        else{
    		    c.font = "14px Arial";
    		    c.fillStyle = 'blue';
    		    c.fillText(ChangePreviewValue + '|',xpass,ypass);
    		    c.fillStyle = 'black';
	        }
	    }

	}

	this.drawdimarc = function(xtopass,ytopass){

        var radius = Math.pow(Math.pow(this.handlex - this.centroidx,2)+ Math.pow(this.handley - this.centroidy,2),.5)

        this.radius = radius;

        //calculate the angle from the beginning of the leader line to the end of the leader line.
    	var leaderAngle = lineAngleFromOrigin(this.handlex,this.handley,this.x,this.y);

    	//If on the left hand side of vertical, shift the endpoint to the right some amount to be on the other side of the tag:
    	if(leaderAngle > 196 && leaderAngle < 345){
    	    leaderEndx = this.x + 9*this.digits;
    	    leaderEndy = this.y - 5;
    	}
    	else{
    	    leaderEndx = this.x;
    	    leaderEndy = this.y - 5;
    	}

    	if(this.displayFlippedArc == true){
    	    var radstartDisplay = this.radend;
    	    var radendDisplay = this.radstart;
    	}

    	else{
     	    var radstartDisplay = this.radstart;
    	    var radendDisplay = this.radend;
    	}


            //draw the arc:
    		c.beginPath();
    		c.strokeStyle = 'black';
    		c.lineWidth = .5;
    		c.arc(this.centroidx, this.centroidy, radius,radstartDisplay,radendDisplay,false);
    		c.stroke();

    		//draw leader line:
     		c.setLineDash([]);
    		c.beginPath();
    		c.moveTo(leaderEndx, leaderEndy);
            c.lineTo(this.handlex,this.handley);
    		c.stroke();

            //reset properties:
    		c.setLineDash([]);
    		c.lineWidth = 2;
	}

	this.drawarchandle = function(color,size){
    	    //draw the radius adjust handle:
        	c.beginPath();
        	c.arc(this.handlex, this.handley, size ,0, Math.PI*2, false);
        	c.fillStyle = color
        	c.fill();
        	c.fillStyle = "black";
	}

	//Places a small symbol at the intersection of Line1 and the arc - signifies that this is the line that will move when redimensioned.
	this.drawchangemarker = function(color,size){

        //Dot should always be common to line2.

        var dontdrawit = false;

        //Need to calclate the x,y location of the start or end of the dimarc.
        var arcstartx = this.centroidx + this.radius * Math.cos(this.radstart);
	    var arcstarty = this.centroidy + this.radius * Math.sin(this.radstart);
        var arcendx = this.centroidx + this.radius * Math.cos(this.radend);
	    var arcendy = this.centroidy + this.radius * Math.sin(this.radend);

        //if the changemarker is on line 2, draw it.

        if(isonline(arcstartx, arcstarty, 'SNIP') == this.line2ID){
            this.changemarkerx = arcstartx;
            this.changemarkery = arcstarty;
        }
        else if(isonline(arcendx, arcendy, 'SNIP') == this.line2ID){
            this.changemarkerx = arcendx;
            this.changemarkery = arcendy;
        }
        else{
            dontdrawit = true;
        }

        //th...
        if(this.value > 1 && dontdrawit == false){
    	    //draw the radius adjust handle:
        	c.beginPath();
        	c.arc(this.changemarkerx, this.changemarkery, size ,0, Math.PI*2, false);
        	c.fillStyle = color
        	c.fill();
        	c.fillStyle = "black";
        }
	}

/*
	this.drawdimarc = function(centroidxtopass, centroidytopass, radstarttopass, radendtopass, radiustopass){
    	c.beginPath();
    	c.strokeStyle = 'black';
    	c.lineWidth = .5;
    	c.arc(centroidxtopass, centroidytopass, radiustopass, radstarttopass, radendtopass,false);
    	c.stroke();

    	var radius = radiustopass;

		var avgtheta = ((2*Math.PI - (this.displayValue+this.startOffset)*(Math.PI/180)) + (2*Math.PI - this.startOffset*(Math.PI/180)))/2;
		var xfromcentroid = radius * Math.cos(avgtheta);
		var yfromcentroid = radius * Math.sin(avgtheta);

		var dimlineYstart = centroidytopass + yfromcentroid;
		var dimlineXstart = centroidxtopass + xfromcentroid;

        //calculate the angle from the beginning of the leader line to the end of the leader line.
    	var leaderAngle = lineAngleFromOrigin(dimlineXstart,dimlineYstart,this.x,this.y);

    	//If on the left hand side of vertical, shift the endpoint to the right some amount to be on the other side of the tag:
    	if(leaderAngle > 196 && leaderAngle < 345){
    	    leaderEndx = this.x + 9*this.digits;
    	    leaderEndy = this.y - 5;
    	}
    	else{
    	    leaderEndx = this.x;
    	    leaderEndy = this.y - 5;
    	}

    		//draw leader line:
     		c.setLineDash([]);
    		c.beginPath();
    		//c.moveTo(leaderEndx, leaderEndy);
            c.moveTo(50, 50);
            c.lineTo(dimlineXstart,dimlineYstart);
    		c.stroke();

	}
	*/

}

function arcDisplayValue(value){

    var caseNumber = 0;
    var displayValue = 0;
    var startOffset = 0;

    if((value >= 0) && (value < 90)){
        displayValue = value;
        caseNumber = 1;
        startOffset = 0;
    }

    else if((value >= 90) && (value < 180)){
        displayValue = value - 90;
        caseNumber = 2;
        startOffset = 90;
    }

    else if((value >= 180) && (value < 270)){
        displayValue = value - 180;
        caseNumber = 3;
        startOffset = 180;
    }

    else if((value >= 270) && (value < 360)){
        displayValue = value - 270;
        caseNumber = 4;
        startOffset = 270;
    }

    var retArray = [caseNumber, displayValue, startOffset];

    return retArray;

}


//This function creates a new arc object:

function Arc(centroidx, centroidy, radius, radstart, radend, arcID, Case, fx, fy, groupID, color, endpoint1x, endpoint1y, endpoint2x, endpoint2y, line1ID, line2ID){

	this.centroidx = centroidx;
	this.centroidy = centroidy;
	this.radius = radius;
	this.radstart = radstart;
	this.radend = radend;
	this.arcID = arcID;
	this.Case = Case;
	this.fx = fx;
	this.fy = fy;
	this.groupID = groupID;
	this.color = color;
	this.endpoint1x = endpoint1x;
	this.endpoint1y = endpoint1y;
	this.endpoint2x = endpoint2x;
	this.endpoint2y = endpoint2y;
	this.line1ID = line1ID;
	this.line2ID = line2ID;
	this.midpointX = 0; //Gets set in createnewfilletdim
	this.midpointY = 0; //Gets set in createnewfilletdim

	////console.log(this.endpoint1x, this.endpoint1y, this.endpoint2x, this.endpoint2y);

	this.drawarc = function(color){

		c.beginPath();
		c.arc(this.centroidx, this.centroidy, this.radius, this.radstart, this.radend);
		c.lineWidth = 2;
		c.strokeStyle = color;
		c.stroke();

	}
}

function Label(value, xloc, yloc, labelID, leaderx, leadery, type, digits){
	this.value = value;
	this.xloc = xloc;
	this.yloc = yloc;
	this.labelID = labelID;
	this.leaderx = leaderx;
	this.leadery = leadery;
	this.type = type;

	this.drawlabel = function(value,xloc,yloc,color){
		c.font = "14px Arial";
		c.fillStyle = color;
		c.fillText(value,xloc,yloc);
		c.fillStyle = 'black';
		this.digits = String(this.value).match(/\d/g).length;
		if(String(this.value).startsWith("-")){
			this.digits = this.digits + 1;
		}

		if(leaderx != 0){
			c.lineWidth = .5;
			c.beginPath();
			c.moveTo(this.xloc -2, this.yloc - 3);
			c.lineTo(this.leaderx, this.leadery);
			c.stroke();
			c.lineWidth = 2;
		}

	}
}

function TopText(text,x,y){
    this.text = text;
    this.x = x;
    this.y = y;

    this.drawTopText = function(text,x,y){
		c.font = "14px Arial";
		c.fillStyle = 'black';
		c.fillText(text,x,y);
    }

}

function StartText(text, vertoffset){
    //turned off for now:
    /*

    if(window.innerWidth < canvas.width){
        var x = window.innerWidth/2 - 170;
    }
    else{
        var x = canvas.width/2 - 170;
    }

    if(window.innerHeight < canvas.height){
        var y = window.innerHeight/2 - 80;
    }
    else{
        var y = canvas.height/2 - 80;
    }

    if(vertoffset != null){
        y = y + vertoffset;
    }

    if(StartTextOff != true){
    	c.font = "20px Arial";
    	c.fillStyle = 'black';
    	c.fillText(text,x,y);
    }
    */
}


function updateTopText(Mode,FileName){

    TopTextValue.text = 'Drawing Mode: ' + Mode + ' | File: ' + FileName;
    Redraw();

}

function Load(x,y){

	this.x = x;
	this.y = y;

	this.drawLoadPoint = function(x,y,color){
		c.fillStyle = color;
		c.beginPath();
		c.arc(x,y,5, Math.PI*2, false);
		c.fill();
		c.font = "9px Arial";
		c.fillStyle = "white";
		c.fillText("L",x-2,y+3);
		c.fillStyle = 'black';

	}

}

function FilletCutoutPixel(x,y,GroupID){
	this.x = x;
	this.y = y;
	this.GroupID = GroupID;
}

function SRP(x,y,SRPid){

	this.x = x;
	this.y = y;
	this.SRPid = SRPid;

	labelArray.push(new Label(0, this.x + 15, this.y -15,this.SRPid, this.x, this.y,"SRP", 0));

	this.drawSRP = function(x,y,color,SRPid){
		c.fillStyle = color;
		c.beginPath();
		c.arc(x,y,5, Math.PI*2, false);
		c.fill();
		if(SRPid < 10){
			c.font = "9px Arial";
			c.fillStyle = "white";
			c.fillText(SRPid,x-2,y+3);
		}
		else{
			c.font = "9px Arial";
			c.fillStyle = "white";
			c.fillText(SRPid,x-5,y+3);
		}

		c.fillStyle = 'black';
	}
}

function coordinateSystem(){

		c.lineWidth = 2;

		CScenterx = CsysX;
		CScentery = CsysY;

		c.strokeStyle = "black";

		c.beginPath();
		c.moveTo(CScenterx, CScentery);
		c.lineTo(CScenterx + 30, CScentery);
		c.stroke();

		c.beginPath();
		c.moveTo(CScenterx, CScentery);
		c.lineTo(CScenterx, CScentery - 30);
		c.stroke();

		c.beginPath();
		c.arc(CScenterx,CScentery,5, Math.PI*2, false);
		c.fill();

		c.font = "14px Arial";
		c.fillText("X" ,CScenterx + 32, CScentery);
		c.fillText("Y" ,CScenterx, CScentery - 30);
		c.fillText("Z" ,CScenterx + 5, CScentery - 5);

		c.fillStyle = "grey";

		c.beginPath();
		c.arc(CScenterx,CScentery,2, Math.PI*2, false);
		c.fill();

		c.fillStyle = "black";


}

//creates a line and adds it to the array:
function createNewLine(mode){

    var lineendx = 0;
    var lineendy = 0;
    var endpointSnap = isonendpoint('snap');
    var suggestSnapArray = suggestHVSnap('end', endpointSnap[3]);
    var snappedToEndpoint = false;
	var centroid = isoncentroid();
	var zerozero = isonzerozero();

    //For HVsnapped scenario, and regular mode the snaps work differently.
    if(ControlDown == false){
        if(drawingHV == true){
            if(centroid == true){
        		lineendx = MasterCx/Scale;
        		lineendy = MasterCy/Scale;
            }
            else if(zerozero == true){
        		lineendx = zeroX;
        		lineendy = zeroY;
            }
        	else if(endpointSnap[0] == true){
        		lineendx = endpointSnap[1];
        		lineendy = endpointSnap[2];
        		snappedToEndpoint = true;
        	}
            else if(suggestSnapArray[0] == true){
        	    lineendx = suggestSnapArray[1];
        	    lineendy = suggestSnapArray[2];
            }

            else{
        	    lineendx = previewLine.endx;
        	    lineendy = previewLine.endy;
            }
        }

        else{
            if(centroid == true){
        		lineendx = MasterCx/Scale;
        		lineendy = MasterCy/Scale;
            }
            else if(zerozero == true){
        		lineendx = zeroX;
        		lineendy = zeroY;
            }
        	else if(endpointSnap[0] == true){
        		lineendx = endpointSnap[1];
        		lineendy = endpointSnap[2];
        		snappedToEndpoint = true;
        	}
        	else{
        		lineendx = previewLine.endx;
        		lineendy = previewLine.endy;
        	}
        }
    }
	else{
		lineendx = previewLine.endx;
		lineendy = previewLine.endy;
	}

    //Calculate the angle of the line as drawn (this might be overwritten by snap):
    var angle = lineAngleFromOrigin(previewLine.startx, previewLine.starty, lineendx, lineendy);

    //transform angle to start at x axis and go positive C.C:
    angle = angle - 90;
    if(angle <= 0){
    	angle = angle + 360;
    }
    angle = 360 - angle;

    var suggestedAngle = suggestAngleSnaps(previewLine.startx,previewLine.starty,dragFromLineID);
    if(suggestedAngle != 999 && snappedToEndpoint == false){
        angle = suggestedAngle;
    }

    //Assign line properties:
    lineArray.push(new Line(previewLine.startx, previewLine.starty, lineendx, lineendy,0,0,0,0,angle));
    l = lineArray[lineArray.length - 1];
    l.lineID = ElementID;
    l.lineLength = Math.sqrt(Math.pow(l.startx-l.endx,2)+Math.pow(l.starty - l.endy,2));

    //Set last Selecteds so that user can change length as entered.

    LastSelectedDimID = ElementID;
    LastSelectedDimType = "linear";

    if(ConstructionLineMode == true || mode == 'constLine'){
    	l.constLine = true
    }

    //plant the initial midpoint:
    l.midpointX = (l.startx + l.endx)/2;
    l.midpointY = (l.starty + l.endy)/2;

    var dimXpos = l.startx + 2;
    var dimYpos = l.starty - 10;
    var actLength = l.lineLength * Scale;

    //call a function that defines offsets based on line data:
    var offsetArray = findOffsets(actLength, l.startx, l.starty, l.endx, l.endy, angle);

    var dimYpos = offsetArray[0];
    var dimXpos = offsetArray[1];
    var xoffset1 = offsetArray[2];
    var yoffset1 = offsetArray[3];
    var xoffset2 = offsetArray[4];
    var yoffset2 = offsetArray[5];
    var dimYpos_a = offsetArray[6];
    var dimXpos_a = offsetArray[7];
    var perpOffset = offsetArray[8];

    var dimlineYstart = l.starty;
    var dimlineYend = l.endy;
    var dimlineXstart = l.startx;
    var dimlineXend = l.endx;
    var orientation = "angled";

    //Sets the preview value in 'editable' font.
    ChangePreviewValue = actLength.toFixed(Precision);
    document.getElementById('inputBox').value = actLength;

    //for the first line, need to set it back to null:
    if(ChangePreviewValue == 0){
        ChangePreviewValue = null;
    }

	//SDF

    var showthedim = true;

    //Hide the dimension if it's too short.
    if(l.lineLength < 20){
        var showthedim = false;
    }

    //console.log('showthedim: ', showthedim)

    linearDimArray.push(new LinearDimension(actLength, l.midpointX-10, l.midpointY+5, ElementID, showthedim, dimlineXstart, dimlineYstart, dimlineXend, dimlineYend,orientation,0,0,0,0,0,0,0,0,0,angle,xoffset1, yoffset1, xoffset2, yoffset2, perpOffset));

    d = linearDimArray[linearDimArray.length - 1];
    d.selectForChange = true;

    var dimLineLength = Math.sqrt(Math.pow((dimlineYstart-dimlineYend),2)+Math.pow((dimlineXstart-dimlineXend),2));

    var showAngulardim = true;

    //Angulardims are a deprecated feature that have been replaced by relangledims. Always off.

    showAngularDim = false;

    /*
    //No reason to show the angular dimension if it is snapped to 90s.
    if(angle == 0 || angle == 90 || angle == 180 || angle == 270){
        showAngularDim = false;
    }
    else{
        showAngularDim = true;
    }
    */


    if(dimLineLength != 0){
    	//create a dim with type property of "angle".
    	AngularDimArray.push(new AngularDimension(angle, dimXpos_a, dimYpos_a, ElementID, showAngularDim, l.startx, l.starty));
    }

    if(Scale != 0){
    	//hide the last linear dimension:
    	if(linearDimArray.length > 1){
    	    d = linearDimArray[linearDimArray.length - 2];
    		//d.showDim = false;
    	}

    	//hide the last angular dimension:
    	if(AngularDimArray.length > 1){
            //d = AngularDimArray[AngularDimArray.length - 2];
    		//d.showDim = false;
    	}
    }

    //clear the previewLine data:
    previewLine.startx = 0;
    previewLine.starty = 0;
    previewLine.endx = 0;
    previewLine.endy = 0;

    //turn on HV snaps again. Always want this on for choosing endpoints for new lines.
    drawingHV = true;

    //In the event the user has unsucsessfully tried to create the first line, always go back to focus on the input box.

    var numoflines = lineArray.length;
    var numoflinesforprint = 'New Line Drawn. Number of lines: '+ numoflines.toString()
    var lineidtoprint = 'Line ID: ' + l.lineID.toString()

    if(lineArray.length == 1){
        var lengthoflinetoprint = 'Length: ' + actLength.toFixed(2).toString() +'(may be first line)'
    }
    else{
        var lengthoflinetoprint = 'Length: ' + actLength.toFixed(2).toString()
    }
    var angleoflinetoprint = 'Angle: ' + angle.toFixed(2).toString()


    var startoflinetoprint = 'Start: ' + '('+l.startx.toFixed(2).toString() + ', ' + l.starty.toFixed(2).toString() + ')'
    var endoflinetoprint = 'End: ' + '('+ l.endx.toFixed(2).toString() + ', ' + l.endy.toFixed(2).toString() + ')'

    //PrintToLog(lineidtoprint);
    //PrintToLog(lengthoflinetoprint);
    //PrintToLog(angleoflinetoprint);
    //PrintToLog(startoflinetoprint);
    //PrintToLog(endoflinetoprint);

    snappedToStartpoint = getStartSnap(l.lineID, l.startx, l.starty)

    var snapState = ', Not Snapped';

    if(snappedToStartpoint != 999 && snappedToEndpoint != true){
        var snapState = ', Startpoint Snapped';
    }

    if(snappedToEndpoint == true && snappedToStartpoint == 999){
        var snapState = ', Startpoint Snapped';
    }

    if(snappedToEndpoint == true && snappedToStartpoint != 999){
        var snapState = ', Both Ends Snapped';
    }

    var numoflinesforprint = 'New Line Drawn. Number of lines: ' + numoflines.toString() + snapState;

    PrintToLog(numoflinesforprint);


    if(Scale == 0 && lineArray.length == 1){
    	//clears dimension input box and focuses for dimension entry:
    	//document.getElementById('inputBox').value = "";
    	//document.getElementById("inputBox").focus();
    	//document.getElementById("inputBox").select;

    	displayFirstDimAlert();
    }

}

function getStartSnap(lineid, x, y){


    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];
    	if (Math.pow(Math.pow(l.startx - x,2)+ Math.pow(l.starty - y,2),.5) < .5){
            if(lineid != l.lineID){
    	        return l.lineID;
            }
    	}

    	if (Math.pow(Math.pow(l.endx - x,2)+ Math.pow(l.endy - y,2),.5) < .5){
            if(lineid != l.lineID){
    	        return l.lineID;
            }
    	}
    }

    return 999;
}




function findOffsets(dim, startx, starty, endx, endy, angle){

////console.log('Find Offsets');
//ASD

	//Choose a starting location for the dimension:
	var	dimYpos = (starty + endy)/2 + 5;
	var	dimXpos = (startx + endx)/2 - 10;
	var xoffset1 = 0;
	var yoffset1 = 0;
	var xoffset2 = 0;
	var yoffset2 = 0;
	var perpOffset = 0;
	var dimXpos_a = 0;
	var dimYpos_a = 0;

    //For more dynamic line stuff, get the number of digits to be displayed.
	var valuetopass = dim.toFixed(Precision);
	var digits = String(valuetopass).match(/\d/g).length;

	/*

	//based on different angles, place label in logical place:
	if((angle > 0 && angle <=30) || angle == 0){
	    ////console.log('c1');
		dimYpos = (starty + endy)/2 - 10;
		dimXpos = (startx + endx)/2 - 20;
		xoffset1 = 5;
		yoffset1 = 5;
		xoffset2 = 40;
		yoffset2 = 40;
		perpOffset = 5;
	}

	else if(angle > 30 && angle <=60){
	    ////console.log('c2');
		dimYpos = (starty + endy)/2 - 10;
		dimXpos = (startx + endx)/2 - 40;
		xoffset1 = 0;
		yoffset1 = 0;
		xoffset2 = 25;
		yoffset2 = 25;
		perpOffset = -5;
	}
	else if(angle > 60 && angle <=90){
	    ////console.log('c3');
		dimYpos = (starty + endy)/2;
		dimXpos = (startx + endx)/2 - 40;
		xoffset1 = 10;
		yoffset1 = 10;
		xoffset2 = 20;
		yoffset2 = 20;
		perpOffset = -15;
	}
	else if(angle > 90 && angle <=120){
	    ////console.log('c4');
		dimYpos = (starty + endy)/2;
		dimXpos = (startx + endx)/2 + 5;
		xoffset1 = 15;
		yoffset1 = 15;
		xoffset2 = 15;
		yoffset2 = 15;
		perpOffset = -17;
	}
	else if(angle > 120 && angle <=150){
	    ////console.log('c5');
		dimYpos = (starty + endy)/2 - 10;
		dimXpos = (startx + endx)/2 + 5;
		xoffset1 = 30;
		yoffset1 = 30;
		xoffset2 = 10;
		yoffset2 = 10;
		perpOffset = -15;
	}
	else if(angle > 150 && angle <=180){
	    ////console.log('c6');
		dimYpos = (starty + endy)/2 - 10;
		dimXpos = (startx + endx)/2 - 10;
		xoffset1 = 40;
		yoffset1 = 40;
		xoffset2 = 10;
		yoffset2 = 10;
		perpOffset = -5;
	}
	else if(angle > 180 && angle <=210){
	    ////console.log('c7');
		dimYpos = (starty + endy)/2 - 10;
		dimXpos = (startx + endx)/2 - 40;
		xoffset1 = 45;
		yoffset1 = 45;
		xoffset2 = 10;
		yoffset2 = 10;
		perpOffset = -3;
	}
	else if(angle > 210 && angle <=240){
	    ////console.log('c8');
		dimYpos = (starty + endy)/2;
		dimXpos = (startx + endx)/2 - 50;
		xoffset1 = 35;
		yoffset1 = 35;
		xoffset2 = 10;
		yoffset2 = 10;
		perpOffset = 5;
	}
	else if(angle > 240 && angle <=270){
	    ////console.log('c9');
		dimYpos = (starty + endy)/2;
		dimXpos = (startx + endx)/2 - 50;
		xoffset1 = 25;
		yoffset1 = 25;
		xoffset2 = 10;
		yoffset2 = 10;
		perpOffset = 15;
	}
	else if(angle > 270 && angle <=300){
	    ////console.log('c10');
		dimYpos = (starty + endy)/2;
		dimXpos = (startx + endx)/2 + 5;
		xoffset1 = 15;
		yoffset1 = 15;
		xoffset2 = 15;
		yoffset2 = 15;
		perpOffset = 15;
	}
	else if(angle > 300 && angle <=330){
	    ////console.log('c11');
		dimYpos = (starty + endy)/2 - 10;
		dimXpos = (startx + endx)/2;
		xoffset1 = 10;
		yoffset1 = 10;
		xoffset2 = 30;
		yoffset2 = 30;
		perpOffset = 15;
	}
	else if(angle > 330 && angle <=360){
	    ////console.log('c12');
		dimYpos = (starty + endy)/2 - 10;
		dimXpos = (startx + endx)/2 - 10;
		xoffset1 = 10;
		yoffset1 = 10;
		xoffset2 = 40;
		yoffset2 = 40;
		perpOffset = 5;
	}

	if((angle > 0 && angle <=90) || angle == 0){
		dimYpos_a = starty + 20;
		dimXpos_a = startx + 30;
	}
	else if(angle > 90 && angle <=180){
		dimYpos_a = starty - 30;
		dimXpos_a = startx + 1;
	}
	else if(angle > 180 && angle <=270){
		dimYpos_a = starty - 1;
		dimXpos_a = startx - 70;
	}
	else if(angle > 270 && angle <=360){
		dimYpos_a = starty + 50;
		dimXpos_a = startx - 30;
	}

	*/
	retArray = [dimYpos,dimXpos,xoffset1,yoffset1,xoffset2,yoffset2,dimYpos_a,dimXpos_a,perpOffset];

	return retArray;
}

//Goes through all dimensions and updates offsets. Used when the precsion is changed.
function updateOffsets(){

    //For each line, update the offsets.
    for(var j = 0; j < lineArray.length; j ++){
        l = lineArray[j];
		//Calculate the angle of the line:
		var angle = lineAngleFromOrigin(l.startx, l.starty, l.endx, l.endy);

		//transform angle to start at x axis and go positive C.C:
		angle = angle - 90;
		if(angle <= 0){
			angle = angle + 360;
		}
		angle = 360 - angle;

	    var actLength = l.lineLength * Scale;

	    //call a function that defines offsets based on line data:
        var offsetArray = findOffsets(actLength, l.startx, l.starty, l.endx, l.endy, angle);
    	var xoffset1 = offsetArray[2];
    	var yoffset1 = offsetArray[3];
    	var xoffset2 = offsetArray[4];
    	var yoffset2 = offsetArray[5];
    	var perpOffset = offsetArray[8];

        for(var i = 0; i < linearDimArray.length; i++){
    		d = linearDimArray[i];
    		if(d.elementID == l.lineID){
                d.xoffset1 = xoffset1;
                d.yoffset1 = yoffset1;
                d.xoffset2 = xoffset2;
                d.yoffset2 = yoffset2;
                d.perpOffset = perpOffset;
    		}
    	}
    }

    //For each fillet, update the offset:
    for(var i = 0; i < arcArray.length; i++){
        a = arcArray[i];
        updateFilletDim(a.arcID);
    }

}

//creates a line and adds it to the array:
function createNewLineSnip(linestartx, linestarty, lineendx, lineendy, constLine){

        //because it isn't called in the main loop, this function needs to increment EID on it's own.
        ElementID += 1;

		//Calculate the angle of the line:
		var angle = lineAngleFromOrigin(linestartx, linestarty, lineendx, lineendy);

		//transform angle to start at x axis and go positive C.C:
		angle = angle - 90;
		if(angle <= 0){
			angle = angle + 360;
		}
		angle = 360 - angle;

		//Assign line properties:
		lineArray.push(new Line(linestartx, linestarty, lineendx, lineendy,0,0,0,0,angle));
		l = lineArray[lineArray.length - 1];
		l.lineID = ElementID;
		l.lineLength = Math.sqrt(Math.pow(l.startx-l.endx,2)+Math.pow(l.starty - l.endy,2));
		l.constLine = constLine;
		l.midpointX = (l.startx + l.endx)/2;
        l.midpointY = (l.starty + l.endy)/2;

		//Set last Selecteds so that user can change length as entered.

		LastSelectedDimID = ElementID;
		LastSelectedDimType = "linear";


	var dimXpos = l.startx + 2;
	var dimYpos = l.starty - 10;

	var actLength = l.lineLength * Scale;

    //call a function that defines offsets based on line data:
    var offsetArray = findOffsets(actLength, l.startx, l.starty, l.endx, l.endy, angle);

    var dimYpos = offsetArray[0];
	var dimXpos = offsetArray[1];
	var xoffset1 = offsetArray[2];
	var yoffset1 = offsetArray[3];
	var xoffset2 = offsetArray[4];
	var yoffset2 = offsetArray[5];
	var dimYpos_a = offsetArray[6];
	var dimXpos_a = offsetArray[7];
	var perpOffset = offsetArray[8];

	var dimlineYstart = l.starty;
	var dimlineYend = l.endy;
	var dimlineXstart = l.startx;
	var dimlineXend = l.endx;
	var orientation = "angled";

	linearDimArray.push(new LinearDimension(actLength, dimXpos, dimYpos, ElementID, true,dimlineXstart, dimlineYstart, dimlineXend, dimlineYend,orientation,0,0,0,0,0,0,0,0,0,angle,xoffset1, yoffset1, xoffset2, yoffset2, perpOffset));

	var dimLineLength = Math.sqrt(Math.pow((dimlineYstart-dimlineYend),2)+Math.pow((dimlineXstart-dimlineXend),2));

	if(dimLineLength != 0){
		//create a dim with type property of "angle".
		AngularDimArray.push(new AngularDimension(angle, dimXpos_a, dimYpos_a, ElementID, false, l.startx, l.starty));
	}

	//clears dimension input box and focuses for dimension entry:
	document.getElementById('inputBox').value = "";

	return ElementID;
}

//Returns true if n1 and n2 are within +/- tolerance of each other.
function Tol(n1,n2,tolerance){
    var upperlimit = n1 + tolerance;
    var lowerlimit = n1 - tolerance;

    if((n2 >= lowerlimit) && (n2 <= upperlimit)){
        return true;
    }

    else{
        if((n2 - lowerlimit) < 1 && (n2 - lowerlimit) > -1){
        }
        return false;
    }

}

function drawDragLines(x, y){
    //See if the drag line instersects a line:
    var intersectingLine = 999;
    var intersectingFillet = 999;

    if(dragLinesArray.length > 1){
        var lastDragLinePoint = dragLinesArray[dragLinesArray.length - 1];
        intersectingLine = Intersection(lastDragLinePoint[0], lastDragLinePoint[1], x, y);
        intersectingFillet = arcIntersection(lastDragLinePoint[0], lastDragLinePoint[1], x, y);
    }
    dragLinesArray.push([x,y]);

    var intersectingArray = [intersectingLine, intersectingFillet];

    return intersectingArray;
}

//goes through endpoints to see if anything is outside of the canvas window.
function inboundsCheck(){
    var maxX = canvas.width - 10;
    var maxY = canvas.height - 10;
    var inBounds = true;

    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];
        if(l.startx > maxX || l.starty > maxY || l.endx > maxX || l.endy > maxY){
            inBounds = false;
        }
    }

    return inBounds;

}
function numberOfConnectedLinesAndArcs(keepRels){

    //Add tolerance capability to arcs!
	//go through each line and check endpoints for sameness across all other lines.
	//note the number of lines with at least two shared nodes. If this number is not equal to the number of lines, the section is open.

	var connectedLines = 0;
	var tolerance = .001;

	//clear connectedpointsarray:
	connectedPointsArray = [];

    //Start with counting the lines that are connected at both endpoints to lines or arcs:
	for(var i = 0; i < lineArray.length; i++){
		var nodeCount = 0;
		var startxconnected = false;
		var endxconnected = false;
		l1 = lineArray[i];
		if(l1.constLine != true){
			for(var j = 0; j< lineArray.length; j++){
				l2 = lineArray[j];
				if(l1.lineID != l2.lineID){
					if(Tol(l1.startx,l2.startx,tolerance) && Tol(l1.starty,l2.starty,tolerance) && startxconnected == false && l2.constLine != true){
						nodeCount ++;
						connectedPointsArray.push([l1.startx,l1.starty]);
						startxconnected = true;
					}
				//WAS: else if for the rest of these.
					if(Tol(l1.startx,l2.endx,tolerance) && Tol(l1.starty,l2.endy,tolerance) && startxconnected == false && l2.constLine != true){
						nodeCount ++;
						connectedPointsArray.push([l1.startx,l1.starty]);
						startxconnected = true;
					}
					if(Tol(l1.endx,l2.startx,tolerance) && Tol(l1.endy,l2.starty,tolerance) && endxconnected == false && l2.constLine != true){
						nodeCount ++;
						connectedPointsArray.push([l1.endx,l1.endy]);
						endxconnected = true;
					}
					if(Tol(l1.endx,l2.endx,tolerance) && Tol(l1.endy,l2.endy,tolerance) && endxconnected == false && l2.constLine != true){
						nodeCount ++;
						connectedPointsArray.push([l1.endx,l1.endy]);
						endxconnected = true;
					}
				}
			}

			for(var j = 0; j< arcArray.length; j++){
				l2 = arcArray[j];
				if(Tol(l1.startx,l2.endpoint1x,tolerance) && Tol(l1.starty,l2.endpoint1y,tolerance) && startxconnected == false){
					nodeCount ++;
					connectedPointsArray.push([l1.startx,l1.starty]);
					startxconnected = true;
				}
				//WAS: else if for the rest of these.
				if(Tol(l1.startx,l2.endpoint2x,tolerance) && Tol(l1.starty,l2.endpoint2y,tolerance) && startxconnected == false){
					nodeCount ++;
					connectedPointsArray.push([l1.startx,l1.starty]);
					startxconnected = true;
				}
				if(Tol(l1.endx,l2.endpoint1x,tolerance) && Tol(l1.endy,l2.endpoint1y,tolerance) && endxconnected == false){
					nodeCount ++;
					connectedPointsArray.push([l1.endx,l1.endy]);
					endxconnected = true;
				}
				if(Tol(l1.endx,l2.endpoint2x,tolerance) && Tol(l1.endy,l2.endpoint2y,tolerance) && endxconnected == false){
					nodeCount ++;
					connectedPointsArray.push([l1.endx,l1.endy]);
					endxconnected = true;
				}
			}
		}
		if(nodeCount > 1){
			connectedLines ++;
		}
		////console.log("lines: ", connectedLines);
	}

    //Next, find the arcs connected at both endpoints to lines or arcs:
	for(var i = 0; i < arcArray.length; i++){
		var nodeCount = 0;
		var startxconnected = false;
		var endxconnected = false;
		l1 = arcArray[i];
			for(var j = 0; j< lineArray.length; j++){
				l2 = lineArray[j];
				if(Tol(l1.endpoint1x,l2.startx,tolerance) && Tol(l1.endpoint1y,l2.starty,tolerance) && startxconnected == false && l2.constLine != true){
					nodeCount ++;
					connectedPointsArray.push([l2.startx,l2.starty]);
					startxconnected = true;
				}
				//WAS: else if for the rest of these.
				if(Tol(l1.endpoint1x,l2.endx,tolerance) && Tol(l1.endpoint1y,l2.endy,tolerance) && startxconnected == false && l2.constLine != true){
					nodeCount ++;
					connectedPointsArray.push([l2.endx,l2.endy]);
					startxconnected = true;
				}
				if(Tol(l1.endpoint2x,l2.startx,tolerance) && Tol(l1.endpoint2y,l2.starty,tolerance) && endxconnected == false && l2.constLine != true){
					nodeCount ++;
					connectedPointsArray.push([l2.startx,l2.starty]);
					endxconnected = true;
				}
				if(Tol(l1.endpoint2x,l2.endx,tolerance) && Tol(l1.endpoint2y,l2.endy,tolerance) && endxconnected == false && l2.constLine != true){
					nodeCount ++;
					connectedPointsArray.push([l2.endx,l2.endy]);
					endxconnected = true;
				}
		    }
			for(var j = 0; j< arcArray.length; j++){
				a2 = arcArray[j];
				if(a2.arcID != l1.arcID){
    				if(Tol(l1.endpoint1x,a2.endpoint1x,tolerance) && Tol(l1.endpoint1y,a2.endpoint1y,tolerance) && startxconnected == false){
    					nodeCount ++;
    					connectedPointsArray.push([l1.endpoint1x,l1.endpoint1y]);
    					startxconnected = true;
    				}
				//WAS: else if for the rest of these.
    				if(Tol(l1.endpoint1x,a2.endpoint2x,tolerance) && Tol(l1.endpoint1y,a2.endpoint2y,tolerance) && startxconnected == false){
    					nodeCount ++;
    					connectedPointsArray.push([l1.endpoint1x,l1.endpoint1y]);
    					startxconnected = true;
    				}
    				if(Tol(l1.endpoint2x,a2.endpoint1x,tolerance) && Tol(l1.endpoint2y,a2.endpoint1y,tolerance) && endxconnected == false){
    					nodeCount ++;
    					connectedPointsArray.push([l1.endpoint2x,l1.endpoint2y]);
    					endxconnected = true;
    				}
    				if(Tol(l1.endpoint2x,a2.endpoint2x,tolerance) && Tol(l1.endpoint2y,a2.endpoint2y,tolerance) && endxconnected == false){
    					nodeCount ++;
    					connectedPointsArray.push([l1.endpoint2x,l1.endpoint2y]);
    					endxconnected = true;
    				}
				}
		    }
		if(nodeCount > 1){
			connectedLines ++;
		}
	}


	//To clean up unwanted reldims (say, after a snip...) compare the contents of the connectedPointsArray to the centroids of the relDims. If the rel dim
	//is not at a connectedPointArray location, delete it. Don't do this if called from an Undo of a delete fillet. We still want that dimension.
//tt...

    if(keepRels != true){
    	for(var j = 0; j < relAngleArray.length; j++){
    	    var keep = false;
        	for(var i = 0; i < connectedPointsArray.length; i++){
        	    if((relAngleArray[j].centroidx == connectedPointsArray[i][0]) && (relAngleArray[j].centroidy == connectedPointsArray[i][1])){
                    keep = true;
        	    }
        	}

        //Also, if the centroid is on a ghost point for two lines, don't delete it.
            var keepcount = 0;
        	for(var i = 0; i < lineArray.length; i++){
        	    if((Tol(relAngleArray[j].centroidx,lineArray[i].startxghost, .0001) && Tol(relAngleArray[j].centroidy,lineArray[i].startyghost,.0001)) || (Tol(relAngleArray[j].centroidx,lineArray[i].endxghost,.0001) && Tol(relAngleArray[j].centroidy,lineArray[i].endyghost,.0001))){
                    keepcount += 1;
        	    }
        	}

        	if(keepcount ==2){
        	    keep = true;
        	}

        	if(keep == false){
        	    deletedim(relAngleArray[j].elementID);
        	    Redraw();
        	}
    	}
    }


	////console.log("connected Lines: ", connectedLines);
	return connectedLines;
}

function removeZeroLengthLines(){
    var tolerance = 1.1;
    var removedlineID = 999;
	for(var i = 0; i < lineArray.length; i++){
		l = lineArray[i];

		if(Tol(l.startx, l.endx,tolerance) && Tol(l.starty,l.endy,tolerance)){

			lineArray.splice(i, 1);

            var numoflines = lineArray.length;
            if(drawingMode == 'snip'){
                var numoflinesforprint = 'Line ' +l.lineID.toString() +' Deleted. Number of lines: '+ numoflines.toString()
                PrintToLog(numoflinesforprint);
            }
            //console.log(numoflinesforprint)


			removedlineID = l.lineID;
			for(var j =0; j < linearDimArray.length; j++){
				d = linearDimArray[j];
				if(l.lineID == d.elementID){
					linearDimArray.splice(j, 1);
				}
			}
			for(var j =0; j < AngularDimArray.length; j++){
				a = AngularDimArray[j];
				if(l.lineID == a.elementID){
					AngularDimArray.splice(j, 1);
				}
			}
			for(var j =0; j < relAngleArray.length; j++){
				a = relAngleArray[j];
				if(l.lineID == a.line1ID || l.lineID == a.line2ID){
					relAngleArray.splice(j, 1);
				}
			}
		}
	}
	//Also, a common error is a line that starts at 0,0. Delete those too.
	for(var i =0; i < lineArray.length; i++){
			l = lineArray[i];
			if(l.startx == 0 || l.starty == 0 || l.endx == 0 || l.endy == 0 ){
				lineArray.splice(i, 1);
				for(var j =0; j < linearDimArray.length; j++){
					d = linearDimArray[j];
					if(l.lineID == d.elementID){
						linearDimArray.splice(j, 1);
					}
				}
    			for(var j =0; j < AngularDimArray.length; j++){
    				a = AngularDimArray[j];
    				if(l.lineID == a.elementID){
    					AngularDimArray.splice(j, 1);
    				}
    			}
			}
		}

	//Also, delete any lines with spurious endpoints.
	for(var i =0; i < lineArray.length; i++){
			l = lineArray[i];
			if(l.startx == undefined || l.starty == undefined || l.endx == undefined || l.endy == undefined){
				lineArray.splice(i, 1);
				for(var j =0; j < linearDimArray.length; j++){
					d = linearDimArray[j];
					if(l.lineID == d.elementID){
						linearDimArray.splice(j, 1);
					}
				}
    			for(var j =0; j < AngularDimArray.length; j++){
    				a = AngularDimArray[j];
    				if(l.lineID == a.elementID){
    					AngularDimArray.splice(j, 1);
    				}
    			}
			}
		}

	//Last, delete any lines with length NaN:
	for(var i =0; i < lineArray.length; i++){
			l = lineArray[i];
			if(isNaN(l.lineLength)){
				lineArray.splice(i, 1);
				for(var j =0; j < linearDimArray.length; j++){
					d = linearDimArray[j];
					if(l.lineID == d.elementID){
						linearDimArray.splice(j, 1);
					}
				}
    			for(var j =0; j < AngularDimArray.length; j++){
    				a = AngularDimArray[j];
    				if(l.lineID == a.elementID){
    					AngularDimArray.splice(j, 1);
    				}
    			}
			}
		}

		return removedlineID;
}

function removeZeroDegreeFillets(){
    var tolerance = 1;
    for(var i = 0; i< arcArray.length; i++){
        a = arcArray[i];
        if(Tol(a.endpoint1x,a.endpoint2x,tolerance) && Tol(a.endpoint1y,a.endpoint2y,tolerance)){
            deletefillet(a.arcID,false,true);
        }
    }
}

//A beautiful and quick array fill-in function based on line intersects.
function FillIn(){

    var numberOfRects = 500;
    rectArray = [];

    var minx = 99999999;
    var maxx = 0;
    //Find the leftmost point:
    for(var i = 0; i < lineArray.length; i++){
        if(lineArray[i].startx < minx){
            minx = lineArray[i].startx;
        }
        if(lineArray[i].endx < minx){
            minx = lineArray[i].endx;
        }
        if(lineArray[i].startx > maxx){
            maxx = lineArray[i].startx;
        }
        if(lineArray[i].endx > maxx){
            maxx = lineArray[i].endx;
        }
    }

    //Find centers to calculate intercepts at.
    var centers = []
    var xwidth = (maxx - minx)/numberOfRects;
    var currentx = minx + xwidth / 2;
    for(var i = 0; i < numberOfRects; i++){
        centers.push(currentx)
        currentx = currentx + xwidth;
    }


    var mxb = [];
    //Go through line array and get m and b for each line.
    for(var i = 0; i < lineArray.length; i++){
        var m = 0;
        var b = 0;
        if((lineArray[i].startx - lineArray[i].endx) != 0){
            m = (lineArray[i].starty - lineArray[i].endy)/((lineArray[i].startx - lineArray[i].endx));
            b = (lineArray[i].starty - m*lineArray[i].startx);
        }
        else{
            m = 'vert';
            b = 'vert';
        }
        mxb.push([m,b,Math.min(lineArray[i].startx,lineArray[i].endx),Math.max(lineArray[i].startx, lineArray[i].endx)]);
    }

    var yints = [];
    //For each center, find where line intercepts are.
    for(var i = 0; i < centers.length; i++){
        centerx = centers[i];
        var yintspresort = [];
        for(var j = 0; j < mxb.length; j++){
            m = mxb[j][0];
            b = mxb[j][1];
            var min = mxb[j][2];
            var max = mxb[j][3];
            if(centerx > min && centerx < max && m != 'vert'){
                yintspresort.push(m*centerx+b)
            }
        }

        //sort the points in the yintspresort array by y value.
        yintspresort.sort(function(a, b){return a - b});

        for(var j=0; j < yintspresort.length; j++){
            yints.push([centerx, yintspresort[j]]);
        }


    }

    if(yints.length % 2 == 0){
        //Make pairs out of the points. Turn those into rectangle objects.
        for(var i = 0; i < yints.length; i = i + 2){
            var centerx = yints[i][0]
            var topy = yints[i][1]
            var bottomy = yints[i+1][1]

            var centroidy = bottomy - (bottomy-topy)/2;

            //rectArray.push(new Rectangle(centerx, topy,10,10, 'black', 1));
            //rectArray.push(new Rectangle(centerx, bottomy,10,10, 'black', 1));

            rectArray.push(new Rectangle(centerx, centroidy,xwidth,bottomy-topy, 'black', 1));
        }
    }
    //console.log('FillIn Called.')

}

//new version - if any line is not connected to at least two other lines, the section is open.
function closeOrOpenSection(keepRels){

    var PackagedArray = packageForPy(lineArray,arcArray);

    var PackagedArraytoSend = JSON.stringify(PackagedArray);

    var linesAndArcs = numberOfNonConstLinesandArcs();
    if(keepRels != true){
        var connnectedLinesAndArcs = numberOfConnectedLinesAndArcs();
    }
    else if(keepRels == true){
         var connnectedLinesAndArcs = numberOfConnectedLinesAndArcs(true);
    }
    if((linesAndArcs == connnectedLinesAndArcs) && lineArray.length > 0){
        ////console.log('Closed');
        ////console.log(linesAndArcs,connnectedLinesAndArcs);
        //FillIn();
        CancelledRequest = false;
        return true;
    }
    else{
        ClearStressVis();
        MasterCx = 0
        MasterCy = 0;
		ZeroX = 0;
		ZeroY = 0;
        CancelledRequest = true;
        document.getElementById("loader").style.visibility = "hidden";
        return false;
    }


    //For early stage diagnostics, write to the server log the json file that can be opened and examined.

    //CurrentPointer

    /*
		//checks to see how many nodal connections exist. If the same number of lines and nodes have been created, the section is closed.
	if(numberOfConnectedLines() == numberOfNonConstLines() && rectsDetected == false && lineArray.length > 0){
		ClosedSection = true;
		detectRects();
		Redraw();
		WasClosed = true;

		//hide the last dimension:
		d = linearDimArray[linearDimArray.length - 1];
		d.showDim = false;
	}
	else if(WasClosed == true && numberOfConnectedLines() != numberOfNonConstLines()){
		//if the section was closed, but now it isn't:
		//reset back to state before sections were detected.
		//Clear the color and rasterArray arrays:
			for(var tx = 0; tx < canvas.width; tx++){
				for(var ty = 0; ty < canvas.height; ty++){
					var index = (ty * canvas.width + tx) * 4;
					var color = 'background';
					rasterArray[index / 4] = color;
					colorit(color, tx, ty);
				}
			}
		//Clear the leftlines:
		leftLineArray = [];
		//Don't clear rectArray. Changed to facillitate chrono memory for section detection.
		//rectArray = [];
		yArrayRaw = [];
		yArraySorted = [];
		Redraw();
		WasClosed = false;
		rectsDetected = false;
		ClosedSection = false;
	}
*/
}

function ClearStressVis(mode){

    if(StressGradientShown == true){
        //Momentarily clear the screen:
        c.clearRect(0,0,innerWidth, innerHeight);
        imageData = c.getImageData(0, 0, canvas.width, canvas.height);
        data = imageData.data;
        //document.getElementById("outputBox").value = "";
        StressGradientShown = false;
        dispCx = 0;
        zeroX = 0;

        //hide the results popup:
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("results").style.visibility = "hidden";
        document.getElementById("resultsgrab").style.visibility = "hidden";
        document.getElementById("outputpopuptext").style.visibility = "hidden";
        document.getElementById("resultsheader").style.visibility = "hidden";
        document.getElementById("resultskeepout").style.visibility = "hidden";
        if(mode != "moveload"){
            loadArray = [];
            ShowMax = false;
        }

        //Load the ribbon text for the active mode.
        if(drawingMode == 'lines' && ConstructionLineMode == false){
        	Button2Clicked();
        }

        if(drawingMode == 'lines' && ConstructionLineMode == true){
        	ConstLinesClicked();
        }

        if(drawingMode == 'fillets'){
        	Button3Clicked_2();
        }

        if(drawingMode == 'snip'){
        	SnipClicked();
        }

        if(drawingMode == 'erase'){
        	EraseClicked();
        }

        if(drawingMode == 'linearDim'){
        	DimLinesClicked();
        }

        if(drawingMode == 'angledimbetweenlines'){
        	DimAnglessClicked();
        }
        Redraw();
    }

};


function numberOfNonConstLinesandArcs(){
	var count = 0;
	for(i = 0; i < lineArray.length; i++){
		l = lineArray[i];
		if(l.constLine != true){
			count ++;
		}
	}
	for(i = 0; i < arcArray.length; i++){
		count ++;
	}
	return count;
}

//sets the startpoint for a line preview:
function linePreviewStart(){

    if(ControlDown == false){
        if(firstAfterLoad == false){
        	var endpointSnap = isonendpoint('snap');
        	var suggestSnapArray = suggestHVSnap('start');
        	dragFromLineID = 999;
        	var centroid = isoncentroid();
    		var zerozero = isonzerozero();

            if(centroid == true){
        		previewStartx = MasterCx/Scale;
        		previewStarty = MasterCy/Scale;
            }

            else if(zerozero == true){
        		previewStartx = zeroX;
        		previewStarty = zeroY;
            }

        	else if(endpointSnap[0] == 1){
        		previewStartx = endpointSnap[1];
        		previewStarty = endpointSnap[2];
        		dragFromLineID = endpointSnap[3];
        	}

        	else if(suggestSnapArray[0] == true){
        		previewStartx = suggestSnapArray[1];
        		previewStarty = suggestSnapArray[2];
        	}


        	else{
        		previewStartx = mouse.x;
        		previewStarty = mouse.y;
        	}
        }

        else{
            var endpointSnap = isonendpoint('snap');
        	if(endpointSnap[0] == 1){
        		previewStartx = endpointSnap[1];
        		previewStarty = endpointSnap[2];
        		dragFromLineID = endpointSnap[3];
        	}
            else{
        		previewStartx = mouse.x;
        		previewStarty = mouse.y;
        	}
        	firstAfterLoad = false;
        }
    }

	else{
        previewStartx = mouse.x;
        previewStarty = mouse.y;
	}

}

//Create a preview line.
function linePreviewDrag(mode){

	var retArray = [];
	var endx = 0;
	var endy = 0;

    if(ConstructionLineMode == true || mode == 'constLine'){
        previewLine = new Line(previewStartx, previewStarty, mouse.x, mouse.y, null, null, null, true);
    }
    else{
        previewLine = new Line(previewStartx, previewStarty, mouse.x, mouse.y, null, null, null, false);
    }




	//If in horizontal/vertical snap mode.
	if(ControlDown == false){

        var endpointSnap = isonendpoint('snap');
    	var centroid = isoncentroid();
    	var zerozero = isonzerozero();

        if(centroid == true){
    		endx = MasterCx/Scale;
    		endy = MasterCy/Scale;
        }
        else if(zerozero == true){
    		endx = zeroX;
    		endy = zeroY;
        }
    	else if(endpointSnap[0] == true){
    		endx = endpointSnap[1];
    		endy = endpointSnap[2];
    	}
    	else{
    	    suggestedAngle = suggestAngleSnaps(previewLine.startx,previewLine.starty,dragFromLineID);

    	    if(suggestedAngle == 999){
    	        endx = mouse.x;
    		    endy = mouse.y;
    	    }

    	    else{
    	        //calculate the length at the moment of snap, then snap to a length
    	        //of line at that moment with the snapped to angle:
                var endPtArray = angleSnapPreviewEndpoints(mouse.x,mouse.y, suggestedAngle);
                endx = endPtArray[0];
                endy = endPtArray[1];
    	    }
    	}
	}

	else{
	       endx = mouse.x;
		   endy = mouse.y;
	}

	previewLine.endx = endx;
    previewLine.endy = endy;

	if(endx != 0){
		previewLine.endx = endx;
	}
	else if(endy != 0){
		previewLine.endy = endy;
	}

	previewLine.drawline(LineColor);

}

function angleSnapPreviewEndpoints(mousex,mousey,angle){

    var lineLength = Math.sqrt(Math.pow(previewLine.startx-mousex,2)+Math.pow(previewLine.starty - mousey,2));

    //find x and y locations for line with the length "lineLength" and angle of "angle";
    var x = previewLine.startx + lineLength * Math.cos(angle*(Math.PI/180));
    var y = previewLine.starty - lineLength * Math.sin(angle*(Math.PI/180));

    var retArray = [x, y];
    return retArray;
}

//Suggests snaps at 0, 30, 45, 60, 90 in all directions from origin of line.
//If the line starts with a snapped endpoint to another line, draw snap suggestions
//based on angle from that line.
function suggestAngleSnaps(startx,starty,baseLineID){
    //First, very basic step of drawing lines to the edge of the screen from the origin
    //at desired angles based on input angle.

    ////console.log('angle snap centroid: ', startx,starty)
    if(startx == 0 && starty == 0){
        return 0;
    }

    var masterShift = 0;
    var snapAngle = 999;;

    //Get the angle of the line from which the line is snapped.
    for(var i = 0; i < lineArray.length; i++){
        if(lineArray[i].lineID == baseLineID){
          var masterShift = lineArray[i].angle;
        }
    }

    //Array of angles to suggest:
    //Was": var suggestedAnglesBase = [0,30,45,60,90];
    var suggestedAnglesBase = [0,45,90];
    var shifts = [0,90,180,270];
    var suggestedAngles = [0,90,180,270];
    var snapLineData = [];

    for(var i = 0; i< shifts.length; i++){
        for(var j = 0; j < suggestedAnglesBase.length; j++){
            var addToList = shifts[i] + suggestedAnglesBase[j] + masterShift;
            suggestedAngles.push(addToList);
        }
    }

    var lineLength = 10000;
    var angle = 0;

    //The first four lines are the perpendicular lines. These get drawn in different color.
    for(var i = 0; i < 4; i++){
        angle = suggestedAngles[i];
        //Calculate endx and endy for each of the suggested angles:
        var endx = startx + lineLength * Math.cos(angle*(Math.PI/180));
        var endy = starty - lineLength * Math.sin(angle*(Math.PI/180));

        var snapLineDataSub = [startx, starty, endx, endy, angle];
        snapLineData.push(snapLineDataSub);

        c.lineWidth = 1;
    	c.setLineDash([3,3]);
    	c.strokeStyle = "blue";
    	c.beginPath();
    	c.moveTo(startx,starty);
    	c.lineTo(endx, endy);
    	c.stroke();
    }

    for(var i = 4; i < suggestedAngles.length; i++){
        angle = suggestedAngles[i];
        //Calculate endx and endy for each of the suggested angles:
        var endx = startx + lineLength * Math.cos(angle*(Math.PI/180));
        var endy = starty - lineLength * Math.sin(angle*(Math.PI/180));

        var snapLineDataSub = [startx, starty, endx, endy, angle];
        snapLineData.push(snapLineDataSub);

        c.lineWidth = 1;
    	c.setLineDash([3,3]);
    	c.strokeStyle = "blue";
    	c.beginPath();
    	c.moveTo(startx,starty);
    	c.lineTo(endx, endy);
    	c.stroke();
    }

    //Now that the data for the lines has been developed, see if the cursor is on any of them.

    for(var i = 0; i < snapLineData.length; i++){
        sl = snapLineData[i];

    	var calcdLineLength = Math.sqrt(Math.pow(sl[0]-sl[2],2)+Math.pow(sl[1] - sl[3],2));
		//Calculates mouse distance from the starting point of the line:
		var dist_from_start = Math.sqrt(Math.pow(sl[0]-mouse.x,2)+Math.pow(sl[1] - mouse.y,2));
		//Calculates mouse distance from the ending point of the line:
		var dist_from_end = Math.sqrt(Math.pow(sl[2]- mouse.x,2)+Math.pow(sl[3] - mouse.y,2));
		var closeness = Math.abs(calcdLineLength - dist_from_start- dist_from_end);

		if((closeness < .5) && (ControlDown == false)){
        	snapAngle = sl[4];
		}
    }

    if(snapAngle == 0 || snapAngle % 90 == 0){
        drawingHV = true;
    }
    else{
        drawingHV = false;
    }

    //Need to clean up the angle so that it is always less than or equal to 360.

    if((snapAngle != 999) && (snapAngle >= 360)){
        RetsnapAngle = snapAngle - 360;
    }
    else{
        RetsnapAngle = snapAngle;
    }

    return RetsnapAngle;
}


//accepts start and endpoints for a line - uses this information in conjuction with mouse position to determine horizontal or vertical snap.
function HVsnap(startx, starty){
	var angle = lineAngleFromOrigin(startx, starty, mouse.x, mouse.y);
	var endx = 0;
	var endy = 0;

	if((angle >= 315 || angle <45) || (angle >= 135 && angle <225)){
		//Make the line vertical.
		endx = startx;
	}
	else if((angle >= 45 && angle <135) || (angle >= 225 && angle <315)) {
		//Make the line horizontal.
		endy = starty;
	}

	//the end snapped end values are returned. Value is 0 if not to be changed.
	var retArray = [endx, endy];
	return retArray;

}

function isoncentroid(){
	var distToCentroid = Math.pow((Math.pow(MasterCx / Scale - (mouse.x - xRelative),2))+Math.pow(MasterCy / Scale - (mouse.y - yRelative),2),.5);
	if(distToCentroid < 10){
	    //drawEndpoint((MasterCx/Scale),(MasterCy/Scale));
		return true;
	}
	else{
		return false;
	}
}

function isonzerozero(){
	var distTozerozero = Math.pow((Math.pow(zeroX - (mouse.x - xRelative),2))+Math.pow(zeroY - (mouse.y - yRelative),2),.5);
	if(distTozerozero < 10){
	    //drawEndpoint(zeroX,zeroY);
		return true;
	}
	else{
		return false;
	}
}

function arcEndpoints(centroid, radius, radstart, radend){
//This function takes data from a to-be-created fillet and uses is to find the two endpoints associated with that arc.
    var endpoint1 = 1;
    var endpoint2 = 2;

    return [endpoint1, endpoint2];
}


//detects closeness of endpoints from other lines and returns coordinates of closest one.
function isonendpoint(mode,dragFromLine, useAux, auxX, auxY){
    if(TouchMode == false){
	    var endpoint_snap_dist = 5;
    }
    else{
	    var endpoint_snap_dist = 15;
    }
	var retArray = [0,0,0];
	var endpoint_detected = false;
	var x_snap = 0;
	var y_snap = 0;
	var snappedLine = 999;
	var sx = 0;
	var sy = 0;
	var ex = 0;
	var ey = 0;
	var x = 0;
	var y = 0;

	var startorend = 'null';

	if(useAux == true){
		x = auxX;
		y = auxY;
	}
	else{
		x = mouse.x - xRelative;
		y = mouse.y - yRelative;
	}

//For Lines:
	for(var i = 0; i < lineArray.length; i ++){
		l = lineArray[i];
		if(mode == 'fillets'){
			if(l.constLine != true){
				if (Math.pow(Math.pow(l.startx - x,2)+ Math.pow(l.starty - y,2),.5) < endpoint_snap_dist){
					sx = l.startx;
					sy = l.starty;
					ex = l.endx;
					ey = l.endy;
					snappedLine = l.lineID;
					x_snap = sx;
					y_snap = sy;
					startorend = 'start';
					endpoint_detected = true;
				}

				else if (Math.pow(Math.pow(l.endx - x,2)+ Math.pow(l.endy - y,2),.5) < endpoint_snap_dist){
					sx = l.startx;
					sy = l.starty;
					ex = l.endx;
					ey = l.endy;
					snappedLine = l.lineID;
					x_snap = ex;
					y_snap = ey;
					startorend = 'end';
					endpoint_detected = true;
				}
			}
		}
		else{

		    //The first two are for endpoints.
			if (Math.pow(Math.pow(l.startx - x,2)+ Math.pow(l.starty - y,2),.5) < endpoint_snap_dist){
				sx = l.startx;
				sy = l.starty;
				ex = l.endx;
				ey = l.endy;
				snappedLine = l.lineID;
				x_snap = sx;
				y_snap = sy;
				startorend = 'start';
				endpoint_detected = true;
			}

			else if (Math.pow(Math.pow(l.endx - x,2)+ Math.pow(l.endy - y,2),.5) < endpoint_snap_dist){
				sx = l.startx;
				sy = l.starty;
				ex = l.endx;
				ey = l.endy;
				snappedLine = l.lineID;
				x_snap = ex;
				y_snap = ey;
				startorend = 'end';
				endpoint_detected = true;
			}

			//These last one is for midpoints:
            /*
			else if (Math.pow(Math.pow(l.midpointX - x,2)+ Math.pow(l.midpointY - y,2),.5) < endpoint_snap_dist){
			    if(TouchMode != true){
    				sx = l.startx;
    				sy = l.starty;
    				ex = l.midpointX;
    				ey = l.midpointY;
    				snappedLine = l.lineID;
    				x_snap = ex;
    				y_snap = ey;
    				startorend = 'end';
    				endpoint_detected = true;
			    }

			    else if(TouchMode == true){
			        //writedebugToOutputbox(l.lineLength);
			        if(l.lineLength > 50){
        				sx = l.startx;
        				sy = l.starty;
        				ex = l.midpointX;
        				ey = l.midpointY;
        				snappedLine = l.lineID;
        				x_snap = ex;
        				y_snap = ey;
        				startorend = 'end';
        				endpoint_detected = true;
			        }
			    }
			}
			*/



			//also, be able to snap to the centroid if you want:
			else if (Math.pow(Math.pow(MasterCx/Scale - x,2)+ Math.pow(MasterCy/Scale - y,2),.5) < endpoint_snap_dist){
				sx = l.startx;
				sy = l.starty;
				ex = MasterCx/Scale;
				ey = MasterCy/Scale;
				//snappedLine = l.lineID;
				x_snap = ex;
				y_snap = ey;
				startorend = 'end';
				endpoint_detected = true;
			}

			//...or the zero-zero marker:
			else if (Math.pow(Math.pow(zeroX - x,2)+ Math.pow(zeroY - y,2),.5) < endpoint_snap_dist){
				sx = l.startx;
				sy = l.starty;
				ex = zeroX;
				ey = zeroY;
				//snappedLine = l.lineID;
				x_snap = ex;
				y_snap = ey;
				startorend = 'end';
				endpoint_detected = true;
			}
		}
	}

//For Arcs:
    if(mode != 'linesonly'){
        for(var i = 0; i < arcArray.length; i++){
            ////console.log(i);

            a = arcArray[i];

            ////console.log(a.endpoint1x, a.endpoint1y, a.endpoint2x, a.endpoint2y)

    		if (Math.pow(Math.pow(a.endpoint1x - x,2)+ Math.pow(a.endpoint1y - y,2),.5) < endpoint_snap_dist){
    			sx = a.endpoint1x;
    			sy = a.endpoint1y;
    			ex = a.endpoint2x;
    			ey = a.endpoint2y;
    			snappedLine = a.arcID;
    			x_snap = sx;
    			y_snap = sy;
    			startorend = 'start';
    			endpoint_detected = true;
    		}

    		if (Math.pow(Math.pow(a.endpoint2x - x,2)+ Math.pow(a.endpoint2y - y,2),.5) < endpoint_snap_dist){
    			ex = a.endpoint2x;
    			ey = a.endpoint2y;
    			sx = a.endpoint1x;
    			sy = a.endpoint1y;
    			snappedLine = a.arcID;
    			x_snap = ex;
    			y_snap = ey;
    			startorend = 'end';
    			endpoint_detected = true;
    		}

        }
    }



	if(mode == 'draggingMode' && firstLineDrawn == true) {

		//Here, we disinclude the line of origin from possible snaps:

		if(endpoint_detected == true){
			if(dragFromLineID == snappedLine){
				return [false, 0, 0, 999];
			}

			else{
				if(startorend == 'start'){
					drawEndpoint(sx, sy);
				}
				else{
					drawEndpoint(ex, ey);
				}
				return [true, x_snap, y_snap, snappedLine];
			}
		}
	}



	else{
		if(endpoint_detected == true){
			if(startorend == 'start'){
				drawEndpoint(sx, sy);
			}
			else{
				drawEndpoint(ex, ey);
			}
			return [true, x_snap, y_snap, snappedLine];
		}
		else{
			return [false, 0, 0, 999];
		}
	}
}

//detects closeness of endpoints from specific lines and returns location if found.
function specificendpoint(mode,dragFromLine, useAux, auxX, auxY,lID1, lID2){
	var endpoint_snap_dist = 5;
	var retArray = [0,0,0];
	var endpoint_detected = false;
	var x_snap = 0;
	var y_snap = 0;
	var snappedLine = 999;
	var sx = 0;
	var sy = 0;
	var ex = 0;
	var ey = 0;
	var x = 0;
	var y = 0;

	var startorend = 'null';

	if(useAux == true){
		x = auxX;
		y = auxY;
	}
	else{
		x = mouse.x - xRelative;
		y = mouse.y - yRelative;
	}

//For Lines:
	for(var i = 0; i < lineArray.length; i ++){
		l = lineArray[i];
		if(mode == 'fillets'){
			if(l.constLine != true){
				if ((Math.pow(Math.pow(l.startx - x,2)+ Math.pow(l.starty - y,2),.5) < endpoint_snap_dist) && (l.lineID == lID1 || l.lineID == lID2)){
					sx = l.startx;
					sy = l.starty;
					ex = l.endx;
					ey = l.endy;
					snappedLine = l.lineID;
					x_snap = sx;
					y_snap = sy;
					startorend = 'start';
					endpoint_detected = true;
				}

				else if ((Math.pow(Math.pow(l.endx - x,2)+ Math.pow(l.endy - y,2),.5) < endpoint_snap_dist) && (l.lineID == lID1 || l.lineID == lID2)){
					sx = l.startx;
					sy = l.starty;
					ex = l.endx;
					ey = l.endy;
					snappedLine = l.lineID;
					x_snap = ex;
					y_snap = ey;
					startorend = 'end';
					endpoint_detected = true;
				}
			}
		}
		else{

		    //The first two are for endpoints.
			if ((Math.pow(Math.pow(l.startx - x,2)+ Math.pow(l.starty - y,2),.5) < endpoint_snap_dist) && (l.lineID == lID1 || l.lineID == lID2)){
				sx = l.startx;
				sy = l.starty;
				ex = l.endx;
				ey = l.endy;
				snappedLine = l.lineID;
				x_snap = sx;
				y_snap = sy;
				startorend = 'start';
				endpoint_detected = true;
			}

			else if ((Math.pow(Math.pow(l.endx - x,2)+ Math.pow(l.endy - y,2),.5) < endpoint_snap_dist) && (l.lineID == lID1 || l.lineID == lID2)){
				sx = l.startx;
				sy = l.starty;
				ex = l.endx;
				ey = l.endy;
				snappedLine = l.lineID;
				x_snap = ex;
				y_snap = ey;
				startorend = 'end';
				endpoint_detected = true;
			}

			//These last one is for midpoints:
			else if ((Math.pow(Math.pow(l.midpointX - x,2)+ Math.pow(l.midpointY - y,2),.5) < endpoint_snap_dist) && (l.lineID == lID1 || l.lineID == lID2)){
				sx = l.startx;
				sy = l.starty;
				ex = l.midpointX;
				ey = l.midpointY;
				snappedLine = l.lineID;
				x_snap = ex;
				y_snap = ey;
				startorend = 'end';
				endpoint_detected = true;
			}

			//also, be able to snap to the centroid if you want:
			else if ((Math.pow(Math.pow(MasterCx/Scale - x,2)+ Math.pow(MasterCy/Scale - y,2),.5) < endpoint_snap_dist) && (l.lineID == lID1 || l.lineID == lID2)){
				sx = l.startx;
				sy = l.starty;
				ex = MasterCx/Scale;
				ey = MasterCy/Scale;
				//snappedLine = l.lineID;
				x_snap = ex;
				y_snap = ey;
				startorend = 'end';
				endpoint_detected = true;
			}

			//...or the zero-zero marker:
			else if ((Math.pow(Math.pow(zeroX - x,2)+ Math.pow(zeroY - y,2),.5) < endpoint_snap_dist) && (l.lineID == lID1 || l.lineID == lID2)){
				sx = l.startx;
				sy = l.starty;
				ex = zeroX;
				ey = zeroY;
				//snappedLine = l.lineID;
				x_snap = ex;
				y_snap = ey;
				startorend = 'end';
				endpoint_detected = true;
			}
		}
	}

	if(endpoint_detected == true){
		if(startorend == 'start'){
			drawEndpoint(sx, sy);
		}
		else{
			drawEndpoint(ex, ey);
		}
		return [true, x_snap, y_snap, snappedLine];
	}
	else{
		return [false, 0, 0, 999];
	}

}

//This approach is backwards. Define where the fillets are then fill them. Don't look for them based on some sort of raster.
//First, raster through entire box and set to inside color. Makes sense to do this at creation of fillet?
//need function that deals with one arc at a time. This function must:

//determine bounding box.
//be able to detect pixels in the radius of the arc.
//color pixels in bounding box but not in radius of arc.

function fillFillet(elID){
//this function generates a bounding square around the fillet passed into it, dude.

	for(var i = 0; i < arcArray.length; i ++){
		z = arcArray[i];
		if(z.arcID == elID){
			a = arcArray[i];
		}
	}
		var x = 0;
		var y = 0;
		var h = Math.ceil(a.radius);
		var w = Math.ceil(a.radius);

		var inOrOut = filletInOrOut(elID)[0];
		var groupIDcolor = filletInOrOut(elID)[1];
		var groupID = parseInt(groupIDcolor.substr(5),10);
		a.groupID = groupID;

		//draw a box with extremes at the arc ends:
		switch(a.radstart){
			case 0:
			a.Case = 0;
				var xstart = Math.floor(a.centroidx);
				var ystart = Math.floor(a.centroidy);
				for(y = ystart; y < ystart + h; y++){
					for(x = xstart; x < xstart + w; x++){
						var dist_to_centroid = Math.pow(Math.pow(Math.abs(x - a.centroidx),2) + Math.pow(Math.abs(y - a.centroidy),2),.5);
						if(dist_to_centroid >= a.radius){
							if(inOrOut == 'in'){
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(currentColor == undefined || currentColor == 'background' || currentColor == groupIDcolor){
									colorit('background',x,y);
									FilletCutoutList.push(new FilletCutoutPixel(x,y,groupID));
								}
							}
							else{
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(isInFilletCutoutList(x,y,groupID) == false){
									colorit(groupIDcolor,x,y);
								}
							}
						}
					}
				}
			break;
			case Math.PI/2:
			a.Case = 1;
				xstart = Math.floor(a.centroidx - a.radius);
				ystart = Math.floor(a.centroidy);
				for(y = ystart; y < ystart + h; y++){
					for(x = xstart; x < xstart + w; x++){
						var dist_to_centroid = Math.pow(Math.pow(Math.abs(x - a.centroidx),2) + Math.pow(Math.abs(y - a.centroidy),2),.5);
						if(dist_to_centroid >= a.radius){
							if(inOrOut == 'in'){
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(currentColor == undefined || currentColor == 'background'|| currentColor == groupIDcolor){
									colorit('background',x,y);
									FilletCutoutList.push(new FilletCutoutPixel(x,y,groupID));
								}
							}
							else{
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(isInFilletCutoutList(x,y,groupID) == false){
									colorit(groupIDcolor,x,y);
								}
							}
						}
					}
				}
			break;
			case Math.PI:
			a.Case = 2;
				xstart = Math.floor(a.centroidx - a.radius);
				ystart = Math.floor(a.centroidy - a.radius);

				for(y = ystart; y < ystart + h; y++){
					for(x = xstart; x < xstart + w; x++){
						var dist_to_centroid = Math.pow(Math.pow(Math.abs(x - a.centroidx),2) + Math.pow(Math.abs(y - a.centroidy),2),.5);
						if(dist_to_centroid >= a.radius){
							if(inOrOut == 'in'){
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(currentColor == undefined || currentColor == 'background'|| currentColor == groupIDcolor){
									colorit('background',x,y);
									FilletCutoutList.push(new FilletCutoutPixel(x,y,groupID));
								}
							}
							else{
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(isInFilletCutoutList(x,y,groupID) == false){
									colorit(groupIDcolor,x,y);
								}
							}
						}
					}
				}
			break;
			case 3*(Math.PI/2):
			a.Case = 3;
				xstart = Math.floor(a.centroidx);
				ystart = Math.floor(a.centroidy - a.radius);
				for(y = ystart; y < ystart + h; y++){
					for(x = xstart; x < xstart + w; x++){
						var dist_to_centroid = Math.pow(Math.pow(Math.abs(x - a.centroidx),2) + Math.pow(Math.abs(y - a.centroidy),2),.5);
						if(dist_to_centroid >= a.radius){
							if(inOrOut == 'in'){
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(currentColor == undefined || currentColor == 'background'|| currentColor == groupIDcolor){
									colorit('background',x,y);
									FilletCutoutList.push(new FilletCutoutPixel(x,y,groupID));
								}
							}
							else{
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(isInFilletCutoutList(x,y,groupID) == false){
									colorit(groupIDcolor,x,y);
								}
							}
						}
					}
				}
			break;
		}
		a.side = inOrOut;
		filletInOrOut(elID)[0];
}

function isInFilletCutoutList(x,y,groupID){
//This function goes through FilletCutoutList and returns true if the x and y pair are in the set  of fillet cutout pxs for the given group. Returns false otherwise.

var retVar = false;

for(var i = 0; i < FilletCutoutList.length; i++){
	var fc = FilletCutoutList[i];
	if(fc.GroupID == groupID){
		if(fc.x == x && fc.y == y){
			retVar = true;
		}
	}
}

return retVar;

}

function filletInOrOut(elID){

	//Needs to recognize pixels that are in any group but own as outside.

	var retArray = [];

	for(var i = 0; i < arcArray.length; i ++){
		z = arcArray[i];
		if(z.arcID == elID){
			a = arcArray[i];
		}
	}
		var x = 0;
		var y = 0;
		var x2 = 0;
		var y2 = 0;

		//s is the number of pixels to count away from the specified location.
		var s = 2;

		//determine if in or out.
		switch(a.radstart){
			case 0:
			x = Math.round(a.centroidx + a.radius) - s;
			y = Math.round(a.centroidy) + s;

			break;
			case Math.PI/2:
			x = Math.round(a.centroidx - a.radius) + s;
			y = Math.round(a.centroidy) + s;

			break;
			case Math.PI:
			x = Math.round(a.centroidx - a.radius) + s;
			y = Math.round(a.centroidy) - s;

			break;
			case 3*(Math.PI/2):
			x = Math.round(a.centroidx + a.radius) - s;
			y = Math.round(a.centroidy) - s;

			break;
		}

			//Locations on other side of line:
		switch(a.radstart){
			case 0:
			x2 = Math.round(a.centroidx + a.radius) + s;
			y2 = Math.round(a.centroidy) + s;

			break;
			case Math.PI/2:
			x2 = Math.round(a.centroidx - a.radius) - s;
			y2 = Math.round(a.centroidy) + s;

			break;
			case Math.PI:
			x2 = Math.round(a.centroidx - a.radius) - s;
			y2 = Math.round(a.centroidy) - s;

			break;
			case 3*(Math.PI/2):
			x2 = Math.round(a.centroidx + a.radius) + s;
			y2 = Math.round(a.centroidy) - s;

			break;
		}
			var index = (y * canvas.width + x);
			var index2 = (y2 * canvas.width + x2);

			TempDispPointX = x;
			TempDispPointY = y;

			//TempDispPointX2 = x2;
			//TempDispPointY2 = y2;

			var tempvar = 0;
			var tempvar2 = 0;

			if(rasterArray[index] != undefined){
				tempvar = rasterArray[index].substr(0,5);
			}

			if(rasterArray[index2] != undefined){
				tempvar2 = rasterArray[index2].substr(0,5);
			}
			var index = (y * canvas.width + x);

			TempDispPointX = x;
			TempDispPointY = y;

			if(rasterArray[index] == undefined || rasterArray[index] == 'background'){
				switch(a.radstart){
					case 0:
					x = Math.round(a.centroidx + a.radius) + s;
					y = Math.round(a.centroidy) + s;
					////console.log('case 1');

					break;
					case Math.PI/2:
					x = Math.round(a.centroidx - a.radius) - s;
					y = Math.round(a.centroidy) + s;
					////console.log('case 2');

					break;
					case Math.PI:
					x = Math.round(a.centroidx) - s;
					y = Math.round(a.centroidy- a.radius) - s;
					////console.log('case 3');

					break;
					case 3*(Math.PI/2):
					x = Math.round(a.centroidx) + s;
					y = Math.round(a.centroidy - a.radius) - s;
					////console.log('case 4');

					break;
				}
				//draw location of X and Y coords to check.
				index = (y * canvas.width + x);
				retArray = ['out', rasterArray[index]];
				////console.log('---------');
				////console.log('out');
			}

			else if(rasterArray[index] == 'inside' || (rasterArray[index]).slice(0,5) == "group"){
				retArray = ['in', rasterArray[index]];
				////console.log('---------');
				////console.log('in');
			}

		return retArray;
}

function fillChamfer(elID){
//this function generates a bounding square around the chamfer passed into it, dude.


	for(var i = 0; i < chamferArray.length; i ++){
		z = chamferArray[i];
		if(z.ChamferID == elID){
			a = chamferArray[i];
		}
	}
		var xstart = Math.round(a.topleftx);
		var ystart = Math.round(a.toplefty);
		var h = Math.round(a.chamferDim);
		var w = Math.round(a.chamferDim);
		var cn = a.caseNumber;
		var io = a.inOrOut;
		var gID = a.groupID;

		////console.log(a.groupID);

		//raster through the bounding box. Make one side of the triangle the outside color

		if(cn == 1 || cn == 2 || cn == 5 || cn == 6){
			for(var y = ystart; y <= ystart + h; y++){
				for(var x = xstart; x <= xstart + w; x++){
					if(cn == 1 || cn == 2){
						if(io == 'in'){
							if((y-ystart) >= (x - xstart)){
								colorit('chamferCutout', x, y);
							}
						}
						else if(io == 'out'){
							if((y-ystart) >= (x - xstart)){
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								//Need to add conditional that also applies background or gID to pixels marked as chamferCutout.
								if(currentColor == undefined || currentColor == 'background'){
									colorit(gID, x, y);
								}
							}
						}
					}
					if(cn == 5 || cn == 6){
							if(io == 'in'){
								if((y-ystart) <= (x - xstart)){
									colorit('chamferCutout', x, y);
								}
							}
							else if(io == 'out'){
								if((y-ystart) <= (x - xstart)){
									var index = (y * canvas.width + x);
									var currentColor = rasterArray[index];
									if(currentColor == undefined || currentColor == 'background'){
										colorit(gID, x, y);
									}
								}
							}

						}

				}
			}
		}

		if(cn == 3 || cn == 4 || cn == 7 || cn == 8){
			for(var x = xstart; x <= xstart + w; x++){
				for(var y = ystart; y <= ystart + h; y++){
					if(cn == 3 || cn == 4){
						if(io == 'in'){
							if((y - ystart) <= (a.chamferDim - (x - xstart))){
								colorit('chamferCutout', x, y);
							}
						}
						else if(io == 'out'){
							if((y - ystart) <= (a.chamferDim - (x - xstart))){
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(currentColor == undefined || currentColor == 'background'){
									colorit(gID, x, y);
								}
							}
						}
					}
					if(cn == 7 || cn == 8){
						if(io == 'in'){
							if((y - ystart) >= (a.chamferDim - (x - xstart))){
								colorit('chamferCutout', x, y);
							}
						}
						else if(io == 'out'){
							if((y - ystart) >= (a.chamferDim - (x - xstart))){
								var index = (y * canvas.width + x);
								var currentColor = rasterArray[index];
								if(currentColor == undefined || currentColor == 'background'){
									colorit(gID, x, y);
								}
							}
						}

					}
				}
			}
		}

}
function cycleColorArray(){
	if(colorIndex < colorArray.length){
		colorIndex ++;
	}
	else{
	colorIndex = 0;
	}

	return colorArray[colorIndex];

}

function colorLines(){

	var color = 'background';
	var linesFound = 0;
	var arrayIndex = 0;
	var tl_x = 0;
	var tl_y = 0;
	var tl_x1 = 0;
	var tl_y1 = 0;
	var firsttime = true;

	//1) Color all bounding lines red. Store color of each pixel in rasterArray:

	for (var y = 0; y < canvas.height; ++y) {
		for (var x = 0; x < canvas.width; ++x) {
			var index = (y * canvas.width + x) * 4;

			var lineItsOn = (isonline(x,y,'Fill'));

			//rastering from top to bottom, check to see if a line is intersected:

			if (x == 0){
				color = 'background';
			}

			if ((lineItsOn != 999) && linesFound == 0){
				linesFound += 1;
				color = 'line';
				//Record location of top left pixel.
				if (tl_y == 0){
					tl_y = y;
				}
				if(y == tl_y + 3 && firsttime == true){
					firsttime = false;
					tl_y1 = y;
					tl_x1 = x;
				}

			}
			//if it's on a line and the last px was filled, fill it.
			else if ((lineItsOn != 999) && linesFound != 0){
				linesFound += 1;
				color = 'line';
			}

			//if it's not on a line and the last px was filled, don't fill it.
			else if ((lineItsOn == 999) && linesFound > 1){
				linesFound = 0;
				color = 'background';
			}

			else{
				linesFound = 0;
				color = 'background';
			}



		//set that pixel to the determined color.

			colorit(color, x, y);
		}

	}

	//Locate the top left pixel and color it blue:

	x = tl_x1 + 2;
	y = tl_y1 + 2;

	index = (y * canvas.width + x) * 4;

	color = 'inside';

	rasterArray[index / 4] = color;

	colorit(color, x, y);

	Redraw();


	//start recursive process by calling function that checks the status of all pixels surrounding top left pixel.
	fillInside(x,y);

}

function surroundingCheck(x, y){
//this function gets the color of all pixels surrounding the one defined in the argument.

	var index = 0;
	var above = 0;
	var below = 0;
	var right = 0;
	var left = 0;
	var colorsArray = [];

//above:
	y = y - 1;
	above = rasterArray[(y * canvas.width + x)];

//below:
	y = y + 2;
	below = rasterArray[(y * canvas.width + x)];

//left:
	y = y - 1;
	x = x - 1;
	left = rasterArray[(y * canvas.width + x)];

//right:
	x = x + 2;
	right = rasterArray[(y * canvas.width + x)];

	colorsArray = [above, below, left, right];

	return colorsArray;

}

function fillInside(xstart,ystart){

	var nextArray = [];
	var counter = 0;

	//bug causes filling issue if not in line mode. just set to line mode to fix:

	//fill nextArray with the state of every pixel surrounding target.
	nextArray = fillPxs(xstart,ystart);

	//if the value of the x coordinate is 0 (which means that the px was not grey), don't add it to the checkPixelsArray. Otherwise, push it on there.
	for(i = 0; i < nextArray.length; i ++){
		if(nextArray[i] != 0){
			checkPixelsArray.push(nextArray[i]);
		}
	}
	while (checkPixelsArray.length != 0){
		//pop off the last coordinates (xy pair) from the end of the checkPixelsArray and call fillPxs with these coords.
		lastx = checkPixelsArray.pop();
		lasty = checkPixelsArray.pop();
		nextArray = fillPxs(lasty, lastx);
		//now nextArray contains all of the grey coords from that pixel. get them out and put them into the checkPixelsArray.
		for(i = 0; i < nextArray.length; i ++){
			if(nextArray[i] != 0){
				checkPixelsArray.push(nextArray[i]);
			}
		}
		counter += 1;
		if (counter > 10000){
			//break;
			//refreshAll(false);
		}
	}
		Redraw();

}

function fillPxs(x,y){

	var pixelColors = [];
	var nextsArray = [];
	var next_x1 = 0;
	var next_x2 = 0;
	var next_x3 = 0;
	var next_x4 = 0;
	var next_y1 = 0;
	var next_y2 = 0;
	var next_y3 = 0;
	var next_y4 = 0;

	pixelColors = surroundingCheck(x,y);

	if(pixelColors[0] == 'background'){
		next_x1 = x;
		next_y1 = y - 1;
		colorit('inside',next_x1, next_y1);	}
	else{
		next_x1 = 0;
		next_y1 = 0;
	}

	if(pixelColors[1] == 'background'){
		next_x2 = x;
		next_y2 = y + 1;
		colorit('inside',next_x2, next_y2);
	}
	else{
		next_x2 = 0;
		next_y2 = 0;
	}

	if(pixelColors[3] == 'background'){
		next_x3 = x + 1;
		next_y3 = y;
		colorit('inside',next_x3, next_y3);
	}
	else{
		next_x3 = 0;
		next_y3 = 0;
	}

	if(pixelColors[2] == 'background'){
		next_x4 = x - 1;
		next_y4 = y;
		colorit('inside',next_x4, next_y4);
	}
	else{
		next_x4 = 0;
		next_y4 = 0;
	}

	nextsArray = [next_x1, next_y1, next_x2, next_y2, next_x3, next_y3, next_x4, next_y4];

	return nextsArray;

}

function colorit(color, x, y, alpha, indexinput){

    if(indexinput == 'null'){
	    var index = (y * canvas.width + x) * 4;
    }

    else{
        index = indexinput;
    }

	if(color == 'background'){
		data[index]   = 255;    // red
		data[++index] = 255;    // green
		data[++index] = 255;    // blue
		data[++index] = 0;   // alpha
	}

	else if (color == 'line'){

		data[index]   = 0;    // red
		data[++index] = 100;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

	//Color 1:
	else if (color == 'inside1'){

		data[index]   = 222;    // red
		data[++index] = 222;    // green
		data[++index] = 222;    // blue
		data[++index] = 1000;   // alpha
	}

	//Color 2:
	else if (color == 'inside2'){

		data[index]   = 11;    // red
		data[++index] = 217;    // green
		data[++index] = 176;    // blue
		data[++index] = 50;   // alpha
	}

	//Color 3:
	else if (color == 'inside3'){

		data[index]   = 0;    // red
		data[++index] = 119;    // green
		data[++index] = 179;    // blue
		data[++index] = 50;   // alpha
	}

	//Color 4:





	else if (color == 'red'){

		data[index]   = 1000;    // red
		data[++index] = 0;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

	else if (color == 'blue'){

		data[index]   = 0;    // red
		data[++index] = 0;    // green
		data[++index] = 1000;    // blue
		data[++index] = 1000;   // alpha
	}

	else if (color == 'StressGradientred'){

		data[index]   = 166;    // red
		data[++index] = 73;    // green
		data[++index] = 73;    // blue
		data[++index] = alpha;   // alpha
	}

	else if (color == 'StressGradientblue'){

		data[index]   = 67;    // red
		data[++index] = 87;    // green
		data[++index] = 115;    // blue
		data[++index] = alpha;   // alpha
	}


	else if (color == 'filletCutoutbackground'){

		data[index]   = 0;    // red
		data[++index] = 255;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

	else if (color == 'chamferCutout'){

		data[index]   = 0;    // red
		data[++index] = 255;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group1'){

		data[index]   = 255;    // red
		data[++index] = 0;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup1'){

		data[index]   = 255;    // red
		data[++index] = 0;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group2'){

		data[index]   = 255;    // red
		data[++index] = 128;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup2'){

		data[index]   = 255;    // red
		data[++index] = 128;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group3'){

		data[index]   = 255;    // red
		data[++index] = 255;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup3'){

		data[index]   = 255;    // red
		data[++index] = 255;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group4'){

		data[index]   = 128;    // red
		data[++index] = 255;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup4'){

		data[index]   = 128;    // red
		data[++index] = 255;    // green
		data[++index] = 0;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group5'){

		data[index]   = 0;    // red
		data[++index] = 255;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup5'){

		data[index]   = 0;    // red
		data[++index] = 255;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group6'){

		data[index]   = 0;    // red
		data[++index] = 0;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup6'){

		data[index]   = 0;    // red
		data[++index] = 0;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group7'){

		data[index]   = 127;    // red
		data[++index] = 50;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup7'){

		data[index]   = 127;    // red
		data[++index] = 50;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}
		else if (color == 'group8'){

		data[index]   = 255;    // red
		data[++index] = 0;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup8'){

		data[index]   = 255;    // red
		data[++index] = 0;    // green
		data[++index] = 255;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group9'){

		data[index]   = 50;    // red
		data[++index] = 100;    // green
		data[++index] = 50;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup9'){

		data[index]   = 50;    // red
		data[++index] = 100;    // green
		data[++index] = 50;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group10'){

		data[index]   = 50;    // red
		data[++index] = 50;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup10'){

		data[index]   = 50;    // red
		data[++index] = 50;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group11'){

		data[index]   = 100;    // red
		data[++index] = 100;    // green
		data[++index] = 50;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup11'){

		data[index]   = 100;    // red
		data[++index] = 100;    // green
		data[++index] = 50;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group12'){

		data[index]   = 100;    // red
		data[++index] = 50;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup12'){

		data[index]   = 100;    // red
		data[++index] = 50;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group13'){

		data[index]   = 50;    // red
		data[++index] = 100;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup13'){

		data[index]   = 50;    // red
		data[++index] = 100;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group14'){

		data[index]   = 100;    // red
		data[++index] = 100;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup14'){

		data[index]   = 100;    // red
		data[++index] = 100;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group15'){

		data[index]   = 200;    // red
		data[++index] = 100;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup15'){

		data[index]   = 200;    // red
		data[++index] = 100;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group16'){

		data[index]   = 100;    // red
		data[++index] = 200;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup16'){

		data[index]   = 100;    // red
		data[++index] = 200;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group17'){

		data[index]   = 100;    // red
		data[++index] = 100;    // green
		data[++index] = 200;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup17'){

		data[index]   = 100;    // red
		data[++index] = 100;    // green
		data[++index] = 200;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group18'){

		data[index]   = 200;    // red
		data[++index] = 200;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup18'){

		data[index]   = 200;    // red
		data[++index] = 200;    // green
		data[++index] = 100;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group19'){

		data[index]   = 200;    // red
		data[++index] = 100;    // green
		data[++index] = 200;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCuotoutgroup19'){

		data[index]   = 200;    // red
		data[++index] = 100;    // green
		data[++index] = 200;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'group20'){

		data[index]   = 100;    // red
		data[++index] = 200;    // green
		data[++index] = 200;    // blue
		data[++index] = 1000;   // alpha
	}

		else if (color == 'filletCutoutgroup20'){

		data[index]   = 100;    // red
		data[++index] = 200;    // green
		data[++index] = 200;    // blue
		data[++index] = 1000;   // alpha
	}
}

function isonline(x,y,UIorFILL,arrayReturn,linesOption1,linesOption2){
	var notonline = 999;
	var linesHit = 0;
	var linesHitArray = [];

	if(isonendpoint()[0] != false){
	    return 999;
	}

	//This section handles normal line hits:

		for (var i = 0; i < lineArray.length; i++){
			l = lineArray[i];

			Lstarty = Math.round(l.starty);
			Lstartx = Math.round(l.startx);
			Lendy = Math.round(l.endy);
			Lendx = Math.round(l.endx);

			var calcdLineLength = Math.sqrt(Math.pow(Lstartx-Lendx,2)+Math.pow(Lstarty - Lendy,2));

			//Calculates mouse distance from the starting point of the line:
			var dist_from_start = Math.sqrt(Math.pow(Lstartx-x,2)+Math.pow(Lstarty - y,2));

			//Calculates mouse distance from the ending point of the line:
			var dist_from_end = Math.sqrt(Math.pow(Lendx- x,2)+Math.pow(Lendy - y,2));

			var closeness = Math.abs(calcdLineLength - dist_from_start- dist_from_end);

			//If the cursor is adequately close to the any line, redraw it red.
			if(UIorFILL == 'UI'){
			    if(linesOption1 == null){
			        if(TouchMode == false){
    				closenessthreshold = .1;
			        }
			        else{
    				    closenessthreshold = 5;
			        }
    				if(closeness < closenessthreshold){
    					l.drawline("red");
    					linesHit = linesHit + 1;
    					//add it to an array:
    					linesHitArray.push(l.lineID);
    				}
			    }

			    else if(linesOption1 != null){
    				closenessthreshold = .1;
    				if(closeness < closenessthreshold){
    				    if(l.lineID == linesOption1 || l.lineID == linesOption2){
    				    	l.drawline("red");
    					    linesHit = linesHit + 1;
    					    //add it to an array:
    					    linesHitArray.push(l.lineID);
    				    }
    				}
			    }
			}

			else if(UIorFILL == 'Rel'){
			    if(linesOption1 == null){
    				closenessthreshold = .5;
    				if(closeness < closenessthreshold){
    					l.drawline("red");
    					linesHit = linesHit + 1;
    					//add it to an array:
    					linesHitArray.push(l.lineID);
    				}
			    }

			    else if(linesOption1 != null){
    				closenessthreshold = .5;
    				if(closeness < closenessthreshold){
    				    if(l.lineID == linesOption1 || l.lineID == linesOption2){
    				    	l.drawline("red");
    					    linesHit = linesHit + 1;
    					    //add it to an array:
    					    linesHitArray.push(l.lineID);
    				    }
    				}
			    }
			}

			else if(UIorFILL == 'Fill'){
				closenessthreshold = .001;
				if(closeness < closenessthreshold && l.constLine != true){
					l.drawline("red");
					linesHit = linesHit + 1;
					//add it to an array:
					linesHitArray.push(l.lineID);
				}
			}

			else if(UIorFILL == 'SNIP'){
				closenessthreshold = .1;
				if(closeness < closenessthreshold){
					//l.drawline("red");
					linesHit = linesHit + 1;
					//add it to an array:
					linesHitArray.push(l.lineID);
				}
			}

		}

		if(linesHit > 0){
            if(showDims == true){
        		for(var j = 0; j < linearDimArray.length; j ++){
        		    if(linearDimArray[j].elementID == linesHitArray[0] && linearDimArray[j].showDim == true){
        		        linearDimArray[j].drawdim(linearDimArray[j].value,linearDimArray[j].x,linearDimArray[j].y,"red");
        		    }
        		}
            }
			if(arrayReturn == true){
				retArray = [linesHitArray[0], linesHit];
				return retArray;
			}
			return linesHitArray[0];
		}

	//This section handles chamfer line hits:

		for (var i = 0; i < chamferArray.length; i++){
			l = chamferArray[i];

			Lstarty = Math.round(l.starty);
			Lstartx = Math.round(l.startx);
			Lendy = Math.round(l.endy);
			Lendx = Math.round(l.endx);

			var calcdLineLength = Math.sqrt(Math.pow(Lstartx-Lendx,2)+Math.pow(Lstarty - Lendy,2));

			//Calculates mouse distance from the starting point of the line:
			var dist_from_start = Math.sqrt(Math.pow(Lstartx-x,2)+Math.pow(Lstarty - y,2));

			//Calculates mouse distance from the ending point of the line:
			var dist_from_end = Math.sqrt(Math.pow(Lendx- x,2)+Math.pow(Lendy - y,2));

			var closeness = Math.abs(calcdLineLength - dist_from_start- dist_from_end);

			//If the cursor is adequately close to the any line, redraw it red.
			if(UIorFILL == 'UI'){
				closenessthreshold = .1;
			}

			else if(UIorFILL == 'Fill'){
				closenessthreshold = .001;
			}

			if(closeness < closenessthreshold){
				l.drawchamfer("red");
				linesHit = linesHit + 1;
				//add it to an array:
				linesHitArray.push(l.ChamferID);
				}
		}

		if(linesHit > 0){
			if(arrayReturn == true){
				retArray = [linesHitArray[0], linesHit];
				return retArray;
			}
			return linesHitArray[0];
		}

	//This section handles fillet hits(not really lines in the Math sense, but we are thinking of them as a continuous line of pixels, so we'll detect them here.
/*
		for (var i = 0; i < arcArray.length; i++){
			r = arcArray[i];

			//find distance from centroid of fillet to mouse position. Need to start with distance in x and distance in y from centroid to mouse position.

			var xdist = x - r.centroidx;
			var ydist = y - r.centroidy;
			var radialdist = Math.pow((Math.pow(xdist, 2) + Math.pow(ydist, 2)), .5);
			var closeness = Math.abs(radialdist - r.radius);

			//next, we need to know if the cursor is in the correct quadrant for the fillet case:

			var correctQuad = false;

			if(r.Case == 0){
				if(x >= r.centroidx && y >= r.centroidy){
					correctQuad = true;
				}
			}

			else if(r.Case == 1){
				if(x <= r.centroidx && y >= r.centroidy){
					correctQuad = true;
				}
			}

			else if(r.Case == 2){
				if(x <= r.centroidx && y <= r.centroidy){
					correctQuad = true;
				}
			}

			else if(r.Case == 3){
				if(x >= r.centroidx && y <= r.centroidy){
					correctQuad = true;
				}
			}

			//If the cursor is adequately close to the any line, redraw it red.
			if(UIorFILL == 'UI'){
				closenessthreshold = 2;
			}

			else if(UIorFILL == 'Fill'){
				closenessthreshold = .001;
			}

			if(closeness < closenessthreshold && correctQuad == true){
				r.drawarc("red");
				linesHit = linesHit + 1;
				//add it to an array:
				linesHitArray.push(r.arcID);
				}
		}

		if(linesHit > 0){
			if(arrayReturn == true){
				retArray = [linesHitArray[0], linesHit];
				return retArray;
			}
			return linesHitArray[0];
		}

		//This section handles leftline hits:

		for (var i = 0; i < leftLineArray.length; i++){
			l = leftLineArray[i];

			Lstarty = Math.round(l.starty);
			Lstartx = Math.round(l.startx);
			Lendy = Math.round(l.endy);
			Lendx = Math.round(l.endx);

			var calcdLineLength = Math.sqrt(Math.pow(Lstartx-Lendx,2)+Math.pow(Lstarty - Lendy,2));

			//Calculates mouse distance from the starting point of the line:
			var dist_from_start = Math.sqrt(Math.pow(Lstartx-x,2)+Math.pow(Lstarty - y,2));

			//Calculates mouse distance from the ending point of the line:
			var dist_from_end = Math.sqrt(Math.pow(Lendx- x,2)+Math.pow(Lendy - y,2));

			var closeness = Math.abs(calcdLineLength - dist_from_start- dist_from_end);

			if(UIorFILL == 'Fill'){
				closenessthreshold = .001;
			}

			if(closeness < closenessthreshold){
				linesHit = linesHit + 1;
				if(arrayReturn == true){
					retArray = [l.lineID, 1];
					return retArray;
				}
				return l.lineID;
				}
		}
		*/
		if(linesHit == 0){
			if(arrayReturn == true){
				retArray = [notonline, 1];
				return retArray;
			}
			return notonline;
		}
	else{
		if(arrayReturn == true){
			retArray = [notonline, 1];
			return retArray;
		}
		return notonline;
	}
}

function deselectFillets(){
	for (var i = 0; i < arcArray.length; i++){
		r = arcArray[i];
		if(r.color != "black"){
		    r.color = "black";
		}
    }
}


function isonfillet(x,y,mode){
//This function accepts a mouse location and returns whether or not it is on a fillet.

//First, start out with the easy stuff. Find out if the mouse location is common to a complete circle if the fillet is extended:

//the return value is set for the case where nothing is found.
	var retValue = 999;

	for (var i = 0; i < arcArray.length; i++){
		r = arcArray[i];

		//find distance from centroid of fillet to mouse position. Need to start with distance in x and distance in y from centroid to mouse position.

		var xdist = x - r.centroidx;
		var ydist = y - r.centroidy;
		var radialdist = Math.pow((Math.pow(xdist, 2) + Math.pow(ydist, 2)), .5);
		var closeness = Math.abs(radialdist - r.radius);

        if(mode!='SNIP'){
		    closenessthreshold = 10;
        }
        else{
            closenessthreshold = 2;
        }
		if(closeness < closenessthreshold){
    		//calculate the angle between the mouse and the centroid of the arc:

    		mouseAngle = lineAngleFromOrigin(r.centroidx,r.centroidy,x,y)*((2*Math.PI)/360) - Math.PI/2;

            //Treat the arc start and end angles so they can be compared to the mouseAngle:

    		if(mouseAngle < 0){
    		    mouseAngle = mouseAngle + (2*Math.PI);
    		}

    		var rstart = 0;
    		var rend = 0;

    		if(r.radstart < 0){
                rstart = r.radstart + 2*Math.PI;
    		}
    		else{
    		    rstart = r.radstart;
    		}

    		if(r.radend < 0){
                rend = r.radend + 2*Math.PI;
    		}
    		else{
    		    rend = r.radend;
    		}

            //determine if the location of the mouse is radially between the start and endpoints of the arc:
            var between = false;
            if(rstart < rend){
    	    	if(mouseAngle > rstart && mouseAngle < rend){
    		        between = true;
    		    }
            }

            else if(rstart > rend){
                if(mouseAngle < rend || mouseAngle > rstart){
                    between = true;
                }
            }

            if(between == true){
                if(mode != 'SNIP'){
			        r.color = "red";
                }
			    retValue = r.arcID;
			    //return the ID or something here.
            }
   		    else{
		        r.color = "black"
		    }
		}
		else{
		    r.color = "black"
		}
	}

	return retValue;

}

function displayDimension(lineOrAngle){
	//for lines:
	if(lineOrAngle == null){
    	if(isonline(mouse.x, mouse.y, 'UI') != 999){
    		var selectedLine = isonline(mouse.x, mouse.y, 'UI');
    		for(var j = 0; j< linearDimArray.length; j++){
    			d = linearDimArray[j];
    			if(d.elementID == selectedLine){
    				if(d.showDim == true){
    					d.showDim = false;
    					Redraw();
    				}
    				else{
    					d.showDim = true;
    					Redraw();
    				}
    			}
    		}
    		//Same thing for angular dimensions - for now hide at same time.
    		for(var j = 0; j< AngularDimArray.length; j++){
    			d = AngularDimArray[j];
    			if(d.elementID == selectedLine){
    				if(d.showDim == true){
    					d.showDim = false;
    					Redraw();
    				}
    				else{
    					d.showDim = true;
    					Redraw();
    				}
    			}
    		}
    	}

    	//for dimension tags:
    	var selectedDim = isondim(mouse.x,mouse.y,10,27);
    	if(selectedDim[0] != 999){
    		//for linear dimensions:
    		if(selectedDim[1] == "linear" || selectedDim[1] == "fillet"){
    			for(var j = 0; j< linearDimArray.length; j++){
    				d = linearDimArray[j];
    				if(d.elementID == selectedDim[0]){
    					if(d.showDim == true){
    						d.showDim = false;
    						Redraw();
    					}
    					else{
    						d.showDim = true;
    						Redraw();
    					}
    				}

    			}
    		}
    		//for angular dimensions:
    		if(selectedDim[1] == "angular"){
    			for(var j = 0; j< AngularDimArray.length; j++){
    				d = AngularDimArray[j];
    				if(d.elementID == selectedDim[0]){
    					if(d.showDim == true){
    						d.showDim = false;
    						Redraw();
    					}
    					else{
    						d.showDim = true;
    						Redraw();
    					}
    				}

    			}
    		}

    		//for rel angular dimensions:
    		if(selectedDim[1] == "relangular"){
    			for(var j = 0; j< relAngleArray.length; j++){
    				d = relAngleArray[j];
    				if(d.elementID == selectedDim[0]){
    				    deletedim(selectedDim[0]);
    				    /*
    					if(d.showDim == true){
    						d.showDim = false;
    						Redraw();
    					}
    					else{
    						d.showDim = true;
    						Redraw();
    					}
    					*/
    				}

    			}
    		}
    	}
	}

    	if(isonfillet(mouse.x, mouse.y) != 999){
    		var selectedFillet = isonfillet(mouse.x, mouse.y);
    		for(var j = 0; j< linearDimArray.length; j++){
    			d = linearDimArray[j];
    			if(d.elementID == selectedFillet){
    				if(d.showDim == true){
    					d.showDim = false;
    					Redraw();
    				}
    				else{
    					d.showDim = true;
    					Redraw();
    				}
    			}
    		}
    	}

    	//for dimension tags:
    	var selectedDim = isondim(mouse.x,mouse.y,10,27);
    	if(selectedDim[0] != 999){
    		//for linear dimensions:
    		if(selectedDim[1] == "linear" || selectedDim[1] == "fillet"){
    			for(var j = 0; j< linearDimArray.length; j++){
    				d = linearDimArray[j];
    				if(d.elementID == selectedDim[0]){
    					if(d.showDim == true){
    						d.showDim = false;
    						Redraw();
    					}
    					else{
    						d.showDim = true;
    						Redraw();
    					}
    				}

    			}
    		}
    	}

	if(lineOrAngle == 'line'){
    	if(isonline(mouse.x, mouse.y, 'UI') != 999){
    		var selectedLine = isonline(mouse.x, mouse.y, 'UI');
    		for(var j = 0; j< linearDimArray.length; j++){
    			d = linearDimArray[j];
    			if(d.elementID == selectedLine){
    				if(d.showDim == true){
    					d.showDim = false;
    					Redraw();
    				}
    				else{
    					d.showDim = true;
    					Redraw();
    				}
    			}
    		}
    	}

    	//for dimension tags:
    	var selectedDim = isondim(mouse.x,mouse.y,10,27);
    	if(selectedDim[0] != 999){
    		//for linear dimensions:
    		if(selectedDim[1] == "linear" || selectedDim[1] == "fillet"){
    			for(var j = 0; j< linearDimArray.length; j++){
    				d = linearDimArray[j];
    				if(d.elementID == selectedDim[0]){
    					if(d.showDim == true){
    						d.showDim = false;
    						Redraw();
    					}
    					else{
    						d.showDim = true;
    						Redraw();
    					}
    				}

    			}
    		}
    	}
	}

	//for angles:
	if(lineOrAngle == 'angle'){
    	if(isonline(mouse.x, mouse.y, 'UI') != 999){
    		var selectedLine = isonline(mouse.x, mouse.y, 'UI');

    		//Same thing for angular dimensions - for now hide at same time.
    		for(var j = 0; j< AngularDimArray.length; j++){
    			d = AngularDimArray[j];
    			if(d.elementID == selectedLine){
    				if(d.showDim == true){
    					d.showDim = false;
    					Redraw();
    				}
    				else{
    					d.showDim = true;
    					Redraw();
    				}
    			}
    		}
    	}

    	//for dimension tags:
    	var selectedDim = isondim(mouse.x,mouse.y,10,27);
    	if(selectedDim[0] != 999){
    		//for angular dimensions:
    		if(selectedDim[1] == "angular"){
    			for(var j = 0; j< AngularDimArray.length; j++){
    				d = AngularDimArray[j];
    				if(d.elementID == selectedDim[0]){
    					if(d.showDim == true){
    						d.showDim = false;
    						Redraw();
    					}
    					else{
    						d.showDim = true;
    						Redraw();
    					}
    				}

    			}
    		}
    	}
	}
}

function isondim(xpass,ypass){
//This function determines if the mouse is hovering over a dimension.
	var linedetected = false;
	var detectedline = 0;
	var type = "null";


	//For linear dimensions:
	for(var i = 0; i < linearDimArray.length; i++){
		d = linearDimArray[i];
		if((xpass > d.x) && (xpass < d.x + d.bbwidth) && (linedetected == false)){
			if((ypass > d.y - d.bbheight) && (ypass < d.y)){
				if(showDims == true && d.showDim == true){
					d.drawdim(d.value,d.x,d.y,'red');
					detectedline = d.elementID;
					if(d.orientation == 'fillet'){
					    type = 'fillet';
					}
					else{
					    type = 'linear';
					}
					linedetected = true;
				}
			}
		}
	}

	//For angular dimensions:
	for(var i = 0; i < AngularDimArray.length; i++){
		d = AngularDimArray[i];
		if((xpass > d.x) && (xpass < d.x + d.bbwidth) && (linedetected == false)){
			if((ypass > d.y - d.bbheight) && (ypass < d.y)){
				if(d.showDim == true && d.showDim == true){
					d.drawdim(d.value,d.x,d.y,'red');
					detectedline = d.elementID;
					type = d.type;
					linedetected = true;
				}
			}
		}
	}
	//For relangular dimensions:
	for(var i = 0; i < relAngleArray.length; i++){
		d = relAngleArray[i];
		if((xpass > d.x) && (xpass < d.x + d.bbwidth) && (linedetected == false)){
			if((ypass > d.y - d.bbheight) && (ypass < d.y)){
				if(d.showDim == true && d.showDim == true){
					d.drawdim(d.value,d.x,d.y,'red');
					detectedline = d.elementID;
					type = d.type;
					linedetected = true;
				}
			}
		}
	}

	if(linedetected == true){
		retArray = [detectedline, type];
		return retArray;
	}
	else{
		retArray = [999, "null"];
		return retArray;
	}

}

function isonlabel(xpass,ypass,bbheight,bbwidth){
//This function determines if the mouse is hovering over a dimension.
	var labeldetected = false;
	var detectedlabel = 0;
	var digits = 0;

//currently limited to first two labels. Can expand in the future.
	for(var i = 0; i < labelArray.length; i++){
		d = labelArray[i];
		digits = d.digits;
		bbwidth = 8 * digits;
		//pull out digits property and calculate an appropriate bbheight and bbwidth for the number of digits displayed.
		if((xpass > d.xloc) && (xpass < d.xloc + bbwidth) && (labeldetected == false)){
			if((ypass > d.yloc - bbheight) && (ypass < d.yloc)){
				d.drawlabel(d.value,d.xloc,d.yloc,'red');
				detectedlabel = d.labelID;
				labeldetected = true;
			}
		}
	}
	if(labeldetected == true){
		return detectedlabel;
	}
	else{
		return 999;
	}

}

function moveDim(x,y,dimtomove,type){
	//if it has the type "linear", search the linear dimension array:
	/*
	if(type == "linear"){
		for(var i = 0; i < linearDimArray.length; i++){
		d = linearDimArray[i];
			if(d.elementID == dimtomove){
				d.x = x - xRelative;
				d.y = y - yRelative;
			}
		    if(d.orientation == 'fillet'){
		        updateFilletDim(d.elementID);
		    }
		}
	}
	else if(type == "fillet"){
		for(var i = 0; i < linearDimArray.length; i++){
		d = linearDimArray[i];
			if(d.elementID == dimtomove){
				d.x = x - xRelative;
				d.y = y - yRelative;
			}
		    if(d.orientation == 'fillet'){
		        updateFilletDim(d.elementID);
		    }
		}
	}
	else if(type == "angular"){
		for(var i = 0; i < AngularDimArray.length; i++){
		d = AngularDimArray[i];
			if(d.elementID == dimtomove){
				d.x = x - xRelative;
				d.y = y - yRelative;
			}
		}
	}
	*/
	if(type == "relangular"){
		for(var i = 0; i < relAngleArray.length; i++){
		d = relAngleArray[i];
			if(d.elementID == dimtomove){
				d.x = x - xRelative;
				d.y = y - yRelative;
			}
		}
	}
}

function moveLabel(x,y,labeltomove){
	for(var i = 0; i < labelArray.length; i++){
	d = labelArray[i];
		if(d.labelID == labeltomove){
			d.xloc = x - xRelative;
			d.yloc = y - yRelative;
		}
	}
}

function isonLoadPoint(xpass,ypass){
//This function determines if the mouse is hovering over the load point.
	var detected = false;
	d = loadArray[0];

    if(loadArray.length != 0){

    	var distToCentroid = Math.pow(Math.pow(Math.abs(d.x - xpass),2) + Math.pow(Math.abs(d.y - ypass),2), .5);

    	if(distToCentroid < 10){
    		d.drawLoadPoint(d.x,d.y, "#559EC5");
    		detected = true;
    	}

    	if(detected == true){
    		return 1;
    	}
    	else{
    		return 999;
    	}
    }

    else{
        return 999;
    }
}

function isonSRP(xpass,ypass){
//This function determines if the mouse is hovering over the load point.
	var detected = false;
	var SRPidtoReturn = 999;

	for(var i = 0; i < SRPArray.length; i++){
		d = SRPArray[i];

		var distToCentroid = Math.pow(Math.pow(Math.abs(d.x - xpass),2) + Math.pow(Math.abs(d.y - ypass),2), .5);

		if(distToCentroid < 10){
			d.drawSRP(d.x,d.y, "#559EC5", d.SRPid);
			detected = true;
			SRPidtoReturn = d.SRPid;
		}
	}

	if(detected == true){
		return SRPidtoReturn;
	}
	else{
		return 999;
	}
}

//d...
function isonHandle(xpass,ypass){
//This function determines if the mouse is hovering over an angular dimension radius adjust handle.
	var detected = false;

    for(var i = 0; i < relAngleArray.length; i++){
	    d = relAngleArray[i];
    	var distToCentroid = Math.pow(Math.pow(Math.abs(d.handlex - xpass),2) + Math.pow(Math.abs(d.handley - ypass),2), .5);

        if(TouchMode != true){
        	if(distToCentroid < 5){
        		d.drawarchandle("#559EC5",5);
        		detected = true;
        		detectedid = d.elementID;
        	}
        }
        else{
          	if(distToCentroid < 15){
        		d.drawarchandle("#559EC5",5);
        		detected = true;
        		detectedid = d.elementID;
        	}
        }
    }

	if(detected == true){
		return detectedid;
	}
	else{
		return 999;
	}
}

function moveHandle(x,y,mode,id){

    //if x and y are passed as null, just get current. This is just to update to keep out of illegal locs.
    if(x == 'null' && y == 'null'){
    	for(var i = 0; i < relAngleArray.length; i++){
    		d = relAngleArray[i];
    		if(d.elementID == id){
                x = d.handlex;
                y = d.handley;
    	    }
    	}
    }
    //change this so that haldex and handley are at radius distance from the centroid,
    //but are still positioned in the center of the arc.
    ////console.log(relAngleArray)
    //check to see if both ends are on lines:

    //get the proposed radius.
	for(var i = 0; i < relAngleArray.length; i++){
		d = relAngleArray[i];
		if(d.elementID == id){
        var radius = Math.pow(Math.pow(Math.abs(d.centroidx - x),2) + Math.pow(Math.abs(d.centroidy - y),2), .5);
	    }
	}

    var limitRad = false;

	for(var i = 0; i < relAngleArray.length; i++){
		d = relAngleArray[i];
		if(d.elementID == id){
    		var epRads = endpointRads(d.centroidx, d.centroidy, d.line1ID, d.line2ID);
    		if(radius < epRads[0] || radius > epRads[1]){
    		}
    		if(radius < epRads[0]){
    		    radius = epRads[0];
    		}
    		if(radius > epRads[1]){
    		    radius = epRads[1];
    		}
    		var limitRad = true;
	    }
	}

	if(mode == 'absolute'){
		for(var i = 0; i < relAngleArray.length; i++){
			d = relAngleArray[i];
			if(d.elementID == id){
			var a = d;
			if(limitRad == false){
                var radius = Math.pow(Math.pow(Math.abs(d.centroidx - x),2) + Math.pow(Math.abs(d.centroidy - y),2), .5);
        	}
        	//var avgtheta = d.radstart + (d.value/2)*(Math.PI/180);
        	var avgtheta = (lineAngleFromOrigin(d.centroidx,d.centroidy, x,y) - 90)*(Math.PI/180);
        	var xfromcentroid = radius * Math.cos(avgtheta);
        	var yfromcentroid = radius * Math.sin(avgtheta);
			d.handlex = d.centroidx + xfromcentroid;
			d.handley = d.centroidy + yfromcentroid;
			}
		}
	}

	else{
		for(var i = 0; i < relAngleArray.length; i++){
			d = relAngleArray[i];
			if(d.elementID == id){
		    var a = d;
			if(limitRad == false){
                var radius = Math.pow(Math.pow(Math.abs(d.centroidx - x),2) + Math.pow(Math.abs(d.centroidy - y),2), .5);
        	}
        	//var avgtheta = d.radstart + (d.value/2)*(Math.PI/180);
        	var avgtheta = (lineAngleFromOrigin(d.centroidx,d.centroidy, x,y) - 90)*(Math.PI/180);
        	var xfromcentroid = radius * Math.cos(avgtheta);
        	var yfromcentroid = radius * Math.sin(avgtheta);
			d.handlex = d.centroidx + xfromcentroid- xRelative;
			d.handley = d.centroidy + yfromcentroid - yRelative;
			}
		}
	}

	//The arc side switches so that the handle is always on the arc.
	//This requires the arc start and end to change as well as setting a flag that
	//the arc is not on the 'starting' side. that requires comp. angle be calc'd.

	//Need to detect if handle is between start and end of arc:

	if(avgtheta < 0){
	    avgtheta = 2*Math.PI + avgtheta;
	}

    if(a.radend > a.radstart){
    	if(avgtheta > a.radstart && avgtheta < a.radend){
    	    a.displayFlippedArc = false;
    	}
    	else{
    	    a.displayFlippedArc = true;
    	}
    }

    else{
        if(avgtheta > a.radstart){
    	    a.displayFlippedArc = false;
        }
        else if(avgtheta < a.radend){
    	    a.displayFlippedArc = false;
        }
        else{
            a.displayFlippedArc = true;
        }
    }

	var retArray = [a.x, a.y];
	return retArray;
}


function updateHandles(){
    //goes through all handles and makes sure they are in legal locations.
	for(var i = 0; i < relAngleArray.length; i++){
		d = relAngleArray[i];
        x = d.handlex;
        y = d.handley;

        var radius = Math.pow(Math.pow(Math.abs(d.centroidx - x),2) + Math.pow(Math.abs(d.centroidy - y),2), .5);

        var limitRad = false;

		var epRads = endpointRads(d.centroidx, d.centroidy, d.line1ID, d.line2ID);

		if(radius < epRads[0]){
		    radius = epRads[0];
		    limitRad = true;
		}
		if(radius > epRads[1]){
		    radius = epRads[1];
		    limitRad = true;
		}

		if(limitRad == true){
        	var avgtheta = (lineAngleFromOrigin(d.centroidx,d.centroidy, x,y) - 90)*(Math.PI/180);
        	var xfromcentroid = radius * Math.cos(avgtheta);
        	var yfromcentroid = radius * Math.sin(avgtheta);
			d.handlex = d.centroidx + xfromcentroid;
			d.handley = d.centroidy + yfromcentroid;
		}
	}
}

function endpointRads(x, y, lid1, lid2){
  //finds the distances from x,y to both lines 1 and 2 start and endpoints.

  for(var i = 0; i < lineArray.length; i++){
      if(lineArray[i].lineID == lid1){
            var sx = lineArray[i].startx;
            var sy = lineArray[i].starty;
            var ex = lineArray[i].endx;
            var ey = lineArray[i].endy;

            var disttostart1 = Math.sqrt(Math.pow(sx- x,2)+Math.pow(sy - y,2));
            var disttoend1 = Math.sqrt(Math.pow(ex- x,2)+Math.pow(ey - y,2));

            if(disttostart1 < disttoend1){
                var actstart1 = disttostart1;
                var actend1 = disttoend1;
            }
            else{
                var actstart1 = disttoend1;
                var actend1 = disttostart1;
            }
      }
      else if(lineArray[i].lineID == lid2){
            var sx = lineArray[i].startx;
            var sy = lineArray[i].starty;
            var ex = lineArray[i].endx;
            var ey = lineArray[i].endy;

            var disttostart2 = Math.sqrt(Math.pow(sx- x,2)+Math.pow(sy - y,2));
            var disttoend2 = Math.sqrt(Math.pow(ex- x,2)+Math.pow(ey - y,2));

            if(disttostart2 < disttoend2){
                var actstart2 = disttostart2;
                var actend2 = disttoend2;
            }
            else{
                var actstart2 = disttoend2;
                var actend2 = disttostart2;
            }
      }
  }


    //get the largest start and the smallest end:

    if(actstart1 > actstart2){
        var minrad = actstart1;
    }
    else{
        var minrad = actstart2;
    }

    if(actend1 < actend2){
        var maxrad = actend1;
    }
    else{
        var maxrad = actend2;
    }

    retArray = [minrad, maxrad];

    return retArray;
}

function moveResultsBox(x,y){

    document.getElementById("results").style.top = y-yRelative +"px";
    document.getElementById("results").style.left = x-xRelative +"px";
}

function moveRadiusBox(x,y){

    document.getElementById("filletsInput").style.top = y-yRelative - 140 +"px";
    document.getElementById("filletsInput").style.left = x-xRelative +"px";
}

function moveLoadPoint(x,y,mode){
	if(mode == 'absolute'){
		d = loadArray[0];
		d.x = x;
		d.y = y;
	}
	else{
		d = loadArray[0];
		d.x = x - xRelative;
		d.y = y - yRelative;
	}

	var retArray = [d.x, d,y];
	return retArray;
}

function moveSRP(x,y,mode,id){
	if(mode == 'absolute'){
		for(var i = 0; i < SRPArray.length; i++){
			d = SRPArray[i];
			if(d.SRPid == id){
				d.x = x;
				d.y = y;
			}
		}

	}

	else{
		for(var i = 0; i < SRPArray.length; i++){
			d = SRPArray[i];
			if(d.SRPid == id){
				d.x = x - xRelative;
				d.y = y - yRelative;
			}
		}
	}

	var retArray = [d.x, d,y];
	return retArray;
}

function setRelatives(xin, yin, tomove, dimorlabel,id,type){

	if(dimorlabel == 'dim'){
		//If the type of dim is linear:
		if(type == "linear"){
			for(var i = 0; i < linearDimArray.length; i++){
				d = linearDimArray[i];
				if(d.elementID == tomove){
					xRelative = xin - d.x;
					yRelative = yin - d.y;
				}
			}
		}

		else if(type == "fillet"){
			for(var i = 0; i < linearDimArray.length; i++){
				d = linearDimArray[i];
				if(d.elementID == tomove){
					xRelative = xin - d.x;
					yRelative = yin - d.y;
				}
			}
		}

		else if(type == "angular"){
			for(var i = 0; i < AngularDimArray.length; i++){
				d = AngularDimArray[i];
				if(d.elementID == tomove){
					xRelative = xin - d.x;
					yRelative = yin - d.y;
				}
			}
		}

		//d...
		else if(type == "relangular"){
			for(var i = 0; i < relAngleArray.length; i++){
				d = relAngleArray[i];
				if(d.elementID == tomove){
					xRelative = xin - d.x;
					yRelative = yin - d.y;
				}
			}
		}
	}

	if(dimorlabel == 'label'){
		for(var i = 0; i < labelArray.length; i++){
			d = labelArray[i];
			if(d.labelID == tomove){
				xRelative = xin - d.xloc;
				yRelative = yin - d.yloc;
			}
		}
	}

	if(dimorlabel == 'loadpoint'){
		d = loadArray[0];
		xRelative = xin - d.x;
		yRelative = yin - d.y;
	}

	if(dimorlabel == 'resultsbox'){
	    //ned to change this so that it subtracts the corner location of the results box.
        var offsets = document.getElementById('results').getBoundingClientRect();
		xRelative = xin - offsets.left;
		yRelative = yin - offsets.top;
	}

	if(dimorlabel == 'radiusbox'){
	    //ned to change this so that it subtracts the corner location of the results box.
        var offsets = document.getElementById('filletsInput').getBoundingClientRect();
		xRelative = xin - offsets.left;
		yRelative = yin - offsets.top;
	}

	if(dimorlabel == 'SRP'){
		for(var i = 0; i < SRPArray.length; i++){
			d = SRPArray[i];
			if(d.SRPid == id){
				xRelative = xin - d.x;
				yRelative = yin - d.y;
			}
		}
	}
}

function newSRP(x,y,SRPID){
	SRPArray.push(new SRP(x,y, SRPID));
}

function getlength(number) {
    return number.toString().length;
}


//draws circle at location that's passed into this function:
function drawEndpoint(x_coord, y_coord){
	c.beginPath();
	if(TouchMode == false){
	    c.arc(x_coord,y_coord,5, Math.PI*2, false);
	    c.fillStyle = "#0086CB";
	}
	else{
	    c.arc(x_coord,y_coord,10, Math.PI*2, false);
	    c.fillStyle = "rgba(0, 136, 204, 0.5)";
	}

	c.fill();
	c.fillStyle = "black";
}

//draws circle at location that's passed into this function:
function drawConnectionPoint(x_coord, y_coord){
	c.beginPath();
	c.arc(x_coord,y_coord,3, Math.PI*2, false);
	c.fillStyle = intersectColor;
	c.fill();
	c.fillStyle = "black";
}

function drawAddpoint(x_coord, y_coord,color){
	c.beginPath();
	c.arc(x_coord,y_coord,5, Math.PI*2, false);
	c.fillStyle = color;
	c.fill();
}

function drawSubpoint(x_coord, y_coord){
	c.beginPath();
	c.arc(x_coord,y_coord,3, Math.PI*2, false);
	c.fillStyle = "red";
	c.fill();
}

function deleteline(lineID,calledFromUndo,keepRels){
	for(var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
		if (l.lineID == lineID){
		    if(calledFromUndo != true){
    		    for(var k = 0; k < linearDimArray.length; k++){
    		        if(linearDimArray[k].elementID == lineID){
    		            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
    		        }
    		    }
    		    for(var k = 0; k < AngularDimArray.length; k++){
    		        if(AngularDimArray[k].elementID == lineID){
    		            var undoAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
    		        }
    		    }
                var undoLine = JSON.parse(JSON.stringify(l));
    	        updateUserMoves(['deleteline',undoLine, undoLinearDim, undoAngularDim]);
    	        GenerateInverse();
		    }

			lineArray.splice(i, 1);
			if(keepRels != true){
			    deletedim(lineID);
			}
			else if(keepRels == true){
			    //Pass along the requirement that associated relangledims must be kept.
			    deletedim(lineID, true);
			}
		}
	}

    closeOrOpenSection(true);
}


//t...Add functionality that just returns old corner location to be used to determine
//suitability of rew radius for change.Or maybe create new function that does that.
function deletefillet(filletID, calledFromUndo, boxSelectorTrim){

    //999 is the signal from undo function for this function to not do anything. Honor that.
    if(filletID == 999){
        return 0;
    }

    var retPoint = [];

    //First, determine what the connection situation is for the fillet - if it is only half connected, or not at all,
    //just delete. Don't extend. If it is connected to lines not used for creation, also just delete.

    for(var i = 0; i < arcArray.length; i++){
        if(arcArray[i].arcID == filletID){
            a = arcArray[i];
            var delIndex = i;
        }
    }


    var savedLine1 = a.line1ID;
    var savedLine2 = a.line2ID;


    var commonLines1 = linesCommonToNode(a.endpoint1x, a.endpoint1y);
    var commonLines2 = linesCommonToNode(a.endpoint2x, a.endpoint2y);

    var connectedLines = 0;

    if((commonLines1[0] == a.line1ID) || (commonLines1[0] == a.line2ID)){
        connectedLines += 1;
    }
    if((commonLines1[5] == a.line1ID) || (commonLines1[5] == a.line2ID)){
         connectedLines += 1;
    }
    if((commonLines2[0] == a.line1ID) || (commonLines2[0] == a.line2ID)){
         connectedLines += 1;
    }
    if((commonLines2[5] == a.line1ID) || (commonLines2[5] == a.line2ID)){
         connectedLines += 1;
    }

    //If the arc is connected at both ends to an arc, just do the math to find replacement start and endpoints for lines:
    var connectedArcEndpoints = 0;
    //First, check that the fillet is connected to two arcs.
    for(var k = 0; k < arcArray.length; k++){
        var a1 = arcArray[k];
        if(a1.arcID != a.arcID){
            //Figure out which end needs to move, based on which end has endpoints that match up with one of the arc endpoints as is:
            if((Tol(a.endpoint1x, a1.endpoint1x,.001) && Tol(a.endpoint1y, a1.endpoint1y,.001)) || (Tol(a.endpoint2x, a1.endpoint2x,.001) && Tol(a.endpoint2y, a1.endpoint2y,.001))){
                //endpoint connected.
                connectedArcEndpoints += 1;
            }
            if((Tol(a.endpoint1x,a1.endpoint2x,.001) && Tol(a.endpoint1y, a1.endpoint2y,.001)) || (Tol(a.endpoint2x, a1.endpoint1x,.001) && Tol(a.endpoint2y, a1.endpoint1y,.001))){
                //endpoint connected.
                connectedArcEndpoints += 1;
            }
        }
    }


    if(connectedLines + connectedArcEndpoints < 2){

        var undoArc = JSON.parse(JSON.stringify(a));

	    for(var k = 0; k < linearDimArray.length; k++){
	        if(linearDimArray[k].elementID == filletID){
	            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
	        }
	    }
        if(calledFromUndo != true){
		//In this event, the only thing that needs to be done in an undo is just replacing the fillet and the associated dimension in the arrays. Skip all of the other stuff.
    	updateUserMoves(['deletefillet',undoArc,undoLinearDim,null,null,null,null,null,null]);
        GenerateInverse();
        }
        arcArray.splice(delIndex, 1);
		deletedim(a.arcID);
        closeOrOpenSection();
		return 0;
    }


	for(var i = 0; i < arcArray.length; i++){
		a = arcArray[i];

	    //Go through the  undoFilletArray and get the element corresponding to that fillet:
	    for(var j = 0; j < undoFilletArray.length; j++){
	        if(undoFilletArray[j][1] == filletID){
	            var lastMove = undoFilletArray[j];
	        }
	    }

		if (a.arcID == filletID){
		    if(calledFromUndo != true){
		        //find the associated dimension and save it.
    		    for(var k = 0; k < linearDimArray.length; k++){
    		        if(linearDimArray[k].elementID == filletID){
    		            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
    		        }
    		    }
    		    ////console.log('arcIDdeleted: ', a.arcID, 'undoLinearDim: ', undoLinearDim);
                if(boxSelectorTrim == true){
                    var undoline1 = null;
                    var undoline2 = null;
                }
                else{
                    var undoline1 = null;
                    var undoline2 = null;
                    var undoLinearDim1 = null;
                    var undoLinearDim2 = null;
                    var undoAngularDim1 = null;
                    var undoAngularDim2 = null;

        		    //Get the state of line1:
        		    for(var k = 0; k < lineArray.length; k++){
        		        if(lineArray[k].lineID == lastMove[2].lineID){
        		            undoline1 = JSON.parse(JSON.stringify(lineArray[k]));
        		        }
        		    }
        		    for(var k = 0; k < linearDimArray.length; k++){
        		        if(linearDimArray[k].elementID == lastMove[2].lineID){
        		            undoLinearDim1 = JSON.parse(JSON.stringify(linearDimArray[k]));
        		        }
        		    }
        		    for(var k = 0; k < AngularDimArray.length; k++){
        		        if(AngularDimArray[k].elementID == lastMove[2].lineID){
        		            undoAngularDim1 = JSON.parse(JSON.stringify(AngularDimArray[k]));
        		        }
        		    }
        		    //Get the state of line2:
        		    for(var k = 0; k < lineArray.length; k++){
        		        if(lineArray[k].lineID == lastMove[3].lineID){
        		            undoline2 = JSON.parse(JSON.stringify(lineArray[k]));
        		        }
        		    }
        		    for(var k = 0; k < linearDimArray.length; k++){
        		        if(linearDimArray[k].elementID == lastMove[3].lineID){
        		            undoLinearDim2 = JSON.parse(JSON.stringify(linearDimArray[k]));
        		        }
        		    }
        		    for(var k = 0; k < AngularDimArray.length; k++){
        		        if(AngularDimArray[k].elementID == lastMove[3].lineID){
        		            undoAngularDim2 = JSON.parse(JSON.stringify(AngularDimArray[k]));
        		        }
        		    }
                }

                var undoArc = JSON.parse(JSON.stringify(a));

    	        updateUserMoves(['deletefillet',undoArc,undoLinearDim,undoline1,undoline2,undoLinearDim1,undoLinearDim2,undoAngularDim1, undoAngularDim2]);

    	        GenerateInverse();
		    }


            if(boxSelectorTrim != true){

                var connectedEndpoints = 0;
            //First, check that the fillet is connected to two lines. If not, just delete it and don't extend.
                for(var k = 0; k < lineArray.length; k++){
                    if(lineArray[k].lineID == lastMove[2].lineID){
                        //Operate on the line that was found:
                        var l1 = lineArray[k];
                        //Figure out which end needs to move, based on which end has endpoints that match up with one of the arc endpoints as is:
                        if((Tol(a.endpoint1x, l1.startx,.001) && Tol(a.endpoint1y, l1.starty,.001)) || (Tol(a.endpoint2x, l1.startx,.001) && Tol(a.endpoint2y, l1.starty,.001))){
                            //endpoint connected.
                            connectedEndpoints += 1;
                        }
                        else if((Tol(a.endpoint1x, l1.endx,.001) && Tol(a.endpoint1y, l1.endy,.001)) || (Tol(a.endpoint2x, l1.endx,.001) && Tol(a.endpoint2y, l1.endy,.001))){
                            //endpoint connected.
                            connectedEndpoints += 1;
                        }
                    }
                    else if(lineArray[k].lineID == lastMove[3].lineID){
                        //Operate on the line that was found:
                        var l2 = lineArray[k];
                        if((Tol(a.endpoint1x, l2.startx,.001) && Tol(a.endpoint1y, l2.starty,.001)) || (Tol(a.endpoint2x, l2.startx,.001) && Tol(a.endpoint2y, l2.starty,.001))){
                            //endpoint connected.
                            connectedEndpoints += 1;
                        }
                        else if((Tol(a.endpoint1x, l2.endx,.001) && Tol(a.endpoint1y, l2.endy,.001)) || (Tol(a.endpoint2x, l2.endx,.001) && Tol(a.endpoint2y, l2.endy,.001))){
                            //endpoint connected.
                            connectedEndpoints += 1;
                        }
                    }
                }


                //If the arc is connected at both ends to an arc, just do the math to find replacement start and endpoints for lines:
                var connectedArcEndpoints = 0;
                //First, check that the fillet is connected to two arcs.
                for(var k = 0; k < arcArray.length; k++){
                    var a1 = arcArray[k];
                    if(a1.arcID != a.arcID){
                        //Figure out which end needs to move, based on which end has endpoints that match up with one of the arc endpoints as is:
                        if((Tol(a.endpoint1x, a1.endpoint1x,.001) && Tol(a.endpoint1y, a1.endpoint1y,.001)) || (Tol(a.endpoint2x, a1.endpoint2x,.001) && Tol(a.endpoint2y, a1.endpoint2y,.001))){
                            //endpoint connected.
                            connectedArcEndpoints += 1;
                        }
                        if((Tol(a.endpoint1x, a1.endpoint2x,.001) && Tol(a.endpoint1y, a1.endpoint2y,.001)) || (Tol(a.endpoint2x, a1.endpoint1x,.001) && Tol(a.endpoint2y, a1.endpoint1y,.001))){
                            //endpoint connected.
                            connectedArcEndpoints += 1;
                        }
                    }
                }


                var line1Found = false;
                var line2Found = false;
                //First, because the lines may have been deleted, reinstate if not found in lineArray:
                for(var k = 0; k < lineArray.length; k++){
                    //get the first of the two lines attached.
                    if(lineArray[k].lineID == lastMove[2].lineID){
                        var line1Found = true;
                    }
                }

                if(line1Found == false){
                    ////console.log('line1 is deleted')
                    //reinstate line1 data:
                        //Push the saved line object back into the lineArray
                        var lineToPush = new Line(lastMove[4].startx, lastMove[4].starty, lastMove[4].endx, lastMove[4].endy, lastMove[4].dim, lastMove[4].lineID, lastMove[4].lineLength, lastMove[4].constLine, lastMove[4].angle, lastMove[4].startxghost,lastMove[4].startyghost,lastMove[4].endxghost, lastMove[4].endyghost, lastMove[4].midpointX, lastMove[4].midpointY);
                        lineArray.push(lineToPush);

                        ////console.log('line 1 pushed in: ', lineToPush);

                        //push saved lineardimension object back into lineardimArray
            			linearDimArray.push(new LinearDimension(lastMove[6].value, lastMove[6].x, lastMove[6].y, lastMove[6].elementID, lastMove[6].showDim, lastMove[6].startx, lastMove[6].starty, lastMove[6].endx, lastMove[6].endy, lastMove[6].orientation, lastMove[6].startx1, lastMove[6].starty1, lastMove[6].endx1, lastMove[6].endy1, lastMove[6].startx2, lastMove[6].starty2, lastMove[6].endx2, lastMove[6].endy2,lastMove[6].type,lastMove[6].angle,lastMove[6].xoffset1,lastMove[6].yoffset1, lastMove[6].xoffset2, lastMove[6].yoffset2, lastMove[6].perpOffset));

                        //push saved angular dimension object back into angulardimarray
                        AngularDimArray.push(new AngularDimension(lastMove[7].value, lastMove[7].x, lastMove[7].y, lastMove[7].elementID, lastMove[7].showDim, lastMove[7].startx, lastMove[7].starty));

                }

                //First, because the lines may have been deleted, reinstate if not found in lineArray:
                for(var k = 0; k < lineArray.length; k++){
                    //get the first of the two lines attached.
                    if(lineArray[k].lineID == lastMove[3].lineID){
                        line2Found = true;
                    }
                }

                if(line2Found == false){
                    ////console.log('line2 is deleted')
                        //Push the saved line object back into the lineArray
                        var lineToPush = new Line(lastMove[5].startx, lastMove[5].starty, lastMove[5].endx, lastMove[5].endy, lastMove[5].dim, lastMove[5].lineID, lastMove[5].lineLength, lastMove[5].constLine, lastMove[5].angle, lastMove[5].startxghost,lastMove[5].startyghost,lastMove[5].endxghost, lastMove[5].endyghost, lastMove[5].midpointX, lastMove[5].midpointY);
                        lineArray.push(lineToPush);

                       // //console.log('line 2 pushed in: ', lineToPush);

                        //push saved lineardimension object back into lineardimArray
            			linearDimArray.push(new LinearDimension(lastMove[8].value, lastMove[8].x, lastMove[8].y, lastMove[8].elementID, lastMove[8].showDim, lastMove[8].startx, lastMove[8].starty, lastMove[8].endx, lastMove[8].endy, lastMove[8].orientation, lastMove[8].startx1, lastMove[8].starty1, lastMove[8].endx1, lastMove[8].endy1, lastMove[8].startx2, lastMove[8].starty2, lastMove[8].endx2, lastMove[8].endy2,lastMove[8].type,lastMove[8].angle,lastMove[8].xoffset1,lastMove[8].yoffset1, lastMove[8].xoffset2, lastMove[8].yoffset2, lastMove[8].perpOffset));

                        //push saved angular dimension object back into angulardimarray
                        AngularDimArray.push(new AngularDimension(lastMove[9].value, lastMove[9].x, lastMove[9].y, lastMove[9].elementID, lastMove[9].showDim, lastMove[9].startx, lastMove[9].starty));

                }


                if(connectedArcEndpoints + connectedEndpoints >= 2){
                    //find the shared ghost point and extend both lines to that point:
                    for(var k = 0; k < lineArray.length; k++){
                        //get the first of the two lines attached.
                        if(lineArray[k].lineID == lastMove[2].lineID){
                            //Operate on the line that was found:
                            var l1 = lineArray[k];
                            var gp1sx = l1.startxghost;
                            var gp1sy = l1.startyghost;
                            var gp1ex = l1.endxghost;
                            var gp1ey = l1.endyghost;
                        }
                        if(lineArray[k].lineID == lastMove[3].lineID){
                            //Operate on the line that was found:
                            var l2 = lineArray[k];
                            var gp2sx = l2.startxghost;
                            var gp2sy = l2.startyghost;
                            var gp2ex = l2.endxghost;
                            var gp2ey = l2.endyghost;
                        }
                    }

                    var ptx = 0
                    var pty = 0

                    //find what the common point is:
                    if(Tol(gp1sx,gp2sx,.001) && Tol(gp1sy,gp2sy,.001)){
                        ptx = gp1sx;
                        pty = gp1sy;

                        l1.startx = gp1sx;
                        l1.starty = gp1sy;
                        l2.startx = gp2sx;
                        l2.starty = gp2sy;

                        retPoint = [l1.startx,l1.starty];

                    }
                    if(Tol(gp1sx,gp2ex,.001) && Tol(gp1sy,gp2ey,.001)){
                        ptx = gp1sx;
                        pty = gp1sy;

                        l1.startx = gp1sx;
                        l1.starty = gp1sy;
                        l2.endx = gp2ex;
                        l2.endy = gp2ey;

                        retPoint = [l1.startx,l1.starty];

                    }
                    if(Tol(gp1ex,gp2sx,.001) && Tol(gp1ey,gp2sy,.001)){
                        ptx = gp1ex;
                        pty = gp1ey;

                        l1.endx = gp1ex;
                        l1.endy = gp1ey;
                        l2.startx = gp2sx;
                        l2.starty = gp2sy;

                        retPoint = [l1.endx,l1.endy];


                    }
                    if(Tol(gp1ex,gp2ex,.001) && Tol(gp1ey,gp2ey,.001)){
                        ptx = gp1ex;
                        pty = gp1ey;

                        l1.endx = gp1ex;
                        l1.endy = gp1ey;
                        l2.endx = gp2ex;
                        l2.endy = gp2ey;

                        retPoint = [l1.endx,l1.endy];

                    }

                }




                /*
                if(false){//connectedEndpoints == 2 && connectedArcEndpoints != 2){
                    //From that data, elements 2 and 3 are pre-fillet creation line data. Take that and replace just the endpoints that were changed by fillet creation.
                    for(var k = 0; k < lineArray.length; k++){
                        if(lineArray[k].lineID == lastMove[2].lineID){
                            //Operate on the line that was found:
                            var l1 = lineArray[k];
                            //Figure out which end needs to move, based on which end has endpoints that match up with one of the arc endpoints as is:
                            //Problem with this is that if you have a zll (due to arc-arc situation), both start and end will be at fillet endpoint and start will always be selected.
                            //If that happens, just move one of the ends to the non-coincident with arc endpoint location.

                            if((Tol(a.endpoint1x, l1.startx,.001) && Tol(a.endpoint1y, l1.starty,.001)) || (Tol(a.endpoint2x, l1.startx,.001) && Tol(a.endpoint2y, l1.starty,.001))){
                                l1.startx = lastMove[2].startx;
                                l1.starty = lastMove[2].starty;
                                retPoint = [l1.startx,l1.starty];
                                l1.startxghost = null;
                                l1.startyghost = null;
                            }
                            else if((Tol(a.endpoint1x, l1.endx,.001) && Tol(a.endpoint1y, l1.endy,.001)) || (Tol(a.endpoint2x, l1.endx,.001) && Tol(a.endpoint2y, l1.endy,.001))){
                                l1.endx = lastMove[2].endx;
                                l1.endy = lastMove[2].endy;
                                retPoint = [l1.endx,l1.endy];
                                l1.endxghost = null;
                                l1.endyghost = null;
                            }
                            //new Line(lastMove[2].startx, lastMove[2].starty, lastMove[2].endx, lastMove[2].endy, lastMove[2].dim, lastMove[2].lineID, lastMove[2].lineLength, lastMove[2].constLine, lastMove[2].angle, lastMove[2].startxghost,lastMove[2].startyghost,lastMove[2].endxghost, lastMove[2].endyghost, lastMove[2].midpointX, lastMove[2].midpointY);
                            updateLinearDimension(l1.lineID);
                        }

                        else if(lineArray[k].lineID == lastMove[3].lineID){
                            //Operate on the line that was found:
                            var l2 = lineArray[k];

                            if((Tol(a.endpoint1x, l2.startx,.001) && Tol(a.endpoint1y, l2.starty,.001)) || (Tol(a.endpoint2x, l2.startx,.001) && Tol(a.endpoint2y, l2.starty,.001))){
                                l2.startx = lastMove[3].startx;
                                l2.starty = lastMove[3].starty;
                                retPoint = [l2.startx,l2.starty];
                                l2.startxghost = null;
                                l2.startyghost = null;
                            }
                            else if((Tol(a.endpoint1x, l2.endx,.001) && Tol(a.endpoint1y, l2.endy,.001)) || (Tol(a.endpoint2x, l2.endx,.001) && Tol(a.endpoint2y, l2.endy,.001))){
                                l2.endx = lastMove[3].endx;
                                l2.endy = lastMove[3].endy;
                                retPoint = [l2.endx,l2.endy];
                                l2.endxghost = null;
                                l2.endyghost = null;
                            }
                            //new Line(lastMove[2].startx, lastMove[2].starty, lastMove[2].endx, lastMove[2].endy, lastMove[2].dim, lastMove[2].lineID, lastMove[2].lineLength, lastMove[2].constLine, lastMove[2].angle, lastMove[2].startxghost,lastMove[2].startyghost,lastMove[2].endxghost, lastMove[2].endyghost, lastMove[2].midpointX, lastMove[2].midpointY);
                            updateLinearDimension(l2.lineID);
                        }
                    }
                }
                */
            }
			arcArray.splice(i, 1);
			deletedim(a.arcID);
            ClearStressVis();
		}
	}
    if(typeof l1 !== "undefined"){
        updateLinearDimension(l1.lineID);
    }
    if(typeof l2 !== "undefined"){
        updateLinearDimension(l2.lineID);
    }

	closeOrOpenSection()
    return retPoint;
}
//t...
//acts like deletefillet, but instead of deleting, returns the endpoint that would be created
//if the fillet was deleted.
function cornerfillet(filletID){

    var retPoint = [];

	for(var i = 0; i < arcArray.length; i++){
		a = arcArray[i];

	    //Go through the  undoFilletArray and get the element corresponding to that fillet:
	    for(var j = 0; j < undoFilletArray.length; j++){
	        if(undoFilletArray[j][1] == filletID){
	            var lastMove = undoFilletArray[j];
	        }
	    }

		if (a.arcID == filletID){
            //From that data, elements 2 and 3 are pre-fillet creation line data. Take that and replace just the endpoints that were changed by fillet creation.
            for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[2].lineID){
                    //Operate on the line that was found:
                    var l1 = lineArray[k];
                    //Figure out which end needs to move, based on which end has endpoints that match up with one of the arc endpoints as is:
                    if((Tol(a.endpoint1x, l1.startx,.001) && Tol(a.endpoint1y, l1.starty,.001)) || (Tol(a.endpoint2x, l1.startx,.001) && Tol(a.endpoint2y, l1.starty,.001))){
                        retPoint = [lastMove[2].startx,lastMove[2].starty];
                    }
                    else if((Tol(a.endpoint1x, l1.endx,.001) && Tol(a.endpoint1y, l1.endy,.001)) || (Tol(a.endpoint2x, l1.endx,.001) && Tol(a.endpoint2y, l1.endy,.001))){
                        retPoint = [lastMove[2].endx,lastMove[2].endy];
                    }
                    //new Line(lastMove[2].startx, lastMove[2].starty, lastMove[2].endx, lastMove[2].endy, lastMove[2].dim, lastMove[2].lineID, lastMove[2].lineLength, lastMove[2].constLine, lastMove[2].angle, lastMove[2].startxghost,lastMove[2].startyghost,lastMove[2].endxghost, lastMove[2].endyghost, lastMove[2].midpointX, lastMove[2].midpointY);
                    updateLinearDimension(l1.lineID);
                }
                else if(lineArray[k].lineID == lastMove[3].lineID){
                    //Operate on the line that was found:
                    var l2 = lineArray[k];
                    if((Tol(a.endpoint1x, l2.startx,.001) && Tol(a.endpoint1y, l2.starty,.001)) || (Tol(a.endpoint2x, l2.startx,.001) && Tol(a.endpoint2y, l2.starty,.001))){
                        retPoint = [lastMove[3].startx,lastMove[3].starty];
                    }
                    else if((Tol(a.endpoint1x, l2.endx,.001) && Tol(a.endpoint1y, l2.endy,.001)) || (Tol(a.endpoint2x, l2.endx,.001) && Tol(a.endpoint2y, l2.endy,.001))){
                        retPoint = [lastMove[3].endx,lastMove[3].endy];
                    }

                }
            }
		}
	}
    return retPoint;
}

/*
function deletefillet(filletID, calledFromUndo){
	for(var i = 0; i < arcArray.length; i++){
		a = arcArray[i];
		if (a.arcID == filletID){
		    if(calledFromUndo != true){
    		    for(var k = 0; k < linearDimArray.length; k++){
    		        if(linearDimArray[k].elementID == filletID){
    		            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
    		        }
    		    }
                var undoArc = JSON.parse(JSON.stringify(a));
    	        updateUserMoves(['deletefillet',undoArc, undoLinearDim]);
    	        GenerateInverse();
		    }

		    //Go through the  undoFilletArray and get the element corresponding to that fillet:
		    for(var j = 0; j < undoFilletArray.length; j++){
		        if(undoFilletArray[j][1] == filletID){
		            var lastMove = undoFilletArray[j];
		        }
		    }

            deletefillet(lastMove[0][1], true);

            //replace the lines that were shortened with their pre-shortened data:
            for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[0][2].lineID){
                    var lineToSplice = new Line(lastMove[0][2].startx, lastMove[0][2].starty, lastMove[0][2].endx, lastMove[0][2].endy, lastMove[0][2].dim, lastMove[0][2].lineID, lastMove[0][2].lineLength, lastMove[0][2].constLine, lastMove[0][2].angle, lastMove[0][2].startxghost,lastMove[0][2].startyghost,lastMove[0][2].endxghost, lastMove[0][2].endyghost, lastMove[0][2].midpointX, lastMove[0][2].midpointY);
                    //console.log('1');
                    lineArray.splice(k,1,lineToSplice);
                    updateLinearDimension(lineToSplice.lineID);
                }
                else if(lineArray[k].lineID == lastMove[0][3].lineID){
                    var lineToSplice = new Line(lastMove[0][3].startx, lastMove[0][3].starty, lastMove[0][3].endx, lastMove[0][3].endy, lastMove[0][3].dim, lastMove[0][3].lineID, lastMove[0][3].lineLength, lastMove[0][3].constLine, lastMove[0][3].angle, lastMove[0][3].startxghost,lastMove[0][3].startyghost,lastMove[0][3].endxghost, lastMove[0][3].endyghost, lastMove[0][3].midpointX, lastMove[0][3].midpointY);
                    lineArray.splice(k,1,lineToSplice);
                    updateLinearDimension(lineToSplice.lineID);
                }
            }
			arcArray.splice(i, 1);
			deletedim(a.arcID);
		}
	}
    closeOrOpenSection();
}
*/

function deleteSRP(id){
	for(var i = 0; i < SRPArray.length; i++){
		s = SRPArray[i];
		if (s.SRPid == id){
			SRPArray.splice(i, 1);
		}
	}
	for(var i = 0; i < labelArray.length; i++){
			l = labelArray[i];
			if (l.labelID == id){
				labelArray.splice(i, 1);
			}
		}
}


function deletedim(elementID, keepRels){
	for(var i = 0; i < linearDimArray.length; i++){
		d = linearDimArray[i];
		if(d.elementID == elementID){
			linearDimArray.splice(i,1);
		}
	}


    	for(var i = 0; i < AngularDimArray.length; i++){
    		a = AngularDimArray[i];
    		if(a.elementID == elementID){
    			AngularDimArray.splice(i,1);
    		}
    	}
	//When undoing fillet deletes, don't delete attached relative dimensions.
	if(keepRels != true){
    	for(var i = 0; i < relAngleArray.length; i++){
    		a = relAngleArray[i];
    		if(a.line1ID == elementID || a.line2ID == elementID || a.elementID == elementID){
    			relAngleArray.splice(i,1);
    		}
    	}
	}

}


function suggestHVSnap(startOrend){

	var xySnapRange = 5;
	var returnArray = [];
	var snapped = false;
	var xcoordinate;
	var ycoordinate;
	var snappedAlready = false;
	var VertorHoriz = 0;
	var dontdraw = false;
	var excludedLine = 999;
	var pLine = 'none';

	//for second line on, determine the existance and orientation of the previewLine currently being drawn.

    	if (firstLineDrawn == true){
    		if(previewLine.startx != 0 && previewLine.endx != 0){
    			if(Tol(previewLine.startx, previewLine.endx, .0001))
    			{
    				pLine = 'vert';
    			}
    			else if(Tol(previewLine.starty, previewLine.endy, .0001)){
    				pLine = 'horiz';
    			}
    		}
    		else{
    			pLine = 'none';
    		}
    	}
    	//If the line originates as a snap to another line, exclude that line from the possible snaps:
    		for(var i = 0; i < lineArray.length; i++){
    			l = lineArray[i];
    			if(l.startx == previewLine.startx && l.starty == previewLine.starty){
    				excludedLine = l.lineID;
    			}
    			else if(l.endx == previewLine.startx && l.endy == previewLine.starty){
    				excludedLine = l.lineID;
    			}
    		}


    		for (var i = 0; i < lineArray.length; i++){
    			if(snappedAlready == false){
    				c.setLineDash([1,3]);
    				c.strokeStyle = "blue";
    				l = lineArray[i];

    				if(l.lineID != excludedLine){

    					start_y_dist = Math.abs(l.starty - mouse.y);
    					end_y_dist = Math.abs(l.endy - mouse.y);
    					start_x_dist = Math.abs(l.startx - mouse.x);
    					end_x_dist = Math.abs(l.endx - mouse.x);

    					if(mouse.y < l.starty + xySnapRange && mouse.y > l.starty - xySnapRange && pLine != 'horiz'){//&& start_x_dist <= end_x_dist && pLine != 'horiz'){
    						snapped = true;
    							c.beginPath();
    							c.moveTo(l.startx, l.starty);
    							c.lineTo(mouse.x, l.starty);
    							c.stroke();
    						if(startOrend == 'start'){
    						xcoordinate = mouse.x;
    						}
    						else{
    						xcoordinate = previewLine.startx;
    						}
    						ycoordinate = l.starty;
    						snappedAlready = true;
    						VertorHoriz = 'horiz'
    					}
    					else if(mouse.y < l.endy + xySnapRange && mouse.y > l.endy - xySnapRange && pLine != 'horiz'){// && start_x_dist >= end_x_dist && pLine != 'horiz'){
    						snapped = true;
    							c.beginPath();
    							c.moveTo(l.endx, l.endy);
    							c.lineTo(mouse.x, l.endy);
    							c.stroke();
    						if(startOrend == 'start'){
    						xcoordinate = mouse.x;
    						}
    						else{
    						xcoordinate = previewLine.startx;
    						}
    						ycoordinate = l.endy;
    						snappedAlready = true;
    						VertorHoriz = 'horiz'
    					}
    					else if(mouse.x < l.startx + xySnapRange && mouse.x > l.startx - xySnapRange && pLine != 'vert'){//&& start_y_dist <= end_y_dist && pLine != 'vert'){
    						snapped = true;
    							c.beginPath();
    							c.moveTo(l.startx, l.starty);
    							c.lineTo(l.startx, mouse.y);
    							c.stroke();
    						xcoordinate = l.startx;
    						if(startOrend == 'start'){
    						ycoordinate = mouse.y;
    						}
    						else{
    						ycoordinate = previewLine.starty;
    						}
    						snappedAlready = true;
    						VertorHoriz = 'vert'
    					}
    					else if(mouse.x < l.endx + xySnapRange && mouse.x > l.endx - xySnapRange && pLine != 'vert'){//&& start_y_dist >= end_y_dist  && pLine != 'vert'){
    						snapped = true;
    							c.beginPath();
    							c.moveTo(l.endx, l.endy);
    							c.lineTo(l.endx, mouse.y);
    							c.stroke();
    						xcoordinate = l.endx;
    						if(startOrend == 'start'){
    						ycoordinate = mouse.y;
    						}
    						else{
    						ycoordinate = previewLine.starty;
    						}
    						snappedAlready = true;
    						VertorHoriz = 'vert'
    					}

    				}
    			}
    		}

	var retArray = [snapped, xcoordinate, ycoordinate,VertorHoriz];

	c.setLineDash([]);
	return retArray;
}


function createRelAngleDim(value, elementID, radstart, radend, centroidx, centroidy, radius, line1ID, line2ID, direction){

    //Don't make a dim if the lines don't share an endpoint.
    if(radius == 0){
        displayError('anglenoendpoint','Lines selected for angular dimension must share an endpoint.');
        return 0
    }
    //relative angles, because they are attached to multiple lines, are considered to be their own element:
    var repeatedDim = false;
    //detect already existing dimensions common to both lines:
    for(var i = 0; i < relAngleArray.length; i++){
        if((relAngleArray[i].line1ID == line1ID && relAngleArray[i].line2ID == line2ID) || (relAngleArray[i].line1ID == line2ID && relAngleArray[i].line2ID == line1ID)){
            repeatedDim = true;
        }
    }

    //Don't do any of this if both clicks happened on same line:

    if(line1ID != line2ID && repeatedDim == false){

        ElementID += 1;

        //This routine needs polishing, but is a basic way to generate initial coords for dim tag.
    	var avgtheta = (radstart + radend)/2;
    	var xfromcentroid = radius * Math.cos(avgtheta);
    	var yfromcentroid = radius * Math.sin(avgtheta);
    	var y = centroidy - 15
    	var x = centroidx + 15;

        var showDim = true;

        relAngleArray.push(new AngleRelDimension(value, x, y, ElementID, showDim, radstart, radend, centroidx, centroidy, radius, line1ID, line2ID, direction,false));

        var errorstringtoprint = 'Created Angular Dimension'
        PrintToLog(errorstringtoprint);

        //assign inital handle locations:
    	var avgtheta = relAngleArray[relAngleArray.length -1].radstart + (relAngleArray[relAngleArray.length -1].value/2)*(Math.PI/180);
    	var xfromcentroid = radius * Math.cos(avgtheta);
    	var yfromcentroid = radius * Math.sin(avgtheta);

    	relAngleArray[relAngleArray.length -1].handley = relAngleArray[relAngleArray.length -1].centroidy + yfromcentroid;
    	relAngleArray[relAngleArray.length -1].handlex = relAngleArray[relAngleArray.length -1].centroidx + xfromcentroid;

        relAngleArray[relAngleArray.length -1].x = relAngleArray[relAngleArray.length -1].handlex + 15;
        relAngleArray[relAngleArray.length -1].y = relAngleArray[relAngleArray.length -1].handley - 15;

        updateHandles();
        //e...
		updateUserMoves(['newreldim',ElementID]);
	    GenerateInverse();
    }
}


function updateRelAngleDim(elementID){
//This function updates the relangledim after a change.

        //First, you need to get the angle element:
        for(var i = 0; i < relAngleArray.length; i++){
            if(relAngleArray[i].elementID == elementID){
                a = relAngleArray[i];
            }
        }

        //Next, you need to find what values to pass into the element:
        var relAngleD = drawAngleArcSnap(100,100,a.line1ID,a.direction,a.line2ID);

        //Contents of relAngleD: [angleBetween, 100, radstart, radend, xc, yc, startLine, endLine, rad, mouseMotion];

        a.value = relAngleD[0];
        a.radstart = relAngleD[2];
        a.radend = relAngleD[3];

        //assign inital handle locations:
    	var avgtheta = a.radstart + (a.value/2)*(Math.PI/180);
    	var xfromcentroid = a.radius * Math.cos(avgtheta);
    	var yfromcentroid = a.radius * Math.sin(avgtheta);

    	//Only if a flip is made between on arc and not on arc, need to update the location of the handle:

        var inOrigArc = true
        if(a.displayFlippedArc == true){
            inOrigArc = false;
        }

        //If it is in the original arc, return it to the center of that location if it is moved away:

        if(inOrigArc == true){
            var avgtheta = (lineAngleFromOrigin(d.centroidx,d.centroidy, a.handlex, a.handley) - 90)*(Math.PI/180);

        	if(avgtheta < 0){
        	    avgtheta = 2*Math.PI + avgtheta;
        	}

            if(a.radend > a.radstart){
            	if(avgtheta > a.radstart && avgtheta < a.radend){
            	    //a.displayFlippedArc = false;
            	}
            	else{
            	    //Change it so that it is back on the arc:
        	        a.handley = a.centroidy + yfromcentroid;
        	        a.handlex = a.centroidx + xfromcentroid;
            	    //a.displayFlippedArc = true;
            	}
            }

            else{
                if(avgtheta > a.radstart){
            	    //a.displayFlippedArc = false;
                }
                else if(avgtheta < a.radend){
            	    //a.displayFlippedArc = false;
                }
                else{
                    //a.displayFlippedArc = true;
            	    //Change it so that it is back on the arc:
        	        a.handley = a.centroidy + yfromcentroid;
        	        a.handlex = a.centroidx + xfromcentroid;
                }
            }
        }
        //ddd...
        //If it is not in the original arc, return it to the center of the non original arc:
        else{
            var avgtheta = (lineAngleFromOrigin(d.centroidx,d.centroidy, a.handlex, a.handley) - 90)*(Math.PI/180);

    	    var radstartDisplay = this.radend;
    	    var radendDisplay = this.radstart;


        	if(avgtheta < 0){
        	    avgtheta = 2*Math.PI + avgtheta;
        	}

            if(radendDisplay > radstartDisplay){
            	if(avgtheta > radstartDisplay && avgtheta < radendDisplay){
            	    //a.displayFlippedArc = false;
            	}
            	else{
            	   //assign inital handle locations:
                	var avgtheta = a.radend + ((360 - a.value)/2)*(Math.PI/180);
                	var xfromcentroid = a.radius * Math.cos(avgtheta);
                	var yfromcentroid = a.radius * Math.sin(avgtheta);

            	    //Change it so that it is back on the arc:
        	        a.handley = a.centroidy + yfromcentroid;
        	        a.handlex = a.centroidx + xfromcentroid;
            	    //a.displayFlippedArc = true;
            	}
            }

            else{
                if(avgtheta > radstartDisplay){
            	    //a.displayFlippedArc = false;
                }
                else if(avgtheta < radendDisplay){
            	    //a.displayFlippedArc = false;
                }
                else{
                    //a.displayFlippedArc = true;
            	    //Change it so that it is back on the arc:
                	var avgtheta = a.radend + ((360 - a.value)/2)*(Math.PI/180);
                	var xfromcentroid = a.radius * Math.cos(avgtheta);
                	var yfromcentroid = a.radius * Math.sin(avgtheta);
        	        a.handley = a.centroidy + yfromcentroid;
        	        a.handlex = a.centroidx + xfromcentroid;
                }
            }
        }
        //err. Don't move the handle and the tag everytime a change is made. Just park it.
    	//a.handley = a.centroidy + yfromcentroid;
    	//a.handlex = a.centroidx + xfromcentroid;

        //a.x = a.handlex + 15;
        //a.y = a.handley - 15;
        closeOrOpenSection();

}

function calcClickAngle(x,y,startLine){
    var clickAngle = 0;

    for(var i = 0; i<lineArray.length; i++){
        if(lineArray[i].lineID == startLine){
            var disttostart = Math.sqrt(Math.pow(lineArray[i].startx- x,2)+Math.pow(lineArray[i].starty - y,2));
            var disttoend = Math.sqrt(Math.pow(lineArray[i].endx- x,2)+Math.pow(lineArray[i].endy - y,2));
            if(disttostart < disttoend){
                clickAngle = lineAngleFromOrigin(lineArray[i].startx, lineArray[i].starty, x, y);
            }
            else if(disttostart > disttoend){
                clickAngle = lineAngleFromOrigin(lineArray[i].endx, lineArray[i].endy, x, y);
            }
        }
    }
    return clickAngle;
}

function drawAngleArc(x,y,startLine,mouseMotion){
//Draws an arc with radius = distance from nearest endpoint from selected line to the cursor.
    //Find closest endpoint to mouse position:
    var startOrEndCentroid = 'null';
    for(var i = 0; i<lineArray.length; i++){
        if(lineArray[i].lineID == startLine){
            var disttostart = Math.sqrt(Math.pow(lineArray[i].startx- x,2)+Math.pow(lineArray[i].starty - y,2));
            var disttoend = Math.sqrt(Math.pow(lineArray[i].endx- x,2)+Math.pow(lineArray[i].endy - y,2));
            if(disttostart < disttoend){
                var xc = lineArray[i].startx;
                var yc = lineArray[i].starty;
                var rad = disttostart;
                var lineAngle = 360 - lineArray[i].angle;
            }
            else if(disttostart > disttoend){
                var xc = lineArray[i].endx;
                var yc = lineArray[i].endy;
                var rad = disttoend;
                var lineAngle = 360 - lineArray[i].angle -180;
            }
        }
    }

    var mouseAngle = lineAngleFromOrigin(xc,yc, x,y) - 90;

    if(mouseMotion == 'ccw'){
        var radstart =  mouseAngle*(Math.PI/180);
        var radend = lineAngle*(Math.PI/180);
    }
    else if(mouseMotion == 'cw'){
        var radstart = lineAngle*(Math.PI/180);
        var radend = mouseAngle*(Math.PI/180);
    }

    if(radstart < 0){
        radstart = radstart + 2*Math.PI;
    }
    ////console.log('RadStart: ', radstart);
    ////console.log('RadEnd: ', radend);

    var angleBetween = Math.abs(mouseAngle - lineAngle);
    if(angleBetween > 360){
        angleBetween = angleBetween - 360;
    }

	c.beginPath();
	c.strokeStyle = 'black';
	c.lineWidth = .5;
	c.arc(xc, yc, rad,radstart,radend,false);
	c.stroke();

    retArray = [angleBetween, 100, radstart, radend, xc, yc,rad];

    return retArray;

}


//Does the same thing as above, but bases final angle value off of line data, not just how
//it is drawn.
function drawAngleArcSnap(x,y,startLine,mouseMotion,endLine){
    //First, get all of the start and end points for the involved lines.
    for(var i = 0; i < lineArray.length; i++){
        if(lineArray[i].lineID == startLine){
            var l1 = lineArray[i];
        }
        if(lineArray[i].lineID == endLine){
            var l2 = lineArray[i];
        }
    }

    var disttostart = Math.sqrt(Math.pow(l1.startx- x,2)+Math.pow(l1.starty - y,2));
    var disttoend = Math.sqrt(Math.pow(l1.endx- x,2)+Math.pow(l1.endy - y,2));


    //Determine where the shared endpoint is:
    SorEArray = endpointCommonToLines(startLine, endLine);

    //in the event the user wants to create an angular dimension 'around' a fillet for two lines that used to have a common point,
    //the SorEArray needs to return start or end based on existing endpoints and ghost endpoints.

    //The angle between the lines is known by taking the angles of both lines ccw from 0 at the intersection point.

    var line1origAngle = 0;
    var line2origAngle = 0;
    var xc = 0;
    var yc = 0;
    var rad = 0;


    //xc and yc must be those of ghost endpoints if the lines used to be joined but are now filleted.
    if(SorEArray[0] == 'start'){
        line1origAngle = l1.angle;
        xc = SorEArray[2];
        yc = SorEArray[3];
        rad = disttostart;
    }
    else if(SorEArray[0] == 'end'){
        line1origAngle = 180 + l1.angle;
        if(line1origAngle > 360){
            line1origAngle = line1origAngle - 360;
        }
        xc = SorEArray[2];
        yc = SorEArray[3];
        rad = disttoend;
    }

    if(SorEArray[1] == 'start'){
        line2origAngle = l2.angle;
    }
    else if(SorEArray[1] == 'end'){
        line2origAngle = 180 + l2.angle;
        if(line2origAngle > 360){
            line2origAngle = line2origAngle - 360;
        }
    }

    //The actual angle between is the abs difference between line1 and line2 orig angles.

    var radstart = 0;
    var radend = 0;

    var line1origAngle = 360 - line1origAngle;
    var line2origAngle = 360 - line2origAngle;

    if(mouseMotion == 'cw'){
        radstart =  line1origAngle*(Math.PI/180);
        radend = line2origAngle*(Math.PI/180);
    }
    else if(mouseMotion == 'ccw'){
        radstart = line2origAngle*(Math.PI/180);
        radend = line1origAngle*(Math.PI/180);
    }

    if(radstart < 0){
        radstart = radstart + 2*Math.PI;
    }

    //var arcLength = (radstart - radend)*(180/Math.PI)
    ////console.log('radstart: ', radstart, 'radend: ', radend);

    var angleBetween = Math.abs(line2origAngle - line1origAngle);

    if(radstart > radend){
        angleBetween = 360 - angleBetween;
    }

    retArray = [angleBetween, 100, radstart, radend, xc, yc, startLine, endLine, rad, mouseMotion];

    return retArray;

}

function changeAngleBetween(line1, line2){

    //First, grab the line objects:
    //First, get all of the start and end points for the involved lines.
    for(var i = 0; i < lineArray.length; i++){
        if(lineArray[i].lineID == line1){
            var l1 = lineArray[i];
        }
        if(lineArray[i].lineID == line2){
            var l2 = lineArray[i];
        }
    }

//This function repositions line 2 relative to line 1. The shared endpoint stays in place
//and the line is rotated/translated as nescessary to achieve the entered relative angle.

//For development, we use an arbitrary angle. Input will be worked out later.

    var relAngle = 35;

    //First thing is to determine where the shared endpoint is:
    SorEArray = endpointCommonToLines(line1, line2);

    //The angle between the lines is known by taking the angles of both lines ccw from 0 at the intersection point.

    var line1origAngle = 0;
    var line2origAngle = 0;

    if(SorEArray[0] == 'start'){
        line1origAngle = l1.angle;
        ////console.log('line 1 angle: ', line1origAngle);
    }
    else if(SorEArray[0] == 'end'){
        line1origAngle = 180 + l1.angle;
        if(line1origAngle > 360){
            line1origAngle = line1origAngle - 360;
            ////console.log('line 1 angle: ', line1origAngle);
        }
    }

    if(SorEArray[1] == 'start'){
        line2origAngle = l2.angle;
        ////console.log('line 2 angle: ', line2origAngle);
    }
    else if(SorEArray[1] == 'end'){
        ////console.log('need to calculate line2origAngle!');
        line2origAngle = 180 + l2.angle;
        if(line2origAngle > 360){
            line2origAngle = line2origAngle - 360;
            ////console.log('line 2 angle: ', line2origAngle);
        }
    }

    ////////This stuff needs work - moving on to visualization for easier debugging:///////

    /*/
    calculate the angle between the lines and always take the accute side.
    if(line2origAngle > line1origAngle){
        //console.log('case 1');
        var newAngle1 = line2origAngle - relAngle;
    }
    else{
        //console.log('case 2');
        var newAngle1 = line2origAngle + relAngle;
    }

    var angleBetweenbefore = Math.abs(line2origAngle - line1origAngle);
    var angleBetweenafter = Math.abs(line2origAngle - newAngle1);
    //console.log('angle between and new angle: ',angleBetweenafter, newAngle1);

    //change the appropriate endpoint location for line1 to achieve desired angle:

    var line1length = Math.sqrt(Math.pow(l1.startx-l1.endx,2)+Math.pow(l1.starty - l1.endy,2));

    if(SorEArray[0] == 'start'){
        //In this case, change the endx and endy values.
	    l1.endx = l1.startx + line1length * Math.cos(newAngle1*(Math.PI/180));
	    l1.endy = l1.starty - line1length * Math.sin(newAngle1*(Math.PI/180));
    }
    else if(SorEArray[0] == 'end'){
        //In this case, change the startx and starty values.
	    l1.startx = l1.endx + line1length * Math.cos(newAngle1*(Math.PI/180));
	    l1.starty = l1.endy - line1length * Math.sin(newAngle1*(Math.PI/180));
    }
    */

}

function endpointCommonToLines(line1, line2){
//This function determines the endpoint that is shared (if there is one) between two lines.

        var l1SorE = 'none';
        var l2SorE = 'none';
        var xc = 0;
        var yc = 0;

    //First, get all of the start and end points for the involved lines.
    for(var i = 0; i < lineArray.length; i++){

        if(lineArray[i].lineID == line1){
            var sx1 = lineArray[i].startx;
            var sy1 = lineArray[i].starty;
            var ex1 = lineArray[i].endx;
            var ey1 = lineArray[i].endy;

            //Catch cases where fillets have been created:
    	    if(lineArray[i].startxghost != null){
    	        sx1 = lineArray[i].startxghost;
    	    }
    	    if(lineArray[i].startyghost != null){
    	        sy1 = lineArray[i].startyghost;
    	    }
    	    if(lineArray[i].endxghost != null){
    	        ex1 = lineArray[i].endxghost;
    	    }
            if(lineArray[i].endyghost != null){
                ey1 = lineArray[i].endyghost;
            }
        }
        if(lineArray[i].lineID == line2){
            var sx2 = lineArray[i].startx;
            var sy2 = lineArray[i].starty;
            var ex2 = lineArray[i].endx;
            var ey2 = lineArray[i].endy;

            //Catch cases where fillets have been created:
    	    if(lineArray[i].startxghost != null){
    	        sx2 = lineArray[i].startxghost;
    	    }
    	    if(lineArray[i].startyghost != null){
    	        sy2 = lineArray[i].startyghost;
    	    }
    	    if(lineArray[i].endxghost != null){
    	        ex2 = lineArray[i].endxghost;
    	    }
            if(lineArray[i].endyghost != null){
                ey2 = lineArray[i].endyghost;
            }
        }
    }

    //Next, compare the endpoints to each other within tol. Find match and report.

    var tolerance = .0001;

    if(Tol(sx1, sx2, tolerance) && Tol(sy1, sy2, tolerance)){
        l1SorE = 'start';
        l2SorE = 'start';
        xc = sx1;
        yc = sy1;
    }
    else if(Tol(ex1, ex2, tolerance) && Tol(ey1, ey2, tolerance)){
        l1SorE = 'end';
        l2SorE = 'end';
        xc = ex1;
        yc = ey1;
    }
    else if(Tol(sx1, ex2, tolerance) && Tol(sy1, ey2, tolerance)){
        l1SorE = 'start';
        l2SorE = 'end';
        xc = sx1;
        yc = sy1;
    }
    else if(Tol(ex1, sx2, tolerance) && Tol(ey1, sy2, tolerance)){
        l1SorE = 'end';
        l2SorE = 'start';
        xc = ex1;
        yc = ey1;
    }
    retArray = [l1SorE, l2SorE,xc, yc];
    return retArray;
}

function changeDimension(){
    //Create opportunity for the user to change the dimension just moved or selected.

	LastSelectedDimID = dimToMove[0];
    LastSelectedDimType = dimToMove[1];


	//Set focus on input box.
	document.getElementById('inputBox').value = "";
	document.getElementById("inputBox").focus();
	document.getElementById("inputBox").select;

	ChangePreviewValue = null;

    if(LastSelectedDimType == 'linear'){
    	for(var i = 0; i < linearDimArray.length; i++){
    	    d = linearDimArray[i];
    	    if(d.elementID == LastSelectedDimID){
    			d.selectForChange = true;
    			Redraw();
    	    }
    	}
    }

    else if(LastSelectedDimType == 'fillet'){
    	for(var i = 0; i < linearDimArray.length; i++){
    	    d = linearDimArray[i];
    	    if(d.elementID == LastSelectedDimID){
    			d.selectForChange = true;
    			Redraw();
    	    }
    	}
    }

	else if(LastSelectedDimType == 'angular'){
    	for(var i = 0; i < AngularDimArray.length; i++){
    		d = AngularDimArray[i];
    		if(d.elementID == LastSelectedDimID){
    			d.selectForChange = true;
    			Redraw();
    		}
    	}
	}

	else if(LastSelectedDimType == 'relangular'){
    	for(var i = 0; i < relAngleArray.length; i++){
    		d = relAngleArray[i];
    		if(d.elementID == LastSelectedDimID){
    			d.selectForChange = true;
    			Redraw();
    		}
    	}
	}

}

function changeLastLineLength(newLength){

	//get last line line array - it's the one we want to change the length of.
	l = lineArray[lineArray.length - 1];
	//always operating on end_x and end_y here - length changes in direction it was created in.

	var line1startx = l.startx;
	var line1starty = l.starty;
	var line1endx = l.endx;
	var line1endy = l.endy;


	if(line1startx == line1endx){
		//line 1 is vertical
		if(line1starty > line1endy){
			//the line points up from the node
			l.endy = l.starty - newLength / Scale;
		}
		else{
			//the line points down from the node.
			l.endy = l.starty + newLength / Scale;
		}
	}
	else if (line1starty == line1endy){
		//line 1 is horizontal
		if(line1startx > line1endx){
		//the line points left from the node
		l.endx = l.startx - newLength / Scale;
		}
		else{
		//the line points right from the node.
		l.endx = l.startx + newLength / Scale;
		}
	}

	l.lineLength = Math.sqrt(Math.pow(l.startx-l.endx,2)+Math.pow(l.starty - l.endy,2));
    l.midpointX = (l.startx + l.endx)/2;
    l.midpointY = (l.starty + l.endy)/2;

	//update find the corresponding dimension label and update it to the new length:
	for(var i = 0; i < linearDimArray.length; i++){
		d = linearDimArray[i];
		if(d.elementID == l.lineID){
			var actLength = l.lineLength * Scale;
			d.value = actLength;
		}
	}

	//Reposition the dimension:

	var dimXpos = l.startx + 2;
	var dimYpos = l.starty - 10;

	var actLength = l.lineLength * Scale;

	//Choose a starting location for the dimension:
	//if the line is horizontal, position above the middle.
	if(l.starty == l.endy){
		dimXpos = ((l.startx + l.endx)/2) - getlength(actLength.toFixed(Precision)) * 3;
		var dimlineYstart = l.starty - 10;
		var dimlineYend = l.endy - 10;
		var dimlineXstart = l.startx;
		var dimlineXend = l.endx;
	}
	else if(l.startx == l.endx){
		dimYpos = (l.starty + l.endy)/2;
		var dimlineYstart = l.starty;
		var dimlineYend = l.endy;
		var dimlineXstart = l.startx + 10;
		var dimlineXend = l.endx + 10;
	}

	d.x = dimXpos;
	d.y = dimYpos;
	d.startx = dimlineXstart;
	d.starty = dimlineYstart;
	d.endx = dimlineXend;
	d.endy = dimlineYend;

   //Hide the dimension if it's too short.
    //console.log('Changed Line Length: ', l.lineLength)
    if(l.lineLength < 20){
        d.showDim = false;
        Redraw();
    }
    else{
        d.showDim = true;
        Redraw();
    }

}

function changeLineLength(newDim, lineID, type){

	var l = "null";
	var e = "null";
	var f = "null";
	var g = "null";

	for(var i = 0; i < lineArray.length; i++){
		m = lineArray[i];
		if(m.lineID == lineID){
			l = lineArray[i];
		}
	}

	//Save state of l, to be used in undo.
    var undoLine = JSON.parse(JSON.stringify(l));

/* This section may be used in later release to have flow-through of length changes.
//Note endpoints connected to the line that is about to be edited so those lines can be edited accordingly.

    var StartCommonNodesArray = linesCommonToNode(l.startx,l.starty);
    var EndCommonNodesArray = linesCommonToNode(l.endx,l.endy);

    var conLineStart1 = StartCommonNodesArray[0];
    var conLineStart1Side = StartCommonNodesArray[8];
    var conLineStart2 = StartCommonNodesArray[5];
    var conLineStart2Side = StartCommonNodesArray[9];
    var conLineEnd1 = EndCommonNodesArray[0];
    var conLineEnd1Side = EndCommonNodesArray[8];
    var conLineEnd2 = EndCommonNodesArray[5];
    var conLineEnd2Side = EndCommonNodesArray[9];

    //console.log(conLineStart1, conLineStart1Side, conLineStart2,conLineStart2Side, conLineEnd1, conLineEnd1Side, conLineEnd2, conLineEnd2Side);

    //retArray = [lineID1, line1length, line1angle, x, y, lineID2, line2length, line2angle, line1side, line2side];

*/

//NEW BELOW:

//Determine which endpoints are connected to other lines:
    var sConnected = false;
    var eConnected = false;
    var eMove = 'end';

    var StartCommonNodesArray = linesCommonToNode_2(l.startx,l.starty);
    var EndCommonNodesArray = linesCommonToNode_2(l.endx,l.endy);


    //Also need to pick up connections with arcs.
    var arcCommonToStart = arcsCommonToNode(l.startx,l.starty);
    var arcCommonToEnd = arcsCommonToNode(l.endx,l.endy);

    if((StartCommonNodesArray[0] != 999 & StartCommonNodesArray[5] != 999) || arcCommonToStart != 999){
        sConnected = true;
    }

    if((EndCommonNodesArray[0] != 999 & EndCommonNodesArray[5] != 999) || arcCommonToEnd != 999){
        eConnected = true;
    }

    if(sConnected == true && eConnected == false){
        eMove = 'end';
    }

    else if(sConnected == false && eConnected == true){
        eMove = 'start';
    }

    else if((sConnected == false && eConnected == false) || (sConnected == true && eConnected == true)){
        eMove = 'end';
    }

//NEW ABOVE.

	var line1startx = l.startx;
	var line1starty = l.starty;
	var line1endx = l.endx;
	var line1endy = l.endy;
	var line1angle = l.angle;
	var line1length = Math.sqrt(Math.pow(l.startx-l.endx,2)+Math.pow(l.starty - l.endy,2));


	if(type == "linear"){
		var pxnewLength = newDim / Scale;
	}

	else if(type == "angular"){
		var pxnewLength = line1length;
		var line1angle = 0;

	//Find the corresponding angular dimension label and update it to new angle:

    	for(var i = 0; i < AngularDimArray.length; i++){
    		f = AngularDimArray[i];
    		if(f.elementID == l.lineID){
    			g = AngularDimArray[i];
                var undoAngularDim = JSON.parse(JSON.stringify(g));
    		}
    	}

        if(g.caseNumber == 1){
            line1angle = newDim;
        }
        else if(g.caseNumber == 2){
            line1angle = newDim + 90;
        }
        else if(g.caseNumber == 3){
            line1angle = newDim + 180;
        }
        else if(g.caseNumber == 4){
            line1angle = newDim + 270;
        }

	}

	//Math definition of endx and endy based on angle and start point.

	line1endx = line1startx + pxnewLength * Math.cos(line1angle*(Math.PI/180));
	line1endy = line1starty - pxnewLength * Math.sin(line1angle*(Math.PI/180));

	//New:
	//Also, math definition of startx and starty based on angle and endpoint:
	var l1startx = l.endx - pxnewLength * Math.cos(line1angle*(Math.PI/180));
	var l1starty = l.endy + pxnewLength * Math.sin(line1angle*(Math.PI/180));

	//AuxArray.push([l1startx,l1starty]);

	//Wed...

	//If the endpoints need to be moved, do the normal process:

	if(eMove == 'end'){

    	//Do a check to see if the endpoints are still in the window size. Don't allow user
    	//to create lines that extend out of the current window area.

    	if((line1endx < canvas.width) && (line1endx > 0) && (line1endy < canvas.height) && (line1endy > 50)){
    	   	l.endx = line1endx;
    	    l.endy = line1endy;
            l.angle = line1angle;

        	var angle = l.angle;

        	l.lineLength = Math.sqrt(Math.pow(l.startx-l.endx,2)+Math.pow(l.starty - l.endy,2));
            l.midpointX = (l.startx + l.endx)/2;
            l.midpointY = (l.starty + l.endy)/2;

        	//Find the corresponding dimension label and update it to the new length:
        	for(var i = 0; i < linearDimArray.length; i++){
        		d = linearDimArray[i];
        		if(d.elementID == l.lineID){
        			var actLength = l.lineLength * Scale;
                	//Save state of d, to be used in undo.
                    var undoLinearDim = JSON.parse(JSON.stringify(d));
        			d.value = actLength;
        			e = linearDimArray[i];
        		}
        	}

        	//Find the corresponding angular dimension label and update it to new angle:

        	for(var i = 0; i < AngularDimArray.length; i++){
        		f = AngularDimArray[i];
        		if(f.elementID == l.lineID){
        			f.value = angle;
        			g = AngularDimArray[i];
                    //Save state of g, to be used in undo.
                    var undoAngularDim = JSON.parse(JSON.stringify(g));
        		}
        	}

        	//Reposition the dimension:

        	var dimXpos = l.startx + 2;
        	var dimYpos = l.starty - 10;

        	var actLength = l.lineLength * Scale;

            //call a function that defines offsets based on line data:
            var offsetArray = findOffsets(actLength, line1startx, line1starty, line1endx, line1endy, angle);
            var dimYpos = offsetArray[0];
        	var dimXpos = offsetArray[1];
        	var xoffset1 = offsetArray[2];
        	var yoffset1 = offsetArray[3];
        	var xoffset2 = offsetArray[4];
        	var yoffset2 = offsetArray[5];
        	var dimYpos_a = offsetArray[6];
        	var dimXpos_a = offsetArray[7];
        	var perpOffset = offsetArray[8];

        	e.x = dimXpos;
        	e.y = dimYpos;
        	e.startx = l.startx;
        	e.starty = l.starty;
        	e.endx = l.endx;
        	e.endy = l.endy;
        	e.xoffset1 = xoffset1;
        	e.yoffset1 = yoffset1;
        	e.xoffset2 = xoffset2;
        	e.yoffset2 = yoffset2;
        	e.perpOffset = perpOffset;
        	e.angle = l.angle;

        	e.selectForChange = false;

        	g.x = dimXpos_a;
        	g.y = dimYpos_a;
        	g.angle = l.angle;

			if(Tol(actLength, line1length*Scale, .000001) == false){
				updateUserMoves(['changedim',undoLine, undoLinearDim, undoAngularDim]);
				GenerateInverse();
			}
           //Hide the dimension if it's too short.
            //console.log('Changed Line Length: ', l.lineLength)
            if(l.lineLength < 20){
                d.showDim = false;
                Redraw();
            }
            else{
                d.showDim = true;
                Redraw();
            }
    	}

    	else{
    	    if(isNaN(newDim) == false){
    	        displayError('drawnout','Line would extend outside of drawing area. Enlarge drawing area by zooming out or increasing the size of the browser window.');
    	    }
        }
	}

	else if(eMove == 'start'){
    	//Do a check to see if the endpoints are still in the window size. Don't allow user
    	//to create lines that extend out of the current window area.

    	if((l1startx < canvas.width) && (l1startx > 0) && (l1starty < canvas.height) && (l1starty > 50)){
    	   	l.startx = l1startx;
    	    l.starty = l1starty;
            l.angle = line1angle;


        	var angle = l.angle;

        	l.lineLength = Math.sqrt(Math.pow(l.startx-l.endx,2)+Math.pow(l.starty - l.endy,2));
            l.midpointX = (l.startx + l.endx)/2;
            l.midpointY = (l.starty + l.endy)/2;

        	//Find the corresponding dimension label and update it to the new length:
        	for(var i = 0; i < linearDimArray.length; i++){
        		d = linearDimArray[i];
        		if(d.elementID == l.lineID){
        			var actLength = l.lineLength * Scale;
                	//Save state of d, to be used in undo.
                    var undoLinearDim = JSON.parse(JSON.stringify(d));
        			d.value = actLength;
        			e = linearDimArray[i];
        		}
        	}

        	//Find the corresponding angular dimension label and update it to new angle:

        	for(var i = 0; i < AngularDimArray.length; i++){
        		f = AngularDimArray[i];
        		if(f.elementID == l.lineID){
        			f.value = angle;
        			g = AngularDimArray[i];
                    //Save state of g, to be used in undo.
                    var undoAngularDim = JSON.parse(JSON.stringify(g));
        		}
        	}

        	//Reposition the dimension:

        	var dimXpos = l.startx + 2;
        	var dimYpos = l.starty - 10;

        	var actLength = l.lineLength * Scale;

            //call a function that defines offsets based on line data:
            var offsetArray = findOffsets(actLength, l.startx, l.starty, l.endx, l.endy, angle);
            var dimYpos = offsetArray[0];
        	var dimXpos = offsetArray[1];
        	var xoffset1 = offsetArray[2];
        	var yoffset1 = offsetArray[3];
        	var xoffset2 = offsetArray[4];
        	var yoffset2 = offsetArray[5];
        	var dimYpos_a = offsetArray[6];
        	var dimXpos_a = offsetArray[7];
        	var perpOffset = offsetArray[8];

			//ASDl.midpointX-10, l.midpointY+5
        	e.x = l.midpointX + e.boxwidth/2;
        	e.y = l.midpointY-10
        	e.startx = l.startx;
        	e.starty = l.starty;
        	e.endx = l.endx;
        	e.endy = l.endy;
        	e.xoffset1 = xoffset1;
        	e.yoffset1 = yoffset1;
        	e.xoffset2 = xoffset2;
        	e.yoffset2 = yoffset2;
        	e.perpOffset = perpOffset;
        	e.angle = l.angle;

        	e.selectForChange = false;

        	g.x = dimXpos_a;
        	g.y = dimYpos_a;
        	g.angle = l.angle;

            //SDF
			updateUserMoves(['changedim',undoLine, undoLinearDim, undoAngularDim]);
            GenerateInverse();
        	//Redraw();

           //Hide the dimension if it's too short.
            //console.log('Changed Line Length: ', l.lineLength)
            if(l.lineLength < 20){
                e.showDim = false;
                Redraw();
            }
            else{
                e.showDim = true;
                Redraw();
            }

    	}

    	else{
    	    if(isNaN(newDim) == false){
    	        displayError('drawnout','Line would extend outside of drawing area. Enlarge drawing area by zooming out or increasing the size of the browser window.');
    	    }
        }
	}
}



/////Add catch to this function to throw alert if the changed line goes out of bounds.
function changeLineAngle(dim,elementID){

    //Get the angular dimension element from the list:
    for(var i = 0; i < relAngleArray.length; i++){
        if(relAngleArray[i].elementID == elementID){
            var a = relAngleArray[i];
            var line1 = relAngleArray[i].line1ID;
            var line2 = relAngleArray[i].line2ID;
        }
    }

    //First, if the dim is being displayed as 'flipped', that is the intersection is not common to the original arc, alias the dim.
    if(a.displayFlippedArc == true){
        dim = 360 - dim;
    }

    //When a dimension is changed, obviously we want to see it afterwords.
    a.showDim = true;

    //Get the line elements:
    for(var i = 0; i < lineArray.length; i++){
        if(lineArray[i].lineID == line1){
            var l1 = lineArray[i];
        }
        if(lineArray[i].lineID == line2){
            var l2 = lineArray[i];
        }
    }

    var undorelAngularDim = JSON.parse(JSON.stringify(a));
    var undoLine = JSON.parse(JSON.stringify(l2));

    //First, are we looking at chaning a startpoint or an endpoint?
    var SorEArray = endpointCommonToLines(l1.lineID, l2.lineID);

    //If the centroid is coincident with endpoints, it means that no fillet is drawn at this location:
    if((Tol(a.centroidx, l1.startx, .001) && Tol(a.centroidy, l1.starty,.001)) || (Tol(a.centroidx,l1.endx,.001) && Tol(a.centroidy,l1.endy,.001))){
    //do nothing, continue...
    }
    else{
        displayError('noangleatfillet','Angle change not allowed at fillet locations. Remove fillet before re-dimensioning angle.');
        //de select for change.
        a.selectForChange = false;
        return 0;
    }

    var line1origAngle = 0;
    var line2origAngle = 0;

    if(SorEArray[0] == 'start'){
        line1origAngle = l1.angle;
    }
    else if(SorEArray[0] == 'end'){
        line1origAngle = 180 + l1.angle;
        if(line1origAngle > 360){
            line1origAngle = line1origAngle - 360;
        }
    }

    if(SorEArray[1] == 'start'){
        line2origAngle = l2.angle;
    }
    else if(SorEArray[1] == 'end'){
        line2origAngle = 180 + l2.angle;
        if(line2origAngle > 360){
            line2origAngle = line2origAngle - 360;
        }
    }

    //if direction is ccw, we need to subtract to widen the angle.
    //if direction is cw, we need to add to widen the angle.

    //Take the difference between the displayed angle and the entered angle:
    if(a.direction == 'cw'){
        var angledelta = a.value - dim;
    }
    else{
       var angledelta = dim - a.value;
    }

    var line2newAngle = line2origAngle + angledelta;

    //Sanatize line2newAngle:
    if(line2newAngle < 0){
        line2newAngle = line2newAngle + 360;
    }
    else if(line2newAngle > 360){
        line2newAngle = line2newAngle - 360;
    }

    var line2length = Math.sqrt(Math.pow(l2.startx-l2.endx,2)+Math.pow(l2.starty - l2.endy,2));

    if(SorEArray[1] == 'start'){
        var lineendx = l2.startx + line2length * Math.cos(line2newAngle*(Math.PI/180));
        var lineendy = l2.starty - line2length * Math.sin(line2newAngle*(Math.PI/180));
        //Check to see if the new endpoint is in bounds:
	    if((lineendx < canvas.width) && (lineendx > 0) && (lineendy < canvas.height) && (lineendy > 50)){
            //In this case, change the endx and endy values.
    	    l2.endx = l2.startx + line2length * Math.cos(line2newAngle*(Math.PI/180));
    	    l2.endy = l2.starty - line2length * Math.sin(line2newAngle*(Math.PI/180));
            l2.angle = line2newAngle;
            l2.endxghost = null;
            l2.endyghost = null;

	    }
	    else{
	        displayError('drawnout','Line would extend outside of drawing area. Enlarge drawing area by zooming out or increasing the size of the browser window.');
	        //de select for change.
            a.selectForChange = false;
	        return 0;
	        }
    }
    else if(SorEArray[1] == 'end'){
        var lineendx = l2.endx + line2length * Math.cos(line2newAngle*(Math.PI/180));
        var lineendy = l2.endy - line2length * Math.sin(line2newAngle*(Math.PI/180));
	    if((lineendx < canvas.width) && (lineendx > 0) && (lineendy < canvas.height) && (lineendy > 50)){
            //In this case, change the startx and starty values.
    	    l2.startx = l2.endx + line2length * Math.cos(line2newAngle*(Math.PI/180));
    	    l2.starty = l2.endy - line2length * Math.sin(line2newAngle*(Math.PI/180));
            l2.startxghost = null;
            l2.startyghost = null;
            line2newAngle = line2newAngle - 180;
            if(line2newAngle < 0){
                line2newAngle = line2newAngle + 360;
            }
            l2.angle = line2newAngle;
	    }
	    else{
	        displayError('drawnout','Line would extend outside of drawing area. Enlarge drawing area by zooming out or increasing the size of the browser window.');
	        //de select for change.
            a.selectForChange = false;
	        return 0;
	    }
    }

    //assigned the changed properties to the line.
    l2.midpointX = (l2.startx + l2.endx)/2;
    l2.midpointY = (l2.starty + l2.endy)/2;

    updateRelAngleDim(a.elementID);


    //ddd...

    //de select for change.
    a.selectForChange = false;

	//Find the corresponding dimension label and update it to the new length:
	for(var i = 0; i < linearDimArray.length; i++){
		d = linearDimArray[i];
		if(d.elementID == l2.lineID){
        	//Save state of d, to be used in undo.
            var undoLinearDim = JSON.parse(JSON.stringify(d));
			///d.value = actLength;
			d.angle = line2newAngle
			e = linearDimArray[i];
		}
	}

	//Find the corresponding angular dimension label and update it to new angle:

	for(var i = 0; i < AngularDimArray.length; i++){
		f = AngularDimArray[i];
		if(f.elementID == l2.lineID){
			f.value = line2newAngle;
			g = AngularDimArray[i];
            //Save state of g, to be used in undo.
            var undoAngularDim = JSON.parse(JSON.stringify(g));
		}
	}

	//Reposition the dimension:

	var dimXpos = l2.startx + 2;
	var dimYpos = l2.starty - 10;

	var actLength = l2.lineLength * Scale;

    //call a function that defines offsets based on line data:
    var offsetArray = findOffsets(actLength, l2.startx, l2.starty, l2.endx, l2.endy, l2.angle);
    var dimYpos = offsetArray[0];
	var dimXpos = offsetArray[1];
	var xoffset1 = offsetArray[2];
	var yoffset1 = offsetArray[3];
	var xoffset2 = offsetArray[4];
	var yoffset2 = offsetArray[5];
	var dimYpos_a = offsetArray[6];
	var dimXpos_a = offsetArray[7];
	var perpOffset = offsetArray[8];

	e.x = dimXpos;
	e.y = dimYpos;
	e.startx = l2.startx;
	e.starty = l2.starty;
	e.endx = l2.endx;
	e.endy = l2.endy;
	e.xoffset1 = xoffset1;
	e.yoffset1 = yoffset1;
	e.xoffset2 = xoffset2;
	e.yoffset2 = yoffset2;
	e.perpOffset = perpOffset;
	e.angle = l2.angle;

	g.x = dimXpos_a;
	g.y = dimYpos_a;
	g.angle = l2.angle;

    updateUserMoves(['changerelangledim',undoLine, undoLinearDim, undoAngularDim, undorelAngularDim]);
    GenerateInverse();

    closeOrOpenSection();

	Redraw();
}


function createChamferDim(ElID){
	for(var i = 0; i < chamferArray.length; i ++){
		l = chamferArray[i];
		if(l.ChamferID == ElID){
			var dimXpos = l.startx + (l.endx - l.startx) / 2;
			var dimYpos = l.starty + (l.endy - l.starty) / 2;
			//This stuff is currently unused as no dimlines are created for chamfers. They just sit at the old corner.
			var dimlineYstart = l.starty;
			var dimlineYend = l.endy;
			var dimlineXstart = l.startx + 10;
			var dimlineXend = l.endx + 10;
			var orientation = 'chamf';
			//back to used stuff:
			var actLength = l.chamferDim * Scale;
			actLength = actLength.toFixed(Precision)
			var dimString = String(actLength);
			var chamferChar = "C";
			actLength = chamferChar.concat(dimString);
		}
	}

		linearDimArray.push(new LinearDimension(actLength, dimXpos, dimYpos, ElementID, true, dimlineXstart, dimlineYstart, dimlineXend, dimlineYend, orientation,0,0,0,0,0,0,0,0));

	//hide the last dimension:
	if(linearDimArray.length > 1){
		d = linearDimArray[linearDimArray.length - 2];
		d.showDim = false;
	}
}


//t...
//This function chanes fillet radii.
function changeFilletRadius(dim, DimID){
    //To change the fillet radius, get the arc object corresponding to the DimID.
    //Delete that arc, but remember the arcID.
    //Rejoin the lines connected to the arc (which is just a single arc delete now)
    //Create a new fillet with the old arcID with the new dim (if possible)

    //Step 0: determine if both endpoints of the arc are connected to the two lines original
    //associated with that fillet. Prevent attempts at changing fillet radii in the case that
    //the fillet has been trimmed or a line has been deleted/disconnected.

    for(var i = 0; i < arcArray.length; i++){
        if(arcArray[i].arcID == DimID){
            a = arcArray[i];
        }
    }

    var savedLine1 = a.line1ID;
    var savedLine2 = a.line2ID;
    var undoArc = JSON.parse(JSON.stringify(a));

    for(var k = 0; k < linearDimArray.length; k++){
        if(linearDimArray[k].elementID == DimID){
            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
        }
    }

    for(var k = 0; k < lineArray.length; k++){
        if(lineArray[k].lineID == savedLine1){
            var undoLine1 = JSON.parse(JSON.stringify(lineArray[k]));
        }
        else if(lineArray[k].lineID == savedLine2){
            var undoLine2 = JSON.parse(JSON.stringify(lineArray[k]));
        }
    }

    for(var k = 0; k < linearDimArray.length; k++){
        if(linearDimArray[k].elementID == savedLine1){
            var undoLinearDim1 = JSON.parse(JSON.stringify(linearDimArray[k]));
        }
        else if(linearDimArray[k].elementID == savedLine2){
            var undoLinearDim2 = JSON.parse(JSON.stringify(linearDimArray[k]));
        }
    }

    for(var k = 0; k < AngularDimArray.length; k++){
        if(AngularDimArray[k].elementID == savedLine1){
            var undoAngularDim1 = JSON.parse(JSON.stringify(AngularDimArray[k]));
        }
        else if(AngularDimArray[k].elementID == savedLine2){
            var undoAngularDim2 = JSON.parse(JSON.stringify(AngularDimArray[k]));
        }
    }

    //Setting the dimension for a fillet to 0 deletes it.
    if(dim == 0){
        deletefillet(DimID, false, false);
    }

    else{
        var commonLines1 = linesCommonToNode(a.endpoint1x, a.endpoint1y);
        var commonLines2 = linesCommonToNode(a.endpoint2x, a.endpoint2y);
        var connectedLines = 0;

        if((commonLines1[0] == a.line1ID) || (commonLines1[0] == a.line2ID)){
            connectedLines += 1;
        }
        if((commonLines1[5] == a.line1ID) || (commonLines1[5] == a.line2ID)){
             connectedLines += 1;
        }
        if((commonLines2[0] == a.line1ID) || (commonLines2[0] == a.line2ID)){
             connectedLines += 1;
        }
        if((commonLines2[5] == a.line1ID) || (commonLines2[5] == a.line2ID)){
             connectedLines += 1;
        }

        if(connectedLines == 2){

            //step 1: delete Fillet.
            var cornerPoint = deletefillet(DimID, false, false);

            //Step 2: create new fillet at that point with radius = dim.
            var Filletprops = FilletPreview(cornerPoint[0], cornerPoint[1], dim / Scale);

            if(Filletprops[3] == 999){
                displayError('radoversize','Radius too large!');
                UndoOneStep();
                return 0;
            }

            else{
                //need to remove the deletefillet undo record that was created as to not mess up flow for undo.
                userMoves.pop();
                redoMoves.pop();
            }

        	arcArray.push(new Arc(Filletprops[0],Filletprops[1],Filletprops[2],Filletprops[3],Filletprops[4],DimID,0,0,0,0,"black",Filletprops[11], Filletprops[12],Filletprops[15], Filletprops[16], savedLine1, savedLine2));

            var undoLine1ID = Filletprops[5];
            var undoLine2ID = Filletprops[7];


            createFilletDim(DimID, null, true);
        	//Before the lines are shortened, save their object forms in undo array so they can be recalled if need be.
        	updateUserMoves(['changefilletradius', DimID, undoLine1, undoLine2, undoArc, undoLinearDim, undoLinearDim1, undoLinearDim2, undoAngularDim1, undoAngularDim2]);
        	//w...
           // updateUndoFilletArray(['newfillet', DimID, undoLine1, undoLine2]);

        	shortenLinesforFillet(Filletprops[9], Filletprops[10], Filletprops[11], Filletprops[12], Filletprops[13], Filletprops[14], Filletprops[15], Filletprops[16]);
        	ClearStressVis();

        	//Call this function after shortenlines so that the shortened lines
        	//can be used.
        	GenerateInverse();

        	//sat...

            updateHandles();

        	closeOrOpenSection();
        }
        else{
            displayError('nonconnectedfillet','Can\'t change radius of a fillet that is not connected to original lines used for fillet creation.');
        }
    }
}

function createFilletDim(ElID,mode,donthide){

	for(var i = 0; i < arcArray.length; i++){
		a = arcArray[i];
		if(a.arcID == ElID){

		    //Place dimension tag at centroid.
			var dimXpos = a.centroidx;
			var dimYpos = a.centroidy;

		    //Place leader line at the mid point of the arc.

			var avgtheta = (a.radstart + a.radend)/2;
			var xfromcentroid = a.radius * Math.cos(avgtheta);
			var yfromcentroid = a.radius * Math.sin(avgtheta);

			var VHdist = a.radius * (Math.pow(2,.5))/ 2;

			var dimlineYstart = a.centroidy + yfromcentroid;
			var dimlineXstart = a.centroidx + xfromcentroid;

			a.midpointX = dimlineXstart;
			a.midpointY = dimlineYstart;

			var dimlineYend = a.centroidy;
			var dimlineXend = a.centroidx;

            ////console.log('Orig. Angle: ', lineAngleFromOrigin(dimlineXstart,dimlineYstart,dimlineXend,dimlineYend));

			var orientation = 'fillet';

			var actLength = a.radius * Scale;

			////console.log(a.centroidx, a.centroidy);

			//Run this so that connection points refresh whenever a new fillet is created.
			closeOrOpenSection();

		}
	}
        //Nope - super annoying to show the radius tag after every creation.
        var showtag = true;
        //var showtag = false;

    if(mode == 'SNIP'){
        showtag = false;
    }


	linearDimArray.push(new LinearDimension(actLength, dimXpos, dimYpos, ElID, showtag, dimlineXstart, dimlineYstart, 100, 100, orientation,0,0,0,0,0,0,0,0));

	updateFilletDim(ElID);

	//hide the last dimension:
	if(linearDimArray.length > 1 && donthide != true){
		d = linearDimArray[linearDimArray.length - 2];
		//if(d.orientation == 'fillet'){
			d.showDim = false;
		//}
	}
}

//In the case that a fillet dimension is moved, recalculate the angle and adjust location of leader end.
function updateFilletDim(elID){

        //Get the dimension object out and assign start and end points of leader line to variables.
    	for(var i = 0; i < linearDimArray.length; i++){
		d = linearDimArray[i];
			if(d.elementID == elID){
			    var dd = d;
			    var value = dd.value;
			    var dimlineXstart = d.startx;
			    var dimlineYstart = d.starty;
			    var dimlineXend = d.x;
			    var dimlineYend = d.y;
	            valuetopass = value.toFixed(Precision);
		        dd.digits = String(valuetopass).match(/\d/g).length;
			}
    	}

        //calculate the angle from the beginning of the leader line to the end of the leader line.
    	var angle = lineAngleFromOrigin(dimlineXstart,dimlineYstart,dimlineXend,dimlineYend);

    	//If on the left hand side of vertical, shift the endpoint to the right some amount to be on the other side of the tag:
    	if(angle > 196 && angle < 345){
    	    dd.endx = dd.x + 8*dd.digits;
    	    dd.endy = dd.y - 5;
    	}
    	else{
    	    dd.endx = dd.x;
    	    dd.endy = dd.y - 5;
    	}
}


function lineAngleFromOrigin(startx,starty,endx,endy){
//Returns degrees of line from origin to endpoint. Vertical is 0, rotation to right moves towards 360.

	delx = Math.abs(startx - endx);
	dely = Math.abs(starty - endy);

	var angle = 0.0;
	var angle_degrees = 0;

	switch(quadrantDetect(startx,starty,endx,endy)){

		case 1:
			angle = Math.atan(delx/dely);
			angle_degrees = angle * (180/Math.PI);
			return angle_degrees;
			break;
		case 2:
			angle = Math.atan(dely/delx);
			angle_degrees = angle * (180/Math.PI) + 90;
			return angle_degrees;
			break;
		case 3:
			angle = Math.atan(delx/dely);
			angle_degrees = angle * (180/Math.PI) + 180;
			return angle_degrees;
			break;
		case 4:
			angle = Math.atan(dely/delx);
			angle_degrees = angle * (180/Math.PI) + 270;
			return angle_degrees;
			break;
		default:

	}
}

function increaseFontSize(){
    document.getElementById('welcomeheader').style['font-size'] = '13pt';
    document.getElementById('welcometxt').style['font-size'] = '11pt';
    document.getElementById('resultsheader').style['font-size'] = '13pt';
    document.getElementById('clearheader').style['font-size'] = '13pt';
    document.getElementById('preheader').style['font-size'] = '13pt';
    document.getElementById('errorheader').style['font-size'] = '13pt';
}

function quadrantDetect(startx,starty,endx,endy){
//Returns relative quadrants between the start end end points of a line. 1 is ++, 2 is +,- (clockwise quadrants from vertical).
	if(startx <= endx & starty < endy){
		q = 2;
	}
	else if(startx < endx & starty >= endy){
		q = 1;
	}
	else if(startx >= endx & starty > endy){
		q = 4;
	}
	else if(startx > endx & starty <= endy){
		q = 3;
	}
	else{
		q = 999;
	}
	return q;
}

function GetInput(){
	var ret = document.getElementById("inputBox").value;
	var numret = parseFloat(ret);
	return numret;
}

function GetRadiusInput(){
	var ret = document.getElementById("filletRadius").value;
	var numret = parseFloat(ret);
	return numret;
}

function GetLoadsInput(){

	var Fx = parseFloat(document.getElementById("FxBox").value);
	var Fy = parseFloat(document.getElementById("FyBox").value);
	var Fz = parseFloat(document.getElementById("FzBox").value);
	var Mx = parseFloat(document.getElementById("MxBox").value);
	var My = parseFloat(document.getElementById("MyBox").value);
	var Mz = 0;

	var retArray = [Fx, Fy, Fz, Mx, My, Mz];

	for(var i = 0; i < retArray.length; i++){
		if(isNaN(retArray[i]) == true){
			retArray[i] = 0;
		}
	}

	return retArray

}

function setScale(dim){

	//Get the first line
	l = lineArray[0];
	l.dim = dim;
	Precision = 1;

	var Length = Math.sqrt(Math.pow(l.startx-l.endx,2)+Math.pow(l.starty - l.endy,2));

	//Scale is the length of the edge of each pixel.
	Scale =  dim / Length;

	for(var i = 0; i < linearDimArray.length; i++){
		d = linearDimArray[i];
		if(d.elementID == l.lineID){
			var fixedval = l.lineLength * Scale;
			d.value = fixedval;
		}
	}

	Redraw();

}

function ChangePrecision(newPrecision){

    Precision = newPrecision;
    updateOffsets();
    Redraw();

}


function bottomLeftPoint(){


	var smallestx = canvas.width;
	var largesty = 0;

	for(var i = 0; i <lineArray.length; i++){
		l = lineArray[i];
		if(l.constLine != true){
    		if(l.startx < smallestx){
    			smallestx = l.startx;
    		}
    		if(l.endx < smallestx){
    			smallestx = l.endx;
    		}
    		if(l.starty > largesty){
    			largesty = l.starty;
    		}
    		if(l.endy > largesty){
    			largesty = l.endy;
    		}
		}
	}

	//Need to do the same thing to arcs. Use existing routine for finding extremes:
    var arcsMinArray = MinPointsOnArcs();

    var arcsMinX = arcsMinArray[0];
    var arcsMinY = arcsMinArray[1];

    //Need to adjust the MinPointsOnArcs function to also return min y value.
    //Do the same thing for the min y value.


    if(arcsMinX < smallestx){
        smallestx = arcsMinX;
    }

    if(arcsMinY > largesty){
        largesty = arcsMinY;
    }

	zeroX = smallestx;
	zeroY = largesty;

}

function leftLine(){
	leftLineArray = [];

	var smallestx = canvas.width;
	var yArrayRaw = [];
	var yArraySorted = [];

	for(var i = 0; i <lineArray.length; i++){
		l = lineArray[i];
		if(l.constLine != true){
			if(l.startx < smallestx){
				smallestx = l.startx;
			}
			if(l.endx < smallestx){
				smallestx = l.endx;
			}

			//collect all y coords in an array to sort later:
			yArrayRaw.push(l.starty);
			yArrayRaw.push(l.endy);
		}
	}

	//sort y values from largest to smallest.
	yArrayRaw.sort(function(a, b){return b - a});

	//get rid of duplicate values:
	var yA1 = 0;
	for(var i = 0; i < yArrayRaw.length; i++){
		var yA2 = yArrayRaw[i];

		if(yA1 != yA2){
			yArraySorted.push(yA2);
			yA1 = yA2;
		}
	}

	//Reverse the array so it goes from smallest (top) to largest (bottom):
	yArraySorted.reverse();
	smallestx = smallestx - 3;


	//Create a set of lines two pixels left of the leftmost line with endpoints at each y value in yArraySorted:
	var lLID = 1001;

	for(var i = 1; i < yArraySorted.length; i++){
		leftLineArray.push(new Line(smallestx, yArraySorted[i-1], smallestx, yArraySorted[i]));
		l = leftLineArray[i-1];
		l.lineID = lLID;
		lLID ++;
	}

}

function detectRects(){

	rectArray = [];
	////console.log('Start: ');
	////console.log(rectArray.length);
	var inside = false;
	var left = 0;
	var right = 0;
	var top = 0;
	var bottom = 0;
	var currentXcentroid = 0;
	var currentYcentroid = 0;
	var Area = 0;
	var lastgroupid = 1;

	rectsDetected = true;
	rectDetectDone = true;

	leftLine();

	//start at the midpoint of the first leftLine:

	for(var j = 0; j < leftLineArray.length; j++){
		m = leftLineArray[j];
		inside = false;
		var leftLineMidPointy = m.starty + (Math.abs(m.starty - m.endy))/2;
		var leftLineMidPointx = m.startx;

		top = m.starty;
		bottom = m.endy;

		//go right from the midpoint of the line:
		var y = Math.round(leftLineMidPointy);
			for (var x = Math.round(leftLineMidPointx) + 1; x < canvas.width; ++x) {

				var retArray = (isonline(x,y,'Fill',true));
				var lineItsOn = retArray[0];

				//If it isn't in the special case of two lines on top of each other.
				if(retArray[1] <= 1){
					if(lineItsOn != 999 && inside == false){
						for(var i = 0; i < lineArray.length; i++){
							ll = lineArray[i];
							if(ll.lineID == lineItsOn){
								l = lineArray[i];
							}
						}
						left = l.startx;
						inside = true;
					}

					else if(lineItsOn != 999 && inside == true){
						for(var i = 0; i < lineArray.length; i++){
							ll = lineArray[i];
							if(ll.lineID == lineItsOn){
								l = lineArray[i];
							}
						}

						right = l.startx;
						inside = false;
						currentXcentroid = (left+right)/2;
						currentYcentroid = (top+bottom)/2;
						Area = Area + (Scale * Math.abs(left-right))*(Scale *Math.abs(top-bottom));

						rectArray.push(new Rectangle(currentXcentroid, currentYcentroid, Math.abs(left-right), Math.abs(top - bottom),cycleColorArray()));
						drawCentroid(currentXcentroid, currentYcentroid);

						//switch area inside rectangle to "filled" in raster array:
						for(var ty = Math.round(top); ty < Math.round(bottom); ty ++){
							for(var tx = Math.round(left); tx < Math.round(right); tx++){
								var index = (ty * canvas.width + tx) * 4;
								var color = 'inside';
								rasterArray[index / 4] = color;
								colorit(color, tx, ty);
							}
						}
					}
				}

				//In the case where two line overlap, need to end last rect and start next in the same time through the loop.
				else{
					//log the first rectangle. Doesn't matter which of the overlapping lines is picked up. Same horizontal location.
					for(var i = 0; i < lineArray.length; i++){
						ll = lineArray[i];
						if(ll.lineID == lineItsOn){
							l = lineArray[i];
						}
					}
					//Assign the right hand side of the rectangle to the horizontal location of the detected line:
						right = l.startx;
						currentXcentroid = (left+right)/2;
						currentYcentroid = (top+bottom)/2;
						Area = Area + (Scale * Math.abs(left-right))*(Scale *Math.abs(top-bottom));

					//Push the rectangle into the array:
						rectArray.push(new Rectangle(currentXcentroid, currentYcentroid, Math.abs(left-right), Math.abs(top - bottom),cycleColorArray()));
						drawCentroid(currentXcentroid, currentYcentroid);

					//switch area inside rectangle to "filled" in raster array.
						for(var ty = Math.round(top); ty < Math.round(bottom); ty ++){
							for(var tx = Math.round(left); tx < Math.round(right); tx++){
								var index = (ty * canvas.width + tx) * 4;
								var color = 'inside';
								rasterArray[index / 4] = color;
								colorit(color, tx, ty);
							}
						}

					//Start a new rectangle:
						left = l.startx;
						inside = true;
				}

			}

	}
	assignGroups();
	colorGroups();
}

function assignGroups(){
	//Routine for detecting individual groups:
	var r1 = 0;
	var r2 = 0;
	var r3 = 0;
	var returnedRects = [];
	RectGroupArray = [];
	var repeatedRectCount = 0;
	var counter = 0;
	var currentGroupid = 2;
	var exitLoop = false;
	var repeatedRect = false;


	//to start the recursive calls, load the first rect into the RectGroupArray:
	RectGroupArray[0] = rectArray[0];

	while(counter < rectArray.length){
		returnedRects = adjacentRects(1);
		//Add the contents of returnedRects to RectGroupArray:
		for(var i = 0; i< returnedRects.length;i++){
			repeatedRect = false;
			//if the rect is not new, don't it to the group:
			r1 = returnedRects[i];
			for(k = 0; k<RectGroupArray.length; k++){
				r2 = RectGroupArray[k];
				if(r1.cx == r2.cx && r1.cy == r2.cy){
					repeatedRect = true;
				}
			}
			if(repeatedRect == false){
				RectGroupArray.push(r1);
			}
		}
		counter += 1;
	}

	//to start the recursive calls, load a rect not already with a groupId into RectGroupArray:

	//Turn this into a loop where the exit is when no rect has a groupid of 0.
	while(exitLoop == false){

		//Clear the array:
		RectGroupArray = [];

		//Set a variable that is incremented each time a new unassigned section is found to zero:
		var zeroCount = 0;

		//Find an element without an assigned group:
		for(m = 0; m < rectArray.length; m++){
			r3 = rectArray[m];
			if(r3.groupid == 0){
				RectGroupArray[0] = r3;
				zeroCount += 1;
			}
		}

		//if none were found, raise a flag and exit the while loop:
		if(zeroCount == 0){
			exitLoop = true;
		}
		//if a non-assigned rect is found, assign all adjacent elements the next groupid.
		else{
			counter = 0;
			while(counter < rectArray.length){
				returnedRects = adjacentRects(currentGroupid);
				//Add the contents of returnedRects to RectGroupArray:
				for(var i = 0; i< returnedRects.length;i++){
					repeatedRect = false;
					//if the rect is not new, don't it to the group:
					r1 = returnedRects[i];
					for(k = 0; k<RectGroupArray.length; k++){
						r2 = RectGroupArray[k];
						if(r1.cx == r2.cx && r1.cy == r2.cy){
							repeatedRect = true;
						}
					}
					if(repeatedRect == false){
						RectGroupArray.push(r1);
					}
				}
				counter += 1;
			}
			currentGroupid += 1;
		}
	}
}

function colorGroups(){

	//looks at each rect in rectArray and colors based on the groupid that has been assigned:
	var left = 0;
	var right = 0;
	var top = 0;
	var bottom = 0;

	//looping through the rectangles in rectArray:

	for(var i = 0; i <rectArray.length; i++){
		var r = rectArray[i];
		left = r.cx - r.b/2;
		right = r.cx + r.b/2;
		top = r.cy - r.w/2;
		bottom = r.cy + r.w/2;

		for(var ty = Math.round(top); ty < Math.round(bottom); ty ++){
			for(var tx = Math.round(left); tx < Math.round(right); tx++){
				var index = (ty * canvas.width + tx) * 4;
				var color = "group" + r.groupid;
				rasterArray[index / 4] = color;
				colorit(color, tx, ty);
			}
		}
	}
}

//Need to add line detect feature to this function.
function adjacentRects(gID){

	var retArray = [];
	var VcentDist = 0;
	var r1 = 0;
	var r2 = 0;

	var HcentDist = 0;
	var VcentMaxSep = 0;
	var HcentMaxSep = 0;
	var XcoordToCheck = 0;
	var YcoordToCheck = 0;
	var oL = 0;

	//The RectGroupArray has been filled with an element that has no assignment, so need to assign the gID to it:
	r1 = RectGroupArray[0];
	r1.groupid = gID;

	//For each rect in RectGroupArray, check against all other rects.
	for(var j = 0; j < RectGroupArray.length; j++){
		r1 = RectGroupArray[j];
		for(var i = 0; i < rectArray.length; i++){
			r2 = rectArray[i];
			VcentDist = Math.abs(r1.cy - r2.cy);
			HcentDist = Math.abs(r1.cx - r2.cx);
			VcentMaxSep = (r1.w + r2.w)/2;
			HcentMaxSep = (r1.b + r2.b)/2;

			//To eliminate extremely small rounding errors, truncate to 5 decimal places.
			//For a currently unkown reason, if both of the H measurements are truncated, < becomes >.
			VcentDist = VcentDist.toFixed(5);
			//HcentDist = HcentDist.toFixed(5);
			VcentMaxSep = VcentMaxSep.toFixed(5);
			HcentMaxSep = HcentMaxSep.toFixed(5);

			/*
			//console.log('--------------');


			if((HcentMaxSep > HcentDist)){
				//console.log('HcentMax Sep > HcentDist');
				//console.log(HcentMaxSep, HcentDist);
			}
			else{
				//console.log('HcentMax Sep < HcentDist');
				//console.log(HcentMaxSep, HcentDist);
			}

			if(VcentDist != VcentMaxSep){
				//console.log('VcentDist != VcentMaxSep');
				//console.log(VcentDist, VcentMaxSep);
			}
			*/

			//If the rects are stacked vertically:
			if((VcentDist == VcentMaxSep) && (HcentMaxSep > HcentDist)){
				if(r1.cy < r2.cy){
					YcoordToCheck = r1.cy + r1.w/2;
				}
				else{
					YcoordToCheck = r2.cy + r2.w/2;
				}
				//Set Xcoordinate location to check.
				if(Math.abs(r1.cx - r2.cx) <= Math.abs(r1.b/2 - r2.b/2)){
					if(r1.b >= r2.b){
						XcoordToCheck = r2.cx;
					}
					else{
						XcoordToCheck = r1.cx;
					}
				}
				else if(r2.cx < r1.cx){
					XcoordToCheck = ((r1.cx - r1.b/2) + (r2.cx + r2.b/2))/2;
				}
				else if(r1.cx < r2.cx){
					XcoordToCheck = ((r1.cx + r1.b/2) + (r2.cx - r2.b/2))/2;
				}

				if(isonline(XcoordToCheck,YcoordToCheck, 'UI') == 999){
					r2.groupid = gID;
					retArray.push(r2);
				}

			}
			//If the rects are stacked horizontally:
			if((HcentDist == HcentMaxSep) && (VcentMaxSep > VcentDist)){
					if(r1.cx > r2.cx){
					XcoordToCheck = r1.cx - r1.b/2;
				}
				else{
					XcoordToCheck = r2.cx - r2.b/2;
				}

				//Find Y coordinate to check:
				if(Math.abs(r1.cy - r2.cy) <= Math.abs(r1.w/2 - r2.w/2)){
					if(r1.w >= r2.w){
						YcoordToCheck = r2.cy;
					}
					else{
						YcoordToCheck = r1.cy;
					}
				}
				else if(r2.cy < r1.cy){
					YcoordToCheck = ((r1.cy - r1.w/2) + (r2.cy + r2.w/2))/2;
				}
				else if(r2.cy > r1.cy){
					YcoordToCheck = ((r2.cy - r2.w/2) + (r1.cy + r1.w/2))/2;
				}

				if(isonline(XcoordToCheck,YcoordToCheck,'UI') == 999){
					r2.groupid = gID;
					retArray.push(r2);
				}
			}
		}
	}
	return retArray;
}

function drawCentroid(Centroid_x, Centroid_y, alpha){
	//Place a centroid mark at the location predicted by the calcCentroid function.

	var xChar= '';
	var yChar = '';

	//To allow this function to work with or without alpha input:
	//if(isNaN(alpha) || alpha == 0){
	//	xChar = 'X';
	//	yChar = 'Y';
	//	alpha = 0;
	//}

//	else{
	    if(MasterIxx - MasterIyy >= 0){
	       	xChar = 'p1';
		    yChar = 'p2';
	    }
	    else{
	        xChar = 'p2';
		    yChar = 'p1';
	    }

//	}

	var lengthoflines = 15;

		c.lineWidth = 1.5;
		c.setLineDash([]);

	    //Draw X and Y lines at centroid:
	    c.fillStyle = "red";
		c.strokeStyle = "red";
		c.beginPath();
		c.moveTo(Centroid_x, Centroid_y);
		c.lineTo(Centroid_x + 13, Centroid_y);
		c.stroke();

		c.beginPath();
		c.moveTo(Centroid_x + 13 + 18, Centroid_y);
		c.lineTo(Centroid_x + lengthoflines + 25, Centroid_y);
		c.stroke();

		c.font = "11px Arial";
		c.fillText('X' ,Centroid_x +  lengthoflines + 28, Centroid_y);
		c.stroke();

		c.beginPath();
		c.moveTo(Centroid_x, Centroid_y);
		c.lineTo(Centroid_x, Centroid_y - 13);
		c.stroke();

		c.beginPath();
		c.moveTo(Centroid_x, Centroid_y - 13 - 18);
		c.lineTo(Centroid_x, Centroid_y - lengthoflines - 25);
		c.stroke();

		c.font = "11px Arial";
		c.fillText('Y' ,Centroid_x - 4, Centroid_y - lengthoflines - 28);
		c.stroke();

/*
		c.beginPath();
		c.moveTo(Centroid_x, Centroid_y);
		c.lineTo(Centroid_x - lengthoflines, Centroid_y);
		c.stroke();

		c.beginPath();
		c.moveTo(Centroid_x, Centroid_y);
		c.lineTo(Centroid_x, Centroid_y + lengthoflines);
		c.stroke();
		*/


	//for this function to draw correctly, alpha needs to be flipped.
	alpha = -alpha;

	    c.fillStyle = "black";
		c.strokeStyle = "black";

		c.lineWidth = 1.5;

		CScenterx = Centroid_x;
		CScentery = Centroid_y;

		c.setLineDash([]);

        //draw p1 and p2 lines:
		c.beginPath();
		c.moveTo(CScenterx, CScentery);
		c.lineTo(CScenterx + lengthoflines * Math.cos(alpha), CScentery + lengthoflines * Math.sin(alpha));
		c.stroke();


		c.font = "11px Arial";
		c.fillText(xChar ,CScenterx + (lengthoflines + 2) * Math.cos(alpha), CScentery + (lengthoflines + 2) * Math.sin(alpha));

		alpha = alpha + Math.PI/ 2;

		c.beginPath();
		c.moveTo(CScenterx, CScentery);
		c.lineTo(CScenterx - lengthoflines * Math.cos(alpha), CScentery - lengthoflines * Math.sin(alpha));
		c.stroke();

		c.fillText(yChar ,CScenterx - (lengthoflines + 5) * Math.cos(alpha) , CScentery - (lengthoflines + 5) * Math.sin(alpha) );


		c.beginPath();
		c.arc(CScenterx,CScentery,3, Math.PI*2, false);
		c.fill();

		c.fillStyle = "white";

		c.beginPath();
		c.arc(CScenterx,CScentery,1, Math.PI*2, false);
		c.fill();

		c.fillStyle = "black";
		c.font = "14px Arial";

}

function drawZeroZero(zX, zY){
	//draws reticule at lowest, leftest point in geometry:

		c.strokeStyle = "#0086CF";
		c.lineWidth = 2;

		//horizontal line first:
		c.beginPath();
		c.moveTo(zX - 5, zY);
		c.lineTo(zX + 15, zY);
		c.stroke();

		//vertical line first:
		c.beginPath();
		c.moveTo(zX, zY + 5);
		c.lineTo(zX, zY - 15);
		c.stroke();

		c.font = "12px Arial";
		c.fillText("0,0" ,zX - 18, zY + 11);
		//c.fillText("X" ,zX + 13, zY + 12);
		//c.fillText("Y" ,zX-10, zY - 11);

		c.strokeStyle = "black";
		c.fillStyle = "black";
		c.font = "14px Arial";

};

function centroidCoords(){
	//Find the distance between the zeros and the centroid location.
	var distx = Math.abs(zeroX * Scale - MasterCx);
	var disty = Math.abs(zeroY * Scale - MasterCy);
	var retArray = [distx, disty];
	return retArray;
}


function findPrecision(value) {
if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length;
}

function linesCommonToNode(nodex, nodey){
	//Things that need to happen in this function:

	//Detect line IDs that are attached to a node.
	//Get lengths of those lines.
	//Get angles of those lines.
	//If end1, just pass angle proeprty.
	//If end2, calculate equivalent angle for the other end.
	//Pass all of these things via a retArray.

	//First, just count how many lines are going to be common to the node.

	var numberOfCommonNodes = 0;
	var numberOfLinesFound = 0;

	var lineID1 = 999;
	var lineID2 = 999;

	var line1length = 0;
	var line2length = 0;
	var line1angle = 0;
	var line2angle = 0;
	var line1x = 0;
	var line1y = 0;
	var line2x = 0;
	var line2y = 0;
	var line1side = "null";
	var line2side = "null";

	var retArray = [];

	tolerance = .0001;

	//This is a diagnostic test before anything else happens:

	for (var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
        if(Tol(l.startx,nodex,tolerance) && Tol(l.starty,nodey,tolerance) && (l.constLine == false)){
         ////console.log(l.lineID)
        }
        else if(Tol(l.endx,nodex,tolerance) && Tol(l.endy,nodey, tolerance) && (l.constLine == false)){
         ////console.log(l.lineID)
        }
	}

	for (var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
		if(Tol(l.startx,nodex,tolerance) && Tol(l.starty,nodey,tolerance) && (l.constLine == false)){
			numberOfCommonNodes += 1;
		}
		else if(Tol(l.endx,nodex,tolerance) && Tol(l.endy,nodey,tolerance) && (l.constLine == false)){
			numberOfCommonNodes += 1;
		}
	}

	//Get lineIDs common to that node,assign linelength variable and angle variable.

	for (var i = 0; i < lineArray.length; i++){
		l = lineArray[i];

		if(Tol(l.startx,nodex,tolerance) && Tol(l.starty,nodey,tolerance) && (l.constLine == false)){
			if(numberOfLinesFound == 0){
				lineID1 = l.lineID;
				line1length = l.lineLength;
				line1angle = l.angle;
				x = l.startx;
				y = l.starty;
				line1side = "start";
				numberOfLinesFound += 1;
			}
			else if(numberOfLinesFound == 1){
				lineID2 = l.lineID;
				line2length = l.lineLength;
				line2angle = l.angle;
				x = l.startx;
				y = l.starty;
				line2side = "start";
				numberOfLinesFound += 1;
			}
		}

		else if(Tol(l.endx,nodex,tolerance) && Tol(l.endy,nodey,tolerance) && (l.constLine == false)){
			if(numberOfLinesFound == 0){
				lineID1 = l.lineID;
				line1length = l.lineLength;
				//Calcs to transform angle to that if this point were a start point:
				if(l.angle >= 0 && l.angle <180){
					line1angle = l.angle + 180;
				}
				else if(l.angle >= 180 && l.angle <360){
					line1angle = l.angle - 180;
				}
				x = l.endx;
				y = l.endy;
				line1side = "end";
				numberOfLinesFound += 1;
			}
			else if(numberOfLinesFound == 1){
				lineID2 = l.lineID;
				line2length = l.lineLength;
				//Calcs to transform angle to that if this point were a start point:
				if(l.angle >= 0 && l.angle <180){
					line2angle = l.angle + 180;
					////console.log("case 1");
				}
				else if(l.angle >= 180 && l.angle <360){
					line2angle = l.angle - 180;
					////console.log("case 2");
				}
				else{
					////console.log("no case");
				}
				x = l.endx;
				y = l.endy;
				line2side = "end";
				numberOfLinesFound += 1;
			}
		}
	}


	retArray = [lineID1, line1length, line1angle, x, y, lineID2, line2length, line2angle, line1side, line2side];

	return retArray;

}

function linesCommonToNode_2(nodex, nodey){
	//Same as above, but counts constLines as lines.

	//Detect line IDs that are attached to a node.
	//Get lengths of those lines.
	//Get angles of those lines.
	//If end1, just pass angle proeprty.
	//If end2, calculate equivalent angle for the other end.
	//Pass all of these things via a retArray.

	//First, just count how many lines are going to be common to the node.

	var numberOfCommonNodes = 0;
	var numberOfLinesFound = 0;

	var lineID1 = 999;
	var lineID2 = 999;

	var line1length = 0;
	var line2length = 0;
	var line1angle = 0;
	var line2angle = 0;
	var line1x = 0;
	var line1y = 0;
	var line2x = 0;
	var line2y = 0;
	var line1side = "null";
	var line2side = "null";

	var retArray = [];

	tolerance = .0001;

	//This is a diagnostic test before anything else happens:

	for (var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
        if(Tol(l.startx,nodex,tolerance) && Tol(l.starty,nodey,tolerance)){
         ////console.log(l.lineID)
        }
        else if(Tol(l.endx,nodex,tolerance) && Tol(l.endy,nodey, tolerance)){
         ////console.log(l.lineID)
        }
	}

	for (var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
		if(Tol(l.startx,nodex,tolerance) && Tol(l.starty,nodey,tolerance)){
			numberOfCommonNodes += 1;
		}
		else if(Tol(l.endx,nodex,tolerance) && Tol(l.endy,nodey,tolerance)){
			numberOfCommonNodes += 1;
		}
	}

	//Get lineIDs common to that node,assign linelength variable and angle variable.

	for (var i = 0; i < lineArray.length; i++){
		l = lineArray[i];

		if(Tol(l.startx,nodex,tolerance) && Tol(l.starty,nodey,tolerance)){
			if(numberOfLinesFound == 0){
				lineID1 = l.lineID;
				line1length = l.lineLength;
				line1angle = l.angle;
				x = l.startx;
				y = l.starty;
				line1side = "start";
				numberOfLinesFound += 1;
			}
			else if(numberOfLinesFound == 1){
				lineID2 = l.lineID;
				line2length = l.lineLength;
				line2angle = l.angle;
				x = l.startx;
				y = l.starty;
				line2side = "start";
				numberOfLinesFound += 1;
			}
		}

		else if(Tol(l.endx,nodex,tolerance) && Tol(l.endy,nodey,tolerance)){
			if(numberOfLinesFound == 0){
				lineID1 = l.lineID;
				line1length = l.lineLength;
				//Calcs to transform angle to that if this point were a start point:
				if(l.angle >= 0 && l.angle <180){
					line1angle = l.angle + 180;
				}
				else if(l.angle >= 180 && l.angle <360){
					line1angle = l.angle - 180;
				}
				x = l.endx;
				y = l.endy;
				line1side = "end";
				numberOfLinesFound += 1;
			}
			else if(numberOfLinesFound == 1){
				lineID2 = l.lineID;
				line2length = l.lineLength;
				//Calcs to transform angle to that if this point were a start point:
				if(l.angle >= 0 && l.angle <180){
					line2angle = l.angle + 180;
					////console.log("case 1");
				}
				else if(l.angle >= 180 && l.angle <360){
					line2angle = l.angle - 180;
					////console.log("case 2");
				}
				else{
					////console.log("no case");
				}
				x = l.endx;
				y = l.endy;
				line2side = "end";
				numberOfLinesFound += 1;
			}
		}
	}

	retArray = [lineID1, line1length, line1angle, x, y, lineID2, line2length, line2angle, line1side, line2side];

	return retArray;

}

function arcsCommonToNode(nodex, nodey){
    //does what it says.

	var numberOfCommonNodes = 0;
	var numberOfArcsFound = 0;

	var arcID = 999;

	var tolerance = .0001;

	for (var i = 0; i < arcArray.length; i++){
		a = arcArray[i];
        if(Tol(a.endpoint1x,nodex,tolerance) && Tol(a.endpoint1y,nodey,tolerance)){
            arcID = a.arcID;
        }
        else if(Tol(a.endpoint2x,nodex,tolerance) && Tol(a.endpoint2y,nodey, tolerance)){
            arcID = a.arcID;
        }
	}

	return arcID;
}

function FilletPreview(nodex, nodey, radius){
	//first step is to temporarily draw a fillet when a corner is hovered over.

	Filletlines = linesCommonToNode(nodex, nodey);

	var retArray = [];

	//Input assignment:
	var lineID1 = Filletlines[0];
	var line1length = Filletlines[1];
	var line1angle = Filletlines[2];
	var x = Filletlines[3];
	var y = Filletlines[4];
	var lineID2 = Filletlines[5];
	var line2length = Filletlines[6];
	var line2angle = Filletlines[7];
	var line1side = Filletlines[8];
	var line2side = Filletlines[9];

    ////console.log('in fP, lineID1: ', lineID1);
    ////console.log('in fP, lineID2: ', lineID2);
    ////console.log('in fP, line1side: ', line1side);
    ////console.log('in fP, line2side: ', line2side);

	var alpha_calc = 0;
	var alpha = 0;
	var theta_l = 0;
	var L = 0;
	var xc = 0;
	var yc = 0;
	var theta = 0;
	var theta_l_prime = 0;

	var startLineSide = "null";
	var endLineSide = "null";

	//find the angle between the lines:
	alpha = Math.abs(line1angle - line2angle);

	//in the case that the lines are across the positive x axis, need to do some special stuff:
	if(alpha >= 180){
		alpha = 360 - alpha;
		theta_l = Math.max(line1angle, line2angle) + alpha/2;
	}

	else{
	//Find the average angle of the lines (the ray in between):
	theta_l = (line1angle + line2angle)/2;
	}

	////console.log(line1angle, line2angle, alpha, theta_l);
	//Find radial length from origin that centroid must be placed:
	L = radius /(Math.sin((alpha/2)*(Math.PI/180)));

	//Calculate the centroid of the arc:
	if((alpha >= 0 && alpha <= 180) || ((alpha > 360 && alpha <= 720))){
		xc = x + L*Math.cos((theta_l)*(Math.PI/180));
		yc = y - L*Math.sin((theta_l)*(Math.PI/180));
	}
	else{
		xc = x - L*Math.cos((theta_l)*(Math.PI/180));
		yc = y + L*Math.sin((theta_l)*(Math.PI/180));
		alpha = 360 - alpha;
	}

	//Find required arc angle for fillet:
	theta = 180 - alpha;

	//calculate angle at which to start the arc:
	theta_start = (180 - theta_l - theta/2) * (Math.PI/180);
	theta_end = (180 - theta_l + theta/2) * (Math.PI/180);

	//Find the location of each tangency.
	var tangentPointStartx = xc + radius*Math.cos(theta_start);
	var tangentPointStarty = yc + radius*Math.sin(theta_start);
	var tangentPointEndx = xc + radius*Math.cos(theta_end);
	var tangentPointEndy = yc + radius*Math.sin(theta_end);

	var startLineID = isonline(tangentPointStartx,tangentPointStarty,'UI',false,lineID1, lineID2);
	var endLineID = isonline(tangentPointEndx,tangentPointEndy,'UI',false,lineID1, lineID2);

	////console.log('in fP, startlineID loc 1 :', startLineID);
	////console.log('in fP, endlineID loc 1 :', endLineID);

	//Problem is that only first endpoint encoutered is returned. If it is common to more than one line, that's a problem. Need to filter for one of the two lineIDs.


	if(startLineID == 999){
	    //check to see if the startpoints are on an endpoint...
	    var epArray = specificendpoint('linesonly', 'null', true, tangentPointStartx, tangentPointStarty,lineID1, lineID2);
	    if(epArray[3] != 999){
	        startLineID = epArray[3]
	    }
	}

	if(endLineID == 999){
	    //check to see if the startpoints are on an endpoint...
	    var epArray = specificendpoint('linesonly', 'null', true, tangentPointEndx, tangentPointEndy, lineID1, lineID2);
	    if(epArray[3] != 999){
	        endLineID = epArray[3]
	    }
	}

	////console.log('in fP, startlineID loc 2 :', startLineID);
	////console.log('in fP, endlineID loc 2 :', endLineID);

	//determine which line is which, then assign sides to start and end lines:
	if(startLineID == lineID1){
		startLineSide = line1side;
		endLineSide = line2side;
	}
	else{
		startLineSide = line2side;
		endLineSide = line1side;
	}

	//If both tangent points are on lines:
	if(startLineID != 999 && endLineID != 999){
		//draw a preview:
		c.strokeStyle = "black";
		c.beginPath();
		c.arc(xc, yc, radius, theta_start, theta_end);
		c.stroke();
		c.lineWidth = 2;
		retArray = [xc, yc, radius, theta_start, theta_end ,lineID1, line1angle, lineID2, line2angle, startLineID, startLineSide, tangentPointStartx, tangentPointStarty, endLineID, endLineSide, tangentPointEndx, tangentPointEndy];

	}

	else{
		retArray = [0,0,0,999];
	}

	return retArray;

}

function shortenLinesforFillet(startLineID, startLineSide, tangentPointStartx, tangentPointStarty, endLineID, endLineSide, tangentPointEndx, tangentPointEndy){

	//re-locate start or end point of line according to location of tangent points:
	for(var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
		if(l.lineID == startLineID){
			if(startLineSide == "start"){
				l.startxghost = l.startx;
				l.startyghost = l.starty;
				l.startx = tangentPointStartx;
				l.starty = tangentPointStarty;
	            updateLinearDimension(l.lineID);
			}
			else if(startLineSide == "end"){
				l.endxghost = l.endx;
				l.endyghost = l.endy;
				l.endx = tangentPointStartx;
				l.endy = tangentPointStarty;
	            updateLinearDimension(l.lineID);
			}
		}
		else if(l.lineID == endLineID){
			if(endLineSide == "start"){
				l.startxghost = l.startx;
				l.startyghost = l.starty;
				l.startx = tangentPointEndx;
				l.starty = tangentPointEndy;
	            updateLinearDimension(l.lineID);
			}
			else if(endLineSide == "end"){
				l.endxghost = l.endx;
				l.endyghost = l.endy;
				l.endx = tangentPointEndx;
				l.endy = tangentPointEndy;
	            updateLinearDimension(l.lineID);
			}
		}
	}
}

//Takes a lineID and upates the dimension and dimension tag based on most up to date endpoints.
function updateLinearDimension(lineID){

	for(var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
		if(l.lineID == lineID){

		    l.midpointX = (l.startx + l.endx)/2;
            l.midpointY = (l.starty + l.endy)/2;

		    //operate on that line to find the new length:
		    l.lineLength = Math.sqrt(Math.pow(l.startx-l.endx,2)+Math.pow(l.starty - l.endy,2));

            //assign the linear dimension to an object:
		    for(var j = 0; j < linearDimArray.length; j++){
		        lx = linearDimArray[j];
		        ////console.log(lx.elementID);
		        if(lx.elementID == lineID){
		            ldim = lx;
		        }
		    }

            //assign the angular dimension to an object:
		    for(var j = 0; j < AngularDimArray.length; j++){
		        ax = AngularDimArray[j];
		        if(ax.elementID == lineID){
		            adim = ax;
		        }
		    }

		    //Calculate new properties for the moved dimension and tag.

            var angle = ldim.angle;

        	var dimXpos = l.startx + 2;
        	var dimYpos = l.starty - 10;

        	var actLength = l.lineLength * Scale;

            //call a function that defines offsets based on line data:
            var offsetArray = findOffsets(actLength, l.startx, l.starty, l.endx, l.endy, angle);

            var dimYpos = offsetArray[0];
        	var dimXpos = offsetArray[1];
        	var xoffset1 = offsetArray[2];
        	var yoffset1 = offsetArray[3];
        	var xoffset2 = offsetArray[4];
        	var yoffset2 = offsetArray[5];
        	var dimYpos_a = offsetArray[6];
        	var dimXpos_a = offsetArray[7];
        	var perpOffset = offsetArray[8];

        	var dimlineYstart = l.starty;
        	var dimlineYend = l.endy;
        	var dimlineXstart = l.startx;
        	var dimlineXend = l.endx;
        	var orientation = "angled";

			//ASD
            //Assign the previously calculated properties:

        	ldim.value = actLength;
        	ldim.x = l.midpointX-10;
        	ldim.y = l.midpointY+4;
        	ldim.startx = dimlineXstart;
        	ldim.starty = dimlineYstart;
        	ldim.endx = dimlineXend;
        	ldim.endy = dimlineYend;
        	ldim.orientation = orientation;
        	ldim.xoffset1 = xoffset1;
        	ldim.yoffset1 = yoffset1;
        	ldim.xoffset2 = xoffset2;
        	ldim.yoffset2 = yoffset2;
        	ldim.perpOffset = perpOffset;

            adim.x = dimXpos_a;
            adim.y = dimYpos_a;
            adim.startx = l.startx;
            adim.starty = l.starty;

           //Hide the dimension if it's too short.
            //console.log('Changed Line Length: ', l.lineLength)
            if(l.lineLength < 20){
                ldim.showDim = false;
            }
            else{
                ldim.showDim = true;
            }
		}
	}

}

function arcIntercepts(elementID){
//for a given line, checks for intersections with arcs.

    //an empty array into which the endpoints will be dumped when found:
    var intEndpointArray = [];

    //For the target line:
    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];
        if(l.lineID == elementID){
          l1 = l
        }
    }

    //m is found:
    var m = (l1.endy - l1.starty)/(l1.startx - l1.endx);

    //sometimes, due to rounding error, m1 isn't set to infinity if it is very large.
    if(m > 1000000 || m < -1000000 || m == -Infinity){
        m = Infinity;
    }

    //y is zero at top of window
    var yFromBottom1 = (canvas.height - l1.starty);
    var b = yFromBottom1 * Scale - m * (l1.startx * Scale);

    //Next, go through all arcs and get x_c, x_y (from bottom, to match line formulation), and r:
    var x_c = 0;
    var y_c = 0;

    var r = 0;

    for(var i = 0; i < arcArray.length; i++){

        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;

        x_c = Scale * (arcArray[i].centroidx);
        y_c = Scale*(canvas.height - arcArray[i].centroidy);
        r = Scale * (arcArray[i].radius);

        var A = (1  + Math.pow(m,2));
        var B = (2*m*b -2*m*y_c - 2*x_c);
        var C = Math.pow(y_c,2) - Math.pow(r,2) + Math.pow(x_c,2) - 2*b*y_c + Math.pow(b,2);

        //In the event that the line is vertical, use a different process to find intersection points:
        if(m == Infinity){
            x1 = l1.startx*Scale;
            x2 = l1.startx*Scale;

            //for all arcs, find intersecting y values for x1 and x2:

            y1 = y_c + Math.pow((Math.pow(r,2) - Math.pow((x1 - x_c),2)),.5);
            y2 = y_c - Math.pow((Math.pow(r,2) - Math.pow((x1 - x_c),2)),.5);

            if(isNaN(y1) == false && isNaN(y2) == false){
                //drawEndpoint(x1/Scale, canvas.height - y1/Scale);
                //drawEndpoint(x2/Scale, canvas.height - y2/Scale);
            }
        }
        //For non-vertical lines:
        else if((Math.pow(B,2) - 4*A*C) > 0){
            //Then there are two solutions... that is the only case we care about.
            x1 = (-B + (Math.pow((Math.pow(B,2) - 4*A*C),.5)))/(2*A);
            y1 = m*x1 + b;
            x2 = (-B - (Math.pow((Math.pow(B,2) - 4*A*C),.5)))/(2*A);
            y2 = m*x2 + b;
            //drawEndpoint(x1/Scale, canvas.height - y1/Scale);
            //drawEndpoint(x2/Scale, canvas.height - y2/Scale);
        }

        //Next, find the angles from the centroid of the arc to the possible intersection points:
        if(x1 != 0 && x2 != 0){
            var angle1 = lineAngleFromOrigin(x_c/Scale, canvas.height - y_c/Scale, x1/Scale, canvas.height - y1/Scale);
            var angle2 = lineAngleFromOrigin(x_c/Scale, canvas.height - y_c/Scale, x2/Scale, canvas.height - y2/Scale);
            var angle = lineAngleFromOrigin(x_c/Scale, canvas.height - y_c/Scale, mouse.x, mouse.y);

            angle1 = angle1 - 90;
            if(angle1 < 0){
                angle1 = angle1 + 360;
            }

            angle2 = angle2 - 90;
            if(angle2 < 0){
                angle2 = angle2 + 360;
            }

            var radstart = arcArray[i].radstart;
            var radend = arcArray[i].radend;

            if(radstart < 0){
                radstart = radstart + 2*Math.PI;
            }
            if(radstart < 0){
                radstart = radstart + 2*Math.PI;
            }
            if(radstart < 0){
                radstart = radstart + 2*Math.PI;
            }

            if(radend < 0){
                radend = radend + 2*Math.PI;
            }
            if(radend < 0){
                radend = radend + 2*Math.PI;
            }
            if(radend < 0){
                radend = radend + 2*Math.PI;
            }

            var startAngle = (radstart)*(180/Math.PI);
            var endAngle = (radend)*(180/Math.PI);

            var xa1 = x1/Scale;
            var ya1 = canvas.height - y1/Scale;

            var xa2 = x2/Scale;
            var ya2 = canvas.height - y2/Scale;

            if(endAngle == 0 || endAngle < startAngle){
                if(isbetween(angle1,startAngle,360,true) || isbetween(angle1, 0, endAngle,true)){
                    if(isbetween(xa1,l1.startx, l1.endx,true) && isbetween(ya1,l1.starty, l1.endy,true)){
                        intEndpointArray.push([xa1,ya1]);

                    }
                }
                if(isbetween(angle2,startAngle,360,true) || isbetween(angle2, 0, endAngle,true)){
                    if(isbetween(xa2,l1.startx, l1.endx,true) && isbetween(ya2,l1.starty, l1.endy,true)){
                        intEndpointArray.push([xa2,ya2]);
                    }
                }
            }

            else{
                if(isbetween(angle1,startAngle,endAngle,true) == true){
                    if(isbetween(xa1,l1.startx, l1.endx,true) && isbetween(ya1,l1.starty, l1.endy,true)){
                        intEndpointArray.push([xa1,ya1]);
                    }
                }
                if(isbetween(angle2,startAngle,endAngle,true) == true){
                    if(isbetween(xa2,l1.startx, l1.endx,true) && isbetween(ya2,l1.starty, l1.endy,true)){
                        intEndpointArray.push([xa2,ya2]);
                    }
                }
            }
        }

    }

    return intEndpointArray;

}

function arcLineIntercepts(elementID){
//for a given arc, checks for intersections with lines.

    //an empty array into which the endpoints will be dumped when found:
    var intEndpointArray = [];

    //For an arc:
    for(var i = 0; i < arcArray.length; i++){
        if(arcArray[i].arcID == elementID){
            a = arcArray[i];
        }
    }

    var x_c = Scale * (a.centroidx);
    var y_c = Scale * (canvas.height - a.centroidy);
    var r = Scale * (a.radius);

    //Next, go through all arcs and get x_c, x_y (from bottom, to match line formulation), and r:

    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];

        //m is found:
        var m = (l.endy - l.starty)/(l.startx - l.endx);

     //sometimes, due to rounding error, m1 isn't set to infinity if it is very large.
        if(m > 1000000 || m < -1000000 || m == -Infinity){
            m = Infinity;
        }

        //y is zero at top of window
        var yFromBottom1 = (canvas.height - l.starty);
        var b = yFromBottom1 * Scale - m * (l.startx * Scale);

        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;

        var A = (1  +  Math.pow(m,2));
        var B = (2*m*b -2*m*y_c - 2*x_c);
        var C = Math.pow(y_c,2) - Math.pow(r,2) + Math.pow(x_c,2) - 2*b*y_c + Math.pow(b,2);

        //In the event that the line is vertical, use a different process to find intersection points:
        if(m == Infinity){
            x1 = l.startx*Scale;
            x2 = l.startx*Scale;

            //for all arcs, find intersecting y values for x1 and x2:

            y1 = y_c + Math.pow((Math.pow(r,2) - Math.pow((x1 - x_c),2)),.5);
            y2 = y_c - Math.pow((Math.pow(r,2) - Math.pow((x1 - x_c),2)),.5);

            if(isNaN(y1) == false && isNaN(y2) == false){
                //drawEndpoint(x1/Scale, canvas.height - y1/Scale);
                //drawEndpoint(x2/Scale, canvas.height - y2/Scale);
            }
        }

        //For non-vertical lines:
        else if((Math.pow(B,2) - 4*A*C) > 0){
            //Then there are two solutions... that is the only case we care about.
            x1 = (-B + (Math.pow((Math.pow(B,2) - 4*A*C),.5)))/(2*A);
            y1 = m*x1 + b;
            x2 = (-B - (Math.pow((Math.pow(B,2) - 4*A*C),.5)))/(2*A);
            y2 = m*x2 + b;

            //drawEndpoint(x1/Scale, canvas.height - y1/Scale);
            //drawEndpoint(x2/Scale, canvas.height - y2/Scale);
        }

        //Next, find the angles from the centroid of the arc to the possible intersection points:
        if(x1 != 0 && x2 != 0){
            var angle1 = lineAngleFromOrigin(x_c/Scale, canvas.height - y_c/Scale, x1/Scale, canvas.height - y1/Scale);
            var angle2 = lineAngleFromOrigin(x_c/Scale, canvas.height - y_c/Scale, x2/Scale, canvas.height - y2/Scale);

            angle1 = angle1 - 90;
            if(angle1 < 0){
                angle1 = angle1 + 360;
            }

            angle2 = angle2 - 90;
            if(angle2 < 0){
                angle2 = angle2 + 360;
            }

            var radstart = a.radstart;
            var radend = a.radend;

            if(radstart < 0){
                radstart = radstart + 2*Math.PI;
            }
            if(radstart < 0){
                radstart = radstart + 2*Math.PI;
            }
            if(radstart < 0){
                radstart = radstart + 2*Math.PI;
            }

            if(radend < 0){
                radend = radend + 2*Math.PI;
            }
            if(radend < 0){
                radend = radend + 2*Math.PI;
            }
            if(radend < 0){
                radend = radend + 2*Math.PI;
            }

            var startAngle = (radstart)*(180/Math.PI);
            var endAngle = (radend)*(180/Math.PI);

            var xa1 = x1/Scale;
            var ya1 = canvas.height - y1/Scale;

            var xa2 = x2/Scale;
            var ya2 = canvas.height - y2/Scale;

            if(endAngle == 0 || endAngle < startAngle){
                if(isbetween(angle1,startAngle,360) || isbetween(angle1, 0, endAngle)){
                    if(isbetween(xa1,l.startx, l.endx,true) && isbetween(ya1,l.starty, l.endy,true)){
                        intEndpointArray.push([xa1,ya1,angle1]);

                    }
                }
                if(isbetween(angle2,startAngle,360) || isbetween(angle2, 0, endAngle)){
                    if(isbetween(xa2,l.startx, l.endx,true) && isbetween(ya2,l.starty, l.endy,true)){
                        intEndpointArray.push([xa2,ya2,angle2]);
                    }
                }
            }

            else{
                if(isbetween(angle1,startAngle,endAngle) == true){
                    if(isbetween(xa1,l.startx, l.endx,true) && isbetween(ya1,l.starty, l.endy,true)){
                        intEndpointArray.push([xa1,ya1,angle1]);
                    }
                }
                if(isbetween(angle2,startAngle,endAngle) == true){
                    if(isbetween(xa2,l.startx, l.endx,true) && isbetween(ya2,l.starty, l.endy,true)){
                        intEndpointArray.push([xa2,ya2,angle2]);
                    }
                }
            }
        }

    }

    return intEndpointArray;

}

function SnipFillet(elementID,preview){

    //Get location of line intercepts wiht fillets:
    var intEndpointArray = arcLineIntercepts(elementID);

    //if they are not already included, add start and endpoints of the arc to the list.
    //get the arc object:

    for (var i = 0; i < arcArray.length; i++){
        if(arcArray[i].arcID == elementID){
            a = arcArray[i];
        }
    }

    //get the endpoints of the arc as they are:

    var ep1x = a.endpoint1x;
    var ep1y = a.endpoint1y;
    var ep2x = a.endpoint2x;
    var ep2y = a.endpoint2y;
    var radstart = a.radstart;
    var radend = a.radend;

    if(radstart < 0){
        radstart = radstart + 2*Math.PI;
    }
    if(radstart < 0){
        radstart = radstart + 2*Math.PI;
    }
    if(radstart < 0){
        radstart = radstart + 2*Math.PI;
    }

    if(radend < 0){
        radend = radend + 2*Math.PI;
    }
    if(radend < 0){
        radend = radend + 2*Math.PI;
    }
    if(radend < 0){
        radend = radend + 2*Math.PI;
    }

    var startAngleOrig = (radstart)*(180/Math.PI);
    var endAngleOrig = (radend)*(180/Math.PI);

    var addep1 = true;
    var addep2 = true;

    var tolerance = .0000001;

    //go through list and see if the endpoints are included already:
    for(var i = 0; i < intEndpointArray.length; i ++){
        if((Tol(intEndpointArray[i][0],ep1x,tolerance)) && (Tol(intEndpointArray[i][1],ep1y,tolerance))){
            addep1 = false;
        }
        if((Tol(intEndpointArray[i][0],ep2x,tolerance)) && (Tol(intEndpointArray[i][1],ep2y,tolerance))){
            addep2 = false;
        }
    }

    //add endpoints if they aren't already in there.
    if(addep1 == true){
        intEndpointArray.push([ep1x, ep1y, startAngleOrig]);
    }
    if(addep2 == true){
        intEndpointArray.push([ep2x, ep2y, endAngleOrig]);
    }

    //angles are put into an array:
    var angleArray = [];

    for(var i = 0; i < intEndpointArray.length; i ++){
        angleArray.push(intEndpointArray[i][2]);
    }

    //Sort the angles from smalles to to largest:
    angleArray = angleArray.sort(compareNumbers);

    //Next, wrap the array around, so that start angle is the first element.
    var startWrap = 0;
    for(var i = 0; i < angleArray.length; i ++){
        if(angleArray[i] == startAngleOrig){
           startWrap = i
        }
    }
    var wrappedArray = [];
    for(var i = startWrap; i < angleArray.length; i ++){
        wrappedArray.push(angleArray[i]);
    }
    for(var i = 0; i < startWrap; i ++){
        wrappedArray.push(angleArray[i]);
    }

    //Next, make pairs out of the adjacent intersection points.
    var pairsArray = [];
    for(var i = 1; i < wrappedArray.length; i ++){
        var pair = [wrappedArray[i-1],wrappedArray[i]];
        pairsArray.push(pair);
    }

    var startAngle1 = 0;
    var endAngle1 = 0;
    var startAngle = 0;
    var endAngle = 0;

    var mouseAngle = lineAngleFromOrigin(a.centroidx,a.centroidy, mouse.x, mouse.y);

    mouseAngle = mouseAngle - 90;
    if(mouseAngle < 0){
        mouseAngle = mouseAngle + 360;
    }

    //Next, detect which angle sector the mouse is in:
    for(var i = 0; i < pairsArray.length; i ++){
        startAngle1 = pairsArray[i][0];
        endAngle1 = pairsArray[i][1];
        if(isbetweenangle(mouseAngle,startAngle1,endAngle1)){
            startAngle = startAngle1;
            endAngle = endAngle1;
        }
    }

    //draw an arc from the start angle to the end angle at the given radius for
    //the highlighted section:
    c.beginPath();
	c.arc(a.centroidx, a.centroidy, a.radius, startAngle*(Math.PI/180), endAngle*(Math.PI/180));
	c.lineWidth = 2;
	c.strokeStyle = "red";
	c.stroke();

	//if the user clicked, or a drag is occuring, we need to alter the arc accordingly.

	//To make this simple(r), we break it down to three cases:
    if(preview == false){
        //grab the arc data before deletion:
        var cxtopass = a.centroidx;
        var cytopass = a.centroidy;
        var radtopass = a.radius;

    	//1) the selected segment is common to the startAngle.
    	    //Delete the arc and the associated dimension.
    	    //create new arc, but with radstart == startAngle.

    	if((startAngle == startAngleOrig) && (endAngle == endAngleOrig)){
    	    deletefillet(a.arcID, false, true);
    	}

    	else if(startAngle == startAngleOrig){
            var undoFillet = JSON.parse(JSON.stringify(a));
    		    for(var k = 0; k < linearDimArray.length; k++){
    		        if(linearDimArray[k].elementID == a.arcID){
    		            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
    		        }
    		    }
    	    deletefillet(a.arcID,true, true);
        	var deleteFillet1 = simpleFillet(cxtopass, cytopass, radtopass, endAngle, endAngleOrig);
    	    updateUserMoves(['snipfillet', undoFillet, deleteFillet1, 999,undoLinearDim]);
    	    GenerateInverse();
    	}
    	else if(endAngle == endAngleOrig){
            var undoFillet = JSON.parse(JSON.stringify(a));
    		    for(var k = 0; k < linearDimArray.length; k++){
    		        if(linearDimArray[k].elementID == a.arcID){
    		            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
    		        }
    		    }
    	    deletefillet(a.arcID,true, true);
        	var deleteFillet1 = simpleFillet(cxtopass, cytopass, radtopass, startAngleOrig, startAngle);
    	    updateUserMoves(['snipfillet', undoFillet, deleteFillet1, 999,undoLinearDim]);
    	    GenerateInverse();
    	}
    	else{
            var undoFillet = JSON.parse(JSON.stringify(a));
    		    for(var k = 0; k < linearDimArray.length; k++){
    		        if(linearDimArray[k].elementID == a.arcID){
    		            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
    		        }
    		    }
    	    deletefillet(a.arcID,true, true);
        	var deleteFillet1 = simpleFillet(cxtopass, cytopass, radtopass, startAngleOrig, startAngle);
        	var deleteFillet2 = simpleFillet(cxtopass, cytopass, radtopass, endAngle, endAngleOrig);
    	    updateUserMoves(['snipfillet', undoFillet, deleteFillet1, deleteFillet2,undoLinearDim]);
    	    GenerateInverse();
    	}

        removeZeroDegreeFillets();
        closeOrOpenSection();
    }
}

//manual fillet creation method.
function simpleFillet(centroidx, centroidy, radius, startAngle, endAngle){

    //increment global element ID. This needs to be done, because it's not being called elswhere when this function is called.
    ElementID += 1;

    //Find the location of each tangency.
	var tangentPointStartx = centroidx + radius*Math.cos(startAngle*(Math.PI/180));
	var tangentPointStarty = centroidy + radius*Math.sin(startAngle*(Math.PI/180));
	var tangentPointEndx = centroidx + radius*Math.cos(endAngle*(Math.PI/180));
	var tangentPointEndy = centroidy + radius*Math.sin(endAngle*(Math.PI/180));

    arcArray.push(new Arc(centroidx,centroidy,radius,startAngle*(Math.PI/180),endAngle*(Math.PI/180),ElementID,0,0,0,0,"black",tangentPointStartx, tangentPointStarty,tangentPointEndx, tangentPointEndy));

	createFilletDim(ElementID,'SNIP');
	ClearStressVis();

	return ElementID;
}

function isbetweenangle(angle,startAngle,endAngle){
//Checks to see if an angle is between two other angles:
var between = false;
    if(endAngle == 0 || endAngle < startAngle){
        if(isbetween(angle,startAngle,360) || isbetween(angle, 0, endAngle)){
            between = true;
        }
    }
    else{
        if(isbetween(angle,startAngle,endAngle) == true){
            between = true;
        }
    }

    return between;
}


function Snip(elementID,preview){

    //Get arc intersects first:

    var intEndpointArray = arcIntercepts(elementID);

    //Next, pass those arcintercepts in and include in the endpoint array.
    //after that, write in ability to shorten fillets.

    //First, find out what lines are intersecting with the target line.
    //(startx, starty, endx, endy, dim, lineID, lineLength, constLine, angle)
    var x = 0;
    var y = 0;

    //var intEndpointArray = [];

    //For the target line:
    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];
        if(l.lineID == elementID){
          l1 = l
        }
    }

    // a copy of the line as it was is saved for recall by undo.
    var undoLine = JSON.parse(JSON.stringify(l1));

    //m1 is found:
    var m1 = (l1.endy - l1.starty)/(l1.startx - l1.endx);
    //sometimes, due to rounding error, m1 isn't set to infinity if it is very large.
    if(m1 > 1000000 || m1 < -1000000 || m1 == -Infinity){
        m1 = Infinity;
    }

    //y is zero at top of window
    var yFromBottom1 = (canvas.height - l1.starty);
    var b1 = yFromBottom1 * Scale - m1 * (l1.startx * Scale);

    //For all the other lines:
    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];
        if(l.lineID != elementID){
            l2 = l
            //m2 is found:
            m2 = (l2.endy - l2.starty)/(l2.startx - l2.endx);
            //sometimes, due to rounding error, m2 isn't set to infinity if it is very large.
            if(m2 > 1000000 || m2 < -1000000 || m2 == -Infinity){
                m2 = Infinity;
            }
            //y is zero at top of window
            yFromBottom2 = (canvas.height - l2.starty);
            b2 = yFromBottom2 * Scale - m2 * (l2.startx * Scale);

            x = (b2 - b1)/(m1-m2);

            //to catch the case where we are dealing with a vertical line, x will be NaN.
            //In that event, the x value is the same everywhere on the vertical line.
            if(m1 == Infinity){
                x = l1.startx*Scale;
            }
            else if(m2 == Infinity){
                x = l2.startx*Scale;
            }

            if(m1 == Infinity){
                y = m2*x + b2
            }
            else if(m2 == Infinity){
                y = m1*x + b1
            }
            else{
                y = m1*x + b1;
            }

            x = x/Scale;
            y = canvas.height - y/Scale;

            //Check to see if x and y are on the target line:
    		var calcdLineLength1 = Math.sqrt(Math.pow(l1.startx-l1.endx,2)+Math.pow(l1.starty - l1.endy,2));
			var dist_from_start1 = Math.sqrt(Math.pow(l1.startx-x,2)+Math.pow(l1.starty - y,2));
			var dist_from_end1 = Math.sqrt(Math.pow(l1.endx- x,2)+Math.pow(l1.endy - y,2));
			var closeness1 = Math.abs(calcdLineLength1 - dist_from_start1- dist_from_end1);

            //Check to see if x and y are on the intersecting line:
    		var calcdLineLength2 = Math.sqrt(Math.pow(l2.startx-l2.endx,2)+Math.pow(l2.starty - l2.endy,2));
			var dist_from_start2 = Math.sqrt(Math.pow(l2.startx-x,2)+Math.pow(l2.starty - y,2));
			var dist_from_end2 = Math.sqrt(Math.pow(l2.endx- x,2)+Math.pow(l2.endy - y,2));
			var closeness2 = Math.abs(calcdLineLength2 - dist_from_start2- dist_from_end2);

            if(closeness1 < .01 && closeness2 < .01){
                //Add endpoints to an array, if they haven't been added already:
                var notARepeat = true;
                for(var k = 0; k < intEndpointArray.length; k++){
                    if((Math.round(x*10000) == Math.round(intEndpointArray[k][0]*10000)) && (Math.round(y*10000) == Math.round(intEndpointArray[k][1]*10000))){
                        notARepeat = false;
                    }
                }
                if(notARepeat == true){
                    intEndpointArray.push([x,y]);
                }
            }
        }

        //These variables track whether endpoints 1 and 2 from the target line are shared.
        var sharedEP1 = false;
        var sharedEP2 = false;

        //If not already in the array, add the endpoints of the target line.
        ep1Array = [l1.startx, l1.starty];
        ep2Array = [l1.endx, l1.endy];
        for(var j = 0; j < intEndpointArray.length; j++){
            //get element of intarray that we want to work with.
            var intep = intEndpointArray[j];

            //create rounded versions of the intArray elements.
            var intep0r = Math.round(intep[0]*10000);
            var intep1r = Math.round(intep[1]*10000);

            //create rounded versions of the target line endpoints.
            var ep10r = Math.round(ep1Array[0]*10000);
            var ep11r = Math.round(ep1Array[1]*10000);
            var ep20r = Math.round(ep2Array[0]*10000);
            var ep21r = Math.round(ep2Array[1]*10000);


            //If the current point that's being looked at from the int array matches the first endpoint:
            if((intep0r == ep10r) && (intep1r == ep11r)){
                sharedEP1 = true;
            }
            //Or if it is the other one:
            if((intep0r == ep20r) && (intep1r == ep21r)){
                sharedEP2 = true;
            }
        }

        //Based on sharedEPs, add none, 1 or 2 endpoints to the list:
        if(sharedEP1 == false){
            intEndpointArray.push([ep1Array[0],ep1Array[1]]);
        }
        if(sharedEP2 == false){
            intEndpointArray.push([ep2Array[0],ep2Array[1]]);
        }
    }

    //Next, do stuff with the intEndpointArray:

    //This array stores the points and distances from the startpoint of the target line.
    var unSortedIntArray = [];
    var sortedIntArray = [];
    var firstElementSortArray = [];
    var firstElementSortArray1 = [];

    //Go through the intEndpointArray and pull out distances from start and save with point coordinates.
    for(var l = 0; l < intEndpointArray.length; l++){
		var dist_from_start = Math.sqrt(Math.pow(intEndpointArray[l][0]-l1.startx,2)+Math.pow(intEndpointArray[l][1] - l1.starty,2));
        unSortedIntArray.push([dist_from_start,intEndpointArray[l][0],intEndpointArray[l][1]])
    }

    //Pull out the first element of each array in unSortedArray and store in an Array:
    for(var l = 0; l < unSortedIntArray.length; l++){
        firstElementSortArray1.push(unSortedIntArray[l][0]);
    }

    //sort the first element array (this sorts by distance from start point):
    firstElementSortArray = firstElementSortArray1.sort(compareNumbers);

    //Go back and assemble the SortedIntArray picking up elements of the unSortedArray based on order of firstElementSortArray:
    for(var l = 0; l < firstElementSortArray.length; l++){
        for(var m = 0; m < unSortedIntArray.length; m++){
            if(unSortedIntArray[m][0] == firstElementSortArray[l]){
                sortedIntArray.push([unSortedIntArray[m][1],unSortedIntArray[m][2]])
            }
        }
    }

    //Now that the array is sorted along the line, try pairs of points with an isonline check:
        var pairsArray = [];

    for(var l = 0; l < sortedIntArray.length - 1; l++){
        var pairsSubArray = [sortedIntArray[l],sortedIntArray[l+1]];
        pairsArray.push(pairsSubArray);
    }

    var minCloseness = 10000;
    var lforClosest = 0;

    //Find the line segment with start and endpoints in pairsArray that the mouse is on:
    for(var l = 0; l < pairsArray.length; l++){

        var startx = pairsArray[l][0][0];
        var starty = pairsArray[l][0][1];
        var endx = pairsArray[l][1][0];
        var endy = pairsArray[l][1][1];

        var calcdLineLength = Math.sqrt(Math.pow(startx-endx,2)+Math.pow(starty - endy,2));
	    var dist_from_start = Math.sqrt(Math.pow(startx - mouse.x,2)+Math.pow(starty - mouse.y,2));
	    var dist_from_end = Math.sqrt(Math.pow(endx- mouse.x,2)+Math.pow(endy - mouse.y,2));
	    var closeness = Math.abs(calcdLineLength - dist_from_start- dist_from_end);

        /* old way, like isonline:
	    if(closeness < 0.1){
	    */

	    //find the segment that is closest to the line segment:
	    if(closeness < minCloseness){
	        minCloseness = closeness;
	        lforClosest = l;
	    }
    }

    startx = pairsArray[lforClosest][0][0];
    starty = pairsArray[lforClosest][0][1];
    endx = pairsArray[lforClosest][1][0];
    endy = pairsArray[lforClosest][1][1];

    //If this was called when a mouse is hovered over a line segment, just highlight seg:
    if(preview == true){
        if(l1.constLine == false){
    		c.beginPath();
    		c.moveTo(startx, starty);
    		c.lineTo(endx, endy);
		    c.lineWidth = 2;
    		c.strokeStyle = 'red';
    		c.stroke();
        }
        else{
            c.beginPath();
    		c.moveTo(startx, starty);
    		c.lineTo(endx, endy);
            c.lineWidth = 1;
    		c.strokeStyle = 'red';
    		c.stroke();
        }
    }

    else{
    //If this was called due to a mousedown, actually operate on the lines:
    ////console.log('operate on line.')
    //In the case where the selected segment is in the middle, shorten one end and create a new line on other side.

        var oldl1endx = l1.endx;
        var oldl1endy = l1.endy;

        l1.endx = startx;
        l1.endy = starty;

        //update midpoints to this line here!
        l1.midpointX = (l1.startx + l1.endx)/2;
        l1.midpointY = (l1.starty + l1.endy)/2;
        //Get the associated linear and angular dimensions before they get edited.
    	for(var k = 0; k < linearDimArray.length; k++){
            if(linearDimArray[k].elementID == l1.lineID){
                var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
            }
        }
        for(var k = 0; k < AngularDimArray.length; k++){
            if(AngularDimArray[k].elementID == l1.lineID){
                var undoAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
            }
        }

            var snipforprint = 'Line ' +l1.lineID.toString()+ ' Snipped';
            //console.log(snipforprint)
            //PrintToLog(snipforprint)


        var undoDeleteLine = createNewLineSnip(endx, endy, oldl1endx,oldl1endy, l1.constLine);
        updateUserMoves(['snipline', undoLine, undoLinearDim, undoAngularDim, undoDeleteLine]);
        GenerateInverse();
        removeZeroLengthLines();
        updateLinearDimension(l1.lineID);
        closeOrOpenSection();
    }

    removeZeroLengthLines();
}

/* Saved version of snip, if we need it back during development:
function Snip(elementID,preview){
    //First, find out what lines are intersecting with the target line.
    //(startx, starty, endx, endy, dim, lineID, lineLength, constLine, angle)
    var x = 0;
    var y = 0;

    var intEndpointArray = [];

    //For the target line:
    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];
        if(l.lineID == elementID){
          l1 = l
        }
    }
    //m1 is found:
    var m1 = (l1.endy - l1.starty)/(l1.startx - l1.endx);
    //sometimes, due to rounding error, m1 isn't set to infinity if it is very large.
    if(m1 > 1000000 || m1 < -1000000 || m1 == -Infinity){
        m1 = Infinity;
    }

    //y is zero at top of window
    yFromBottom1 = (canvas.height - l1.starty);
    b1 = yFromBottom1 * Scale - m1 * (l1.startx * Scale);

    //For all the other lines:
    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];
        if(l.lineID != elementID){
            l2 = l
            //m2 is found:
            m2 = (l2.endy - l2.starty)/(l2.startx - l2.endx);
            //sometimes, due to rounding error, m2 isn't set to infinity if it is very large.
            if(m2 > 1000000 || m2 < -1000000 || m2 == -Infinity){
                m2 = Infinity;
            }
            //y is zero at top of window
            yFromBottom2 = (canvas.height - l2.starty);
            b2 = yFromBottom2 * Scale - m2 * (l2.startx * Scale);

            x = (b2 - b1)/(m1-m2);

            //to catch the case where we are dealing with a vertical line, x will be NaN.
            //In that event, the x value is the same everywhere on the vertical line.
            if(m1 == Infinity){
                x = l1.startx*Scale;
            }
            else if(m2 == Infinity){
                x = l2.startx*Scale;
            }

            if(m1 == Infinity){
                y = m2*x + b2
            }
            else if(m2 == Infinity){
                y = m1*x + b1
            }
            else{
                y = m1*x + b1;
            }

            x = x/Scale;
            y = canvas.height - y/Scale;

            //Check to see if x and y are on the target line:
    		var calcdLineLength1 = Math.sqrt(Math.pow(l1.startx-l1.endx,2)+Math.pow(l1.starty - l1.endy,2));
			var dist_from_start1 = Math.sqrt(Math.pow(l1.startx-x,2)+Math.pow(l1.starty - y,2));
			var dist_from_end1 = Math.sqrt(Math.pow(l1.endx- x,2)+Math.pow(l1.endy - y,2));
			var closeness1 = Math.abs(calcdLineLength1 - dist_from_start1- dist_from_end1);

            //Check to see if x and y are on the intersecting line:
    		var calcdLineLength2 = Math.sqrt(Math.pow(l2.startx-l2.endx,2)+Math.pow(l2.starty - l2.endy,2));
			var dist_from_start2 = Math.sqrt(Math.pow(l2.startx-x,2)+Math.pow(l2.starty - y,2));
			var dist_from_end2 = Math.sqrt(Math.pow(l2.endx- x,2)+Math.pow(l2.endy - y,2));
			var closeness2 = Math.abs(calcdLineLength2 - dist_from_start2- dist_from_end2);

            if(closeness1 < .01 && closeness2 < .01){
                //Add endpoints to an array, if they haven't been added already:
                var notARepeat = true;
                for(var k = 0; k < intEndpointArray.length; k++){
                    if((Math.round(x*10000) == Math.round(intEndpointArray[k][0]*10000)) && (Math.round(y*10000) == Math.round(intEndpointArray[k][1]*10000))){
                        notARepeat = false;
                    }
                }
                if(notARepeat == true){
                    intEndpointArray.push([x,y]);
                }
            }
        }

        //These variables track whether endpoints 1 and 2 from the target line are shared.
        var sharedEP1 = false;
        var sharedEP2 = false;

        //If not already in the array, add the endpoints of the target line.
        ep1Array = [l1.startx, l1.starty];
        ep2Array = [l1.endx, l1.endy];
        for(var j = 0; j < intEndpointArray.length; j++){
            //get element of intarray that we want to work with.
            var intep = intEndpointArray[j];

            //create rounded versions of the intArray elements.
            var intep0r = Math.round(intep[0]*10000);
            var intep1r = Math.round(intep[1]*10000);

            //create rounded versions of the target line endpoints.
            var ep10r = Math.round(ep1Array[0]*10000);
            var ep11r = Math.round(ep1Array[1]*10000);
            var ep20r = Math.round(ep2Array[0]*10000);
            var ep21r = Math.round(ep2Array[1]*10000);


            //If the current point that's being looked at from the int array matches the first endpoint:
            if((intep0r == ep10r) && (intep1r == ep11r)){
                sharedEP1 = true;
            }
            //Or if it is the other one:
            if((intep0r == ep20r) && (intep1r == ep21r)){
                sharedEP2 = true;
            }
        }

        //Based on sharedEPs, add none, 1 or 2 endpoints to the list:
        if(sharedEP1 == false){
            intEndpointArray.push([ep1Array[0],ep1Array[1]]);
        }
        if(sharedEP2 == false){
            intEndpointArray.push([ep2Array[0],ep2Array[1]]);
        }
    }

    //Next, do stuff with the intEndpointArray:

    //This array stores the points and distances from the startpoint of the target line.
    var unSortedIntArray = [];
    var sortedIntArray = [];
    var firstElementSortArray = [];
    var firstElementSortArray1 = [];

    //Go through the intEndpointArray and pull out distances from start and save with point coordinates.
    for(var l = 0; l < intEndpointArray.length; l++){
		var dist_from_start = Math.sqrt(Math.pow(intEndpointArray[l][0]-l1.startx,2)+Math.pow(intEndpointArray[l][1] - l1.starty,2));
        unSortedIntArray.push([dist_from_start,intEndpointArray[l][0],intEndpointArray[l][1]])
    }

    //Pull out the first element of each array in unSortedArray and store in an Array:
    for(var l = 0; l < unSortedIntArray.length; l++){
        firstElementSortArray1.push(unSortedIntArray[l][0]);
    }

    //sort the first element array (this sorts by distance from start point):
    firstElementSortArray = firstElementSortArray1.sort(compareNumbers);

    //Go back and assemble the SortedIntArray picking up elements of the unSortedArray based on order of firstElementSortArray:
    for(var l = 0; l < firstElementSortArray.length; l++){
        for(var m = 0; m < unSortedIntArray.length; m++){
            if(unSortedIntArray[m][0] == firstElementSortArray[l]){
                sortedIntArray.push([unSortedIntArray[m][1],unSortedIntArray[m][2]])
            }
        }
    }

    //Now that the array is sorted along the line, try pairs of points with an isonline check:
        var pairsArray = [];

    for(var l = 0; l < sortedIntArray.length - 1; l++){
        var pairsSubArray = [sortedIntArray[l],sortedIntArray[l+1]];
        pairsArray.push(pairsSubArray);
    }

    var minCloseness = 10000;
    var lforClosest = 0;

    //Find the line segment with start and endpoints in pairsArray that the mouse is on:
    for(var l = 0; l < pairsArray.length; l++){

        var startx = pairsArray[l][0][0];
        var starty = pairsArray[l][0][1];
        var endx = pairsArray[l][1][0];
        var endy = pairsArray[l][1][1];

        var calcdLineLength = Math.sqrt(Math.pow(startx-endx,2)+Math.pow(starty - endy,2));
	    var dist_from_start = Math.sqrt(Math.pow(startx - mouse.x,2)+Math.pow(starty - mouse.y,2));
	    var dist_from_end = Math.sqrt(Math.pow(endx- mouse.x,2)+Math.pow(endy - mouse.y,2));
	    var closeness = Math.abs(calcdLineLength - dist_from_start- dist_from_end);

        /* old way, like isonline:
	    if(closeness < 0.1){
	    //

	    //find the segment that is closest to the line segment:
	    if(closeness < minCloseness){
	        minCloseness = closeness;
	        lforClosest = l;
	    }
    }

    startx = pairsArray[lforClosest][0][0];
    starty = pairsArray[lforClosest][0][1];
    endx = pairsArray[lforClosest][1][0];
    endy = pairsArray[lforClosest][1][1];

    //If this was called when a mouse is hovered over a line segment, just highlight seg:
    if(preview == true){
        if(l1.constLine == false){
    		c.beginPath();
    		c.moveTo(startx, starty);
    		c.lineTo(endx, endy);
		    c.lineWidth = 2;
    		c.strokeStyle = 'red';
    		c.stroke();
        }
        else{
            c.beginPath();
    		c.moveTo(startx, starty);
    		c.lineTo(endx, endy);
            c.lineWidth = 1;
    		c.strokeStyle = 'red';
    		c.stroke();
        }
    }

    else{
    //If this was called due to a mousedown, actually operate on the lines:
    ////console.log('operate on line.')
    //In the case where the selected segment is in the middle, shorten one end and create a new line on other side.

    var oldl1endx = l1.endx;
    var oldl1endy = l1.endy;

    l1.endx = startx;
    l1.endy = starty;

    createNewLineSnip(endx, endy, oldl1endx,oldl1endy, l1.constLine);

    updateLinearDimension(l1.lineID);

    }

    removeZeroLengthLines();
    closeOrOpenSection();
}
*/

function Intersection(startx, starty, endx, endy){

    //First, find out what lines are intersecting with the target line.
    var x = 0;
    var y = 0;

    var intersectingLineID = 999;

    var intEndpointArray = [];

    //m1 is found:
    var m1 = (endy - starty)/(startx - endx);
    //sometimes, due to rounding error, m1 isn't set to infinity if it is very large.
    if(m1 > 1000000 || m1 < -1000000 || m1 == -Infinity){
        m1 = Infinity;
    }

    //y is zero at top of window
    yFromBottom1 = (canvas.height - starty);
    var b1 = yFromBottom1 * Scale - m1 * (startx * Scale);

    //For all the other lines:
    for(var i = 0; i < lineArray.length; i++){
        l = lineArray[i];
        l2 = l
        //m2 is found:
        m2 = (l2.endy - l2.starty)/(l2.startx - l2.endx);
        //sometimes, due to rounding error, m2 isn't set to infinity if it is very large.
        if(m2 > 1000000 || m2 < -1000000 || m2 == -Infinity){
            m2 = Infinity;
        }
        //y is zero at top of window
        yFromBottom2 = (canvas.height - l2.starty);
        b2 = yFromBottom2 * Scale - m2 * (l2.startx * Scale);

        x = (b2 - b1)/(m1-m2);

        //to catch the case where we are dealing with a vertical line, x will be NaN.
        //In that event, the x value is the same everywhere on the vertical line.
        if(m1 == Infinity){
            x = l1.startx*Scale;
        }
        else if(m2 == Infinity){
            x = l2.startx*Scale;
        }

        if(m1 == Infinity){
            y = m2*x + b2
        }
        else if(m2 == Infinity){
            y = m1*x + b1
        }
        else{
            y = m1*x + b1;
        }

        x = x/Scale;
        y = canvas.height - y/Scale;

        //Check to see if x and y are on the target line:
		var calcdLineLength1 = Math.sqrt(Math.pow(startx-endx,2)+Math.pow(starty - endy,2));
		var dist_from_start1 = Math.sqrt(Math.pow(startx-x,2)+Math.pow(starty - y,2));
		var dist_from_end1 = Math.sqrt(Math.pow(endx- x,2)+Math.pow(endy - y,2));
		var closeness1 = Math.abs(calcdLineLength1 - dist_from_start1- dist_from_end1);

        //Check to see if x and y are on the intersecting line:
		var calcdLineLength2 = Math.sqrt(Math.pow(l2.startx-l2.endx,2)+Math.pow(l2.starty - l2.endy,2));
		var dist_from_start2 = Math.sqrt(Math.pow(l2.startx-x,2)+Math.pow(l2.starty - y,2));
		var dist_from_end2 = Math.sqrt(Math.pow(l2.endx- x,2)+Math.pow(l2.endy - y,2));
		var closeness2 = Math.abs(calcdLineLength2 - dist_from_start2- dist_from_end2);

        if(closeness1 < .01 && closeness2 < .01){
            intersectingLineID = l2.lineID;
        }
    }
    return intersectingLineID;
}

function arcIntersection(startx, starty, endx, endy){
//this function finds any arcs crossed by the selectionLine.

//for a given line, checks for intersections with arcs.

    var returnFillet = 999;

    //m is found:
    var m = (endy - starty)/(startx - endx);

    if(isNaN(m)){
    //skip it.
    }

    else{
        //sometimes, due to rounding error, m1 isn't set to infinity if it is very large.
        if(m > 1000000 || m < -1000000 || m == -Infinity){
            m = Infinity;
        }

        //y is zero at top of window
        var yFromBottom1 = (canvas.height - starty);
        var b = yFromBottom1 * Scale - m * (startx * Scale);


        //Next, go through all arcs and get x_c, x_y (from bottom, to match line formulation), and r:
        var x_c = 0;
        var y_c = 0;

        var r = 0;

        for(var i = 0; i < arcArray.length; i++){

            var x1 = 0;
            var y1 = 0;
            var x2 = 0;
            var y2 = 0;

            x_c = Scale * (arcArray[i].centroidx);
            y_c = Scale*(canvas.height - arcArray[i].centroidy);
            r = Scale * (arcArray[i].radius);

            var A = (1  + Math.pow(m,2));
            var B = (2*m*b -2*m*y_c - 2*x_c);
            var C = Math.pow(y_c,2) - Math.pow(r,2) + Math.pow(x_c,2) - 2*b*y_c + Math.pow(b,2);

            //In the event that the line is vertical, use a different process to find intersection points:
            if(m == Infinity){
                x1 = startx*Scale;
                x2 = startx*Scale;

                //for all arcs, find intersecting y values for x1 and x2:

                y1 = y_c + Math.pow((Math.pow(r,2) - Math.pow((x1 - x_c),2)),.5);
                y2 = y_c - Math.pow((Math.pow(r,2) - Math.pow((x1 - x_c),2)),.5);

                if(isNaN(y1) == false && isNaN(y2) == false){
                    //drawEndpoint(x1/Scale, canvas.height - y1/Scale);
                    //drawEndpoint(x2/Scale, canvas.height - y2/Scale);
                }
            }
            //For non-vertical lines:
            else if((Math.pow(B,2) - 4*A*C) > 0){
                //Then there are two solutions... that is the only case we care about.
                x1 = (-B + (Math.pow((Math.pow(B,2) - 4*A*C),.5)))/(2*A);
                y1 = m*x1 + b;
                x2 = (-B - (Math.pow((Math.pow(B,2) - 4*A*C),.5)))/(2*A);
                y2 = m*x2 + b;
                //drawEndpoint(x1/Scale, canvas.height - y1/Scale);
                //drawEndpoint(x2/Scale, canvas.height - y2/Scale);
            }

            //Next, find the angles from the centroid of the arc to the possible intersection points:
            if(x1 != 0 && x2 != 0){
                var angle1 = lineAngleFromOrigin(x_c/Scale, canvas.height - y_c/Scale, x1/Scale, canvas.height - y1/Scale);
                var angle2 = lineAngleFromOrigin(x_c/Scale, canvas.height - y_c/Scale, x2/Scale, canvas.height - y2/Scale);
                var angle = lineAngleFromOrigin(x_c/Scale, canvas.height - y_c/Scale, endx, endy);

                if((isNaN(angle1)) && isNaN(angle2) && isNaN(angle)){
                    //do nothing.
                }
                else{
                    angle1 = angle1 - 90;
                    if(angle1 < 0){
                        angle1 = angle1 + 360;
                    }

                    angle2 = angle2 - 90;
                    if(angle2 < 0){
                        angle2 = angle2 + 360;
                    }

                    var radstart = arcArray[i].radstart;
                    var radend = arcArray[i].radend;

                    if(radstart < 0){
                        radstart = radstart + 2*Math.PI;
                    }
                    if(radstart < 0){
                        radstart = radstart + 2*Math.PI;
                    }
                    if(radstart < 0){
                        radstart = radstart + 2*Math.PI;
                    }

                    if(radend < 0){
                        radend = radend + 2*Math.PI;
                    }
                    if(radend < 0){
                        radend = radend + 2*Math.PI;
                    }
                    if(radend < 0){
                        radend = radend + 2*Math.PI;
                    }

                    var startAngle = (radstart)*(180/Math.PI);
                    var endAngle = (radend)*(180/Math.PI);

                    var xa1 = x1/Scale;
                    var ya1 = canvas.height - y1/Scale;

                    var xa2 = x2/Scale;
                    var ya2 = canvas.height - y2/Scale;

                    if(endAngle == 0 || endAngle < startAngle){
                        if(isbetween(angle1,startAngle,360,true) || isbetween(angle1, 0, endAngle,true)){
                            if(isbetween(xa1,startx,endx,true) && isbetween(ya1,starty,endy,true)){
                                returnFillet = arcArray[i].arcID;
                            }
                        }
                        if(isbetween(angle2,startAngle,360,true) || isbetween(angle2, 0, endAngle,true)){
                            if(isbetween(xa2,startx,endx,true) && isbetween(ya2,starty,endy,true)){
                                returnFillet =  arcArray[i].arcID;
                            }
                        }
                    }

                    else{
                        if(isbetween(angle1,startAngle,endAngle,true) == true){
                            if(isbetween(xa1,startx,endx,true) && isbetween(ya1,starty,endy,true)){
                                returnFillet =  arcArray[i].arcID;
                            }
                        }
                        if(isbetween(angle2,startAngle,endAngle,true) == true){
                            if(isbetween(xa2,startx,endx,true) && isbetween(ya2,starty,endy,true)){
                                returnFillet =  arcArray[i].arcID;
                            }
                        }
                    }
                }
            }
        }
    }


    return returnFillet;

}

function ChamferPreview(nodex, nodey, chamferDim){
	//first step is to temporarily draw a fillet when a corner is hovered over. Worry about making a re-drawing fillet object next.
	Chamferlines = linesCommonToNode(nodex, nodey);

	var lineID1 = Chamferlines[0];
	var line1startx = Chamferlines[1];
	var line1starty = Chamferlines[2];
	var line1endx = Chamferlines[3];
	var line1endy = Chamferlines[4];
	var line1side = Chamferlines[5];
	var lineID2 = Chamferlines[6];
	var line2startx = Chamferlines[7];
	var line2starty = Chamferlines[8];
	var line2endx = Chamferlines[9];
	var line2endy = Chamferlines[10];
	var line2side = Chamferlines[11];
	var line1dir = 'none';
	var line2dir = 'none';
	var line1length = Chamferlines[12];
	var line2length = Chamferlines[13];
	var retVar = 0;
	var rt = [];
	var caseNumber = 0;
	var groupID = 0;

	var x = 0;
	var y = 0;

	var topleftx = 0;
	var toplefty = 0;

	//s is the number of pixels to count away from the specified location.
	var s = 1;

	//from the data stored in Chamferlines, determine which ends of the lines to shorten and in what direction:

	//first, need to determine if they are horizontal, vertical, or something else. Starting with line 1 only.

	if(line1length < line2length){
		var shorterlinelength = line1length;
	}
	else{
		var shorterlinelength = line2length;
	}

	if(shorterlinelength < chamferDim){
		chamferDim = shorterlinelength;
	}

	if(line1startx == line1endx){
		//line 1 is vertical
		if(line1starty > line1endy){
			//the line points up from the node
			line1dir = 'up';
		}
		else{
			//the line points down from the node.
			line1dir = 'down';
		}

	}
	else if (line1starty == line1endy){
		//line 1 is horizontal
		if(line1startx > line1endx){
			//the line points left from the node
			line1dir = 'left';
		}
		else{
			//the line points right from the node.
			line1dir = 'right';
		}
	}
	else{
		//line 1 is neither vertical nor horizontal.
	}

	//same thing, but for line 2:

if(line2startx == line2endx){
		//line 1 is vertical
		if(line2starty > line2endy){
			//the line points up from the node
			line2dir = 'up';
		}
		else{
			//the line points down from the node.
			line2dir = 'down';
		}

	}
	else if (line2starty == line2endy){
		//line 1 is horizontal
		if(line2startx > line2endx){
			//the line points left from the node
			line2dir = 'left';
		}
		else{
			//the line points right from the node.
			line2dir = 'right';
		}
	}
	else{
		//line 2 is neither vertical nor horizontal.
	}

		var startChamferx = 0;
		var startChamfery = 0;
		var endChamferx = 0;
		var endChamfery = 0;


	if(line1dir == 'up' && line2dir == 'right'){

	caseNumber = 1;

		startChamferx = line1startx;
		startChamfery = line1starty - chamferDim;
		endChamferx = line2startx + chamferDim;
		endChamfery = line2starty;

		topleftx = startChamferx;
		toplefty = startChamfery;

		x = line1startx + s;
		y = line1starty - s;

		c.beginPath();
		c.moveTo(startChamferx, startChamfery);
		c.lineTo(endChamferx, endChamfery);
		c.stroke();
	}

	else if(line2dir == 'up' && line1dir == 'right'){

	caseNumber = 2;

		startChamferx = line1startx;
		startChamfery = line1starty - chamferDim;
		endChamferx = line2startx + chamferDim;
		endChamfery = line2starty;

		topleftx = startChamferx;
		toplefty = startChamfery;

		x = line1startx + s;
		y = line1starty - s;

		c.beginPath();
		c.moveTo(startChamferx, startChamfery);
		c.lineTo(endChamferx, endChamfery);
		c.stroke();
	}

	else if(line2dir == 'right' && line1dir == 'down'){

	caseNumber = 3;

		startChamferx = line1startx + chamferDim;
		startChamfery = line1starty;
		endChamferx = line2startx;
		endChamfery = line2starty + chamferDim;

		topleftx = startChamferx - chamferDim;
		toplefty = startChamfery;

		x = line1startx + s;
		y = line1starty + s;

		c.beginPath();
		c.moveTo(startChamferx, startChamfery);
		c.lineTo(endChamferx, endChamfery);
		c.stroke();
	}
	else if(line1dir == 'right' && line2dir == 'down'){

	caseNumber = 4;

		startChamferx = line1startx + chamferDim;
		startChamfery = line1starty;
		endChamferx = line2startx;
		endChamfery = line2starty + chamferDim;

		topleftx = startChamferx - chamferDim;
		toplefty = startChamfery;

		x = line1startx + s;
		y = line1starty + s;

		c.beginPath();
		c.moveTo(startChamferx, startChamfery);
		c.lineTo(endChamferx, endChamfery);
		c.stroke();
	}

	else if(line2dir == 'down' && line1dir == 'left'){

	caseNumber = 5;

		startChamferx = line1startx - chamferDim;
		startChamfery = line1starty;
		endChamferx = line2startx;
		endChamfery = line2starty + chamferDim;

		topleftx = startChamferx;
		toplefty = startChamfery;

		x = line1startx - s;
		y = line1starty + s;

		c.beginPath();
		c.moveTo(startChamferx, startChamfery);
		c.lineTo(endChamferx, endChamfery);
		c.stroke();
	}
	else if(line1dir == 'down' && line2dir == 'left'){

	caseNumber = 6;

		startChamferx = line1startx - chamferDim;
		startChamfery = line1starty;
		endChamferx = line2startx;
		endChamfery = line2starty + chamferDim;

		topleftx = startChamferx;
		toplefty = startChamfery;

		x = line1startx - s;
		y = line1starty + s;

		c.beginPath();
		c.moveTo(startChamferx, startChamfery);
		c.lineTo(endChamferx, endChamfery);
		c.stroke();
	}

	else if(line2dir == 'left' && line1dir == 'up'){

	caseNumber = 7;

		startChamferx = line1startx - chamferDim;
		startChamfery = line1starty;
		endChamferx = line2startx;
		endChamfery = line2starty - chamferDim;

		topleftx = startChamferx;
		toplefty = startChamfery - chamferDim;

		x = line1startx - s;
		y = line1starty - s;

		c.beginPath();
		c.moveTo(startChamferx, startChamfery);
		c.lineTo(endChamferx, endChamfery);
		c.stroke();
	}
	else if(line1dir == 'left' && line2dir == 'up'){

	caseNumber = 8;

		startChamferx = line1startx - chamferDim;
		startChamfery = line1starty;
		endChamferx = line2startx;
		endChamfery = line2starty - chamferDim;

		topleftx = startChamferx;
		toplefty = startChamfery - chamferDim;

		x = line1startx - s;
		y = line1starty - s;

		c.beginPath();
		c.moveTo(startChamferx, startChamfery);
		c.lineTo(endChamferx, endChamfery);
		c.stroke();
	}


	//determine if inside or outside chamfer:
		var index = (Math.round(y) * canvas.width + Math.round(x));
	if(rasterArray[index] == undefined){
		retVar = 'out';
	}
	else if(rasterArray[index] == 'background'){
		retVar = 'out';
	}
	else if(rasterArray[index] == 'inside' || (rasterArray[index]).slice(0,5) == "group"){
		retVar = 'in';
		groupID = rasterArray[index];
	}
	else if(rasterArray[index] == 'chamferCutout'){
		retVar = 'out';
	}

	//If the chamfer is outside, need to check at another location for groupID this is that check:

	if(retVar == 'out'){
		switch(caseNumber){
			case 1:
				x = line1startx - s;
				y = line1starty + s;
			break;
			case 2:
				x = line1startx - s;
				y = line1starty + s;
			break;
			case 3:
				x = line1startx - s;
				y = line1starty - s;
			break;
			case 4:
				x = line1startx - s;
				y = line1starty - s;
			break;
			case 5:
				x = line1startx + s;
				y = line1starty - s;
			break;
			case 6:
				x = line1startx + s;
				y = line1starty - s;
			break;
			case 7:
				x = line1startx + s;
				y = line1starty + s;
			break;
			case 8:
				x = line1startx + s;
				y = line1starty + s;
			break;
		}
		index = (Math.round(y) * canvas.width + Math.round(x));
		groupID = rasterArray[index];
	}

	//For diagnostics:
	//TempDispPointX = x;
	//TempDispPointY = y;

	rt = [startChamferx, startChamfery, endChamferx, endChamfery, chamferDim, lineID1, line1side, line1dir, lineID2, line2side, line2dir,chamferDim,retVar,topleftx, toplefty,chamferDim,caseNumber,groupID];

	return rt;

}

function saveUndoLines(larray,darray, LoadNew){
	//if only lines exist (no fillets or chamfers), make a copy of that state to return to.
	if(LoadNew == true){
		undoLineArray = JSON.stringify(larray);
		undolinearDimArray = JSON.stringify(darray);
	}

	else if(arcArray.length == 0 && chamferArray.length == 0){
		undoLineArray = JSON.stringify(larray);
		undolinearDimArray = JSON.stringify(darray);
	}

}
function bendingStress(x,y,Area,Fx,Fy,Fz,Mx,My,Mz,mode){
    ////console.log(MasterLoadPosX, MasterLoadPosY);
	var TrafoMx = Mx + MasterLoadPosY * Fz;
	var TrafoMy = My - MasterLoadPosX * Fz;

	if(Stability == 'stabilized'){
		var BSmx = (TrafoMx * (MasterCy - (y * Scale))) / MasterIxx;
		var BSmy = (TrafoMy * (MasterCx - (x * Scale))) / MasterIyy;
		var BSFz = Fz / MasterArea;
	}

	else if(Stability == 'nonstabilized'){
		//the moments are applied to the principal axes:

		// !!!!!!!!!!!!!!Verify this math!!!!!!!!!!!!
		//var prinMx = Mx * Math.cos(MasterAlpha) + My * Math.sin(MasterAlpha);
		//var prinMy = - Mx * Math.sin(MasterAlpha) + My * Math.cos(MasterAlpha);

		//var yprime = Math.cos(MasterAlpha)*((MasterCy - y * Scale) - (x * Scale - MasterCx)*Math.tan(MasterAlpha));

		//var xprime = Math.cos(MasterAlpha)*((x * Scale - MasterCx) + (MasterCy - y * Scale)*Math.tan(MasterAlpha));

		//var BSmx = (prinMx * (yprime)) / MasterIxp;
		//var BSmy = (prinMy * (xprime)) / MasterIyp;

		//approach per pg. 325 of Philpot, still needs some validation. Looks good so far:

		MIxy = -MasterIxy;

		outy = (MasterCy - y * Scale);
		outx = -(x * Scale - MasterCx);

		BSmy = (((MasterIxx*outx)- (outy*MIxy))/(MasterIyy*MasterIxx - Math.pow(MIxy,2)))*TrafoMy;

		BSmx = (((-MasterIyy*outy)+(MIxy*outx))/(MasterIyy*MasterIxx - Math.pow(MIxy,2)))* -TrafoMx;

	var BSFz = Fz / Area;

	}

	if(mode == 'diagnostic'){
		////console.log(prinMx, prinMy, yprime, xprime, BSmx, BSmy,BSFz);
	}

	return BS = BSmx + BSmy + BSFz;

}

function mouseoverstress(x,y){

	var lA = [];
	var StresstoReturn = 0;
	lA = GetLoadsInput();
	StresstoReturn = bendingStress(x,y,MasterArea,lA[0],lA[1],lA[2],lA[3],lA[4],lA[5]);

}

function stressGradient(Fx, Fy, Fz, Mx, My, Mz, MaxtBS, MaxcBS){
	var maxT = 0;
	var maxC = 0;
	var maxCx = 0;
	var maxCy = 0
	var maxTx = 0;
	var maxTy = 0;
	var firstBS = 0;
	var alpha = 0;

	for (var y = 0; y < canvas.height; ++y) {
		for (var x = 0; x < canvas.width; ++x) {
			var index = (y * canvas.width + x);
			if(rasterArray[index] != undefined){
				if(rasterArray[index] == 'inside'){
					var BS = bendingStress(x,y,MasterArea,Fx,Fy,Fz,Mx,My,Mz);
					if(Math.abs(MaxtBS) > Math.abs(MaxcBS)){
						MaxBS = MaxtBS;
					}
					else{
						MaxBS = MaxcBS;
					}

					alpha  = Math.abs(Math.round(255 * (1 - (Math.abs(MaxBS - BS) / Math.abs(MaxBS)))));
					if(BS > 0){
						colorit('StressGradientred', x, y, alpha,'null');
					}
					else if(BS <= 0){
						colorit('StressGradientblue', x, y, alpha, 'null');
					}
				}
			}
		}
	}

	Redraw();
}


function displayMaxStresses(maxT, maxTx, maxTy, maxC, maxCx, maxCy){

	var maxT = maxT.toFixed(0);
	var maxC = maxC.toFixed(0);

	//If the max stresses occur at the same location as before, then keep their locations.

	//If they move, then relocate at +15, -15.
	var mT = labelArray[0];
	var mC = labelArray[1];

	if(labelArray.length > 0){
	var oldTx = mT.leaderx;
	var oldTy = mT.leadery;
	var oldCx = mC.leaderx;
	var oldCy = mC.leadery;

	var oldTLx = mT.xloc;
	var oldTLy = mT.yloc;
	var oldCLx = mC.xloc;
	var oldCLy = mC.yloc;
	}

	else{
	var oldTx = 0;
	var oldTy = 0;
	var oldCx = 0;
	var oldCy = 0;
	}

	if((oldTx == maxTx) && (oldTy == maxTy)){
		labelArray[0] = (new Label(maxT, oldTLx, oldTLy, 101, maxTx, maxTy,"max",0));
	}
	else{
		labelArray[0] = (new Label(maxT, maxTx + 15, maxTy -15,101, maxTx, maxTy,"max",0));
	}

	if((oldCx == maxCx) && (oldCy == maxCy)){
		labelArray[1] = (new Label(maxC, oldCLx, oldCLy,102, maxCx, maxCy, "max",0));
	}
	else{
		labelArray[1] = (new Label(maxC, maxCx + 15, maxCy -15,102, maxCx, maxCy, "max",0));
	}

	lA = GetLoadsInput();

	bendingStress(maxCx,maxCy,MasterArea,lA[0],lA[1],lA[2],lA[3],lA[4],lA[5],"diagnostic");

}

function labelSRPs(){
	var x = 0;
	var y = 0;
	var stress = 0;
	var s = 'null';
	fA = GetLoadsInput();

	//If the SRP is new or has been moved, add a label at 1515.
	//If not, leave the label where it was.

	//You know it is new if the s.SRPid doesn't match any already in the SRPArray.
	//You know it has moved if x or y have changed.

	////console.log('------------------');

	for(var i = 0; i < SRPArray.length; i++){
		var s = SRPArray[i];
		var x = s.x;
		var y = s.y;
		var ltoacton = 'null';
		stress = bendingStress(x,y,MasterArea,fA[0],fA[1],fA[2],fA[3],fA[4],fA[5]); //Make toFixed argument adjustable.
		stress = stress.toFixed(2);
		var repeat = false;
		var locationrepeat = false;

		////console.log(labelArray.length);
		//Go through the label array and check if this is an old label:
		for(var j = 0; j < labelArray.length; j++){
			var l = labelArray[j];
			////console.log(x, l.leaderx, y, l.leadery, s.SRPid, l.labelID);
			//if it is an existing label that has not been moved, update stress.
			if((s.SRPid == l.labelID) && ((x == l.leaderx) && (y == l.leadery))){
				repeat = true;
				locationrepeat = true;
				ltoacton = l;
			}
			//if it is an existing label that has been moved, update label location:
			else if(s.SRPid == l.labelID){
				repeat = true;
				ltoacton = l;
			}

		}
		//Based on previous list search, do the appropriate action:

			if((repeat == true) && (locationrepeat == true)){
				ltoacton.value = stress;
				////console.log(l.value);
				////console.log('not been moved, but updated');
			}
			else if((repeat == true) && (locationrepeat == false)){
				ltoacton.value = stress;
				ltoacton.xloc = x + 15;
				ltoacton.yloc = y - 15;
				//Something is preventing update of leader location. Fix this.
				ltoacton.leaderx = x;
				ltoacton.leadery = y;
				////console.log(l.value);
				////console.log('moved label');
				//l.drawlabel(l.value, l.xloc, l.yloc, 'black');
				////console.log('case 2: ');
				////console.log(stress);
			}

	}
}

function displayProperties(){

	var str = 'Centroid, X: '
	actualCxStr = String(CxToReport.toExponential(5));
	var Cxstr = str.concat(actualCxStr);

	str = 'Centroid, Y: '
	actualCyStr = String(CyToReport.toExponential(5));
	var Cystr = str.concat(actualCyStr);

	str = 'Area (ft^2): '
	MasterAreaStr = String(MasterArea.toFixed(2));
	var Areastr = str.concat(MasterAreaStr);

	str = 'IX: '
	MasterIxxStr = String(MasterIxx.toExponential(5));
	var Ixxstr = str.concat(MasterIxxStr);

	str = 'IY: '
	MasterIyyStr = String(MasterIyy.toExponential(5));
	var Iyystr = str.concat(MasterIyyStr);

	str = 'Theta: '
	MasterAlphaStr = MasterAlpha * (180 / Math.PI);
	MasterAlphaStr = String(MasterAlphaStr.toFixed(2));
	var Thetastr = str.concat(MasterAlphaStr);

	str = 'Ip1: '
	MasterIxpStr = String(MasterIxp.toExponential(5));
	Ixpstr = str.concat(MasterIxpStr);

	str = 'Ip2: '
	MasterIypStr = String(MasterIyp.toExponential(5));
	Iypstr = str.concat(MasterIypStr);


    var d = new Date();
    dateTime = d.toUTCString();
    dateTime = dateTime.slice(5);

//    var InfoString = CurrentFileName + ' |' + dateTime + '\n|' + Areastr +' |' + Cxstr +' |' + Cystr +'\n|' + Ixxstr +' |' + Iyystr +' |' + Thetastr +' |' + Ixpstr +' |' + Iypstr;
    var InfoString = 'Results:\n' + Areastr + ' ' + Units+'²'
	//document.getElementById("outputBox").value = InfoString; //OutputStrings;
	//var textarea = document.getElementById("outputBox");
	//textarea.scrollTop = textarea.scrollHeight;

    //showZeroZero = true;

	Redraw();

    document.getElementById("loader").style.visibility = "hidden";

    var ResultsString = 'Area: \n' + MasterAreaStr  + ' ' + Units+'²' //+ '\nCX:     ' + actualCxStr + '\nCY:     ' + actualCyStr + '\nIX:     ' + MasterIxxStr + '\nIY:     ' + MasterIyyStr + '\nTheta:  ' + MasterAlphaStr + '\nIp1:    ' + MasterIxpStr + '\nIp2:    ' + MasterIypStr;

    writetoResultsBox(ResultsString);

    //If results are written, this is considered to be a completed analysis.
    UseCredit();

    //show the results box:
    document.getElementById("results").style.visibility = "visible";
    document.getElementById("resultsgrab").style.visibility = "visible";
    document.getElementById("outputpopuptext").style.visibility = "visible";
    document.getElementById("resultsheader").style.visibility = "visible";
    document.getElementById("resultskeepout").style.visibility = "visible";
    var resultstoprint = 'Results Box Shown. Area: ' + MasterAreaStr  + ' ' + Units;
    PrintToLog(resultstoprint)
    Redraw();

}

//A container function for things to do after the data comes back from the server.
function doAfterReturnedData(){

    if(Stability == 'nonstabilized'){
    /*
    var nonstabmomentsArray = calcPrincipals(shapesArray);
    MasterIxp = nonstabmomentsArray[0];
    MasterIyp = nonstabmomentsArray[1];
    var momentsArray = calcMoments(shapesArray);
    MasterIxx = momentsArray[0];
    MasterIyy = momentsArray[1];
    */
        alert('Not Ready For This Yet');
    }
    //If a load point has not been defined, define it at the centroid.
    if(loadArray.length == 0){
        loadArray.push(new Load(dispCx, dispCy));
    }

	fA = GetLoadsInput();

    ////console.log(MasterLoadPosX,MasterLoadPosY);
	////console.log(fA[0], fA[1], fA[2], fA[3], fA[4], fA[5]);

    maxStressArray = stressAroundBound(lineArray,arcArray, fA[0], fA[1], fA[2], fA[3], fA[4], fA[5]);


	var MaxtStress = maxStressArray[0];
	var MaxcStress = maxStressArray[1];
	var maxTx = maxStressArray[2];
	var maxTy = maxStressArray[3];
	var maxCx = maxStressArray[4];
	var maxCy = maxStressArray[5];

	displayMaxStresses(MaxtStress, maxTx, maxTy, MaxcStress, maxCx, maxCy)

    if(fA[0] != 0 ||fA[1] != 0 || fA[2] != 0 || fA[3] != 0 || fA[4] != 0 || fA[5] != 0){
            stressGradient(fA[0], fA[1], fA[2], fA[3], fA[4], fA[5], MaxtStress , MaxcStress);
    }

    else{
            loadArray = [];
    }

    displayProperties();

    if(Stability == 'stabilized'){
        MasterAlpha = 0;
        //Ixx and Iyy are already assigned at this point.
    }

    //var stressArray = stressAroundBound(geoArray,fA,MasterArea);
    //MaxtStress = stressArray[0];
    //MaxcStress = stressArray[1];
    //stressGradient(fA[0], fA[1], fA[2], fA[3], fA[4], fA[5], MaxtStress ,MaxcStress);

    /*
    MasterQ = calcQ(geoArray, shapesArray);
    Mastert = findThinnestSection(geoArray);
    var shearStressArray = calcShearStress(fA[0], fA[1], fA[2], MasterQ, MasterIxx, Mastert);
    Masterq = shearStressArray[0];
    MaxShearStress = shearStressArray[1];
    MaxtStress = stressArray[0];
    MaxcStress = stressArray[1];
    stressGradient(fA[0], fA[1], fA[2], fA[3], fA[4], fA[5], MaxtStress ,MaxcStress);
    saveUndoLines(lineArray, linearDimArray);
    //hide the last dimension:
    d = linearDimArray[linearDimArray.length - 1];
    d.showDim = false;
    var coordsArray = centroidCoords();
    actualCx = coordsArray[0];
    actualCy = coordsArray[1];


    labelSRPs();


    displayProperties();

    Redraw();
    drawingMode = 'loads';
    */
    //Redraw();
}

function packupGeo(){
//inputs:

//Rectangles: centroid x, centroid y, base, height
//fillets: centroid x, centroid y, radius, add or subtract
//chamfers: centroid x, centroid y, side length, add or subtract

//Each of these elements can be represented with five variables:
//0: type - r for rectangle, f for fillet, c for chamfer.
//1: centroid x
//2: centroid y
//3: base (rectangles), radius (fillets), or side length (chamfer)
//4: height (rectangles), add or subtract (fillets or chamfers)

//information describing the outline of the shape (used in max stress calc):
//0: type - l for line
//1: startx for line
//2: starty for line
//3: endx for line
//4: endy for line


//Go through rectangles array, calculate centroids and store in geoArray:

	for(var i = 0; i < rectArray.length; i++){
		r = rectArray[i];
		geoArray.push('r');
		geoArray.push(r.cx * Scale);
		geoArray.push(r.cy * Scale);
		geoArray.push(r.b * Scale);
		geoArray.push(r.w * Scale);
	}

//Go through fillets array, calculate centroids and store in geoArrya:

	for(var i = 0; i < arcArray.length; i++){
		var cx = 0;
		var cy = 0;
		var highestpoint = 0;
		var type = 0;

		f = arcArray[i];
		geoArray.push('f');

		if(f.Case == 0){
			cx = f.centroidx + (.7766)*f.radius;
			cy = f.centroidy + (.7766)*f.radius;
			type = 1; //pointy side up.
			highestpoint = f.centroidy;

		}
		if(f.Case == 1){
			cx = f.centroidx - (.7766)*f.radius;
			cy = f.centroidy + (.7766)*f.radius;
			type = 1; //pointy side up.
			highestpoint = f.centroidy;

		}
		if(f.Case == 2){
			cx = f.centroidx - (.7766)*f.radius;
			cy = f.centroidy - (.7766)*f.radius;
			type = 2; //pointy side down.
			highestpoint = f.centroidy -  f.radius;

		}
		if(f.Case == 3){
			cx = f.centroidx + (.7766)*f.radius;
			cy = f.centroidy - (.7766)*f.radius;
			type = 2; //pointy side down.
			highestpoint = f.centroidy - f.radius;

		}
		//also store: highest point and type (1 or 2)

		geoArray.push(cx * Scale);
		geoArray.push(cy * Scale);
		geoArray.push(f.radius * Scale);
		geoArray.push(f.side);
		geoArray.push(type);
		geoArray.push(highestpoint * Scale);
	}

//Go through chamfer array, calculate centroids and store in geoArrya:

	for(var i = 0; i < chamferArray.length; i++){
		r = chamferArray[i];
		geoArray.push('c');

		var cx = 0;
		var cy = 0;
		var highestpoint = 0;
		var type = 0;

		if(r.caseNumber == 1 || r.caseNumber == 2){
			cx = r.topleftx + Math.abs(r.startx - r.endx)/3;
			cy = r.toplefty + 2*Math.abs(r.startx - r.endx)/3;
			type = 1; //pointy end up.
			highestpoint = r.toplefty;
		}

		if(r.caseNumber == 3 || r.caseNumber == 4){
			cx = r.topleftx + Math.abs(r.startx - r.endx)/3;
			cy = r.toplefty + Math.abs(r.startx - r.endx)/3;
			type = 2; //pointy end down.
			highestpoint = r.toplefty;
		}

		if(r.caseNumber == 5 || r.caseNumber == 6){
			cx = r.topleftx + 2*Math.abs(r.startx - r.endx)/3;
			cy = r.toplefty + Math.abs(r.startx - r.endx)/3;
			type = 2; //pointy end down.
			highestpoint = r.toplefty;
		}

		if(r.caseNumber == 7 || r.caseNumber == 8){
			cx = r.topleftx + 2*Math.abs(r.startx - r.endx)/3;
			cy = r.toplefty + 2*Math.abs(r.startx - r.endx)/3;
			type = 1; //pointy end up.
			highestpoint = r.toplefty;
		}
		geoArray.push(cx * Scale);
		geoArray.push(cy * Scale);
		geoArray.push(Math.abs(r.startx - r.endx) * Scale);
		geoArray.push(r.inOrOut);
		geoArray.push(type);
		geoArray.push(highestpoint * Scale);

		}

//Next section contains information about lines. Starts with a signifier 'l':
	for(var i = 0; i < lineArray.length; i++){
		l = lineArray[i];
		if(l.constLine != true){
			geoArray.push('l');
			geoArray.push(l.startx, l.starty, l.endx, l.endy);
		}
	}
//next section contains information about arcs. Starts with signifier 'a':
	for(var i = 0; i < arcArray.length; i++){
		geoArray.push('a');
		a = arcArray[i];
		geoArray.push(a.centroidx, a.centroidy, a.radius, a.Case);
	}

//next section contains information about chmfers. Starts with signifier 'h':
	for(var i = 0; i < chamferArray.length; i++){
		geoArray.push('h');
		h = chamferArray[i];
		geoArray.push(h.startx, h.starty, h.endx, h.endy);
	}


}

//resets everything required to display stresses.
function clearStressCalcs(){

	//first, clear the shapes array. When the function is called again to fill it, it adds to an empty array and doesn't break.
	shapesArray = [];

	//next, clear the geoArray.
	geoArray = [];

	//clear the label array so multiple lables aren't displayed:
	//labelArray = [];

	//reset all pixels previously shaded back to inside color:
	for(var tx = 0; tx < canvas.width; tx++){
		for(var ty = 0; ty < canvas.height; ty++){
			var index = (ty * canvas.width + tx) * 4;
			if(rasterArray[index / 4] == 'StressGradientred' || rasterArray[index / 4] == 'StressGradientblue'){
				colorit('inside', tx, ty);
			}
		}
	}

	//clear the master properties:

	//Going to try not erasing the master Cx and Cy so that the snap works with LP.

	MasterIxx = 0;
	MasterIyy = 0;
	//MasterCx = 0;
	//MasterCy = 0;

	centroidArray = [];

}

function clearResults(){
    rectArray = [];
    document.getElementById("results").style.visibility = "hidden";
    document.getElementById("resultsgrab").style.visibility = "hidden";
    document.getElementById("outputpopuptext").style.visibility = "hidden";
    document.getElementById("resultsheader").style.visibility = "hidden";
    document.getElementById("resultskeepout").style.visibility = "hidden";
}

function clearInput(){
    rectArray = [];
    linesArray = [];
    arcsArray = [];
    dimArray = [];
    linearDimArray = [];
    AngularDimArray = [];
    labelArray = [];
    loadArray = [];
    SRPArray = [];
}


function writeWelcomeToOutputbox(Stringtowrite,shortStringtowrite){
/*
	if(document.getElementById("menubar").clientWidth < 580){
    	document.getElementById("outputBox").value = shortStringtowrite; //OutputStrings;
    	var textarea = document.getElementById("outputBox");
    	textarea.scrollTop = textarea.scrollHeight;
	}
	else{
    	document.getElementById("outputBox").value = Stringtowrite; //OutputStrings;
    	var textarea = document.getElementById("outputBox");
    	textarea.scrollTop = textarea.scrollHeight;
	}
	*/
}

function writedebugToOutputbox(Stringtowrite){
	OutputStrings = OutputStrings + ", " + Stringtowrite;
	document.getElementById("outputBox").value = OutputStrings; //OutputStrings;
	var textarea = document.getElementById("outputBox");
	textarea.scrollTop = textarea.scrollHeight;
}

//s...
function writetoResultsBox(Stringtowrite){
	document.getElementById("outputpopuptext").value = Stringtowrite; //OutputStrings;
	//document.getElementById("outputpopuptext").readOnly = true;
}

function firstdimokClicked(){

    var D = document.getElementById("firstinput").value;
	if(isNaN(D) || D <= 0){
        PrintToLog('First Dim Ok Pressed')
		displayError('badlineardim_first',"Dimension must be a number greater than 0.");
	}

	else{
        document.getElementById("inputBox").value = document.getElementById("firstinput").value;
        var firstvaluetoprint = 'First Dimension Value: ' + document.getElementById("firstinput").value.toString();
        PrintToLog(firstvaluetoprint);
        enterPressed_2();
        hideFirstDimAlert();
        Units = document.getElementById("unitsselection_a").value;

        var firstunitstoprint = 'Units Selected in first dim box: ' + Units
        PrintToLog(firstunitstoprint)
        PrintToLog('First Dim Ok Pressed')
        var btn = document.getElementById("units");
        btn.innerHTML = 'Units: ' + Units;


	}
}

function firstdimcancelClicked(){

    if(lineArray.length >0){
        var drawnLineID = lineArray[0].lineID;
        deleteline(drawnLineID);
        //delete the first line.
    }
    hideFirstDimAlert();
    Redraw();
}

function enterPressed(){
    ////console.log('enterPressed called.')

    if(drawingMode == 'fillets'){
        return 0;
    }
    if(document.getElementById("firstinput").style.visibility == 'visible'){
        firstdimokClicked();
        return 0;
    }

    var aCT = activeChangeTag();

    if(welcomeDisplayed == true){
        welcomecancelClicked();
        return 0;
    }

	//This botton accepts dimension data from input box.
	var dimension = GetInput();
    resetChangeTag();

    if(document.getElementById("clearalert").style.visibility == 'visible'){
        ////console.log('ca');
        clearokClicked();
        return 0;
    }

    if(document.getElementById("prealert").style.visibility == 'visible'){
        ////console.log('pa');
            preokClicked();
        return 0;
    }

    if(document.getElementById("erroralert").style.visibility == 'visible'){
        ////console.log('er');
        errorcancelClicked();
        return 0;
    }


    if((drawingMode != 'snip') && (drawingMode != 'erase')){

    	//the dimension box only accepts positive numbers (0 not included).

        //only do this if a dimension is highlighted for change:
    	if((isNaN(dimension)) && (LastSelectedDimType == "linear") && (aCT==true)){
    		displayError('badlineardim',"Invalid dimension.");
    		//document.getElementById("inputBox").value = "";
            //ChangePreviewValue = null;
            //Redraw();
    	}

    	if((isNaN(dimension) || dimension < 0 || dimension > 360) && (LastSelectedDimType == "relangular")){
    		displayError('badangulardim',"Angle must be between 0 - 360");
    		document.getElementById("inputBox").value = "";
            ChangePreviewValue = null;
    	}

    	else if(lineArray.length == 0){
    		//displayError('noline',"Draw line before dimensioning.");
    	}
    	else if(firstAcceptedValue == true){
            l = linearDimArray[0];
            l.selectForChange = false;
    		setScale(dimension);
    		firstAcceptedValue = false;
    		document.getElementById("inputBox").value = "";
    		ChangePreviewValue = null;
    	}

    	else{
    		//change active dimension:
    		if(LastSelectedDimType == "relangular"){
    		    changeLineAngle(dimension, LastSelectedDimID);
    		}

    		else if(LastSelectedDimType == 'fillet'){
    		    changeFilletRadius(dimension, LastSelectedDimID);
    		}
    		else if(LastSelectedDimType == 'linear'){
    		    changeLineLength(dimension, LastSelectedDimID, LastSelectedDimType);
    		}
    		closeOrOpenSection();
    	}
    }
}

function enterPressed_2(){

    var aCT = activeChangeTag();

    if(welcomeDisplayed == true){
        welcomecancelClicked();
        return 0;
    }

	//This botton accepts dimension data from input box.
	var dimension = GetInput();
    resetChangeTag();

    if(document.getElementById("clearalert").style.visibility == 'visible'){
        ////console.log('ca');
        clearokClicked();
        return 0;
    }

    if(document.getElementById("prealert").style.visibility == 'visible'){
        ////console.log('pa');
            preokClicked();
        return 0;
    }

    if(document.getElementById("erroralert").style.visibility == 'visible'){
        ////console.log('er');
        errorcancelClicked();
        return 0;
    }


    if((drawingMode != 'snip') && (drawingMode != 'erase')){

    	//the dimension box only accepts positive numbers (0 not included).

        //only do this if a dimension is highlighted for change:
    	if((isNaN(dimension) || dimension <= 0) && (LastSelectedDimType == "linear") && (aCT==true)){
    		displayError('badlineardim',"Use number keys to enter desired dimension.");
    		document.getElementById("inputBox").value = "";
            ChangePreviewValue = null;
            Redraw();
    	}

    	else if((isNaN(dimension) || dimension < 0 || dimension > 360) && (LastSelectedDimType == "relangular")){
    		displayError('badangulardim',"Angle must be between 0 - 360");
    		document.getElementById("inputBox").value = "";
            ChangePreviewValue = null;
    	}

    	else if(lineArray.length == 0){
    		//displayError('noline',"Draw line before dimensioning.");
    	}
    	else if(firstAcceptedValue == true){
            l = linearDimArray[0];
            l.selectForChange = false;
    		setScale(dimension);
    		firstAcceptedValue = false;
    		document.getElementById("inputBox").value = "";
    		ChangePreviewValue = null;
    	}

    	else{
    		//change active dimension:
    		if(LastSelectedDimType == "relangular"){
    		    changeLineAngle(dimension, LastSelectedDimID);
    		}

    		else if(LastSelectedDimType == 'fillet'){
    		    changeFilletRadius(dimension, LastSelectedDimID);
    		}
    		else if(LastSelectedDimType == 'linear'){
    		    changeLineLength(dimension, LastSelectedDimID, LastSelectedDimType);
    		}
    		closeOrOpenSection();
    	}
    }
}



function Button2Clicked(){

/*
	var okOrCancel = confirm('Fillets and chamfers will be removed. Continue?');

	if(okOrCancel == true){
		//reset everything:

		clearStressCalcs();

		arcArray = [];
		chamferArray = [];
		rectArray = [];
		lineArray = [];
		linearDimArray = [];
		FilletCutoutList = [];

		dispCx = 0;
		zeroX = 0;
		//reassign the saved JSON array of lines to line objects...):
		var passthroughArray = JSON.parse(undoLineArray);
		for(var i = 0; i <passthroughArray.length; i ++){
			l = passthroughArray[i]
			lineArray.push(new Line(l.startx, l.starty, l.endx, l.endy, l.dim, l.lineID, l.lineLength,l.constLine));
		}
		passthroughArray = JSON.parse(undolinearDimArray);
		for(var i = 0; i <passthroughArray.length; i ++){
			l = passthroughArray[i]
			linearDimArray.push(new Dimension(l.value, l.x, l.y, l.elementID, l.showDim, l.startx, l.starty, l.endx, l.endy, l.orientation, l.startx1, l.starty1, l.endx1, l.endy1, l.startx2, l.starty2, l.endx2, l.endy2));
		}
		for(var tx = 0; tx < canvas.width; tx++){
				for(var ty = 0; ty < canvas.height; ty++){
					var index = (ty * canvas.width + tx) * 4;
					var color = 'background';
					rasterArray[index / 4] = color;
					colorit(color, tx, ty);
				}
			}
		detectRects();

		*/
		ConstructionLineMode = false;
		drawingMode = 'lines';
        CurrentMode = 'Lines';
        resetChangeTag();
		Redraw();
		highlightButtonImg('linesb');
        document.getElementById("snipcursor").style.visibility = "hidden";
        document.getElementById("erasecursor").style.visibility = "hidden";
        document.body.style.cursor = "crosshair";
        var linesString = 'Lines Drawing Mode activated. \nClick, drag and release to draw lines. \nPress the ? button for help.'
        var linesString2 = 'Click, drag and release to draw lines. Press the ? button for help.'
        writeWelcomeToOutputbox(linesString,linesString2);
}

function userInputLinesButtonClicked(){
    	ConstructionLineMode = false;
		drawingMode = 'lines';
        CurrentMode = 'Lines';
        resetChangeTag();
		Redraw();
		highlightButtonImg('linesb');
        document.getElementById("snipcursor").style.visibility = "hidden";
        document.getElementById("erasecursor").style.visibility = "hidden";
        document.body.style.cursor = "crosshair";
        var linesString = 'Lines Drawing Mode activated. \nClick, drag and release to draw lines. \nPress the ? button for help.'
        var linesString2 = 'Click, drag and release to draw lines. Press the ? button for help.'
        writeWelcomeToOutputbox(linesString,linesString2);
	    PrintToLog('Lines Button Clicked')
}



function Button3Clicked(){
    //need to unselect for change all dimensions:
    resetChangeTag();
	ConstructionLineMode = false;
	drawingMode = 'fillets';
	CurrentMode = 'Fillets';
	highlightButtonImg('filletsb');

	//clears dimension input box and focuses for dimension entry:
	document.getElementById('filletRadius').value = "";
	document.getElementById("filletRadius").focus();
	document.getElementById("filletRadius").select;

    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "crosshair";
    var filletsString = 'Fillets Mode activated. \nEnter the desired radius in the dialogue. \nClick on a corner to create a fillet.'
    var filletsString2 = 'Enter the desired radius in the dialogue. Click on a corner to create a fillet.'
    writeWelcomeToOutputbox(filletsString,filletsString2);
    MouseInKeepOut = false;

}

function Button3Clicked_2(){
    //need to unselect for change all dimensions:
    resetChangeTag();
	ConstructionLineMode = false;
	drawingMode = 'fillets';
	CurrentMode = 'Fillets';
	highlightButtonImg('filletsb');

    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "crosshair";
    var filletsString = 'Fillets Mode activated. \nEnter the desired radius in the dialogue. \nClick on a corner to create a fillet.'
    var filletsString2 = 'Enter the desired radius in the dialogue. Click on a corner to create a fillet.'
    writeWelcomeToOutputbox(filletsString,filletsString2);
    MouseInKeepOut = false;
}

function Button4Clicked(){
	if(showDims == true){
		showDims = false;
	}
	else{
		showDims = true;
	}
}

//Chamfers button:
function Button5Clicked(){

    /*
	if(ClosedSection == true && drawingMode != 'loads'){

	//Save a copy of the lines that exist before addition of chamfers and fillets:
	saveUndoLines(lineArray, linearDimArray);

	drawingMode = 'chamfers';
	//clears dimension input box and focuses for dimension entry:
	document.getElementById('inputBox').value = "";
	document.getElementById("inputBox").focus();
	document.getElementById("inputBox").select;

	}
	else if(drawingMode == 'loads'){
		alert('You must go back to Lines mode to redefine geometry.');
	}
	else{
		alert('Section must be closed to add chamfers.');
	}
	*/
	drawingMode = 'chamfers';
    highlightButtonImg('chamfersb');
}

function ConstLinesClicked(){
    resetChangeTag();
	ConstructionLineMode = true;
    highlightButtonImg('constlinesb');
    drawingMode = 'lines';
    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "crosshair";
    var constLinesString = 'Construction Lines Drawing Mode activated. \nClick, drag and release to draw a line. \nConstruction lines are ignored in analysis.'
    var constLinesString2 = 'Click, drag and release to draw lines. Construction lines are ignored in analysis.'
    writeWelcomeToOutputbox(constLinesString,constLinesString2);
}

function DimLinesClicked(){
    resetChangeTag();
	ConstructionLineMode = false;
    highlightButtonImg('dimlinesb');
    drawingMode = 'linearDim';
    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "crosshair";
    var dimLinesString = 'Linear Dimension Mode activated. \nClick on a line to show/hide the associated dimension. \nClick on the dimension to edit.'
    var dimLinesString2 = 'Click on a line to show/hide the associated dimension. Click on the dimension to edit.'
    writeWelcomeToOutputbox(dimLinesString,dimLinesString2);
}

function DimAnglessClicked(){
    resetChangeTag();
	ConstructionLineMode = false;
    highlightButtonImg('dimanglesb');
    drawingMode = 'angledimbetweenlines';
    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "crosshair";
    var dimAnglesString = 'Angular Dimension Mode activated. \nClick, drag and release from one line to other line. \nLines must share a common endpoint.'
    var dimAnglesString2 = 'Click, drag, and release from one line to other line to create an angular dimension.'
    writeWelcomeToOutputbox(dimAnglesString,dimAnglesString2);
    PrintToLog('Angles Button Clicked')
}

function SnipClicked(){
    resetChangeTag();
	ConstructionLineMode = false;
    highlightButtonImg('snipb');
    drawingMode = 'snip';
    document.getElementById("snipcursor").style.visibility = "visible";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "none";
    var snipString = 'Trim Mode activated. \nClick on a line or arc to shorten to the nearest intersection.\nDrag to trim multiple elements quickly.'
    var snipString2 = 'Click on a line or arc to trim to the nearest intersection.'
    writeWelcomeToOutputbox(snipString,snipString2);
	PrintToLog('Erase Button Clicked')
}

function EraseClicked(){
    resetChangeTag();
	ConstructionLineMode = false;
    highlightButtonImg('eraseb');
    drawingMode = 'erase';
    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "visible";
    document.body.style.cursor = "none";
    var eraseString = 'Erase Mode activated. \nClick on any line, arc, or dimension to delete. \nDrag to box select elements for deletion.'
    var eraseString2 = 'Click on any line, arc, or dimension to delete. Drag to box select.'
    writeWelcomeToOutputbox(eraseString,eraseString2);
}

function clearClicked(){
    PrintToLog('Clear Button Clicked')
    displayClearAlert();
    //var clearIt = confirm("Clear Canvas? You may want to save your work first.");
    /*
    if(clearIt == true){

        lineArray = [];
        firstLineDrawn = false;
        arcArray = [];
        linearDimArray = [];
        AngularDimArray = [];
        relAngleArray = [];
		unConnectedLinesArray = [];
        Scale = 0;
        firstAcceptedValue = true;
        ElementID = 0;

        CurrentFileName = 'New Cross Section';
        connectedPointsArray = [];
        userMoves = [];
        redoMove = [];
        ClearStressVis();
        Button2Clicked();

    }
    */
}

function undoClicked(){
    UndoOneStep();
    Redraw();
}

function redoClicked(){
    RedoOneStep();
    Redraw();
}

function SrpClicked(){
	ConstructionLineMode = false;
    highlightButtonImg('srpb');
}

function cancelClicked(){

    document.getElementById("results").style.visibility = "hidden";
    document.getElementById("resultsgrab").style.visibility = "hidden";
    document.getElementById("outputpopuptext").style.visibility = "hidden";
    document.getElementById("resultsheader").style.visibility = "hidden";
    document.getElementById("resultskeepout").style.visibility = "hidden";
    ClearStressVis();

}

function welcomecancelClicked(){

    PrintToLog('Welcome Popup Closed');

    var linesString = 'Lines Drawing Mode activated. \nClick, drag and release to draw lines. \nPress the ? button for help.'
    var linesString2 = 'Click, drag and release to draw lines. Press the ? button for help.'
    writeWelcomeToOutputbox(linesString,linesString2);

    document.getElementById("welcome").style.visibility = "hidden";
    document.getElementById("welcomegrab").style.visibility = "hidden";
    document.getElementById("okbtn").style.visibility = "hidden";
    //document.getElementById("welcomecancelbtn").style.visibility = "hidden";
    document.getElementById("welcomeheader").style.visibility = "hidden";
    //document.getElementById("smokescreen").style.visibility = "hidden";

    document.getElementById("tod").style.visibility = "visible";
    document.getElementById("todgrab").style.visibility = "visible";
    document.getElementById("todheader").style.visibility = "visible";
    document.getElementById("todcancel").style.visibility = "visible";
    document.getElementById("todtxt").style.visibility = "visible";
    document.getElementById("custom-file-upload_a").style.visibility = "visible";

    welcomeDisplayed = false;

    //Send the IP to the database.
    getIP();

}

function todcancelClicked(){

    document.getElementById("smokescreen").style.visibility = "hidden";
    document.getElementById("tod").style.visibility = "hidden";
    document.getElementById("todgrab").style.visibility = "hidden";
    document.getElementById("todheader").style.visibility = "hidden";
    document.getElementById("todcancel").style.visibility = "hidden";
    document.getElementById("todtxt").style.visibility = "hidden";
    document.getElementById("custom-file-upload_a").style.visibility = "hidden";

    PrintToLog('Freehand Triggered (can be called to close after loading an image)')

     InputFreze = false;
}

function fobfeedbackClicked(){

    //Hide the feedback or buy dialogue.
    document.getElementById("fob").style.visibility = "hidden";
    document.getElementById("fobgrab").style.visibility = "hidden";
    document.getElementById("fobheader").style.visibility = "hidden";
    document.getElementById("fobbuy").style.visibility = "hidden";
    document.getElementById("fobtxt").style.visibility = "hidden";
    document.getElementById("fobfeedback").style.visibility = "hidden";

    //Bring up the feedback box:
    document.getElementById("feedbackbox").style.visibility = "visible";
    document.getElementById("feedbackboxgrab").style.visibility = "visible";
    document.getElementById("feedbackboxheader").style.visibility = "visible";
    document.getElementById("feedbackboxtxt").style.visibility = "visible";
    document.getElementById("feedbackboxokbtn").style.visibility = "visible";

}

function feedbackOkClicked(){
//Sends the data from form to server to be sent to email. (After validating data)
    var emailString = document.getElementById("email").value;
    var checkbox = document.getElementById("contactcheckbox").checked;
    var usecaseString = document.getElementById("usecase").value;
    var improvementString = document.getElementById("improvement").value;

    var validEmailString = ValidateEmail(emailString)

    if(validEmailString == true && usecaseString != '' && improvementString != ''){

        //Hides Feedback Box
        document.getElementById("smokescreen").style.visibility = "hidden";
        document.getElementById("feedbackboxgrab").style.visibility = "hidden";
        document.getElementById("feedbackbox").style.visibility = "hidden";
        document.getElementById("feedbackboxheader").style.visibility = "hidden";
        document.getElementById("feedbackboxtxt").style.visibility = "hidden";
        document.getElementById("feedbackboxokbtn").style.visibility = "hidden";

        Redraw();

    	var ourRequest = new XMLHttpRequest();

        //Save the shape:
    	var exportArray = [emailString, checkbox, usecaseString, improvementString];
    	JsonToSend = JSON.stringify(exportArray);

    	ourRequest.open('POST', 'https://visualcalcs.pythonanywhere.com/SendFeedback');
    	ourRequest.setRequestHeader("Content-type", "text/plain");
    	ourRequest.send(JsonToSend);

    	//Once the request gets back.
    	ourRequest.onload = function(){
            UseCredit();

            //Run the analysis:
            SendShape()
            document.getElementById("loader").style.visibility = "visible";
            bottomLeftPoint();
    	    UtilityPointDraw(displayProperties);
    	    StressGradientShown = true;
    	    console.log('Running Analysis.')
    	}

        InputFreze = false;


    }

    else if(validEmailString == true){
        alert("Please fill out all fields!")
    }




//Hides the feedbackbox


//Sets credits = 50.

}


function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)

  }
    alert("Please enter a valid email address!")
    return (false)
}


function errorcancelClicked(){

    var errorstringtoprint = 'Error closed. '
    PrintToLog(errorstringtoprint);

    document.getElementById("erroralert").style.visibility = "hidden";
    document.getElementById("errorgrab").style.visibility = "hidden";
    document.getElementById("errorokbtn").style.visibility = "hidden";
    document.getElementById("errorreshelpbtn").style.visibility = "hidden";
    document.getElementById("errorheader").style.visibility = "hidden";
    document.getElementById("erroralerttext").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";

    if(ActiveError == 'badlineardim' || ActiveError ==  'badangulardim' || ActiveError == 'noscale' || ActiveError ==  'outofwindow'){
    //Only want this to happen for certain errors.
    document.getElementById('inputBox').value = "";
    document.getElementById("inputBox").focus();
    document.getElementById("inputBox").select;
    }

    if(ActiveError == 'badlineardim_first'){
        displayFirstDimAlert();
    }

    if(ActiveError == 'badradius'){
        //document.getElementById('filletRadius').value = "";
        //document.getElementById("filletRadius").focus();
        //document.getElementById("filletRadius").select;
    }

    if(ActiveError == 'badimg'){
        console.log('bad img error closed.')
        imageObj.src = 'whitepix.PNG'
        whiteBackground = true;
        clearokClicked();
        document.getElementById("smokescreen").style.visibility = "visible";

    }

    ActiveError = null;
    InputFreze = false;

}

function precancelClicked(){

    document.getElementById("precisionselection").value = Precision;
    document.getElementById("prealert").style.visibility = "hidden";
    document.getElementById("pregrab").style.visibility = "hidden";
    document.getElementById("preheader").style.visibility = "hidden";
    document.getElementById("prehelpbtn").style.visibility = "hidden";
    document.getElementById("prexbtn").style.visibility = "hidden";
    document.getElementById("prealerttext").style.visibility = "hidden";
    document.getElementById("preokbtn").style.visibility = "hidden";
    document.getElementById("precancelbtn").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";

    InputFreze = false;

}

function unitscancelClicked(){

    document.getElementById("precisionselection").value = Precision;
    document.getElementById("unitsalert").style.visibility = "hidden";
    document.getElementById("unitsgrab").style.visibility = "hidden";
    document.getElementById("unitsheader").style.visibility = "hidden";
    //document.getElementById("unitshelpbtn").style.visibility = "hidden";
    document.getElementById("unitsxbtn").style.visibility = "hidden";
    document.getElementById("unitsalerttext").style.visibility = "hidden";
    document.getElementById("unitsokbtn").style.visibility = "hidden";
    document.getElementById("unitscancelbtn").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";

    InputFreze = false;
    PrintToLog('Units Cancel Clicked')

}


function preokClicked(){

    var newPrecision = document.getElementById("precisionselection").value;
    ChangePrecision(newPrecision);
    Redraw();

    document.getElementById("prealert").style.visibility = "hidden";
    document.getElementById("pregrab").style.visibility = "hidden";
    document.getElementById("preheader").style.visibility = "hidden";
    document.getElementById("prehelpbtn").style.visibility = "hidden";
    document.getElementById("prexbtn").style.visibility = "hidden";
    document.getElementById("prealerttext").style.visibility = "hidden";
    document.getElementById("preokbtn").style.visibility = "hidden";
    document.getElementById("precancelbtn").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";

    InputFreze = false;

}

function unitsokClicked(){

    Units = document.getElementById("unitsselection").value;

    var btn = document.getElementById("units");
    btn.innerHTML = 'Units: ' + Units;

    document.getElementById("unitsalert").style.visibility = "hidden";
    document.getElementById("unitsgrab").style.visibility = "hidden";
    document.getElementById("unitsheader").style.visibility = "hidden";
    //document.getElementById("unitshelpbtn").style.visibility = "hidden";
    document.getElementById("unitsxbtn").style.visibility = "hidden";
    document.getElementById("unitsalerttext").style.visibility = "hidden";
    document.getElementById("unitsokbtn").style.visibility = "hidden";
    document.getElementById("unitscancelbtn").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";
    str = ''
	MasterAreaStr = String(MasterArea.toFixed(2));
	var Areastr = str.concat(MasterAreaStr);

    var ResultsString = 'Area: \n' + MasterAreaStr  + ' ' + Units+'²' //+ '\nCX:     ' + actualCxStr + '\nCY:     ' + actualCyStr + '\nIX:     ' + MasterIxxStr + '\nIY:     ' + MasterIyyStr + '\nTheta:  ' + MasterAlphaStr + '\nIp1:    ' + MasterIxpStr + '\nIp2:    ' + MasterIypStr;

    writetoResultsBox(ResultsString);

    InputFreze = false;

    //////

    var mySelect = document.getElementById('unitsselection_a');

    for(var i, j = 0; i = mySelect.options[j]; j++) {
        if(i.value == Units) {
            mySelect.selectedIndex = j;
            break;
        }
    }
    var unitstoprint = 'Units Set To: '+ Units;
    PrintToLog(unitstoprint);
    PrintToLog('Units Ok Clicked')

}

function SaveRedircancelClicked(){

    document.getElementById("SaveRedir").style.visibility = "hidden";
    document.getElementById("SaveRedirgrab").style.visibility = "hidden";
    document.getElementById("SaveRedirokbtn").style.visibility = "hidden";
    document.getElementById("SaveRedircancelbtn").style.visibility = "hidden";
    document.getElementById("SaveRedirheader").style.visibility = "hidden";
    document.getElementById("SaveRedirwelcometxt").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";

    InputFreze = false;

}

function displaySaveRedir(){

    document.getElementById("SaveRedir").style.visibility = "visible";
    document.getElementById("SaveRedirgrab").style.visibility = "visible";
    document.getElementById("SaveRedirokbtn").style.visibility = "visible";
    document.getElementById("SaveRedircancelbtn").style.visibility = "visible";
    document.getElementById("SaveRedirheader").style.visibility = "visible";
    document.getElementById("SaveRedirwelcometxt").style.visibility = "visible";
    document.getElementById("smokescreen").style.visibility = "visible";

    InputFreze = true;

}

function LinesRedircancelClicked(){

    document.getElementById("LinesRedir").style.visibility = "hidden";
    document.getElementById("LinesRedirgrab").style.visibility = "hidden";
    document.getElementById("LinesRedirokbtn").style.visibility = "hidden";
    document.getElementById("LinesRedircancelbtn").style.visibility = "hidden";
    document.getElementById("LinesRedirheader").style.visibility = "hidden";
    document.getElementById("LinesRedirwelcometxt").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";

    InputFreze = false;
}

function displayLinesRedir(){

    document.getElementById("LinesRedir").style.visibility = "visible";
    document.getElementById("LinesRedirgrab").style.visibility = "visible";
    document.getElementById("LinesRedirokbtn").style.visibility = "visible";
    document.getElementById("LinesRedircancelbtn").style.visibility = "visible";
    document.getElementById("LinesRedirheader").style.visibility = "visible";
    document.getElementById("LinesRedirwelcometxt").style.visibility = "visible";
    document.getElementById("smokescreen").style.visibility = "visible";

    InputFreze = true;

}

function displayError(errorType,errorString){

    var errorstringtoprint = 'Error displayed: ' + errorString
    PrintToLog(errorstringtoprint);

    ActiveError = errorType;

    if(errorType == 'badimg'){
        document.getElementById('erroralerttext').value = errorString;
    }

	if(errorType == 'noimg'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'opensection'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'servererror'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'outofwindow'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'noscale'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'badradius'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'resize'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'badprecision'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'fileload'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'drawnout'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'noangleatfillet'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'radoversize'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'nonconnectedfillet'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'badangulardim'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'badlineardim'){
        document.getElementById('erroralerttext').value = errorString;
        hideFirstDimAlert();
    }
    if(errorType == 'badlineardim_first'){
        document.getElementById('erroralerttext').value = errorString;
        hideFirstDimAlert();
    }
    if(errorType == 'noline'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'emptyradius'){
        document.getElementById('erroralerttext').value = errorString;
    }
    if(errorType == 'anglenoendpoint'){
        document.getElementById('erroralerttext').value = errorString;
    }

    document.getElementById("erroralert").style.visibility = "visible";
    document.getElementById("errorgrab").style.visibility = "visible";
    document.getElementById("errorokbtn").style.visibility = "visible";
    document.getElementById("errorreshelpbtn").style.visibility = "visible";
    document.getElementById("errorheader").style.visibility = "visible";
    document.getElementById("erroralerttext").style.visibility = "visible";
    document.getElementById("smokescreen").style.visibility = "visible";

    InputFreze = true;
}

function displayClearAlert(){

    document.getElementById("clearalert").style.visibility = "visible";
    document.getElementById("cleargrab").style.visibility = "visible";
    document.getElementById("clearokbtn").style.visibility = "visible";
    document.getElementById("clearcancelbtn").style.visibility = "visible";
    //document.getElementById("clearhelpbtn").style.visibility = "visible";
    document.getElementById("clearheader").style.visibility = "visible";
    document.getElementById("clearalerttext").style.visibility = "visible";
    document.getElementById("smokescreen").style.visibility = "visible";

    InputFreze = true;
}

function displayFirstDimAlert(){

    document.getElementById("firstdimalert").style.visibility = "visible";
    document.getElementById("firstdimgrab").style.visibility = "visible";
    document.getElementById("firstdimokbtn").style.visibility = "visible";
    document.getElementById("firstdimcancelbtn").style.visibility = "visible";
    document.getElementById("firstdimhelpbtn").style.visibility = "visible";
    document.getElementById("firstdimheader").style.visibility = "visible";
    document.getElementById("firstdimalerttext").style.visibility = "visible";
    document.getElementById("smokescreen").style.visibility = "visible";
    document.getElementById("firstinput").style.visibility = "visible";


    document.getElementById('firstinput').focus();
    document.getElementById('firstinput').select;

    PrintToLog('First Dim Alert Displayed')
    InputFreze = true;
}

function hideFirstDimAlert(){

    document.getElementById("firstdimalert").style.visibility = "hidden";
    document.getElementById("firstdimgrab").style.visibility = "hidden";
    document.getElementById("firstdimokbtn").style.visibility = "hidden";
    document.getElementById("firstdimcancelbtn").style.visibility = "hidden";
    document.getElementById("firstdimhelpbtn").style.visibility = "hidden";
    document.getElementById("firstdimheader").style.visibility = "hidden";
    document.getElementById("firstdimalerttext").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";
    document.getElementById("firstinput").style.visibility = "hidden";

    document.getElementById('firstinput').value = "";

    InputFreze = false;

    Redraw();
}

function clearokClicked(){
    //clear the screen.
        lineArray = [];
        firstLineDrawn = false;
        arcArray = [];
        linearDimArray = [];
        AngularDimArray = [];
        relAngleArray = [];
		unConnectedLinesArray = [];
		dispCx = 0;
		dispCy = 0;
		ZeroX = 0;
		ZeroY = 0;
        MasterCx = 0
        MasterCy = 0;

        Scale = 0;
        firstAcceptedValue = true;
        ElementID = 0;

        CurrentFileName = 'New Cross Section';
        connectedPointsArray = [];
        userMoves = [];
        redoMove = [];
        undoFilletArray = [];
        ClearStressVis();
        Button2Clicked();

		imageObj.src = 'whitepix.PNG';
        whiteBackground = true;

	    imgWidth = c.canvas.width;
	    imgHeight = c.canvas.height;

		ImageShown = false;

		Redraw();

    //close the displayclearalert dialogue.

    document.getElementById("clearalert").style.visibility = "hidden";
    document.getElementById("cleargrab").style.visibility = "hidden";
    document.getElementById("clearokbtn").style.visibility = "hidden";
    document.getElementById("clearcancelbtn").style.visibility = "hidden";
    //document.getElementById("clearhelpbtn").style.visibility = "hidden";
    document.getElementById("clearheader").style.visibility = "hidden";
    document.getElementById("clearalerttext").style.visibility = "hidden";

    document.getElementById("tod").style.visibility = "visible";
    document.getElementById("todgrab").style.visibility = "visible";
    document.getElementById("todheader").style.visibility = "visible";
    document.getElementById("todcancel").style.visibility = "visible";
    document.getElementById("todtxt").style.visibility = "visible";
    document.getElementById("custom-file-upload_a").style.visibility = "visible";

    PrintToLog('Clear Ok Clicked')


}

function clearcancelClicked(){
    //close the displayclearalert dialogue.

    document.getElementById("clearalert").style.visibility = "hidden";
    document.getElementById("cleargrab").style.visibility = "hidden";
    document.getElementById("clearokbtn").style.visibility = "hidden";
    document.getElementById("clearcancelbtn").style.visibility = "hidden";
    //document.getElementById("clearhelpbtn").style.visibility = "hidden";
    document.getElementById("clearheader").style.visibility = "hidden";
    document.getElementById("clearalerttext").style.visibility = "hidden";
    document.getElementById("smokescreen").style.visibility = "hidden";

	PrintToLog('Clear Cancel Clicked')

    InputFreze = false;
}

function displayPreAlert(){

    document.getElementById("prealert").style.visibility = "visible";
    document.getElementById("pregrab").style.visibility = "visible";
    document.getElementById("preokbtn").style.visibility = "visible";
    document.getElementById("prexbtn").style.visibility = "visible";
    document.getElementById("precancelbtn").style.visibility = "visible";
    document.getElementById("prehelpbtn").style.visibility = "visible";
    document.getElementById("preheader").style.visibility = "visible";
    document.getElementById("prealerttext").style.visibility = "visible";
    document.getElementById("smokescreen").style.visibility = "visible";

    InputFreze = true;
}

function displayUnitsAlert(){

    PrintToLog('Units Clicked')

    document.getElementById("unitsalert").style.visibility = "visible";
    document.getElementById("unitsgrab").style.visibility = "visible";
    document.getElementById("unitsokbtn").style.visibility = "visible";
    document.getElementById("unitsxbtn").style.visibility = "visible";
    document.getElementById("unitscancelbtn").style.visibility = "visible";
    //document.getElementById("unitshelpbtn").style.visibility = "visible";
    document.getElementById("unitsheader").style.visibility = "visible";
    document.getElementById("unitsalerttext").style.visibility = "visible";
    document.getElementById("smokescreen").style.visibility = "visible";

    document.getElementById("inputBox").blur();

    InputFreze = true;
}


/*
function SnapHVClicked(){
   if(HVSnap == false){
        document.getElementById('snaphvb').className = 'snaphvbtnactive'
		HVSnap = true;
   }
   else{
	   HVSnap = false;
        document.getElementById('snaphvb').className = 'snaphvbtn'
   }
}
*/

//This function switches the button to highlighted version or opposite to illustrate which mode is selected.
function highlightButtonImg(classname){

    if(document.getElementById(classname).className == 'linesbtn'){
        document.getElementById('linesb').className = 'linesbtnactive'
        //document.getElementById('filletsb').className = 'filletsbtn'
        //document.getElementById('constlinesb').className = 'constlinesbtn'
        //document.getElementById('dimlinesb').className = 'dimlinesbtn'
        document.getElementById('dimanglesb').className = 'dimanglesbtn'
        document.getElementById('snipb').className = 'snipbtn'
        //document.getElementById('eraseb').className = 'erasebtn'
        //document.getElementById('srpb').className = 'srpbtn'
    }

    else if(document.getElementById(classname).className == 'filletsbtn'){
        document.getElementById('linesb').className = 'linesbtn'
        //document.getElementById('filletsb').className = 'filletsbtnactive'
        //document.getElementById('constlinesb').className = 'constlinesbtn'
        //document.getElementById('dimlinesb').className = 'dimlinesbtn'
        document.getElementById('dimanglesb').className = 'dimanglesbtn'
        document.getElementById('snipb').className = 'snipbtn'
        //document.getElementById('eraseb').className = 'erasebtn'
        //document.getElementById('srpb').className = 'srpbtn'
    }

    else if(document.getElementById(classname).className == 'constlinesbtn'){
        document.getElementById('linesb').className = 'linesbtn'
        //document.getElementById('filletsb').className = 'filletsbtn'
        //document.getElementById('constlinesb').className = 'constlinesbtnactive'
        //document.getElementById('dimlinesb').className = 'dimlinesbtn'
        document.getElementById('dimanglesb').className = 'dimanglesbtn'
        document.getElementById('snipb').className = 'snipbtn'
        //document.getElementById('eraseb').className = 'erasebtn'
       //document.getElementById('srpb').className = 'srpbtn'
    }

    else if(document.getElementById(classname).className == 'dimlinesbtn'){
        document.getElementById('linesb').className = 'linesbtn'
        //document.getElementById('filletsb').className = 'filletsbtn'
        //document.getElementById('constlinesb').className = 'constlinesbtn'
        //document.getElementById('dimlinesb').className = 'dimlinesbtnactive'
        document.getElementById('dimanglesb').className = 'dimanglesbtn'
        document.getElementById('snipb').className = 'snipbtn'
        //document.getElementById('eraseb').className = 'erasebtn'
       // document.getElementById('srpb').className = 'srpbtn'
    }

    else if(document.getElementById(classname).className == 'dimanglesbtn'){
        document.getElementById('linesb').className = 'linesbtn'
        //document.getElementById('filletsb').className = 'filletsbtn'
        //document.getElementById('constlinesb').className = 'constlinesbtn'
        //document.getElementById('dimlinesb').className = 'dimlinesbtn'
        document.getElementById('dimanglesb').className = 'dimanglesbtnactive'
        document.getElementById('snipb').className = 'snipbtn'
        //document.getElementById('eraseb').className = 'erasebtn'
     //   document.getElementById('srpb').className = 'srpbtn'
    }

    else if(document.getElementById(classname).className == 'snipbtn'){
        document.getElementById('linesb').className = 'linesbtn'
        //document.getElementById('filletsb').className = 'filletsbtn'
        //document.getElementById('constlinesb').className = 'constlinesbtn'
        //document.getElementById('dimlinesb').className = 'dimlinesbtn'
        document.getElementById('dimanglesb').className = 'dimanglesbtn'
        document.getElementById('snipb').className = 'snipbtnactive'
        //document.getElementById('eraseb').className = 'erasebtn'
        //document.getElementById('srpb').className = 'srpbtn'
    }

    else if(document.getElementById(classname).className == 'erasebtn'){
        document.getElementById('linesb').className = 'linesbtn'
        //document.getElementById('filletsb').className = 'filletsbtn'
        //document.getElementById('constlinesb').className = 'constlinesbtn'
        //document.getElementById('dimlinesb').className = 'dimlinesbtn'
        document.getElementById('dimanglesb').className = 'dimanglesbtn'
        document.getElementById('snipb').className = 'snipbtn'
        //document.getElementById('eraseb').className = 'erasebtnactive'
        //document.getElementById('srpb').className = 'srpbtn'
    }

    else if(document.getElementById(classname).className == 'srpbtn'){
        document.getElementById('linesb').className = 'linesbtn'
        //document.getElementById('filletsb').className = 'filletsbtn'
        //document.getElementById('constlinesb').className = 'constlinesbtn'
        //document.getElementById('dimlinesb').className = 'dimlinesbtn'
        document.getElementById('dimanglesb').className = 'dimanglesbtn'
        document.getElementById('snipb').className = 'snipbtn'
        //document.getElementById('eraseb').className = 'erasebtn'
        //document.getElementById('srpb').className = 'srpbtnactive'
    }

}


function deselectButtons(){

        document.getElementById('linesb').className = 'linesbtn'
        //document.getElementById('filletsb').className = 'filletsbtn'
        //document.getElementById('constlinesb').className = 'constlinesbtn'
        //document.getElementById('dimlinesb').className = 'dimlinesbtn'
        document.getElementById('dimanglesb').className = 'dimanglesbtn'
        document.getElementById('snipb').className = 'snipbtn'
        //document.getElementById('eraseb').className = 'erasebtn'
        //document.getElementById('srpb').className = 'srpbtn'
}


function Button6Clicked(){
    //First, try cleaning up the section in case anything is left not buttoned up:

    PrintToLog('Find Area Clicked')
    AuxArray = [];
    removeZeroLengthLines();
    var iscloseOrOpenSection = closeOrOpenSection();
    if(iscloseOrOpenSection == true){
        SendShape();
        //if(lineArray.length <= 4){
            document.getElementById("loader").style.visibility = "visible";
            bottomLeftPoint();
    	    UtilityPointDraw(displayProperties);
    	    StressGradientShown = true;
        //}
        //else{
          //  displayLinesRedir();
        //}
    }
    else{
        circleNonConnectedEndpoints();
    }

}

//Precision button is clicked
function Button8Clicked(){

    displayPreAlert();

    /*
    var enteredPrecision = prompt("Enter Display Precision (Decimals after \".\", not sig figs) for Dimensions", "2");
    if(enteredPrecision != null){
        enteredPrecision = parseInt(enteredPrecision);
        if((isNaN(enteredPrecision) == true) || (Number.isInteger(enteredPrecision) == false) || (enteredPrecision < 0) || (enteredPrecision > 3)){
            //propt will return null if cancel is pressed. Don't want to show next error after cancel is pressed.
                displayError('badprecision',"Display Precision must 0, 1, 2, or 3.");
        }
        else{
           ChangePrecision(enteredPrecision);
           Redraw();
        }
    }


//Used to be the add SRP button:
/*
	var nextSRPid = 1;

	//Set the SRPid for the next SRP to be one more than the highest one in the array.
	for(var i = 0; i < SRPArray.length; i++){
		Sa = SRPArray[i];
		if(Sa.SRPid >= nextSRPid){
			nextSRPid = Sa.SRPid + 1;
		}
	}

	//Just call new SRP function.
	newSRP(100,100,nextSRPid);

	packageForPy(lineArray,arcArray)
*/

	Redraw();
}


function buyproclicked(){
   window.open("https://www.visualcalcs.com/pricing");
}

//Help button is clicked.
function Button9Clicked(){
   window.open("https://www.visualcalcs.com/AreaSupport/#Video");
    PrintToLog('Help Clicked')

}

function feedbackClicked(){
   window.open("https://www.visualcalcs.com/contact");
}

//contextual help button is clicked for results - will go to page explaining results.
function resultsHelpClicked(){
    window.open("https://www.visualcalcs.com/Areasupport/#Results");
}

function firstdimHelpClicked(){
    window.open("https://www.visualcalcs.com/Areasupport/#Video");
}

function errorHelpClicked(){
    window.open("https://www.visualcalcs.com/Areasupport/#Alert");
}

function clearHelpClicked(){
    window.open("https://www.visualcalcs.com/support/#Inter");
}

function preHelpClicked(){
    window.open("https://www.visualcalcs.com/Areasupport/#Inter");
}

function unitsHelpClicked(){
     window.open("https://www.visualcalcs.com/Areasupport/#Inter");
}
//Don't allow context menu to show up. Normally a bad practice - in this case, pretty annoying when it happens.
document.addEventListener('contextmenu', event => event.preventDefault());

window.onbeforeunload = confirmExit;

function confirmExit()
{
    return "Exit Page?";
}

window.addEventListener('scroll', function(event){

var top  = window.pageYOffset || document.documentElement.scrollTop,
    left = window.pageXOffset || document.documentElement.scrollLeft;

var bottom  = top + window.innerHeight;
var right = left + window.innerWidth;

//  Set gloabals:
    TopTextX = left + 5;
    TopTextY = top + 15;

    if(window.innerHeight <= canvas.height + 100){
        CsysY = bottom - 175;
    }
    else{
        CsysY = canvas.height - 25;
    }
    if(window.innerWidth <= canvas.width){
        CsysX = right - 75;
    }
    else{
        CsysX = canvas.width - 50;
    }

    Redraw();

});

function circleNonConnectedEndpoints(){
//Goes through the list of all endpoints, compares them to those in the connectedEndpointsArray and circles those that aren't connected.

    unConnectedLinesArray = [];
    var tolerance = .00001;
    var numberOfunConnected = 0;
    //For lines:
    for(var i = 0; i < lineArray.length; i++){
		if(lineArray[i].constLine != true){
            var startConnected = false;
            var endConnected = false;
            //Step 1: look at all endpoints as candidates:
            for(var j = 0; j < connectedPointsArray.length; j++){
                //step 2: for each endpoint, see if it is in the connectedPointsArray:
                if(Tol(connectedPointsArray[j][0],lineArray[i].startx,tolerance) && Tol(connectedPointsArray[j][1],lineArray[i].starty,tolerance)){
                    startConnected = true;
                }
                if(Tol(connectedPointsArray[j][0],lineArray[i].endx,tolerance) && Tol(connectedPointsArray[j][1],lineArray[i].endy,tolerance)){
                    endConnected = true;
                }
            }

            if(startConnected == false){
                unConnectedLinesArray.push([[lineArray[i].startx], [lineArray[i].starty]]);
                numberOfunConnected += 1;
            }

            if(endConnected == false){
                unConnectedLinesArray.push([[lineArray[i].endx], [lineArray[i].endy]]);
                numberOfunConnected += 1;
            }
		}
    }

    //Next, for arcs:
	for(var i = 0; i< arcArray.length; i++){
	    var l2 = arcArray[i];
	    var startConnected = false;
        var endConnected = false;
        for(var j = 0; j < connectedPointsArray.length; j++){
    		if(Tol(connectedPointsArray[j][0],l2.endpoint1x,tolerance) && Tol(connectedPointsArray[j][1],l2.endpoint1y,tolerance)){
  	            startConnected = true;
    		}
    		if(Tol(connectedPointsArray[j][0],l2.endpoint2x,tolerance) && Tol(connectedPointsArray[j][1],l2.endpoint2y,tolerance)){
                endConnected = true;
    		}
        }

        if(startConnected == false){
            unConnectedLinesArray.push([[l2.endpoint1x], [l2.endpoint1y]]);
            numberOfunConnected += 1;
        }

        if(endConnected == false){
            unConnectedLinesArray.push([[l2.endpoint2x], [l2.endpoint2y]]);
            numberOfunConnected += 1;
        }

	}

    Redraw();

    if(numberOfunConnected == 0){
        var alertString = "Invalid section - it appears that you tried to calculate section properties before drawing anything!";
    }
    else{
        var alertString = "Invalid Section - please correct " + numberOfunConnected + " unconnected endpoints circled in red.";
    }

    displayError('opensection', alertString);

}


//turns off the scrollbars.
function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}

window.addEventListener('resize', function(event){

    //listening for resize during an anlysis request.
    if(ListenForResize == true){
        document.getElementById("loader").style.visibility = "hidden";
        displayError('resize','Analysis cancelled due to resized window!');
        CancelledRequest = true;
        ListenForResize = false;
        InputFreze = false;
        showZeroZero = false;
        c.canvas.width  = window.innerWidth;
        c.canvas.height = window.innerHeight;
        ClearStressVis();
    }
    else{
        c.canvas.width  = window.innerWidth;
        c.canvas.height = window.innerHeight;
    }

	if(whiteBackground == true){
	    //console.log('whitepix is loaded... resizing.')
        imgHeight = c.canvas.height;
        imgWidth = c.canvas.width;
	}

/*
var top  = window.pageYOffset || document.documentElement.scrollTop,
var left = window.pageXOffset || document.documentElement.scrollLeft;

var bottom  = top + window.innerHeight;
var right = left + window.innerWidth;


//  Set gloabals:
    TopTextX = left + 5;
    TopTextY = top + 15;

    if(window.innerHeight <= canvas.height + 100){
        CsysY = bottom - 175;
    }
    else{
        CsysY = canvas.height -25;
    }
    if(window.innerWidth <= canvas.width){
        CsysX = right - 75;
    }
    else{
        CsysX = canvas.width - 50;
    }

*/
    Redraw();

});


function positionCsys(){

    var top  = window.pageYOffset || document.documentElement.scrollTop,
        left = window.pageXOffset || document.documentElement.scrollLeft;

    var bottom  = top + window.innerHeight;
    var right = left + window.innerWidth;


        if(window.innerHeight <= canvas.height + 100){
            CsysY = bottom - 175;
        }
        else{
            CsysY = canvas.height - 25;
        }
        if(window.innerWidth <= canvas.width){
            CsysX = right - 75;
        }
        else{
            CsysX = canvas.width - 50;
        }
        coordinateSystem();
}

function resetChangeTag(){
	for(var i = 0; i < linearDimArray.length; i++){
	    d = linearDimArray[i];
		d.selectForChange = false;
	}

	for(var i = 0; i < AngularDimArray.length; i++){
	    d = AngularDimArray[i];
		d.selectForChange = false;
	}

	for(var i = 0; i < relAngleArray.length; i++){
	    d = relAngleArray[i];
		d.selectForChange = false;
	}



}

//returns true if there is an active dimension selected for change. Retruns false otherwise.
function activeChangeTag(){

    var changeTag = false;

	for(var i = 0; i < linearDimArray.length; i++){
	    d = linearDimArray[i];
		if(d.selectForChange == true){
		    changeTag = true;
		}
	}

	for(var i = 0; i < AngularDimArray.length; i++){
	    d = AngularDimArray[i];
		if(d.selectForChange == true){
		    changeTag = true;
		}
	}
	for(var i = 0; i < relAngleArray.length; i++){
	    d = relAngleArray[i];
		if(d.selectForChange == true){
		    changeTag = true;
		}
	}

	return changeTag;
}


//When the window is resized, this function is called to resize canvas area.
/*
window.addEventListener('resize', function(event) {
    var Width = window.innerWidth;
    if(Width < 1500){
        canvas.width = Width - Width*.05;
    }
    else{
        canvas.width = 1500;
    }
    var Height = window.innerHeight;
    if(Height < 1200){
        canvas.height = Height - Height*.15;
    }
    else{
        canvas.height = 1200;
    }
    Redraw();
});*/

//links the enter key to the enter button:
window.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    enterPressed();
  }
});

//links control z to undo function:
window.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.keyCode == 90) {
   event.preventDefault();
   UndoOneStep();
  }
  else if (event.ctrlKey && event.keyCode == 82) {
   event.preventDefault();
   RedoOneStep();
  }
});

function UndoOneStep(){

    ClearStressVis();

    if(userMoves.length > 0 ){

        lastMove = userMoves[userMoves.length -1];

        var errorstringtoprint = 'Undoing  ' + lastMove[0][0]
        PrintToLog(errorstringtoprint);

        //console.log('trying to undo: ', lastMove);

        if(lastMove[0][0] == 'newline'){
            deleteline(lastMove[0][1],true);
        }

        else if(lastMove[0][0] == 'moveep' || lastMove[0][0] == 'moveline'){
            //Replace the lines that were moved to their pre-moved state.

            //console.log('undo line: ', lastMove[0][1])

            for(var i = 0; i < lastMove[0][1].length; i++){
                 for(var k = 0; k < lineArray.length; k++){
                    if(lineArray[k].lineID == lastMove[0][1][i].lineID){
                        var lineToSplice = new Line(lastMove[0][1][i].startx, lastMove[0][1][i].starty, lastMove[0][1][i].endx, lastMove[0][1][i].endy, lastMove[0][1][i].dim, lastMove[0][1][i].lineID, lastMove[0][1][i].lineLength, lastMove[0][1][i].constLine, lastMove[0][1][i].angle, lastMove[0][1][i].startxghost,lastMove[0][1][i].startyghost,lastMove[0][1][i].endxghost, lastMove[0][1][i].endyghost, lastMove[0][1][i].midpointX, lastMove[0][1][i].midpointY);
                        lineArray.splice(k,1,lineToSplice);
                        updateLinearDimension(lineToSplice.lineID);
                    }
                }
            }
        }

        else if(lastMove[0][0] == 'newfillet'){
            deletefillet(lastMove[0][1], true);

            //replace the lines that were shortened with their pre-shortened data:
            for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[0][2].lineID){
                    var lineToSplice = new Line(lastMove[0][2].startx, lastMove[0][2].starty, lastMove[0][2].endx, lastMove[0][2].endy, lastMove[0][2].dim, lastMove[0][2].lineID, lastMove[0][2].lineLength, lastMove[0][2].constLine, lastMove[0][2].angle, lastMove[0][2].startxghost,lastMove[0][2].startyghost,lastMove[0][2].endxghost, lastMove[0][2].endyghost, lastMove[0][2].midpointX, lastMove[0][2].midpointY);
                    lineArray.splice(k,1,lineToSplice);
                    updateLinearDimension(lineToSplice.lineID);
                }
                else if(lineArray[k].lineID == lastMove[0][3].lineID){
                    var lineToSplice = new Line(lastMove[0][3].startx, lastMove[0][3].starty, lastMove[0][3].endx, lastMove[0][3].endy, lastMove[0][3].dim, lastMove[0][3].lineID, lastMove[0][3].lineLength, lastMove[0][3].constLine, lastMove[0][3].angle, lastMove[0][3].startxghost,lastMove[0][3].startyghost,lastMove[0][3].endxghost, lastMove[0][3].endyghost, lastMove[0][3].midpointX, lastMove[0][3].midpointY);
                    lineArray.splice(k,1,lineToSplice);
                    updateLinearDimension(lineToSplice.lineID);
                }
            }
        }

        else if(lastMove[0][0] == 'deleteline'){
            //Push the saved line object back into the lineArray
            var lineToPush = new Line(lastMove[0][1].startx, lastMove[0][1].starty, lastMove[0][1].endx, lastMove[0][1].endy, lastMove[0][1].dim, lastMove[0][1].lineID, lastMove[0][1].lineLength, lastMove[0][1].constLine, lastMove[0][1].angle, lastMove[0][1].startxghost,lastMove[0][1].startyghost,lastMove[0][1].endxghost, lastMove[0][1].endyghost, lastMove[0][1].midpointX, lastMove[0][1].midpointY);
            lineArray.push(lineToPush);

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[0][2].value, lastMove[0][2].x, lastMove[0][2].y, lastMove[0][2].elementID, lastMove[0][2].showDim, lastMove[0][2].startx, lastMove[0][2].starty, lastMove[0][2].endx, lastMove[0][2].endy, lastMove[0][2].orientation, lastMove[0][2].startx1, lastMove[0][2].starty1, lastMove[0][2].endx1, lastMove[0][2].endy1, lastMove[0][2].startx2, lastMove[0][2].starty2, lastMove[0][2].endx2, lastMove[0][2].endy2,lastMove[0][2].type,lastMove[0][2].angle,lastMove[0][2].xoffset1,lastMove[0][2].yoffset1, lastMove[0][2].xoffset2, lastMove[0][2].yoffset2, lastMove[0][2].perpOffset));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[0][3].value, lastMove[0][3].x, lastMove[0][3].y, lastMove[0][3].elementID, lastMove[0][3].showDim, lastMove[0][3].startx, lastMove[0][3].starty));
        }

        else if(lastMove[0][0] == 'deletefillet'){

            //push saved fillet object back into the arcArray:
            arcArray.push(new Arc(lastMove[0][1].centroidx, lastMove[0][1].centroidy, lastMove[0][1].radius, lastMove[0][1].radstart, lastMove[0][1].radend, lastMove[0][1].arcID, lastMove[0][1].Case, lastMove[0][1].fx, lastMove[0][1].fy, lastMove[0][1].groupID, lastMove[0][1].color, lastMove[0][1].endpoint1x, lastMove[0][1].endpoint1y, lastMove[0][1].endpoint2x, lastMove[0][1].endpoint2y,lastMove[0][1].line1ID, lastMove[0][1].line2ID));

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[0][2].value, lastMove[0][2].x, lastMove[0][2].y, lastMove[0][2].elementID, lastMove[0][2].showDim, lastMove[0][2].startx, lastMove[0][2].starty, lastMove[0][2].endx, lastMove[0][2].endy, lastMove[0][2].orientation, lastMove[0][2].startx1, lastMove[0][2].starty1, lastMove[0][2].endx1, lastMove[0][2].endy1, lastMove[0][2].startx2, lastMove[0][2].starty2, lastMove[0][2].endx2, lastMove[0][2].endy2,lastMove[0][2].type,lastMove[0][2].angle,lastMove[0][2].xoffset1,lastMove[0][2].yoffset1, lastMove[0][2].xoffset2, lastMove[0][2].yoffset2, lastMove[0][2].perpOffset));


            //dd... need to add conditional for case where lines don't need replacement.
            if(lastMove[0][3] != null){
                //Delete the line that will be pushed in as to not have duplicates:

                //In this case, it is important to not delete associated relangle dims, so true is put into the third argument:
                deleteline(lastMove[0][3].lineID,true,true);

                //Push the saved line object back into the lineArray
                var lineToPush = new Line(lastMove[0][3].startx, lastMove[0][3].starty, lastMove[0][3].endx, lastMove[0][3].endy, lastMove[0][3].dim, lastMove[0][3].lineID, lastMove[0][3].lineLength, lastMove[0][3].constLine, lastMove[0][3].angle, lastMove[0][3].startxghost,lastMove[0][3].startyghost,lastMove[0][3].endxghost, lastMove[0][3].endyghost, lastMove[0][3].midpointX, lastMove[0][3].midpointY);
                lineArray.push(lineToPush);

                //push saved lineardimension object back into lineardimArray
	    		linearDimArray.push(new LinearDimension(lastMove[0][5].value, lastMove[0][5].x, lastMove[0][5].y, lastMove[0][5].elementID, lastMove[0][5].showDim, lastMove[0][5].startx, lastMove[0][5].starty, lastMove[0][5].endx, lastMove[0][5].endy, lastMove[0][5].orientation, lastMove[0][5].startx1, lastMove[0][5].starty1, lastMove[0][5].endx1, lastMove[0][5].endy1, lastMove[0][5].startx2, lastMove[0][5].starty2, lastMove[0][5].endx2, lastMove[0][5].endy2,lastMove[0][5].type,lastMove[0][5].angle,lastMove[0][5].xoffset1,lastMove[0][5].yoffset1, lastMove[0][5].xoffset2, lastMove[0][5].yoffset2, lastMove[0][5].perpOffset));

                //push saved angulard dimension object back into angulardimarray
                AngularDimArray.push(new AngularDimension(lastMove[0][7].value, lastMove[0][7].x, lastMove[0][7].y, lastMove[0][7].elementID, lastMove[0][7].showDim, lastMove[0][7].startx, lastMove[0][7].starty));

            }
            if(lastMove[0][4] != null){
                //Delete the line that will be pushed in as to not have duplicates:

                //In this case, it is important to not delete associated relangle dims, so true is put into the third argument:
                deleteline(lastMove[0][4].lineID,true,true);

                //Push the saved line object back into the lineArray
                lineToPush = new Line(lastMove[0][4].startx, lastMove[0][4].starty, lastMove[0][4].endx, lastMove[0][4].endy, lastMove[0][4].dim, lastMove[0][4].lineID, lastMove[0][4].lineLength, lastMove[0][4].constLine, lastMove[0][4].angle, lastMove[0][4].startxghost,lastMove[0][4].startyghost,lastMove[0][4].endxghost, lastMove[0][4].endyghost, lastMove[0][4].midpointX, lastMove[0][4].midpointY);
                lineArray.push(lineToPush);

                //push saved lineardimension object back into lineardimArray
	    		linearDimArray.push(new LinearDimension(lastMove[0][6].value, lastMove[0][6].x, lastMove[0][6].y, lastMove[0][6].elementID, lastMove[0][6].showDim, lastMove[0][6].startx, lastMove[0][6].starty, lastMove[0][6].endx, lastMove[0][6].endy, lastMove[0][6].orientation, lastMove[0][6].startx1, lastMove[0][6].starty1, lastMove[0][6].endx1, lastMove[0][6].endy1, lastMove[0][6].startx2, lastMove[0][6].starty2, lastMove[0][6].endx2, lastMove[0][6].endy2,lastMove[0][6].type,lastMove[0][6].angle,lastMove[0][6].xoffset1,lastMove[0][6].yoffset1, lastMove[0][6].xoffset2, lastMove[0][6].yoffset2, lastMove[0][6].perpOffset));

                //push saved angulard dimension object back into angulardimarray
                AngularDimArray.push(new AngularDimension(lastMove[0][8].value, lastMove[0][8].x, lastMove[0][8].y, lastMove[0][8].elementID, lastMove[0][8].showDim, lastMove[0][8].startx, lastMove[0][8].starty));
            }


        }

        //z...
        else if(lastMove[0][0] == 'snipline'){
            //Push the saved line object back into the lineArray
            var lineToPush = new Line(lastMove[0][1].startx, lastMove[0][1].starty, lastMove[0][1].endx, lastMove[0][1].endy, lastMove[0][1].dim, lastMove[0][1].lineID, lastMove[0][1].lineLength, lastMove[0][1].constLine, lastMove[0][1].angle, lastMove[0][1].startxghost,lastMove[0][1].startyghost,lastMove[0][1].endxghost, lastMove[0][1].endyghost, lastMove[0][1].midpointX, lastMove[0][1].midpointY);

            //Delete the line that was created during the snip:
            deleteline(lastMove[0][4],true);

            //Delete the line that will be pushed in as to not have duplicates:
            deleteline(lastMove[0][1].lineID,true);

            lineArray.push(lineToPush);

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[0][2].value, lastMove[0][2].x, lastMove[0][2].y, lastMove[0][2].elementID, lastMove[0][2].showDim, lastMove[0][2].startx, lastMove[0][2].starty, lastMove[0][2].endx, lastMove[0][2].endy, lastMove[0][2].orientation, lastMove[0][2].startx1, lastMove[0][2].starty1, lastMove[0][2].endx1, lastMove[0][2].endy1, lastMove[0][2].startx2, lastMove[0][2].starty2, lastMove[0][2].endx2, lastMove[0][2].endy2,lastMove[0][2].type,lastMove[0][2].angle,lastMove[0][2].xoffset1,lastMove[0][2].yoffset1, lastMove[0][2].xoffset2, lastMove[0][2].yoffset2, lastMove[0][2].perpOffset));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[0][3].value, lastMove[0][3].x, lastMove[0][3].y, lastMove[0][3].elementID, lastMove[0][3].showDim, lastMove[0][3].startx, lastMove[0][3].starty));

        }

        else if(lastMove[0][0] == 'snipfillet'){

            deletefillet(lastMove[0][2],true,true);
            deletefillet(lastMove[0][3],true,true);

            //push saved fillet object back into the arcArray:
            arcArray.push(new Arc(lastMove[0][1].centroidx, lastMove[0][1].centroidy, lastMove[0][1].radius, lastMove[0][1].radstart, lastMove[0][1].radend, lastMove[0][1].arcID, lastMove[0][1].Case, lastMove[0][1].fx, lastMove[0][1].fy, lastMove[0][1].groupID, lastMove[0][1].color, lastMove[0][1].endpoint1x, lastMove[0][1].endpoint1y, lastMove[0][1].endpoint2x, lastMove[0][1].endpoint2y,lastMove[0][1].line1ID, lastMove[0][1].line2ID));

            //add dimensions.
            //push saved lineardimension object back into lineardimarray:
    		linearDimArray.push(new LinearDimension(lastMove[0][4].value, lastMove[0][4].x, lastMove[0][4].y, lastMove[0][4].elementID, lastMove[0][4].showDim, lastMove[0][4].startx, lastMove[0][4].starty, lastMove[0][4].endx, lastMove[0][4].endy, lastMove[0][4].orientation, lastMove[0][4].startx1, lastMove[0][4].starty1, lastMove[0][4].endx1, lastMove[0][4].endy1, lastMove[0][4].startx2, lastMove[0][4].starty2, lastMove[0][4].endx2, lastMove[0][4].endy2,lastMove[0][4].type,lastMove[0][4].angle,lastMove[0][4].xoffset1,lastMove[0][4].yoffset1, lastMove[0][4].xoffset2, lastMove[0][4].yoffset2, lastMove[0][4].perpOffset));
        }

        else if(lastMove[0][0] == 'movedim'){
            //Get the dimension that was moved, and move it back!
            moveDim(lastMove[0][3],lastMove[0][4],lastMove[0][1],lastMove[0][2]);

        }

        else if(lastMove[0][0] == 'hsdim'){
            //Change the hide/show state to the oposite of what it is at for the given dim.
            if(lastMove[0][2] == 'linear'){
    		    for(var k = 0; k < linearDimArray.length; k++){
    		        if(linearDimArray[k].elementID == lastMove[0][1]){
    		            linearDimArray[k].showDim = lastMove[0][3];
    		        }
    		    }
            }
            else if(lastMove[0][2] == 'angular'){
    		    for(var k = 0; k < AngularDimArray.length; k++){
    		        if(AngularDimArray[k].elementID == lastMove[0][1]){
    		            AngularDimArray[k].showDim = lastMove[0][3];
    		        }
    		    }
            }

        }

        //w...
        else if(lastMove[0][0] == 'movedhandle'){
            //place the handle back where it came from.
            moveHandle(lastMove[0][2],lastMove[0][3],'nonabsolute',lastMove[0][1]);

            //for(var i = 0; i < relAngleArray.length; i++){
              //  if(relAngleArray[i].elementID == lastMove[0][1]){
                //   relAngleArray[i].handlex =  lastMove[0][2];
                  // relAngleArray[i].handley =  lastMove[0][3];
                //}
            //}
        }

        else if(lastMove[0][0] == 'changedim'){
            //First, get rid of the resized line.
            deleteline(lastMove[0][1].lineID,true);

            //Push the saved line object back into the lineArray
            var lineToPush = new Line(lastMove[0][1].startx, lastMove[0][1].starty, lastMove[0][1].endx, lastMove[0][1].endy, lastMove[0][1].dim, lastMove[0][1].lineID, lastMove[0][1].lineLength, lastMove[0][1].constLine, lastMove[0][1].angle, lastMove[0][1].startxghost,lastMove[0][1].startyghost,lastMove[0][1].endxghost, lastMove[0][1].endyghost, lastMove[0][1].midpointX, lastMove[0][1].midpointY);
            lineArray.push(lineToPush);

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[0][2].value, lastMove[0][2].x, lastMove[0][2].y, lastMove[0][2].elementID, lastMove[0][2].showDim, lastMove[0][2].startx, lastMove[0][2].starty, lastMove[0][2].endx, lastMove[0][2].endy, lastMove[0][2].orientation, lastMove[0][2].startx1, lastMove[0][2].starty1, lastMove[0][2].endx1, lastMove[0][2].endy1, lastMove[0][2].startx2, lastMove[0][2].starty2, lastMove[0][2].endx2, lastMove[0][2].endy2,lastMove[0][2].type,lastMove[0][2].angle,lastMove[0][2].xoffset1,lastMove[0][2].yoffset1, lastMove[0][2].xoffset2, lastMove[0][2].yoffset2, lastMove[0][2].perpOffset));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[0][3].value, lastMove[0][3].x, lastMove[0][3].y, lastMove[0][3].elementID, lastMove[0][3].showDim, lastMove[0][3].startx, lastMove[0][3].starty));
        }

        else if(lastMove[0][0] == 'newreldim'){

            //delete the dimesnion:
            deletedim(lastMove[0][1]);
	    }

	    else if(lastMove[0][0] == 'deletereldim'){

	        //push the reldim back in.
            relAngleArray.push(new AngleRelDimension(lastMove[0][1].value, lastMove[0][1].x, lastMove[0][1].y, lastMove[0][1].elementID, lastMove[0][1].showDim, lastMove[0][1].radstart, lastMove[0][1].radend, lastMove[0][1].centroidx, lastMove[0][1].centroidy, lastMove[0][1].radius, lastMove[0][1].line1ID, lastMove[0][1].line2ID, lastMove[0][1].direction, lastMove[0][1].handlex, lastMove[0][1].handley, lastMove[0][1].changemarkerx, lastMove[0][1].changemarkery,lastMove[0][1].displayFlippedArc));

	    }

        else if(lastMove[0][0] == 'changerelangledim'){

            //First, get rid of the resized line.
            deleteline(lastMove[0][1].lineID,true);

            //Push the saved line object back into the lineArray
            var lineToPush = new Line(lastMove[0][1].startx, lastMove[0][1].starty, lastMove[0][1].endx, lastMove[0][1].endy, lastMove[0][1].dim, lastMove[0][1].lineID, lastMove[0][1].lineLength, lastMove[0][1].constLine, lastMove[0][1].angle,  lastMove[0][1].startxghost,lastMove[0][1].startyghost,lastMove[0][1].endxghost, lastMove[0][1].endyghost, lastMove[0][1].midpointX, lastMove[0][1].midpointY);
            lineArray.push(lineToPush);

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[0][2].value, lastMove[0][2].x, lastMove[0][2].y, lastMove[0][2].elementID, lastMove[0][2].showDim, lastMove[0][2].startx, lastMove[0][2].starty, lastMove[0][2].endx, lastMove[0][2].endy, lastMove[0][2].orientation, lastMove[0][2].startx1, lastMove[0][2].starty1, lastMove[0][2].endx1, lastMove[0][2].endy1, lastMove[0][2].startx2, lastMove[0][2].starty2, lastMove[0][2].endx2, lastMove[0][2].endy2,lastMove[0][2].type,lastMove[0][2].angle,lastMove[0][2].xoffset1,lastMove[0][2].yoffset1, lastMove[0][2].xoffset2, lastMove[0][2].yoffset2, lastMove[0][2].perpOffset));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[0][3].value, lastMove[0][3].x, lastMove[0][3].y, lastMove[0][3].elementID, lastMove[0][3].showDim, lastMove[0][3].startx, lastMove[0][3].starty));

            //delete the dimesnion:
            deletedim(lastMove[0][4].elementID);

            //push the reldim back in.
            relAngleArray.push(new AngleRelDimension(lastMove[0][4].value, lastMove[0][4].x, lastMove[0][4].y, lastMove[0][4].elementID, lastMove[0][4].showDim, lastMove[0][4].radstart, lastMove[0][4].radend, lastMove[0][4].centroidx, lastMove[0][4].centroidy, lastMove[0][4].radius, lastMove[0][4].line1ID, lastMove[0][4].line2ID, lastMove[0][4].direction, lastMove[0][4].handlex, lastMove[0][4].handley, lastMove[0][4].changemarkerx, lastMove[0][4].changemarkery, lastMove[0][4].displayFlippedArc));

        }

         else if(lastMove[0][0] == 'changefilletradius'){

            //Delete the old sized fillet.
            deletefillet(lastMove[0][1],true);

            //Delete the old sized line1.
            deleteline(lastMove[0][2].lineID,true);

            //Delete the old sized line2.
            deleteline(lastMove[0][3].lineID,true);

            var lindex = 2;
            //Push the saved line1 object back into the lineArray
            var lineToPush = new Line(lastMove[0][lindex].startx, lastMove[0][lindex].starty, lastMove[0][lindex].endx, lastMove[0][lindex].endy, lastMove[0][lindex].dim, lastMove[0][lindex].lineID, lastMove[0][lindex].lineLength, lastMove[0][lindex].constLine, lastMove[0][lindex].angle,  lastMove[0][lindex].startxghost,lastMove[0][lindex].startyghost,lastMove[0][lindex].endxghost, lastMove[0][lindex].endyghost, lastMove[0][lindex].midpointX, lastMove[0][lindex].midpointY);
            lineArray.push(lineToPush);

            lindex = 3;
            //Push the saved line2 object back into the lineArray
            var lineToPush = new Line(lastMove[0][lindex].startx, lastMove[0][lindex].starty, lastMove[0][lindex].endx, lastMove[0][lindex].endy, lastMove[0][lindex].dim, lastMove[0][lindex].lineID, lastMove[0][lindex].lineLength, lastMove[0][lindex].constLine, lastMove[0][lindex].angle,  lastMove[0][lindex].startxghost,lastMove[0][lindex].startyghost,lastMove[0][lindex].endxghost, lastMove[0][lindex].endyghost, lastMove[0][lindex].midpointX, lastMove[0][lindex].midpointY);
            lineArray.push(lineToPush);

            //4 is the arc that must be pushed back into the array.
           //push saved fillet object back into the arcArray:
            arcArray.push(new Arc(lastMove[0][4].centroidx, lastMove[0][4].centroidy, lastMove[0][4].radius, lastMove[0][4].radstart, lastMove[0][4].radend, lastMove[0][4].arcID, lastMove[0][4].Case, lastMove[0][4].fx, lastMove[0][4].fy, lastMove[0][4].groupID, lastMove[0][4].color, lastMove[0][4].endpoint1x, lastMove[0][4].endpoint1y, lastMove[0][4].endpoint2x, lastMove[0][4].endpoint2y,lastMove[0][4].line1ID, lastMove[0][4].line2ID));

            var ldindex = 5;
            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[0][ldindex].value, lastMove[0][ldindex].x, lastMove[0][ldindex].y, lastMove[0][ldindex].elementID, lastMove[0][ldindex].showDim, lastMove[0][ldindex].startx, lastMove[0][ldindex].starty, lastMove[0][ldindex].endx, lastMove[0][ldindex].endy, lastMove[0][ldindex].orientation, lastMove[0][ldindex].startx1, lastMove[0][ldindex].starty1, lastMove[0][ldindex].endx1, lastMove[0][ldindex].endy1, lastMove[0][ldindex].startx2, lastMove[0][ldindex].starty2, lastMove[0][ldindex].endx2, lastMove[0][ldindex].endy2,lastMove[0][ldindex].type,lastMove[0][ldindex].angle,lastMove[0][ldindex].xoffset1,lastMove[0][ldindex].yoffset1, lastMove[0][ldindex].xoffset2, lastMove[0][ldindex].yoffset2, lastMove[0][ldindex].perpOffset));
            //5 is the linear dim that must be pushed back into the array.

            ldindex = 6;
            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[0][ldindex].value, lastMove[0][ldindex].x, lastMove[0][ldindex].y, lastMove[0][ldindex].elementID, lastMove[0][ldindex].showDim, lastMove[0][ldindex].startx, lastMove[0][ldindex].starty, lastMove[0][ldindex].endx, lastMove[0][ldindex].endy, lastMove[0][ldindex].orientation, lastMove[0][ldindex].startx1, lastMove[0][ldindex].starty1, lastMove[0][ldindex].endx1, lastMove[0][ldindex].endy1, lastMove[0][ldindex].startx2, lastMove[0][ldindex].starty2, lastMove[0][ldindex].endx2, lastMove[0][ldindex].endy2,lastMove[0][ldindex].type,lastMove[0][ldindex].angle,lastMove[0][ldindex].xoffset1,lastMove[0][ldindex].yoffset1, lastMove[0][ldindex].xoffset2, lastMove[0][ldindex].yoffset2, lastMove[0][ldindex].perpOffset));
            //5 is the linear dim that must be pushed back into the array.

            ldindex = 7;
            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[0][ldindex].value, lastMove[0][ldindex].x, lastMove[0][ldindex].y, lastMove[0][ldindex].elementID, lastMove[0][ldindex].showDim, lastMove[0][ldindex].startx, lastMove[0][ldindex].starty, lastMove[0][ldindex].endx, lastMove[0][ldindex].endy, lastMove[0][ldindex].orientation, lastMove[0][ldindex].startx1, lastMove[0][ldindex].starty1, lastMove[0][ldindex].endx1, lastMove[0][ldindex].endy1, lastMove[0][ldindex].startx2, lastMove[0][ldindex].starty2, lastMove[0][ldindex].endx2, lastMove[0][ldindex].endy2,lastMove[0][ldindex].type,lastMove[0][ldindex].angle,lastMove[0][ldindex].xoffset1,lastMove[0][ldindex].yoffset1, lastMove[0][ldindex].xoffset2, lastMove[0][ldindex].yoffset2, lastMove[0][ldindex].perpOffset));
            //5 is the linear dim that must be pushed back into the array.

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[0][8].value, lastMove[0][8].x, lastMove[0][8].y, lastMove[0][8].elementID, lastMove[0][8].showDim, lastMove[0][8].startx, lastMove[0][8].starty));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[0][9].value, lastMove[0][9].x, lastMove[0][9].y, lastMove[0][9].elementID, lastMove[0][9].showDim, lastMove[0][9].startx, lastMove[0][9].starty));

        }

    var dataToPush = JSON.parse(JSON.stringify(userMoves[userMoves.length-1]));

    redoMoves.push(dataToPush);
    userMoves.pop([userMoves.length-1]);
    closeOrOpenSection();
    }
}

function GenerateInverse(){
        //Get the most recently entered move in userMoves:
        lastMove = userMoves[userMoves.length -1];

        if(lastMove[0][0] == 'newline'){

            //For redo, save the line as it is:
    	    for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[0][1]){
    	            var redoLine = JSON.parse(JSON.stringify(lineArray[k]));
		        }
    	    }
    	    for(var k = 0; k < linearDimArray.length; k++){
                if(linearDimArray[k].elementID == lastMove[0][1]){
    	            var redoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
    	            redoLinearDim.showDim = false;
    	            redoLinearDim.selectForChange = false;
		        }
    	    }
    	    for(var k = 0; k < AngularDimArray.length; k++){
                if(AngularDimArray[k].elementID == lastMove[0][1]){
    	            var redoAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
    	            redoAngularDim.showDim = false;
    	            redoAngularDim.selectForChange = false;
		        }
    	    }
        lastMove.push(['newline', 0, redoLine, redoLinearDim, redoAngularDim]);
        }

        else if(lastMove[0][0] == 'newfillet'){
            //For redo, save the arc as it is:
    	    for(var k = 0; k < arcArray.length; k++){
                if(arcArray[k].arcID == lastMove[0][1]){
    	            var redoArc = JSON.parse(JSON.stringify(arcArray[k]));
		        }
    	    }
    	    for(var k = 0; k < linearDimArray.length; k++){
                if(linearDimArray[k].elementID == lastMove[0][1]){
    	            var redoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
    	            redoLinearDim.showDim = false;
    	            redoLinearDim.selectForChange = false;
		        }
    	    }
        //Next, get the data from the lines shortened by the creation of the fillet.
    	    for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[0][2].lineID){
    	            var shortenedLine1 = JSON.parse(JSON.stringify(lineArray[k]));
		        }
                if(lineArray[k].lineID == lastMove[0][3].lineID){
    	            var shortenedLine2 = JSON.parse(JSON.stringify(lineArray[k]));
		        }
    	    }

        lastMove.push(['newfillet', redoArc, redoLinearDim, shortenedLine1, shortenedLine2]);
        }

        else if(lastMove[0][0] == 'deleteline'){
            lastMove.push(['deleteline',lastMove[0][1].lineID]);
        }

        else if(lastMove[0][0] == 'deletefillet'){
            lastMove.push(['deletefillet',lastMove[0][1].arcID]);
        }

        //z...
        else if(lastMove[0][0] == 'snipline'){

    	    for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[0][1].lineID){
    	            var undoLine = JSON.parse(JSON.stringify(lineArray[k]));
		        }
                if(lineArray[k].lineID == lastMove[0][4]){
    	            var undoDeleteLine = JSON.parse(JSON.stringify(lineArray[k]));
		        }

    	    }
    	    for(var k = 0; k < linearDimArray.length; k++){
                if(linearDimArray[k].elementID == lastMove[0][1].lineID){
    	            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
		        }
                if(linearDimArray[k].elementID == lastMove[0][4]){
    	            var undoDeleteLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
		        }
    	    }
    	    for(var k = 0; k < AngularDimArray.length; k++){
                if(AngularDimArray[k].elementID == lastMove[0][1].lineID){
    	            var undoAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
		        }
                if(AngularDimArray[k].elementID == lastMove[0][4]){
    	            var undoDeleteAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
		        }
    	    }

            lastMove.push(['snipline', undoLine, undoLinearDim, undoAngularDim, undoDeleteLine, undoDeleteLinearDim, undoDeleteAngularDim]);

        }

        else if(lastMove[0][0] == 'snipfillet'){
            //the undofillet is to be deleted while deleteFillet1 and deleteFillet2 are to be reinstated if they exist.
            var deleteFillet2 = 999;
            var deleteLinearDim2 = 999;

       	    for(var k = 0; k < arcArray.length; k++){
                if(arcArray[k].arcID == lastMove[0][2]){
    	            var deleteFillet1 = JSON.parse(JSON.stringify(arcArray[k]));
    	        }
                if(arcArray[k].arcID == lastMove[0][3]){
    	            deleteFillet2 = JSON.parse(JSON.stringify(arcArray[k]));
    	        }

    	    }

    	    for(var k = 0; k < linearDimArray.length; k++){
                if(linearDimArray[k].elementID == lastMove[0][2]){
    	            var deleteLinearDim1 = JSON.parse(JSON.stringify(linearDimArray[k]));
    	        }
                if(linearDimArray[k].elementID == lastMove[0][3]){
    	            var deleteLinearDim2 = JSON.parse(JSON.stringify(linearDimArray[k]));
    	        }
    	    }

            lastMove.push(['snipfillet', lastMove[0][1].arcID, deleteFillet1, deleteFillet2, deleteLinearDim1, deleteLinearDim2]);
        }

        else if(lastMove[0][0] == 'movedim'){
            //Get the curent x and y position of the moved dimension:
            if(lastMove[0][2] == 'linear' || lastMove[0][2] == 'fillet'){
           	    for(var k = 0; k < linearDimArray.length; k++){
                    if(linearDimArray[k].elementID == dimToMove[0]){
    	                var currentx = linearDimArray[k].x;
    	                var currenty = linearDimArray[k].y;
		            }
           	    }
            }
            else if(lastMove[0][2] == 'angular'){
           	    for(var k = 0; k < AngularDimArray.length; k++){
                    if(AngularDimArray[k].elementID == dimToMove[0]){
    	                var currentx = AngularDimArray[k].x;
    	                var currenty = AngularDimArray[k].y;
		            }
           	    }
            }

            else if(lastMove[0][2] == 'relangular'){
           	    for(var k = 0; k < relAngleArray.length; k++){
                    if(relAngleArray[k].elementID == dimToMove[0]){
    	                var currentx = relAngleArray[k].x;
    	                var currenty = relAngleArray[k].y;
		            }
           	    }
            }
            lastMove.push(['movedim', lastMove[0][1], lastMove[0][2], currentx, currenty]);
        }

        else if(lastMove[0][0] == 'hsdim'){
            //Just copy the first array into the second array:

            if(lastMove[0][3] == true){
                var undoShowDim = false;
            }
            else{
                var undoShowDim = true;
            }
            lastMove.push([lastMove[0][0], lastMove[0][1], lastMove[0][2], undoShowDim]);
        }

        else if(lastMove[0][0] == 'changedim'){
        //Get the changed dimension line as it currently is:
            //For redo, save the line as it is:
    	    for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[0][1].lineID){
    	            var redoLine = JSON.parse(JSON.stringify(lineArray[k]));
		        }
    	    }
    	    for(var k = 0; k < linearDimArray.length; k++){
                if(linearDimArray[k].elementID == lastMove[0][1].lineID){
    	            var redoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
		        }
    	    }
    	    for(var k = 0; k < AngularDimArray.length; k++){
                if(AngularDimArray[k].elementID == lastMove[0][1].lineID){
    	            var redoAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
		        }
    	    }
            lastMove.push(['changedim',redoLine, redoLinearDim, redoAngularDim]);
        }

        else if(lastMove[0][0] == 'newreldim'){
        //Get relAngle as it currently is:
    	    for(var k = 0; k < relAngleArray.length; k++){
                if(relAngleArray[k].elementID == lastMove[0][1]){
    	            var redorelAngleArrayDim = JSON.parse(JSON.stringify(relAngleArray[k]));
		        }
    	    }
            lastMove.push(['newreldim',redorelAngleArrayDim]);
        }

        else if(lastMove[0][0] == 'deletereldim'){
            lastMove.push(['deletereldim',lastMove[0][1].elementID]);
        }

        else if(lastMove[0][0] == 'changerelangledim'){
        //Get the changed dimension line as it currently is:
            //For redo, save the line as it is:
    	    for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[0][1].lineID){
    	            var redoLine = JSON.parse(JSON.stringify(lineArray[k]));
		        }
    	    }
    	    for(var k = 0; k < linearDimArray.length; k++){
                if(linearDimArray[k].elementID == lastMove[0][1].lineID){
    	            var redoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
		        }
    	    }
    	    for(var k = 0; k < AngularDimArray.length; k++){
                if(AngularDimArray[k].elementID == lastMove[0][1].lineID){
    	            var redoAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
		        }
    	    }
    	    for(var k = 0; k < relAngleArray.length; k++){
                if(relAngleArray[k].elementID == lastMove[0][4].elementID){
    	            var redoRelDim = JSON.parse(JSON.stringify(relAngleArray[k]));
		        }
    	    }
            lastMove.push(['changerelangledim',redoLine, redoLinearDim, redoAngularDim, redoRelDim]);
        }

        else if(lastMove[0][0] == 'movedhandle'){
           	    for(var k = 0; k < relAngleArray.length; k++){
                    if(relAngleArray[k].elementID == lastMove[0][1]){
    	                var currentx = relAngleArray[k].handlex;
    	                var currenty = relAngleArray[k].handley;
		            }
           	    }
            lastMove.push(['movedhandle', lastMove[0][1], currentx, currenty]);
        }

        //th...
        else if(lastMove[0][0] == 'changefilletradius'){

            var DimID = lastMove[0][1];

            for(var i = 0; i < arcArray.length; i++){
                if(arcArray[i].arcID == DimID){
                    a = arcArray[i];
                }
            }

            var savedLine1 = a.line1ID;
            var savedLine2 = a.line2ID;

            var undoArc = JSON.parse(JSON.stringify(a));

            for(var k = 0; k < linearDimArray.length; k++){
                if(linearDimArray[k].elementID == DimID){
                    var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
                }
            }

            for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == savedLine1){
                    var undoLine1 = JSON.parse(JSON.stringify(lineArray[k]));
                }
                else if(lineArray[k].lineID == savedLine2){
                    var undoLine2 = JSON.parse(JSON.stringify(lineArray[k]));
                }
            }

            for(var k = 0; k < linearDimArray.length; k++){
                if(linearDimArray[k].elementID == savedLine1){
                    var undoLinearDim1 = JSON.parse(JSON.stringify(linearDimArray[k]));
                }
                else if(linearDimArray[k].elementID == savedLine2){
                    var undoLinearDim2 = JSON.parse(JSON.stringify(linearDimArray[k]));
                }
            }

            for(var k = 0; k < AngularDimArray.length; k++){
                if(AngularDimArray[k].elementID == savedLine1){
                    var undoAngularDim1 = JSON.parse(JSON.stringify(AngularDimArray[k]));
                }
                else if(AngularDimArray[k].elementID == savedLine2){
                    var undoAngularDim2 = JSON.parse(JSON.stringify(AngularDimArray[k]));
                }
            }

            lastMove.push(['changefilletradius', DimID, undoLine1, undoLine2, undoArc, undoLinearDim, undoLinearDim1, undoLinearDim2, undoAngularDim1, undoAngularDim2]);
        }

    //Do a check to see if any null properties were pushed into lastMove array:

    var checkLastMove = lastMove[lastMove.length - 1];
    for(var i = 0; i < checkLastMove.length; i++){
        if(checkLastMove[i] === null){
            ////console.log('contains null!', checkLastMove);
        }
    }
}


function RedoOneStep(){
    //allow user one undo on the undo. hit ctrl z by accident? redo that last undo.


    if(redoMoves.length > 0){
        lastMove1 = redoMoves[redoMoves.length -1];
        //Get the 1 index in the array. That's the redo move.
        lastMove = lastMove1[1];

        if(lastMove[0] == 'newline'){
            //Push the saved line object back into the lineArray
            var lineToPush = new Line(lastMove[2].startx, lastMove[2].starty, lastMove[2].endx, lastMove[2].endy, lastMove[2].dim, lastMove[2].lineID, lastMove[2].lineLength, lastMove[2].constLine, lastMove[2].angle, lastMove[2].startxghost,lastMove[2].startyghost,lastMove[2].endxghost, lastMove[2].endyghost, lastMove[2].midpointX, lastMove[2].midpointY);
            lineArray.push(lineToPush);

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[3].value, lastMove[3].x, lastMove[3].y, lastMove[3].elementID, lastMove[3].showDim, lastMove[3].startx, lastMove[3].starty, lastMove[3].endx, lastMove[3].endy, lastMove[3].orientation, lastMove[3].startx1, lastMove[3].starty1, lastMove[3].endx1, lastMove[3].endy1, lastMove[3].startx2, lastMove[3].starty2, lastMove[3].endx2, lastMove[3].endy2,lastMove[3].type,lastMove[3].angle,lastMove[3].xoffset1,lastMove[3].yoffset1, lastMove[3].xoffset2, lastMove[3].yoffset2, lastMove[3].perpOffset));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[4].value, lastMove[4].x, lastMove[4].y, lastMove[4].elementID, lastMove[4].showDim, lastMove[4].startx, lastMove[4].starty));
        }


        else if(lastMove[0] == 'newfillet'){

            //push saved fillet object back into the arcArray:
            arcArray.push(new Arc(lastMove[1].centroidx, lastMove[1].centroidy, lastMove[1].radius, lastMove[1].radstart, lastMove[1].radend, lastMove[1].arcID, lastMove[1].Case, lastMove[1].fx, lastMove[1].fy, lastMove[1].groupID, lastMove[1].color, lastMove[1].endpoint1x, lastMove[1].endpoint1y, lastMove[1].endpoint2x, lastMove[1].endpoint2y,lastMove[1].line1ID, lastMove[1].line2ID));

            //push saved lineardimension object back into lineardimarray:
    		linearDimArray.push(new LinearDimension(lastMove[2].value, lastMove[2].x, lastMove[2].y, lastMove[2].elementID, lastMove[2].showDim, lastMove[2].startx, lastMove[2].starty, lastMove[2].endx, lastMove[2].endy, lastMove[2].orientation, lastMove[2].startx1, lastMove[2].starty1, lastMove[2].endx1, lastMove[2].endy1, lastMove[2].startx2, lastMove[2].starty2, lastMove[2].endx2, lastMove[2].endy2,lastMove[2].type,lastMove[2].angle,lastMove[2].xoffset1,lastMove[2].yoffset1, lastMove[2].xoffset2, lastMove[2].yoffset2, lastMove[2].perpOffset));

            //lastMove[3] is the first line that was shortened.

            //lastMove[4] is the other line that was shortened.

            //replace the lines that were shortened with their pre-shortened data:
            for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[3].lineID){
                    var lineToSplice = new Line(lastMove[3].startx, lastMove[3].starty, lastMove[3].endx, lastMove[3].endy, lastMove[3].dim, lastMove[3].lineID, lastMove[3].lineLength, lastMove[3].constLine, lastMove[3].angle, lastMove[3].startxghost,lastMove[3].startyghost,lastMove[3].endxghost, lastMove[3].endyghost, lastMove[3].midpointX, lastMove[3].midpointY);
                    lineArray.splice(k,1,lineToSplice);
                    updateLinearDimension(lineToSplice.lineID);
                }
                else if(lineArray[k].lineID == lastMove[4].lineID){
                    var lineToSplice = new Line(lastMove[4].startx, lastMove[4].starty, lastMove[4].endx, lastMove[4].endy, lastMove[4].dim, lastMove[4].lineID, lastMove[4].lineLength, lastMove[4].constLine, lastMove[4].angle, lastMove[4].startxghost,lastMove[4].startyghost,lastMove[4].endxghost, lastMove[4].endyghost, lastMove[4].midpointX, lastMove[4].midpointY);
                    lineArray.splice(k,1,lineToSplice);
                    updateLinearDimension(lineToSplice.lineID);
                }
            }
        }

        else if(lastMove[0] == 'deleteline'){
            deleteline(lastMove[1],true);
        }

        else if(lastMove[0] == 'deletefillet'){
            ////console.log('Redo: ', lastMove);
            deletefillet(lastMove[1], true, false);
            /*
            //replace the lines that were shortened with their pre-shortened data:
            for(var k = 0; k < lineArray.length; k++){
                if(lineArray[k].lineID == lastMove[0][2].lineID){
                    var lineToSplice = new Line(lastMove[0][2].startx, lastMove[0][2].starty, lastMove[0][2].endx, lastMove[0][2].endy, lastMove[0][2].dim, lastMove[0][2].lineID, lastMove[0][2].lineLength, lastMove[0][2].constLine, lastMove[0][2].angle, lastMove[0][2].startxghost,lastMove[0][2].startyghost,lastMove[0][2].endxghost, lastMove[0][2].endyghost, lastMove[0][2].midpointX, lastMove[0][2].midpointY);
                    lineArray.splice(k,1,lineToSplice);
                    updateLinearDimension(lineToSplice.lineID);
                }
                else if(lineArray[k].lineID == lastMove[0][3].lineID){
                    var lineToSplice = new Line(lastMove[0][3].startx, lastMove[0][3].starty, lastMove[0][3].endx, lastMove[0][3].endy, lastMove[0][3].dim, lastMove[0][3].lineID, lastMove[0][3].lineLength, lastMove[0][3].constLine, lastMove[0][3].angle, lastMove[0][3].startxghost,lastMove[0][3].startyghost,lastMove[0][3].endxghost, lastMove[0][3].endyghost, lastMove[0][3].midpointX, lastMove[0][3].midpointY);
                    lineArray.splice(k,1,lineToSplice);
                    updateLinearDimension(lineToSplice.lineID);
                }
            }
            */
        }

        else if(lastMove[0] == 'snipline'){

            //Delete the line that had the changed length, that's stored as the 1 index in the array.
            deleteline(lastMove[1].lineID, true);

            //Push the saved line object back into the lineArray
            var lineToPush = new Line(lastMove[1].startx, lastMove[1].starty, lastMove[1].endx, lastMove[1].endy, lastMove[1].dim, lastMove[1].lineID, lastMove[1].lineLength, lastMove[1].constLine, lastMove[1].angle,lastMove[1].startxghost,lastMove[1].startyghost,lastMove[1].endxghost, lastMove[1].endyghost, lastMove[1].midpointX, lastMove[1].midpointY);
            lineArray.push(lineToPush);

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[2].value, lastMove[2].x, lastMove[2].y, lastMove[2].elementID, lastMove[2].showDim, lastMove[2].startx, lastMove[2].starty, lastMove[2].endx, lastMove[2].endy, lastMove[2].orientation, lastMove[2].startx1, lastMove[2].starty1, lastMove[2].endx1, lastMove[2].endy1, lastMove[2].startx2, lastMove[2].starty2, lastMove[2].endx2, lastMove[2].endy2,lastMove[2].type,lastMove[2].angle,lastMove[2].xoffset1,lastMove[2].yoffset1, lastMove[2].xoffset2, lastMove[2].yoffset2, lastMove[2].perpOffset));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[3].value, lastMove[3].x, lastMove[3].y, lastMove[3].elementID, lastMove[3].showDim, lastMove[3].startx, lastMove[3].starty));

            updateLinearDimension(lastMove[1].lineID);

            removeZeroLengthLines();

            if(lastMove[6] != undefined){
                //Push the saved line object back into the lineArray
                var lineToPush = new Line(lastMove[4].startx, lastMove[4].starty, lastMove[4].endx, lastMove[4].endy, lastMove[4].dim, lastMove[4].lineID, lastMove[4].lineLength, lastMove[4].constLine, lastMove[4].angle,lastMove[4].startxghost,lastMove[4].startyghost,lastMove[4].endxghost, lastMove[4].endyghost, lastMove[4].midpointX, lastMove[4].midpointY);

                lineArray.push(lineToPush);

                //push saved lineardimension object back into lineardimArray
    			linearDimArray.push(new LinearDimension(lastMove[5].value, lastMove[5].x, lastMove[5].y, lastMove[5].elementID, lastMove[5].showDim, lastMove[5].startx, lastMove[5].starty, lastMove[5].endx, lastMove[5].endy, lastMove[5].orientation, lastMove[5].startx1, lastMove[5].starty1, lastMove[5].endx1, lastMove[5].endy1, lastMove[5].startx2, lastMove[5].starty2, lastMove[5].endx2, lastMove[5].endy2,lastMove[5].type,lastMove[5].angle,lastMove[5].xoffset1,lastMove[5].yoffset1, lastMove[5].xoffset2, lastMove[5].yoffset2, lastMove[5].perpOffset));
                //z...
                //push saved angular dimension object back into angulardimarray
                AngularDimArray.push(new AngularDimension(lastMove[6].value, lastMove[6].x, lastMove[6].y, lastMove[6].elementID, lastMove[6].showDim, lastMove[6].startx, lastMove[6].starty));
                updateLinearDimension(lastMove[4].lineID);
            }

        }

        else if(lastMove[0] == 'snipfillet'){
            //delete the arc that has been created.
            deletefillet(lastMove[1], true, true);
            //replace it with the two arcs created in the snip.

            //push saved fillet object back into the arcArray:
            arcArray.push(new Arc(lastMove[2].centroidx, lastMove[2].centroidy, lastMove[2].radius, lastMove[2].radstart, lastMove[2].radend, lastMove[2].arcID, lastMove[2].Case, lastMove[2].fx, lastMove[2].fy, lastMove[2].groupID, lastMove[2].color, lastMove[2].endpoint1x, lastMove[2].endpoint1y, lastMove[2].endpoint2x, lastMove[2].endpoint2y, lastMove[2].line1ID, lastMove[2].line2ID));

            //push saved lineardimension object back into lineardimarray:
    		linearDimArray.push(new LinearDimension(lastMove[4].value, lastMove[4].x, lastMove[4].y, lastMove[4].elementID, lastMove[4].showDim, lastMove[4].startx, lastMove[4].starty, lastMove[4].endx, lastMove[4].endy, lastMove[4].orientation, lastMove[4].startx1, lastMove[4].starty1, lastMove[4].endx1, lastMove[4].endy1, lastMove[4].startx2, lastMove[4].starty2, lastMove[4].endx2, lastMove[4].endy2,lastMove[4].type,lastMove[4].angle,lastMove[4].xoffset1,lastMove[4].yoffset1, lastMove[4].xoffset2, lastMove[4].yoffset2, lastMove[4].perpOffset));


            if(lastMove[3] != 999){
              //push saved fillet object back into the arcArray:
            arcArray.push(new Arc(lastMove[3].centroidx, lastMove[3].centroidy, lastMove[3].radius, lastMove[3].radstart, lastMove[3].radend, lastMove[3].arcID, lastMove[3].Case, lastMove[3].fx, lastMove[3].fy, lastMove[3].groupID, lastMove[3].color, lastMove[3].endpoint1x, lastMove[3].endpoint1y, lastMove[3].endpoint2x, lastMove[3].endpoint2y, lastMove[3].line1ID, lastMove[3].line2ID));

            //push saved lineardimension object back into lineardimarray:
    		linearDimArray.push(new LinearDimension(lastMove[5].value, lastMove[5].x, lastMove[5].y, lastMove[5].elementID, lastMove[5].showDim, lastMove[5].startx, lastMove[5].starty, lastMove[5].endx, lastMove[5].endy, lastMove[5].orientation, lastMove[5].startx1, lastMove[5].starty1, lastMove[5].endx1, lastMove[5].endy1, lastMove[5].startx2, lastMove[5].starty2, lastMove[5].endx2, lastMove[5].endy2,lastMove[5].type,lastMove[5].angle,lastMove[5].xoffset1,lastMove[5].yoffset1, lastMove[5].xoffset2, lastMove[5].yoffset2, lastMove[5].perpOffset));

            }

        }

        else if(lastMove[0] == 'movedim'){
            moveDim(lastMove[3],lastMove[4], lastMove[1], lastMove[2]);
        }


        else if(lastMove[0] == 'hsdim'){
            if(lastMove[2] == 'linear'){
    		    for(var k = 0; k < linearDimArray.length; k++){
    		        if(linearDimArray[k].elementID == lastMove[1]){
    		            linearDimArray[k].showDim = lastMove[3];
    		        }
    		    }
            }
            else if(lastMove[2] == 'angular'){
    		    for(var k = 0; k < AngularDimArray.length; k++){
    		        if(AngularDimArray[k].elementID == lastMove[1]){
    		            AngularDimArray[k].showDim = lastMove[3];
    		        }
    		    }
            }
        }

        else if(lastMove[0] == 'changedim'){
            //First, get rid of the resized line.
            deleteline(lastMove[1].lineID,true);

            //Push the saved line object back into the lineArray
            var lineToPush = new Line(lastMove[1].startx, lastMove[1].starty, lastMove[1].endx, lastMove[1].endy, lastMove[1].dim, lastMove[1].lineID, lastMove[1].lineLength, lastMove[1].constLine, lastMove[1].angle, lastMove[1].startxghost,lastMove[1].startyghost,lastMove[1].endxghost, lastMove[1].endyghost, lastMove[1].midpointX, lastMove[1].midpointY);
            lineArray.push(lineToPush);

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[2].value, lastMove[2].x, lastMove[2].y, lastMove[2].elementID, lastMove[2].showDim, lastMove[2].startx, lastMove[2].starty, lastMove[2].endx, lastMove[2].endy, lastMove[2].orientation, lastMove[2].startx1, lastMove[2].starty1, lastMove[2].endx1, lastMove[2].endy1, lastMove[2].startx2, lastMove[2].starty2, lastMove[2].endx2, lastMove[2].endy2,lastMove[2].type,lastMove[2].angle,lastMove[2].xoffset1,lastMove[2].yoffset1, lastMove[2].xoffset2, lastMove[2].yoffset2, lastMove[2].perpOffset));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[3].value, lastMove[3].x, lastMove[3].y, lastMove[3].elementID, lastMove[3].showDim, lastMove[3].startx, lastMove[3].starty));
        }

        else if(lastMove[0] == 'newreldim'){
            //push saved reldim back into relAngleArray:
            relAngleArray.push(new AngleRelDimension(lastMove[1].value, lastMove[1].x, lastMove[1].y, lastMove[1].elementID, lastMove[1].showDim, lastMove[1].radstart, lastMove[1].radend, lastMove[1].centroidx, lastMove[1].centroidy, lastMove[1].radius, lastMove[1].line1ID, lastMove[1].line2ID, lastMove[1].direction, lastMove[1].handlex, lastMove[1].handley, lastMove[1].changemarkerx, lastMove[1].changemarkery));
        }

        else if(lastMove[0] == 'deletereldim'){
            //delete that reldim.
            deletedim(lastMove[1]);
        }

        else if(lastMove[0] == 'changerelangledim'){
            //First, get rid of the resized line.
            deleteline(lastMove[1].lineID,true);

            //Push the saved line object back into the lineArray
            var lineToPush = new Line(lastMove[1].startx, lastMove[1].starty, lastMove[1].endx, lastMove[1].endy, lastMove[1].dim, lastMove[1].lineID, lastMove[1].lineLength, lastMove[1].constLine, lastMove[1].angle, lastMove[1].startxghost,lastMove[1].startyghost,lastMove[1].endxghost, lastMove[1].endyghost, lastMove[1].midpointX, lastMove[1].midpointY);
            lineArray.push(lineToPush);

            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[2].value, lastMove[2].x, lastMove[2].y, lastMove[2].elementID, lastMove[2].showDim, lastMove[2].startx, lastMove[2].starty, lastMove[2].endx, lastMove[2].endy, lastMove[2].orientation, lastMove[2].startx1, lastMove[2].starty1, lastMove[2].endx1, lastMove[2].endy1, lastMove[2].startx2, lastMove[2].starty2, lastMove[2].endx2, lastMove[2].endy2,lastMove[2].type,lastMove[2].angle,lastMove[2].xoffset1,lastMove[2].yoffset1, lastMove[2].xoffset2, lastMove[2].yoffset2, lastMove[2].perpOffset));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[3].value, lastMove[3].x, lastMove[3].y, lastMove[3].elementID, lastMove[3].showDim, lastMove[3].startx, lastMove[3].starty));

            //delete the dimesnion:
            deletedim(lastMove[4].elementID);

            //push the reldim back in.
            relAngleArray.push(new AngleRelDimension(lastMove[4].value, lastMove[4].x, lastMove[4].y, lastMove[4].elementID, lastMove[4].showDim, lastMove[4].radstart, lastMove[4].radend, lastMove[4].centroidx, lastMove[4].centroidy, lastMove[4].radius, lastMove[4].line1ID, lastMove[4].line2ID, lastMove[4].direction, lastMove[4].handlex, lastMove[4].handley, lastMove[4].changemarkerx, lastMove[4].changemarkery));
        }

        else if(lastMove[0] == 'movedhandle'){
            //place the handle back where it came from.
            moveHandle(lastMove[2], lastMove[3], 'nonabsolute', lastMove[1]);
        }

        else if(lastMove[0] == 'changefilletradius'){
            //Delete the old sized fillet.
            deletefillet(lastMove[1],true);

            //Delete the old sized line1.
            deleteline(lastMove[2].lineID,true);

            //Delete the old sized line2.
            deleteline(lastMove[3].lineID,true);

            var lindex = 2;
            //Push the saved line1 object back into the lineArray
            var lineToPush = new Line(lastMove[lindex].startx, lastMove[lindex].starty, lastMove[lindex].endx, lastMove[lindex].endy, lastMove[lindex].dim, lastMove[lindex].lineID, lastMove[lindex].lineLength, lastMove[lindex].constLine, lastMove[lindex].angle,  lastMove[lindex].startxghost,lastMove[lindex].startyghost,lastMove[lindex].endxghost, lastMove[lindex].endyghost, lastMove[lindex].midpointX, lastMove[lindex].midpointY);
            lineArray.push(lineToPush);

            lindex = 3;
            //Push the saved line2 object back into the lineArray
            var lineToPush = new Line(lastMove[lindex].startx,lastMove[lindex].starty, lastMove[lindex].endx, lastMove[lindex].endy, lastMove[lindex].dim, lastMove[lindex].lineID, lastMove[lindex].lineLength, lastMove[lindex].constLine, lastMove[lindex].angle,  lastMove[lindex].startxghost,lastMove[lindex].startyghost,lastMove[lindex].endxghost, lastMove[lindex].endyghost, lastMove[lindex].midpointX, lastMove[lindex].midpointY);
            lineArray.push(lineToPush);

            //4 is the arc that must be pushed back into the array.
           //push saved fillet object back into the arcArray:
            arcArray.push(new Arc(lastMove[4].centroidx, lastMove[4].centroidy, lastMove[4].radius, lastMove[4].radstart, lastMove[4].radend, lastMove[4].arcID, lastMove[4].Case, lastMove[4].fx, lastMove[4].fy, lastMove[4].groupID, lastMove[4].color, lastMove[4].endpoint1x, lastMove[4].endpoint1y, lastMove[4].endpoint2x, lastMove[4].endpoint2y,lastMove[4].line1ID, lastMove[4].line2ID));

            var ldindex = 5;
            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[ldindex].value, lastMove[ldindex].x, lastMove[ldindex].y, lastMove[ldindex].elementID, lastMove[ldindex].showDim, lastMove[ldindex].startx, lastMove[ldindex].starty, lastMove[ldindex].endx, lastMove[ldindex].endy, lastMove[ldindex].orientation, lastMove[ldindex].startx1, lastMove[ldindex].starty1, lastMove[ldindex].endx1, lastMove[ldindex].endy1, lastMove[ldindex].startx2, lastMove[ldindex].starty2, lastMove[ldindex].endx2, lastMove[ldindex].endy2,lastMove[ldindex].type,lastMove[ldindex].angle,lastMove[ldindex].xoffset1,lastMove[ldindex].yoffset1, lastMove[ldindex].xoffset2, lastMove[ldindex].yoffset2, lastMove[ldindex].perpOffset));
            //5 is the linear dim that must be pushed back into the array.

            ldindex = 6;
            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[ldindex].value, lastMove[ldindex].x, lastMove[ldindex].y, lastMove[ldindex].elementID, lastMove[ldindex].showDim, lastMove[ldindex].startx, lastMove[ldindex].starty, lastMove[ldindex].endx, lastMove[ldindex].endy, lastMove[ldindex].orientation, lastMove[ldindex].startx1, lastMove[ldindex].starty1, lastMove[ldindex].endx1, lastMove[ldindex].endy1, lastMove[ldindex].startx2, lastMove[ldindex].starty2, lastMove[ldindex].endx2, lastMove[ldindex].endy2,lastMove[ldindex].type,lastMove[ldindex].angle,lastMove[ldindex].xoffset1,lastMove[ldindex].yoffset1, lastMove[ldindex].xoffset2, lastMove[ldindex].yoffset2, lastMove[ldindex].perpOffset));
            //5 is the linear dim that must be pushed back into the array.

            ldindex = 7;
            //push saved lineardimension object back into lineardimArray
			linearDimArray.push(new LinearDimension(lastMove[ldindex].value, lastMove[ldindex].x, lastMove[ldindex].y, lastMove[ldindex].elementID, lastMove[ldindex].showDim, lastMove[ldindex].startx, lastMove[ldindex].starty, lastMove[ldindex].endx, lastMove[ldindex].endy, lastMove[ldindex].orientation, lastMove[ldindex].startx1, lastMove[ldindex].starty1, lastMove[ldindex].endx1, lastMove[ldindex].endy1, lastMove[ldindex].startx2, lastMove[ldindex].starty2, lastMove[ldindex].endx2, lastMove[ldindex].endy2,lastMove[ldindex].type,lastMove[ldindex].angle,lastMove[ldindex].xoffset1,lastMove[ldindex].yoffset1, lastMove[ldindex].xoffset2, lastMove[ldindex].yoffset2, lastMove[ldindex].perpOffset));
            //5 is the linear dim that must be pushed back into the array.

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[8].value, lastMove[8].x, lastMove[8].y, lastMove[8].elementID, lastMove[8].showDim, lastMove[8].startx, lastMove[8].starty));

            //push saved angulard dimension object back into angulardimarray
            AngularDimArray.push(new AngularDimension(lastMove[9].value, lastMove[9].x, lastMove[9].y, lastMove[9].elementID, lastMove[9].showDim, lastMove[9].startx, lastMove[9].starty));
        }

    var dataToPush = JSON.parse(JSON.stringify(redoMoves[redoMoves.length-1]));
    userMoves.push(dataToPush);
    redoMoves.pop([redoMoves.length-1]);
    closeOrOpenSection();
    ////console.log(userMoves);
    }

}
/*/detects pressing of d key "for add dimension":
window.addEventListener("keyup", function(event) {
  if (event.keyCode === 68) {
   event.preventDefault();
  //pull focus away from the dimension input box:
	document.getElementById("inputBox").blur();
	document.getElementById("inputBox").value = "";
	displayDimension();
  }
});
*/

/*
//detects pressing of q key for toggle H/V snaps.
window.addEventListener("keyup", function(event) {
  if (event.keyCode === 81) {
   event.preventDefault();
   if(HVSnap == false){
		HVSnap = true;
   }
   else{
	   HVSnap = false;
   }
  }
});
*/

//This function deletes lines when they are selected and shift is pressed.
window.addEventListener("keyup", function(event) {
/*
  if((event.keyCode === 46 || event.keyCode === 8) && InputFreze != true) {
   event.preventDefault();
	var selectedLine = isonline(mouse.x, mouse.y, 'UI');
	var selectedFillet = isonfillet(mouse.x, mouse.y);
	unConnectedLinesArray = [];

	if(selectedLine != 999 && AllowDeleteLines == true){
		deleteline(selectedLine);
		deletedim(selectedLine);
		Redraw();
	}

	if(selectedFillet != 999 && AllowDeleteLines == true){
		deletefillet(selectedFillet);
		deletedim(selectedFillet);
		Redraw();
	}

	else if(selectedLine != 999 && AllowDeleteLines == false){
		for(var i = 0; i <lineArray.length; i++){
			l = lineArray[i];
			if(l.lineID == selectedLine){
				if(l.constLine == true){
					deleteline(selectedLine);
					deletedim(selectedLine);
					Redraw();
				}
			}
		}
	}


	selectedEndpointArray = isonendpoint();

	if(selectedEndpointArray[0] == true && AllowDeleteLines == true){
		lineIDtoDelete = selectedEndpointArray[3];
		deleteline(lineIDtoDelete);
		deletedim(lineIDtoDelete);
		Redraw();
	}

	else if(selectedEndpointArray[0] == true && AllowDeleteLines == false){
		for(var i = 0; i <lineArray.length; i++){
			l = lineArray[i];
			if(l.lineID == selectedEndpointArray[3]){
				if(l.constLine == true){
					deleteline(selectedEndpointArray[3]);
					deletedim(selectedEndpointArray[3]);
					Redraw();
				}
			}
		}
	}

	if(isondim(mouse.x,mouse.y) != 999){
        var dim = isondim(mouse.x,mouse.y);
        if(dim[1] == "linear" || dim[1] == "fillet"){
            for(var i = 0; i < linearDimArray.length; i++){
    			d = linearDimArray[i];
    			if(d.elementID == dim[0]){
    			    var undoLineID = dim[0];
    			    var undoShowDim = d.showDim;
                    updateUserMoves(['hsdim', undoLineID, 'linear', undoShowDim]);
    			    GenerateInverse();
    			    d.showDim = false;
        		}
        	}
        }
        else if(dim[1] == "angular"){
             for(var i = 0; i < AngularDimArray.length; i++){
    			a = AngularDimArray[i];
    			if(a.elementID == dim[0]){
    			    var undoLineID = dim[0];
    			    var undoShowDim = a.showDim;
                    updateUserMoves(['hsdim', undoLineID, 'angular', undoShowDim]);
    			    GenerateInverse();
    			    a.showDim = false;
        		}
        	}
        }

        else if(dim[1] == "relangular"){
             for(var i = 0; i < relAngleArray.length; i++){
    			a = relAngleArray[i];
    			if(a.elementID == dim[0]){
    			    //e...
    			    var deletedRelDim = JSON.parse(JSON.stringify(relAngleArray[i]));
                    updateUserMoves(['deletereldim', deletedRelDim]);
                    GenerateInverse();
                    deletedim(a.elementID);
        		}
        	}
        }

    }

  }
  Redraw();
  */
});
/*

//This function toggles construction line mode when s is pressed.
window.addEventListener("keyup", function(event) {
  if (event.keyCode === 83) {
	  event.preventDefault();
	  //Because we only want to be able to create construction lines in loads mode, this conditional is needed.
	  if(drawingMode != 'loads' && ConstructionLineMode == false){
			ConstructionLineMode = true;
	  }
	  else if(ConstructionLineMode == true){
		  ConstructionLineMode = false;
	  }
  //pull focus away from the dimension input box:
	document.getElementById("inputBox").blur();
	document.getElementById("inputBox").value = "";
  }
});
*/

//When the mouse is moved, this function fires.
window.addEventListener('mousemove', function(event){
    ////console.log('mousemove');
    if(InputFreze == false){
    //Get mouse location whenever the mouse is moved:
    	CanvasRect = canvas.getBoundingClientRect();

    	mouse.x = event.clientX - CanvasRect.left;
    	mouse.y = event.clientY - CanvasRect.top;

    	snipcursor.style.transform = `translate(${mouse.x-15}px, ${mouse.y-15}px)`;

    	erasecursor.style.transform = `translate(${mouse.x-15}px, ${mouse.y-15}px)`;

    	//Determine dragging state:
    	if(mouseState == 'down'){
    		mouseState = 'dragging';
    	}
    	else if(mouseState == 'dragging'){
    		mouseState == 'dragging';
    	}
    	else{
    		mouseState = 'moving';
    	}
    	mainLoop();
    }

})

//When the mouse is clicked down, this function fires.
window.addEventListener('mousedown', function(event){
    ////console.log('mousedown');
    //NEW:
    	CanvasRect = canvas.getBoundingClientRect();

    	mouse.x = event.clientX - CanvasRect.left;
    	mouse.y = event.clientY - CanvasRect.top;
    //END NEW.

    if(InputFreze == false){
        if(activeChangeTag() && document.getElementById('inputBox').value != ''){
            enterPressed();
        }
	    mouseState = 'down';
	    mainLoop();
	    resetChangeTag();
    }
    })

//When the mouse is released, this function fires.
window.addEventListener('mouseup', function(event){
    ////console.log('mouseup');
    //NEW:
    	CanvasRect = canvas.getBoundingClientRect();

    	mouse.x = event.clientX - CanvasRect.left;
    	mouse.y = event.clientY - CanvasRect.top;
    //END NEW.

    if(InputFreze == false){
	    mouseState = 'up';
	    mainLoop();
	    if(Scale == 0){
	        //document.getElementById('inputBox').value = "";
    	    //document.getElementById("inputBox").focus();
    	    //document.getElementById("inputBox").select;
	    }
    }
    Redraw();
    //This software was written on hardware that automatically triggers a mousemove event after mouseup - this compensates if the hardware doesn't do that.
    //Get the location of the mouse at mouseup so it can be pumped into the mosuemove event.

    var currentmousex = mouse.x;
    var currentmousey = mouse.y;

    var mouseMoveEvent = document.createEvent("MouseEvents");

    mouseMoveEvent.initMouseEvent(
               "mousemove", //event type : click, mousedown, mouseup, mouseover, mousemove, mouseout.
               true, //canBubble
               false, //cancelable
               window, //event's AbstractView : should be window
               1, // detail : Event's mouse click count
               currentmousex, // screenX
               currentmousey, // screenY
               currentmousex, // clientX
               currentmousey, // clientY
               false, // ctrlKey
               false, // altKey
               false, // shiftKey
               false, // metaKey
               1, // button : 0 = click, 1 = middle button, 2 = right button
               null // relatedTarget : Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
    );

    document.dispatchEvent(mouseMoveEvent)

})


//For touch devices////////////////////////////////////////////////////////////////////////////////

function touchHandler(event){
    //if(mouseInDrawingArea() == true && document.getElementById("smokescreen").style.visibility == "hidden" && mouseInRadiusBox() != true && mouseInRG() != true){
    if(mouseInDrawingArea() == true && document.getElementById("smokescreen").style.visibility == "hidden" && mouseInRG() != true){
        event.preventDefault();
        event.stopPropagation();
    }
    TouchMode = true;

    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);

}

function init()
{
    document.addEventListener("touchstart", touchHandler, false);
    document.addEventListener("touchmove", touchHandler, false);
    document.addEventListener("touchend", touchHandler, false);
    document.addEventListener("touchcancel", touchHandler, false);
}


//Additionally on any keystroke, run the mainloop.

document.onkeyup = function (event){

     if(InputFreze == false){
        //Shortcut keys for entering modes:
        if(event.which == 76){
            Button2Clicked();
        }
        if(event.which == 67){
            ConstLinesClicked();
        }
        if(event.which == 70){
            Button3Clicked();
        }
        if(event.which == 84){
            SnipClicked();
        }
        if(event.which == 69){
            EraseClicked();
        }
        if(event.which == 68){
            DimLinesClicked();
        }
        if(event.which == 65){
            DimAnglessClicked();
        }
        //handle control snap-toggle flag.
        if(event.which == 17){
            ControlDown = false;
        }

        //Get inputs from input box or fillet radius box.
	    var ret = document.getElementById("inputBox").value;
	    if((isNaN(ret) == true) && ret != '.'){
            ChangePreviewValue = null;
            document.getElementById("inputBox").value = "";
	    }
	    else{
	        if((event.which >95) && (event.which < 106) || event.which== 8 || event.which== 110 || (event.which >47) && (event.which < 58) || event.which == 190){
                ChangePreviewValue = ret;
	        }
	    }
	    //var rad = document.getElementById("filletRadius").value;
        mainLoop();
        if(drawingMode != 'fillets'){
            //if a number button is pressed when the changepreviewvalue is in the input box, erase it go into number entry mode.
    	    if((event.which >95) && (event.which < 106) || event.which== 8 || event.which== 110 || (event.which >47) && (event.which < 58) || event.which == 190){
                if(ret != null && ret != "" && ret!="."){
                    if(String(ret).match(/\d/g).length>10){
                        document.getElementById('inputBox').value = "";
            	        document.getElementById("inputBox").focus();
            	        document.getElementById("inputBox").select;
                    }
                }
            }
        }
    }
}


document.onkeydown = function (event){

        //Set flag based on control key. Need to know when this is being held down.
        if(event.which == 17){
            ControlDown = true;
        }

    	var ret = document.getElementById("inputBox").value;
        if(drawingMode != 'fillets'){
            //if a number button is pressed when the changepreviewvalue is in the input box, erase it go into number entry mode.
    	    if((event.which >95) && (event.which < 106) || event.which== 8 || event.which== 110 || (event.which >47) && (event.which < 58) || event.which == 190){
                ////console.log('keyup triggered');
                if(ret != null && ret != "" && ret!="."){
                    if(String(ret).match(/\d/g).length>10){
                        document.getElementById('inputBox').value = "";
            	        document.getElementById("inputBox").focus();
            	        document.getElementById("inputBox").select;
                    }
                }
            }
        }
}



///////////////END OF GUI SECTION////////////////////////////////////



///////////////START OF SECTION PROPERTIES CALCULATION SECTION///////
//Things to caluclate with version 1.0
//Area of the section
//Centroid of the section
//Moments of inertia of the section.
//Q for calculation of shear flow.

var shapesArray = [];

//inputs:

//Rectangles: centroid x, centroid y, base, height
//fillets: centroid x, centroid y, radius, add or subtract
//chamfers: centroid x, centroid y, side length, add or subtract

function drawRectCentroids(gA){

	for(var i = 0; i < gA.length; i++){
		if(gA[i] == 'r'){
			var cx = gA[i+1];
			var cy = gA[i+2];
			drawCentroid(cx / Scale, cy / Scale);
		}
	}
}

function drawFilletCentroids(gA){

	for(var i = 0; i < gA.length; i++){
		if(gA[i] == 'f'){
			var cx = gA[i+1];
			var cy = gA[i+2];
			if(gA[i+4] == 'out'){
				drawAddpoint(cx / Scale, cy / Scale);
			}
			else if(gA[i+4] == 'in'){
				drawSubpoint(cx / Scale, cy / Scale);
			}
		}
	}
}

function drawChamferCentroids(gA){

	for(var i = 0; i < gA.length; i++){
		if(gA[i] == 'c'){
			var cx = gA[i+1];
			var cy = gA[i+2];
			if(gA[i+4] == 'out'){
				drawAddpoint(cx / Scale, cy / Scale);
			}
			else if(gA[i+4] == 'in'){
				drawSubpoint(cx / Scale, cy / Scale);
			}
		}
	}
}

//Reassign the data coming in through the geoArray to objects for easy assignment of properties.

//This function calculates the area and moments of inertia of all shapes.

function calcShapes(gA){
	var cx = 0;
	var cy = 0;
	var A = 0;
	var Ixx = 0;
	var Iyy = 0;
	var addorsubtract = 'null';
	var type = 'null';


	for(var i = 0; i < gA.length; i++){
		//for rectangles:
		if(gA[i] == 'r'){
			cx = gA[i+1];
			cy = gA[i+2];
			A = gA[i+3] * gA[i+4];
			Ixx = (1/12)* gA[i+3] * Math.pow(gA[i+4],3);
			Iyy = (1/12)* gA[i+4] * Math.pow(gA[i+3],3);
			addorsubtract = 'add';
			type = 'r';
			shapesArray.push(new Shape(cx, cy, A, Ixx, Iyy, addorsubtract, type));
		}
		//for fillets:
		if(gA[i] == 'f'){
			cx = gA[i+1];
			cy = gA[i+2];
			A = gA[i+3]*gA[i+3] * .2146;
			//Verify these:
			Ixx = Math.pow(gA[i+3],4) * .007545;
			Iyy = Math.pow(gA[i+3],4) * .007545;
			if(gA[i+4] == 'in'){
				addorsubtract = 'subtract';
			}
			else{
				addorsubtract = 'add';
			}
			type = 'f';
			shapesArray.push(new Shape(cx, cy, A, Ixx, Iyy, addorsubtract, type));
		}
		//for chamfers:
		if(gA[i] == 'c'){
			cx = gA[i+1];
			cy = gA[i+2];
			A = gA[i+3] * gA[i+3] / 2;
			Ixx = Math.pow(gA[i+3],4) / 36;
			Iyy = Math.pow(gA[i+3],4) / 36;
			if(gA[i+4] == 'in'){
				addorsubtract = 'subtract';
			}
			else{
				addorsubtract = 'add';
			}
			type = 'c';
			shapesArray.push(new Shape(cx, cy, A, Ixx, Iyy, addorsubtract,type));
		}

	}

}

function Shape(cx, cy, A, Ixx, Iyy, addorsubtract, type){

	this.cx = cx;
	this.cy = cy;
	this.A = A;
	this.Ixx = Ixx;
	this.Iyy = Iyy;
	this.addorsubtract = addorsubtract;
	this.type = type;

}

function findThinnestSection(gA){
	//This function looks at all rectangular shapes in the geometry array and returns the shape with the smallest base (thickness) dimension. This is the dimension of the rectangle in the x direction.
	var base = 0;
	var t = 10000;

	for(var i = 0; i < gA.length; i++){
		//for rectangles:
		if(gA[i] == 'r'){
			base = gA[i+3];
			if(base < t){
				t = base;
			}
		}
	}
	return t;
}


function stressAroundBound(lineArray, arcArray, Fx, Fy, Fz, Mx, My, Mz){

    var stepx = 0;
	var stepy = 0;
	var x = 0;
	var y = 0;;
    var pointsPerLine = 100;
	var BS = 0;
	var maxT = 0;
	var maxC = 0;
	var maxCx = 0;
	var maxCy = 0
	var maxTx = 0;
	var maxTy = 0;

    for(var i = 0; i < lineArray.length; i++){
        var l = lineArray[i];
		var xstart = l.startx;
		var ystart = l.starty;
		var xend = l.endx;
		var yend = l.endy;
		//take the difference between the start and end of each line and progress along that line at some specified resolution. IE create 1000 points along each line and check the bending stress at each.
		stepx = (xend - xstart) / pointsPerLine;
		stepy = (yend - ystart) / pointsPerLine;

		x = xstart;
		y = ystart;

		for(var j = 0; j < pointsPerLine; j++){
			BS = bendingStress(x,y,MasterArea,Fx,Fy,Fz,Mx,My,Mz)
			if(BS > 0){
				if(BS > maxT){
					maxT = BS;
					maxTx = x;
					maxTy = y;
				}
			}
			else if(BS <= 0){
				if(BS < maxC){
					maxC = BS;
					maxCx = x;
					maxCy = y;
				}
			}
			x = x + stepx;
			y = y + stepy;
		}
	}

	//Next, populate and check around arc locations.

	for(var k = 0; k< arcArray.length; k++){
		var a = arcArray[k];

		//Some treatement of the start and end radians:

		var rstart = 0;
		var rend = 0;

		if(a.radstart > Math.PI){
			rstart = Math.PI - a.radstart;
		}
		else if(a.radstart < -Math.PI){
			rstart = 2*Math.PI + a.radstart;
		}
		else{
			rstart = a.radstart;
		}

		if(a.radend > Math.PI){
			//rend = Math.PI - a.radend;
			rend = a.radend;
		}
		else if(a.radend < -Math.PI){
			rend = 2*Math.PI + a.radend;
		}
		else{
			rend = a.radend;
		}

		//Next, translate everything into a 0 to 2pi framework:
		//if the radian value is negative, take difference between abs value and PI. Add that to PI.

		if(rstart < 0){
			rstart = 2*Math.PI - Math.abs(rstart) ;
		}
		if(rend<0){
			rend = 2*Math.PI - Math.abs(rend);
		}

		//Now, flip direction so it is "standard":

		rstart = 2*Math.PI - rstart;
		rend = 2*Math.PI - rend;

		//radians now go from 0 to 2pi ccw. Easy to work with.

		//Figure out how many radians between start and end:

		var arcRads = 0;

		if(rstart > rend){
			arcRads = rstart - rend;
		}
		else if(rstart < rend){
			arcRads = rstart + 2*Math.PI-rend;
		}

		var arcIncrement = arcRads / 100;

        //if rstart is greater than rend, the arc doesn't cross the zero radian line, therefore just go from start to end.
        if(rstart > rend){
    	    for(var rTest = rstart; rTest > rend; rTest = rTest - arcIncrement){
    		    x = (a.centroidx*Scale + a.radius*Scale*Math.cos(rTest))/Scale;
    		    y = (a.centroidy*Scale - a.radius*Scale*Math.sin(rTest))/Scale;
    			BS = bendingStress(x,y,MasterArea,Fx,Fy,Fz,Mx,My,Mz)
    			if(BS > 0){
    				if(BS > maxT){
    					maxT = BS;
    					maxTx = x;
    					maxTy = y;
    				}
    			}
    			else if(BS <= 0){
    				if(BS < maxC){
    					maxC = BS;
    					maxCx = x;
    					maxCy = y;
    				}
    			}
    	    }
        }

        //if rend is greater than rstart, the arc crosses the zero radian line. Start at 2pi and subtract.
        if(rend > rstart){
        	for(var rTest = rstart; rTest > 0; rTest = rTest - arcIncrement){
        		x = (a.centroidx*Scale + a.radius*Scale*Math.cos(rTest))/Scale;
    		    y = (a.centroidy*Scale - a.radius*Scale*Math.sin(rTest))/Scale;
    			BS = bendingStress(x,y,MasterArea,Fx,Fy,Fz,Mx,My,Mz)
    			if(BS > 0){
    				if(BS > maxT){
    					maxT = BS;
    					maxTx = x;
    					maxTy = y;
    				}
    			}
    			else if(BS <= 0){
    				if(BS < maxC){
    					maxC = BS;
    					maxCx = x;
    					maxCy = y;
    				}
    			}
        	}

        	for(var rTest = 2*Math.PI; rTest >= rend; rTest = rTest - arcIncrement){
        		x = (a.centroidx*Scale + a.radius*Scale*Math.cos(rTest))/Scale;
    		    y = (a.centroidy*Scale - a.radius*Scale*Math.sin(rTest))/Scale;
    			BS = bendingStress(x,y,MasterArea,Fx,Fy,Fz,Mx,My,Mz)
    			if(BS > 0){
    				if(BS > maxT){
    					maxT = BS;
    					maxTx = x;
    					maxTy = y;
    				}
    			}
    			else if(BS <= 0){
    				if(BS < maxC){
    					maxC = BS;
    					maxCx = x;
    					maxCy = y;
    				}
    			}
        	}
        }
	}

	var retArray = [maxT, maxC, maxTx, maxTy, maxCx, maxCy];

	return retArray;

}

/*
function stressAroundBound(gA,fA,Area){
	//read in start and end points for lines. First, draw them for diagnostics. Next, calculate bending stress along that line at some ineterval.

	var pointsPerLine = 100;
	var stepx = 0;
	var stepy = 0;
	var x = 0;
	var y = 0;;
	var Fx = fA[0];
	var Fy = fA[1];
	var Fz = fA[2];
	var Mx = fA[3];
	var My = fA[4];
	var Mz = fA[5];
	var BS = 0;
	var maxT = 0;
	var maxC = 0;
	var maxCx = 0;
	var maxCy = 0
	var maxTx = 0;
	var maxTy = 0;

	var radPerPoint = (Math.PI / 2) / pointsPerLine;

	for(var i = 0; i < gA.length; i++){
		if(gA[i] == 'l'){
			var xstart = gA[i+1];
			var ystart = gA[i+2];
			var xend = gA[i+3];
			var yend = gA[i+4];
			//take the difference between the start and end of each line and progress along that line at some specified resolution. IE create 1000 points along each line and check the bending stress at each.
			stepx = (xend - xstart) / pointsPerLine;
			stepy = (yend - ystart) / pointsPerLine;

			x = xstart;
			y = ystart;

			for(var j = 0; j < pointsPerLine; j++){
				//drawEndpoint(x, y);
				BS = bendingStress(x,y,Area,Fx,Fy,Fz,Mx,My,Mz)
				if(BS > 0){
					if(BS > maxT){
						maxT = BS;
						maxTx = x;
						maxTy = y;
					}
				}
				else if(BS <= 0){
					if(BS < maxC){
						maxC = BS;
						maxCx = x;
						maxCy = y;
					}
				}
				x = x + stepx;
				y = y + stepy;
			}
		}
		if(gA[i] == 'a'){
			var cx = gA[i+1];
			var cy = gA[i+2];
			var rad = gA[i+3];
			var Case = gA[i+4];
			if(Case == 0){
				var theta = 0;
				for(var k = 0; k < pointsPerLine + 1; k++){
					x = cx + rad*Math.cos(theta);
					y = cy + rad*Math.sin(theta);

					BS = bendingStress(x,y,Area,Fx,Fy,Fz,Mx,My,Mz)
						if(BS > 0){
							if(BS > maxT){
								maxT = BS;
								maxTx = x;
								maxTy = y;
							}
						}
						else if(BS <= 0){
							if(BS < maxC){
								maxC = BS;
								maxCx = x;
								maxCy = y;
							}
						}

					drawEndpoint(x, y);
					theta = theta + radPerPoint;
				}
			}
			if(Case == 1){
				var theta = 0;
				for(var k = 0; k < pointsPerLine + 1; k++){
					x = cx - rad*Math.cos(theta);
					y = cy + rad*Math.sin(theta);

					BS = bendingStress(x,y,Area,Fx,Fy,Fz,Mx,My,Mz)
						if(BS > 0){
							if(BS > maxT){
								maxT = BS;
								maxTx = x;
								maxTy = y;
							}
						}
						else if(BS <= 0){
							if(BS < maxC){
								maxC = BS;
								maxCx = x;
								maxCy = y;
							}
						}

					drawEndpoint(x, y);
					theta = theta + radPerPoint;
				}
			}
			if(Case == 2){
				var theta = 0;
				for(var k = 0; k < pointsPerLine + 1; k++){
					x = cx - rad*Math.cos(theta);
					y = cy - rad*Math.sin(theta);

					BS = bendingStress(x,y,Area,Fx,Fy,Fz,Mx,My,Mz)
						if(BS > 0){
							if(BS > maxT){
								maxT = BS;
								maxTx = x;
								maxTy = y;
							}
						}
						else if(BS <= 0){
							if(BS < maxC){
								maxC = BS;
								maxCx = x;
								maxCy = y;
							}
						}

					drawEndpoint(x, y);
					theta = theta + radPerPoint;
				}
			}
			if(Case == 3){
						var theta = 0;
						for(var k = 0; k < pointsPerLine + 1; k++){
							x = cx + rad*Math.cos(theta);
							y = cy - rad*Math.sin(theta);

							BS = bendingStress(x,y,Area,Fx,Fy,Fz,Mx,My,Mz)
								if(BS > 0){
									if(BS > maxT){
										maxT = BS;
										maxTx = x;
										maxTy = y;
									}
								}
								else if(BS <= 0){
									if(BS < maxC){
										maxC = BS;
										maxCx = x;
										maxCy = y;
									}
								}

							drawEndpoint(x, y);
							theta = theta + radPerPoint;
						}
					}
				}
			if(gA[i] == 'h'){
						var xstart = gA[i+1];
						var ystart = gA[i+2];
						var xend = gA[i+3];
						var yend = gA[i+4];
						//take the difference between the start and end of each line and progress along that line at some specified resolution. IE create 1000 points along each line and check the bending stress at each.
						stepx = (xend - xstart) / pointsPerLine;
						stepy = (yend - ystart) / pointsPerLine;

						x = xstart;
						y = ystart;

						for(var j = 0; j < pointsPerLine; j++){
							x = x + stepx;
							y = y + stepy;
							BS = bendingStress(x,y,Area,Fx,Fy,Fz,Mx,My,Mz)
							if(BS > 0){
								if(BS > maxT){
									maxT = BS;
									maxTx = x;
									maxTy = y;
								}
							}
							else if(BS <= 0){
								if(BS < maxC){
									maxC = BS;
									maxCx = x;
									maxCy = y;
								}
							}
						}
					}
			}
	displayMaxStresses (maxT, maxTx, maxTy, maxC, maxCx, maxCy);
	var retArray = [maxT, maxC];
	return retArray;
}

*/



function calcArea(sA){
	var Area = 0;
	var shape = 'null';
	var tester = 0;

	for(i = 0; i < sA.length; i ++){
		shape = sA[i];
		if(shape.addorsubtract == 'add'){
			Area = Area + shape.A;
		}
		else if(shape.addorsubtract == 'subtract'){
			Area = Area - shape.A;

		}
	}
	return Area;
}

function calcCentroid(sA){
	var totalArea = calcArea(sA);
	var sumAx = 0;
	var sumAy = 0;
	var shape = 'null';
	var cx = 0;
	var cy = 0;
	var retArray = [];

	for(var i = 0; i < sA.length; i++){
		shape = sA[i];
		if(shape.addorsubtract == 'add'){
			sumAx = sumAx + shape.cx*shape.A;
			sumAy = sumAy + shape.cy*shape.A;
		}
		else if(shape.addorsubtract == 'subtract'){
			sumAx = sumAx - shape.cx*shape.A;
			sumAy = sumAy - shape.cy*shape.A;
		}
	}

	cx = sumAx / totalArea;
	cy = sumAy / totalArea;

	//returns cx and cy as real dimensions.
	retArray = [cx, cy];

	return retArray;

}

function calcMoments(sA){
	//add or subtract the moments together to get first term of eqn A-11 (I_0):
	var I0x = 0;
	var I0y = 0;
	var Ay2 = 0;
	var Ax2 = 0;
	var sumAy = 0;
	var sumAx = 0;
	var distfromcentroidx = 0;
	var distfromcentroidy = 0;
	var centroidArray = [];
	var retArray = 0;
	var Ixx = 0;
	var Iyy = 0;
	var distfromcentroidx = 0;
	var distfromcentroidy = 0;


	centroidArray = calcCentroid(sA);


	for(var i = 0; i < sA.length; i++){
		var shape = sA[i];

		distfromcentroidy = shape.cy - centroidArray[1];
		distfromcentroidx = shape.cx - centroidArray[0];

		if(shape.addorsubtract == 'add'){
			I0x = I0x + shape.Ixx;
			I0y = I0y + shape.Iyy;
			Ay2 = Ay2 + shape.A * Math.pow(distfromcentroidy,2);
			Ax2 = Ax2 + shape.A * Math.pow(distfromcentroidx,2);
			sumAx = sumAx + shape.A * distfromcentroidx;
			sumAy = sumAy + shape.A * distfromcentroidy;
		}
		else if(shape.addorsubtract == 'subtract'){
			I0x = I0x - shape.Ixx;
			I0y = I0y - shape.Iyy;
			Ay2 = Ay2 - shape.A * Math.pow(distfromcentroidy,2);
			Ax2 = Ax2 - shape.A * Math.pow(distfromcentroidx,2);
			sumAx = sumAx - shape.A * distfromcentroidx;
			sumAy = sumAy - shape.A * distfromcentroidy;
		}

	}

	Ixx = I0x + Ay2 - centroidArray[1]*sumAy;
	Iyy = I0y + Ax2 - centroidArray[0]*sumAx;

	retArray = [Ixx, Iyy];

	return retArray;

}

//fully replaces calcMoments, but returns parameters for principals. Call one or the other based on stability of beam.

//Works perfectly for one example. Need to check against more.
function calcPrincipals(sA){
	//add or subtract the moments together to get first term of eqn A-11 (I_0):
	var I0x = 0;
	var I0y = 0;
	var Ay2 = 0;
	var Ax2 = 0;
	var sumAy = 0;
	var sumAx = 0;
	var sumAxy = 0;
	var distfromcentroidx = 0;
	var distfromcentroidy = 0;
	var centroidArray = [];
	var retArray = 0;
	var Ixx = 0;
	var Iyy = 0;
	var distfromcentroidx = 0;
	var distfromcentroidy = 0;
	var alpha = 0;
	var Ixp = 0;
	var Iyp = 0;


	centroidArray = calcCentroid(sA);


	//put everything in terms of 0,0 cs displayed. Much easier to think about.


	for(var i = 0; i < sA.length; i++){
		var shape = sA[i];

		distfromcentroidy = shape.cy - centroidArray[1];
		distfromcentroidx = shape.cx - centroidArray[0];

		var truex = shape.cx - (zeroX * Scale);
		var truey = (zeroY * Scale) - shape.cy;

		if(shape.addorsubtract == 'add'){
			I0x = I0x + shape.Ixx;
			I0y = I0y + shape.Iyy;
			Ay2 = Ay2 + shape.A * Math.pow(distfromcentroidy,2);
			Ax2 = Ax2 + shape.A * Math.pow(distfromcentroidx,2);

			sumAxy = sumAxy + shape.A * truex * truey;
			sumAx = sumAx + shape.A * distfromcentroidx;
			sumAy = sumAy + shape.A * distfromcentroidy;
		}
		else if(shape.addorsubtract == 'subtract'){
			I0x = I0x - shape.Ixx;
			I0y = I0y - shape.Iyy;
			Ay2 = Ay2 - shape.A * Math.pow(distfromcentroidy,2);
			Ax2 = Ax2 - shape.A * Math.pow(distfromcentroidx,2);

			sumAxy = sumAxy - shape.A * truex * truey;
			sumAx = sumAx - shape.A * distfromcentroidx;
			sumAy = sumAy - shape.A * distfromcentroidy;
		}

	}

	Ixx = I0x + Ay2 - centroidArray[1]*sumAy;
	Iyy = I0y + Ax2 - centroidArray[0]*sumAx;

	var Xcg = centroidArray[0] - zeroX*Scale;
	var Ycg = zeroY*Scale - centroidArray[1];

	Ixy = sumAxy - calcArea(sA) * Xcg * Ycg;

	//calculate alpha per Philpot:
	alpha = (Math.atan((2*Ixy)/(Iyy-Ixx))/2);

	//calculate principal moments of inertia:
	Ixp = Ixx*Math.pow(Math.cos(alpha),2)+Iyy*Math.pow(Math.sin(alpha),2) - Ixy*Math.sin(2*alpha);

	Iyp = Ixx*Math.pow(Math.sin(alpha),2)+Iyy*Math.pow(Math.cos(alpha),2) + Ixy*Math.sin(2*alpha);

	MasterIyp = Iyp;
	MasterIxp = Ixp;
	MasterIxy = Ixy;
	MasterAlpha = alpha;
	retArray = [Ixp, Iyp, alpha];

	return retArray;


}

function calcQ(gA, sA){

var cy = 0;
var h = 0;
var A = 0;
var radius = 0;
var centroidArray = [];
var type = 'null';
var areaAboveNA = 0;
var highestPoint = 0;
var rectPropsAboveNA = [];
var filletPropsAboveNA = [];
var chamferPropsAboveNA = [];
var centroidDist = 0;
var Q = 0;

	centroidArray = calcCentroid(sA);

	for(var i = 0; i < gA.length; i++){

		//for rectangles:
		if(gA[i] == 'r'){
			cy = gA[i+2];
			distfromcentroidy = cy - centroidArray[1];
			A = gA[i+3] * gA[i+4];
			h = gA[i+4];
			type = 'rect';
			//If all of the area of the rectangle is above the centroid, add all of the area.
			if(distfromcentroidy <= -(h / 2)){
				areaAboveNA = areaAboveNA + A;
				centroidDist = -distfromcentroidy;
				Q = Q + (A * centroidDist);
				////console.log('Rectangle, completely above: ');
				////console.log(centroidDist);
				////console.log(A);
			}
			//If part of the area of the rectangle is above the centroid, add the part that is above the centroid to the area.
			else if(distfromcentroidy > -(h / 2) && distfromcentroidy < (h/2)){
				rectPropsAboveNA = areaAboveNArects(h, -distfromcentroidy, A/h);
				A = rectPropsAboveNA[0];
				centroidDist = rectPropsAboveNA[1];
				areaAboveNA = A + areaAboveNA;
				Q = Q + (A * centroidDist);
				////console.log('Rectangle, partly above: ');
				////console.log(centroidDist);
				////console.log(A);
			}

		}
		//for fillets:
		if(gA[i] == 'f'){
			cy = gA[i+2];
			highestPoint = gA[i + 6];
			radius = gA[i + 3];
			distfromcentroidy = highestPoint - centroidArray[1];
			type = gA[i + 5];

			//If the highest point is more than 1 radius above the centroid (that is, the entire shape is above the centroid), use the whole area.

			if(-distfromcentroidy >= radius){
				A = gA[i+3]*gA[i+3] * .2146;
				centroidDist = -(cy - centroidArray[1]);
				//If the shape is added, add the partial. If opposite, subtract partial.
				if(gA[i+4] == 'in'){
					//areaAboveNA = areaAboveNA - A;
					Q = Q - (A * centroidDist);
				}
				else{
					//areaAboveNA = areaAboveNA + A;
					Q = Q + (A * centroidDist);
				}
				////console.log('Fillet, completely above: ');
				////console.log(centroidDist);
			}

			else if(-distfromcentroidy < radius && -distfromcentroidy > 0 ){
				filletPropsAboveNA = areaAboveNAfillets(radius, -distfromcentroidy, type);
				A = filletPropsAboveNA[0];
				centroidDist = filletPropsAboveNA[1];
				//If the shape is added, add the partial. If opposite, subtract partial.
				if(gA[i+4] == 'in'){
					//areaAboveNA = areaAboveNA - A;
					Q = Q - (A * centroidDist);
				}
				else{
					//areaAboveNA = areaAboveNA + A;
					Q = Q + (A * centroidDist);
				}
				////console.log('Fillet, partly above: ');
				////console.log(centroidDist);
			}

		}

		//for chamfers:
		if(gA[i] == 'c'){
			cy = gA[i+2];
			highestPoint = gA[i + 6];
			distfromcentroidy = highestPoint - centroidArray[1];
			type = gA[i + 5];


		//If the highest point is more than 1 edge distance above the centroid (that is, the entire shape is above the centroid), use the whole area.

		if(-distfromcentroidy >= gA[i+3]){
			A = gA[i+3] * gA[i+3] / 2;
			centroidDist = -distfromcentroidy;
			//If the shape is added, add the partial. If opposite, subtract partial.
			if(gA[i+4] == 'in'){
				//areaAboveNA = areaAboveNA - A;
				Q = Q - (A * centroidDist);
			}
			else{
				//areaAboveNA = areaAboveNA + A;
				Q = Q + (A * centroidDist);
			}
			////console.log('Chamfer, completely above: ');
			////console.log(centroidDist);
		}

		else if(-distfromcentroidy < gA[i+3] && -distfromcentroidy > 0 ){
			chamferPropsAboveNA = areaAboveNAchamfers(gA[i+3], -distfromcentroidy,45, type);
			A = chamferPropsAboveNA[0];
			centroidDist = chamferPropsAboveNA[1];
			//If the shape is added, add the partial. If opposite, subtract partial.
			if(gA[i+4] == 'in'){
				//areaAboveNA = areaAboveNA - A;
				Q = Q - (A * centroidDist);
			}
			else{
				//areaAboveNA = areaAboveNA + A;
				Q = Q + (A * centroidDist);
			}
		}

				////console.log('area above NA: ');
				////console.log(areaAboveNA);
		}
	}
	////console.log('Q: ');
	////console.log(Q);
	return Q;

}

function areaAboveNAfillets(radius, d, case_number){
//This function accepts a radius and distance d for any fillet and returns the area above the NA and the y-coordinate distance from the NA to the centroid of the area.

var d_over_R = [1,0.99,0.98,0.97,0.96,0.95,0.94,0.93,0.92,0.91,0.9,0.89,0.88,0.87,0.86,0.85,0.84,0.83,0.82,0.81,0.8,0.79,0.78,0.77,0.76,0.75,0.74,0.73,0.72,0.71,0.7,0.69,0.68,0.67,0.66,0.65,0.64,0.63,0.62,0.61,0.6,0.59,0.58,0.57,0.56,0.55,0.54,0.53,0.52,0.51,0.5,0.49,0.48,0.47,0.46,0.45,0.44,0.43,0.42,0.41,0.4,0.39,0.38,0.37,0.36,0.35,0.34,0.33,0.32,0.31,0.3,0.29,0.28,0.27,0.26,0.25,0.24,0.23,0.22,0.21,0.2,0.19,0.18,0.17,0.16,0.15,0.14,0.13,0.12,0.11,0.1,0.09,0.08,0.07,0.06,0.05,0.04,0.03,0.02,0.01];

//The following data are for case 1 (upward facting fillet, either R or L facing):
var Ai_over_A_c1= [1,0.9577887589,0.9191929109,0.8829314325,0.8485430041,0.815758849,0.7843961636,0.7543197207,0.7254239293,0.6976231891,0.6708460188,0.6450316549,0.620127395,0.5960868742,0.5728689465,0.5504366132,0.528756417,0.5077978362,0.4875328655,0.4679355965,0.4489821243,0.430650082,0.4129185472,0.3957679487,0.3791797405,0.3631365882,0.3476218098,0.3326197949,0.318115539,0.3040947832,0.2905439208,0.2774498112,0.2647999663,0.2525823637,0.2407853073,0.2293976603,0.2184086586,0.2078077709,0.1975849322,0.1877303102,0.1782344923,0.1690881122,0.1602823163,0.1518082976,0.1436575288,0.1358217618,0.1282928888,0.1210629881,0.114124371,0.1074693954,0.1010907455,0.09498115207,0.08913348553,0.08354075622,0.07819620745,0.07309308252,0.06822471792,0.06358472975,0.05916668748,0.0549643004,0.05097137098,0.0471818415,0.04358965422,0.0401889378,0.03697377432,0.03393843221,0.03107722655,0.02838447238,0.02585462455,0.0234821845,0.02126165367,0.01918771992,0.01725497787,0.01545811536,0.01379196003,0.01225124631,0.01083089502,0.009525733796,0.008330683465,0.00724071145,0.006250878371,0.005356151653,0.004551591916,0.003832306377,0.003193402256,0.002630033368,0.002137400127,0.001710609751,0.001344955849,0.001035592239,0.0007778125295,0.0005668637324,0.0003980394576,0.0002665867171,0.0001678457184,0.00009711007138,0.00004971998376,0.00002096906532,0.000006150925826,0.0000007455667668];

var Y_cg_over_R_c1 = [0.22336794,0.22299632,0.22215217,0.22107242,0.21983075,0.21846602,0.21700251,0.21545689,0.21384131,0.21216505,0.21043537,0.20865817,0.20683825,0.20497968,0.20308587,0.20115976,0.19920391,0.19722054,0.19521162,0.1931789,0.19112391,0.18904808,0.18695265,0.18483878,0.1827075,0.18055976,0.17839644,0.17621834,0.1740262,0.17182072,0.16960251,0.16737219,0.16513029,0.16287734,0.16061382,0.15834019,0.15605686,0.15376425,0.15146273,0.14915267,0.14683439,0.14450822,0.14217448,0.13983343,0.13748538,0.13513056,0.13276925,0.13040167,0.12802806,0.12564864,0.12326361,0.12087319,0.11847755,0.1160769,0.1136714,0.11126124,0.10884658,0.10642758,0.10400439,0.10157717,0.09914606,0.09671121,0.09427274,0.0918308,0.08938551,0.08693699,0.08448537,0.08203077,0.0795733,0.07711307,0.0746502,0.07218479,0.06971695,0.06724677,0.06477436,0.06229982,0.05982324,0.05734472,0.05486435,0.05238222,0.04989842,0.04741305,0.04492617,0.04243789,0.03994829,0.03745744,0.03496544,0.03247236,0.02997828,0.02748328,0.02498745,0.02249082,0.01999356,0.01749569,0.01499729,0.01249843,0.0099992,0.00749966,0.00490456,0.00235099];

var Ai_over_A_c2 =[1,0.999999534,0.9999939423,0.9999790309,0.9999506062,0.9999030763,0.9998322474,0.9997334598,0.9996020537,0.9994333692,0.9992222805,0.998964594,0.9986551837,0.9982893899,0.9978625529,0.9973700127,0.9968066437,0.9961677861,0.99544878,0.9946440337,0.9937493535,0.9927596134,0.9916696878,0.9904744508,0.9891692428,0.9877489378,0.9862084102,0.9845420681,0.9827452519,0.9808123697,0.9787382958,0.9765179043,0.9741456036,0.9716158019,0.9689229074,0.9660617944,0.9630264052,0.9598111479,0.9564104309,0.9528181963,0.9490288525,0.9450358757,0.9408336743,0.9364152584,0.9317755023,0.9269069505,0.921804011,0.9164592282,0.9108665445,0.90501897,0.8989095152,0.8925307243,0.8858756078,0.8789371757,0.8717070407,0.8641782129,0.8563427707,0.8481918605,0.8397180266,0.8309119495,0.8217657075,0.812269981,0.8024149844,0.7921923302,0.7815913007,0.7706025765,0.759214974,0.7474177756,0.7352002639,0.7225503234,0.7094563047,0.6959051602,0.6818847745,0.6673802363,0.6523784982,0.6368637169,0.620820515,0.6042321173,0.5870817486,0.5693498377,0.5510177454,0.5320645027,0.5124672766,0.4922023021,0.4712434844,0.4495633308,0.4271310865,0.4039132011,0.3798728622,0.3549685977,0.3291538095,0.3023767741,0.2745759821,0.2456801388,0.2156039698,0.1842412319,0.1565257141,0.1170684496,0.08080687114,0.04221120233];

var Y_cg_over_R_c2 = [0.7766321,0.7666327,0.7566368,0.7466479,0.7366692,0.7267038,0.7167549,0.7068252,0.6969174,0.6870343,0.6771782,0.6673516,0.6575568,0.6477957,0.6380706,0.6283833,0.6187355,0.6091291,0.5995655,0.5900464,0.5805731,0.5711469,0.561769,0.5524407,0.5431629,0.5339367,0.5247629,0.5156424,0.506576,0.4975642,0.4886079,0.4797074,0.4708634,0.4620762,0.4533464,0.4446741,0.4360598,0.4275035,0.4190057,0.4105663,0.4021856,0.3938636,0.3856003,0.3773958,0.3692501,0.361163,0.3531345,0.3451645,0.3372529,0.3293995,0.3216041,0.3138665,0.3061865,0.2985639,0.2909984,0.2834898,0.2760378,0.268642,0.2613022,0.2540181,0.2467894,0.2396157,0.2324966,0.225432,0.2184213,0.2114644,0.2045607,0.1977101,0.1909121,0.1841664,0.1774726,0.1708305,0.1642397,0.1576999,0.1512107,0.1447719,0.1383831,0.1320442,0.1257548,0.1195146,0.1133235,0.1071813,0.1010877,0.0950427,0.0890461,0.0830979,0.077198,0.0713464,0.0655434,0.059789,0.0540835,0.0484274,0.0428212,0.0372657,0.031762,0.0263114,0.0202063,0.0155793,0.0103056,0.0051037];

//find linearly extrapolated value for Area given radius and d:

var dR = d/radius;
var Ai = radius * radius * .2146;
var currentval = 1;
var lastval = 1;
var ler = 0;
var upperindex = 0;
var lowerindex = 0;
var extrapArea = 0;


//Find low-end ratio for the input d/R pairing.

for (var i = 1; i < d_over_R.length; i++){
	currentval = d_over_R[i];

	if(dR > currentval && dR <= lastval){
		ler = (dR - currentval)/(lastval - currentval);
		upperindex = i - 1;
		lowerindex = i;
	}
	lastval = currentval;
}

// from the tables to extrapolate from, extrapolate linearly between values:

	if(case_number == 1){

	extrapArea = Ai*(Ai_over_A_c1[lowerindex]+ler*(Ai_over_A_c1[upperindex] - Ai_over_A_c1[lowerindex]));

	extrapYcg = radius*(Y_cg_over_R_c1[lowerindex]+ler*(Y_cg_over_R_c1[upperindex]-Y_cg_over_R_c1[lowerindex]));

	}

	else if(case_number == 2){
	extrapArea = Ai*(Ai_over_A_c2[lowerindex]+ler*(Ai_over_A_c2[upperindex] - Ai_over_A_c2[lowerindex]));

	extrapYcg = radius*(Y_cg_over_R_c2[lowerindex]+ler*(Y_cg_over_R_c2[upperindex]-Y_cg_over_R_c2[lowerindex]));

	}

var retArray = [extrapArea, extrapYcg];

return retArray;

}

function areaAboveNArects(height, d, base){
//This function takes the base, height, and distance from GC of rectangle to NA (d) and returns the area above the centroid and Ygc of the section relative to the NA.

//Note, d is negative when the CG is below the NA.

var AaboveNA = 	(height*base)/2 + d*base;
var YcgNA = ((height/2)+d)/2;

var retArray = [AaboveNA, YcgNA];

return retArray;

}

function areaAboveNAchamfers(height, d, theta, type){
//Type 1 has pointy bit above the NA. Type two has it below. Theta is always the angle from the height side to the hypoteneuse. Theta is degrees.

var angle = Math.PI*(theta / 180);

var AaboveNA = 0;
var YcgNA = 0;

if(type == 1){
	AaboveNA = Math.pow(d,2)*Math.tan(angle) / 2;
	YcgNA = d / 3;
}

else if(type == 2){
	AaboveNA = (1/2)*Math.pow(height,2)*Math.tan(angle) - (1/2)*Math.pow((height - d),2)*Math.tan(angle);

	var CGrect = d/2;
	var CGtri = (2/3)*d;
	var Arect = d*(height - d);
	var Atri = .5*d*(d*Math.tan(angle));

	YcgNA = (Arect*CGrect + Atri*CGtri) / (Arect + Atri);
}
	var retArray = [AaboveNA, YcgNA];
	return retArray;

}

function calcShearStress(Fx, Fy, Fz, Q, I, t){
	var V = 0;
	var q = 0;
	var mShearStress = 0;

//	//console.log('inputs: ');
	////console.log(Fx,Fy,Fz,Q,I);
	//Vector sum Fx and Fy:
	V = Math.pow((Math.pow(Fx,2) + Math.pow(Fy,2)),.5);
	////console.log('total shear force: ');
	////console.log(V);
	//calculate shear flow:
	////console.log('shear flow: ');
	q = V*Q / I;
	////console.log(q);
	////console.log('max shear stress: ');
	MaxShearStress = q / t;
	////console.log(MaxShearStress);

	var retArray = [q, mShearStress];

	return retArray;

}

///////////////////////////Data import and export section//////////////////////////////

"use strict";

//Pack up all of the data required to reconstruct a cross section. Don't worry about moving shape data for analysis yet. Assume user will enter loads and click run.

//This is the important stuff to re-populate when a cross-section is loaded (I think?):
//Precision
//Scale
//ElementID
//lineArray = [];
//arcArray = [];
//chamferArray = [];
//linearDimArray = [];


//download button:
function Button7Clicked(){

//Create an array to export in Json format.

    displaySaveRedir();
	//var exportArray = [Precision, Scale, ElementID, lineArray, arcArray, linearDimArray, AngularDimArray, relAngleArray, previewLine, undoFilletArray];
	//exportToJsonFile(exportArray);

}

function LoadClicked(){
    displaySaveRedir();
}
//this function creates downloadable version of data passed into it.
function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

/*
//Need to empty the value in the (hidden) load field so that changes are detected when re-loading the previously loaded file.
document.getElementById('fileinput').onclick = function () {
    //console.log('show no load div');
    //this.value = null;
};

document.getElementById('fileinput').onchange = function() {
    //console.log('show no load div');
    //loadFile();
};

/*
//This function lets the user select a json file to open.
function loadFile() {

    clearInput();
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      displayError('fileload', "The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      displayError('fileload',"Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      displayError('fileload',"This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      displayError('fileload',"Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      CurrentFileName = file.name;
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      var ImportArray = JSON.parse(lines);
		//Here, we set all of the variables and objects to their imported values:

		//reassign the saved JSON array of lines to line objects...):
		Precision = ImportArray[0];
		Scale = ImportArray[1];
		ElementID = ImportArray[2];
		importLineArray = ImportArray[3];
		importArcArray = ImportArray[4];
		importlinearDimArray = ImportArray[5];
		importangularDimArray = ImportArray[6];
		importrelAngleArray = ImportArray[7];
		importpreviewLineArray = ImportArray[8];
		importundoFilletArray = ImportArray[9];

         ClearStressVis();
		//clear the screen.

		//Clear and reload the lineArray:
		lineArray = [];

		var passthroughArray = importLineArray;
		for(var i = 0; i <passthroughArray.length; i ++){
			l = passthroughArray[i];
			lineArray.push(new Line(l.startx, l.starty, l.endx, l.endy, l.dim, l.lineID, l.lineLength, l.constLine, l.angle,l.startxghost, l.startyghost, l.endxghost, l.endyghost, l.midpointX, l.midpointY));
		}

		//Clear and reload the arcArray:
		arcArray = [];

		for(var i = 0; i < importArcArray.length; i ++){
			a = importArcArray[i];
			arcArray.push(new Arc(a.centroidx, a.centroidy, a.radius, a.radstart, a.radend, a.arcID, a.Case, a.fx, a.fy, a.groupID, a.color, a.endpoint1x, a.endpoint1y, a.endpoint2x, a.endpoint2y, a.line1ID, a.line2ID));
		}

		//Next, load the linear dimensions

		linearDimArray = [];

		for(var i = 0; i < importlinearDimArray.length; i++){
			l = importlinearDimArray[i];
			linearDimArray.push(new LinearDimension(l.value, l.x, l.y, l.elementID, l.showDim, l.startx, l.starty, l.endx, l.endy, l.orientation, l.startx1, l.starty1, l.endx1, l.endy1, l.startx2, l.starty2, l.endx2, l.endy2,l.type,l.angle,l.xoffset1,l.yoffset1, l.xoffset2, l.yoffset2, l.perpOffset));
		}

		//Next, load angular dimensions

		AngularDimArray = [];

		for(var i = 0; i < importangularDimArray.length; i++){
			m = importangularDimArray[i];
			AngularDimArray.push(new AngularDimension(m.value, m.x, m.y, m.elementID, m.showDim, m.startx, m.starty));
		}

		//Last, load relangular dimensions

		relAngleArray = [];

		for(var i = 0; i < importrelAngleArray.length; i++){
			m = importrelAngleArray[i];
            relAngleArray.push(new AngleRelDimension(m.value, m.x, m.y, m.elementID, m.showDim, m.radstart, m.radend, m.centroidx, m.centroidy, m.radius, m.line1ID, m.line2ID, m.direction, m.handlex, m.handley, m.changemarkerx, m.changemarkery, m.displayFlippedArc));
		}

        previewLine = importpreviewLineArray;

        undoFilletArray = [];
        undoFilletArray = importundoFilletArray;

        firstAfterLoad = true;
		firstAcceptedValue = false;
		drawingMode = 'lines';
		numberOfConnectedLinesAndArcs();
		Button2Clicked();
		Redraw();
	}

  }
*/
///////////////////////////////////////////////////////Communicates with python backend/////////////////////////////////////////////////////

function UtilityPointDraw(callback){

    PrintToLog('Analysis Initiated')

    //Set flag that listens for window resizes:
    ListenForResize = true;

    clearResults();

    //Mometarily freeze input, so the user can't do anything that will interrupt this process.
    //InputFreze = true;

    var pCString = "";

    analysisID += 1;

    var PackagedArray = packageForPy(lineArray,arcArray);

    var PackagedArraytoSend = JSON.stringify(PackagedArray);

	var ourRequest = new XMLHttpRequest();

    //Stuff to do before sending the request:
    if(inboundsCheck() == true){

        //Fill it in to indicate sent analysis:
        FromRectsToPxs();

        //Display results box with 'calculating...'
        writetoResultsBox('');

        //show the results box:
        document.getElementById("results").style.visibility = "visible";
        document.getElementById("resultsgrab").style.visibility = "visible";
        document.getElementById("outputpopuptext").style.visibility = "visible";
        document.getElementById("resultsheader").style.visibility = "visible";
        document.getElementById("resultskeepout").style.visibility = "visible";


        //Send for analysis.
    	ourRequest.open('POST', 'https://visualcalcs.pythonanywhere.com/getArea_2');
    	ourRequest.setRequestHeader("Content-type", "text/plain");
    	ourRequest.send(PackagedArraytoSend);


    	//Put out listener to see if a connection exists/if not returning an error:
    	ourRequest.addEventListener("readystatechange", checkConnection, false);

    	function checkConnection(){
            if (ourRequest.readyState == 4) {
                if (ourRequest.status >= 200 && ourRequest.status < 304) {
                    disconnectCancelledRequest = false;
                }
                else {
        	        displayError('servererror','Something is broken. Things to try:\n-Check your internet connection \n-Save your work and reload this page\n-Email support@visualcalcs.com')
        	        document.getElementById("loader").style.visibility = "hidden";
                    disconnectCancelledRequest = true;
                    ListenForResize = false;
                    InputFreze = false;
                    showZeroZero = false;
                }
        	}
    	}
    }


    else{
        document.getElementById("loader").style.visibility = "hidden";
        displayError('outofwindow','Lines out of window. Resize window to include all lines and retry.');
        showZeroZero = false;
        CancelledRequest = false;
        InputFreze = false;
        ListenForResize = false;
        ClearStressVis();
    }



	//Once the request gets back.
	ourRequest.onload = function(){

            //console.log('dnfarea = ',doNotFindArea)
    	    if(CancelledRequest != true && doNotFindArea != true && disconnectCancelledRequest != true){

        		rectString = ourRequest.responseText;

                //Abandon it if the user doesn't have enough credits.
        		if(rectString == 'CreditsError' || rectString == 'CreditsErrorfb'){
        	        CancelledRequest = false;
    	            InputFreze = false;
                    ListenForResize = false;
                    //hide the results popup:
                    document.getElementById("loader").style.visibility = "hidden";
                    document.getElementById("results").style.visibility = "hidden";
                    document.getElementById("resultsgrab").style.visibility = "hidden";
                    document.getElementById("outputpopuptext").style.visibility = "hidden";
                    document.getElementById("resultsheader").style.visibility = "hidden";
                    document.getElementById("resultskeepout").style.visibility = "hidden";


                    //Display a descision dialogue:
                    document.getElementById("smokescreen").style.visibility = "visible";
                    document.getElementById("fob").style.visibility = "visible";
                    document.getElementById("fobtxt").style.visibility = "visible";
                    document.getElementById("fobgrab").style.visibility = "visible";
                    document.getElementById("fobheader").style.visibility = "visible";
                    document.getElementById("fobbuy").style.visibility = "visible";

                    if(rectString == 'CreditsError'){
                        document.getElementById("fobfeedback").style.visibility = "visible";
                    }

   	                InputFreze = true;
                    return 0
        		}


        	    var rectsCollector = rectString.split(",");

        	   parseInt(rectsCollector[rectsCollector.length - 1])

        	   //If the returned analysis ID isn't the same as the most current one, don't display results.
        	   if(parseInt(rectsCollector[rectsCollector.length - 1]) != analysisID){
        	        CancelledRequest = false;
    	            InputFreze = false;
                    ListenForResize = false;
                    return 0
        	   }

        	    //Assigning values to global property variables:
            	actualCx = parseFloat(rectsCollector[0]);
                actualCy = parseFloat(rectsCollector[1]);
                MasterCx = actualCx;
                MasterCy = canvas.height*Scale - actualCy;
                dispCx = actualCx / Scale;
                dispCy = canvas.height - actualCy / Scale;

                CxToReport = actualCx - zeroX*Scale;
                CyToReport = actualCy - (canvas.height - zeroY)*Scale;

                MasterArea = parseFloat(rectsCollector[2]);
                MasterIxx = parseFloat(rectsCollector[3]);
                MasterIyy = parseFloat(rectsCollector[4]);

                MasterAlpha = parseFloat(rectsCollector[5]);
                MasterIxp = parseFloat(rectsCollector[6]);
                MasterIyp = parseFloat(rectsCollector[7]);

                ////console.log(actualCx, actualCy, MasterArea, MasterIxx, MasterIyy, MasterAlpha, MasterIxp, MasterIyp)

        	    for(var i = 8; i < rectsCollector.length - 1; i = i+4){
        	        rectArray.push(new Rectangle(rectsCollector[i]/Scale, canvas.height -rectsCollector[i+1]/Scale, rectsCollector[i+2]/Scale, rectsCollector[i+3]/Scale, 'black', 1));
        	    }

        		//FromRectsToPxs();

        	    Redraw();

        	    ListenForResize = false;

        	    if(ourRequest.status != 200){
        	        displayError('servererror','Something is broken. Things to try:\n-Check your internet connection \n-Save your work and reload this page\n-Email derick.thomas.me@gmail.com')
        	        document.getElementById("loader").style.visibility = "hidden";
        	        InputFreze = false;
        	    }
        	    else{
        	        callback();
        	    }
    	    }
    	    else{
    	        CancelledRequest = false;
    	        InputFreze = false;
                ListenForResize = false;
    	    }
	    }

}

function FromRectsToPxs(){

    c.clearRect(0,0,canvas.width, canvas.height);
    imageData = c.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data;

	rasterArray = [];

    FillIn();

	for(var i = 0; i < rectArray.length; i++){
	    r = rectArray[i];
		r.drawrect();
	}

    imageData = c.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data;

    for(var index = 0; index < data.length; index = index+4){
        if(data[index + 3] != 0){
	       rasterArray[index / 4] = 'inside';
        }
    }

    c.clearRect(0,0,canvas.width, canvas.height);

	ci.drawImage(imageObj, imgXloc, imgYloc, imgWidth,imgHeight);

    imageData = c.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data;

    for(var index = 0; index < rasterArray.length; index ++){
        currentColor = rasterArray[index];
	    if(currentColor == 'inside'){
		    colorit(FillColor,0,0,0,index*4);
	    }
    }

    ShowMax = true;
    showZeroZero = true;

    InputFreze = false;
    Redraw();


}


function PrintToLog(datatoprint){
    logQ.push(datatoprint);

    FlushLog();
}

function FlushLog(){
    if(logQ.length != 0){
        var dataToSend = logQ.pop()
    	var logRequest = new XMLHttpRequest();
    	logRequest.open('POST', 'https://visualcalcs.pythonanywhere.com/PrintToLog');
    	logRequest.setRequestHeader("Content-type", "text/plain");
    	logRequest.send('-->' + dataToSend);

        logRequest.onload = function(){
            FlushLog();
        }
    }
}


function StartSession(){

	var ourRequest = new XMLHttpRequest();
	var newsession = 'newsession'

	ourRequest.open('POST', 'https://visualcalcs.pythonanywhere.com/StartSession');
	ourRequest.setRequestHeader("Content-type", "text/plain");
	ourRequest.send(newsession);


	ourRequest.onload = function(){
	}

}

function SendShape(){

	var ourRequest = new XMLHttpRequest();

	var exportArray = [Precision, Scale, ElementID, lineArray, arcArray, linearDimArray, AngularDimArray, relAngleArray, previewLine, undoFilletArray];
	JsonToSend = JSON.stringify(exportArray);


	var newsession = 'newsession'

	ourRequest.open('POST', 'https://visualcalcs.pythonanywhere.com/SendShape');
	ourRequest.setRequestHeader("Content-type", "text/plain");
	ourRequest.send(JsonToSend);

	ourRequest.onload = function(){
	}

}

function getIP(){

	var ourRequest = new XMLHttpRequest();

	var newsession = 'newsession'

	ourRequest.open('POST', 'https://visualcalcs.pythonanywhere.com/getIP');
	ourRequest.setRequestHeader("Content-type", "text/plain");
	ourRequest.send(newsession);

	ourRequest.onload = function(){
	    remainingCredits = ourRequest.responseText
        var btn = document.getElementById("creditsbtn");
        btn.innerHTML = 'Credits Remaining: '+ remainingCredits
	}

}

function UseCredit(){

	var ourRequest = new XMLHttpRequest();

	var newsession = 'newsession'

	ourRequest.open('POST', 'https://visualcalcs.pythonanywhere.com/UseCredit');
	ourRequest.setRequestHeader("Content-type", "text/plain");
	ourRequest.send(newsession);

	ourRequest.onload = function(){
	    remainingCredits = ourRequest.responseText
	    console.log('Credits used: ' , remainingCredits);
        var btn = document.getElementById("creditsbtn");
        btn.innerHTML = 'Credits Remaining: '+ remainingCredits
	}

}












































