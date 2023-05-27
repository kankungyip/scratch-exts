!function(e){const i=e.ArgumentType,s=e.BlockType,r=e.log,n=e.Cast,o=e.formatMessage,t=e.BLE,a=e.Base64Util,l={CMD_PIN_CONFIG:128,CMD_DISPLAY_TEXT:129,CMD_DISPLAY_LED:130},u="micro:bit extension stopped receiving data",c={service:61445,rxChar:"5261da01-fa7e-42ab-850b-7c80220097cc",txChar:"5261da02-fa7e-42ab-850b-7c80220097cc"};class h{constructor(t,e){this._runtime=t,this._ble=null,this._runtime.registerPeripheralExtension(e,this),this._extensionId=e,this._sensors={tiltX:0,tiltY:0,buttonA:0,buttonB:0,touchPins:[0,0,0],gestureState:0,ledMatrixState:new Uint8Array(5)},this._gestures={moving:!1,move:{active:!1,timeout:!1},shake:{active:!1,timeout:!1},jump:{active:!1,timeout:!1}},this._timeoutID=null,this._busy=!1,this._busyTimeoutID=null,this.reset=this.reset.bind(this),this._onConnect=this._onConnect.bind(this),this._onMessage=this._onMessage.bind(this)}displayText(e){var i=new Uint8Array(e.length);for(let t=0;t<e.length;t++)i[t]=e.charCodeAt(t);return this.send(l.CMD_DISPLAY_TEXT,i)}displayMatrix(t){return this.send(l.CMD_DISPLAY_LED,t)}get tiltX(){return this._sensors.tiltX}get tiltY(){return this._sensors.tiltY}get buttonA(){return this._sensors.buttonA}get buttonB(){return this._sensors.buttonB}get gestureState(){return this._sensors.gestureState}get ledMatrixState(){return this._sensors.ledMatrixState}scan(){this._ble&&this._ble.disconnect(),this._ble=new t(this._runtime,this._extensionId,{filters:[{services:[c.service]}]},this._onConnect,this.reset)}connect(t){this._ble&&this._ble.connectPeripheral(t)}disconnect(){this._ble&&this._ble.disconnect(),this.reset()}reset(){this._timeoutID&&(window.clearTimeout(this._timeoutID),this._timeoutID=null)}isConnected(){let t=!1;return t=this._ble?this._ble.isConnected():t}send(t,e){if(this.isConnected()&&!this._busy){this._busy=!0,this._busyTimeoutID=window.setTimeout(()=>{this._busy=!1},5e3);var i=new Uint8Array(e.length+1);i[0]=t;for(let t=0;t<e.length;t++)i[t+1]=e[t];t=a.uint8ArrayToBase64(i);this._ble.write(c.service,c.txChar,t,"base64",!0).then(()=>{this._busy=!1,window.clearTimeout(this._busyTimeoutID)})}}_onConnect(){this._ble.read(c.service,c.rxChar,!0,this._onMessage),this._timeoutID=window.setTimeout(()=>this._ble.handleDisconnectError(u),4500)}_onMessage(t){this._sensors.tiltX=t[1]|t[0]<<8,32768<this._sensors.tiltX&&(this._sensors.tiltX-=65536),this._sensors.tiltY=t[3]|t[2]<<8,32768<this._sensors.tiltY&&(this._sensors.tiltY-=65536),this._sensors.buttonA=t[4],this._sensors.buttonB=t[5],this._sensors.touchPins[0]=t[6],this._sensors.touchPins[1]=t[7],this._sensors.touchPins[2]=t[8],this._sensors.gestureState=t[9],window.clearTimeout(this._timeoutID),this._timeoutID=window.setTimeout(()=>this._ble.handleDisconnectError(u),4500)}_checkPinState(t){return this._sensors.touchPins[t]}}const d={FRONT:"front",BACK:"back",LEFT:"left",RIGHT:"right",ANY:"any"},p={MOVED:"moved",SHAKEN:"shaken",JUMPED:"jumped"},m={A:"A",B:"B",ANY:"any"},A={ON:"on",OFF:"off"};e.extensions.register(new class T{static get EXTENSION_NAME(){return"micro:bit"}static get EXTENSION_ID(){return"microbit"}static get TILT_THRESHOLD(){return 15}get BUTTONS_MENU(){return[{text:"A",value:m.A},{text:"B",value:m.B},{text:o({id:"microbit.buttonsMenu.any",default:"any",description:'label for "any" element in button picker for micro:bit extension'}),value:m.ANY}]}get GESTURES_MENU(){return[{text:o({id:"microbit.gesturesMenu.moved",default:"moved",description:"label for moved gesture in gesture picker for micro:bit extension"}),value:p.MOVED},{text:o({id:"microbit.gesturesMenu.shaken",default:"shaken",description:"label for shaken gesture in gesture picker for micro:bit extension"}),value:p.SHAKEN},{text:o({id:"microbit.gesturesMenu.jumped",default:"jumped",description:"label for jumped gesture in gesture picker for micro:bit extension"}),value:p.JUMPED}]}get PIN_STATE_MENU(){return[{text:o({id:"microbit.pinStateMenu.on",default:"on",description:"label for on element in pin state picker for micro:bit extension"}),value:A.ON},{text:o({id:"microbit.pinStateMenu.off",default:"off",description:"label for off element in pin state picker for micro:bit extension"}),value:A.OFF}]}get TILT_DIRECTION_MENU(){return[{text:o({id:"microbit.tiltDirectionMenu.front",default:"front",description:"label for front element in tilt direction picker for micro:bit extension"}),value:d.FRONT},{text:o({id:"microbit.tiltDirectionMenu.back",default:"back",description:"label for back element in tilt direction picker for micro:bit extension"}),value:d.BACK},{text:o({id:"microbit.tiltDirectionMenu.left",default:"left",description:"label for left element in tilt direction picker for micro:bit extension"}),value:d.LEFT},{text:o({id:"microbit.tiltDirectionMenu.right",default:"right",description:"label for right element in tilt direction picker for micro:bit extension"}),value:d.RIGHT}]}get TILT_DIRECTION_ANY_MENU(){return[...this.TILT_DIRECTION_MENU,{text:o({id:"microbit.tiltDirectionMenu.any",default:"any",description:"label for any direction element in tilt direction picker for micro:bit extension"}),value:d.ANY}]}constructor(){this.runtime=e.vm.runtime,this._peripheral=new h(this.runtime,T.EXTENSION_ID)}getInfo(){var t=o.setup().locale;return{id:T.EXTENSION_ID,name:T.EXTENSION_NAME,blockIconURI:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAKcElEQVR42u2cfXAU9RnHv7u3L3d7l9yR5PIGXO7MkQKaYiCUWqJhFGvRMk4JZXSc8aXVaSmiYlthVHQEW99FxiIdrVY6teiMdoa+ICqhIqgQAsjwMgYDOQKXl7uY17u9293b3f5x5JKYe8+FJGSfvzbP/n77e/azz+95nt9v90KoqgpN0hdSQ6AB1ABqADWAmmgANYAaQA2gJhpADeBEE2q8GPLaWzu/CslyiY4k9dOn5uijtXGd7+jWkaReVpT3Hrhv6d0awEFC07rgD+ZeYYnXprhwigUAvjj0zbjxQCLebozT7iDzK1ZUWCru2K7L//6MVC8ue45Blz8n6rlQ815QtuohOlXiEdy/AUqPa6y59Mkh6Q1345GNja6m7pHEQKNl3t0704EXat4L6fSOmOeEI1vHKzwAyNJR9MPFpRUPOu0ONm2A0xatWaTLm5WfDrzvAppA8AbiG03fC8CQNkDKZK2YrPAuRrhpifJERsuYywveJc7CqcIDMAyeLm82dEXzw39I/qjXkpr3QuW9lxfAdOABGAKPslWDnbsy7Jl8BxTeM3SqmO0gaA5U6c3jymup0YSn9JyLee67wpTfBQAQjmyF3HFqiJcRtDECjy5dAmbmcgQPvjjxl3Lx4IVjnD/5cE1zkWtyP34VBGcdKLJnLgc9cznk1kMXFdzEn8KJ4KUqqsSHvcxWDf7j1UM8UPr6/YgHhhX8xAaYaXgAIB7fBnbuSrBzV8aNgarEQ/z6/YkLcDTg9V9XlXjQtuqoU1TpcUHlvZDOfDiuyh5qPMCLrJ1bDw3EuUtx81N/BH3pjQBJQ2HMF5V6iKfeRchVm9kkMtrwxmSdobeA9daBde8GwVlBcFYofS1Jw0vaAy9HeJHQwBUPzIBvGxDc92Rmp/BowJs10wkAONfsBs8HAAAltqngOAO8HZ3o6OiMqcvLy4E1Lwc8H8C5ZndMXdLJa/qNacNLCDBw/O8nFUNWxp/64+tWAwBefe1tHKg7CgC4/9d3ori4EHv3HcDrb26PqVt2602ovvaHaGlpw+8ffSamLqXYmya8jG8mpFy6iGLkWLh4HAwG4+r6j4VBfaPpLgU8IMGO9MLqW2pYQ9aQokuR5dgXIwCC1CUcNMj3hpdvLAdSF54EYpCHooRA0Swomo2pC0kCQpIAkqTA6LmYupgxL0X7m78+aG10NXVkpIwxsAwWXncDCESHLkohfPbpbiT6ZFPPZQ9fC0e58Wi6wTDj6UbT/rQAyiERS2pW4Kc3LQDLRO8miCEAKj7d83FcTxyLJJJJ+9MCqKoq9HomMrgkSThxsgEcZ8AMpwMkSYJlKDA0DVUFiHGWRDJp/4jXwqIo4uFHnkZXdw8AYGbZFXhs3WqQJDkhkkim7E8KoMlkxKbnn8DBunrwUli3e8/+yOAA0HjmHDq7upGXm5PUoDUr7hmWRB5Zt3FYwoime+vtd/H6G9uGJIxouniSyP6H7v8FystnY80jGzIA0MihsMAKu20aTp3JzFb6WCWRuDUvHwByw8cOhw2FBVaYjNzIAba1e3Hfb9aiq7MTNStuBwAsvr4KO3d9GnmKztIS5EyxTJiVSDT7p04tipx/9MnnYc7ORlu7NzMxsK3di5AkDHgGw2DTC+uHBeGJshJJZL/fxyMQEDKbRAiCQDAoQhBDYBkKNE2j4uqrhpUBoiSBIMZfEhkN+1NeiWSqEB2rlUg69md0JRIQRHy86z8jXsqNVRLJlP0jqgNJXXgAgjbCcONmCHUvQ+44NWG2s/rtH5Mt/ciToo0wLH4JBGO6LLazRiJk2vBYy4gHHw/bWSN+LZBKEhkMjzn/CaSiKgQOvJDyFB7L7axUJWNJZDA8IhQA1boPin7KZbMSGfUYyFx9b3hXg/cCsoBA2Z0AoYOaxlcC4+mdyCUDKBzanLFBJ3USyaRMuiSSKZmUSSSTMimTCABUlblRU9kAZ0E39p+eii21c+EL0jHbOwu6sfaWgyjND//U4oP6MmzZnfi79XT7mfQSNi7bh0JzOLG19XBY/89r49pYVebGqhuOosDsh1+gsWV3BXYdd2Q+BlaVuXFv9bHgkSbzk+vfcVRyjHhi47J9cftsXLYf7T36Ix8cLHlo6ydlv6qpPI2qssRZcuOy/Wjp4k5s+2zG+offKqtcUt6kJtNv7S0H0RtkvEufXTB/6bML5je2Wy7UVDbEbF9o9mPDsv2oP5v75vbPS26rP5u3fdXiozDppcwDrKlswOlWy9E//DX09Mt/azh8zzNM1RybF86C7pheVGD240CDeX3NWtfml94Rt+0+Mf3Lm8qbEnpfgdmPs+3G9+564vTT//pM/GrHYduWRP0AYOEMN/5S61xT92Vtfd2XtfWb/vu91fHALyxzw9tnkB/cTD5w+2Ou9375HHtfa7exM5mxRpKFaafdQQKgAcDERs98/foLHrXdaXfoABi8vczhWO2/28/TRR5z2h00gKymNl1ton79oigq6bQ7dE67Q+ew9mb1h4FYYwVESgLAXLSRa+3mWpIdK+UYuPiq89f8+XfT/+ftZQ4vLm9ZmUyfdcsv1M2fWfRaUCK8i8vdK1u6ktuAWPWTsztm24o/cnnYHUsrWzd1+fVJ9XtqxbG3XzFdNcPTawjcueibpxK1t+X26f/9R8a953jub4typOvm2b1XnvUmv8JKWMZcaZffX3XDERRP8cGaFRjWxtPLoZvXY4oxgPBNEsgxBhCUKEzL6Ru+JydS8Ak0giKFgESDJFQoKmCgQzAwIfQEWETzmoBIwd2VNaStu8uEHGO4Buz06zHHFv0dRkefAZ1+PQx0KNK2eIoPLCUj2zDc275qzgcBFWv+cf3IyxgTK2KOzQufEM5kfpGF12eGPSf8DXN+No/87HDWiwYYALw+M6ym8AscAxO++X7xCTRM7EDQzht0Da8v/NWo1dQDAxNCocUXs+303IGHdaptOmYXnh/SLlZbV+fwnwJm6UXEm/ojqgM/PFmJQ81OPHfrtqT7bN23BE8seTflYLvz5DwYGQHLKz5Puo/XZ8aLtT+D1dSDuxbsGQIymmz48DbwIguOESJOcce8XaO3oVpZ8k3Em5KVVAAMFnuOB9as1MbimCBunn04vBmR40ls29Wfgxf1KMn1gBdY+MXUCvK4ANvPndpLzrLzALjBN2VPwrDBksgLYkn1jBMp90nVY2++8vAw3RlPeLNYVZSPAEgjKWP6ZCn4lF+gMdnE08spQb73RQB9aXtgo6tJcNodf8rWz3L//Br340UW3sExEkXrFFKSSUVHqkRfkJZ8QSZk5gS6hw9H+GyDQAclSs41BVmSUIn+toAKIUTJskKoQUknCxKlkISKb/sM0NMyyVAhXW+AlYosfgOgQlUJVadTSUWBKoQoudvPioPbenq5oIUTaRUqenhWKi3oyVIUqKpKREoLggDhF6hQb4CV9LRM9rctMPN6glChp2SdTqeSskwoAECSKnG61fzFR/XsGu+FhmONriYl7TImsjoYKJyZSeB8CoBQo6spqU8TCO1fgE7gDVUNoCYaQA2gBlADqAHURAOoAdQAagA10QCOgfwfNp/hXbfBMCAAAAAASUVORK5CYII=",showStatusButton:!0,docsURI:e.require.resolve(`readme.${t}.html`),blocks:[{opcode:"whenButtonPressed",text:o({id:"microbit.whenButtonPressed",default:"when [BTN] button pressed",description:"when the selected button on the micro:bit is pressed"}),blockType:s.HAT,arguments:{BTN:{type:i.STRING,menu:"buttons",defaultValue:m.A}}},{opcode:"isButtonPressed",text:o({id:"microbit.isButtonPressed",default:"[BTN] button pressed?",description:"is the selected button on the micro:bit pressed?"}),blockType:s.BOOLEAN,arguments:{BTN:{type:i.STRING,menu:"buttons",defaultValue:m.A}}},"---",{opcode:"whenGesture",text:o({id:"microbit.whenGesture",default:"when [GESTURE]",description:"when the selected gesture is detected by the micro:bit"}),blockType:s.HAT,arguments:{GESTURE:{type:i.STRING,menu:"gestures",defaultValue:p.MOVED}}},"---",{opcode:"displaySymbol",text:o({id:"microbit.displaySymbol",default:"display [MATRIX]",description:"display a pattern on the micro:bit display"}),blockType:s.COMMAND,arguments:{MATRIX:{type:i.MATRIX,defaultValue:"0101010101100010101000100"}}},{opcode:"displayText",text:o({id:"microbit.displayText",default:"display text [TEXT]",description:"display text on the micro:bit display"}),blockType:s.COMMAND,arguments:{TEXT:{type:i.STRING,defaultValue:o({id:"microbit.defaultTextToDisplay",default:"Hello!",description:`default text to display.
                                    IMPORTANT - the micro:bit only supports letters a-z, A-Z.
                                    Please substitute a default word in your language
                                    that can be written with those characters,
                                    substitute non-accented characters or leave it as "Hello!".
                                    Check the micro:bit site documentation for details`})}}},{opcode:"displayClear",text:o({id:"microbit.clearDisplay",default:"clear display",description:"display nothing on the micro:bit display"}),blockType:s.COMMAND},"---",{opcode:"whenTilted",text:o({id:"microbit.whenTilted",default:"when tilted [DIRECTION]",description:"when the micro:bit is tilted in a direction"}),blockType:s.HAT,arguments:{DIRECTION:{type:i.STRING,menu:"tiltDirectionAny",defaultValue:d.ANY}}},{opcode:"isTilted",text:o({id:"microbit.isTilted",default:"tilted [DIRECTION]?",description:"is the micro:bit is tilted in a direction?"}),blockType:s.BOOLEAN,arguments:{DIRECTION:{type:i.STRING,menu:"tiltDirectionAny",defaultValue:d.ANY}}},{opcode:"getTiltAngle",text:o({id:"microbit.tiltAngle",default:"tilt angle [DIRECTION]",description:"how much the micro:bit is tilted in a direction"}),blockType:s.REPORTER,arguments:{DIRECTION:{type:i.STRING,menu:"tiltDirection",defaultValue:d.FRONT}}},"---",{opcode:"whenPinConnected",text:o({id:"microbit.whenPinConnected",default:"when pin [PIN] connected",description:"when the pin detects a connection to Earth/Ground"}),blockType:s.HAT,arguments:{PIN:{type:i.STRING,menu:"touchPins",defaultValue:"0"}}}],menus:{buttons:{acceptReporters:!0,items:this.BUTTONS_MENU},gestures:{acceptReporters:!0,items:this.GESTURES_MENU},pinState:{acceptReporters:!0,items:this.PIN_STATE_MENU},tiltDirection:{acceptReporters:!0,items:this.TILT_DIRECTION_MENU},tiltDirectionAny:{acceptReporters:!0,items:this.TILT_DIRECTION_ANY_MENU},touchPins:{acceptReporters:!0,items:["0","1","2"]}}}}whenButtonPressed(t){return"any"===t.BTN?this._peripheral.buttonA|this._peripheral.buttonB:"A"===t.BTN?this._peripheral.buttonA:"B"===t.BTN&&this._peripheral.buttonB}isButtonPressed(t){return"any"===t.BTN?0!=(this._peripheral.buttonA|this._peripheral.buttonB):"A"===t.BTN?0!==this._peripheral.buttonA:"B"===t.BTN&&0!==this._peripheral.buttonB}whenGesture(t){return"moved"===(t=n.toString(t.GESTURE))?this._peripheral.gestureState>>2&1:"shaken"===t?1&this._peripheral.gestureState:"jumped"===t&&this._peripheral.gestureState>>1&1}displaySymbol(t){return null!==(t=n.toString(t.MATRIX).replace(/:/g,"").replace(/\s/g,"").split("").reduce((t,e,i)=>"0"===e?t:t+Math.pow(2,i),0))&&(this._peripheral.ledMatrixState[0]=31&t,this._peripheral.ledMatrixState[1]=t>>5&31,this._peripheral.ledMatrixState[2]=t>>10&31,this._peripheral.ledMatrixState[3]=t>>15&31,this._peripheral.ledMatrixState[4]=t>>20&31,this._peripheral.displayMatrix(this._peripheral.ledMatrixState)),new Promise(t=>{setTimeout(()=>{t()},100)})}displayText(t){0<(t=String(t.TEXT).substring(0,19)).length&&this._peripheral.displayText(t);const e=120*(6*t.length+6);return new Promise(t=>{setTimeout(()=>{t()},e)})}displayClear(){for(let t=0;t<5;t++)this._peripheral.ledMatrixState[t]=0;return this._peripheral.displayMatrix(this._peripheral.ledMatrixState),new Promise(t=>{setTimeout(()=>{t()},100)})}whenTilted(t){return this._isTilted(t.DIRECTION)}isTilted(t){return this._isTilted(t.DIRECTION)}getTiltAngle(t){return this._getTiltAngle(t.DIRECTION)}_isTilted(t){return t!==d.ANY?this._getTiltAngle(t)>=T.TILT_THRESHOLD:Math.abs(this._peripheral.tiltX/10)>=T.TILT_THRESHOLD||Math.abs(this._peripheral.tiltY/10)>=T.TILT_THRESHOLD}_getTiltAngle(t){switch(t){case d.FRONT:return Math.round(this._peripheral.tiltY/-10);case d.BACK:return Math.round(this._peripheral.tiltY/10);case d.LEFT:return Math.round(this._peripheral.tiltX/-10);case d.RIGHT:return Math.round(this._peripheral.tiltX/10);default:r.warn("Unknown tilt direction in _getTiltAngle: "+t)}}whenPinConnected(t){if(t=parseInt(t.PIN,10),!isNaN(t))return!(t<0||2<t)&&this._peripheral._checkPinState(t)}})}(window.Scratch);