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
    //document.getElementById('welcomeheader').style['font-size'] = '11pt';
    //document.getElementById('welcometxt').style['font-size'] = '11pt';
    //document.getElementById('SaveRedirheader').style['font-size'] = '11pt';
    ///document.getElementById('SaveRedirwelcometxt').style['font-size'] = '11pt';
    //document.getElementById('LinesRedirheader').style['font-size'] = '11pt';
    //document.getElementById('LinesRedirwelcometxt').style['font-size'] = '11pt';
    //document.getElementById('erroralerttext').style['font-size'] = '10pt';
    //document.getElementById('resultsheader').style['font-size'] = '13pt';
    //document.getElementById('clearheader').style['font-size'] = '13pt';
    //document.getElementById('preheader').style['font-size'] = '13pt';
    //document.getElementById('errorheader').style['font-size'] = '13pt';
    //document.getElementById('firstdimheader').style['font-size'] = '13pt';
    //document.getElementById('outputpopuptext').style['font-size'] = '10pt';
    //document.getElementById('clearalerttext').style['font-size'] = '10pt';
    //document.getElementById('prealerttext').style['font-size'] = '10pt';
    //document.getElementById('firstdimalerttext').style['font-size'] = '10pt';
    //document.getElementById('welcomecancelbtn').style['background-size'] = '100%';
    document.getElementById('unitsxbtn').style['background-size'] = '100%';
    //document.getElementById('SaveRedircancelbtn').style['background-size'] = '100%';
    //document.getElementById('LinesRedircancelbtn').style['background-size'] = '100%';
    document.getElementById('errorreshelpbtn').style['background-size'] = '100%';
    //document.getElementById('cancelbtn').style['background-size'] = '100%';
    document.getElementById('resizecancelbtn').style['background-size'] = '100%';
    //document.getElementById('reshelpbtn').style['background-size'] = '100%';
    //document.getElementById('prehelpbtn').style['background-size'] = '100%';
    //document.getElementById('clearhelpbtn').style['background-size'] = '100%';
    document.getElementById('prexbtn').style['background-size'] = '100%';
    document.getElementById('firstdimhelpbtn').style['background-size'] = '100%';

    //document.getElementById('pricinglink').style['font-size'] = '10pt';
    //document.getElementById('buypro').style['font-size'] = '10pt';

    //document.getElementById('prealert').style['height'] = '75px';

    //document.getElementById('firstdimalert').style['height'] = '80px';
    //document.getElementById('firstdimalert').style['width'] = '240px';
    //document.getElementById('firstdimgrab').style['width'] = '240px';
    //document.getElementById('firstinput').style['left'] = '185px';
    //document.getElementById('firstinput').style['top'] = '10px';
    //document.getElementById('firstdimalerttext').style['width'] = '200px';
    //document.getElementById('firstdimokbtn').style['left'] = '33px';
    //document.getElementById('firstdimcancelbtn').style['left'] = '133px';


    //document.getElementById('erroralert').style['height'] = '125px';
    //document.getElementById('erroralerttext').style['height'] = '75px';

    document.getElementById('outputpopuptext').style['left'] = '-3px';

    document.getElementById('custom-file-upload_a').style['padding-left'] = '21px';
    document.getElementById('custom-file-upload_a').style['padding-right'] = '21px';

/*
    document.getElementById('filletsInput').style['width'] = '100px';
    document.getElementById('filletsInput').style['height'] = '23px';
    document.getElementById('filletsInput').style['padding-top'] = '7px';
    document.getElementById('filletsInput').style['padding-left'] = '5px';

    document.getElementById('filletRadius').style['width'] = '30px';
    document.getElementById('filletRadius').style['position'] = 'absolute';
    document.getElementById('filletRadius').style['left'] = '63px';
    document.getElementById('filletRadius').style['top'] = '3px';


*/
    document.getElementById('unitsalert').style['height'] = '120px';
    document.getElementById('outputpopuptext').style['left'] =  '6px';
    //document.getElementById('clearheader').style['left'] =  '23%';
    //document.getElementById('preheader').style['left'] =  '20%';
    //document.getElementById('resultsheader').style['left'] =  '25%';

    //document.getElementById('snipcursor').style['top'] =  '14px';
    //document.getElementById('snipcursor').style['left'] =  '-1px';

    //document.getElementById('results').style['top'] =  '60px';


}

function MacFormat(){
    //document.getElementById('welcomeheader').style['font-size'] = '11pt';
    //document.getElementById('welcometxt').style['font-size'] = '11pt';
    //document.getElementById('SaveRedirheader').style['font-size'] = '11pt';
    ///document.getElementById('SaveRedirwelcometxt').style['font-size'] = '11pt';
    //document.getElementById('LinesRedirheader').style['font-size'] = '11pt';
    //document.getElementById('LinesRedirwelcometxt').style['font-size'] = '11pt';
    //document.getElementById('erroralerttext').style['font-size'] = '10pt';
    //document.getElementById('resultsheader').style['font-size'] = '13pt';
    //document.getElementById('clearheader').style['font-size'] = '13pt';
    //document.getElementById('preheader').style['font-size'] = '13pt';
    //document.getElementById('errorheader').style['font-size'] = '13pt';
    //document.getElementById('firstdimheader').style['font-size'] = '13pt';
    //document.getElementById('outputpopuptext').style['font-size'] = '10pt';
    //document.getElementById('clearalerttext').style['font-size'] = '10pt';
    //document.getElementById('prealerttext').style['font-size'] = '10pt';
    //document.getElementById('firstdimalerttext').style['font-size'] = '10pt';
    //document.getElementById('welcomecancelbtn').style['background-size'] = '100%';
    //document.getElementById('SaveRedircancelbtn').style['background-size'] = '100%';
    //document.getElementById('LinesRedircancelbtn').style['background-size'] = '100%';
    document.getElementById('errorreshelpbtn').style['background-size'] = '100%';
   // document.getElementById('cancelbtn').style['background-size'] = '100%';
    document.getElementById('resizecancelbtn').style['background-size'] = '100%';
    //document.getElementById('reshelpbtn').style['background-size'] = '100%';
    //document.getElementById('prehelpbtn').style['background-size'] = '100%';
    //document.getElementById('clearhelpbtn').style['background-size'] = '100%';
    document.getElementById('prexbtn').style['background-size'] = '100%';
    document.getElementById('firstdimhelpbtn').style['background-size'] = '100%';

    //document.getElementById('pricinglink').style['font-size'] = '10pt';
    //document.getElementById('buypro').style['font-size'] = '10pt';

    //document.getElementById('prealert').style['height'] = '75px';

    //document.getElementById('firstdimalert').style['height'] = '80px';
    //document.getElementById('firstdimalert').style['width'] = '240px';
    //document.getElementById('firstdimgrab').style['width'] = '240px';
    //document.getElementById('firstinput').style['left'] = '185px';
    //document.getElementById('firstinput').style['top'] = '10px';
    //document.getElementById('firstdimalerttext').style['width'] = '200px';
    //document.getElementById('firstdimokbtn').style['left'] = '33px';
    //document.getElementById('firstdimcancelbtn').style['left'] = '133px';


    //document.getElementById('erroralert').style['height'] = '125px';
    //document.getElementById('erroralerttext').style['height'] = '75px';

    document.getElementById('outputpopuptext').style['left'] = '-3px';

    document.getElementById('custom-file-upload_a').style['padding-left'] = '21px';
    document.getElementById('custom-file-upload_a').style['padding-right'] = '21px';
/*
    document.getElementById('filletsInput').style['width'] = '100px';
    document.getElementById('filletsInput').style['height'] = '23px';
    document.getElementById('filletsInput').style['padding-top'] = '7px';
    document.getElementById('filletsInput').style['padding-left'] = '5px';

    document.getElementById('filletRadius').style['width'] = '30px';
    document.getElementById('filletRadius').style['position'] = 'absolute';
    document.getElementById('filletRadius').style['left'] = '63px';
    document.getElementById('filletRadius').style['top'] = '3px';


*/
    document.getElementById('unitsalert').style['height'] = '120px';
    document.getElementById('outputpopuptext').style['left'] =  '6px';
    //document.getElementById('clearheader').style['left'] =  '23%';
    //document.getElementById('preheader').style['left'] =  '20%';
    //document.getElementById('resultsheader').style['left'] =  '25%';

    //document.getElementById('snipcursor').style['top'] =  '14px';
    //document.getElementById('snipcursor').style['left'] =  '-1px';

    //document.getElementById('results').style['top'] =  '60px';

}
