(function(e,t){const o=e.BLE,r=e.Base64Util,l=e.MathUtil,s=e.RateLimiter,i={SIMPLE_MEDIUM_LINEAR_MOTOR:1,TRAIN_MOTOR:2,BUTTION:5,LIGHT:8,VOLTAGE:20,CURRENT:21,PIEZO_TONE:22,RGB_LIGHT:23,TILT_SENSOR:34,MOTION_SENSOR:35,COLOR_DISTANCE_SENSOR:37,MEDIUM_LINEAR_MOTOR:38,MOVE_HUB_MOTOR:39,MOVE_HUB_TILT_SENSOR:40,DUPLO_TRAIN_BASE_MOTOR:41,DUPLO_TRAIN_BASE_SPEAKER:42,DUPLO_TRAIN_BASE_COLOR_SENSOR:43,DUPLO_TRAIN_BASE_SPEEDOMETER:44,TECHNIC_LARGE_MOTOR:46,TECHNIC_XL_MOTOR:47,TECHNIC_MEDIUM_ANGULAR_MOTOR:48,TECHNIC_LARGE_ANGULAR_MOTOR:49,REMOTE_POWER_CONTROL_BUTTON:55,TECHNIC_HUB_TILT_SENSOR:59,TECHNIC_COLOR_SENSOR:61,TECHNIC_DISTANCE_SENSOR:62,TECHNIC_FORCE_SENSOR:63,TECHNIC_SMALL_ANGULAR_MOTOR:65,MARIO_COLOR_BARCODE_SENSOR:73,MARIO_PANTS:74,TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:75,TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:76};class a{constructor(e){this._ioType=e,this._inputValues={}}get ioType(){return this._ioType}get mode(){switch(this._ioType){case i.MEDIUM_LINEAR_MOTOR:case i.MOVE_HUB_MOTOR:case i.TECHNIC_LARGE_MOTOR:case i.TECHNIC_XL_MOTOR:case i.TECHNIC_MEDIUM_ANGULAR_MOTOR:case i.TECHNIC_LARGE_ANGULAR_MOTOR:case i.TECHNIC_SMALL_ANGULAR_MOTOR:case i.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:case i.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:return 2;case i.TILT_SENSOR:case i.MOTION_SENSOR:return 0;case i.COLOR_DISTANCE_SENSOR:return 8;case i.MOVE_HUB_TILT_SENSOR:return 0;case i.DUPLO_TRAIN_BASE_SPEAKER:case i.DUPLO_TRAIN_BASE_COLOR_SENSOR:case i.DUPLO_TRAIN_BASE_SPEEDOMETER:return 1;case i.REMOTE_POWER_CONTROL_BUTTON:case i.TECHNIC_HUB_TILT_SENSOR:case i.TECHNIC_COLOR_SENSOR:case i.TECHNIC_DISTANCE_SENSOR:case i.TECHNIC_FORCE_SENSOR:case i.MARIO_COLOR_BARCODE_SENSOR:case i.MARIO_PANTS:return 0;default:return null}}get inputValues(){return this._inputValues}updateInputValues(e){if(0==e.length)this._inputValues={};else{var t=Buffer.from(e);switch(this._ioType){case i.MEDIUM_LINEAR_MOTOR:case i.MOVE_HUB_MOTOR:case i.TECHNIC_LARGE_MOTOR:case i.TECHNIC_XL_MOTOR:case i.TECHNIC_MEDIUM_ANGULAR_MOTOR:case i.TECHNIC_LARGE_ANGULAR_MOTOR:case i.TECHNIC_SMALL_ANGULAR_MOTOR:case i.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:case i.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:this._inputValues={relativePosition:t.readInt32LE(0)};break;case i.TILT_SENSOR:this._inputValues={tiltX:t.readInt8(0),tiltY:t.readInt8(1)};break;case i.MOTION_SENSOR:this._inputValues={distance:t.readInt8(0)};break;case i.COLOR_DISTANCE_SENSOR:this._inputValues={color:t.readInt8(0),distance:t.readInt8(1)};break;case i.MOVE_HUB_TILT_SENSOR:this._inputValues={tiltX:t.readInt8(0),tiltY:t.readInt8(1)};break;case i.DUPLO_TRAIN_BASE_COLOR_SENSOR:var o=t.readInt8(0);-1<o&&(this._inputValues={color:o},setTimeout(()=>{this._inputValues={color:-1}},100));break;case i.DUPLO_TRAIN_BASE_SPEEDOMETER:this._inputValues={drivingDistance:t.readInt32LE(0)};break;case i.REMOTE_POWER_CONTROL_BUTTON:this._inputValues={button:t.readInt8(0)};break;case i.TECHNIC_HUB_TILT_SENSOR:this._inputValues={tiltX:t.readInt16LE(4),tiltY:t.readInt16LE(2),tiltZ:t.readInt16LE(0)};break;case i.TECHNIC_COLOR_SENSOR:this._inputValues={color:t.readInt8(0)};break;case i.TECHNIC_DISTANCE_SENSOR:this._inputValues={distance:t.readInt16LE(0)};break;case i.TECHNIC_FORCE_SENSOR:this._inputValues={force:t.readInt8(0)};break;case i.MARIO_COLOR_BARCODE_SENSOR:this._inputValues={barcode:t.readInt16LE(0),color:t.readInt16LE(2)};break;case i.MARIO_PANTS:this._inputValues={pants:t.readInt8(0)};break;default:this._inputValues={}}this._inputValues.bytes=t}}}class _ extends a{constructor(e){switch(super(e),e){case i.MEDIUM_LINEAR_MOTOR:case i.MOVE_HUB_MOTOR:this._canUseSpeed=!0,this._canUsePosition=!1,this._speed=75;break;case i.TECHNIC_LARGE_MOTOR:case i.TECHNIC_XL_MOTOR:case i.TECHNIC_MEDIUM_ANGULAR_MOTOR:case i.TECHNIC_LARGE_ANGULAR_MOTOR:case i.TECHNIC_SMALL_ANGULAR_MOTOR:case i.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:case i.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:this._canUseSpeed=!0,this._canUsePosition=!0,this._speed=75;break;default:this._canUseSpeed=!1,this._canUsePosition=!1,this._speed=0}}get canUseSpeed(){return this._canUseSpeed}get canUsePosition(){return this._canUsePosition}get speed(){return this._speed}set speed(e){this._canUseSpeed&&(this._speed=l.clamp(e,-100,100))}}function n(e){switch(e){case i.SIMPLE_MEDIUM_LINEAR_MOTOR:case i.TRAIN_MOTOR:case i.LIGHT:case i.MEDIUM_LINEAR_MOTOR:case i.MOVE_HUB_MOTOR:case i.DUPLO_TRAIN_BASE_MOTOR:case i.TECHNIC_LARGE_MOTOR:case i.TECHNIC_XL_MOTOR:case i.TECHNIC_MEDIUM_ANGULAR_MOTOR:case i.TECHNIC_LARGE_ANGULAR_MOTOR:case i.TECHNIC_SMALL_ANGULAR_MOTOR:case i.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:case i.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:return new _(e);default:return new a(e)}}let O;O="undefined"==typeof TextDecoder?null:TextDecoder;function u(e){var t=new ArrayBuffer(4);return(t=new DataView(t)).setInt32(0,e),[t.getUint8(3),t.getUint8(2),t.getUint8(1),t.getUint8(0)]}function T(e){var t=new ArrayBuffer(2);return(t=new DataView(t)).setInt16(0,e),[t.getUint8(1),t.getUint8(0)]}const R="00001623-1212-efde-1623-785feabcd123",E="00001624-1212-efde-1623-785feabcd123",h=Math.pow(2,31)-1,c=-1*Math.pow(2,31),C=Math.pow(2,15)-1,b={HUB_PROPERTIES:1,HUB_ATTACHED_IO:4,GENERIC_ERROR_MESSAGES:5,PORT_INPUT_FORMAT_SETUP:65,PORT_INPUT_FORMAT_SETUP_COMBINED:66,PORT_VALUE:69,PORT_VALUE_COMBINED:70,PORT_OUTPUT_COMMAND:129,PORT_OUTPUT_COMMAND_FEEDBACK:130},I={ADVERTISING_NAME:1,BUTTON:2,FW_VERSION:3,BATTERY_VOLTAGE:6,SPEAKER_VOLUME:18},d={SET:1,ENABLE_UPDATES:2,DISABLE_UPDATES:3,RESET:4,REQUEST_UPDATE:5,UPDATE:6};t(class{constructor(e,t,o=null){this._runtime=e,this._extensionId=t,this._hubType=o,this._name=null,this._firmwareVersion=null,this._batteryLevel=0,this._devices=[],this._firstNotificationCallback=null,this._outputCommandFeedbackCallbacks=[],this._outputCommandCompletionCallbacks=[],this._ble=null,this._runtime.registerPeripheralExtension(t,this),this._runtime.on("PROJECT_STOP_ALL",this.stopAll.bind(this)),this._rateLimiter=new s(20),this._pollingId=null,this.reset=this.reset.bind(this),this._onConnect=this._onConnect.bind(this),this._onMessage=this._onMessage.bind(this)}get name(){return this._name}get firmwareVersion(){return this._firmwareVersion}get batteryLevel(){return this._batteryLevel}scan(){this._ble&&this._ble.disconnect();this._hubType&&this._hubType,this._ble=new o(this._runtime,this._extensionId,{filters:[{services:[R]}],optionalServices:[]},this._onConnect,this.reset)}connect(e){this._ble&&this._ble.connectPeripheral(e)}disconnect(){this._ble&&this._ble.disconnect(),this.reset()}isConnected(){let e=!1;return e=this._ble?this._ble.isConnected():e}_onConnect(){this._ble.startNotifications(R,E,this._onMessage),this._firstNotificationCallback=()=>{this.sendMessage(b.HUB_PROPERTIES,[I.ADVERTISING_NAME,d.ENABLE_UPDATES],!1),this.sendMessage(b.HUB_PROPERTIES,[I.FW_VERSION,d.REQUEST_UPDATE])},this._startPollingBatteryLevel()}_onMessage(e){var t=r.base64ToUint8Array(e),e=t[0];if(!(127<e)){switch(t[2]){case b.HUB_PROPERTIES:switch(t[3]){case I.ADVERTISING_NAME:O?(o=new Uint8Array(t.slice(5)),this._name=(new O).decode(o)):this._name="unsupported";break;case I.FW_VERSION:var o=t.slice(5);4==o.length&&(o=o.reduce((e,t)=>("0"+(255&t).toString(16)).slice(-2)+e,""),this._firmwareVersion=o.slice(0,1)+"."+o.slice(1,2)+"."+o.slice(2,4)+"."+o.slice(4));break;case I.BATTERY_VOLTAGE:this._batteryLevel=t[5]}break;case b.HUB_ATTACHED_IO:var s=t[3],l=t[4],i=t[5];switch(l){case 0:this._dettachDevice(s);break;case 1:this._attachDevice(s,i)}break;case b.PORT_VALUE:l=t[3],l=this._devices[l];l&&l.updateInputValues(t.slice(4));break;case b.PORT_OUTPUT_COMMAND_FEEDBACK:var l=t[3],a=t[4],_=2&a,n=1&a;4&a&&this._clearOutputCommandCompletionCallback(l),_&&(this._clearOutputCommandFeedbackCallback(l),this._clearOutputCommandCompletionCallback(l)),n&&this._moveOutputCommandFeedbackCallbackToCompletionCallback(l)}this._firstNotificationCallback&&(this._firstNotificationCallback(),this._firstNotificationCallback=null)}}_dettachDevice(e){this._devices[e]=null}_attachDevice(e,t){t=n(t);const o=(this._devices[e]=t).mode;null!==o&&setTimeout(()=>{this.sendMessage(b.PORT_INPUT_FORMAT_SETUP,[e,o,1,0,0,0,1],!1)},100)}send(e,t=!0){return!this.isConnected()||t&&!this._rateLimiter.okayToSend()?Promise.resolve():this._ble.write(R,E,r.uint8ArrayToBase64(e),"base64",!0)}sendMessage(e,t,o=!0){e=[0,e,...t];return e.unshift(e.length+1),this.send(e,o)}sendOutputCommand(e,t,o,s=!0,l=!0){s=s?17:16;return this.sendMessage(b.PORT_OUTPUT_COMMAND,[e,s,t,...o],l)}reset(){this._name=null,this._firmwareVersion=null,this._batteryLevel=0,this._devices=[],this._outputCommandFeedbackCallbacks=[],this._outputCommandCompletionCallbacks=[],this._stopPollingBatteryLevel()}stopAll(){this.isConnected()&&this.stopAllMotors()}stopAllMotors(){for(var[e,t]of Object.entries(this._devices))t instanceof _&&(this.sendOutputCommand(e,81,[0,0],!1),this._outputCommandFeedbackCallbacks[e]=null,this._outputCommandCompletionCallbacks[e]=null)}_startPollingBatteryLevel(){this.sendMessage(b.HUB_PROPERTIES,[I.BATTERY_VOLTAGE,d.REQUEST_UPDATE]),this._pollingId=window.setInterval(()=>{this.sendMessage(b.HUB_PROPERTIES,[I.BATTERY_VOLTAGE,d.REQUEST_UPDATE])},3e3)}_stopPollingBatteryLevel(){this._pollingId&&(window.clearInterval(this._pollingId),this._pollingId=null)}_createOutputCommandFeedbackPromise(t){return new Promise(e=>{this._outputCommandFeedbackCallbacks[t]=e})}_clearOutputCommandFeedbackCallback(e){this._outputCommandFeedbackCallbacks[e]&&(this._outputCommandFeedbackCallbacks[e](),this._outputCommandFeedbackCallbacks[e]=null)}_clearOutputCommandCompletionCallback(e){this._outputCommandCompletionCallbacks[e]&&(this._outputCommandCompletionCallbacks[e](),this._outputCommandCompletionCallbacks[e]=null)}_moveOutputCommandFeedbackCallbackToCompletionCallback(e){this._outputCommandCompletionCallbacks[e]=this._outputCommandFeedbackCallbacks[e],this._outputCommandFeedbackCallbacks[e]=null}getMotor(e){e=this._devices[e];return e instanceof _?e:null}motorPWM(e,t){return t=l.clamp(t,-100,100),this.getMotor(e)?this.sendOutputCommand(e,81,[0,t]):Promise.resolve()}motorRunForDegrees(e,t,o){t*=Math.sign(o),o=l.clamp(Math.abs(o),1,h);var s=this.getMotor(e);return s&&s.canUseSpeed?(s=s.speed*t,this.sendOutputCommand(e,11,[...u(o),s,100,127,0]).then(this._createOutputCommandFeedbackPromise.bind(this,e))):Promise.resolve()}motorRunTimed(e,t,o){var o=l.clamp(1e3*o,0,C),s=this.getMotor(e);return s&&s.canUseSpeed?(s=s.speed*t,this.sendOutputCommand(e,9,[...T(o),s,100,127,0]).then(this._createOutputCommandFeedbackPromise.bind(this,e))):Promise.resolve()}motorStart(e,t){var o=this.getMotor(e);return o&&o.canUseSpeed?(o=o.speed*t,this.sendOutputCommand(e,7,[o,100,0])):Promise.resolve()}motorSetSpeed(e,t){e=this.getMotor(e);e&&e.canUseSpeed&&(e.speed=t)}motorResetRelativePosition(e,t){t=l.clamp(t,c,h);var o=this.getMotor(e);return o&&o.canUseSpeed?this.sendOutputCommand(e,81,[2,...u(t)]):Promise.resolve()}inputValue(e,t){e=this._devices[e];return e&&e.inputValues.hasOwnProperty(t)?e.inputValues[t]:null}internalInputValue(e){for(var[t,o]of Object.entries(this._devices))if(50<=t&&o.inputValues.hasOwnProperty(e))return o.inputValues[e];return null}setLEDColor(e){(e<0||10<e)&&(e=0);var t=this._devices.findIndex(e=>e&&e.ioType==i.RGB_LIGHT);return-1!=t?this.sendOutputCommand(t,81,[0,e]):Promise.resolve()}setVolume(e){return e=l.clamp(e,0,100),this.sendMessage(b.HUB_PROPERTIES,[I.SPEAKER_VOLUME,d.SET,e])}}),e.extensions.translations({en:{"legobluetooth.motorPWM":"[PORT] start motor at [POWER] % power","legobluetooth.motorStop":"[PORT] stop motor","legobluetooth.motorRunFor":"[PORT] run [DIRECTION] for [VALUE] [UNIT]","legobluetooth.motorStart":"[PORT] start motor [DIRECTION]","legobluetooth.motorSetSpeed":"[PORT] set speed to [SPEED] %","legobluetooth.getRelativePosition":"[PORT] relative position","legobluetooth.motorResetRelativePosition":"[PORT] reset relative position to [RELATIVE_POSITION]","legobluetooth.getColor":"[PORT] color","legobluetooth.getDistance":"[PORT] distance","legobluetooth.getForce":"[PORT] force","legobluetooth.getTilt":"[PORT] tilt [XY]","legobluetooth.setHubLEDColor":"set hub LED color to [COLOR]","legobluetooth.getHubTilt":"hub tilt [XYZ]","legobluetooth.getName":"name","legobluetooth.getFirmwareVersion":"firmware version","legobluetooth.getBatteryLevel":"battery level","legobluetooth.rotations":"rotations","legobluetooth.degrees":"degrees","legobluetooth.seconds":"seconds","legobluetooth.black":"black","legobluetooth.pink":"pink","legobluetooth.purple":"purple","legobluetooth.blue":"blue","legobluetooth.lightBlue":"light blue","legobluetooth.lightGreen":"light green","legobluetooth.green":"green","legobluetooth.yellow":"yellow","legobluetooth.orange":"orange","legobluetooth.red":"red","legobluetooth.white":"white"},"zh-cn":{"legobluetooth.motorPWM":"开启马达 [PORT] 功率设为 [POWER] %","legobluetooth.motorStop":"关闭马达 [PORT]","legobluetooth.motorRunFor":"开启马达 [PORT] 方向为 [DIRECTION] 运行 [VALUE] [UNIT]","legobluetooth.motorStart":"开启马达 [PORT] 方向为 [DIRECTION]","legobluetooth.motorSetSpeed":"将马达 [PORT] 速度设为 [SPEED] %","legobluetooth.getRelativePosition":"马达 [PORT] 相对位置","legobluetooth.motorResetRelativePosition":"将马达 [PORT] 相对位置重置为 [RELATIVE_POSITION]","legobluetooth.getColor":"[PORT] 颜色","legobluetooth.getDistance":"[PORT] 距离","legobluetooth.getForce":"[PORT] 受力","legobluetooth.getTilt":"[PORT] 倾斜 [XY]","legobluetooth.setHubLEDColor":"将集线器 LED 设为 [COLOR]","legobluetooth.getHubTilt":"集线器倾斜 [XYZ]","legobluetooth.getName":"名称","legobluetooth.getFirmwareVersion":"固件版本","legobluetooth.getBatteryLevel":"电量","legobluetooth.rotations":"圈","legobluetooth.degrees":"度","legobluetooth.seconds":"秒","legobluetooth.black":"黑","legobluetooth.pink":"粉","legobluetooth.purple":"紫","legobluetooth.blue":"蓝","legobluetooth.lightBlue":"浅蓝","legobluetooth.lightGreen":"浅绿","legobluetooth.green":"绿","legobluetooth.yellow":"黄","legobluetooth.orange":"橙","legobluetooth.red":"红","legobluetooth.white":"白"},"zh-tw":{"legobluetooth.motorPWM":"開啟馬達 [PORT] 功率設為 [POWER] %","legobluetooth.motorStop":"關閉馬達 [PORT]","legobluetooth.motorRunFor":"開啟馬達 [PORT] 方向為 [DIRECTION] 運行 [VALUE] [UNIT]","legobluetooth.motorStart":"開啟馬達 [PORT] 方向為 [DIRECTION]","legobluetooth.motorSetSpeed":"將馬達 [PORT] 速度設為 [SPEED] %","legobluetooth.getRelativePosition":"馬達 [PORT] 相對位置","legobluetooth.motorResetRelativePosition":"將馬達 [PORT] 相對位置重置為 [RELATIVE_POSITION]","legobluetooth.getColor":"[PORT] 顏色","legobluetooth.getDistance":"[PORT] 距離","legobluetooth.getForce":"[PORT] 力量","legobluetooth.getTilt":"[PORT] 傾斜 [XY]","legobluetooth.setHubLEDColor":"將集線器 LED 設為 [COLOR]","legobluetooth.getHubTilt":"集線器傾斜 [XYZ]","legobluetooth.getName":"名稱","legobluetooth.getFirmwareVersion":"固件版本","legobluetooth.getBatteryLevel":"電量","legobluetooth.rotations":"圈","legobluetooth.degrees":"度","legobluetooth.seconds":"秒","legobluetooth.black":"黑","legobluetooth.pink":"粉","legobluetooth.purple":"紫","legobluetooth.blue":"藍","legobluetooth.lightBlue":"淺藍","legobluetooth.lightGreen":"淺綠","legobluetooth.green":"綠","legobluetooth.yellow":"黃","legobluetooth.orange":"橙","legobluetooth.red":"紅","legobluetooth.white":"白"}})})(Scratch,(require,exports));