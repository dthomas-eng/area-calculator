 //first, check if running on mobile. If so, exit and move on - everything is already set correctly.
if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
}

// Next, if it is running on a widnows laptop or desktop, adjust css accordingly.
else if (navigator.appVersion.indexOf("Win")!=-1){
    WindowsFormat();
}

// Last, if it is running on a mac laptop or desktop, adjust css accordingly.
else if(navigator.appVersion.indexOf("Mac") != -1){
    MacFormat();
}

function WindowsFormat(){
    document.getElementById('unitsxbtn').style['background-size'] = '100%';
    document.getElementById('errorreshelpbtn').style['background-size'] = '100%';
    document.getElementById('resizecancelbtn').style['background-size'] = '100%';
    document.getElementById('prexbtn').style['background-size'] = '100%';
    document.getElementById('firstdimhelpbtn').style['background-size'] = '100%';
    document.getElementById('outputpopuptext').style['left'] = '-3px';
    document.getElementById('custom-file-upload_a').style['padding-left'] = '21px';
    document.getElementById('custom-file-upload_a').style['padding-right'] = '21px';
    document.getElementById('unitsalert').style['height'] = '120px';
    document.getElementById('outputpopuptext').style['left'] =  '6px';
}

function MacFormat(){
    document.getElementById('errorreshelpbtn').style['background-size'] = '100%';
    document.getElementById('resizecancelbtn').style['background-size'] = '100%';
    document.getElementById('prexbtn').style['background-size'] = '100%';
    document.getElementById('firstdimhelpbtn').style['background-size'] = '100%';
    document.getElementById('outputpopuptext').style['left'] = '-3px';
    document.getElementById('custom-file-upload_a').style['padding-left'] = '21px';
    document.getElementById('custom-file-upload_a').style['padding-right'] = '21px';
    document.getElementById('unitsalert').style['height'] = '120px';
    document.getElementById('outputpopuptext').style['left'] =  '6px';

}
