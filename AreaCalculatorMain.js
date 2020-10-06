/* (C) 2020 VisualCalcs, LLC, all rights reserved
 *
 * This is the source code for the Area Calculator.
 *
 * Use this App at VisualCalcs.com/area-calculator.
 *
 * To see a project using similar techniques, but in a condensed format with comment explainations
 * see https://github.com/dthomas-eng/Node_Knot
 *
 **/

var mouseState = "moving";
var drawingMode = "lines";
var Precision = 1;
var lineArray = [];
var undoLineArray = [];
var firstLineDrawn = false;
var AllowDeleteLines = true;
var LastDrawingMode = "lines";
var ConstructionLineMode = false;
var dragFromLineID = 999;
var rectArray = [];
var arcArray = [];
var chamferArray = [];
var linearDimArray = [];
var AngularDimArray = [];
var undolinearDimArray = [];
var relAngleArray = [];
var labelArray = [];
var loadArray = [];
var SRPArray = [];
var previewStartx = 0;
var previewStarty = 0;
var Scale = 0;
var firstAcceptedValue = true;
var ElementID = 0;
var rasterArray = [];
var dimToMove = [];
var xRelative = 0;
var yRelative = 0;
var LastSelectedDimID = 999;
var LastSelectedDimType = "linear";
var showDims = true;
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
var MasterIxp = 0;
var MasterIyp = 0;
var MasterIxy = 0;
var ShowMax = true;
var HandleToDrag = 999;
var HVSnap = false;
var FillColor = "inside1";
var CurrentMode = "Lines";
var doNotFindArea = false;
var InFlagArea = false;
var analysisID = 0;
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var imgcanvas = document.querySelector("imagecanvas");
var ci = canvas.getContext("2d");
var imageObj = new Image();
var imgXloc = 40;
var imgYloc = 90;
var imgWidth = 50;
var imgHeight = 50;
var imgAR = imgWidth / imgHeight;
var mouse = {
  x: undefined,
  y: undefined,
};
var colorIndex = 0;
var colorArray = ["#99B898", "#FECEA8", "#FF847C", "#E84A5F", "#2A363B"];
var StressGradientShown = false;
var CsysX = 100;
var CsysY = 100;
var MouseInKeepOut = false;
var mouseInResultsGrab = false;
var mouseInFilletsInput = false;
var showZeroZero = false;
var InputFreze = true;
var ChangePreviewValue = null;
var draggedDimension = false;
var CancelledRequest = false;
var ListenForResize = false;
var disconnectCancelledRequest = false;
var drawingHV = false;
var ControlDown = false;
var connectedPointsArray = [];
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
var AngleArcDirection = "null";
var unConnectedLinesArray = [];
var undoFilletArray = [];
var welcomeDisplayed = true;
var TouchMode = false;
var ActiveError = null;
var Units = "ft";
var LineColor = "black";
var LineThickness = 2.5;
var intersectColor = "blue";
var ImageShown = false;
var DimColor = "white";
var logQ = [];
var remainingCredits = 20;
var downhappened = false;
var dragginghappened = false;
var lastMouseInOrOut = false;
var whiteBackground = true;
const compareNumbers = (a, b) => a - b;

const snipcursor = document.querySelector(".snipcursor");
const erasecursor = document.querySelector(".erasecursor");

c.canvas.width = window.innerWidth;
c.canvas.height = window.innerHeight;

var imageData = c.getImageData(0, 0, 100, 100);
var data = imageData.data;

imageObj.src = "whitepix.PNG";

document.getElementById("imgupload").onclick = function () {
  this.value = null;
};

startUp();

function mainLoop() {
  if (
    closeOrOpenSection() == true &&
    StressGradientShown == false &&
    doNotFindArea == false
  ) {
    SendShape();
    document.getElementById("loader").style.visibility = "visible";
    bottomLeftPoint();
    UtilityPointDraw(displayProperties);
    StressGradientShown = true;
  }

  switchToPointer();

  if (lineArray.length > 1 && Scale == 0) {
    displayError(
      "noscale",
      "Dimension first line before drawing next line. \n\nFor help, press ? button."
    );
    l = lineArray[lineArray.length - 1];
    deleteline(l.lineID);
  }

  Redraw();

  if (mouseInDrawingArea() == true) {
    lastMouseInOrOut = true;
    switch (drawingMode) {
      case "lines":
        LastDrawingMode = "lines";
        AllowDeleteLines = true;
        switch (mouseState) {
          case "moving":
            isonendpoint();
            isonline(mouse.x, mouse.y, "UI");
            dragginghappened = false;
            if (ControlDown == false) {
              isonendpoint();
              isoncentroid();
              isonzerozero();
            }
            isonHandle(mouse.x, mouse.y);
            if (drawingHV == true && ControlDown == false) {
              suggestHVSnap();
            }
            break;
          case "down":
            eptomove = isonendpoint();
            endpointsToMove = getEPs(eptomove);
            if (endpointsToMove != 0) {
              dragepundoLines = [];
              for (var i = 0; i < endpointsToMove.length; i++) {
                var undoLineJSON = JSON.parse(
                  JSON.stringify(endpointsToMove[i][1])
                );
                dragepundoLines.push(undoLineJSON);
              }
            }
            linetomove = isonline(mouse.x, mouse.y, "UI");
            endpointoffsets = offsetsFromEndpoints(linetomove);
            if (linetomove != 999) {
              draglineundoLines = [];
              for (var i = 0; i < endpointoffsets[4].length; i++) {
                var undoLineJSON = JSON.parse(
                  JSON.stringify(endpointoffsets[4][i][2])
                );
                draglineundoLines.push(undoLineJSON);
              }
              for (var i = 0; i < lineArray.length; i++) {
                if (linetomove == lineArray[i].lineID) {
                  undoLineJSON = JSON.parse(JSON.stringify(lineArray[i]));
                  draglineundoLines.push(undoLineJSON);
                }
              }
            }
            if (mouseInResultsGrab == true) {
              setRelatives(mouse.x, mouse.y, 0, "resultsbox", 0, 0);
              drawingMode = "dragresultsbox";
            }
            unConnectedLinesArray = [];
            downhappened = true;
            dimToMove = isondim(mouse.x, mouse.y, 10, 27);
            if (dimToMove[0] != 999) {
              if (dimToMove[1] == "linear" || dimToMove[1] == "fillet") {
                for (var k = 0; k < linearDimArray.length; k++) {
                  if (linearDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = linearDimArray[k].x;
                    InitialDimY = linearDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "angular") {
                for (var k = 0; k < AngularDimArray.length; k++) {
                  if (AngularDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = AngularDimArray[k].x;
                    InitialDimY = AngularDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "relangular") {
                for (var k = 0; k < relAngleArray.length; k++) {
                  if (relAngleArray[k].elementID == dimToMove[0]) {
                    InitialDimX = relAngleArray[k].x;
                    InitialDimY = relAngleArray[k].y;
                  }
                }
              }
              setRelatives(
                mouse.x,
                mouse.y,
                dimToMove[0],
                "dim",
                0,
                dimToMove[1]
              );
              drawingMode = "dragdimension";
            }
            if (isonHandle(mouse.x, mouse.y) != 999) {
              HandleToDrag = isonHandle(mouse.x, mouse.y);
              for (var k = 0; k < relAngleArray.length; k++) {
                if (relAngleArray[k].elementID == HandleToDrag) {
                  InitialHandleDimX = relAngleArray[k].handlex;
                  InitialHandleDimY = relAngleArray[k].handley;
                }
              }
              setRelatives(mouse.x, mouse.y, "null", "SRP", HandleToDrag);
              drawingMode = "draghandle";
            } else {
              linePreviewStart();
            }
            break;
          case "dragging":
            dragginghappened = true;
            if (downhappened == false) {
              break;
            }
            draggedendpoints = moveEPs(endpointsToMove);
            draggedlines = moveLine(linetomove, endpointoffsets);
            if (draggedendpoints == 0 && draggedlines == 0) {
              linePreviewDrag();
              if (ControlDown == false) {
                isoncentroid();
                isonzerozero();
                isonendpoint("draggingMode", dragFromLineID);
                if (drawingHV == true) {
                  suggestHVSnap();
                }
              }
            } else {
              doNotFindArea = true;
              StressGradientShown = false;
            }
            break;
          case "up":
            if (dragginghappened == false) {
              break;
            }
            downhappened = false;
            doNotFindArea = false;
            if (draggedendpoints != 0) {
              updateUserMoves(["moveep", dragepundoLines]);
              PrintToLog("Dragged an Endpoint");
            } else if (draggedlines != 0) {
              updateUserMoves(["moveline", draglineundoLines]);
              PrintToLog("Dragged a Line.");
            } else {
              ElementID += 1;
              createNewLine();
              updateUserMoves(["newline", ElementID]);
              removeZeroLengthLines();
            }
            closeOrOpenSection();
            break;
        }
        break;
      case "dragdimension":
        switch (mouseState) {
          case "moving":
            break;
          case "dragging":
            if (dimToMove[1] != "linear") {
              moveDim(mouse.x, mouse.y, dimToMove[0], dimToMove[1]);
              Redraw();
            }
            draggedDimension = true;
            draggedlines = moveLine(linetomove, endpointoffsets);
            doNotFindArea = true;
            StressGradientShown = false;
            break;
          case "down":
            break;
          case "up":
            if (
              draggedDimension == false &&
              LastDrawingMode != "snip" &&
              LastDrawingMode != "erase"
            ) {
              changeDimension();
            } else {
              draggedDimension = false;
              if (dimToMove[1] != "angular") {
                updateUserMoves([
                  "movedim",
                  dimToMove[0],
                  dimToMove[1],
                  InitialDimX,
                  InitialDimY,
                ]);
              }
            }
            if (draggedlines != 0) {
              updateUserMoves(["moveline", draglineundoLines]);
              PrintToLog("Dragged a Line.");
              doNotFindArea = false;
            }
            dimToMove = 999;
            drawingMode = LastDrawingMode;
            xRelative = 0;
            yRelative = 0;
            break;
        }
        break;
      case "dragresultsbox":
        switch (mouseState) {
          case "moving":
            break;
          case "dragging":
            moveResultsBox(mouse.x, mouse.y);

            break;
          case "down":
            break;
          case "up":
            drawingMode = LastDrawingMode;
            xRelative = 0;
            yRelative = 0;
            break;
        }
        break;
      case "draghandle":
        switch (mouseState) {
          case "moving":
            break;
          case "dragging":
            moveHandle(mouse.x, mouse.y, "nonabsolute", HandleToDrag);
            break;
          case "down":
            break;
          case "up":
            updateUserMoves([
              "movedhandle",
              HandleToDrag,
              InitialHandleDimX,
              InitialHandleDimY,
            ]);
            drawingMode = LastDrawingMode;
            break;
        }
        break;
      case "snip":
        LastDrawingMode = "snip";
        AllowDeleteLines = true;
        switch (mouseState) {
          case "moving":
            isondim(mouse.x, mouse.y, 10, 27);
            isonHandle(mouse.x, mouse.y);
            var selectedLine = isonline(mouse.x, mouse.y, "SNIP");
            if (selectedLine != 999) {
              Snip(selectedLine, true);
            }
            break;
          case "dragging":
            if (TouchMode == true) {
            }
            var dragLinesOutArray = drawDragLines(mouse.x, mouse.y);
            var selectedLine1 = dragLinesOutArray[0];
            var selectedLine2 = isonline(mouse.x, mouse.y, "SNIP");
            if (selectedLine1 != 999 || selectedLine2 != 999) {
              if (selectedLine1 != 999) {
                Snip(selectedLine1, false);
              } else {
                Snip(selectedLine2, false);
              }
            }
            var selectedFillet1 = dragLinesOutArray[1];
            var selectedFillet2 = 999;
            break;
          case "down":
            if (TouchMode == true) {
            }
            if (mouseInResultsGrab == true) {
              setRelatives(mouse.x, mouse.y, 0, "resultsbox", 0, 0);
              drawingMode = "dragresultsbox";
            }
            unConnectedLinesArray = [];
            dimToMove = isondim(mouse.x, mouse.y, 10, 27);
            if (dimToMove[0] != 999) {
              if (dimToMove[1] == "linear" || dimToMove[1] == "fillet") {
                for (var k = 0; k < linearDimArray.length; k++) {
                  if (linearDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = linearDimArray[k].x;
                    InitialDimY = linearDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "angular") {
                for (var k = 0; k < AngularDimArray.length; k++) {
                  if (AngularDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = AngularDimArray[k].x;
                    InitialDimY = AngularDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "relangular") {
                for (var k = 0; k < relAngleArray.length; k++) {
                  if (relAngleArray[k].elementID == dimToMove[0]) {
                    relAngleArray.splice(k, 1);
                  }
                }
              }
              setRelatives(
                mouse.x,
                mouse.y,
                dimToMove[0],
                "dim",
                0,
                dimToMove[1]
              );
              drawingMode = "dragdimension";
            } else if (isonHandle(mouse.x, mouse.y) != 999) {
              HandleToDrag = isonHandle(mouse.x, mouse.y);
              for (var k = 0; k < relAngleArray.length; k++) {
                if (relAngleArray[k].elementID == HandleToDrag) {
                  InitialHandleDimX = relAngleArray[k].handlex;
                  InitialHandleDimY = relAngleArray[k].handley;
                }
              }
              setRelatives(mouse.x, mouse.y, "null", "SRP", HandleToDrag);
              drawingMode = "draghandle";
            } else {
              isondim(mouse.x, mouse.y, 10, 27);
              var selectedLine = isonline(mouse.x, mouse.y, "SNIP");
              if (selectedLine != 999) {
                Snip(selectedLine, false);
              }
            }
            removeZeroLengthLines();
            closeOrOpenSection();
            break;
          case "up":
            dragLinesArray = [];
            break;
        }
        break;
      case "linearDim":
        LastDrawingMode = "linearDim";
        AllowDeleteLines = true;
        switch (mouseState) {
          case "moving":
            isondim(mouse.x, mouse.y, 10, 27);
            isonline(mouse.x, mouse.y, "UI");
            isonHandle(mouse.x, mouse.y);
            break;
          case "dragging":
            break;
          case "down":
            if (mouseInResultsGrab == true) {
              setRelatives(mouse.x, mouse.y, 0, "resultsbox", 0, 0);
              drawingMode = "dragresultsbox";
            }
            unConnectedLinesArray = [];
            dimToMove = isondim(mouse.x, mouse.y, 10, 27);
            if (dimToMove[0] != 999) {
              if (dimToMove[1] == "linear" || dimToMove[1] == "fillet") {
                for (var k = 0; k < linearDimArray.length; k++) {
                  if (linearDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = linearDimArray[k].x;
                    InitialDimY = linearDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "angular") {
                for (var k = 0; k < AngularDimArray.length; k++) {
                  if (AngularDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = AngularDimArray[k].x;
                    InitialDimY = AngularDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "relangular") {
                for (var k = 0; k < relAngleArray.length; k++) {
                  if (relAngleArray[k].elementID == dimToMove[0]) {
                    InitialDimX = relAngleArray[k].x;
                    InitialDimY = relAngleArray[k].y;
                  }
                }
              }
              setRelatives(
                mouse.x,
                mouse.y,
                dimToMove[0],
                "dim",
                0,
                dimToMove[1]
              );
              drawingMode = "dragdimension";
            } else if (isonHandle(mouse.x, mouse.y) != 999) {
              HandleToDrag = isonHandle(mouse.x, mouse.y);
              for (var k = 0; k < relAngleArray.length; k++) {
                if (relAngleArray[k].elementID == HandleToDrag) {
                  InitialHandleDimX = relAngleArray[k].handlex;
                  InitialHandleDimY = relAngleArray[k].handley;
                }
              }
              setRelatives(mouse.x, mouse.y, "null", "SRP", HandleToDrag);
              drawingMode = "draghandle";
            } else {
              isondim(mouse.x, mouse.y, 10, 27);
              var selectedLine = isonline(mouse.x, mouse.y, "UI");
              if (selectedLine != 999) {
                for (var k = 0; k < linearDimArray.length; k++) {
                  if (linearDimArray[k].elementID == selectedLine) {
                    var hideshowline = selectedLine;
                    var hideshowstate = linearDimArray[k].showDim;
                    updateUserMoves([
                      "hsdim",
                      hideshowline,
                      "linear",
                      hideshowstate,
                    ]);
                  }
                }
                displayDimension("line");
              }
            }
            removeZeroLengthLines();
            closeOrOpenSection();
            break;
          case "up":
            break;
        }
        break;
      case "angularDim":
        LastDrawingMode = "angularDim";
        AllowDeleteLines = true;
        switch (mouseState) {
          case "moving":
            isondim(mouse.x, mouse.y, 10, 27);
            isonline(mouse.x, mouse.y, "UI");
            break;
          case "dragging":
            break;
          case "down":
            if (mouseInResultsGrab == true) {
              setRelatives(mouse.x, mouse.y, 0, "resultsbox", 0, 0);
              drawingMode = "dragresultsbox";
            }
            unConnectedLinesArray = [];
            dimToMove = isondim(mouse.x, mouse.y, 10, 27);
            if (dimToMove[0] != 999) {
              if (dimToMove[1] == "linear" || dimToMove[1] == "fillet") {
                for (var k = 0; k < linearDimArray.length; k++) {
                  if (linearDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = linearDimArray[k].x;
                    InitialDimY = linearDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "angular") {
                for (var k = 0; k < AngularDimArray.length; k++) {
                  if (AngularDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = AngularDimArray[k].x;
                    InitialDimY = AngularDimArray[k].y;
                  }
                }
              }
              setRelatives(
                mouse.x,
                mouse.y,
                dimToMove[0],
                "dim",
                0,
                dimToMove[1]
              );
              drawingMode = "dragdimension";
            } else {
              isondim(mouse.x, mouse.y, 10, 27);
              var selectedLine = isonline(mouse.x, mouse.y, "UI");
              if (selectedLine != 999) {
                for (var k = 0; k < AngularDimArray.length; k++) {
                  if (AngularDimArray[k].elementID == selectedLine) {
                    var hideshowline = selectedLine;
                    var hideshowstate = AngularDimArray[k].showDim;
                    updateUserMoves([
                      "hsdim",
                      hideshowline,
                      "angular",
                      hideshowstate,
                    ]);
                  }
                }
                displayDimension("angle");
              }
            }
            removeZeroLengthLines();
            closeOrOpenSection();
            break;
          case "up":
            break;
        }
        break;
      case "angledimbetweenlines":
        LastDrawingMode = "angledimbetweenlines";
        AllowDeleteLines = true;
        switch (mouseState) {
          case "moving":
            isonendpoint();
            isonline(mouse.x, mouse.y, "Rel");
            isondim(mouse.x, mouse.y, 10, 27);
            isonHandle(mouse.x, mouse.y);
            break;
          case "down":
            if (mouseInResultsGrab == true) {
              setRelatives(mouse.x, mouse.y, 0, "resultsbox", 0, 0);
              drawingMode = "dragresultsbox";
            }
            unConnectedLinesArray = [];
            AngleSelectedLine1 = isonline(mouse.x, mouse.y, "Rel");
            FirstClickAngle = calcClickAngle(
              mouse.x,
              mouse.y,
              AngleSelectedLine1
            );
            dimToMove = isondim(mouse.x, mouse.y, 10, 27);
            if (dimToMove[0] != 999) {
              if (dimToMove[1] == "linear" || dimToMove[1] == "fillet") {
                for (var k = 0; k < linearDimArray.length; k++) {
                  if (linearDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = linearDimArray[k].x;
                    InitialDimY = linearDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "angular") {
                for (var k = 0; k < AngularDimArray.length; k++) {
                  if (AngularDimArray[k].elementID == dimToMove[0]) {
                    InitialDimX = AngularDimArray[k].x;
                    InitialDimY = AngularDimArray[k].y;
                  }
                }
              } else if (dimToMove[1] == "relangular") {
                for (var k = 0; k < relAngleArray.length; k++) {
                  if (relAngleArray[k].elementID == dimToMove[0]) {
                    InitialDimX = relAngleArray[k].x;
                    InitialDimY = relAngleArray[k].y;
                  }
                }
              }
              setRelatives(
                mouse.x,
                mouse.y,
                dimToMove[0],
                "dim",
                0,
                dimToMove[1]
              );
              drawingMode = "dragdimension";
            } else if (isonHandle(mouse.x, mouse.y) != 999) {
              HandleToDrag = isonHandle(mouse.x, mouse.y);
              for (var k = 0; k < relAngleArray.length; k++) {
                if (relAngleArray[k].elementID == HandleToDrag) {
                  InitialHandleDimX = relAngleArray[k].handlex;
                  InitialHandleDimY = relAngleArray[k].handley;
                }
              }
              setRelatives(mouse.x, mouse.y, "null", "SRP", HandleToDrag);
              drawingMode = "draghandle";
            }

            break;
          case "dragging":
            isonline(mouse.x, mouse.y, "Rel");
            if (FirstDragAngle == 999) {
              FirstDragAngle = calcClickAngle(
                mouse.x,
                mouse.y,
                AngleSelectedLine1
              );
              if (FirstDragAngle > FirstClickAngle) {
                AngleArcDirection = "cw";
              } else if (FirstDragAngle <= FirstClickAngle) {
                AngleArcDirection = "ccw";
              }
            }
            if (AngleSelectedLine1 != 999) {
              drawAngleArc(
                mouse.x,
                mouse.y,
                AngleSelectedLine1,
                AngleArcDirection
              );
            }
            break;
          case "up":
            var selectedLine2 = isonline(mouse.x, mouse.y, "Rel");
            if (AngleSelectedLine1 != 999 && selectedLine2 != 999) {
              var relAngleData = drawAngleArcSnap(
                mouse.x,
                mouse.y,
                AngleSelectedLine1,
                AngleArcDirection,
                selectedLine2
              );
              createRelAngleDim(
                relAngleData[0],
                relAngleData[1],
                relAngleData[2],
                relAngleData[3],
                relAngleData[4],
                relAngleData[5],
                relAngleData[8],
                relAngleData[6],
                relAngleData[7],
                relAngleData[9]
              );
            }

            var clickedonendpoint = isonendpoint();
            if (clickedonendpoint[0] != false) {
              linesforangle = linesCommonToNode(
                clickedonendpoint[1],
                clickedonendpoint[2]
              );
              var relAngleData = drawAngleArcSnap(
                clickedonendpoint[1] + 15,
                clickedonendpoint[2] - 15,
                linesforangle[0],
                "cw",
                linesforangle[5]
              );
              createRelAngleDim(
                relAngleData[0],
                relAngleData[1],
                relAngleData[2],
                relAngleData[3],
                relAngleData[4],
                relAngleData[5],
                relAngleData[8],
                relAngleData[6],
                relAngleData[7],
                relAngleData[9]
              );
            }

            AngleSelectedLine1 = 999;
            FirstClickAngle = 999;
            FirstDragAngle = 999;
            break;
        }
        break;

      case "loads":
        LastDrawingMode = "loads";
        AllowDeleteLines = false;
        switch (mouseState) {
          case "moving":
            isonendpoint("null", "null", true, mouse.x, mouse.y);
            isondim(mouse.x, mouse.y, 10, 27);
            isonline(mouse.x, mouse.y, "UI");
            break;
          case "down":
            if (isondim(mouse.x, mouse.y, 10, 27) != 999) {
              dimToMove = isondim(mouse.x, mouse.y, 10, 27);
              setRelatives(
                mouse.x,
                mouse.y,
                dimToMove[0],
                "dim",
                0,
                dimToMove[1]
              );
              drawingMode = "dragdimension";
            }
            if (false) {
              setRelatives(mouse.x, mouse.y, "null", "loadpoint");
              drawingMode = "dragloadpoint";
            } else {
              linePreviewStart();
            }
            break;
          case "dragging":
            linePreviewDrag("constLine");
            isonendpoint("draggingMode", dragFromLineID);
            suggestHVSnap();

            break;
          case "up":
            createNewLine("constLine");
            removeZeroLengthLines();
            break;
        }
      case "movemode":
        LastDrawingMode = "movemode";
        AllowDeleteLines = false;
        switch (mouseState) {
          case "moving":
            isonendpoint();
            isonline(mouse.x, mouse.y, "UI");
            break;
          case "down":
            eptomove = isonendpoint();
            endpointsToMove = getEPs(eptomove);
            linetomove = isonline(mouse.x, mouse.y, "UI");
            endpointoffsets = offsetsFromEndpoints(linetomove);
            break;
          case "dragging":
            moveEPs(endpointsToMove);
            moveLine(linetomove, endpointoffsets);
            break;
          case "up":
            break;
        }
        break;
    }
  } else {
    lastMouseInOrOut = false;
  }
}

function startUp() {
  highlightButtonImg("linesb");

  unloadScrollBars();

  initTouch();

  PrintToLog("----------------Area Calculator Session----------------");

  whatbrowser();

  if (navigator.userAgent.match(/Android/i)) {
    PrintToLog("User Agent: Android Mobile");
  }
  if (navigator.userAgent.match(/iPhone/i)) {
    PrintToLog("User Agent: Iphone");
  }
  if (navigator.userAgent.match(/iPad/i)) {
    PrintToLog("User Agent: Ipad");
  }
  if (navigator.userAgent.match(/iPod/i)) {
    PrintToLog("User Agent: Ipod");
  }
  if (navigator.userAgent.match(/BlackBerry/i)) {
    PrintToLog("User Agent: Blackberry");
  }
  if (navigator.userAgent.match(/Windows Phone/i)) {
    PrintToLog("User Agent: Windows Phone");
  }

  if (navigator.appVersion.indexOf("Win") != -1) {
    PrintToLog("App Version: Windows");
  }

  if (navigator.appVersion.indexOf("Mac") != -1) {
    PrintToLog("App Version: Mac");
  }

  function whatbrowser() {
    // Opera 8.0+
    var isOpera =
      (!!window.opr && !!opr.addons) ||
      !!window.opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== "undefined";

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari =
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(
        !window["safari"] ||
          (typeof safari !== "undefined" && safari.pushNotification)
      );

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    var isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isFirefox == true) {
      PrintToLog("Broswer: Firefox");
    }
    if (isChrome == true) {
      PrintToLog("Broswer: Chrome");
    }
    if (isSafari == true) {
      PrintToLog("Broswer: Safari");
    }
    if (isOpera == true) {
      PrintToLog("Broswer: Opera");
    }
    if (isIE == true) {
      PrintToLog("Broswer: IE");
    }
    if (isEdge == true) {
      PrintToLog("Broswer: Edge");
    }
    if (isEdgeChromium == true) {
      PrintToLog("Broswer: Chromium");
    }
  }
}

function initTouch() {
  document.addEventListener("touchstart", touchHandler, false);
  document.addEventListener("touchmove", touchHandler, false);
  document.addEventListener("touchend", touchHandler, false);
  document.addEventListener("touchcancel", touchHandler, false);
}

imageObj.onload = function () {
  ci.drawImage(imageObj, 40, 90);

  if (whiteBackground == true) {
    imgHeight = c.canvas.height;
    imgWidth = c.canvas.width;
  } else {
    imgWidth = imageObj.width;
    imgHeight = imageObj.height;
    imgAR = imgWidth / imgHeight;

    imgWidth = c.canvas.width - 50;
    imgHeight = imgWidth / imgAR;

    if (imgHeight > c.canvas.height - 50) {
      imgHeight = c.canvas.height - 50;
      imgWidth = imgHeight * imgAR;
    }
  }
  Redraw();
};

function setMoveMode() {
  drawingMode = "movemode";
}

function offsetsFromEndpoints(line) {
  if (line == 999) {
    return 999;
  }

  for (i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == line) {
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

  var endpointsToMove = [];

  for (i = 0; i < lineArray.length; i++) {
    if (
      Tol(lineArray[i].startx, mLsx, 0.001) &&
      Tol(lineArray[i].starty, mLsy, 0.001) &&
      lineArray[i].lineID != line
    ) {
      endpointsToMove.push(["start", "start", lineArray[i]]);
    }
    if (
      Tol(lineArray[i].startx, mLex, 0.001) &&
      Tol(lineArray[i].starty, mLey, 0.001) &&
      lineArray[i].lineID != line
    ) {
      endpointsToMove.push(["end", "start", lineArray[i]]);
    }
    if (
      Tol(lineArray[i].endx, mLsx, 0.001) &&
      Tol(lineArray[i].endy, mLsy, 0.001) &&
      lineArray[i].lineID != line
    ) {
      endpointsToMove.push(["start", "end", lineArray[i]]);
    }
    if (
      Tol(lineArray[i].endx, mLex, 0.001) &&
      Tol(lineArray[i].endy, mLey, 0.001) &&
      lineArray[i].lineID != line
    ) {
      endpointsToMove.push(["end", "end", lineArray[i]]);
    }
  }

  var retArray = [sx, sy, ex, ey, endpointsToMove];

  return retArray;
}

function moveLine(line, offsets) {
  if (line == 999) {
    return 0;
  }

  if (document.getElementById("results").style.visibility == "visible") {
    ClearStressVis();
  }

  var vertcount = 0;
  var horizcount = 0;
  for (i = 0; i < offsets[4].length; i++) {
    if (Tol(offsets[4][i][2].startx, offsets[4][i][2].endx, 0.0001)) {
      vertcount += 1;
    } else if (Tol(offsets[4][i][2].starty, offsets[4][i][2].endy, 0.0001)) {
      horizcount += 1;
    }
  }

  if (vertcount > 0 && horizcount == 0) {
    for (i = 0; i < lineArray.length; i++) {
      if (lineArray[i].lineID == line) {
        var l = lineArray[i];
        lineArray[i].starty = mouse.y - offsets[1];
        lineArray[i].endy = mouse.y - offsets[3];

        updateLinearDimension(line);
      }
    }
  } else if (vertcount == 0 && horizcount > 0) {
    for (i = 0; i < lineArray.length; i++) {
      if (lineArray[i].lineID == line) {
        var l = lineArray[i];
        lineArray[i].startx = mouse.x - offsets[0];
        lineArray[i].endx = mouse.x - offsets[2];
        updateLinearDimension(line);
      }
    }
  } else {
    for (i = 0; i < lineArray.length; i++) {
      if (lineArray[i].lineID == line) {
        var l = lineArray[i];
        lineArray[i].startx = mouse.x - offsets[0];
        lineArray[i].starty = mouse.y - offsets[1];
        lineArray[i].endx = mouse.x - offsets[2];
        lineArray[i].endy = mouse.y - offsets[3];

        updateLinearDimension(line);
      }
    }
  }

  for (i = 0; i < offsets[4].length; i++) {
    for (j = 0; j < lineArray.length; j++) {
      if (lineArray[j].lineID == offsets[4][i][2].lineID) {
        if (offsets[4][i][0] == "start" && offsets[4][i][1] == "start") {
          lineArray[j].startx = l.startx;
          lineArray[j].starty = l.starty;
        }
        if (offsets[4][i][0] == "end" && offsets[4][i][1] == "start") {
          lineArray[j].startx = l.endx;
          lineArray[j].starty = l.endy;
        }

        if (offsets[4][i][0] == "start" && offsets[4][i][1] == "end") {
          lineArray[j].endx = l.startx;
          lineArray[j].endy = l.starty;
        }
        if (offsets[4][i][0] == "end" && offsets[4][i][1] == "end") {
          lineArray[j].endx = l.endx;
          lineArray[j].endy = l.endy;
        }
        updateLinearDimension(lineArray[j].lineID);

        lineArray[j].angle = updateAngle(
          lineArray[j].startx,
          lineArray[j].starty,
          lineArray[j].endx,
          lineArray[j].endy
        );
        attachedAngleDimsID(lineArray[j].lineID);
      }
    }
  }

  closeOrOpenSection();

  Redraw();

  return 1;
}

function getEPs(eptomove) {
  if (eptomove[0] == false) {
    return 0;
  }

  var linesToMove = [];

  for (var i = 0; i < lineArray.length; i++) {
    if (
      Tol(lineArray[i].endx, eptomove[1], 0.001) &&
      Tol(lineArray[i].endy, eptomove[2], 0.001)
    ) {
      linesToMove.push(["end", lineArray[i]]);
    } else if (
      Tol(lineArray[i].startx, eptomove[1], 0.001) &&
      Tol(lineArray[i].starty, eptomove[2], 0.001)
    ) {
      linesToMove.push(["start", lineArray[i]]);
    }
  }

  return linesToMove;
}

function moveEPs(ep) {
  if (ep == 0) {
    return 0;
  }

  if (ep.length <= 1) {
    return 0;
  }

  if (document.getElementById("results").style.visibility == "visible") {
    ClearStressVis();
  }

  for (var i = 0; i < ep.length; i++) {
    if (ep[i][0] == "start") {
      ep[i][1].startx = mouse.x;
      ep[i][1].starty = mouse.y;
      updateLinearDimension(ep[i][1].lineID);
      ep[i][1].angle = updateAngle(
        ep[i][1].startx,
        ep[i][1].starty,
        ep[i][1].endx,
        ep[i][1].endy
      );
      attachedAngleDims(ep);
    } else if (ep[i][0] == "end") {
      ep[i][1].endx = mouse.x;
      ep[i][1].endy = mouse.y;
      updateLinearDimension(ep[i][1].lineID);
      ep[i][1].angle = updateAngle(
        ep[i][1].startx,
        ep[i][1].starty,
        ep[i][1].endx,
        ep[i][1].endy
      );
      attachedAngleDims(ep);
    }
  }

  closeOrOpenSection();
  Redraw();
  return 1;
}

function updateAngle(sx, sy, ex, ey) {
  var angle = lineAngleFromOrigin(sx, sy, ex, ey);

  angle = angle - 90;
  if (angle <= 0) {
    angle = angle + 360;
  }
  angle = 360 - angle;

  return angle;
}

function attachedAngleDims(ep) {
  if (ep == 0) {
    return 0;
  }

  for (j = 0; j < ep.length; j++) {
    for (var i = 0; i < relAngleArray.length; i++) {
      a = relAngleArray[i];
      if (a.line1ID == ep[j][1].lineID || a.line2ID == ep[j][1].lineID) {
        relAngleArray.splice(i, 1);
      }
    }
  }
}

function attachedAngleDimsID(id) {
  if (id == 999) {
    return 0;
  }

  for (var i = 0; i < relAngleArray.length; i++) {
    a = relAngleArray[i];
    if (a.line1ID == id || a.line2ID == id) {
      relAngleArray.splice(i, 1);
    }
  }
}

document.getElementById("imgupload").onchange = function (evt) {
  PrintToLog("Trace from image clicked");
  cancelClicked();
  var tgt = evt.target || window.event.srcElement,
    files = tgt.files;

  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = () => showImage(fr);
    fr.readAsDataURL(files[0]);
  }
};

function showImage(fileReader) {
  PrintToLog("Uploaded an Image");
  ImageShown = true;
  imageObj.src = fileReader.result;
  imgWidth = imageObj.width;
  imgHeight = imageObj.height;

  whiteBackground = false;

  todcancelClicked();
}

function Redraw() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  c.putImageData(imageData, 0, 0);
  if (document.getElementById("results").style.visibility != "visible") {
    try {
      ci.drawImage(imageObj, imgXloc, imgYloc, imgWidth, imgHeight);
    } catch (err) {
      displayError("badimg", "Image type not supported.");
    }
  } else {
    ci.globalAlpha = 0.2;
    ci.drawImage(imageObj, imgXloc, imgYloc, imgWidth, imgHeight);
    ci.globalAlpha = 1;
  }

  if (dragLinesArray.length > 1) {
    for (var i = 1; i < dragLinesArray.length; i++) {
      c.setLineDash([]);
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(dragLinesArray[i - 1][0], dragLinesArray[i - 1][1]);
      c.lineTo(dragLinesArray[i][0], dragLinesArray[i][1]);
      c.strokeStyle = "red";
      c.stroke();
      c.lineWidth = 4;
      c.setLineDash([]);
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    l.drawline(LineColor);
  }

  for (var i = 0; i < arcArray.length; i++) {
    a = arcArray[i];
    var color = a.color;
    a.drawarc(color);
  }

  if (showDims == true) {
    for (var i = 0; i < linearDimArray.length; i++) {
      d = linearDimArray[i];
      if (d.showDim == true) {
        d.drawdim(d.value, d.x, d.y, "black");
      }
    }

    for (var i = 0; i < AngularDimArray.length; i++) {
      d = AngularDimArray[i];
      if (d.showDim == true) {
      }
    }
  }

  for (var i = 0; i < relAngleArray.length; i++) {
    d = relAngleArray[i];
    if (d.showDim == true) {
      d.drawdim(d.value, d.x, d.y, "black");
      d.drawdimarc(d.x, d.y);
      d.drawarchandle("gray", 0);
      d.drawchangemarker("black", 2);
    }
  }

  if (dispCx != 0) {
  }

  if ((zeroX != 0) & (showZeroZero == true)) {
  }

  for (var i = 0; i < labelArray.length; i++) {
    la = labelArray[i];
    if (la.type == "max") {
      if (ShowMax == true) {
        la.drawlabel(la.value, la.xloc, la.yloc, "black");
      }
    } else {
      la.drawlabel(la.value, la.xloc, la.yloc, "black");
    }
  }

  for (var i = 0; i < connectedPointsArray.length; i++) {
    var cP = connectedPointsArray[i];
    drawConnectionPoint(cP[0], cP[1]);
  }

  for (var i = 0; i < unConnectedLinesArray.length; i++) {
    c.beginPath();
    c.arc(
      unConnectedLinesArray[i][0],
      unConnectedLinesArray[i][1],
      25,
      Math.PI * 2,
      false
    );
    c.lineWidth = 1.5;
    c.setLineDash([3, 3]);
    c.strokeStyle = "red";
    c.stroke();
  }

  drawConnectionPoint(10, 10);
}

document.getElementById("menubar").addEventListener("click", function () {});

function mouseInToolArea() {
  var toolsMenuBox = document
    .getElementById("toolsmenu")
    .getBoundingClientRect();

  var inToolArea = false;
  var heightIn = false;
  var widthIn = false;

  if (mouse.x > toolsMenuBox.left && mouse.x < toolsMenuBox.right) {
    widthIn = true;
  }
  if (mouse.y > toolsMenuBox.top && mouse.y < toolsMenuBox.bottom) {
    heightIn = true;
  }

  if (heightIn == true && widthIn == true) {
    inToolArea = true;
    InToolsMenu == true;
  } else {
    InToolsMenu = false;
  }

  return inToolArea;
}

function mouseInFlagArea() {
  var toolsMenuBox = document
    .getElementById("pricinglink")
    .getBoundingClientRect();

  var logoBox = document.getElementById("logospace").getBoundingClientRect();

  var inToolArea = false;
  var heightIn = false;
  var widthIn = false;

  if (
    (mouse.x > toolsMenuBox.left && mouse.x < toolsMenuBox.right) ||
    (mouse.x > logoBox.left && mouse.x < logoBox.right)
  ) {
    widthIn = true;
  }
  if (
    (mouse.y > toolsMenuBox.top && mouse.y < toolsMenuBox.bottom) ||
    (mouse.y > logoBox.top && mouse.y < logoBox.bottom)
  ) {
    heightIn = true;
  }

  if (heightIn == true && widthIn == true) {
    inToolArea = true;
    InFlagArea == true;
  } else {
    InFlagArea = false;
  }

  return inToolArea;
}

function mouseInMenuArea() {
  var MenuBox = document.getElementById("menubar").getBoundingClientRect();

  var inMenuArea = false;
  var heightIn = false;
  var widthIn = false;

  if (mouse.x > MenuBox.left && mouse.x < MenuBox.right) {
    widthIn = true;
  }
  if (mouse.y > MenuBox.top && mouse.y < MenuBox.bottom) {
    heightIn = true;
  }

  if (heightIn == true && widthIn == true) {
    inMenuArea = true;
  }

  return inMenuArea;
}

function mouseInRG() {
  var MenuBox = document.getElementById("resultsgrab").getBoundingClientRect();

  var inMenuArea = false;
  var heightIn = false;
  var widthIn = false;

  if (mouse.x >= MenuBox.left - 10 && mouse.x <= MenuBox.right + 10) {
    widthIn = true;
  }
  if (mouse.y >= MenuBox.top - 10 && mouse.y <= MenuBox.bottom + 10) {
    heightIn = true;
  }

  if (heightIn == true && widthIn == true) {
    inMenuArea = true;
    mouseInResultsGrab = true;
  } else {
    mouseInResultsGrab = false;
  }

  return inMenuArea;
}

function mouseInResultsKeepout() {
  var MenuBox = document
    .getElementById("resultskeepout")
    .getBoundingClientRect();

  var inMenuArea = false;
  var heightIn = false;
  var widthIn = false;

  if (document.getElementById("resultskeepout").style.visibility == "visible") {
    if (mouse.x > MenuBox.left && mouse.x < MenuBox.right) {
      widthIn = true;
    }
    if (mouse.y > MenuBox.top && mouse.y < MenuBox.bottom) {
      heightIn = true;
    }

    if (heightIn == true && widthIn == true) {
      inMenuArea = true;
      if (drawingMode != "dragresultsbox") {
        mouseState = "moving";
        MouseInKeepOut = true;
      }
    } else {
      MouseInKeepOut = false;
    }
  }

  return inMenuArea;
}

function mouseInRadiusBox() {
  var toolsMenuBox = document
    .getElementById("filletsInput")
    .getBoundingClientRect();

  var inToolArea = false;
  var heightIn = false;
  var widthIn = false;

  if (mouse.x > toolsMenuBox.left && mouse.x < toolsMenuBox.right) {
    widthIn = true;
  }
  if (mouse.y > toolsMenuBox.top && mouse.y < toolsMenuBox.bottom) {
    heightIn = true;
  }

  if ((heightIn == true && widthIn == true) || mouseInFilletsInput == true) {
    inToolArea = true;
  } else if (mouseInFilletsInput == false) {
    inToolArea = false;
  } else {
    inToolArea = false;
  }

  return inToolArea;
}

document.getElementById("pricinglink").addEventListener(
  "mouseenter",
  function () {
    InFlagArea = true;
  },
  false
);

document.getElementById("pricinglink").addEventListener(
  "mouseleave",
  function () {
    InFlagArea = false;
  },
  false
);

document.getElementById("canvas").addEventListener("mousedown", function () {
  if (drawingMode != "dragresultsbox") {
    mouseState = "moving";
    MouseInKeepOut = false;
  }
  InToolsMenu = false;
});

document
  .getElementById("canvas")
  .addEventListener("mouseenter", function () {}, false);

document.getElementById("results").addEventListener(
  "mouseenter",
  function () {
    if (drawingMode != "dragresultsbox") {
      mouseState = "moving";
    }
  },
  false
);

document.getElementById("results").addEventListener(
  "mouseleave",
  function () {
    if (drawingMode != "dragresultsbox") {
      mouseState = "moving";
    }
  },
  false
);

document.getElementById("resultskeepout").addEventListener(
  "mouseenter",
  function () {
    if (drawingMode != "dragresultsbox") {
      mouseState = "moving";
      MouseInKeepOut = true;
    }
  },
  false
);

document.getElementById("resultskeepout").addEventListener(
  "mouseleave",
  function () {
    if (drawingMode != "dragresultsbox") {
      mouseState = "moving";
      MouseInKeepOut = false;
    }
  },
  false
);

document.getElementById("resultsgrab").addEventListener(
  "mouseenter",
  function () {
    mouseInResultsGrab = true;
  },
  false
);

document.getElementById("resultsgrab").addEventListener(
  "mouseleave",
  function () {
    mouseInResultsGrab = false;
  },
  false
);

document.getElementById("toolsmenu").addEventListener(
  "mouseenter",
  function () {
    if (drawingMode != "fillets") {
      mouseState = "moving";
      MouseInKeepOut = true;
      InToolsMenu = true;
    }
  },
  false
);

document.getElementById("toolsmenu").addEventListener(
  "mouseleave",
  function () {
    mouseState = "moving";
    MouseInKeepOut = false;
    InToolsMenu = false;
  },
  false
);

document.getElementById("menubar").addEventListener(
  "mouseenter",
  function () {
    mouseState = "moving";
    MouseInKeepOut = true;
  },
  false
);

document.getElementById("menubar").addEventListener(
  "mouseleave",
  function () {
    mouseState = "moving";
    MouseInKeepOut = false;
  },
  false
);

function switchToPointer() {
  if (InToolsMenu == true) {
    dragLinesArray = [];
    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "pointer";
  } else if (MouseInKeepOut == true) {
    dragLinesArray = [];
    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "default";
  } else if (drawingMode == "snip") {
    document.getElementById("snipcursor").style.visibility = "visible";
    document.body.style.cursor = "none";
  } else if (drawingMode == "erase") {
    document.getElementById("erasecursor").style.visibility = "visible";
    document.body.style.cursor = "none";
  } else if (drawingMode == "dragdimension") {
    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "crosshair";
  } else if (drawingMode == "draghandle") {
    document.getElementById("snipcursor").style.visibility = "hidden";
    document.getElementById("erasecursor").style.visibility = "hidden";
    document.body.style.cursor = "crosshair";
  } else {
    document.body.style.cursor = "crosshair";
  }
}

function hsdims() {
  if (showDims == true) {
    showDims = false;
    var hsdimsbtn = document.getElementById("hsdims");
    hsdimsbtn.innerHTML = "Show Dims.";
    PrintToLog("Hide Dimensions Clicked");
  } else {
    showDims = true;
    var hsdimsbtn = document.getElementById("hsdims");
    hsdimsbtn.innerHTML = "Hide Dimensions";
    PrintToLog("Show Dimensions Clicked");
  }
  Redraw();
}

function setColor() {
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
  PrintToLog("Set Line Color Clicked");
}

function closeColorOptions() {
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

function rerunAfterColorChange() {
  SendShape();
  document.getElementById("loader").style.visibility = "visible";
  bottomLeftPoint();
  UtilityPointDraw(displayProperties);
  StressGradientShown = true;
}

function color1Clicked() {
  LineColor = "#dedede";
  intersectColor = "gray";
  DimColor = "black";
  FillColor = "inside1";
  closeColorOptions();
  ClearStressVis();
  rerunAfterColorChange();
  PrintToLog("Color Set To gray");
}
function color2Clicked() {
  LineColor = "#0BD9B0";
  intersectColor = "#0086CB";
  DimColor = "black";
  FillColor = "inside2";
  closeColorOptions();
  ClearStressVis();
  rerunAfterColorChange();
  PrintToLog("Color Set To green");
}
function color3Clicked() {
  LineColor = "#0077B3";
  intersectColor = "blue";
  DimColor = "white";
  FillColor = "inside3";
  closeColorOptions();
  ClearStressVis();
  rerunAfterColorChange();
  PrintToLog("Color Set To blue");
}
function color4Clicked() {
  LineColor = "black";
  intersectColor = "blue";
  DimColor = "white";
  FillColor = "inside1";
  closeColorOptions();
  ClearStressVis();
  rerunAfterColorChange();
  PrintToLog("Color Set To black");
}

function isbetween(x, b1, b2, inclusive) {
  var isbetween = false;
  var tolerance = 0.00000001;

  if (inclusive == true) {
    if (x >= b1 && b2 >= x) {
      isbetween = true;
    } else if (x >= b2 && b1 >= x) {
      isbetween = true;
    } else if (Tol(x, b1, tolerance) || Tol(b2, x, tolerance)) {
      isbetween = true;
    }
  } else {
    if (x > b1 && b2 > x) {
      isbetween = true;
    } else if (x > b2 && b1 > x) {
      isbetween = true;
    }
  }
  return isbetween;
}

function updateUserMoves(move) {
  userMoves.push([move]);
  redoMoves = [];
}

function updateRedoMoves(move) {
  redoMove = move;
}

function mouseInDrawingArea() {
  var inbounds = true;

  if (
    mouse.x < 0 ||
    mouse.y < 0 ||
    mouse.x > canvas.width ||
    mouse.y > canvas.height
  ) {
    inbounds = false;
  }

  if (mouseInToolArea() == true) {
    inbounds = false;
  }

  if (InToolsMenu == true) {
    inbounds = false;
  }

  if (drawingMode != "dragresultsbox" && drawingMode != "dragradiusbox") {
    mouseInResultsKeepout();

    if (MouseInKeepOut == true) {
      inbounds = false;
    }
  }

  if (mouseInMenuArea() == true) {
    inbounds = false;
  }

  if (mouseInFlagArea() == true) {
    inbounds = false;
  }

  if (InFlagArea == true) {
    inbounds = false;
  }
  mouseInRG();

  return inbounds;
}

function Line(
  startx,
  starty,
  endx,
  endy,
  dim,
  lineID,
  lineLength,
  constLine,
  angle,
  startxghost,
  startyghost,
  endxghost,
  endyghost,
  midpointX,
  midpointY
) {
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

  this.drawline = function (color) {
    if (this.constLine == true) {
      var clr = color;
      c.setLineDash([6, 6]);
      c.lineWidth = 1;
    } else {
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

    if (firstLineDrawn == false) {
      firstLineDrawn = true;
    }
  };
}

function packageForPy(lines, arcs) {
  var lineOrArc = "null";
  var m = 0;
  var yFromBottom = 0;
  var b = 0;
  var retArray = [];
  var addArray = [];
  var retString = "[[";

  for (var i = 0; i < lines.length; i++) {
    var l = lines[i];
    if (l.constLine != true) {
      lineOrArc = "line";
      if (l.startx > l.endx) {
        xmin = l.endx * Scale;
        xmax = l.startx * Scale;
      } else if (l.startx < l.endx) {
        xmin = l.startx * Scale;
        xmax = l.endx * Scale;
      } else {
        xmin = "vert";
        xmax = l.endx * Scale;
      }
      m = (l.endy - l.starty) / (l.startx - l.endx);

      if (Math.abs(m) > 10000) {
        xmin = "vert";
        xmax = l.endx * Scale;
      }
      yFromBottom = canvas.height - l.starty;
      b = yFromBottom * Scale - m * (l.startx * Scale);

      if (i != 0) {
        retString += ",[";
      }

      addArray = [lineOrArc, xmin, xmax, m, b, "null", "null", "null"];
      for (var j = 0; j < addArray.length; j++) {
        if (
          isNaN(addArray[j]) ||
          addArray[j] == Infinity ||
          addArray[j] == -Infinity
        ) {
          retString += "'";
        }
        retString += addArray[j];
        if (
          isNaN(addArray[j]) ||
          addArray[j] == Infinity ||
          addArray[j] == -Infinity
        ) {
          retString += "'";
        }
        if (j != addArray.length - 1) {
          retString += ",";
        }
        if (j == addArray.length - 1) {
          retString += "]";
        }
      }
    }
  }

  for (var i = 0; i < arcArray.length; i++) {
    lineOrArc = "arc";
    var a = arcArray[i];

    var rstart = 0;
    var rend = 0;

    if (a.radstart < 0) {
      rstart = a.radstart + 2 * Math.PI;
      if (rstart < 0) {
        rstart = rstart + 2 * Math.PI;
      }
    } else if (a.radstart > 2 * Math.PI) {
      rstart = a.radstart - 2 * Math.PI;
      if (rstart > 2 * Math.PI) {
        rstart = rstart - 2 * Math.PI;
      }
    } else {
      rstart = a.radstart;
    }
    rstart = 2 * Math.PI - rstart;

    if (a.radend < 0) {
      rend = a.radend + 2 * Math.PI;
      if (rend < 0) {
        rend = rend + 2 * Math.PI;
      }
    } else if (a.radend > 2 * Math.PI) {
      rend = a.radend - 2 * Math.PI;
      if (rend > 2 * Math.PI) {
        rend = rend - 2 * Math.PI;
      }
    } else {
      rend = a.radend;
    }

    rend = 2 * Math.PI - rend;

    var arcRads = 0;

    if (rstart > rend) {
      arcRads = rstart - rend;
    } else if (rstart < rend) {
      arcRads = rstart + 2 * Math.PI - rend;
    }

    var arcIncrement = arcRads / 100000;

    var xTest = 0;
    var localXMin = 999999;
    var localXMax = 0;

    if (rstart > rend) {
      for (var rTest = rstart; rTest > rend; rTest = rTest - arcIncrement) {
        xTest = a.centroidx * Scale + a.radius * Scale * Math.cos(rTest);
        if (xTest < localXMin) {
          localXMin = xTest;
        }
        if (xTest > localXMax) {
          localXMax = xTest;
        }
      }
    }

    if (rend > rstart) {
      for (var rTest = rstart; rTest > 0; rTest = rTest - arcIncrement) {
        xTest = a.centroidx * Scale + a.radius * Scale * Math.cos(rTest);
        if (xTest < localXMin) {
          localXMin = xTest;
        }
        if (xTest > localXMax) {
          localXMax = xTest;
        }
      }
      for (
        var rTest = 2 * Math.PI;
        rTest >= rend;
        rTest = rTest - arcIncrement
      ) {
        xTest = a.centroidx * Scale + a.radius * Scale * Math.cos(rTest);
        if (xTest < localXMin) {
          localXMin = xTest;
        }
        if (xTest > localXMax) {
          localXMax = xTest;
        }
      }
    }

    retString += ",['";

    centroidyFromBottom = canvas.height - a.centroidy;

    addArray = [
      lineOrArc + "'",
      localXMin,
      localXMax,
      a.centroidx * Scale,
      centroidyFromBottom * Scale,
      a.radius * Scale,
      rstart,
      rend,
    ];

    for (var j = 0; j < addArray.length; j++) {
      retString += addArray[j];
      if (j != addArray.length - 1) {
        retString += ",";
      }
      if (j == addArray.length - 1) {
        retString += "]";
      }
    }
  }

  retString += "," + analysisID.toString() + ",";
  retString += "]";

  if (retString.substr(0, 4) == "[[,[") {
    retString = retString.replace("[[,[", "[[");
  }

  return retString;
}

function Rectangle(cx, cy, b, w, color, groupid) {
  this.cx = cx;
  this.cy = cy;
  this.b = b;
  this.w = w;
  this.color = color;
  this.groupid = 0;

  this.drawrect = function () {
    c.fillStyle = color;
    c.fillRect(cx - b / 2, cy - w / 2, b, w);
    c.stroke();
  };
}

function LinearDimension(
  value,
  x,
  y,
  elementID,
  showDim,
  startx,
  starty,
  endx,
  endy,
  orientation,
  startx1,
  starty1,
  endx1,
  endy1,
  startx2,
  starty2,
  endx2,
  endy2,
  type,
  angle,
  xoffset1,
  yoffset1,
  xoffset2,
  yoffset2,
  perpOffset
) {
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

  this.drawdim = function (valuetopass, xpass, ypass, color) {
    if (this.value == 0 && lineArray.length == 1) {
      this.selectForChange = true;
    }

    if (Tol(this.value, 0, 0.001) && this.selectForChange == false) {
      this.showDim = false;
    }

    if (this.selectForChange == false) {
      valuetopass = valuetopass.toFixed(Precision);

      numberofdigits = String(valuetopass).match(/\d/g).length;

      this.boxwidth = numberofdigits * 5 + 10;
      c.fillStyle = LineColor;
      c.fillRect(xpass - 1, ypass + 2, this.boxwidth, -12);
      c.stroke();

      this.digits = String(valuetopass).match(/\d/g).length;

      if (TouchMode != true) {
        this.bbwidth = this.digits * 8;
      } else {
        this.bbwidth = this.digits * 20;
        this.bbheight = 20;
      }
      c.font = "11px Arial";
      c.fillStyle = DimColor;
      c.fillText(valuetopass, xpass, ypass);
      c.fillStyle = DimColor;
    } else {
      c.fillStyle = LineColor;
      c.fillRect(xpass - 1, ypass + 2, this.boxwidth, -12);
      c.stroke();
      if (ChangePreviewValue == null) {
        c.font = "11px Arial";
        c.fillStyle = DimColor;
        c.fillText(" |...", xpass, ypass);
        c.fillStyle = DimColor;
      } else {
        if (String(ChangePreviewValue).match(/\d/g) != null) {
          numberofdigits = String(ChangePreviewValue).match(/\d/g).length;
          boxwidth = numberofdigits * 5 + 10;

          c.fillStyle = LineColor;
          c.fillRect(xpass - 1, ypass + 2, boxwidth, -12);
          c.stroke();
          c.font = "11px Arial";
          c.fillStyle = DimColor;
          c.fillText(ChangePreviewValue + "|", xpass, ypass);
          c.fillStyle = DimColor;
        }
      }
    }
  };

  this.drawdimline = function (xtopass, ytopass) {
    this.startx1 = this.startx;
    this.starty1 = this.starty;
    this.endx1 = this.endx;
    this.endy1 = this.endy;
    this.startx2 = this.startx;
    this.starty2 = this.starty;
    this.endx2 = this.endx;
    this.endy2 = this.endy;
    this.angle = this.angle;

    c.strokeStyle = "black";
    c.lineWidth = 0.5;

    var offsetdistance = this.offset;
    var startx1 = 0;
    var starty1 = 0;
    var endx1 = 0;
    var endy1 = 0;

    var totalDist = Math.pow(
      Math.pow(this.startx - xtopass, 2) + Math.pow(this.starty - ytopass, 2),
      0.5
    );

    var Phi = lineAngleFromOrigin(this.startx, this.starty, xtopass, ytopass);

    Phi = Phi - 90;
    if (Phi <= 0) {
      Phi = Phi + 360;
    }
    Phi = 360 - Phi;

    var deltaPhi = Phi - this.angle;

    var distAlong = totalDist * Math.cos((Math.PI / 180) * deltaPhi);
    var distPerp = totalDist * Math.sin((Math.PI / 180) * deltaPhi);

    offsetdistance = distPerp + this.perpOffset;

    startx1 =
      this.startx - offsetdistance * Math.sin((Math.PI / 180) * this.angle);
    starty1 =
      this.starty - offsetdistance * Math.cos((Math.PI / 180) * this.angle);

    endx1 =
      xtopass -
      this.xoffset1 * Math.cos((Math.PI / 180) * this.angle) -
      this.perpOffset * Math.sin((Math.PI / 180) * this.angle);
    endy1 =
      ytopass +
      this.yoffset1 * Math.sin((Math.PI / 180) * this.angle) -
      this.perpOffset * Math.cos((Math.PI / 180) * this.angle);

    startx2 =
      this.endx - offsetdistance * Math.sin((Math.PI / 180) * this.angle);
    starty2 =
      this.endy - offsetdistance * Math.cos((Math.PI / 180) * this.angle);

    starty2 = Math.round(starty2);
    starty1 = Math.round(starty1);
    startx1 = Math.round(startx1);
    startx2 = Math.round(startx2);

    endx2 =
      xtopass +
      this.xoffset2 * Math.cos((Math.PI / 180) * this.angle) -
      this.perpOffset * Math.sin((Math.PI / 180) * this.angle);
    endy2 =
      ytopass -
      this.yoffset2 * Math.sin((Math.PI / 180) * this.angle) -
      this.perpOffset * Math.cos((Math.PI / 180) * this.angle);

    var dontShowLine1 = false;
    var dontShowLine2 = false;

    if (this.angle > 0 && this.angle <= 90) {
      if (
        (endx1 <= startx1 || Tol(endx1, startx1, 1)) &&
        (endy1 >= starty1 || Tol(endy1, starty1, 1))
      ) {
        dontShowLine1 = true;
      } else if (
        (endx2 >= startx2 || Tol(endx2, startx2, 1)) &&
        (endy2 <= starty2 || Tol(endy2, starty2, 1))
      ) {
        dontShowLine2 = true;
      }
    } else if (this.angle == 0 || this.angle == 360) {
      if (endx1 <= startx1 || Tol(endx1, startx1, 1)) {
        dontShowLine1 = true;
      } else if (endx2 >= startx2 || Tol(endx2, startx2, 1)) {
        dontShowLine2 = true;
      }
    } else if (this.angle > 90 && this.angle <= 180) {
      if (
        (endx1 >= startx1 || Tol(endx1, startx1, 1)) &&
        (endy1 >= starty1 || Tol(endy1, starty1, 1))
      ) {
        dontShowLine1 = true;
      } else if (
        (endx2 <= startx2 || Tol(endx2, startx2, 1)) &&
        (endy2 <= starty2 || Tol(endy2, starty2, 1))
      ) {
        dontShowLine2 = true;
      }
    } else if (this.angle > 180 && this.angle <= 270) {
      if (
        (endx1 >= startx1 || Tol(endx1, startx1, 1)) &&
        (endy1 <= starty1 || Tol(endy1, starty1, 1))
      ) {
        dontShowLine1 = true;
      } else if (
        (endx2 <= startx2 || Tol(endx2, startx2, 1)) &&
        (endy2 >= starty2 || Tol(endy2, starty2, 1))
      ) {
        dontShowLine2 = true;
      }
    } else if (this.angle > 270 && this.angle <= 360) {
      if (
        (endx1 <= startx1 || Tol(endx1, startx1, 1)) &&
        (endy1 <= starty1 || Tol(endy1, starty1, 1))
      ) {
        dontShowLine1 = true;
      } else if (
        (endx2 >= startx2 || Tol(endx2, startx2, 1)) &&
        (endy2 >= starty2 || Tol(endy2, starty2, 1))
      ) {
        dontShowLine2 = true;
      }
    }

    if (dontShowLine1 == false) {
      c.beginPath();
      c.moveTo(startx1, starty1);
      c.lineTo(endx1, endy1);
      c.stroke();
    }

    if (dontShowLine2 == false) {
      c.beginPath();
      c.moveTo(startx2, starty2);
      c.lineTo(endx2, endy2);
      c.stroke();
    }

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

    if (this.orientation == "fillet") {
      c.setLineDash([1, 2]);
      c.beginPath();
      c.moveTo(this.startx, this.starty);
      c.lineTo(this.endx, this.endy);
      c.stroke();
      c.setLineDash([]);
    } else {
      c.lineWidth = 2;
    }
  };

  c.lineWidth = 2;
}

function AngularDimension(value, x, y, elementID, showDim, startx, starty) {
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

  this.drawdim = function (valuetopass, xpass, ypass, color) {
    var displayValueArray = arcDisplayValue(this.value);

    this.caseNumber = displayValueArray[0];
    this.displayValue = displayValueArray[1];
    this.startOffset = displayValueArray[2];

    valuetopass = this.displayValue;

    if (Scale == 0) {
      this.selectForChange = false;
    }

    if (this.selectForChange == false) {
      valuetopass = valuetopass.toFixed(Precision);
      this.digits = String(valuetopass).match(/\d/g).length;
      this.bbwidth = this.digits * 8;
      c.font = "14px Arial";
      c.fillStyle = color;
      c.fillText(valuetopass, xpass, ypass);
      c.fillStyle = "black";
    } else {
      if (ChangePreviewValue == null) {
        c.font = "14px Arial";
        c.fillStyle = "blue";
        c.fillText(" |...", xpass, ypass);
        c.fillStyle = "black";
      } else {
        c.font = "14px Arial";
        c.fillStyle = "blue";
        c.fillText(ChangePreviewValue + "|", xpass, ypass);
        c.fillStyle = "black";
      }
    }
  };

  this.drawdimarc = function (xtopass, ytopass) {
    var maxRadius = 25;
    radius = maxRadius;

    var avgtheta =
      (2 * Math.PI -
        (this.displayValue + this.startOffset) * (Math.PI / 180) +
        (2 * Math.PI - this.startOffset * (Math.PI / 180))) /
      2;
    var xfromcentroid = radius * Math.cos(avgtheta);
    var yfromcentroid = radius * Math.sin(avgtheta);

    var dimlineYstart = ytopass + yfromcentroid;
    var dimlineXstart = xtopass + xfromcentroid;

    var leaderAngle = lineAngleFromOrigin(
      dimlineXstart,
      dimlineYstart,
      this.x,
      this.y
    );

    if (leaderAngle > 196 && leaderAngle < 345) {
      leaderEndx = this.x + 9 * this.digits;
      leaderEndy = this.y - 5;
    } else {
      leaderEndx = this.x;
      leaderEndy = this.y - 5;
    }
    c.beginPath();
    c.strokeStyle = "black";
    c.lineWidth = 0.5;
    c.arc(
      xtopass,
      ytopass,
      radius,
      2 * Math.PI - (this.displayValue + this.startOffset) * (Math.PI / 180),
      2 * Math.PI - this.startOffset * (Math.PI / 180),
      false
    );
    c.stroke();

    c.setLineDash([]);
    c.beginPath();
    c.moveTo(leaderEndx, leaderEndy);
    c.lineTo(dimlineXstart, dimlineYstart);
    c.stroke();

    c.setLineDash([1, 2]);
    c.beginPath();
    c.moveTo(xtopass, ytopass);
    if (this.caseNumber == 1) {
      c.lineTo(xtopass + radius, ytopass);
    } else if (this.caseNumber == 2) {
      c.lineTo(xtopass, ytopass - radius);
    } else if (this.caseNumber == 3) {
      c.lineTo(xtopass - radius, ytopass);
    } else if (this.caseNumber == 4) {
      c.lineTo(xtopass, ytopass + radius);
    }
    c.stroke();
    c.setLineDash([]);
    c.lineWidth = 2;
  };
}

function AngleRelDimension(
  value,
  x,
  y,
  elementID,
  showDim,
  radstart,
  radend,
  centroidx,
  centroidy,
  radius,
  line1ID,
  line2ID,
  direction,
  handlex,
  handley,
  changemarkerx,
  changemarkery,
  displayFlippedArc
) {
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

  this.drawdim = function (valuetopass, xpass, ypass, color) {
    if (this.displayFlippedArc == true) {
      valuetopass = 360 - this.value;
    } else {
      valuetopass = this.value;
    }

    if (Scale == 0) {
      this.selectForChange = false;
    }

    if (this.selectForChange == false) {
      valuetopass = valuetopass.toFixed(Precision);
      this.digits = String(valuetopass).match(/\d/g).length;
      if (TouchMode != true) {
        this.bbwidth = this.digits * 8;
      } else {
        this.bbwidth = this.digits * 20;
        this.bbheight = 20;
      }
      c.font = "14px Arial";
      c.fillStyle = color;
      c.fillText(valuetopass, xpass, ypass);
      c.fillStyle = "black";
    } else {
      if (ChangePreviewValue == null) {
        c.font = "14px Arial";
        c.fillStyle = "blue";
        c.fillText(" |...", xpass, ypass);
        c.fillStyle = "black";
      } else {
        c.font = "14px Arial";
        c.fillStyle = "blue";
        c.fillText(ChangePreviewValue + "|", xpass, ypass);
        c.fillStyle = "black";
      }
    }
  };

  this.drawdimarc = function (xtopass, ytopass) {
    var radius = Math.pow(
      Math.pow(this.handlex - this.centroidx, 2) +
        Math.pow(this.handley - this.centroidy, 2),
      0.5
    );

    this.radius = radius;

    var leaderAngle = lineAngleFromOrigin(
      this.handlex,
      this.handley,
      this.x,
      this.y
    );

    if (leaderAngle > 196 && leaderAngle < 345) {
      leaderEndx = this.x + 9 * this.digits;
      leaderEndy = this.y - 5;
    } else {
      leaderEndx = this.x;
      leaderEndy = this.y - 5;
    }

    if (this.displayFlippedArc == true) {
      var radstartDisplay = this.radend;
      var radendDisplay = this.radstart;
    } else {
      var radstartDisplay = this.radstart;
      var radendDisplay = this.radend;
    }

    c.beginPath();
    c.strokeStyle = "black";
    c.lineWidth = 0.5;
    c.arc(
      this.centroidx,
      this.centroidy,
      radius,
      radstartDisplay,
      radendDisplay,
      false
    );
    c.stroke();

    c.setLineDash([]);
    c.beginPath();
    c.moveTo(leaderEndx, leaderEndy);
    c.lineTo(this.handlex, this.handley);
    c.stroke();

    c.setLineDash([]);
    c.lineWidth = 2;
  };

  this.drawarchandle = function (color, size) {
    c.beginPath();
    c.arc(this.handlex, this.handley, size, 0, Math.PI * 2, false);
    c.fillStyle = color;
    c.fill();
    c.fillStyle = "black";
  };

  this.drawchangemarker = function (color, size) {
    var dontdrawit = false;

    var arcstartx = this.centroidx + this.radius * Math.cos(this.radstart);
    var arcstarty = this.centroidy + this.radius * Math.sin(this.radstart);
    var arcendx = this.centroidx + this.radius * Math.cos(this.radend);
    var arcendy = this.centroidy + this.radius * Math.sin(this.radend);

    if (isonline(arcstartx, arcstarty, "SNIP") == this.line2ID) {
      this.changemarkerx = arcstartx;
      this.changemarkery = arcstarty;
    } else if (isonline(arcendx, arcendy, "SNIP") == this.line2ID) {
      this.changemarkerx = arcendx;
      this.changemarkery = arcendy;
    } else {
      dontdrawit = true;
    }

    if (this.value > 1 && dontdrawit == false) {
      c.beginPath();
      c.arc(
        this.changemarkerx,
        this.changemarkery,
        size,
        0,
        Math.PI * 2,
        false
      );
      c.fillStyle = color;
      c.fill();
      c.fillStyle = "black";
    }
  };
}

function arcDisplayValue(value) {
  var caseNumber = 0;
  var displayValue = 0;
  var startOffset = 0;

  if (value >= 0 && value < 90) {
    displayValue = value;
    caseNumber = 1;
    startOffset = 0;
  } else if (value >= 90 && value < 180) {
    displayValue = value - 90;
    caseNumber = 2;
    startOffset = 90;
  } else if (value >= 180 && value < 270) {
    displayValue = value - 180;
    caseNumber = 3;
    startOffset = 180;
  } else if (value >= 270 && value < 360) {
    displayValue = value - 270;
    caseNumber = 4;
    startOffset = 270;
  }

  var retArray = [caseNumber, displayValue, startOffset];

  return retArray;
}

function Arc(
  centroidx,
  centroidy,
  radius,
  radstart,
  radend,
  arcID,
  Case,
  fx,
  fy,
  groupID,
  color,
  endpoint1x,
  endpoint1y,
  endpoint2x,
  endpoint2y,
  line1ID,
  line2ID
) {
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
  this.midpointX = 0;
  this.midpointY = 0;

  this.drawarc = function (color) {
    c.beginPath();
    c.arc(
      this.centroidx,
      this.centroidy,
      this.radius,
      this.radstart,
      this.radend
    );
    c.lineWidth = 2;
    c.strokeStyle = color;
    c.stroke();
  };
}

function createNewLine(mode) {
  var lineendx = 0;
  var lineendy = 0;
  var endpointSnap = isonendpoint("snap");
  var suggestSnapArray = suggestHVSnap("end", endpointSnap[3]);
  var snappedToEndpoint = false;
  var centroid = isoncentroid();
  var zerozero = isonzerozero();

  if (ControlDown == false) {
    if (drawingHV == true) {
      if (centroid == true) {
        lineendx = MasterCx / Scale;
        lineendy = MasterCy / Scale;
      } else if (zerozero == true) {
        lineendx = zeroX;
        lineendy = zeroY;
      } else if (endpointSnap[0] == true) {
        lineendx = endpointSnap[1];
        lineendy = endpointSnap[2];
        snappedToEndpoint = true;
      } else if (suggestSnapArray[0] == true) {
        lineendx = suggestSnapArray[1];
        lineendy = suggestSnapArray[2];
      } else {
        lineendx = previewLine.endx;
        lineendy = previewLine.endy;
      }
    } else {
      if (centroid == true) {
        lineendx = MasterCx / Scale;
        lineendy = MasterCy / Scale;
      } else if (zerozero == true) {
        lineendx = zeroX;
        lineendy = zeroY;
      } else if (endpointSnap[0] == true) {
        lineendx = endpointSnap[1];
        lineendy = endpointSnap[2];
        snappedToEndpoint = true;
      } else {
        lineendx = previewLine.endx;
        lineendy = previewLine.endy;
      }
    }
  } else {
    lineendx = previewLine.endx;
    lineendy = previewLine.endy;
  }

  var angle = lineAngleFromOrigin(
    previewLine.startx,
    previewLine.starty,
    lineendx,
    lineendy
  );

  angle = angle - 90;
  if (angle <= 0) {
    angle = angle + 360;
  }
  angle = 360 - angle;

  var suggestedAngle = suggestAngleSnaps(
    previewLine.startx,
    previewLine.starty,
    dragFromLineID
  );
  if (suggestedAngle != 999 && snappedToEndpoint == false) {
    angle = suggestedAngle;
  }

  lineArray.push(
    new Line(
      previewLine.startx,
      previewLine.starty,
      lineendx,
      lineendy,
      0,
      0,
      0,
      0,
      angle
    )
  );
  l = lineArray[lineArray.length - 1];
  l.lineID = ElementID;
  l.lineLength = Math.sqrt(
    Math.pow(l.startx - l.endx, 2) + Math.pow(l.starty - l.endy, 2)
  );

  LastSelectedDimID = ElementID;
  LastSelectedDimType = "linear";

  if (ConstructionLineMode == true || mode == "constLine") {
    l.constLine = true;
  }

  l.midpointX = (l.startx + l.endx) / 2;
  l.midpointY = (l.starty + l.endy) / 2;

  var dimXpos = l.startx + 2;
  var dimYpos = l.starty - 10;
  var actLength = l.lineLength * Scale;

  var offsetArray = findOffsets(
    actLength,
    l.startx,
    l.starty,
    l.endx,
    l.endy,
    angle
  );

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

  ChangePreviewValue = actLength.toFixed(Precision);
  document.getElementById("inputBox").value = actLength;

  if (ChangePreviewValue == 0) {
    ChangePreviewValue = null;
  }

  var showthedim = true;

  if (l.lineLength < 20) {
    var showthedim = false;
  }

  linearDimArray.push(
    new LinearDimension(
      actLength,
      l.midpointX - 10,
      l.midpointY + 5,
      ElementID,
      showthedim,
      dimlineXstart,
      dimlineYstart,
      dimlineXend,
      dimlineYend,
      orientation,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      angle,
      xoffset1,
      yoffset1,
      xoffset2,
      yoffset2,
      perpOffset
    )
  );

  d = linearDimArray[linearDimArray.length - 1];
  d.selectForChange = true;

  var dimLineLength = Math.sqrt(
    Math.pow(dimlineYstart - dimlineYend, 2) +
      Math.pow(dimlineXstart - dimlineXend, 2)
  );

  var showAngulardim = true;

  showAngularDim = false;

  if (dimLineLength != 0) {
    AngularDimArray.push(
      new AngularDimension(
        angle,
        dimXpos_a,
        dimYpos_a,
        ElementID,
        showAngularDim,
        l.startx,
        l.starty
      )
    );
  }

  if (Scale != 0) {
    if (linearDimArray.length > 1) {
      d = linearDimArray[linearDimArray.length - 2];
    }

    if (AngularDimArray.length > 1) {
    }
  }

  previewLine.startx = 0;
  previewLine.starty = 0;
  previewLine.endx = 0;
  previewLine.endy = 0;

  drawingHV = true;

  var numoflines = lineArray.length;
  var numoflinesforprint =
    "New Line Drawn. Number of lines: " + numoflines.toString();
  var lineidtoprint = "Line ID: " + l.lineID.toString();

  if (lineArray.length == 1) {
    var lengthoflinetoprint =
      "Length: " + actLength.toFixed(2).toString() + "(may be first line)";
  } else {
    var lengthoflinetoprint = "Length: " + actLength.toFixed(2).toString();
  }
  var angleoflinetoprint = "Angle: " + angle.toFixed(2).toString();

  var startoflinetoprint =
    "Start: " +
    "(" +
    l.startx.toFixed(2).toString() +
    ", " +
    l.starty.toFixed(2).toString() +
    ")";
  var endoflinetoprint =
    "End: " +
    "(" +
    l.endx.toFixed(2).toString() +
    ", " +
    l.endy.toFixed(2).toString() +
    ")";

  snappedToStartpoint = getStartSnap(l.lineID, l.startx, l.starty);

  var snapState = ", Not Snapped";

  if (snappedToStartpoint != 999 && snappedToEndpoint != true) {
    var snapState = ", Startpoint Snapped";
  }

  if (snappedToEndpoint == true && snappedToStartpoint == 999) {
    var snapState = ", Startpoint Snapped";
  }

  if (snappedToEndpoint == true && snappedToStartpoint != 999) {
    var snapState = ", Both Ends Snapped";
  }

  var numoflinesforprint =
    "New Line Drawn. Number of lines: " + numoflines.toString() + snapState;

  PrintToLog(numoflinesforprint);

  if (Scale == 0 && lineArray.length == 1) {
    displayFirstDimAlert();
  }
}

function getStartSnap(lineid, x, y) {
  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (
      Math.pow(Math.pow(l.startx - x, 2) + Math.pow(l.starty - y, 2), 0.5) < 0.5
    ) {
      if (lineid != l.lineID) {
        return l.lineID;
      }
    }

    if (
      Math.pow(Math.pow(l.endx - x, 2) + Math.pow(l.endy - y, 2), 0.5) < 0.5
    ) {
      if (lineid != l.lineID) {
        return l.lineID;
      }
    }
  }

  return 999;
}

function findOffsets(dim, startx, starty, endx, endy, angle) {
  var dimYpos = (starty + endy) / 2 + 5;
  var dimXpos = (startx + endx) / 2 - 10;
  var xoffset1 = 0;
  var yoffset1 = 0;
  var xoffset2 = 0;
  var yoffset2 = 0;
  var perpOffset = 0;
  var dimXpos_a = 0;
  var dimYpos_a = 0;

  var valuetopass = dim.toFixed(Precision);
  var digits = String(valuetopass).match(/\d/g).length;

  retArray = [
    dimYpos,
    dimXpos,
    xoffset1,
    yoffset1,
    xoffset2,
    yoffset2,
    dimYpos_a,
    dimXpos_a,
    perpOffset,
  ];

  return retArray;
}

function updateOffsets() {
  for (var j = 0; j < lineArray.length; j++) {
    l = lineArray[j];
    var angle = lineAngleFromOrigin(l.startx, l.starty, l.endx, l.endy);

    angle = angle - 90;
    if (angle <= 0) {
      angle = angle + 360;
    }
    angle = 360 - angle;

    var actLength = l.lineLength * Scale;

    var offsetArray = findOffsets(
      actLength,
      l.startx,
      l.starty,
      l.endx,
      l.endy,
      angle
    );
    var xoffset1 = offsetArray[2];
    var yoffset1 = offsetArray[3];
    var xoffset2 = offsetArray[4];
    var yoffset2 = offsetArray[5];
    var perpOffset = offsetArray[8];

    for (var i = 0; i < linearDimArray.length; i++) {
      d = linearDimArray[i];
      if (d.elementID == l.lineID) {
        d.xoffset1 = xoffset1;
        d.yoffset1 = yoffset1;
        d.xoffset2 = xoffset2;
        d.yoffset2 = yoffset2;
        d.perpOffset = perpOffset;
      }
    }
  }

  for (var i = 0; i < arcArray.length; i++) {
    a = arcArray[i];
    updateFilletDim(a.arcID);
  }
}

function createNewLineSnip(
  linestartx,
  linestarty,
  lineendx,
  lineendy,
  constLine
) {
  ElementID += 1;

  var angle = lineAngleFromOrigin(linestartx, linestarty, lineendx, lineendy);

  angle = angle - 90;
  if (angle <= 0) {
    angle = angle + 360;
  }
  angle = 360 - angle;

  lineArray.push(
    new Line(linestartx, linestarty, lineendx, lineendy, 0, 0, 0, 0, angle)
  );
  l = lineArray[lineArray.length - 1];
  l.lineID = ElementID;
  l.lineLength = Math.sqrt(
    Math.pow(l.startx - l.endx, 2) + Math.pow(l.starty - l.endy, 2)
  );
  l.constLine = constLine;
  l.midpointX = (l.startx + l.endx) / 2;
  l.midpointY = (l.starty + l.endy) / 2;

  LastSelectedDimID = ElementID;
  LastSelectedDimType = "linear";

  var dimXpos = l.startx + 2;
  var dimYpos = l.starty - 10;

  var actLength = l.lineLength * Scale;

  var offsetArray = findOffsets(
    actLength,
    l.startx,
    l.starty,
    l.endx,
    l.endy,
    angle
  );

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

  linearDimArray.push(
    new LinearDimension(
      actLength,
      dimXpos,
      dimYpos,
      ElementID,
      true,
      dimlineXstart,
      dimlineYstart,
      dimlineXend,
      dimlineYend,
      orientation,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      angle,
      xoffset1,
      yoffset1,
      xoffset2,
      yoffset2,
      perpOffset
    )
  );

  var dimLineLength = Math.sqrt(
    Math.pow(dimlineYstart - dimlineYend, 2) +
      Math.pow(dimlineXstart - dimlineXend, 2)
  );

  if (dimLineLength != 0) {
    AngularDimArray.push(
      new AngularDimension(
        angle,
        dimXpos_a,
        dimYpos_a,
        ElementID,
        false,
        l.startx,
        l.starty
      )
    );
  }

  document.getElementById("inputBox").value = "";

  return ElementID;
}

function Tol(n1, n2, tolerance) {
  var upperlimit = n1 + tolerance;
  var lowerlimit = n1 - tolerance;

  if (n2 >= lowerlimit && n2 <= upperlimit) {
    return true;
  } else {
    if (n2 - lowerlimit < 1 && n2 - lowerlimit > -1) {
    }
    return false;
  }
}

function drawDragLines(x, y) {
  var intersectingLine = 999;
  var intersectingFillet = 999;

  if (dragLinesArray.length > 1) {
    var lastDragLinePoint = dragLinesArray[dragLinesArray.length - 1];
    intersectingLine = Intersection(
      lastDragLinePoint[0],
      lastDragLinePoint[1],
      x,
      y
    );
  }
  dragLinesArray.push([x, y]);

  var intersectingArray = [intersectingLine, intersectingFillet];

  return intersectingArray;
}

function inboundsCheck() {
  var maxX = canvas.width - 10;
  var maxY = canvas.height - 10;
  var inBounds = true;

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.startx > maxX || l.starty > maxY || l.endx > maxX || l.endy > maxY) {
      inBounds = false;
    }
  }

  return inBounds;
}
function numberOfConnectedLinesAndArcs(keepRels) {
  var connectedLines = 0;
  var tolerance = 0.001;

  connectedPointsArray = [];

  for (var i = 0; i < lineArray.length; i++) {
    var nodeCount = 0;
    var startxconnected = false;
    var endxconnected = false;
    l1 = lineArray[i];
    if (l1.constLine != true) {
      for (var j = 0; j < lineArray.length; j++) {
        l2 = lineArray[j];
        if (l1.lineID != l2.lineID) {
          if (
            Tol(l1.startx, l2.startx, tolerance) &&
            Tol(l1.starty, l2.starty, tolerance) &&
            startxconnected == false &&
            l2.constLine != true
          ) {
            nodeCount++;
            connectedPointsArray.push([l1.startx, l1.starty]);
            startxconnected = true;
          }
          if (
            Tol(l1.startx, l2.endx, tolerance) &&
            Tol(l1.starty, l2.endy, tolerance) &&
            startxconnected == false &&
            l2.constLine != true
          ) {
            nodeCount++;
            connectedPointsArray.push([l1.startx, l1.starty]);
            startxconnected = true;
          }
          if (
            Tol(l1.endx, l2.startx, tolerance) &&
            Tol(l1.endy, l2.starty, tolerance) &&
            endxconnected == false &&
            l2.constLine != true
          ) {
            nodeCount++;
            connectedPointsArray.push([l1.endx, l1.endy]);
            endxconnected = true;
          }
          if (
            Tol(l1.endx, l2.endx, tolerance) &&
            Tol(l1.endy, l2.endy, tolerance) &&
            endxconnected == false &&
            l2.constLine != true
          ) {
            nodeCount++;
            connectedPointsArray.push([l1.endx, l1.endy]);
            endxconnected = true;
          }
        }
      }

      for (var j = 0; j < arcArray.length; j++) {
        l2 = arcArray[j];
        if (
          Tol(l1.startx, l2.endpoint1x, tolerance) &&
          Tol(l1.starty, l2.endpoint1y, tolerance) &&
          startxconnected == false
        ) {
          nodeCount++;
          connectedPointsArray.push([l1.startx, l1.starty]);
          startxconnected = true;
        }
        if (
          Tol(l1.startx, l2.endpoint2x, tolerance) &&
          Tol(l1.starty, l2.endpoint2y, tolerance) &&
          startxconnected == false
        ) {
          nodeCount++;
          connectedPointsArray.push([l1.startx, l1.starty]);
          startxconnected = true;
        }
        if (
          Tol(l1.endx, l2.endpoint1x, tolerance) &&
          Tol(l1.endy, l2.endpoint1y, tolerance) &&
          endxconnected == false
        ) {
          nodeCount++;
          connectedPointsArray.push([l1.endx, l1.endy]);
          endxconnected = true;
        }
        if (
          Tol(l1.endx, l2.endpoint2x, tolerance) &&
          Tol(l1.endy, l2.endpoint2y, tolerance) &&
          endxconnected == false
        ) {
          nodeCount++;
          connectedPointsArray.push([l1.endx, l1.endy]);
          endxconnected = true;
        }
      }
    }
    if (nodeCount > 1) {
      connectedLines++;
    }
  }

  for (var i = 0; i < arcArray.length; i++) {
    var nodeCount = 0;
    var startxconnected = false;
    var endxconnected = false;
    l1 = arcArray[i];
    for (var j = 0; j < lineArray.length; j++) {
      l2 = lineArray[j];
      if (
        Tol(l1.endpoint1x, l2.startx, tolerance) &&
        Tol(l1.endpoint1y, l2.starty, tolerance) &&
        startxconnected == false &&
        l2.constLine != true
      ) {
        nodeCount++;
        connectedPointsArray.push([l2.startx, l2.starty]);
        startxconnected = true;
      }
      if (
        Tol(l1.endpoint1x, l2.endx, tolerance) &&
        Tol(l1.endpoint1y, l2.endy, tolerance) &&
        startxconnected == false &&
        l2.constLine != true
      ) {
        nodeCount++;
        connectedPointsArray.push([l2.endx, l2.endy]);
        startxconnected = true;
      }
      if (
        Tol(l1.endpoint2x, l2.startx, tolerance) &&
        Tol(l1.endpoint2y, l2.starty, tolerance) &&
        endxconnected == false &&
        l2.constLine != true
      ) {
        nodeCount++;
        connectedPointsArray.push([l2.startx, l2.starty]);
        endxconnected = true;
      }
      if (
        Tol(l1.endpoint2x, l2.endx, tolerance) &&
        Tol(l1.endpoint2y, l2.endy, tolerance) &&
        endxconnected == false &&
        l2.constLine != true
      ) {
        nodeCount++;
        connectedPointsArray.push([l2.endx, l2.endy]);
        endxconnected = true;
      }
    }
    for (var j = 0; j < arcArray.length; j++) {
      a2 = arcArray[j];
      if (a2.arcID != l1.arcID) {
        if (
          Tol(l1.endpoint1x, a2.endpoint1x, tolerance) &&
          Tol(l1.endpoint1y, a2.endpoint1y, tolerance) &&
          startxconnected == false
        ) {
          nodeCount++;
          connectedPointsArray.push([l1.endpoint1x, l1.endpoint1y]);
          startxconnected = true;
        }
        if (
          Tol(l1.endpoint1x, a2.endpoint2x, tolerance) &&
          Tol(l1.endpoint1y, a2.endpoint2y, tolerance) &&
          startxconnected == false
        ) {
          nodeCount++;
          connectedPointsArray.push([l1.endpoint1x, l1.endpoint1y]);
          startxconnected = true;
        }
        if (
          Tol(l1.endpoint2x, a2.endpoint1x, tolerance) &&
          Tol(l1.endpoint2y, a2.endpoint1y, tolerance) &&
          endxconnected == false
        ) {
          nodeCount++;
          connectedPointsArray.push([l1.endpoint2x, l1.endpoint2y]);
          endxconnected = true;
        }
        if (
          Tol(l1.endpoint2x, a2.endpoint2x, tolerance) &&
          Tol(l1.endpoint2y, a2.endpoint2y, tolerance) &&
          endxconnected == false
        ) {
          nodeCount++;
          connectedPointsArray.push([l1.endpoint2x, l1.endpoint2y]);
          endxconnected = true;
        }
      }
    }
    if (nodeCount > 1) {
      connectedLines++;
    }
  }

  if (keepRels != true) {
    for (var j = 0; j < relAngleArray.length; j++) {
      var keep = false;
      for (var i = 0; i < connectedPointsArray.length; i++) {
        if (
          relAngleArray[j].centroidx == connectedPointsArray[i][0] &&
          relAngleArray[j].centroidy == connectedPointsArray[i][1]
        ) {
          keep = true;
        }
      }

      var keepcount = 0;
      for (var i = 0; i < lineArray.length; i++) {
        if (
          (Tol(relAngleArray[j].centroidx, lineArray[i].startxghost, 0.0001) &&
            Tol(
              relAngleArray[j].centroidy,
              lineArray[i].startyghost,
              0.0001
            )) ||
          (Tol(relAngleArray[j].centroidx, lineArray[i].endxghost, 0.0001) &&
            Tol(relAngleArray[j].centroidy, lineArray[i].endyghost, 0.0001))
        ) {
          keepcount += 1;
        }
      }

      if (keepcount == 2) {
        keep = true;
      }

      if (keep == false) {
        deletedim(relAngleArray[j].elementID);
        Redraw();
      }
    }
  }

  return connectedLines;
}

function removeZeroLengthLines() {
  var tolerance = 1.1;
  var removedlineID = 999;
  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];

    if (Tol(l.startx, l.endx, tolerance) && Tol(l.starty, l.endy, tolerance)) {
      lineArray.splice(i, 1);

      var numoflines = lineArray.length;
      if (drawingMode == "snip") {
        var numoflinesforprint =
          "Line " +
          l.lineID.toString() +
          " Deleted. Number of lines: " +
          numoflines.toString();
        PrintToLog(numoflinesforprint);
      }

      removedlineID = l.lineID;
      for (var j = 0; j < linearDimArray.length; j++) {
        d = linearDimArray[j];
        if (l.lineID == d.elementID) {
          linearDimArray.splice(j, 1);
        }
      }
      for (var j = 0; j < AngularDimArray.length; j++) {
        a = AngularDimArray[j];
        if (l.lineID == a.elementID) {
          AngularDimArray.splice(j, 1);
        }
      }
      for (var j = 0; j < relAngleArray.length; j++) {
        a = relAngleArray[j];
        if (l.lineID == a.line1ID || l.lineID == a.line2ID) {
          relAngleArray.splice(j, 1);
        }
      }
    }
  }
  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.startx == 0 || l.starty == 0 || l.endx == 0 || l.endy == 0) {
      lineArray.splice(i, 1);
      for (var j = 0; j < linearDimArray.length; j++) {
        d = linearDimArray[j];
        if (l.lineID == d.elementID) {
          linearDimArray.splice(j, 1);
        }
      }
      for (var j = 0; j < AngularDimArray.length; j++) {
        a = AngularDimArray[j];
        if (l.lineID == a.elementID) {
          AngularDimArray.splice(j, 1);
        }
      }
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (
      l.startx == undefined ||
      l.starty == undefined ||
      l.endx == undefined ||
      l.endy == undefined
    ) {
      lineArray.splice(i, 1);
      for (var j = 0; j < linearDimArray.length; j++) {
        d = linearDimArray[j];
        if (l.lineID == d.elementID) {
          linearDimArray.splice(j, 1);
        }
      }
      for (var j = 0; j < AngularDimArray.length; j++) {
        a = AngularDimArray[j];
        if (l.lineID == a.elementID) {
          AngularDimArray.splice(j, 1);
        }
      }
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (isNaN(l.lineLength)) {
      lineArray.splice(i, 1);
      for (var j = 0; j < linearDimArray.length; j++) {
        d = linearDimArray[j];
        if (l.lineID == d.elementID) {
          linearDimArray.splice(j, 1);
        }
      }
      for (var j = 0; j < AngularDimArray.length; j++) {
        a = AngularDimArray[j];
        if (l.lineID == a.elementID) {
          AngularDimArray.splice(j, 1);
        }
      }
    }
  }

  return removedlineID;
}

function FillIn() {
  var numberOfRects = 500;
  rectArray = [];

  var minx = 99999999;
  var maxx = 0;
  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].startx < minx) {
      minx = lineArray[i].startx;
    }
    if (lineArray[i].endx < minx) {
      minx = lineArray[i].endx;
    }
    if (lineArray[i].startx > maxx) {
      maxx = lineArray[i].startx;
    }
    if (lineArray[i].endx > maxx) {
      maxx = lineArray[i].endx;
    }
  }

  var centers = [];
  var xwidth = (maxx - minx) / numberOfRects;
  var currentx = minx + xwidth / 2;
  for (var i = 0; i < numberOfRects; i++) {
    centers.push(currentx);
    currentx = currentx + xwidth;
  }

  var mxb = [];
  for (var i = 0; i < lineArray.length; i++) {
    var m = 0;
    var b = 0;
    if (lineArray[i].startx - lineArray[i].endx != 0) {
      m =
        (lineArray[i].starty - lineArray[i].endy) /
        (lineArray[i].startx - lineArray[i].endx);
      b = lineArray[i].starty - m * lineArray[i].startx;
    } else {
      m = "vert";
      b = "vert";
    }
    mxb.push([
      m,
      b,
      Math.min(lineArray[i].startx, lineArray[i].endx),
      Math.max(lineArray[i].startx, lineArray[i].endx),
    ]);
  }

  var yints = [];
  for (var i = 0; i < centers.length; i++) {
    centerx = centers[i];
    var yintspresort = [];
    for (var j = 0; j < mxb.length; j++) {
      m = mxb[j][0];
      b = mxb[j][1];
      var min = mxb[j][2];
      var max = mxb[j][3];
      if (centerx > min && centerx < max && m != "vert") {
        yintspresort.push(m * centerx + b);
      }
    }

    yintspresort.sort(function (a, b) {
      return a - b;
    });

    for (var j = 0; j < yintspresort.length; j++) {
      yints.push([centerx, yintspresort[j]]);
    }
  }

  if (yints.length % 2 == 0) {
    for (var i = 0; i < yints.length; i = i + 2) {
      var centerx = yints[i][0];
      var topy = yints[i][1];
      var bottomy = yints[i + 1][1];

      var centroidy = bottomy - (bottomy - topy) / 2;
      rectArray.push(
        new Rectangle(centerx, centroidy, xwidth, bottomy - topy, "black", 1)
      );
    }
  }
}

function closeOrOpenSection(keepRels) {
  var PackagedArray = packageForPy(lineArray, arcArray);

  var PackagedArraytoSend = JSON.stringify(PackagedArray);

  var linesAndArcs = numberOfNonConstLinesandArcs();
  if (keepRels != true) {
    var connnectedLinesAndArcs = numberOfConnectedLinesAndArcs();
  } else if (keepRels == true) {
    var connnectedLinesAndArcs = numberOfConnectedLinesAndArcs(true);
  }
  if (linesAndArcs == connnectedLinesAndArcs && lineArray.length > 0) {
    CancelledRequest = false;
    return true;
  } else {
    ClearStressVis();
    MasterCx = 0;
    MasterCy = 0;
    ZeroX = 0;
    ZeroY = 0;
    CancelledRequest = true;
    document.getElementById("loader").style.visibility = "hidden";
    return false;
  }
}

function ClearStressVis(mode) {
  if (StressGradientShown == true) {
    c.clearRect(0, 0, innerWidth, innerHeight);
    imageData = c.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data;
    StressGradientShown = false;
    dispCx = 0;
    zeroX = 0;

    document.getElementById("loader").style.visibility = "hidden";
    document.getElementById("results").style.visibility = "hidden";
    document.getElementById("resultsgrab").style.visibility = "hidden";
    document.getElementById("outputpopuptext").style.visibility = "hidden";
    document.getElementById("resultsheader").style.visibility = "hidden";
    document.getElementById("resultskeepout").style.visibility = "hidden";
    if (mode != "moveload") {
      loadArray = [];
      ShowMax = false;
    }

    if (drawingMode == "lines" && ConstructionLineMode == false) {
      Button2Clicked();
    }

    if (drawingMode == "lines" && ConstructionLineMode == true) {
      ConstLinesClicked();
    }

    if (drawingMode == "fillets") {
      Button3Clicked_2();
    }

    if (drawingMode == "snip") {
      SnipClicked();
    }

    if (drawingMode == "erase") {
      EraseClicked();
    }

    if (drawingMode == "linearDim") {
      DimLinesClicked();
    }

    if (drawingMode == "angledimbetweenlines") {
      DimAnglessClicked();
    }
    Redraw();
  }
}

function numberOfNonConstLinesandArcs() {
  var count = 0;
  for (i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.constLine != true) {
      count++;
    }
  }
  for (i = 0; i < arcArray.length; i++) {
    count++;
  }
  return count;
}

function linePreviewStart() {
  if (ControlDown == false) {
    if (firstAfterLoad == false) {
      var endpointSnap = isonendpoint("snap");
      var suggestSnapArray = suggestHVSnap("start");
      dragFromLineID = 999;
      var centroid = isoncentroid();
      var zerozero = isonzerozero();

      if (centroid == true) {
        previewStartx = MasterCx / Scale;
        previewStarty = MasterCy / Scale;
      } else if (zerozero == true) {
        previewStartx = zeroX;
        previewStarty = zeroY;
      } else if (endpointSnap[0] == 1) {
        previewStartx = endpointSnap[1];
        previewStarty = endpointSnap[2];
        dragFromLineID = endpointSnap[3];
      } else if (suggestSnapArray[0] == true) {
        previewStartx = suggestSnapArray[1];
        previewStarty = suggestSnapArray[2];
      } else {
        previewStartx = mouse.x;
        previewStarty = mouse.y;
      }
    } else {
      var endpointSnap = isonendpoint("snap");
      if (endpointSnap[0] == 1) {
        previewStartx = endpointSnap[1];
        previewStarty = endpointSnap[2];
        dragFromLineID = endpointSnap[3];
      } else {
        previewStartx = mouse.x;
        previewStarty = mouse.y;
      }
      firstAfterLoad = false;
    }
  } else {
    previewStartx = mouse.x;
    previewStarty = mouse.y;
  }
}

function linePreviewDrag(mode) {
  var retArray = [];
  var endx = 0;
  var endy = 0;

  if (ConstructionLineMode == true || mode == "constLine") {
    previewLine = new Line(
      previewStartx,
      previewStarty,
      mouse.x,
      mouse.y,
      null,
      null,
      null,
      true
    );
  } else {
    previewLine = new Line(
      previewStartx,
      previewStarty,
      mouse.x,
      mouse.y,
      null,
      null,
      null,
      false
    );
  }

  if (ControlDown == false) {
    var endpointSnap = isonendpoint("snap");
    var centroid = isoncentroid();
    var zerozero = isonzerozero();

    if (centroid == true) {
      endx = MasterCx / Scale;
      endy = MasterCy / Scale;
    } else if (zerozero == true) {
      endx = zeroX;
      endy = zeroY;
    } else if (endpointSnap[0] == true) {
      endx = endpointSnap[1];
      endy = endpointSnap[2];
    } else {
      suggestedAngle = suggestAngleSnaps(
        previewLine.startx,
        previewLine.starty,
        dragFromLineID
      );

      if (suggestedAngle == 999) {
        endx = mouse.x;
        endy = mouse.y;
      } else {
        var endPtArray = angleSnapPreviewEndpoints(
          mouse.x,
          mouse.y,
          suggestedAngle
        );
        endx = endPtArray[0];
        endy = endPtArray[1];
      }
    }
  } else {
    endx = mouse.x;
    endy = mouse.y;
  }

  previewLine.endx = endx;
  previewLine.endy = endy;

  if (endx != 0) {
    previewLine.endx = endx;
  } else if (endy != 0) {
    previewLine.endy = endy;
  }

  previewLine.drawline(LineColor);
}

function angleSnapPreviewEndpoints(mousex, mousey, angle) {
  var lineLength = Math.sqrt(
    Math.pow(previewLine.startx - mousex, 2) +
      Math.pow(previewLine.starty - mousey, 2)
  );

  var x = previewLine.startx + lineLength * Math.cos(angle * (Math.PI / 180));
  var y = previewLine.starty - lineLength * Math.sin(angle * (Math.PI / 180));

  var retArray = [x, y];
  return retArray;
}

function suggestAngleSnaps(startx, starty, baseLineID) {
  if (startx == 0 && starty == 0) {
    return 0;
  }

  var masterShift = 0;
  var snapAngle = 999;

  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == baseLineID) {
      var masterShift = lineArray[i].angle;
    }
  }

  var suggestedAnglesBase = [0, 45, 90];
  var shifts = [0, 90, 180, 270];
  var suggestedAngles = [0, 90, 180, 270];
  var snapLineData = [];

  for (var i = 0; i < shifts.length; i++) {
    for (var j = 0; j < suggestedAnglesBase.length; j++) {
      var addToList = shifts[i] + suggestedAnglesBase[j] + masterShift;
      suggestedAngles.push(addToList);
    }
  }

  var lineLength = 10000;
  var angle = 0;

  for (var i = 0; i < 4; i++) {
    angle = suggestedAngles[i];
    var endx = startx + lineLength * Math.cos(angle * (Math.PI / 180));
    var endy = starty - lineLength * Math.sin(angle * (Math.PI / 180));

    var snapLineDataSub = [startx, starty, endx, endy, angle];
    snapLineData.push(snapLineDataSub);

    c.lineWidth = 1;
    c.setLineDash([3, 3]);
    c.strokeStyle = "blue";
    c.beginPath();
    c.moveTo(startx, starty);
    c.lineTo(endx, endy);
    c.stroke();
  }

  for (var i = 4; i < suggestedAngles.length; i++) {
    angle = suggestedAngles[i];
    var endx = startx + lineLength * Math.cos(angle * (Math.PI / 180));
    var endy = starty - lineLength * Math.sin(angle * (Math.PI / 180));

    var snapLineDataSub = [startx, starty, endx, endy, angle];
    snapLineData.push(snapLineDataSub);

    c.lineWidth = 1;
    c.setLineDash([3, 3]);
    c.strokeStyle = "blue";
    c.beginPath();
    c.moveTo(startx, starty);
    c.lineTo(endx, endy);
    c.stroke();
  }

  for (var i = 0; i < snapLineData.length; i++) {
    sl = snapLineData[i];

    var calcdLineLength = Math.sqrt(
      Math.pow(sl[0] - sl[2], 2) + Math.pow(sl[1] - sl[3], 2)
    );
    var dist_from_start = Math.sqrt(
      Math.pow(sl[0] - mouse.x, 2) + Math.pow(sl[1] - mouse.y, 2)
    );
    var dist_from_end = Math.sqrt(
      Math.pow(sl[2] - mouse.x, 2) + Math.pow(sl[3] - mouse.y, 2)
    );
    var closeness = Math.abs(calcdLineLength - dist_from_start - dist_from_end);

    if (closeness < 0.5 && ControlDown == false) {
      snapAngle = sl[4];
    }
  }

  if (snapAngle == 0 || snapAngle % 90 == 0) {
    drawingHV = true;
  } else {
    drawingHV = false;
  }

  if (snapAngle != 999 && snapAngle >= 360) {
    RetsnapAngle = snapAngle - 360;
  } else {
    RetsnapAngle = snapAngle;
  }

  return RetsnapAngle;
}

function HVsnap(startx, starty) {
  var angle = lineAngleFromOrigin(startx, starty, mouse.x, mouse.y);
  var endx = 0;
  var endy = 0;

  if (angle >= 315 || angle < 45 || (angle >= 135 && angle < 225)) {
    endx = startx;
  } else if ((angle >= 45 && angle < 135) || (angle >= 225 && angle < 315)) {
    endy = starty;
  }

  var retArray = [endx, endy];
  return retArray;
}

function isoncentroid() {
  var distToCentroid = Math.pow(
    Math.pow(MasterCx / Scale - (mouse.x - xRelative), 2) +
      Math.pow(MasterCy / Scale - (mouse.y - yRelative), 2),
    0.5
  );
  if (distToCentroid < 10) {
    return true;
  } else {
    return false;
  }
}

function isonzerozero() {
  var distTozerozero = Math.pow(
    Math.pow(zeroX - (mouse.x - xRelative), 2) +
      Math.pow(zeroY - (mouse.y - yRelative), 2),
    0.5
  );
  if (distTozerozero < 10) {
    return true;
  } else {
    return false;
  }
}

function arcEndpoints(centroid, radius, radstart, radend) {
  var endpoint1 = 1;
  var endpoint2 = 2;

  return [endpoint1, endpoint2];
}

function isonendpoint(mode, dragFromLine, useAux, auxX, auxY) {
  if (TouchMode == false) {
    var endpoint_snap_dist = 5;
  } else {
    var endpoint_snap_dist = 15;
  }
  var retArray = [0, 0, 0];
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

  var startorend = "null";

  if (useAux == true) {
    x = auxX;
    y = auxY;
  } else {
    x = mouse.x - xRelative;
    y = mouse.y - yRelative;
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (mode == "fillets") {
      if (l.constLine != true) {
        if (
          Math.pow(Math.pow(l.startx - x, 2) + Math.pow(l.starty - y, 2), 0.5) <
          endpoint_snap_dist
        ) {
          sx = l.startx;
          sy = l.starty;
          ex = l.endx;
          ey = l.endy;
          snappedLine = l.lineID;
          x_snap = sx;
          y_snap = sy;
          startorend = "start";
          endpoint_detected = true;
        } else if (
          Math.pow(Math.pow(l.endx - x, 2) + Math.pow(l.endy - y, 2), 0.5) <
          endpoint_snap_dist
        ) {
          sx = l.startx;
          sy = l.starty;
          ex = l.endx;
          ey = l.endy;
          snappedLine = l.lineID;
          x_snap = ex;
          y_snap = ey;
          startorend = "end";
          endpoint_detected = true;
        }
      }
    } else {
      if (
        Math.pow(Math.pow(l.startx - x, 2) + Math.pow(l.starty - y, 2), 0.5) <
        endpoint_snap_dist
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = l.endx;
        ey = l.endy;
        snappedLine = l.lineID;
        x_snap = sx;
        y_snap = sy;
        startorend = "start";
        endpoint_detected = true;
      } else if (
        Math.pow(Math.pow(l.endx - x, 2) + Math.pow(l.endy - y, 2), 0.5) <
        endpoint_snap_dist
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = l.endx;
        ey = l.endy;
        snappedLine = l.lineID;
        x_snap = ex;
        y_snap = ey;
        startorend = "end";
        endpoint_detected = true;
      } else if (
        Math.pow(
          Math.pow(MasterCx / Scale - x, 2) + Math.pow(MasterCy / Scale - y, 2),
          0.5
        ) < endpoint_snap_dist
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = MasterCx / Scale;
        ey = MasterCy / Scale;
        x_snap = ex;
        y_snap = ey;
        startorend = "end";
        endpoint_detected = true;
      } else if (
        Math.pow(Math.pow(zeroX - x, 2) + Math.pow(zeroY - y, 2), 0.5) <
        endpoint_snap_dist
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = zeroX;
        ey = zeroY;
        x_snap = ex;
        y_snap = ey;
        startorend = "end";
        endpoint_detected = true;
      }
    }
  }

  if (mode != "linesonly") {
    for (var i = 0; i < arcArray.length; i++) {
      a = arcArray[i];
      if (
        Math.pow(
          Math.pow(a.endpoint1x - x, 2) + Math.pow(a.endpoint1y - y, 2),
          0.5
        ) < endpoint_snap_dist
      ) {
        sx = a.endpoint1x;
        sy = a.endpoint1y;
        ex = a.endpoint2x;
        ey = a.endpoint2y;
        snappedLine = a.arcID;
        x_snap = sx;
        y_snap = sy;
        startorend = "start";
        endpoint_detected = true;
      }

      if (
        Math.pow(
          Math.pow(a.endpoint2x - x, 2) + Math.pow(a.endpoint2y - y, 2),
          0.5
        ) < endpoint_snap_dist
      ) {
        ex = a.endpoint2x;
        ey = a.endpoint2y;
        sx = a.endpoint1x;
        sy = a.endpoint1y;
        snappedLine = a.arcID;
        x_snap = ex;
        y_snap = ey;
        startorend = "end";
        endpoint_detected = true;
      }
    }
  }

  if (mode == "draggingMode" && firstLineDrawn == true) {
    if (endpoint_detected == true) {
      if (dragFromLineID == snappedLine) {
        return [false, 0, 0, 999];
      } else {
        if (startorend == "start") {
          drawEndpoint(sx, sy);
        } else {
          drawEndpoint(ex, ey);
        }
        return [true, x_snap, y_snap, snappedLine];
      }
    }
  } else {
    if (endpoint_detected == true) {
      if (startorend == "start") {
        drawEndpoint(sx, sy);
      } else {
        drawEndpoint(ex, ey);
      }
      return [true, x_snap, y_snap, snappedLine];
    } else {
      return [false, 0, 0, 999];
    }
  }
}

function specificendpoint(mode, dragFromLine, useAux, auxX, auxY, lID1, lID2) {
  var endpoint_snap_dist = 5;
  var retArray = [0, 0, 0];
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

  var startorend = "null";

  if (useAux == true) {
    x = auxX;
    y = auxY;
  } else {
    x = mouse.x - xRelative;
    y = mouse.y - yRelative;
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (mode == "fillets") {
      if (l.constLine != true) {
        if (
          Math.pow(Math.pow(l.startx - x, 2) + Math.pow(l.starty - y, 2), 0.5) <
            endpoint_snap_dist &&
          (l.lineID == lID1 || l.lineID == lID2)
        ) {
          sx = l.startx;
          sy = l.starty;
          ex = l.endx;
          ey = l.endy;
          snappedLine = l.lineID;
          x_snap = sx;
          y_snap = sy;
          startorend = "start";
          endpoint_detected = true;
        } else if (
          Math.pow(Math.pow(l.endx - x, 2) + Math.pow(l.endy - y, 2), 0.5) <
            endpoint_snap_dist &&
          (l.lineID == lID1 || l.lineID == lID2)
        ) {
          sx = l.startx;
          sy = l.starty;
          ex = l.endx;
          ey = l.endy;
          snappedLine = l.lineID;
          x_snap = ex;
          y_snap = ey;
          startorend = "end";
          endpoint_detected = true;
        }
      }
    } else {
      if (
        Math.pow(Math.pow(l.startx - x, 2) + Math.pow(l.starty - y, 2), 0.5) <
          endpoint_snap_dist &&
        (l.lineID == lID1 || l.lineID == lID2)
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = l.endx;
        ey = l.endy;
        snappedLine = l.lineID;
        x_snap = sx;
        y_snap = sy;
        startorend = "start";
        endpoint_detected = true;
      } else if (
        Math.pow(Math.pow(l.endx - x, 2) + Math.pow(l.endy - y, 2), 0.5) <
          endpoint_snap_dist &&
        (l.lineID == lID1 || l.lineID == lID2)
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = l.endx;
        ey = l.endy;
        snappedLine = l.lineID;
        x_snap = ex;
        y_snap = ey;
        startorend = "end";
        endpoint_detected = true;
      } else if (
        Math.pow(
          Math.pow(l.midpointX - x, 2) + Math.pow(l.midpointY - y, 2),
          0.5
        ) < endpoint_snap_dist &&
        (l.lineID == lID1 || l.lineID == lID2)
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = l.midpointX;
        ey = l.midpointY;
        snappedLine = l.lineID;
        x_snap = ex;
        y_snap = ey;
        startorend = "end";
        endpoint_detected = true;
      } else if (
        Math.pow(
          Math.pow(MasterCx / Scale - x, 2) + Math.pow(MasterCy / Scale - y, 2),
          0.5
        ) < endpoint_snap_dist &&
        (l.lineID == lID1 || l.lineID == lID2)
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = MasterCx / Scale;
        ey = MasterCy / Scale;
        x_snap = ex;
        y_snap = ey;
        startorend = "end";
        endpoint_detected = true;
      } else if (
        Math.pow(Math.pow(zeroX - x, 2) + Math.pow(zeroY - y, 2), 0.5) <
          endpoint_snap_dist &&
        (l.lineID == lID1 || l.lineID == lID2)
      ) {
        sx = l.startx;
        sy = l.starty;
        ex = zeroX;
        ey = zeroY;
        x_snap = ex;
        y_snap = ey;
        startorend = "end";
        endpoint_detected = true;
      }
    }
  }

  if (endpoint_detected == true) {
    if (startorend == "start") {
      drawEndpoint(sx, sy);
    } else {
      drawEndpoint(ex, ey);
    }
    return [true, x_snap, y_snap, snappedLine];
  } else {
    return [false, 0, 0, 999];
  }
}

function colorit(color, x, y, alpha, indexinput) {
  if (indexinput == "null") {
    var index = (y * canvas.width + x) * 4;
  } else {
    index = indexinput;
  }

  if (color == "background") {
    data[index] = 255;
    data[++index] = 255;
    data[++index] = 255;
    data[++index] = 0;
  } else if (color == "line") {
    data[index] = 0;
    data[++index] = 100;
    data[++index] = 100;
    data[++index] = 1000;
  } else if (color == "inside1") {
    data[index] = 222;
    data[++index] = 222;
    data[++index] = 222;
    data[++index] = 1000;
  } else if (color == "inside2") {
    data[index] = 11;
    data[++index] = 217;
    data[++index] = 176;
    data[++index] = 50;
  } else if (color == "inside3") {
    data[index] = 0;
    data[++index] = 119;
    data[++index] = 179;
    data[++index] = 50;
  } else if (color == "red") {
    data[index] = 1000;
    data[++index] = 0;
    data[++index] = 0;
    data[++index] = 1000;
  } else if (color == "blue") {
    data[index] = 0;
    data[++index] = 0;
    data[++index] = 1000;
    data[++index] = 1000;
  }
}

function isonline(x, y, UIorFILL, arrayReturn, linesOption1, linesOption2) {
  var notonline = 999;
  var linesHit = 0;
  var linesHitArray = [];

  if (isonendpoint()[0] != false) {
    return 999;
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];

    Lstarty = Math.round(l.starty);
    Lstartx = Math.round(l.startx);
    Lendy = Math.round(l.endy);
    Lendx = Math.round(l.endx);

    var calcdLineLength = Math.sqrt(
      Math.pow(Lstartx - Lendx, 2) + Math.pow(Lstarty - Lendy, 2)
    );

    var dist_from_start = Math.sqrt(
      Math.pow(Lstartx - x, 2) + Math.pow(Lstarty - y, 2)
    );

    var dist_from_end = Math.sqrt(
      Math.pow(Lendx - x, 2) + Math.pow(Lendy - y, 2)
    );

    var closeness = Math.abs(calcdLineLength - dist_from_start - dist_from_end);

    if (UIorFILL == "UI") {
      if (linesOption1 == null) {
        if (TouchMode == false) {
          closenessthreshold = 0.1;
        } else {
          closenessthreshold = 5;
        }
        if (closeness < closenessthreshold) {
          l.drawline("red");
          linesHit = linesHit + 1;
          linesHitArray.push(l.lineID);
        }
      } else if (linesOption1 != null) {
        closenessthreshold = 0.1;
        if (closeness < closenessthreshold) {
          if (l.lineID == linesOption1 || l.lineID == linesOption2) {
            l.drawline("red");
            linesHit = linesHit + 1;
            linesHitArray.push(l.lineID);
          }
        }
      }
    } else if (UIorFILL == "Rel") {
      if (linesOption1 == null) {
        closenessthreshold = 0.5;
        if (closeness < closenessthreshold) {
          l.drawline("red");
          linesHit = linesHit + 1;
          linesHitArray.push(l.lineID);
        }
      } else if (linesOption1 != null) {
        closenessthreshold = 0.5;
        if (closeness < closenessthreshold) {
          if (l.lineID == linesOption1 || l.lineID == linesOption2) {
            l.drawline("red");
            linesHit = linesHit + 1;
            linesHitArray.push(l.lineID);
          }
        }
      }
    } else if (UIorFILL == "Fill") {
      closenessthreshold = 0.001;
      if (closeness < closenessthreshold && l.constLine != true) {
        l.drawline("red");
        linesHit = linesHit + 1;
        linesHitArray.push(l.lineID);
      }
    } else if (UIorFILL == "SNIP") {
      closenessthreshold = 0.1;
      if (closeness < closenessthreshold) {
        linesHit = linesHit + 1;
        linesHitArray.push(l.lineID);
      }
    }
  }

  if (linesHit > 0) {
    if (showDims == true) {
      for (var j = 0; j < linearDimArray.length; j++) {
        if (
          linearDimArray[j].elementID == linesHitArray[0] &&
          linearDimArray[j].showDim == true
        ) {
          linearDimArray[j].drawdim(
            linearDimArray[j].value,
            linearDimArray[j].x,
            linearDimArray[j].y,
            "red"
          );
        }
      }
    }
    if (arrayReturn == true) {
      retArray = [linesHitArray[0], linesHit];
      return retArray;
    }
    return linesHitArray[0];
  }

  for (var i = 0; i < chamferArray.length; i++) {
    l = chamferArray[i];

    Lstarty = Math.round(l.starty);
    Lstartx = Math.round(l.startx);
    Lendy = Math.round(l.endy);
    Lendx = Math.round(l.endx);

    var calcdLineLength = Math.sqrt(
      Math.pow(Lstartx - Lendx, 2) + Math.pow(Lstarty - Lendy, 2)
    );

    var dist_from_start = Math.sqrt(
      Math.pow(Lstartx - x, 2) + Math.pow(Lstarty - y, 2)
    );

    var dist_from_end = Math.sqrt(
      Math.pow(Lendx - x, 2) + Math.pow(Lendy - y, 2)
    );

    var closeness = Math.abs(calcdLineLength - dist_from_start - dist_from_end);

    if (UIorFILL == "UI") {
      closenessthreshold = 0.1;
    } else if (UIorFILL == "Fill") {
      closenessthreshold = 0.001;
    }

    if (closeness < closenessthreshold) {
      l.drawchamfer("red");
      linesHit = linesHit + 1;
      linesHitArray.push(l.ChamferID);
    }
  }

  if (linesHit > 0) {
    if (arrayReturn == true) {
      retArray = [linesHitArray[0], linesHit];
      return retArray;
    }
    return linesHitArray[0];
  }

  if (linesHit == 0) {
    if (arrayReturn == true) {
      retArray = [notonline, 1];
      return retArray;
    }
    return notonline;
  } else {
    if (arrayReturn == true) {
      retArray = [notonline, 1];
      return retArray;
    }
    return notonline;
  }
}

function displayDimension(lineOrAngle) {
  if (lineOrAngle == null) {
    if (isonline(mouse.x, mouse.y, "UI") != 999) {
      var selectedLine = isonline(mouse.x, mouse.y, "UI");
      for (var j = 0; j < linearDimArray.length; j++) {
        d = linearDimArray[j];
        if (d.elementID == selectedLine) {
          if (d.showDim == true) {
            d.showDim = false;
            Redraw();
          } else {
            d.showDim = true;
            Redraw();
          }
        }
      }
      for (var j = 0; j < AngularDimArray.length; j++) {
        d = AngularDimArray[j];
        if (d.elementID == selectedLine) {
          if (d.showDim == true) {
            d.showDim = false;
            Redraw();
          } else {
            d.showDim = true;
            Redraw();
          }
        }
      }
    }

    var selectedDim = isondim(mouse.x, mouse.y, 10, 27);
    if (selectedDim[0] != 999) {
      if (selectedDim[1] == "linear" || selectedDim[1] == "fillet") {
        for (var j = 0; j < linearDimArray.length; j++) {
          d = linearDimArray[j];
          if (d.elementID == selectedDim[0]) {
            if (d.showDim == true) {
              d.showDim = false;
              Redraw();
            } else {
              d.showDim = true;
              Redraw();
            }
          }
        }
      }
      if (selectedDim[1] == "angular") {
        for (var j = 0; j < AngularDimArray.length; j++) {
          d = AngularDimArray[j];
          if (d.elementID == selectedDim[0]) {
            if (d.showDim == true) {
              d.showDim = false;
              Redraw();
            } else {
              d.showDim = true;
              Redraw();
            }
          }
        }
      }
      if (selectedDim[1] == "relangular") {
        for (var j = 0; j < relAngleArray.length; j++) {
          d = relAngleArray[j];
          if (d.elementID == selectedDim[0]) {
            deletedim(selectedDim[0]);
          }
        }
      }
    }
  }

  var selectedDim = isondim(mouse.x, mouse.y, 10, 27);
  if (selectedDim[0] != 999) {
    if (selectedDim[1] == "linear" || selectedDim[1] == "fillet") {
      for (var j = 0; j < linearDimArray.length; j++) {
        d = linearDimArray[j];
        if (d.elementID == selectedDim[0]) {
          if (d.showDim == true) {
            d.showDim = false;
            Redraw();
          } else {
            d.showDim = true;
            Redraw();
          }
        }
      }
    }
  }

  if (lineOrAngle == "line") {
    if (isonline(mouse.x, mouse.y, "UI") != 999) {
      var selectedLine = isonline(mouse.x, mouse.y, "UI");
      for (var j = 0; j < linearDimArray.length; j++) {
        d = linearDimArray[j];
        if (d.elementID == selectedLine) {
          if (d.showDim == true) {
            d.showDim = false;
            Redraw();
          } else {
            d.showDim = true;
            Redraw();
          }
        }
      }
    }

    var selectedDim = isondim(mouse.x, mouse.y, 10, 27);
    if (selectedDim[0] != 999) {
      if (selectedDim[1] == "linear" || selectedDim[1] == "fillet") {
        for (var j = 0; j < linearDimArray.length; j++) {
          d = linearDimArray[j];
          if (d.elementID == selectedDim[0]) {
            if (d.showDim == true) {
              d.showDim = false;
              Redraw();
            } else {
              d.showDim = true;
              Redraw();
            }
          }
        }
      }
    }
  }

  if (lineOrAngle == "angle") {
    if (isonline(mouse.x, mouse.y, "UI") != 999) {
      var selectedLine = isonline(mouse.x, mouse.y, "UI");

      for (var j = 0; j < AngularDimArray.length; j++) {
        d = AngularDimArray[j];
        if (d.elementID == selectedLine) {
          if (d.showDim == true) {
            d.showDim = false;
            Redraw();
          } else {
            d.showDim = true;
            Redraw();
          }
        }
      }
    }

    var selectedDim = isondim(mouse.x, mouse.y, 10, 27);
    if (selectedDim[0] != 999) {
      if (selectedDim[1] == "angular") {
        for (var j = 0; j < AngularDimArray.length; j++) {
          d = AngularDimArray[j];
          if (d.elementID == selectedDim[0]) {
            if (d.showDim == true) {
              d.showDim = false;
              Redraw();
            } else {
              d.showDim = true;
              Redraw();
            }
          }
        }
      }
    }
  }
}

function isondim(xpass, ypass) {
  var linedetected = false;
  var detectedline = 0;
  var type = "null";

  for (var i = 0; i < linearDimArray.length; i++) {
    d = linearDimArray[i];
    if (xpass > d.x && xpass < d.x + d.bbwidth && linedetected == false) {
      if (ypass > d.y - d.bbheight && ypass < d.y) {
        if (showDims == true && d.showDim == true) {
          d.drawdim(d.value, d.x, d.y, "red");
          detectedline = d.elementID;
          if (d.orientation == "fillet") {
            type = "fillet";
          } else {
            type = "linear";
          }
          linedetected = true;
        }
      }
    }
  }

  for (var i = 0; i < AngularDimArray.length; i++) {
    d = AngularDimArray[i];
    if (xpass > d.x && xpass < d.x + d.bbwidth && linedetected == false) {
      if (ypass > d.y - d.bbheight && ypass < d.y) {
        if (d.showDim == true && d.showDim == true) {
          d.drawdim(d.value, d.x, d.y, "red");
          detectedline = d.elementID;
          type = d.type;
          linedetected = true;
        }
      }
    }
  }

  for (var i = 0; i < relAngleArray.length; i++) {
    d = relAngleArray[i];
    if (xpass > d.x && xpass < d.x + d.bbwidth && linedetected == false) {
      if (ypass > d.y - d.bbheight && ypass < d.y) {
        if (d.showDim == true && d.showDim == true) {
          d.drawdim(d.value, d.x, d.y, "red");
          detectedline = d.elementID;
          type = d.type;
          linedetected = true;
        }
      }
    }
  }

  if (linedetected == true) {
    retArray = [detectedline, type];
    return retArray;
  } else {
    retArray = [999, "null"];
    return retArray;
  }
}

function moveDim(x, y, dimtomove, type) {
  if (type == "relangular") {
    for (var i = 0; i < relAngleArray.length; i++) {
      d = relAngleArray[i];
      if (d.elementID == dimtomove) {
        d.x = x - xRelative;
        d.y = y - yRelative;
      }
    }
  }
}

function isonHandle(xpass, ypass) {
  var detected = false;

  for (var i = 0; i < relAngleArray.length; i++) {
    d = relAngleArray[i];
    var distToCentroid = Math.pow(
      Math.pow(Math.abs(d.handlex - xpass), 2) +
        Math.pow(Math.abs(d.handley - ypass), 2),
      0.5
    );

    if (TouchMode != true) {
      if (distToCentroid < 5) {
        d.drawarchandle("#559EC5", 5);
        detected = true;
        detectedid = d.elementID;
      }
    } else {
      if (distToCentroid < 15) {
        d.drawarchandle("#559EC5", 5);
        detected = true;
        detectedid = d.elementID;
      }
    }
  }

  if (detected == true) {
    return detectedid;
  } else {
    return 999;
  }
}

function moveHandle(x, y, mode, id) {
  if (x == "null" && y == "null") {
    for (var i = 0; i < relAngleArray.length; i++) {
      d = relAngleArray[i];
      if (d.elementID == id) {
        x = d.handlex;
        y = d.handley;
      }
    }
  }

  for (var i = 0; i < relAngleArray.length; i++) {
    d = relAngleArray[i];
    if (d.elementID == id) {
      var radius = Math.pow(
        Math.pow(Math.abs(d.centroidx - x), 2) +
          Math.pow(Math.abs(d.centroidy - y), 2),
        0.5
      );
    }
  }

  var limitRad = false;

  for (var i = 0; i < relAngleArray.length; i++) {
    d = relAngleArray[i];
    if (d.elementID == id) {
      var epRads = endpointRads(d.centroidx, d.centroidy, d.line1ID, d.line2ID);
      if (radius < epRads[0] || radius > epRads[1]) {
      }
      if (radius < epRads[0]) {
        radius = epRads[0];
      }
      if (radius > epRads[1]) {
        radius = epRads[1];
      }
      var limitRad = true;
    }
  }

  if (mode == "absolute") {
    for (var i = 0; i < relAngleArray.length; i++) {
      d = relAngleArray[i];
      if (d.elementID == id) {
        var a = d;
        if (limitRad == false) {
          var radius = Math.pow(
            Math.pow(Math.abs(d.centroidx - x), 2) +
              Math.pow(Math.abs(d.centroidy - y), 2),
            0.5
          );
        }
        var avgtheta =
          (lineAngleFromOrigin(d.centroidx, d.centroidy, x, y) - 90) *
          (Math.PI / 180);
        var xfromcentroid = radius * Math.cos(avgtheta);
        var yfromcentroid = radius * Math.sin(avgtheta);
        d.handlex = d.centroidx + xfromcentroid;
        d.handley = d.centroidy + yfromcentroid;
      }
    }
  } else {
    for (var i = 0; i < relAngleArray.length; i++) {
      d = relAngleArray[i];
      if (d.elementID == id) {
        var a = d;
        if (limitRad == false) {
          var radius = Math.pow(
            Math.pow(Math.abs(d.centroidx - x), 2) +
              Math.pow(Math.abs(d.centroidy - y), 2),
            0.5
          );
        }
        var avgtheta =
          (lineAngleFromOrigin(d.centroidx, d.centroidy, x, y) - 90) *
          (Math.PI / 180);
        var xfromcentroid = radius * Math.cos(avgtheta);
        var yfromcentroid = radius * Math.sin(avgtheta);
        d.handlex = d.centroidx + xfromcentroid - xRelative;
        d.handley = d.centroidy + yfromcentroid - yRelative;
      }
    }
  }

  if (avgtheta < 0) {
    avgtheta = 2 * Math.PI + avgtheta;
  }

  if (a.radend > a.radstart) {
    if (avgtheta > a.radstart && avgtheta < a.radend) {
      a.displayFlippedArc = false;
    } else {
      a.displayFlippedArc = true;
    }
  } else {
    if (avgtheta > a.radstart) {
      a.displayFlippedArc = false;
    } else if (avgtheta < a.radend) {
      a.displayFlippedArc = false;
    } else {
      a.displayFlippedArc = true;
    }
  }

  var retArray = [a.x, a.y];
  return retArray;
}

function updateHandles() {
  for (var i = 0; i < relAngleArray.length; i++) {
    d = relAngleArray[i];
    x = d.handlex;
    y = d.handley;

    var radius = Math.pow(
      Math.pow(Math.abs(d.centroidx - x), 2) +
        Math.pow(Math.abs(d.centroidy - y), 2),
      0.5
    );

    var limitRad = false;

    var epRads = endpointRads(d.centroidx, d.centroidy, d.line1ID, d.line2ID);

    if (radius < epRads[0]) {
      radius = epRads[0];
      limitRad = true;
    }
    if (radius > epRads[1]) {
      radius = epRads[1];
      limitRad = true;
    }

    if (limitRad == true) {
      var avgtheta =
        (lineAngleFromOrigin(d.centroidx, d.centroidy, x, y) - 90) *
        (Math.PI / 180);
      var xfromcentroid = radius * Math.cos(avgtheta);
      var yfromcentroid = radius * Math.sin(avgtheta);
      d.handlex = d.centroidx + xfromcentroid;
      d.handley = d.centroidy + yfromcentroid;
    }
  }
}

function endpointRads(x, y, lid1, lid2) {
  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == lid1) {
      var sx = lineArray[i].startx;
      var sy = lineArray[i].starty;
      var ex = lineArray[i].endx;
      var ey = lineArray[i].endy;

      var disttostart1 = Math.sqrt(Math.pow(sx - x, 2) + Math.pow(sy - y, 2));
      var disttoend1 = Math.sqrt(Math.pow(ex - x, 2) + Math.pow(ey - y, 2));

      if (disttostart1 < disttoend1) {
        var actstart1 = disttostart1;
        var actend1 = disttoend1;
      } else {
        var actstart1 = disttoend1;
        var actend1 = disttostart1;
      }
    } else if (lineArray[i].lineID == lid2) {
      var sx = lineArray[i].startx;
      var sy = lineArray[i].starty;
      var ex = lineArray[i].endx;
      var ey = lineArray[i].endy;

      var disttostart2 = Math.sqrt(Math.pow(sx - x, 2) + Math.pow(sy - y, 2));
      var disttoend2 = Math.sqrt(Math.pow(ex - x, 2) + Math.pow(ey - y, 2));

      if (disttostart2 < disttoend2) {
        var actstart2 = disttostart2;
        var actend2 = disttoend2;
      } else {
        var actstart2 = disttoend2;
        var actend2 = disttostart2;
      }
    }
  }

  if (actstart1 > actstart2) {
    var minrad = actstart1;
  } else {
    var minrad = actstart2;
  }

  if (actend1 < actend2) {
    var maxrad = actend1;
  } else {
    var maxrad = actend2;
  }

  retArray = [minrad, maxrad];

  return retArray;
}

function moveResultsBox(x, y) {
  document.getElementById("results").style.top = y - yRelative + "px";
  document.getElementById("results").style.left = x - xRelative + "px";
}

function setRelatives(xin, yin, tomove, dimorlabel, id, type) {
  if (dimorlabel == "dim") {
    if (type == "linear") {
      for (var i = 0; i < linearDimArray.length; i++) {
        d = linearDimArray[i];
        if (d.elementID == tomove) {
          xRelative = xin - d.x;
          yRelative = yin - d.y;
        }
      }
    } else if (type == "fillet") {
      for (var i = 0; i < linearDimArray.length; i++) {
        d = linearDimArray[i];
        if (d.elementID == tomove) {
          xRelative = xin - d.x;
          yRelative = yin - d.y;
        }
      }
    } else if (type == "angular") {
      for (var i = 0; i < AngularDimArray.length; i++) {
        d = AngularDimArray[i];
        if (d.elementID == tomove) {
          xRelative = xin - d.x;
          yRelative = yin - d.y;
        }
      }
    } else if (type == "relangular") {
      for (var i = 0; i < relAngleArray.length; i++) {
        d = relAngleArray[i];
        if (d.elementID == tomove) {
          xRelative = xin - d.x;
          yRelative = yin - d.y;
        }
      }
    }
  }

  if (dimorlabel == "label") {
    for (var i = 0; i < labelArray.length; i++) {
      d = labelArray[i];
      if (d.labelID == tomove) {
        xRelative = xin - d.xloc;
        yRelative = yin - d.yloc;
      }
    }
  }

  if (dimorlabel == "loadpoint") {
    d = loadArray[0];
    xRelative = xin - d.x;
    yRelative = yin - d.y;
  }

  if (dimorlabel == "resultsbox") {
    var offsets = document.getElementById("results").getBoundingClientRect();
    xRelative = xin - offsets.left;
    yRelative = yin - offsets.top;
  }

  if (dimorlabel == "radiusbox") {
    var offsets = document
      .getElementById("filletsInput")
      .getBoundingClientRect();
    xRelative = xin - offsets.left;
    yRelative = yin - offsets.top;
  }

  if (dimorlabel == "SRP") {
    for (var i = 0; i < SRPArray.length; i++) {
      d = SRPArray[i];
      if (d.SRPid == id) {
        xRelative = xin - d.x;
        yRelative = yin - d.y;
      }
    }
  }
}

function getlength(number) {
  return number.toString().length;
}

function drawEndpoint(x_coord, y_coord) {
  c.beginPath();
  if (TouchMode == false) {
    c.arc(x_coord, y_coord, 5, Math.PI * 2, false);
    c.fillStyle = "#0086CB";
  } else {
    c.arc(x_coord, y_coord, 10, Math.PI * 2, false);
    c.fillStyle = "rgba(0, 136, 204, 0.5)";
  }

  c.fill();
  c.fillStyle = "black";
}

function drawConnectionPoint(x_coord, y_coord) {
  c.beginPath();
  c.arc(x_coord, y_coord, 3, Math.PI * 2, false);
  c.fillStyle = intersectColor;
  c.fill();
  c.fillStyle = "black";
}

function drawAddpoint(x_coord, y_coord, color) {
  c.beginPath();
  c.arc(x_coord, y_coord, 5, Math.PI * 2, false);
  c.fillStyle = color;
  c.fill();
}

function drawSubpoint(x_coord, y_coord) {
  c.beginPath();
  c.arc(x_coord, y_coord, 3, Math.PI * 2, false);
  c.fillStyle = "red";
  c.fill();
}

function deleteline(lineID, calledFromUndo, keepRels) {
  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.lineID == lineID) {
      if (calledFromUndo != true) {
        for (var k = 0; k < linearDimArray.length; k++) {
          if (linearDimArray[k].elementID == lineID) {
            var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
          }
        }
        for (var k = 0; k < AngularDimArray.length; k++) {
          if (AngularDimArray[k].elementID == lineID) {
            var undoAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
          }
        }
        var undoLine = JSON.parse(JSON.stringify(l));
        updateUserMoves([
          "deleteline",
          undoLine,
          undoLinearDim,
          undoAngularDim,
        ]);
      }

      lineArray.splice(i, 1);
      if (keepRels != true) {
        deletedim(lineID);
      } else if (keepRels == true) {
        deletedim(lineID, true);
      }
    }
  }

  closeOrOpenSection(true);
}

function deletedim(elementID, keepRels) {
  for (var i = 0; i < linearDimArray.length; i++) {
    d = linearDimArray[i];
    if (d.elementID == elementID) {
      linearDimArray.splice(i, 1);
    }
  }

  for (var i = 0; i < AngularDimArray.length; i++) {
    a = AngularDimArray[i];
    if (a.elementID == elementID) {
      AngularDimArray.splice(i, 1);
    }
  }

  if (keepRels != true) {
    for (var i = 0; i < relAngleArray.length; i++) {
      a = relAngleArray[i];
      if (
        a.line1ID == elementID ||
        a.line2ID == elementID ||
        a.elementID == elementID
      ) {
        relAngleArray.splice(i, 1);
      }
    }
  }
}

function suggestHVSnap(startOrend) {
  var xySnapRange = 5;
  var returnArray = [];
  var snapped = false;
  var xcoordinate;
  var ycoordinate;
  var snappedAlready = false;
  var VertorHoriz = 0;
  var dontdraw = false;
  var excludedLine = 999;
  var pLine = "none";

  if (firstLineDrawn == true) {
    if (previewLine.startx != 0 && previewLine.endx != 0) {
      if (Tol(previewLine.startx, previewLine.endx, 0.0001)) {
        pLine = "vert";
      } else if (Tol(previewLine.starty, previewLine.endy, 0.0001)) {
        pLine = "horiz";
      }
    } else {
      pLine = "none";
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.startx == previewLine.startx && l.starty == previewLine.starty) {
      excludedLine = l.lineID;
    } else if (l.endx == previewLine.startx && l.endy == previewLine.starty) {
      excludedLine = l.lineID;
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    if (snappedAlready == false) {
      c.setLineDash([1, 3]);
      c.strokeStyle = "blue";
      l = lineArray[i];

      if (l.lineID != excludedLine) {
        start_y_dist = Math.abs(l.starty - mouse.y);
        end_y_dist = Math.abs(l.endy - mouse.y);
        start_x_dist = Math.abs(l.startx - mouse.x);
        end_x_dist = Math.abs(l.endx - mouse.x);

        if (
          mouse.y < l.starty + xySnapRange &&
          mouse.y > l.starty - xySnapRange &&
          pLine != "horiz"
        ) {
          snapped = true;
          c.beginPath();
          c.moveTo(l.startx, l.starty);
          c.lineTo(mouse.x, l.starty);
          c.stroke();
          if (startOrend == "start") {
            xcoordinate = mouse.x;
          } else {
            xcoordinate = previewLine.startx;
          }
          ycoordinate = l.starty;
          snappedAlready = true;
          VertorHoriz = "horiz";
        } else if (
          mouse.y < l.endy + xySnapRange &&
          mouse.y > l.endy - xySnapRange &&
          pLine != "horiz"
        ) {
          snapped = true;
          c.beginPath();
          c.moveTo(l.endx, l.endy);
          c.lineTo(mouse.x, l.endy);
          c.stroke();
          if (startOrend == "start") {
            xcoordinate = mouse.x;
          } else {
            xcoordinate = previewLine.startx;
          }
          ycoordinate = l.endy;
          snappedAlready = true;
          VertorHoriz = "horiz";
        } else if (
          mouse.x < l.startx + xySnapRange &&
          mouse.x > l.startx - xySnapRange &&
          pLine != "vert"
        ) {
          snapped = true;
          c.beginPath();
          c.moveTo(l.startx, l.starty);
          c.lineTo(l.startx, mouse.y);
          c.stroke();
          xcoordinate = l.startx;
          if (startOrend == "start") {
            ycoordinate = mouse.y;
          } else {
            ycoordinate = previewLine.starty;
          }
          snappedAlready = true;
          VertorHoriz = "vert";
        } else if (
          mouse.x < l.endx + xySnapRange &&
          mouse.x > l.endx - xySnapRange &&
          pLine != "vert"
        ) {
          snapped = true;
          c.beginPath();
          c.moveTo(l.endx, l.endy);
          c.lineTo(l.endx, mouse.y);
          c.stroke();
          xcoordinate = l.endx;
          if (startOrend == "start") {
            ycoordinate = mouse.y;
          } else {
            ycoordinate = previewLine.starty;
          }
          snappedAlready = true;
          VertorHoriz = "vert";
        }
      }
    }
  }

  var retArray = [snapped, xcoordinate, ycoordinate, VertorHoriz];

  c.setLineDash([]);
  return retArray;
}

function createRelAngleDim(
  value,
  elementID,
  radstart,
  radend,
  centroidx,
  centroidy,
  radius,
  line1ID,
  line2ID,
  direction
) {
  if (radius == 0) {
    displayError(
      "anglenoendpoint",
      "Lines selected for angular dimension must share an endpoint."
    );
    return 0;
  }
  var repeatedDim = false;
  for (var i = 0; i < relAngleArray.length; i++) {
    if (
      (relAngleArray[i].line1ID == line1ID &&
        relAngleArray[i].line2ID == line2ID) ||
      (relAngleArray[i].line1ID == line2ID &&
        relAngleArray[i].line2ID == line1ID)
    ) {
      repeatedDim = true;
    }
  }

  if (line1ID != line2ID && repeatedDim == false) {
    ElementID += 1;

    var avgtheta = (radstart + radend) / 2;
    var xfromcentroid = radius * Math.cos(avgtheta);
    var yfromcentroid = radius * Math.sin(avgtheta);
    var y = centroidy - 15;
    var x = centroidx + 15;

    var showDim = true;

    relAngleArray.push(
      new AngleRelDimension(
        value,
        x,
        y,
        ElementID,
        showDim,
        radstart,
        radend,
        centroidx,
        centroidy,
        radius,
        line1ID,
        line2ID,
        direction,
        false
      )
    );

    var errorstringtoprint = "Created Angular Dimension";
    PrintToLog(errorstringtoprint);

    var avgtheta =
      relAngleArray[relAngleArray.length - 1].radstart +
      (relAngleArray[relAngleArray.length - 1].value / 2) * (Math.PI / 180);
    var xfromcentroid = radius * Math.cos(avgtheta);
    var yfromcentroid = radius * Math.sin(avgtheta);

    relAngleArray[relAngleArray.length - 1].handley =
      relAngleArray[relAngleArray.length - 1].centroidy + yfromcentroid;
    relAngleArray[relAngleArray.length - 1].handlex =
      relAngleArray[relAngleArray.length - 1].centroidx + xfromcentroid;

    relAngleArray[relAngleArray.length - 1].x =
      relAngleArray[relAngleArray.length - 1].handlex + 15;
    relAngleArray[relAngleArray.length - 1].y =
      relAngleArray[relAngleArray.length - 1].handley - 15;

    updateHandles();
    updateUserMoves(["newreldim", ElementID]);
    //GenerateInverse();
  }
}

function updateRelAngleDim(elementID) {
  for (var i = 0; i < relAngleArray.length; i++) {
    if (relAngleArray[i].elementID == elementID) {
      a = relAngleArray[i];
    }
  }

  var relAngleD = drawAngleArcSnap(100, 100, a.line1ID, a.direction, a.line2ID);

  a.value = relAngleD[0];
  a.radstart = relAngleD[2];
  a.radend = relAngleD[3];

  var avgtheta = a.radstart + (a.value / 2) * (Math.PI / 180);
  var xfromcentroid = a.radius * Math.cos(avgtheta);
  var yfromcentroid = a.radius * Math.sin(avgtheta);

  var inOrigArc = true;
  if (a.displayFlippedArc == true) {
    inOrigArc = false;
  }

  if (inOrigArc == true) {
    var avgtheta =
      (lineAngleFromOrigin(d.centroidx, d.centroidy, a.handlex, a.handley) -
        90) *
      (Math.PI / 180);

    if (avgtheta < 0) {
      avgtheta = 2 * Math.PI + avgtheta;
    }

    if (a.radend > a.radstart) {
      if (avgtheta > a.radstart && avgtheta < a.radend) {
      } else {
        a.handley = a.centroidy + yfromcentroid;
        a.handlex = a.centroidx + xfromcentroid;
      }
    } else {
      if (avgtheta > a.radstart) {
      } else if (avgtheta < a.radend) {
      } else {
        a.handley = a.centroidy + yfromcentroid;
        a.handlex = a.centroidx + xfromcentroid;
      }
    }
  } else {
    var avgtheta =
      (lineAngleFromOrigin(d.centroidx, d.centroidy, a.handlex, a.handley) -
        90) *
      (Math.PI / 180);

    var radstartDisplay = this.radend;
    var radendDisplay = this.radstart;

    if (avgtheta < 0) {
      avgtheta = 2 * Math.PI + avgtheta;
    }

    if (radendDisplay > radstartDisplay) {
      if (avgtheta > radstartDisplay && avgtheta < radendDisplay) {
      } else {
        var avgtheta = a.radend + ((360 - a.value) / 2) * (Math.PI / 180);
        var xfromcentroid = a.radius * Math.cos(avgtheta);
        var yfromcentroid = a.radius * Math.sin(avgtheta);

        a.handley = a.centroidy + yfromcentroid;
        a.handlex = a.centroidx + xfromcentroid;
      }
    } else {
      if (avgtheta > radstartDisplay) {
      } else if (avgtheta < radendDisplay) {
      } else {
        var avgtheta = a.radend + ((360 - a.value) / 2) * (Math.PI / 180);
        var xfromcentroid = a.radius * Math.cos(avgtheta);
        var yfromcentroid = a.radius * Math.sin(avgtheta);
        a.handley = a.centroidy + yfromcentroid;
        a.handlex = a.centroidx + xfromcentroid;
      }
    }
  }
  closeOrOpenSection();
}

function calcClickAngle(x, y, startLine) {
  var clickAngle = 0;

  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == startLine) {
      var disttostart = Math.sqrt(
        Math.pow(lineArray[i].startx - x, 2) +
          Math.pow(lineArray[i].starty - y, 2)
      );
      var disttoend = Math.sqrt(
        Math.pow(lineArray[i].endx - x, 2) + Math.pow(lineArray[i].endy - y, 2)
      );
      if (disttostart < disttoend) {
        clickAngle = lineAngleFromOrigin(
          lineArray[i].startx,
          lineArray[i].starty,
          x,
          y
        );
      } else if (disttostart > disttoend) {
        clickAngle = lineAngleFromOrigin(
          lineArray[i].endx,
          lineArray[i].endy,
          x,
          y
        );
      }
    }
  }
  return clickAngle;
}

function drawAngleArc(x, y, startLine, mouseMotion) {
  var startOrEndCentroid = "null";
  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == startLine) {
      var disttostart = Math.sqrt(
        Math.pow(lineArray[i].startx - x, 2) +
          Math.pow(lineArray[i].starty - y, 2)
      );
      var disttoend = Math.sqrt(
        Math.pow(lineArray[i].endx - x, 2) + Math.pow(lineArray[i].endy - y, 2)
      );
      if (disttostart < disttoend) {
        var xc = lineArray[i].startx;
        var yc = lineArray[i].starty;
        var rad = disttostart;
        var lineAngle = 360 - lineArray[i].angle;
      } else if (disttostart > disttoend) {
        var xc = lineArray[i].endx;
        var yc = lineArray[i].endy;
        var rad = disttoend;
        var lineAngle = 360 - lineArray[i].angle - 180;
      }
    }
  }

  var mouseAngle = lineAngleFromOrigin(xc, yc, x, y) - 90;

  if (mouseMotion == "ccw") {
    var radstart = mouseAngle * (Math.PI / 180);
    var radend = lineAngle * (Math.PI / 180);
  } else if (mouseMotion == "cw") {
    var radstart = lineAngle * (Math.PI / 180);
    var radend = mouseAngle * (Math.PI / 180);
  }

  if (radstart < 0) {
    radstart = radstart + 2 * Math.PI;
  }

  var angleBetween = Math.abs(mouseAngle - lineAngle);
  if (angleBetween > 360) {
    angleBetween = angleBetween - 360;
  }

  c.beginPath();
  c.strokeStyle = "black";
  c.lineWidth = 0.5;
  c.arc(xc, yc, rad, radstart, radend, false);
  c.stroke();

  retArray = [angleBetween, 100, radstart, radend, xc, yc, rad];

  return retArray;
}

function drawAngleArcSnap(x, y, startLine, mouseMotion, endLine) {
  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == startLine) {
      var l1 = lineArray[i];
    }
    if (lineArray[i].lineID == endLine) {
      var l2 = lineArray[i];
    }
  }

  var disttostart = Math.sqrt(
    Math.pow(l1.startx - x, 2) + Math.pow(l1.starty - y, 2)
  );
  var disttoend = Math.sqrt(
    Math.pow(l1.endx - x, 2) + Math.pow(l1.endy - y, 2)
  );

  SorEArray = endpointCommonToLines(startLine, endLine);

  var line1origAngle = 0;
  var line2origAngle = 0;
  var xc = 0;
  var yc = 0;
  var rad = 0;

  if (SorEArray[0] == "start") {
    line1origAngle = l1.angle;
    xc = SorEArray[2];
    yc = SorEArray[3];
    rad = disttostart;
  } else if (SorEArray[0] == "end") {
    line1origAngle = 180 + l1.angle;
    if (line1origAngle > 360) {
      line1origAngle = line1origAngle - 360;
    }
    xc = SorEArray[2];
    yc = SorEArray[3];
    rad = disttoend;
  }

  if (SorEArray[1] == "start") {
    line2origAngle = l2.angle;
  } else if (SorEArray[1] == "end") {
    line2origAngle = 180 + l2.angle;
    if (line2origAngle > 360) {
      line2origAngle = line2origAngle - 360;
    }
  }

  var radstart = 0;
  var radend = 0;

  var line1origAngle = 360 - line1origAngle;
  var line2origAngle = 360 - line2origAngle;

  if (mouseMotion == "cw") {
    radstart = line1origAngle * (Math.PI / 180);
    radend = line2origAngle * (Math.PI / 180);
  } else if (mouseMotion == "ccw") {
    radstart = line2origAngle * (Math.PI / 180);
    radend = line1origAngle * (Math.PI / 180);
  }

  if (radstart < 0) {
    radstart = radstart + 2 * Math.PI;
  }

  var angleBetween = Math.abs(line2origAngle - line1origAngle);

  if (radstart > radend) {
    angleBetween = 360 - angleBetween;
  }

  retArray = [
    angleBetween,
    100,
    radstart,
    radend,
    xc,
    yc,
    startLine,
    endLine,
    rad,
    mouseMotion,
  ];

  return retArray;
}

function changeAngleBetween(line1, line2) {
  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == line1) {
      var l1 = lineArray[i];
    }
    if (lineArray[i].lineID == line2) {
      var l2 = lineArray[i];
    }
  }

  var relAngle = 35;

  SorEArray = endpointCommonToLines(line1, line2);

  var line1origAngle = 0;
  var line2origAngle = 0;

  if (SorEArray[0] == "start") {
    line1origAngle = l1.angle;
  } else if (SorEArray[0] == "end") {
    line1origAngle = 180 + l1.angle;
    if (line1origAngle > 360) {
      line1origAngle = line1origAngle - 360;
    }
  }

  if (SorEArray[1] == "start") {
    line2origAngle = l2.angle;
  } else if (SorEArray[1] == "end") {
    line2origAngle = 180 + l2.angle;
    if (line2origAngle > 360) {
      line2origAngle = line2origAngle - 360;
    }
  }
}

function endpointCommonToLines(line1, line2) {
  var l1SorE = "none";
  var l2SorE = "none";
  var xc = 0;
  var yc = 0;

  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == line1) {
      var sx1 = lineArray[i].startx;
      var sy1 = lineArray[i].starty;
      var ex1 = lineArray[i].endx;
      var ey1 = lineArray[i].endy;

      if (lineArray[i].startxghost != null) {
        sx1 = lineArray[i].startxghost;
      }
      if (lineArray[i].startyghost != null) {
        sy1 = lineArray[i].startyghost;
      }
      if (lineArray[i].endxghost != null) {
        ex1 = lineArray[i].endxghost;
      }
      if (lineArray[i].endyghost != null) {
        ey1 = lineArray[i].endyghost;
      }
    }
    if (lineArray[i].lineID == line2) {
      var sx2 = lineArray[i].startx;
      var sy2 = lineArray[i].starty;
      var ex2 = lineArray[i].endx;
      var ey2 = lineArray[i].endy;

      if (lineArray[i].startxghost != null) {
        sx2 = lineArray[i].startxghost;
      }
      if (lineArray[i].startyghost != null) {
        sy2 = lineArray[i].startyghost;
      }
      if (lineArray[i].endxghost != null) {
        ex2 = lineArray[i].endxghost;
      }
      if (lineArray[i].endyghost != null) {
        ey2 = lineArray[i].endyghost;
      }
    }
  }

  var tolerance = 0.0001;

  if (Tol(sx1, sx2, tolerance) && Tol(sy1, sy2, tolerance)) {
    l1SorE = "start";
    l2SorE = "start";
    xc = sx1;
    yc = sy1;
  } else if (Tol(ex1, ex2, tolerance) && Tol(ey1, ey2, tolerance)) {
    l1SorE = "end";
    l2SorE = "end";
    xc = ex1;
    yc = ey1;
  } else if (Tol(sx1, ex2, tolerance) && Tol(sy1, ey2, tolerance)) {
    l1SorE = "start";
    l2SorE = "end";
    xc = sx1;
    yc = sy1;
  } else if (Tol(ex1, sx2, tolerance) && Tol(ey1, sy2, tolerance)) {
    l1SorE = "end";
    l2SorE = "start";
    xc = ex1;
    yc = ey1;
  }
  retArray = [l1SorE, l2SorE, xc, yc];
  return retArray;
}

function changeDimension() {
  LastSelectedDimID = dimToMove[0];
  LastSelectedDimType = dimToMove[1];

  document.getElementById("inputBox").value = "";
  document.getElementById("inputBox").focus();
  document.getElementById("inputBox").select;

  ChangePreviewValue = null;

  if (LastSelectedDimType == "linear") {
    for (var i = 0; i < linearDimArray.length; i++) {
      d = linearDimArray[i];
      if (d.elementID == LastSelectedDimID) {
        d.selectForChange = true;
        Redraw();
      }
    }
  } else if (LastSelectedDimType == "fillet") {
    for (var i = 0; i < linearDimArray.length; i++) {
      d = linearDimArray[i];
      if (d.elementID == LastSelectedDimID) {
        d.selectForChange = true;
        Redraw();
      }
    }
  } else if (LastSelectedDimType == "angular") {
    for (var i = 0; i < AngularDimArray.length; i++) {
      d = AngularDimArray[i];
      if (d.elementID == LastSelectedDimID) {
        d.selectForChange = true;
        Redraw();
      }
    }
  } else if (LastSelectedDimType == "relangular") {
    for (var i = 0; i < relAngleArray.length; i++) {
      d = relAngleArray[i];
      if (d.elementID == LastSelectedDimID) {
        d.selectForChange = true;
        Redraw();
      }
    }
  }
}

function changeLastLineLength(newLength) {
  l = lineArray[lineArray.length - 1];

  var line1startx = l.startx;
  var line1starty = l.starty;
  var line1endx = l.endx;
  var line1endy = l.endy;

  if (line1startx == line1endx) {
    if (line1starty > line1endy) {
      l.endy = l.starty - newLength / Scale;
    } else {
      l.endy = l.starty + newLength / Scale;
    }
  } else if (line1starty == line1endy) {
    if (line1startx > line1endx) {
      l.endx = l.startx - newLength / Scale;
    } else {
      l.endx = l.startx + newLength / Scale;
    }
  }

  l.lineLength = Math.sqrt(
    Math.pow(l.startx - l.endx, 2) + Math.pow(l.starty - l.endy, 2)
  );
  l.midpointX = (l.startx + l.endx) / 2;
  l.midpointY = (l.starty + l.endy) / 2;

  for (var i = 0; i < linearDimArray.length; i++) {
    d = linearDimArray[i];
    if (d.elementID == l.lineID) {
      var actLength = l.lineLength * Scale;
      d.value = actLength;
    }
  }

  var dimXpos = l.startx + 2;
  var dimYpos = l.starty - 10;

  var actLength = l.lineLength * Scale;

  if (l.starty == l.endy) {
    dimXpos =
      (l.startx + l.endx) / 2 - getlength(actLength.toFixed(Precision)) * 3;
    var dimlineYstart = l.starty - 10;
    var dimlineYend = l.endy - 10;
    var dimlineXstart = l.startx;
    var dimlineXend = l.endx;
  } else if (l.startx == l.endx) {
    dimYpos = (l.starty + l.endy) / 2;
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

  if (l.lineLength < 20) {
    d.showDim = false;
    Redraw();
  } else {
    d.showDim = true;
    Redraw();
  }
}

function changeLineLength(newDim, lineID, type) {
  var l = "null";
  var e = "null";
  var f = "null";
  var g = "null";

  for (var i = 0; i < lineArray.length; i++) {
    m = lineArray[i];
    if (m.lineID == lineID) {
      l = lineArray[i];
    }
  }

  var undoLine = JSON.parse(JSON.stringify(l));

  var sConnected = false;
  var eConnected = false;
  var eMove = "end";

  var StartCommonNodesArray = linesCommonToNode_2(l.startx, l.starty);
  var EndCommonNodesArray = linesCommonToNode_2(l.endx, l.endy);

  var arcCommonToStart = 999; //arcsCommonToNode(l.startx, l.starty);
  var arcCommonToEnd = 999; //arcsCommonToNode(l.endx, l.endy);

  if (
    (StartCommonNodesArray[0] != 999) & (StartCommonNodesArray[5] != 999) ||
    arcCommonToStart != 999
  ) {
    sConnected = true;
  }

  if (
    (EndCommonNodesArray[0] != 999) & (EndCommonNodesArray[5] != 999) ||
    arcCommonToEnd != 999
  ) {
    eConnected = true;
  }

  if (sConnected == true && eConnected == false) {
    eMove = "end";
  } else if (sConnected == false && eConnected == true) {
    eMove = "start";
  } else if (
    (sConnected == false && eConnected == false) ||
    (sConnected == true && eConnected == true)
  ) {
    eMove = "end";
  }

  var line1startx = l.startx;
  var line1starty = l.starty;
  var line1endx = l.endx;
  var line1endy = l.endy;
  var line1angle = l.angle;
  var line1length = Math.sqrt(
    Math.pow(l.startx - l.endx, 2) + Math.pow(l.starty - l.endy, 2)
  );

  if (type == "linear") {
    var pxnewLength = newDim / Scale;
  } else if (type == "angular") {
    var pxnewLength = line1length;
    var line1angle = 0;

    for (var i = 0; i < AngularDimArray.length; i++) {
      f = AngularDimArray[i];
      if (f.elementID == l.lineID) {
        g = AngularDimArray[i];
        var undoAngularDim = JSON.parse(JSON.stringify(g));
      }
    }

    if (g.caseNumber == 1) {
      line1angle = newDim;
    } else if (g.caseNumber == 2) {
      line1angle = newDim + 90;
    } else if (g.caseNumber == 3) {
      line1angle = newDim + 180;
    } else if (g.caseNumber == 4) {
      line1angle = newDim + 270;
    }
  }

  line1endx =
    line1startx + pxnewLength * Math.cos(line1angle * (Math.PI / 180));
  line1endy =
    line1starty - pxnewLength * Math.sin(line1angle * (Math.PI / 180));

  var l1startx = l.endx - pxnewLength * Math.cos(line1angle * (Math.PI / 180));
  var l1starty = l.endy + pxnewLength * Math.sin(line1angle * (Math.PI / 180));

  if (eMove == "end") {
    if (
      line1endx < canvas.width &&
      line1endx > 0 &&
      line1endy < canvas.height &&
      line1endy > 50
    ) {
      l.endx = line1endx;
      l.endy = line1endy;
      l.angle = line1angle;

      var angle = l.angle;

      l.lineLength = Math.sqrt(
        Math.pow(l.startx - l.endx, 2) + Math.pow(l.starty - l.endy, 2)
      );
      l.midpointX = (l.startx + l.endx) / 2;
      l.midpointY = (l.starty + l.endy) / 2;

      for (var i = 0; i < linearDimArray.length; i++) {
        d = linearDimArray[i];
        if (d.elementID == l.lineID) {
          var actLength = l.lineLength * Scale;
          var undoLinearDim = JSON.parse(JSON.stringify(d));
          d.value = actLength;
          e = linearDimArray[i];
        }
      }

      for (var i = 0; i < AngularDimArray.length; i++) {
        f = AngularDimArray[i];
        if (f.elementID == l.lineID) {
          f.value = angle;
          g = AngularDimArray[i];
          var undoAngularDim = JSON.parse(JSON.stringify(g));
        }
      }

      var dimXpos = l.startx + 2;
      var dimYpos = l.starty - 10;

      var actLength = l.lineLength * Scale;

      var offsetArray = findOffsets(
        actLength,
        line1startx,
        line1starty,
        line1endx,
        line1endy,
        angle
      );
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

      if (Tol(actLength, line1length * Scale, 0.000001) == false) {
        updateUserMoves(["changedim", undoLine, undoLinearDim, undoAngularDim]);
        //GenerateInverse();
      }

      if (l.lineLength < 20) {
        d.showDim = false;
        Redraw();
      } else {
        d.showDim = true;
        Redraw();
      }
    } else {
      if (isNaN(newDim) == false) {
        displayError(
          "drawnout",
          "Line would extend outside of drawing area. Enlarge drawing area by zooming out or increasing the size of the browser window."
        );
      }
    }
  } else if (eMove == "start") {
    if (
      l1startx < canvas.width &&
      l1startx > 0 &&
      l1starty < canvas.height &&
      l1starty > 50
    ) {
      l.startx = l1startx;
      l.starty = l1starty;
      l.angle = line1angle;

      var angle = l.angle;

      l.lineLength = Math.sqrt(
        Math.pow(l.startx - l.endx, 2) + Math.pow(l.starty - l.endy, 2)
      );
      l.midpointX = (l.startx + l.endx) / 2;
      l.midpointY = (l.starty + l.endy) / 2;

      for (var i = 0; i < linearDimArray.length; i++) {
        d = linearDimArray[i];
        if (d.elementID == l.lineID) {
          var actLength = l.lineLength * Scale;
          var undoLinearDim = JSON.parse(JSON.stringify(d));
          d.value = actLength;
          e = linearDimArray[i];
        }
      }

      for (var i = 0; i < AngularDimArray.length; i++) {
        f = AngularDimArray[i];
        if (f.elementID == l.lineID) {
          f.value = angle;
          g = AngularDimArray[i];
          var undoAngularDim = JSON.parse(JSON.stringify(g));
        }
      }

      var dimXpos = l.startx + 2;
      var dimYpos = l.starty - 10;

      var actLength = l.lineLength * Scale;

      var offsetArray = findOffsets(
        actLength,
        l.startx,
        l.starty,
        l.endx,
        l.endy,
        angle
      );
      var dimYpos = offsetArray[0];
      var dimXpos = offsetArray[1];
      var xoffset1 = offsetArray[2];
      var yoffset1 = offsetArray[3];
      var xoffset2 = offsetArray[4];
      var yoffset2 = offsetArray[5];
      var dimYpos_a = offsetArray[6];
      var dimXpos_a = offsetArray[7];
      var perpOffset = offsetArray[8];

      e.x = l.midpointX + e.boxwidth / 2;
      e.y = l.midpointY - 10;
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

      updateUserMoves(["changedim", undoLine, undoLinearDim, undoAngularDim]);

      if (l.lineLength < 20) {
        e.showDim = false;
        Redraw();
      } else {
        e.showDim = true;
        Redraw();
      }
    } else {
      if (isNaN(newDim) == false) {
        displayError(
          "drawnout",
          "Line would extend outside of drawing area. Enlarge drawing area by zooming out or increasing the size of the browser window."
        );
      }
    }
  }
}

function changeLineAngle(dim, elementID) {
  for (var i = 0; i < relAngleArray.length; i++) {
    if (relAngleArray[i].elementID == elementID) {
      var a = relAngleArray[i];
      var line1 = relAngleArray[i].line1ID;
      var line2 = relAngleArray[i].line2ID;
    }
  }

  if (a.displayFlippedArc == true) {
    dim = 360 - dim;
  }

  a.showDim = true;

  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].lineID == line1) {
      var l1 = lineArray[i];
    }
    if (lineArray[i].lineID == line2) {
      var l2 = lineArray[i];
    }
  }

  var undorelAngularDim = JSON.parse(JSON.stringify(a));
  var undoLine = JSON.parse(JSON.stringify(l2));

  var SorEArray = endpointCommonToLines(l1.lineID, l2.lineID);

  if (
    (Tol(a.centroidx, l1.startx, 0.001) &&
      Tol(a.centroidy, l1.starty, 0.001)) ||
    (Tol(a.centroidx, l1.endx, 0.001) && Tol(a.centroidy, l1.endy, 0.001))
  ) {
  } else {
    displayError(
      "noangleatfillet",
      "Angle change not allowed at fillet locations. Remove fillet before re-dimensioning angle."
    );
    a.selectForChange = false;
    return 0;
  }

  var line1origAngle = 0;
  var line2origAngle = 0;

  if (SorEArray[0] == "start") {
    line1origAngle = l1.angle;
  } else if (SorEArray[0] == "end") {
    line1origAngle = 180 + l1.angle;
    if (line1origAngle > 360) {
      line1origAngle = line1origAngle - 360;
    }
  }

  if (SorEArray[1] == "start") {
    line2origAngle = l2.angle;
  } else if (SorEArray[1] == "end") {
    line2origAngle = 180 + l2.angle;
    if (line2origAngle > 360) {
      line2origAngle = line2origAngle - 360;
    }
  }

  if (a.direction == "cw") {
    var angledelta = a.value - dim;
  } else {
    var angledelta = dim - a.value;
  }

  var line2newAngle = line2origAngle + angledelta;

  if (line2newAngle < 0) {
    line2newAngle = line2newAngle + 360;
  } else if (line2newAngle > 360) {
    line2newAngle = line2newAngle - 360;
  }

  var line2length = Math.sqrt(
    Math.pow(l2.startx - l2.endx, 2) + Math.pow(l2.starty - l2.endy, 2)
  );

  if (SorEArray[1] == "start") {
    var lineendx =
      l2.startx + line2length * Math.cos(line2newAngle * (Math.PI / 180));
    var lineendy =
      l2.starty - line2length * Math.sin(line2newAngle * (Math.PI / 180));
    if (
      lineendx < canvas.width &&
      lineendx > 0 &&
      lineendy < canvas.height &&
      lineendy > 50
    ) {
      l2.endx =
        l2.startx + line2length * Math.cos(line2newAngle * (Math.PI / 180));
      l2.endy =
        l2.starty - line2length * Math.sin(line2newAngle * (Math.PI / 180));
      l2.angle = line2newAngle;
      l2.endxghost = null;
      l2.endyghost = null;
    } else {
      displayError(
        "drawnout",
        "Line would extend outside of drawing area. Enlarge drawing area by zooming out or increasing the size of the browser window."
      );
      a.selectForChange = false;
      return 0;
    }
  } else if (SorEArray[1] == "end") {
    var lineendx =
      l2.endx + line2length * Math.cos(line2newAngle * (Math.PI / 180));
    var lineendy =
      l2.endy - line2length * Math.sin(line2newAngle * (Math.PI / 180));
    if (
      lineendx < canvas.width &&
      lineendx > 0 &&
      lineendy < canvas.height &&
      lineendy > 50
    ) {
      l2.startx =
        l2.endx + line2length * Math.cos(line2newAngle * (Math.PI / 180));
      l2.starty =
        l2.endy - line2length * Math.sin(line2newAngle * (Math.PI / 180));
      l2.startxghost = null;
      l2.startyghost = null;
      line2newAngle = line2newAngle - 180;
      if (line2newAngle < 0) {
        line2newAngle = line2newAngle + 360;
      }
      l2.angle = line2newAngle;
    } else {
      displayError(
        "drawnout",
        "Line would extend outside of drawing area. Enlarge drawing area by zooming out or increasing the size of the browser window."
      );
      a.selectForChange = false;
      return 0;
    }
  }

  l2.midpointX = (l2.startx + l2.endx) / 2;
  l2.midpointY = (l2.starty + l2.endy) / 2;

  updateRelAngleDim(a.elementID);

  a.selectForChange = false;

  for (var i = 0; i < linearDimArray.length; i++) {
    d = linearDimArray[i];
    if (d.elementID == l2.lineID) {
      var undoLinearDim = JSON.parse(JSON.stringify(d));
      d.angle = line2newAngle;
      e = linearDimArray[i];
    }
  }

  for (var i = 0; i < AngularDimArray.length; i++) {
    f = AngularDimArray[i];
    if (f.elementID == l2.lineID) {
      f.value = line2newAngle;
      g = AngularDimArray[i];
      var undoAngularDim = JSON.parse(JSON.stringify(g));
    }
  }

  var dimXpos = l2.startx + 2;
  var dimYpos = l2.starty - 10;

  var actLength = l2.lineLength * Scale;

  var offsetArray = findOffsets(
    actLength,
    l2.startx,
    l2.starty,
    l2.endx,
    l2.endy,
    l2.angle
  );
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

  updateUserMoves([
    "changerelangledim",
    undoLine,
    undoLinearDim,
    undoAngularDim,
    undorelAngularDim,
  ]);

  closeOrOpenSection();

  Redraw();
}

function lineAngleFromOrigin(startx, starty, endx, endy) {
  delx = Math.abs(startx - endx);
  dely = Math.abs(starty - endy);

  var angle = 0.0;
  var angle_degrees = 0;

  switch (quadrantDetect(startx, starty, endx, endy)) {
    case 1:
      angle = Math.atan(delx / dely);
      angle_degrees = angle * (180 / Math.PI);
      return angle_degrees;
      break;
    case 2:
      angle = Math.atan(dely / delx);
      angle_degrees = angle * (180 / Math.PI) + 90;
      return angle_degrees;
      break;
    case 3:
      angle = Math.atan(delx / dely);
      angle_degrees = angle * (180 / Math.PI) + 180;
      return angle_degrees;
      break;
    case 4:
      angle = Math.atan(dely / delx);
      angle_degrees = angle * (180 / Math.PI) + 270;
      return angle_degrees;
      break;
    default:
  }
}

function quadrantDetect(startx, starty, endx, endy) {
  if ((startx <= endx) & (starty < endy)) {
    q = 2;
  } else if ((startx < endx) & (starty >= endy)) {
    q = 1;
  } else if ((startx >= endx) & (starty > endy)) {
    q = 4;
  } else if ((startx > endx) & (starty <= endy)) {
    q = 3;
  } else {
    q = 999;
  }
  return q;
}

function GetInput() {
  var ret = document.getElementById("inputBox").value;
  var numret = parseFloat(ret);
  return numret;
}

function setScale(dim) {
  l = lineArray[0];
  l.dim = dim;
  Precision = 1;

  var Length = Math.sqrt(
    Math.pow(l.startx - l.endx, 2) + Math.pow(l.starty - l.endy, 2)
  );

  Scale = dim / Length;

  for (var i = 0; i < linearDimArray.length; i++) {
    d = linearDimArray[i];
    if (d.elementID == l.lineID) {
      var fixedval = l.lineLength * Scale;
      d.value = fixedval;
    }
  }

  Redraw();
}

function bottomLeftPoint() {
  var smallestx = canvas.width;
  var largesty = 0;

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.constLine != true) {
      if (l.startx < smallestx) {
        smallestx = l.startx;
      }
      if (l.endx < smallestx) {
        smallestx = l.endx;
      }
      if (l.starty > largesty) {
        largesty = l.starty;
      }
      if (l.endy > largesty) {
        largesty = l.endy;
      }
    }
  }

  zeroX = smallestx;
  zeroY = largesty;
}

function linesCommonToNode(nodex, nodey) {
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

  tolerance = 0.0001;

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (
      Tol(l.startx, nodex, tolerance) &&
      Tol(l.starty, nodey, tolerance) &&
      l.constLine == false
    ) {
    } else if (
      Tol(l.endx, nodex, tolerance) &&
      Tol(l.endy, nodey, tolerance) &&
      l.constLine == false
    ) {
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (
      Tol(l.startx, nodex, tolerance) &&
      Tol(l.starty, nodey, tolerance) &&
      l.constLine == false
    ) {
      numberOfCommonNodes += 1;
    } else if (
      Tol(l.endx, nodex, tolerance) &&
      Tol(l.endy, nodey, tolerance) &&
      l.constLine == false
    ) {
      numberOfCommonNodes += 1;
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];

    if (
      Tol(l.startx, nodex, tolerance) &&
      Tol(l.starty, nodey, tolerance) &&
      l.constLine == false
    ) {
      if (numberOfLinesFound == 0) {
        lineID1 = l.lineID;
        line1length = l.lineLength;
        line1angle = l.angle;
        x = l.startx;
        y = l.starty;
        line1side = "start";
        numberOfLinesFound += 1;
      } else if (numberOfLinesFound == 1) {
        lineID2 = l.lineID;
        line2length = l.lineLength;
        line2angle = l.angle;
        x = l.startx;
        y = l.starty;
        line2side = "start";
        numberOfLinesFound += 1;
      }
    } else if (
      Tol(l.endx, nodex, tolerance) &&
      Tol(l.endy, nodey, tolerance) &&
      l.constLine == false
    ) {
      if (numberOfLinesFound == 0) {
        lineID1 = l.lineID;
        line1length = l.lineLength;
        if (l.angle >= 0 && l.angle < 180) {
          line1angle = l.angle + 180;
        } else if (l.angle >= 180 && l.angle < 360) {
          line1angle = l.angle - 180;
        }
        x = l.endx;
        y = l.endy;
        line1side = "end";
        numberOfLinesFound += 1;
      } else if (numberOfLinesFound == 1) {
        lineID2 = l.lineID;
        line2length = l.lineLength;
        if (l.angle >= 0 && l.angle < 180) {
          line2angle = l.angle + 180;
        } else if (l.angle >= 180 && l.angle < 360) {
          line2angle = l.angle - 180;
        } else {
        }
        x = l.endx;
        y = l.endy;
        line2side = "end";
        numberOfLinesFound += 1;
      }
    }
  }

  retArray = [
    lineID1,
    line1length,
    line1angle,
    x,
    y,
    lineID2,
    line2length,
    line2angle,
    line1side,
    line2side,
  ];

  return retArray;
}

function linesCommonToNode_2(nodex, nodey) {
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

  tolerance = 0.0001;

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (Tol(l.startx, nodex, tolerance) && Tol(l.starty, nodey, tolerance)) {
    } else if (Tol(l.endx, nodex, tolerance) && Tol(l.endy, nodey, tolerance)) {
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (Tol(l.startx, nodex, tolerance) && Tol(l.starty, nodey, tolerance)) {
      numberOfCommonNodes += 1;
    } else if (Tol(l.endx, nodex, tolerance) && Tol(l.endy, nodey, tolerance)) {
      numberOfCommonNodes += 1;
    }
  }

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];

    if (Tol(l.startx, nodex, tolerance) && Tol(l.starty, nodey, tolerance)) {
      if (numberOfLinesFound == 0) {
        lineID1 = l.lineID;
        line1length = l.lineLength;
        line1angle = l.angle;
        x = l.startx;
        y = l.starty;
        line1side = "start";
        numberOfLinesFound += 1;
      } else if (numberOfLinesFound == 1) {
        lineID2 = l.lineID;
        line2length = l.lineLength;
        line2angle = l.angle;
        x = l.startx;
        y = l.starty;
        line2side = "start";
        numberOfLinesFound += 1;
      }
    } else if (Tol(l.endx, nodex, tolerance) && Tol(l.endy, nodey, tolerance)) {
      if (numberOfLinesFound == 0) {
        lineID1 = l.lineID;
        line1length = l.lineLength;
        if (l.angle >= 0 && l.angle < 180) {
          line1angle = l.angle + 180;
        } else if (l.angle >= 180 && l.angle < 360) {
          line1angle = l.angle - 180;
        }
        x = l.endx;
        y = l.endy;
        line1side = "end";
        numberOfLinesFound += 1;
      } else if (numberOfLinesFound == 1) {
        lineID2 = l.lineID;
        line2length = l.lineLength;
        if (l.angle >= 0 && l.angle < 180) {
          line2angle = l.angle + 180;
        } else if (l.angle >= 180 && l.angle < 360) {
          line2angle = l.angle - 180;
        } else {
        }
        x = l.endx;
        y = l.endy;
        line2side = "end";
        numberOfLinesFound += 1;
      }
    }
  }

  retArray = [
    lineID1,
    line1length,
    line1angle,
    x,
    y,
    lineID2,
    line2length,
    line2angle,
    line1side,
    line2side,
  ];

  return retArray;
}

function updateLinearDimension(lineID) {
  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.lineID == lineID) {
      l.midpointX = (l.startx + l.endx) / 2;
      l.midpointY = (l.starty + l.endy) / 2;

      l.lineLength = Math.sqrt(
        Math.pow(l.startx - l.endx, 2) + Math.pow(l.starty - l.endy, 2)
      );

      for (var j = 0; j < linearDimArray.length; j++) {
        lx = linearDimArray[j];
        if (lx.elementID == lineID) {
          ldim = lx;
        }
      }

      for (var j = 0; j < AngularDimArray.length; j++) {
        ax = AngularDimArray[j];
        if (ax.elementID == lineID) {
          adim = ax;
        }
      }

      var angle = ldim.angle;

      var dimXpos = l.startx + 2;
      var dimYpos = l.starty - 10;

      var actLength = l.lineLength * Scale;

      var offsetArray = findOffsets(
        actLength,
        l.startx,
        l.starty,
        l.endx,
        l.endy,
        angle
      );

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

      ldim.value = actLength;
      ldim.x = l.midpointX - 10;
      ldim.y = l.midpointY + 4;
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

      if (l.lineLength < 20) {
        ldim.showDim = false;
      } else {
        ldim.showDim = true;
      }
    }
  }
}

function isbetweenangle(angle, startAngle, endAngle) {
  var between = false;
  if (endAngle == 0 || endAngle < startAngle) {
    if (isbetween(angle, startAngle, 360) || isbetween(angle, 0, endAngle)) {
      between = true;
    }
  } else {
    if (isbetween(angle, startAngle, endAngle) == true) {
      between = true;
    }
  }

  return between;
}

function Snip(elementID, preview) {
  var intEndpointArray = [];
  var x = 0;
  var y = 0;

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.lineID == elementID) {
      l1 = l;
    }
  }

  var undoLine = JSON.parse(JSON.stringify(l1));

  var m1 = (l1.endy - l1.starty) / (l1.startx - l1.endx);

  if (m1 > 1000000 || m1 < -1000000 || m1 == -Infinity) {
    m1 = Infinity;
  }

  var yFromBottom1 = canvas.height - l1.starty;
  var b1 = yFromBottom1 * Scale - m1 * (l1.startx * Scale);

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    if (l.lineID != elementID) {
      l2 = l;
      m2 = (l2.endy - l2.starty) / (l2.startx - l2.endx);
      if (m2 > 1000000 || m2 < -1000000 || m2 == -Infinity) {
        m2 = Infinity;
      }
      yFromBottom2 = canvas.height - l2.starty;
      b2 = yFromBottom2 * Scale - m2 * (l2.startx * Scale);

      x = (b2 - b1) / (m1 - m2);

      if (m1 == Infinity) {
        x = l1.startx * Scale;
      } else if (m2 == Infinity) {
        x = l2.startx * Scale;
      }

      if (m1 == Infinity) {
        y = m2 * x + b2;
      } else if (m2 == Infinity) {
        y = m1 * x + b1;
      } else {
        y = m1 * x + b1;
      }

      x = x / Scale;
      y = canvas.height - y / Scale;

      var calcdLineLength1 = Math.sqrt(
        Math.pow(l1.startx - l1.endx, 2) + Math.pow(l1.starty - l1.endy, 2)
      );
      var dist_from_start1 = Math.sqrt(
        Math.pow(l1.startx - x, 2) + Math.pow(l1.starty - y, 2)
      );
      var dist_from_end1 = Math.sqrt(
        Math.pow(l1.endx - x, 2) + Math.pow(l1.endy - y, 2)
      );
      var closeness1 = Math.abs(
        calcdLineLength1 - dist_from_start1 - dist_from_end1
      );

      var calcdLineLength2 = Math.sqrt(
        Math.pow(l2.startx - l2.endx, 2) + Math.pow(l2.starty - l2.endy, 2)
      );
      var dist_from_start2 = Math.sqrt(
        Math.pow(l2.startx - x, 2) + Math.pow(l2.starty - y, 2)
      );
      var dist_from_end2 = Math.sqrt(
        Math.pow(l2.endx - x, 2) + Math.pow(l2.endy - y, 2)
      );
      var closeness2 = Math.abs(
        calcdLineLength2 - dist_from_start2 - dist_from_end2
      );

      if (closeness1 < 0.01 && closeness2 < 0.01) {
        var notARepeat = true;
        for (var k = 0; k < intEndpointArray.length; k++) {
          if (
            Math.round(x * 10000) ==
              Math.round(intEndpointArray[k][0] * 10000) &&
            Math.round(y * 10000) == Math.round(intEndpointArray[k][1] * 10000)
          ) {
            notARepeat = false;
          }
        }
        if (notARepeat == true) {
          intEndpointArray.push([x, y]);
        }
      }
    }

    var sharedEP1 = false;
    var sharedEP2 = false;

    ep1Array = [l1.startx, l1.starty];
    ep2Array = [l1.endx, l1.endy];
    for (var j = 0; j < intEndpointArray.length; j++) {
      var intep = intEndpointArray[j];

      var intep0r = Math.round(intep[0] * 10000);
      var intep1r = Math.round(intep[1] * 10000);

      var ep10r = Math.round(ep1Array[0] * 10000);
      var ep11r = Math.round(ep1Array[1] * 10000);
      var ep20r = Math.round(ep2Array[0] * 10000);
      var ep21r = Math.round(ep2Array[1] * 10000);

      if (intep0r == ep10r && intep1r == ep11r) {
        sharedEP1 = true;
      }
      if (intep0r == ep20r && intep1r == ep21r) {
        sharedEP2 = true;
      }
    }

    if (sharedEP1 == false) {
      intEndpointArray.push([ep1Array[0], ep1Array[1]]);
    }
    if (sharedEP2 == false) {
      intEndpointArray.push([ep2Array[0], ep2Array[1]]);
    }
  }

  var unSortedIntArray = [];
  var sortedIntArray = [];
  var firstElementSortArray = [];
  var firstElementSortArray1 = [];

  for (var l = 0; l < intEndpointArray.length; l++) {
    var dist_from_start = Math.sqrt(
      Math.pow(intEndpointArray[l][0] - l1.startx, 2) +
        Math.pow(intEndpointArray[l][1] - l1.starty, 2)
    );
    unSortedIntArray.push([
      dist_from_start,
      intEndpointArray[l][0],
      intEndpointArray[l][1],
    ]);
  }

  for (var l = 0; l < unSortedIntArray.length; l++) {
    firstElementSortArray1.push(unSortedIntArray[l][0]);
  }

  firstElementSortArray = firstElementSortArray1.sort(compareNumbers);

  for (var l = 0; l < firstElementSortArray.length; l++) {
    for (var m = 0; m < unSortedIntArray.length; m++) {
      if (unSortedIntArray[m][0] == firstElementSortArray[l]) {
        sortedIntArray.push([unSortedIntArray[m][1], unSortedIntArray[m][2]]);
      }
    }
  }

  var pairsArray = [];

  for (var l = 0; l < sortedIntArray.length - 1; l++) {
    var pairsSubArray = [sortedIntArray[l], sortedIntArray[l + 1]];
    pairsArray.push(pairsSubArray);
  }

  var minCloseness = 10000;
  var lforClosest = 0;

  for (var l = 0; l < pairsArray.length; l++) {
    var startx = pairsArray[l][0][0];
    var starty = pairsArray[l][0][1];
    var endx = pairsArray[l][1][0];
    var endy = pairsArray[l][1][1];

    var calcdLineLength = Math.sqrt(
      Math.pow(startx - endx, 2) + Math.pow(starty - endy, 2)
    );
    var dist_from_start = Math.sqrt(
      Math.pow(startx - mouse.x, 2) + Math.pow(starty - mouse.y, 2)
    );
    var dist_from_end = Math.sqrt(
      Math.pow(endx - mouse.x, 2) + Math.pow(endy - mouse.y, 2)
    );
    var closeness = Math.abs(calcdLineLength - dist_from_start - dist_from_end);

    if (closeness < minCloseness) {
      minCloseness = closeness;
      lforClosest = l;
    }
  }

  startx = pairsArray[lforClosest][0][0];
  starty = pairsArray[lforClosest][0][1];
  endx = pairsArray[lforClosest][1][0];
  endy = pairsArray[lforClosest][1][1];

  if (preview == true) {
    if (l1.constLine == false) {
      c.beginPath();
      c.moveTo(startx, starty);
      c.lineTo(endx, endy);
      c.lineWidth = 2;
      c.strokeStyle = "red";
      c.stroke();
    } else {
      c.beginPath();
      c.moveTo(startx, starty);
      c.lineTo(endx, endy);
      c.lineWidth = 1;
      c.strokeStyle = "red";
      c.stroke();
    }
  } else {
    var oldl1endx = l1.endx;
    var oldl1endy = l1.endy;

    l1.endx = startx;
    l1.endy = starty;

    l1.midpointX = (l1.startx + l1.endx) / 2;
    l1.midpointY = (l1.starty + l1.endy) / 2;
    for (var k = 0; k < linearDimArray.length; k++) {
      if (linearDimArray[k].elementID == l1.lineID) {
        var undoLinearDim = JSON.parse(JSON.stringify(linearDimArray[k]));
      }
    }
    for (var k = 0; k < AngularDimArray.length; k++) {
      if (AngularDimArray[k].elementID == l1.lineID) {
        var undoAngularDim = JSON.parse(JSON.stringify(AngularDimArray[k]));
      }
    }

    var snipforprint = "Line " + l1.lineID.toString() + " Snipped";

    var undoDeleteLine = createNewLineSnip(
      endx,
      endy,
      oldl1endx,
      oldl1endy,
      l1.constLine
    );
    updateUserMoves([
      "snipline",
      undoLine,
      undoLinearDim,
      undoAngularDim,
      undoDeleteLine,
    ]);
    //GenerateInverse();
    removeZeroLengthLines();
    updateLinearDimension(l1.lineID);
    closeOrOpenSection();
  }

  removeZeroLengthLines();
}

function Intersection(startx, starty, endx, endy) {
  var x = 0;
  var y = 0;

  var intersectingLineID = 999;

  var intEndpointArray = [];

  var m1 = (endy - starty) / (startx - endx);
  if (m1 > 1000000 || m1 < -1000000 || m1 == -Infinity) {
    m1 = Infinity;
  }

  yFromBottom1 = canvas.height - starty;
  var b1 = yFromBottom1 * Scale - m1 * (startx * Scale);

  for (var i = 0; i < lineArray.length; i++) {
    l = lineArray[i];
    l2 = l;
    m2 = (l2.endy - l2.starty) / (l2.startx - l2.endx);
    if (m2 > 1000000 || m2 < -1000000 || m2 == -Infinity) {
      m2 = Infinity;
    }
    yFromBottom2 = canvas.height - l2.starty;
    b2 = yFromBottom2 * Scale - m2 * (l2.startx * Scale);

    x = (b2 - b1) / (m1 - m2);

    if (m1 == Infinity) {
      x = l1.startx * Scale;
    } else if (m2 == Infinity) {
      x = l2.startx * Scale;
    }

    if (m1 == Infinity) {
      y = m2 * x + b2;
    } else if (m2 == Infinity) {
      y = m1 * x + b1;
    } else {
      y = m1 * x + b1;
    }

    x = x / Scale;
    y = canvas.height - y / Scale;

    var calcdLineLength1 = Math.sqrt(
      Math.pow(startx - endx, 2) + Math.pow(starty - endy, 2)
    );
    var dist_from_start1 = Math.sqrt(
      Math.pow(startx - x, 2) + Math.pow(starty - y, 2)
    );
    var dist_from_end1 = Math.sqrt(
      Math.pow(endx - x, 2) + Math.pow(endy - y, 2)
    );
    var closeness1 = Math.abs(
      calcdLineLength1 - dist_from_start1 - dist_from_end1
    );

    var calcdLineLength2 = Math.sqrt(
      Math.pow(l2.startx - l2.endx, 2) + Math.pow(l2.starty - l2.endy, 2)
    );
    var dist_from_start2 = Math.sqrt(
      Math.pow(l2.startx - x, 2) + Math.pow(l2.starty - y, 2)
    );
    var dist_from_end2 = Math.sqrt(
      Math.pow(l2.endx - x, 2) + Math.pow(l2.endy - y, 2)
    );
    var closeness2 = Math.abs(
      calcdLineLength2 - dist_from_start2 - dist_from_end2
    );

    if (closeness1 < 0.01 && closeness2 < 0.01) {
      intersectingLineID = l2.lineID;
    }
  }
  return intersectingLineID;
}

function saveUndoLines(larray, darray, LoadNew) {
  if (LoadNew == true) {
    undoLineArray = JSON.stringify(larray);
    undolinearDimArray = JSON.stringify(darray);
  } else if (arcArray.length == 0 && chamferArray.length == 0) {
    undoLineArray = JSON.stringify(larray);
    undolinearDimArray = JSON.stringify(darray);
  }
}

function displayProperties() {
  var str = "Area (ft^2): ";
  MasterAreaStr = String(MasterArea.toFixed(2));
  var Areastr = str.concat(MasterAreaStr);

  Redraw();

  document.getElementById("loader").style.visibility = "hidden";

  UseCredit();

  document.getElementById("results").style.visibility = "visible";
  document.getElementById("resultsgrab").style.visibility = "visible";
  document.getElementById("outputpopuptext").style.visibility = "visible";
  document.getElementById("resultsheader").style.visibility = "visible";
  document.getElementById("resultskeepout").style.visibility = "visible";
  var resultstoprint =
    "Results Box Shown. Area: " + MasterAreaStr + " " + Units;
  PrintToLog(resultstoprint);
  Redraw();
}

function clearResults() {
  rectArray = [];
  document.getElementById("results").style.visibility = "hidden";
  document.getElementById("resultsgrab").style.visibility = "hidden";
  document.getElementById("outputpopuptext").style.visibility = "hidden";
  document.getElementById("resultsheader").style.visibility = "hidden";
  document.getElementById("resultskeepout").style.visibility = "hidden";
}

function clearInput() {
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

function firstdimokClicked() {
  var D = document.getElementById("firstinput").value;
  if (isNaN(D) || D <= 0) {
    PrintToLog("First Dim Ok Pressed");
    displayError(
      "badlineardim_first",
      "Dimension must be a number greater than 0."
    );
  } else {
    document.getElementById("inputBox").value = document.getElementById(
      "firstinput"
    ).value;
    var firstvaluetoprint =
      "First Dimension Value: " +
      document.getElementById("firstinput").value.toString();
    PrintToLog(firstvaluetoprint);
    enterPressed_2();
    hideFirstDimAlert();
    Units = document.getElementById("unitsselection_a").value;

    var firstunitstoprint = "Units Selected in first dim box: " + Units;
    PrintToLog(firstunitstoprint);
    PrintToLog("First Dim Ok Pressed");
    var btn = document.getElementById("units");
    btn.innerHTML = "Units: " + Units;
  }
}

function firstdimcancelClicked() {
  if (lineArray.length > 0) {
    var drawnLineID = lineArray[0].lineID;
    deleteline(drawnLineID);
  }
  hideFirstDimAlert();
  Redraw();
}

function enterPressed() {
  if (drawingMode == "fillets") {
    return 0;
  }
  if (document.getElementById("firstinput").style.visibility == "visible") {
    firstdimokClicked();
    return 0;
  }

  var aCT = activeChangeTag();

  if (welcomeDisplayed == true) {
    welcomecancelClicked();
    return 0;
  }

  var dimension = GetInput();
  resetChangeTag();

  if (document.getElementById("clearalert").style.visibility == "visible") {
    clearokClicked();
    return 0;
  }

  if (document.getElementById("prealert").style.visibility == "visible") {
    preokClicked();
    return 0;
  }

  if (document.getElementById("erroralert").style.visibility == "visible") {
    errorcancelClicked();
    return 0;
  }

  if (drawingMode != "snip" && drawingMode != "erase") {
    if (isNaN(dimension) && LastSelectedDimType == "linear" && aCT == true) {
      displayError("badlineardim", "Invalid dimension.");
    }

    if (
      (isNaN(dimension) || dimension < 0 || dimension > 360) &&
      LastSelectedDimType == "relangular"
    ) {
      displayError("badangulardim", "Angle must be between 0 - 360");
      document.getElementById("inputBox").value = "";
      ChangePreviewValue = null;
    } else if (lineArray.length == 0) {
    } else if (firstAcceptedValue == true) {
      l = linearDimArray[0];
      l.selectForChange = false;
      setScale(dimension);
      firstAcceptedValue = false;
      document.getElementById("inputBox").value = "";
      ChangePreviewValue = null;
    } else {
      if (LastSelectedDimType == "relangular") {
        changeLineAngle(dimension, LastSelectedDimID);
      } else if (LastSelectedDimType == "fillet") {
        changeFilletRadius(dimension, LastSelectedDimID);
      } else if (LastSelectedDimType == "linear") {
        changeLineLength(dimension, LastSelectedDimID, LastSelectedDimType);
      }
      closeOrOpenSection();
    }
  }
}

function enterPressed_2() {
  var aCT = activeChangeTag();

  if (welcomeDisplayed == true) {
    welcomecancelClicked();
    return 0;
  }

  var dimension = GetInput();
  resetChangeTag();

  if (document.getElementById("clearalert").style.visibility == "visible") {
    clearokClicked();
    return 0;
  }

  if (document.getElementById("prealert").style.visibility == "visible") {
    preokClicked();
    return 0;
  }

  if (document.getElementById("erroralert").style.visibility == "visible") {
    errorcancelClicked();
    return 0;
  }

  if (drawingMode != "snip" && drawingMode != "erase") {
    if (
      (isNaN(dimension) || dimension <= 0) &&
      LastSelectedDimType == "linear" &&
      aCT == true
    ) {
      displayError(
        "badlineardim",
        "Use number keys to enter desired dimension."
      );
      document.getElementById("inputBox").value = "";
      ChangePreviewValue = null;
      Redraw();
    } else if (
      (isNaN(dimension) || dimension < 0 || dimension > 360) &&
      LastSelectedDimType == "relangular"
    ) {
      displayError("badangulardim", "Angle must be between 0 - 360");
      document.getElementById("inputBox").value = "";
      ChangePreviewValue = null;
    } else if (lineArray.length == 0) {
    } else if (firstAcceptedValue == true) {
      l = linearDimArray[0];
      l.selectForChange = false;
      setScale(dimension);
      firstAcceptedValue = false;
      document.getElementById("inputBox").value = "";
      ChangePreviewValue = null;
    } else {
      if (LastSelectedDimType == "relangular") {
        changeLineAngle(dimension, LastSelectedDimID);
      } else if (LastSelectedDimType == "fillet") {
        changeFilletRadius(dimension, LastSelectedDimID);
      } else if (LastSelectedDimType == "linear") {
        changeLineLength(dimension, LastSelectedDimID, LastSelectedDimType);
      }
      closeOrOpenSection();
    }
  }
}

function Button2Clicked() {
  ConstructionLineMode = false;
  drawingMode = "lines";
  CurrentMode = "Lines";
  resetChangeTag();
  Redraw();
  highlightButtonImg("linesb");
  document.getElementById("snipcursor").style.visibility = "hidden";
  document.getElementById("erasecursor").style.visibility = "hidden";
  document.body.style.cursor = "crosshair";
  var linesString =
    "Lines Drawing Mode activated. \nClick, drag and release to draw lines. \nPress the ? button for help.";
  var linesString2 =
    "Click, drag and release to draw lines. Press the ? button for help.";
}

function userInputLinesButtonClicked() {
  ConstructionLineMode = false;
  drawingMode = "lines";
  CurrentMode = "Lines";
  resetChangeTag();
  Redraw();
  highlightButtonImg("linesb");
  document.getElementById("snipcursor").style.visibility = "hidden";
  document.getElementById("erasecursor").style.visibility = "hidden";
  document.body.style.cursor = "crosshair";
  var linesString =
    "Lines Drawing Mode activated. \nClick, drag and release to draw lines. \nPress the ? button for help.";
  var linesString2 =
    "Click, drag and release to draw lines. Press the ? button for help.";
  PrintToLog("Lines Button Clicked");
}

function Button4Clicked() {
  if (showDims == true) {
    showDims = false;
  } else {
    showDims = true;
  }
}

function DimAnglessClicked() {
  resetChangeTag();
  ConstructionLineMode = false;
  highlightButtonImg("dimanglesb");
  drawingMode = "angledimbetweenlines";
  document.getElementById("snipcursor").style.visibility = "hidden";
  document.getElementById("erasecursor").style.visibility = "hidden";
  document.body.style.cursor = "crosshair";
  var dimAnglesString =
    "Angular Dimension Mode activated. \nClick, drag and release from one line to other line. \nLines must share a common endpoint.";
  var dimAnglesString2 =
    "Click, drag, and release from one line to other line to create an angular dimension.";
  PrintToLog("Angles Button Clicked");
}

function SnipClicked() {
  resetChangeTag();
  ConstructionLineMode = false;
  highlightButtonImg("snipb");
  drawingMode = "snip";
  document.getElementById("snipcursor").style.visibility = "visible";
  document.getElementById("erasecursor").style.visibility = "hidden";
  document.body.style.cursor = "none";
  var snipString =
    "Trim Mode activated. \nClick on a line or arc to shorten to the nearest intersection.\nDrag to trim multiple elements quickly.";
  var snipString2 =
    "Click on a line or arc to trim to the nearest intersection.";
  PrintToLog("Erase Button Clicked");
}

function EraseClicked() {
  resetChangeTag();
  ConstructionLineMode = false;
  highlightButtonImg("eraseb");
  drawingMode = "erase";
  document.getElementById("snipcursor").style.visibility = "hidden";
  document.getElementById("erasecursor").style.visibility = "visible";
  document.body.style.cursor = "none";
  var eraseString =
    "Erase Mode activated. \nClick on any line, arc, or dimension to delete. \nDrag to box select elements for deletion.";
  var eraseString2 =
    "Click on any line, arc, or dimension to delete. Drag to box select.";
}

function clearClicked() {
  PrintToLog("Clear Button Clicked");
  displayClearAlert();
}

function undoClicked() {
  UndoOneStep();
  Redraw();
}

function cancelClicked() {
  document.getElementById("results").style.visibility = "hidden";
  document.getElementById("resultsgrab").style.visibility = "hidden";
  document.getElementById("outputpopuptext").style.visibility = "hidden";
  document.getElementById("resultsheader").style.visibility = "hidden";
  document.getElementById("resultskeepout").style.visibility = "hidden";
  ClearStressVis();
}

function welcomecancelClicked() {
  PrintToLog("Welcome Popup Closed");

  var linesString =
    "Lines Drawing Mode activated. \nClick, drag and release to draw lines. \nPress the ? button for help.";
  var linesString2 =
    "Click, drag and release to draw lines. Press the ? button for help.";

  document.getElementById("welcome").style.visibility = "hidden";
  document.getElementById("welcomegrab").style.visibility = "hidden";
  document.getElementById("okbtn").style.visibility = "hidden";
  document.getElementById("welcomeheader").style.visibility = "hidden";

  document.getElementById("tod").style.visibility = "visible";
  document.getElementById("todgrab").style.visibility = "visible";
  document.getElementById("todheader").style.visibility = "visible";
  document.getElementById("todcancel").style.visibility = "visible";
  document.getElementById("todtxt").style.visibility = "visible";
  document.getElementById("custom-file-upload_a").style.visibility = "visible";

  welcomeDisplayed = false;

  getIP();
}

function todcancelClicked() {
  document.getElementById("smokescreen").style.visibility = "hidden";
  document.getElementById("tod").style.visibility = "hidden";
  document.getElementById("todgrab").style.visibility = "hidden";
  document.getElementById("todheader").style.visibility = "hidden";
  document.getElementById("todcancel").style.visibility = "hidden";
  document.getElementById("todtxt").style.visibility = "hidden";
  document.getElementById("custom-file-upload_a").style.visibility = "hidden";

  PrintToLog(
    "Freehand Triggered (can be called to close after loading an image)"
  );

  InputFreze = false;
}

function fobfeedbackClicked() {
  document.getElementById("fob").style.visibility = "hidden";
  document.getElementById("fobgrab").style.visibility = "hidden";
  document.getElementById("fobheader").style.visibility = "hidden";
  document.getElementById("fobbuy").style.visibility = "hidden";
  document.getElementById("fobtxt").style.visibility = "hidden";
  document.getElementById("fobfeedback").style.visibility = "hidden";

  document.getElementById("feedbackbox").style.visibility = "visible";
  document.getElementById("feedbackboxgrab").style.visibility = "visible";
  document.getElementById("feedbackboxheader").style.visibility = "visible";
  document.getElementById("feedbackboxtxt").style.visibility = "visible";
  document.getElementById("feedbackboxokbtn").style.visibility = "visible";
}

function feedbackOkClicked() {
  var emailString = document.getElementById("email").value;
  var checkbox = document.getElementById("contactcheckbox").checked;
  var usecaseString = document.getElementById("usecase").value;
  var improvementString = document.getElementById("improvement").value;

  var validEmailString = ValidateEmail(emailString);

  if (
    validEmailString == true &&
    usecaseString != "" &&
    improvementString != ""
  ) {
    document.getElementById("smokescreen").style.visibility = "hidden";
    document.getElementById("feedbackboxgrab").style.visibility = "hidden";
    document.getElementById("feedbackbox").style.visibility = "hidden";
    document.getElementById("feedbackboxheader").style.visibility = "hidden";
    document.getElementById("feedbackboxtxt").style.visibility = "hidden";
    document.getElementById("feedbackboxokbtn").style.visibility = "hidden";

    Redraw();

    var ourRequest = new XMLHttpRequest();

    var exportArray = [emailString, checkbox, usecaseString, improvementString];
    JsonToSend = JSON.stringify(exportArray);

    ourRequest.open("POST", "<API URL HERE>");
    ourRequest.setRequestHeader("Content-type", "text/plain");
    ourRequest.send(JsonToSend);

    ourRequest.onload = function () {
      UseCredit();
      SendShape();
      document.getElementById("loader").style.visibility = "visible";
      bottomLeftPoint();
      UtilityPointDraw(displayProperties);
      StressGradientShown = true;
      console.log("Running Analysis.");
    };

    InputFreze = false;
  } else if (validEmailString == true) {
    alert("Please fill out all fields!");
  }
}

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("Please enter a valid email address!");
  return false;
}

function errorcancelClicked() {
  var errorstringtoprint = "Error closed. ";
  PrintToLog(errorstringtoprint);

  document.getElementById("erroralert").style.visibility = "hidden";
  document.getElementById("errorgrab").style.visibility = "hidden";
  document.getElementById("errorokbtn").style.visibility = "hidden";
  document.getElementById("errorreshelpbtn").style.visibility = "hidden";
  document.getElementById("errorheader").style.visibility = "hidden";
  document.getElementById("erroralerttext").style.visibility = "hidden";
  document.getElementById("smokescreen").style.visibility = "hidden";

  if (
    ActiveError == "badlineardim" ||
    ActiveError == "badangulardim" ||
    ActiveError == "noscale" ||
    ActiveError == "outofwindow"
  ) {
    document.getElementById("inputBox").value = "";
    document.getElementById("inputBox").focus();
    document.getElementById("inputBox").select;
  }

  if (ActiveError == "badlineardim_first") {
    displayFirstDimAlert();
  }

  if (ActiveError == "badradius") {
  }

  if (ActiveError == "badimg") {
    console.log("bad img error closed.");
    imageObj.src = "whitepix.PNG";
    whiteBackground = true;
    clearokClicked();
    document.getElementById("smokescreen").style.visibility = "visible";
  }

  ActiveError = null;
  InputFreze = false;
}

function unitscancelClicked() {
  document.getElementById("precisionselection").value = Precision;
  document.getElementById("unitsalert").style.visibility = "hidden";
  document.getElementById("unitsgrab").style.visibility = "hidden";
  document.getElementById("unitsheader").style.visibility = "hidden";
  document.getElementById("unitsxbtn").style.visibility = "hidden";
  document.getElementById("unitsalerttext").style.visibility = "hidden";
  document.getElementById("unitsokbtn").style.visibility = "hidden";
  document.getElementById("unitscancelbtn").style.visibility = "hidden";
  document.getElementById("smokescreen").style.visibility = "hidden";

  InputFreze = false;
  PrintToLog("Units Cancel Clicked");
}

function unitsokClicked() {
  Units = document.getElementById("unitsselection").value;

  var btn = document.getElementById("units");
  btn.innerHTML = "Units: " + Units;

  document.getElementById("unitsalert").style.visibility = "hidden";
  document.getElementById("unitsgrab").style.visibility = "hidden";
  document.getElementById("unitsheader").style.visibility = "hidden";
  document.getElementById("unitsxbtn").style.visibility = "hidden";
  document.getElementById("unitsalerttext").style.visibility = "hidden";
  document.getElementById("unitsokbtn").style.visibility = "hidden";
  document.getElementById("unitscancelbtn").style.visibility = "hidden";
  document.getElementById("smokescreen").style.visibility = "hidden";
  str = "";
  MasterAreaStr = String(MasterArea.toFixed(2));
  var Areastr = str.concat(MasterAreaStr);

  var ResultsString = "Area: \n" + MasterAreaStr + " " + Units + "²";

  InputFreze = false;

  var mySelect = document.getElementById("unitsselection_a");

  for (var i, j = 0; (i = mySelect.options[j]); j++) {
    if (i.value == Units) {
      mySelect.selectedIndex = j;
      break;
    }
  }
  var unitstoprint = "Units Set To: " + Units;
  PrintToLog(unitstoprint);
  PrintToLog("Units Ok Clicked");
}

function displayError(errorType, errorString) {
  var errorstringtoprint = "Error displayed: " + errorString;
  PrintToLog(errorstringtoprint);

  ActiveError = errorType;

  if (errorType == "badimg") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "noimg") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "opensection") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "servererror") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "outofwindow") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "noscale") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "badradius") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "resize") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "badprecision") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "fileload") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "drawnout") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "noangleatfillet") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "radoversize") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "nonconnectedfillet") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "badangulardim") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "badlineardim") {
    document.getElementById("erroralerttext").value = errorString;
    hideFirstDimAlert();
  }
  if (errorType == "badlineardim_first") {
    document.getElementById("erroralerttext").value = errorString;
    hideFirstDimAlert();
  }
  if (errorType == "noline") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "emptyradius") {
    document.getElementById("erroralerttext").value = errorString;
  }
  if (errorType == "anglenoendpoint") {
    document.getElementById("erroralerttext").value = errorString;
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

function displayClearAlert() {
  document.getElementById("clearalert").style.visibility = "visible";
  document.getElementById("cleargrab").style.visibility = "visible";
  document.getElementById("clearokbtn").style.visibility = "visible";
  document.getElementById("clearcancelbtn").style.visibility = "visible";
  document.getElementById("clearheader").style.visibility = "visible";
  document.getElementById("clearalerttext").style.visibility = "visible";
  document.getElementById("smokescreen").style.visibility = "visible";

  InputFreze = true;
}

function displayFirstDimAlert() {
  document.getElementById("firstdimalert").style.visibility = "visible";
  document.getElementById("firstdimgrab").style.visibility = "visible";
  document.getElementById("firstdimokbtn").style.visibility = "visible";
  document.getElementById("firstdimcancelbtn").style.visibility = "visible";
  document.getElementById("firstdimhelpbtn").style.visibility = "visible";
  document.getElementById("firstdimheader").style.visibility = "visible";
  document.getElementById("firstdimalerttext").style.visibility = "visible";
  document.getElementById("smokescreen").style.visibility = "visible";
  document.getElementById("firstinput").style.visibility = "visible";

  document.getElementById("firstinput").focus();
  document.getElementById("firstinput").select;

  PrintToLog("First Dim Alert Displayed");
  InputFreze = true;
}

function hideFirstDimAlert() {
  document.getElementById("firstdimalert").style.visibility = "hidden";
  document.getElementById("firstdimgrab").style.visibility = "hidden";
  document.getElementById("firstdimokbtn").style.visibility = "hidden";
  document.getElementById("firstdimcancelbtn").style.visibility = "hidden";
  document.getElementById("firstdimhelpbtn").style.visibility = "hidden";
  document.getElementById("firstdimheader").style.visibility = "hidden";
  document.getElementById("firstdimalerttext").style.visibility = "hidden";
  document.getElementById("smokescreen").style.visibility = "hidden";
  document.getElementById("firstinput").style.visibility = "hidden";

  document.getElementById("firstinput").value = "";

  InputFreze = false;

  Redraw();
}

function clearokClicked() {
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
  MasterCx = 0;
  MasterCy = 0;

  Scale = 0;
  firstAcceptedValue = true;
  ElementID = 0;
  connectedPointsArray = [];
  userMoves = [];
  redoMove = [];
  undoFilletArray = [];
  ClearStressVis();
  Button2Clicked();

  imageObj.src = "whitepix.PNG";
  whiteBackground = true;

  imgWidth = c.canvas.width;
  imgHeight = c.canvas.height;

  ImageShown = false;

  Redraw();

  document.getElementById("clearalert").style.visibility = "hidden";
  document.getElementById("cleargrab").style.visibility = "hidden";
  document.getElementById("clearokbtn").style.visibility = "hidden";
  document.getElementById("clearcancelbtn").style.visibility = "hidden";
  document.getElementById("clearheader").style.visibility = "hidden";
  document.getElementById("clearalerttext").style.visibility = "hidden";

  document.getElementById("tod").style.visibility = "visible";
  document.getElementById("todgrab").style.visibility = "visible";
  document.getElementById("todheader").style.visibility = "visible";
  document.getElementById("todcancel").style.visibility = "visible";
  document.getElementById("todtxt").style.visibility = "visible";
  document.getElementById("custom-file-upload_a").style.visibility = "visible";

  PrintToLog("Clear Ok Clicked");
}

function clearcancelClicked() {
  document.getElementById("clearalert").style.visibility = "hidden";
  document.getElementById("cleargrab").style.visibility = "hidden";
  document.getElementById("clearokbtn").style.visibility = "hidden";
  document.getElementById("clearcancelbtn").style.visibility = "hidden";
  document.getElementById("clearheader").style.visibility = "hidden";
  document.getElementById("clearalerttext").style.visibility = "hidden";
  document.getElementById("smokescreen").style.visibility = "hidden";

  PrintToLog("Clear Cancel Clicked");

  InputFreze = false;
}

function displayPreAlert() {
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

function displayUnitsAlert() {
  PrintToLog("Units Clicked");

  document.getElementById("unitsalert").style.visibility = "visible";
  document.getElementById("unitsgrab").style.visibility = "visible";
  document.getElementById("unitsokbtn").style.visibility = "visible";
  document.getElementById("unitsxbtn").style.visibility = "visible";
  document.getElementById("unitscancelbtn").style.visibility = "visible";
  document.getElementById("unitsheader").style.visibility = "visible";
  document.getElementById("unitsalerttext").style.visibility = "visible";
  document.getElementById("smokescreen").style.visibility = "visible";

  document.getElementById("inputBox").blur();

  InputFreze = true;
}

function highlightButtonImg(classname) {
  if (document.getElementById(classname).className == "linesbtn") {
    document.getElementById("linesb").className = "linesbtnactive";
    document.getElementById("dimanglesb").className = "dimanglesbtn";
    document.getElementById("snipb").className = "snipbtn";
  } else if (document.getElementById(classname).className == "filletsbtn") {
    document.getElementById("linesb").className = "linesbtn";
    document.getElementById("dimanglesb").className = "dimanglesbtn";
    document.getElementById("snipb").className = "snipbtn";
  } else if (document.getElementById(classname).className == "constlinesbtn") {
    document.getElementById("linesb").className = "linesbtn";
    document.getElementById("dimanglesb").className = "dimanglesbtn";
    document.getElementById("snipb").className = "snipbtn";
  } else if (document.getElementById(classname).className == "dimlinesbtn") {
    document.getElementById("linesb").className = "linesbtn";
    document.getElementById("dimanglesb").className = "dimanglesbtn";
    document.getElementById("snipb").className = "snipbtn";
  } else if (document.getElementById(classname).className == "dimanglesbtn") {
    document.getElementById("linesb").className = "linesbtn";
    document.getElementById("dimanglesb").className = "dimanglesbtnactive";
    document.getElementById("snipb").className = "snipbtn";
  } else if (document.getElementById(classname).className == "snipbtn") {
    document.getElementById("linesb").className = "linesbtn";
    document.getElementById("dimanglesb").className = "dimanglesbtn";
    document.getElementById("snipb").className = "snipbtnactive";
  } else if (document.getElementById(classname).className == "erasebtn") {
    document.getElementById("linesb").className = "linesbtn";
    document.getElementById("dimanglesb").className = "dimanglesbtn";
    document.getElementById("snipb").className = "snipbtn";
  } else if (document.getElementById(classname).className == "srpbtn") {
    document.getElementById("linesb").className = "linesbtn";
    document.getElementById("dimanglesb").className = "dimanglesbtn";
    document.getElementById("snipb").className = "snipbtn";
  }
}

function deselectButtons() {
  document.getElementById("linesb").className = "linesbtn";
  document.getElementById("dimanglesb").className = "dimanglesbtn";
  document.getElementById("snipb").className = "snipbtn";
}

function Button6Clicked() {
  removeZeroLengthLines();
  var iscloseOrOpenSection = closeOrOpenSection();
  if (iscloseOrOpenSection == true) {
    SendShape();
    document.getElementById("loader").style.visibility = "visible";
    bottomLeftPoint();
    UtilityPointDraw(displayProperties);
    StressGradientShown = true;
  } else {
    circleNonConnectedEndpoints();
  }
}

function Button8Clicked() {
  displayPreAlert();
  Redraw();
}

function buyproclicked() {
  window.open("https://www.visualcalcs.com/pricing");
}

function Button9Clicked() {
  window.open("https://www.visualcalcs.com/AreaSupport/#Video");
  PrintToLog("Help Clicked");
}

function feedbackClicked() {
  window.open("https://www.visualcalcs.com/contact");
}

function resultsHelpClicked() {
  window.open("https://www.visualcalcs.com/Areasupport/#Results");
}

function firstdimHelpClicked() {
  window.open("https://www.visualcalcs.com/Areasupport/#Video");
}

function errorHelpClicked() {
  window.open("https://www.visualcalcs.com/Areasupport/#Alert");
}

function clearHelpClicked() {
  window.open("https://www.visualcalcs.com/support/#Inter");
}

function preHelpClicked() {
  window.open("https://www.visualcalcs.com/Areasupport/#Inter");
}

function unitsHelpClicked() {
  window.open("https://www.visualcalcs.com/Areasupport/#Inter");
}

document.addEventListener("contextmenu", (event) => event.preventDefault());

window.onbeforeunload = confirmExit;
function confirmExit() {
  return "Exit Page?";
}

window.addEventListener("scroll", function (event) {
  var top = window.pageYOffset || document.documentElement.scrollTop,
    left = window.pageXOffset || document.documentElement.scrollLeft;

  var bottom = top + window.innerHeight;
  var right = left + window.innerWidth;

  if (window.innerHeight <= canvas.height + 100) {
    CsysY = bottom - 175;
  } else {
    CsysY = canvas.height - 25;
  }
  if (window.innerWidth <= canvas.width) {
    CsysX = right - 75;
  } else {
    CsysX = canvas.width - 50;
  }

  Redraw();
});

function circleNonConnectedEndpoints() {
  unConnectedLinesArray = [];
  var tolerance = 0.00001;
  var numberOfunConnected = 0;

  for (var i = 0; i < lineArray.length; i++) {
    if (lineArray[i].constLine != true) {
      var startConnected = false;
      var endConnected = false;
      for (var j = 0; j < connectedPointsArray.length; j++) {
        if (
          Tol(connectedPointsArray[j][0], lineArray[i].startx, tolerance) &&
          Tol(connectedPointsArray[j][1], lineArray[i].starty, tolerance)
        ) {
          startConnected = true;
        }
        if (
          Tol(connectedPointsArray[j][0], lineArray[i].endx, tolerance) &&
          Tol(connectedPointsArray[j][1], lineArray[i].endy, tolerance)
        ) {
          endConnected = true;
        }
      }

      if (startConnected == false) {
        unConnectedLinesArray.push([
          [lineArray[i].startx],
          [lineArray[i].starty],
        ]);
        numberOfunConnected += 1;
      }

      if (endConnected == false) {
        unConnectedLinesArray.push([[lineArray[i].endx], [lineArray[i].endy]]);
        numberOfunConnected += 1;
      }
    }
  }

  for (var i = 0; i < arcArray.length; i++) {
    var l2 = arcArray[i];
    var startConnected = false;
    var endConnected = false;
    for (var j = 0; j < connectedPointsArray.length; j++) {
      if (
        Tol(connectedPointsArray[j][0], l2.endpoint1x, tolerance) &&
        Tol(connectedPointsArray[j][1], l2.endpoint1y, tolerance)
      ) {
        startConnected = true;
      }
      if (
        Tol(connectedPointsArray[j][0], l2.endpoint2x, tolerance) &&
        Tol(connectedPointsArray[j][1], l2.endpoint2y, tolerance)
      ) {
        endConnected = true;
      }
    }

    if (startConnected == false) {
      unConnectedLinesArray.push([[l2.endpoint1x], [l2.endpoint1y]]);
      numberOfunConnected += 1;
    }

    if (endConnected == false) {
      unConnectedLinesArray.push([[l2.endpoint2x], [l2.endpoint2y]]);
      numberOfunConnected += 1;
    }
  }

  Redraw();

  if (numberOfunConnected == 0) {
    var alertString =
      "Invalid section - it appears that you tried to calculate section properties before drawing anything!";
  } else {
    var alertString =
      "Invalid Section - please correct " +
      numberOfunConnected +
      " unconnected endpoints circled in red.";
  }

  displayError("opensection", alertString);
}

function unloadScrollBars() {
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
}

window.addEventListener("resize", function (event) {
  if (ListenForResize == true) {
    document.getElementById("loader").style.visibility = "hidden";
    displayError("resize", "Analysis cancelled due to resized window!");
    CancelledRequest = true;
    ListenForResize = false;
    InputFreze = false;
    showZeroZero = false;
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
    ClearStressVis();
  } else {
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
  }

  if (whiteBackground == true) {
    imgHeight = c.canvas.height;
    imgWidth = c.canvas.width;
  }

  Redraw();
});

function resetChangeTag() {
  for (var i = 0; i < linearDimArray.length; i++) {
    d = linearDimArray[i];
    d.selectForChange = false;
  }

  for (var i = 0; i < AngularDimArray.length; i++) {
    d = AngularDimArray[i];
    d.selectForChange = false;
  }

  for (var i = 0; i < relAngleArray.length; i++) {
    d = relAngleArray[i];
    d.selectForChange = false;
  }
}

function activeChangeTag() {
  var changeTag = false;

  for (var i = 0; i < linearDimArray.length; i++) {
    d = linearDimArray[i];
    if (d.selectForChange == true) {
      changeTag = true;
    }
  }

  for (var i = 0; i < AngularDimArray.length; i++) {
    d = AngularDimArray[i];
    if (d.selectForChange == true) {
      changeTag = true;
    }
  }
  for (var i = 0; i < relAngleArray.length; i++) {
    d = relAngleArray[i];
    if (d.selectForChange == true) {
      changeTag = true;
    }
  }

  return changeTag;
}

function UndoOneStep() {
  ClearStressVis();

  if (userMoves.length > 0) {
    lastMove = userMoves[userMoves.length - 1];

    var errorstringtoprint = "Undoing  " + lastMove[0][0];
    PrintToLog(errorstringtoprint);

    if (lastMove[0][0] == "newline") {
      deleteline(lastMove[0][1], true);
    } else if (lastMove[0][0] == "moveep" || lastMove[0][0] == "moveline") {
      for (var i = 0; i < lastMove[0][1].length; i++) {
        for (var k = 0; k < lineArray.length; k++) {
          if (lineArray[k].lineID == lastMove[0][1][i].lineID) {
            var lineToSplice = new Line(
              lastMove[0][1][i].startx,
              lastMove[0][1][i].starty,
              lastMove[0][1][i].endx,
              lastMove[0][1][i].endy,
              lastMove[0][1][i].dim,
              lastMove[0][1][i].lineID,
              lastMove[0][1][i].lineLength,
              lastMove[0][1][i].constLine,
              lastMove[0][1][i].angle,
              lastMove[0][1][i].startxghost,
              lastMove[0][1][i].startyghost,
              lastMove[0][1][i].endxghost,
              lastMove[0][1][i].endyghost,
              lastMove[0][1][i].midpointX,
              lastMove[0][1][i].midpointY
            );
            lineArray.splice(k, 1, lineToSplice);
            updateLinearDimension(lineToSplice.lineID);
          }
        }
      }
    } else if (lastMove[0][0] == "newfillet") {
      for (var k = 0; k < lineArray.length; k++) {
        if (lineArray[k].lineID == lastMove[0][2].lineID) {
          var lineToSplice = new Line(
            lastMove[0][2].startx,
            lastMove[0][2].starty,
            lastMove[0][2].endx,
            lastMove[0][2].endy,
            lastMove[0][2].dim,
            lastMove[0][2].lineID,
            lastMove[0][2].lineLength,
            lastMove[0][2].constLine,
            lastMove[0][2].angle,
            lastMove[0][2].startxghost,
            lastMove[0][2].startyghost,
            lastMove[0][2].endxghost,
            lastMove[0][2].endyghost,
            lastMove[0][2].midpointX,
            lastMove[0][2].midpointY
          );
          lineArray.splice(k, 1, lineToSplice);
          updateLinearDimension(lineToSplice.lineID);
        } else if (lineArray[k].lineID == lastMove[0][3].lineID) {
          var lineToSplice = new Line(
            lastMove[0][3].startx,
            lastMove[0][3].starty,
            lastMove[0][3].endx,
            lastMove[0][3].endy,
            lastMove[0][3].dim,
            lastMove[0][3].lineID,
            lastMove[0][3].lineLength,
            lastMove[0][3].constLine,
            lastMove[0][3].angle,
            lastMove[0][3].startxghost,
            lastMove[0][3].startyghost,
            lastMove[0][3].endxghost,
            lastMove[0][3].endyghost,
            lastMove[0][3].midpointX,
            lastMove[0][3].midpointY
          );
          lineArray.splice(k, 1, lineToSplice);
          updateLinearDimension(lineToSplice.lineID);
        }
      }
    } else if (lastMove[0][0] == "deleteline") {
      var lineToPush = new Line(
        lastMove[0][1].startx,
        lastMove[0][1].starty,
        lastMove[0][1].endx,
        lastMove[0][1].endy,
        lastMove[0][1].dim,
        lastMove[0][1].lineID,
        lastMove[0][1].lineLength,
        lastMove[0][1].constLine,
        lastMove[0][1].angle,
        lastMove[0][1].startxghost,
        lastMove[0][1].startyghost,
        lastMove[0][1].endxghost,
        lastMove[0][1].endyghost,
        lastMove[0][1].midpointX,
        lastMove[0][1].midpointY
      );
      lineArray.push(lineToPush);

      linearDimArray.push(
        new LinearDimension(
          lastMove[0][2].value,
          lastMove[0][2].x,
          lastMove[0][2].y,
          lastMove[0][2].elementID,
          lastMove[0][2].showDim,
          lastMove[0][2].startx,
          lastMove[0][2].starty,
          lastMove[0][2].endx,
          lastMove[0][2].endy,
          lastMove[0][2].orientation,
          lastMove[0][2].startx1,
          lastMove[0][2].starty1,
          lastMove[0][2].endx1,
          lastMove[0][2].endy1,
          lastMove[0][2].startx2,
          lastMove[0][2].starty2,
          lastMove[0][2].endx2,
          lastMove[0][2].endy2,
          lastMove[0][2].type,
          lastMove[0][2].angle,
          lastMove[0][2].xoffset1,
          lastMove[0][2].yoffset1,
          lastMove[0][2].xoffset2,
          lastMove[0][2].yoffset2,
          lastMove[0][2].perpOffset
        )
      );

      AngularDimArray.push(
        new AngularDimension(
          lastMove[0][3].value,
          lastMove[0][3].x,
          lastMove[0][3].y,
          lastMove[0][3].elementID,
          lastMove[0][3].showDim,
          lastMove[0][3].startx,
          lastMove[0][3].starty
        )
      );
    } else if (lastMove[0][0] == "deletefillet") {
      arcArray.push(
        new Arc(
          lastMove[0][1].centroidx,
          lastMove[0][1].centroidy,
          lastMove[0][1].radius,
          lastMove[0][1].radstart,
          lastMove[0][1].radend,
          lastMove[0][1].arcID,
          lastMove[0][1].Case,
          lastMove[0][1].fx,
          lastMove[0][1].fy,
          lastMove[0][1].groupID,
          lastMove[0][1].color,
          lastMove[0][1].endpoint1x,
          lastMove[0][1].endpoint1y,
          lastMove[0][1].endpoint2x,
          lastMove[0][1].endpoint2y,
          lastMove[0][1].line1ID,
          lastMove[0][1].line2ID
        )
      );

      linearDimArray.push(
        new LinearDimension(
          lastMove[0][2].value,
          lastMove[0][2].x,
          lastMove[0][2].y,
          lastMove[0][2].elementID,
          lastMove[0][2].showDim,
          lastMove[0][2].startx,
          lastMove[0][2].starty,
          lastMove[0][2].endx,
          lastMove[0][2].endy,
          lastMove[0][2].orientation,
          lastMove[0][2].startx1,
          lastMove[0][2].starty1,
          lastMove[0][2].endx1,
          lastMove[0][2].endy1,
          lastMove[0][2].startx2,
          lastMove[0][2].starty2,
          lastMove[0][2].endx2,
          lastMove[0][2].endy2,
          lastMove[0][2].type,
          lastMove[0][2].angle,
          lastMove[0][2].xoffset1,
          lastMove[0][2].yoffset1,
          lastMove[0][2].xoffset2,
          lastMove[0][2].yoffset2,
          lastMove[0][2].perpOffset
        )
      );

      if (lastMove[0][3] != null) {
        deleteline(lastMove[0][3].lineID, true, true);

        var lineToPush = new Line(
          lastMove[0][3].startx,
          lastMove[0][3].starty,
          lastMove[0][3].endx,
          lastMove[0][3].endy,
          lastMove[0][3].dim,
          lastMove[0][3].lineID,
          lastMove[0][3].lineLength,
          lastMove[0][3].constLine,
          lastMove[0][3].angle,
          lastMove[0][3].startxghost,
          lastMove[0][3].startyghost,
          lastMove[0][3].endxghost,
          lastMove[0][3].endyghost,
          lastMove[0][3].midpointX,
          lastMove[0][3].midpointY
        );
        lineArray.push(lineToPush);

        linearDimArray.push(
          new LinearDimension(
            lastMove[0][5].value,
            lastMove[0][5].x,
            lastMove[0][5].y,
            lastMove[0][5].elementID,
            lastMove[0][5].showDim,
            lastMove[0][5].startx,
            lastMove[0][5].starty,
            lastMove[0][5].endx,
            lastMove[0][5].endy,
            lastMove[0][5].orientation,
            lastMove[0][5].startx1,
            lastMove[0][5].starty1,
            lastMove[0][5].endx1,
            lastMove[0][5].endy1,
            lastMove[0][5].startx2,
            lastMove[0][5].starty2,
            lastMove[0][5].endx2,
            lastMove[0][5].endy2,
            lastMove[0][5].type,
            lastMove[0][5].angle,
            lastMove[0][5].xoffset1,
            lastMove[0][5].yoffset1,
            lastMove[0][5].xoffset2,
            lastMove[0][5].yoffset2,
            lastMove[0][5].perpOffset
          )
        );

        AngularDimArray.push(
          new AngularDimension(
            lastMove[0][7].value,
            lastMove[0][7].x,
            lastMove[0][7].y,
            lastMove[0][7].elementID,
            lastMove[0][7].showDim,
            lastMove[0][7].startx,
            lastMove[0][7].starty
          )
        );
      }
      if (lastMove[0][4] != null) {
        deleteline(lastMove[0][4].lineID, true, true);

        lineToPush = new Line(
          lastMove[0][4].startx,
          lastMove[0][4].starty,
          lastMove[0][4].endx,
          lastMove[0][4].endy,
          lastMove[0][4].dim,
          lastMove[0][4].lineID,
          lastMove[0][4].lineLength,
          lastMove[0][4].constLine,
          lastMove[0][4].angle,
          lastMove[0][4].startxghost,
          lastMove[0][4].startyghost,
          lastMove[0][4].endxghost,
          lastMove[0][4].endyghost,
          lastMove[0][4].midpointX,
          lastMove[0][4].midpointY
        );
        lineArray.push(lineToPush);

        linearDimArray.push(
          new LinearDimension(
            lastMove[0][6].value,
            lastMove[0][6].x,
            lastMove[0][6].y,
            lastMove[0][6].elementID,
            lastMove[0][6].showDim,
            lastMove[0][6].startx,
            lastMove[0][6].starty,
            lastMove[0][6].endx,
            lastMove[0][6].endy,
            lastMove[0][6].orientation,
            lastMove[0][6].startx1,
            lastMove[0][6].starty1,
            lastMove[0][6].endx1,
            lastMove[0][6].endy1,
            lastMove[0][6].startx2,
            lastMove[0][6].starty2,
            lastMove[0][6].endx2,
            lastMove[0][6].endy2,
            lastMove[0][6].type,
            lastMove[0][6].angle,
            lastMove[0][6].xoffset1,
            lastMove[0][6].yoffset1,
            lastMove[0][6].xoffset2,
            lastMove[0][6].yoffset2,
            lastMove[0][6].perpOffset
          )
        );

        AngularDimArray.push(
          new AngularDimension(
            lastMove[0][8].value,
            lastMove[0][8].x,
            lastMove[0][8].y,
            lastMove[0][8].elementID,
            lastMove[0][8].showDim,
            lastMove[0][8].startx,
            lastMove[0][8].starty
          )
        );
      }
    } else if (lastMove[0][0] == "snipline") {
      var lineToPush = new Line(
        lastMove[0][1].startx,
        lastMove[0][1].starty,
        lastMove[0][1].endx,
        lastMove[0][1].endy,
        lastMove[0][1].dim,
        lastMove[0][1].lineID,
        lastMove[0][1].lineLength,
        lastMove[0][1].constLine,
        lastMove[0][1].angle,
        lastMove[0][1].startxghost,
        lastMove[0][1].startyghost,
        lastMove[0][1].endxghost,
        lastMove[0][1].endyghost,
        lastMove[0][1].midpointX,
        lastMove[0][1].midpointY
      );

      deleteline(lastMove[0][4], true);
      deleteline(lastMove[0][1].lineID, true);
      lineArray.push(lineToPush);

      linearDimArray.push(
        new LinearDimension(
          lastMove[0][2].value,
          lastMove[0][2].x,
          lastMove[0][2].y,
          lastMove[0][2].elementID,
          lastMove[0][2].showDim,
          lastMove[0][2].startx,
          lastMove[0][2].starty,
          lastMove[0][2].endx,
          lastMove[0][2].endy,
          lastMove[0][2].orientation,
          lastMove[0][2].startx1,
          lastMove[0][2].starty1,
          lastMove[0][2].endx1,
          lastMove[0][2].endy1,
          lastMove[0][2].startx2,
          lastMove[0][2].starty2,
          lastMove[0][2].endx2,
          lastMove[0][2].endy2,
          lastMove[0][2].type,
          lastMove[0][2].angle,
          lastMove[0][2].xoffset1,
          lastMove[0][2].yoffset1,
          lastMove[0][2].xoffset2,
          lastMove[0][2].yoffset2,
          lastMove[0][2].perpOffset
        )
      );

      AngularDimArray.push(
        new AngularDimension(
          lastMove[0][3].value,
          lastMove[0][3].x,
          lastMove[0][3].y,
          lastMove[0][3].elementID,
          lastMove[0][3].showDim,
          lastMove[0][3].startx,
          lastMove[0][3].starty
        )
      );
    } else if (lastMove[0][0] == "snipfillet") {
      arcArray.push(
        new Arc(
          lastMove[0][1].centroidx,
          lastMove[0][1].centroidy,
          lastMove[0][1].radius,
          lastMove[0][1].radstart,
          lastMove[0][1].radend,
          lastMove[0][1].arcID,
          lastMove[0][1].Case,
          lastMove[0][1].fx,
          lastMove[0][1].fy,
          lastMove[0][1].groupID,
          lastMove[0][1].color,
          lastMove[0][1].endpoint1x,
          lastMove[0][1].endpoint1y,
          lastMove[0][1].endpoint2x,
          lastMove[0][1].endpoint2y,
          lastMove[0][1].line1ID,
          lastMove[0][1].line2ID
        )
      );

      linearDimArray.push(
        new LinearDimension(
          lastMove[0][4].value,
          lastMove[0][4].x,
          lastMove[0][4].y,
          lastMove[0][4].elementID,
          lastMove[0][4].showDim,
          lastMove[0][4].startx,
          lastMove[0][4].starty,
          lastMove[0][4].endx,
          lastMove[0][4].endy,
          lastMove[0][4].orientation,
          lastMove[0][4].startx1,
          lastMove[0][4].starty1,
          lastMove[0][4].endx1,
          lastMove[0][4].endy1,
          lastMove[0][4].startx2,
          lastMove[0][4].starty2,
          lastMove[0][4].endx2,
          lastMove[0][4].endy2,
          lastMove[0][4].type,
          lastMove[0][4].angle,
          lastMove[0][4].xoffset1,
          lastMove[0][4].yoffset1,
          lastMove[0][4].xoffset2,
          lastMove[0][4].yoffset2,
          lastMove[0][4].perpOffset
        )
      );
    } else if (lastMove[0][0] == "movedim") {
      moveDim(lastMove[0][3], lastMove[0][4], lastMove[0][1], lastMove[0][2]);
    } else if (lastMove[0][0] == "hsdim") {
      if (lastMove[0][2] == "linear") {
        for (var k = 0; k < linearDimArray.length; k++) {
          if (linearDimArray[k].elementID == lastMove[0][1]) {
            linearDimArray[k].showDim = lastMove[0][3];
          }
        }
      } else if (lastMove[0][2] == "angular") {
        for (var k = 0; k < AngularDimArray.length; k++) {
          if (AngularDimArray[k].elementID == lastMove[0][1]) {
            AngularDimArray[k].showDim = lastMove[0][3];
          }
        }
      }
    } else if (lastMove[0][0] == "movedhandle") {
      moveHandle(lastMove[0][2], lastMove[0][3], "nonabsolute", lastMove[0][1]);
    } else if (lastMove[0][0] == "changedim") {
      deleteline(lastMove[0][1].lineID, true);
      var lineToPush = new Line(
        lastMove[0][1].startx,
        lastMove[0][1].starty,
        lastMove[0][1].endx,
        lastMove[0][1].endy,
        lastMove[0][1].dim,
        lastMove[0][1].lineID,
        lastMove[0][1].lineLength,
        lastMove[0][1].constLine,
        lastMove[0][1].angle,
        lastMove[0][1].startxghost,
        lastMove[0][1].startyghost,
        lastMove[0][1].endxghost,
        lastMove[0][1].endyghost,
        lastMove[0][1].midpointX,
        lastMove[0][1].midpointY
      );
      lineArray.push(lineToPush);

      linearDimArray.push(
        new LinearDimension(
          lastMove[0][2].value,
          lastMove[0][2].x,
          lastMove[0][2].y,
          lastMove[0][2].elementID,
          lastMove[0][2].showDim,
          lastMove[0][2].startx,
          lastMove[0][2].starty,
          lastMove[0][2].endx,
          lastMove[0][2].endy,
          lastMove[0][2].orientation,
          lastMove[0][2].startx1,
          lastMove[0][2].starty1,
          lastMove[0][2].endx1,
          lastMove[0][2].endy1,
          lastMove[0][2].startx2,
          lastMove[0][2].starty2,
          lastMove[0][2].endx2,
          lastMove[0][2].endy2,
          lastMove[0][2].type,
          lastMove[0][2].angle,
          lastMove[0][2].xoffset1,
          lastMove[0][2].yoffset1,
          lastMove[0][2].xoffset2,
          lastMove[0][2].yoffset2,
          lastMove[0][2].perpOffset
        )
      );

      AngularDimArray.push(
        new AngularDimension(
          lastMove[0][3].value,
          lastMove[0][3].x,
          lastMove[0][3].y,
          lastMove[0][3].elementID,
          lastMove[0][3].showDim,
          lastMove[0][3].startx,
          lastMove[0][3].starty
        )
      );
    } else if (lastMove[0][0] == "newreldim") {
      deletedim(lastMove[0][1]);
    } else if (lastMove[0][0] == "deletereldim") {
      relAngleArray.push(
        new AngleRelDimension(
          lastMove[0][1].value,
          lastMove[0][1].x,
          lastMove[0][1].y,
          lastMove[0][1].elementID,
          lastMove[0][1].showDim,
          lastMove[0][1].radstart,
          lastMove[0][1].radend,
          lastMove[0][1].centroidx,
          lastMove[0][1].centroidy,
          lastMove[0][1].radius,
          lastMove[0][1].line1ID,
          lastMove[0][1].line2ID,
          lastMove[0][1].direction,
          lastMove[0][1].handlex,
          lastMove[0][1].handley,
          lastMove[0][1].changemarkerx,
          lastMove[0][1].changemarkery,
          lastMove[0][1].displayFlippedArc
        )
      );
    } else if (lastMove[0][0] == "changerelangledim") {
      deleteline(lastMove[0][1].lineID, true);

      var lineToPush = new Line(
        lastMove[0][1].startx,
        lastMove[0][1].starty,
        lastMove[0][1].endx,
        lastMove[0][1].endy,
        lastMove[0][1].dim,
        lastMove[0][1].lineID,
        lastMove[0][1].lineLength,
        lastMove[0][1].constLine,
        lastMove[0][1].angle,
        lastMove[0][1].startxghost,
        lastMove[0][1].startyghost,
        lastMove[0][1].endxghost,
        lastMove[0][1].endyghost,
        lastMove[0][1].midpointX,
        lastMove[0][1].midpointY
      );
      lineArray.push(lineToPush);

      linearDimArray.push(
        new LinearDimension(
          lastMove[0][2].value,
          lastMove[0][2].x,
          lastMove[0][2].y,
          lastMove[0][2].elementID,
          lastMove[0][2].showDim,
          lastMove[0][2].startx,
          lastMove[0][2].starty,
          lastMove[0][2].endx,
          lastMove[0][2].endy,
          lastMove[0][2].orientation,
          lastMove[0][2].startx1,
          lastMove[0][2].starty1,
          lastMove[0][2].endx1,
          lastMove[0][2].endy1,
          lastMove[0][2].startx2,
          lastMove[0][2].starty2,
          lastMove[0][2].endx2,
          lastMove[0][2].endy2,
          lastMove[0][2].type,
          lastMove[0][2].angle,
          lastMove[0][2].xoffset1,
          lastMove[0][2].yoffset1,
          lastMove[0][2].xoffset2,
          lastMove[0][2].yoffset2,
          lastMove[0][2].perpOffset
        )
      );

      AngularDimArray.push(
        new AngularDimension(
          lastMove[0][3].value,
          lastMove[0][3].x,
          lastMove[0][3].y,
          lastMove[0][3].elementID,
          lastMove[0][3].showDim,
          lastMove[0][3].startx,
          lastMove[0][3].starty
        )
      );

      deletedim(lastMove[0][4].elementID);

      relAngleArray.push(
        new AngleRelDimension(
          lastMove[0][4].value,
          lastMove[0][4].x,
          lastMove[0][4].y,
          lastMove[0][4].elementID,
          lastMove[0][4].showDim,
          lastMove[0][4].radstart,
          lastMove[0][4].radend,
          lastMove[0][4].centroidx,
          lastMove[0][4].centroidy,
          lastMove[0][4].radius,
          lastMove[0][4].line1ID,
          lastMove[0][4].line2ID,
          lastMove[0][4].direction,
          lastMove[0][4].handlex,
          lastMove[0][4].handley,
          lastMove[0][4].changemarkerx,
          lastMove[0][4].changemarkery,
          lastMove[0][4].displayFlippedArc
        )
      );
    } else if (lastMove[0][0] == "changefilletradius") {
      //deletefillet(lastMove[0][1], true);

      deleteline(lastMove[0][2].lineID, true);

      deleteline(lastMove[0][3].lineID, true);

      var lindex = 2;
      var lineToPush = new Line(
        lastMove[0][lindex].startx,
        lastMove[0][lindex].starty,
        lastMove[0][lindex].endx,
        lastMove[0][lindex].endy,
        lastMove[0][lindex].dim,
        lastMove[0][lindex].lineID,
        lastMove[0][lindex].lineLength,
        lastMove[0][lindex].constLine,
        lastMove[0][lindex].angle,
        lastMove[0][lindex].startxghost,
        lastMove[0][lindex].startyghost,
        lastMove[0][lindex].endxghost,
        lastMove[0][lindex].endyghost,
        lastMove[0][lindex].midpointX,
        lastMove[0][lindex].midpointY
      );
      lineArray.push(lineToPush);

      lindex = 3;
      var lineToPush = new Line(
        lastMove[0][lindex].startx,
        lastMove[0][lindex].starty,
        lastMove[0][lindex].endx,
        lastMove[0][lindex].endy,
        lastMove[0][lindex].dim,
        lastMove[0][lindex].lineID,
        lastMove[0][lindex].lineLength,
        lastMove[0][lindex].constLine,
        lastMove[0][lindex].angle,
        lastMove[0][lindex].startxghost,
        lastMove[0][lindex].startyghost,
        lastMove[0][lindex].endxghost,
        lastMove[0][lindex].endyghost,
        lastMove[0][lindex].midpointX,
        lastMove[0][lindex].midpointY
      );
      lineArray.push(lineToPush);

      arcArray.push(
        new Arc(
          lastMove[0][4].centroidx,
          lastMove[0][4].centroidy,
          lastMove[0][4].radius,
          lastMove[0][4].radstart,
          lastMove[0][4].radend,
          lastMove[0][4].arcID,
          lastMove[0][4].Case,
          lastMove[0][4].fx,
          lastMove[0][4].fy,
          lastMove[0][4].groupID,
          lastMove[0][4].color,
          lastMove[0][4].endpoint1x,
          lastMove[0][4].endpoint1y,
          lastMove[0][4].endpoint2x,
          lastMove[0][4].endpoint2y,
          lastMove[0][4].line1ID,
          lastMove[0][4].line2ID
        )
      );

      var ldindex = 5;
      linearDimArray.push(
        new LinearDimension(
          lastMove[0][ldindex].value,
          lastMove[0][ldindex].x,
          lastMove[0][ldindex].y,
          lastMove[0][ldindex].elementID,
          lastMove[0][ldindex].showDim,
          lastMove[0][ldindex].startx,
          lastMove[0][ldindex].starty,
          lastMove[0][ldindex].endx,
          lastMove[0][ldindex].endy,
          lastMove[0][ldindex].orientation,
          lastMove[0][ldindex].startx1,
          lastMove[0][ldindex].starty1,
          lastMove[0][ldindex].endx1,
          lastMove[0][ldindex].endy1,
          lastMove[0][ldindex].startx2,
          lastMove[0][ldindex].starty2,
          lastMove[0][ldindex].endx2,
          lastMove[0][ldindex].endy2,
          lastMove[0][ldindex].type,
          lastMove[0][ldindex].angle,
          lastMove[0][ldindex].xoffset1,
          lastMove[0][ldindex].yoffset1,
          lastMove[0][ldindex].xoffset2,
          lastMove[0][ldindex].yoffset2,
          lastMove[0][ldindex].perpOffset
        )
      );

      ldindex = 6;
      linearDimArray.push(
        new LinearDimension(
          lastMove[0][ldindex].value,
          lastMove[0][ldindex].x,
          lastMove[0][ldindex].y,
          lastMove[0][ldindex].elementID,
          lastMove[0][ldindex].showDim,
          lastMove[0][ldindex].startx,
          lastMove[0][ldindex].starty,
          lastMove[0][ldindex].endx,
          lastMove[0][ldindex].endy,
          lastMove[0][ldindex].orientation,
          lastMove[0][ldindex].startx1,
          lastMove[0][ldindex].starty1,
          lastMove[0][ldindex].endx1,
          lastMove[0][ldindex].endy1,
          lastMove[0][ldindex].startx2,
          lastMove[0][ldindex].starty2,
          lastMove[0][ldindex].endx2,
          lastMove[0][ldindex].endy2,
          lastMove[0][ldindex].type,
          lastMove[0][ldindex].angle,
          lastMove[0][ldindex].xoffset1,
          lastMove[0][ldindex].yoffset1,
          lastMove[0][ldindex].xoffset2,
          lastMove[0][ldindex].yoffset2,
          lastMove[0][ldindex].perpOffset
        )
      );

      ldindex = 7;
      linearDimArray.push(
        new LinearDimension(
          lastMove[0][ldindex].value,
          lastMove[0][ldindex].x,
          lastMove[0][ldindex].y,
          lastMove[0][ldindex].elementID,
          lastMove[0][ldindex].showDim,
          lastMove[0][ldindex].startx,
          lastMove[0][ldindex].starty,
          lastMove[0][ldindex].endx,
          lastMove[0][ldindex].endy,
          lastMove[0][ldindex].orientation,
          lastMove[0][ldindex].startx1,
          lastMove[0][ldindex].starty1,
          lastMove[0][ldindex].endx1,
          lastMove[0][ldindex].endy1,
          lastMove[0][ldindex].startx2,
          lastMove[0][ldindex].starty2,
          lastMove[0][ldindex].endx2,
          lastMove[0][ldindex].endy2,
          lastMove[0][ldindex].type,
          lastMove[0][ldindex].angle,
          lastMove[0][ldindex].xoffset1,
          lastMove[0][ldindex].yoffset1,
          lastMove[0][ldindex].xoffset2,
          lastMove[0][ldindex].yoffset2,
          lastMove[0][ldindex].perpOffset
        )
      );

      AngularDimArray.push(
        new AngularDimension(
          lastMove[0][8].value,
          lastMove[0][8].x,
          lastMove[0][8].y,
          lastMove[0][8].elementID,
          lastMove[0][8].showDim,
          lastMove[0][8].startx,
          lastMove[0][8].starty
        )
      );

      AngularDimArray.push(
        new AngularDimension(
          lastMove[0][9].value,
          lastMove[0][9].x,
          lastMove[0][9].y,
          lastMove[0][9].elementID,
          lastMove[0][9].showDim,
          lastMove[0][9].startx,
          lastMove[0][9].starty
        )
      );
    }

    var dataToPush = JSON.parse(
      JSON.stringify(userMoves[userMoves.length - 1])
    );

    redoMoves.push(dataToPush);
    userMoves.pop([userMoves.length - 1]);
    closeOrOpenSection();
  }
}

window.addEventListener("mousemove", function (event) {
  if (InputFreze == false) {
    CanvasRect = canvas.getBoundingClientRect();

    mouse.x = event.clientX - CanvasRect.left;
    mouse.y = event.clientY - CanvasRect.top;

    snipcursor.style.transform = `translate(${mouse.x - 15}px, ${
      mouse.y - 15
    }px)`;

    erasecursor.style.transform = `translate(${mouse.x - 15}px, ${
      mouse.y - 15
    }px)`;

    if (mouseState == "down") {
      mouseState = "dragging";
    } else if (mouseState == "dragging") {
      mouseState == "dragging";
    } else {
      mouseState = "moving";
    }
    mainLoop();
  }
});

window.addEventListener("mousedown", function (event) {
  CanvasRect = canvas.getBoundingClientRect();

  mouse.x = event.clientX - CanvasRect.left;
  mouse.y = event.clientY - CanvasRect.top;

  if (InputFreze == false) {
    if (activeChangeTag() && document.getElementById("inputBox").value != "") {
      enterPressed();
    }
    mouseState = "down";
    mainLoop();
    resetChangeTag();
  }
});

window.addEventListener("mouseup", function (event) {
  CanvasRect = canvas.getBoundingClientRect();

  mouse.x = event.clientX - CanvasRect.left;
  mouse.y = event.clientY - CanvasRect.top;

  if (InputFreze == false) {
    mouseState = "up";
    mainLoop();
    if (Scale == 0) {
    }
  }
  Redraw();

  var currentmousex = mouse.x;
  var currentmousey = mouse.y;

  var mouseMoveEvent = document.createEvent("MouseEvents");

  mouseMoveEvent.initMouseEvent(
    "mousemove",
    true,
    false,
    window,
    1,
    currentmousex,
    currentmousey,
    currentmousex,
    currentmousey,
    false,
    false,
    false,
    false,
    1,
    null
  );

  document.dispatchEvent(mouseMoveEvent);
});

function touchHandler(event) {
  if (
    mouseInDrawingArea() == true &&
    document.getElementById("smokescreen").style.visibility == "hidden" &&
    mouseInRG() != true
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
  TouchMode = true;

  var touches = event.changedTouches,
    first = touches[0],
    type = "";

  switch (event.type) {
    case "touchstart":
      type = "mousedown";
      break;
    case "touchmove":
      type = "mousemove";
      break;
    case "touchend":
      type = "mouseup";
      break;
    default:
      return;
  }

  var simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent(
    type,
    true,
    true,
    window,
    1,
    first.screenX,
    first.screenY,
    first.clientX,
    first.clientY,
    false,
    false,
    false,
    false,
    0,
    null
  );

  first.target.dispatchEvent(simulatedEvent);
}

document.onkeyup = function (event) {
  if (InputFreze == false) {
    if (event.which == 76) {
      Button2Clicked();
    }
    if (event.which == 67) {
      ConstLinesClicked();
    }
    if (event.which == 70) {
      Button3Clicked();
    }
    if (event.which == 84) {
      SnipClicked();
    }
    if (event.which == 69) {
      EraseClicked();
    }
    if (event.which == 68) {
      DimLinesClicked();
    }
    if (event.which == 65) {
      DimAnglessClicked();
    }

    if (event.which == 17) {
      ControlDown = false;
    }

    var ret = document.getElementById("inputBox").value;
    if (isNaN(ret) == true && ret != ".") {
      ChangePreviewValue = null;
      document.getElementById("inputBox").value = "";
    } else {
      if (
        (event.which > 95 && event.which < 106) ||
        event.which == 8 ||
        event.which == 110 ||
        (event.which > 47 && event.which < 58) ||
        event.which == 190
      ) {
        ChangePreviewValue = ret;
      }
    }

    mainLoop();
    if (drawingMode != "fillets") {
      if (
        (event.which > 95 && event.which < 106) ||
        event.which == 8 ||
        event.which == 110 ||
        (event.which > 47 && event.which < 58) ||
        event.which == 190
      ) {
        if (ret != null && ret != "" && ret != ".") {
          if (String(ret).match(/\d/g).length > 10) {
            document.getElementById("inputBox").value = "";
            document.getElementById("inputBox").focus();
            document.getElementById("inputBox").select;
          }
        }
      }
    }
  }
};

window.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    enterPressed();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.keyCode == 90) {
    event.preventDefault();
    UndoOneStep();
  } else if (event.ctrlKey && event.keyCode == 82) {
    event.preventDefault();
    RedoOneStep();
  }
});

document.onkeydown = function (event) {
  if (event.which == 17) {
    ControlDown = true;
  }

  var ret = document.getElementById("inputBox").value;
  if (drawingMode != "fillets") {
    if (
      (event.which > 95 && event.which < 106) ||
      event.which == 8 ||
      event.which == 110 ||
      (event.which > 47 && event.which < 58) ||
      event.which == 190
    ) {
      if (ret != null && ret != "" && ret != ".") {
        if (String(ret).match(/\d/g).length > 10) {
          document.getElementById("inputBox").value = "";
          document.getElementById("inputBox").focus();
          document.getElementById("inputBox").select;
        }
      }
    }
  }
};

function exportToJsonFile(jsonData) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = "data.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

function UtilityPointDraw(callback) {
  PrintToLog("Analysis Initiated");

  ListenForResize = true;

  clearResults();

  var pCString = "";

  analysisID += 1;

  var PackagedArray = packageForPy(lineArray, arcArray);

  var PackagedArraytoSend = JSON.stringify(PackagedArray);

  var ourRequest = new XMLHttpRequest();

  if (inboundsCheck() == true) {
    FromRectsToPxs();

    document.getElementById("results").style.visibility = "visible";
    document.getElementById("resultsgrab").style.visibility = "visible";
    document.getElementById("outputpopuptext").style.visibility = "visible";
    document.getElementById("resultsheader").style.visibility = "visible";
    document.getElementById("resultskeepout").style.visibility = "visible";

    ourRequest.open("POST", "<API URL HERE>");
    ourRequest.setRequestHeader("Content-type", "text/plain");
    ourRequest.send(PackagedArraytoSend);

    ourRequest.addEventListener("readystatechange", checkConnection, false);

    function checkConnection() {
      if (ourRequest.readyState == 4) {
        if (ourRequest.status >= 200 && ourRequest.status < 304) {
          disconnectCancelledRequest = false;
        } else {
          displayError(
            "servererror",
            "Something is broken. Things to try:\n-Check your internet connection \n-Save your work and reload this page\n-Email support@visualcalcs.com"
          );
          document.getElementById("loader").style.visibility = "hidden";
          disconnectCancelledRequest = true;
          ListenForResize = false;
          InputFreze = false;
          showZeroZero = false;
        }
      }
    }
  } else {
    document.getElementById("loader").style.visibility = "hidden";
    displayError(
      "outofwindow",
      "Lines out of window. Resize window to include all lines and retry."
    );
    showZeroZero = false;
    CancelledRequest = false;
    InputFreze = false;
    ListenForResize = false;
    ClearStressVis();
  }

  ourRequest.onload = function () {
    if (
      CancelledRequest != true &&
      doNotFindArea != true &&
      disconnectCancelledRequest != true
    ) {
      rectString = ourRequest.responseText;

      if (rectString == "CreditsError" || rectString == "CreditsErrorfb") {
        CancelledRequest = false;
        InputFreze = false;
        ListenForResize = false;
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("results").style.visibility = "hidden";
        document.getElementById("resultsgrab").style.visibility = "hidden";
        document.getElementById("outputpopuptext").style.visibility = "hidden";
        document.getElementById("resultsheader").style.visibility = "hidden";
        document.getElementById("resultskeepout").style.visibility = "hidden";

        document.getElementById("smokescreen").style.visibility = "visible";
        document.getElementById("fob").style.visibility = "visible";
        document.getElementById("fobtxt").style.visibility = "visible";
        document.getElementById("fobgrab").style.visibility = "visible";
        document.getElementById("fobheader").style.visibility = "visible";
        document.getElementById("fobbuy").style.visibility = "visible";

        if (rectString == "CreditsError") {
          document.getElementById("fobfeedback").style.visibility = "visible";
        }

        InputFreze = true;
        return 0;
      }

      var rectsCollector = rectString.split(",");

      parseInt(rectsCollector[rectsCollector.length - 1]);

      if (parseInt(rectsCollector[rectsCollector.length - 1]) != analysisID) {
        CancelledRequest = false;
        InputFreze = false;
        ListenForResize = false;
        return 0;
      }

      actualCx = parseFloat(rectsCollector[0]);
      actualCy = parseFloat(rectsCollector[1]);
      MasterCx = actualCx;
      MasterCy = canvas.height * Scale - actualCy;
      dispCx = actualCx / Scale;
      dispCy = canvas.height - actualCy / Scale;

      CxToReport = actualCx - zeroX * Scale;
      CyToReport = actualCy - (canvas.height - zeroY) * Scale;

      MasterArea = parseFloat(rectsCollector[2]);
      MasterIxx = parseFloat(rectsCollector[3]);
      MasterIyy = parseFloat(rectsCollector[4]);

      MasterAlpha = parseFloat(rectsCollector[5]);
      MasterIxp = parseFloat(rectsCollector[6]);
      MasterIyp = parseFloat(rectsCollector[7]);

      for (var i = 8; i < rectsCollector.length - 1; i = i + 4) {
        rectArray.push(
          new Rectangle(
            rectsCollector[i] / Scale,
            canvas.height - rectsCollector[i + 1] / Scale,
            rectsCollector[i + 2] / Scale,
            rectsCollector[i + 3] / Scale,
            "black",
            1
          )
        );
      }

      Redraw();

      ListenForResize = false;

      if (ourRequest.status != 200) {
        displayError(
          "servererror",
          "Something is broken. Things to try:\n-Check your internet connection \n-Save your work and reload this page\n-Email derick.thomas.me@gmail.com"
        );
        document.getElementById("loader").style.visibility = "hidden";
        InputFreze = false;
      } else {
        callback();
      }
    } else {
      CancelledRequest = false;
      InputFreze = false;
      ListenForResize = false;
    }
  };
}

function FromRectsToPxs() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  data = imageData.data;

  rasterArray = [];

  FillIn();

  for (var i = 0; i < rectArray.length; i++) {
    r = rectArray[i];
    r.drawrect();
  }

  imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  data = imageData.data;

  for (var index = 0; index < data.length; index = index + 4) {
    if (data[index + 3] != 0) {
      rasterArray[index / 4] = "inside";
    }
  }

  c.clearRect(0, 0, canvas.width, canvas.height);

  ci.drawImage(imageObj, imgXloc, imgYloc, imgWidth, imgHeight);

  imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  data = imageData.data;

  for (var index = 0; index < rasterArray.length; index++) {
    currentColor = rasterArray[index];
    if (currentColor == "inside") {
      colorit(FillColor, 0, 0, 0, index * 4);
    }
  }

  ShowMax = true;
  showZeroZero = true;

  InputFreze = false;
  Redraw();
}

function PrintToLog(datatoprint) {
  logQ.push(datatoprint);

  FlushLog();
}

function FlushLog() {
  if (logQ.length != 0) {
    var dataToSend = logQ.pop();
    var logRequest = new XMLHttpRequest();
    logRequest.open("POST", "<API URL HERE>");
    logRequest.setRequestHeader("Content-type", "text/plain");
    logRequest.send("-->" + dataToSend);

    logRequest.onload = function () {
      FlushLog();
    };
  }
}

function StartSession() {
  var ourRequest = new XMLHttpRequest();
  var newsession = "newsession";

  ourRequest.open("POST", "<API URL HERE>");
  ourRequest.setRequestHeader("Content-type", "text/plain");
  ourRequest.send(newsession);

  ourRequest.onload = function () {};
}

function SendShape() {
  var ourRequest = new XMLHttpRequest();

  var exportArray = [
    Precision,
    Scale,
    ElementID,
    lineArray,
    arcArray,
    linearDimArray,
    AngularDimArray,
    relAngleArray,
    previewLine,
    undoFilletArray,
  ];
  JsonToSend = JSON.stringify(exportArray);

  var newsession = "newsession";

  ourRequest.open("POST", "<API URL HERE>");
  ourRequest.setRequestHeader("Content-type", "text/plain");
  ourRequest.send(JsonToSend);

  ourRequest.onload = function () {};
}

function getIP() {
  var ourRequest = new XMLHttpRequest();

  var newsession = "newsession";

  ourRequest.open("POST", "<API URL HERE>");
  ourRequest.setRequestHeader("Content-type", "text/plain");
  ourRequest.send(newsession);

  ourRequest.onload = function () {
    remainingCredits = ourRequest.responseText;
    var btn = document.getElementById("creditsbtn");
    btn.innerHTML = "Credits Remaining: " + remainingCredits;
  };
}

function UseCredit() {
  var ourRequest = new XMLHttpRequest();

  var newsession = "newsession";

  ourRequest.open("POST", "<API URL HERE>");
  ourRequest.setRequestHeader("Content-type", "text/plain");
  ourRequest.send(newsession);

  ourRequest.onload = function () {
    remainingCredits = ourRequest.responseText;
    console.log("Credits used: ", remainingCredits);
    var btn = document.getElementById("creditsbtn");
    btn.innerHTML = "Credits Remaining: " + remainingCredits;
  };
}
