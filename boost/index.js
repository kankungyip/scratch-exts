!function(){const t=Scratch.ArgumentType,e=Scratch.BlockType,r=Scratch.Cast,i=Scratch.formatMessage,o=Scratch.Color,n=Scratch.BLE,s=Scratch.Base64Util,a=Scratch.MathUtil,l=Scratch.RateLimiter,T=Scratch.log,_={service:"00001623-1212-efde-1623-785feabcd123",characteristic:"00001624-1212-efde-1623-785feabcd123",sendInterval:100,sendRateMax:20},O={MOTOR_WEDO:1,MOTOR_SYSTEM:2,BUTTON:5,LIGHT:8,VOLTAGE:20,CURRENT:21,PIEZO:22,LED:23,TILT_EXTERNAL:34,MOTION_SENSOR:35,COLOR:37,MOTOREXT:38,MOTORINT:39,TILT:40},u={IN_PROGRESS:1,COMPLETED:2,DISCARDED:4,IDLE:8,BUSY_OR_FULL:16},c={A:55,B:56,C:1,D:2},h={A:0,B:1,C:2,D:3};let E=h;function R(t){var e=new ArrayBuffer(4);return(e=new DataView(e)).setInt32(0,t),[e.getInt8(3),e.getInt8(2),e.getInt8(1),e.getInt8(0)]}function d(t){return t=Uint8Array.from(t),new DataView(t.buffer).getInt32(0,!0)}const p={ANY:"any",NONE:"none",RED:"red",BLUE:"blue",GREEN:"green",YELLOW:"yellow",WHITE:"white",BLACK:"black"},D={[p.NONE]:255,[p.RED]:9,[p.BLUE]:3,[p.GREEN]:5,[p.YELLOW]:7,[p.WHITE]:10,[p.BLACK]:0},I={HUB_PROPERTIES:1,HUB_ACTIONS:2,HUB_ALERTS:3,HUB_ATTACHED_IO:4,ERROR:5,PORT_INPUT_FORMAT_SETUP_SINGLE:65,PORT_INPUT_FORMAT_SETUP_COMBINED:66,PORT_INFORMATION:67,PORT_MODEINFORMATION:68,PORT_VALUE:69,PORT_VALUE_COMBINED:70,PORT_INPUT_FORMAT:71,PORT_INPUT_FORMAT_COMBINED:72,OUTPUT:129,PORT_FEEDBACK:130},A={ADVERTISEMENT_NAME:1,BUTTON:2,FW_VERSION:3,HW_VERSION:4,RSSI:5,BATTERY_VOLTAGE:6,BATTERY_TYPE:7,MANUFACTURER_NAME:8,RADIO_FW_VERSION:9,LEGO_WP_VERSION:10,SYSTEM_TYPE_ID:11,HW_NETWORK_ID:12,PRIMARY_MAC:13,SECONDARY_MAC:14,HW_NETWORK_FAMILY:15},m={SET:1,ENABLE_UPDATES:2,DISABLE_UPDATES:3,RESET:4,REQUEST_UPDATE:5,UPDATE:6},N={START_POWER:1,START_POWER_PAIR:2,SET_ACC_TIME:5,SET_DEC_TIME:6,START_SPEED:7,START_SPEED_PAIR:8,START_SPEED_FOR_TIME:9,START_SPEED_FOR_TIME_PAIR:10,START_SPEED_FOR_DEGREES:11,START_SPEED_FOR_DEGREES_PAIR:12,GO_TO_ABS_POSITION:13,GO_TO_ABS_POSITION_PAIR:14,PRESET_ENCODER:20,WRITE_DIRECT_MODE_DATA:81},g={BUFFER_IF_NECESSARY:0,EXECUTE_IMMEDIATELY:16,NO_ACTION:0,COMMAND_FEEDBACK:1},M={FLOAT:0,HOLD:126,BRAKE:127},C={DO_NOT_USE:0,ACCELERATION:1,DECELERATION:2},f={ATTACHED:1,DETACHED:0,ATTACHED_VIRTUAL:2},b={TILT:0,LED:1,COLOR:0,MOTOR_SENSOR:2,UNKNOWN:0},L={OFF:0,ON_FOREVER:1,ON_FOR_TIME:2,ON_FOR_ROTATION:3};class S{constructor(t,e){this._parent=t,this._index=e,this._direction=1,this._power=50,this._position=0,this._status=L.OFF,this._pendingDurationTimeoutId=null,this._pendingDurationTimeoutStartTime=null,this._pendingDurationTimeoutDelay=null,this._pendingRotationDestination=null,this._pendingRotationPromise=null,this.turnOff=this.turnOff.bind(this)}get direction(){return this._direction}set direction(t){this._direction=t<0?-1:1}get power(){return this._power}set power(t){this._power=0===t?0:a.scale(t,1,100,10,100)}get position(){return this._position}set position(t){this._position=t}get status(){return this._status}set status(t){this._clearRotationState(),this._clearDurationTimeout(),this._status=t}get pendingDurationTimeoutStartTime(){return this._pendingDurationTimeoutStartTime}get pendingDurationTimeoutDelay(){return this._pendingDurationTimeoutDelay}get pendingRotationDestination(){return this._pendingRotationDestination}get pendingRotationPromise(){return this._pendingRotationPromise}set pendingRotationPromise(t){this._pendingRotationPromise=t}_turnOn(){var t=this._parent.generateOutputCommand(this._index,g.EXECUTE_IMMEDIATELY,N.START_SPEED,[this.power*this.direction,a.clamp(this.power+10,0,100),C.DO_NOT_USE]);this._parent.send(_.characteristic,t)}turnOnForever(){this.status=L.ON_FOREVER,this._turnOn()}turnOnFor(t){t=Math.max(0,t),this.status=L.ON_FOR_TIME,this._turnOn(),this._setNewDurationTimeout(this.turnOff,t)}turnOnForDegrees(t,e){t=Math.max(0,t);var i=this._parent.generateOutputCommand(this._index,g.EXECUTE_IMMEDIATELY^g.COMMAND_FEEDBACK,N.START_SPEED_FOR_DEGREES,[...R(t),this.power*this.direction*e,a.clamp(this.power+10,0,100),M.BRAKE,C.DO_NOT_USE]);this.status=L.ON_FOR_ROTATION,this._pendingRotationDestination=this.position+t*this.direction*e,this._parent.send(_.characteristic,i)}turnOff(t=!0){var e=this._parent.generateOutputCommand(this._index,g.EXECUTE_IMMEDIATELY,N.START_POWER,[M.FLOAT]);this.status=L.OFF,this._parent.send(_.characteristic,e,t)}_clearDurationTimeout(){null!==this._pendingDurationTimeoutId&&(clearTimeout(this._pendingDurationTimeoutId),this._pendingDurationTimeoutId=null,this._pendingDurationTimeoutStartTime=null,this._pendingDurationTimeoutDelay=null)}_setNewDurationTimeout(t,e){this._clearDurationTimeout();const i=setTimeout(()=>{this._pendingDurationTimeoutId===i&&(this._pendingDurationTimeoutId=null,this._pendingDurationTimeoutStartTime=null,this._pendingDurationTimeoutDelay=null),t()},e);this._pendingDurationTimeoutId=i,this._pendingDurationTimeoutStartTime=Date.now(),this._pendingDurationTimeoutDelay=e}_clearRotationState(){null!==this._pendingRotationPromise&&(this._pendingRotationPromise(),this._pendingRotationPromise=null),this._pendingRotationDestination=null}}class w{constructor(t,e){this._runtime=t,this._runtime.on("PROJECT_STOP_ALL",this.stopAll.bind(this)),this._extensionId=e,this._ports=[],this._motors=[],this._sensors={tiltX:0,tiltY:0,color:p.NONE,previousColor:p.NONE},this._colorSamples=[],this._ble=null,this._runtime.registerPeripheralExtension(e,this),this._rateLimiter=new l(_.sendRateMax),this._pingDeviceId=null,this.reset=this.reset.bind(this),this._onConnect=this._onConnect.bind(this),this._onMessage=this._onMessage.bind(this),this._pingDevice=this._pingDevice.bind(this)}get tiltX(){return this._sensors.tiltX}get tiltY(){return this._sensors.tiltY}get color(){return this._sensors.color}get previousColor(){return this._sensors.previousColor}boostColorForIndex(e){return Object.keys(D).find(t=>D[t]===e)||p.NONE}motor(t){return this._motors[t]}stopAllMotors(){this._motors.forEach(t=>{t&&t.turnOff(!1)})}setLED(t){t=[t>>16&255,t>>8&255,255&t],t=this.generateOutputCommand(this._ports.indexOf(O.LED),g.EXECUTE_IMMEDIATELY^g.COMMAND_FEEDBACK,N.WRITE_DIRECT_MODE_DATA,[b.LED,...t]);return this.send(_.characteristic,t)}setLEDMode(){var t=this.generateInputCommand(this._ports.indexOf(O.LED),b.LED,0,!1);return this.send(_.characteristic,t)}stopAll(){this.isConnected()&&this.stopAllMotors()}scan(){this._ble&&this._ble.disconnect(),this._ble=new n(this._runtime,this._extensionId,{filters:[{services:[_.service]}],optionalServices:[]},this._onConnect,this.reset)}connect(t){this._ble&&this._ble.connectPeripheral(t)}disconnect(){this._ble&&this._ble.disconnect(),this.reset()}reset(){this._ports=[],this._motors=[],this._sensors={tiltX:0,tiltY:0,color:p.NONE,previousColor:p.NONE},this._pingDeviceId&&(window.clearInterval(this._pingDeviceId),this._pingDeviceId=null)}isConnected(){let t=!1;return t=this._ble?this._ble.isConnected():t}send(t,e,i=!0){return!this.isConnected()||i&&!this._rateLimiter.okayToSend()?Promise.resolve():this._ble.write(_.service,t,s.uint8ArrayToBase64(e),"base64")}generateOutputCommand(t,e,i,o){t=[0,I.OUTPUT,t,e,i,...o];return t.unshift(t.length+1),t}generateInputCommand(t,e,i,o){t=[0,I.PORT_INPUT_FORMAT_SETUP_SINGLE,t,e].concat(R(i)).concat([o]);return t.unshift(t.length+1),t}_onConnect(){this._ble.startNotifications(_.service,_.characteristic,this._onMessage),this._pingDeviceId=window.setInterval(this._pingDevice,5e3),setTimeout(()=>{var t=[0,I.HUB_PROPERTIES,A.FW_VERSION,m.REQUEST_UPDATE];t.unshift(t.length+1),this.send(_.characteristic,t,!1)},500)}_onMessage(t){var e=t[2],i=t[3];switch(e){case I.HUB_PROPERTIES:t[3]===A.FW_VERSION&&(o=d([36,2,0,16]),d(t.slice(5,t.length))<o?(E=c,T.info("Move Hub firmware older than version 1.0.00.0224 detected. Using old port mapping.")):E=h);break;case I.HUB_ATTACHED_IO:var o=t[4],r=t[5];switch(o){case f.ATTACHED:this._registerSensorOrMotor(i,r);break;case f.DETACHED:this._clearPort(i);break;case f.ATTACHED_VIRTUAL:}break;case I.PORT_VALUE:var n=this._ports[i];switch(n){case O.TILT:this._sensors.tiltX=t[4],this._sensors.tiltY=t[5];break;case O.COLOR:this._colorSamples.unshift(t[4]),5<this._colorSamples.length&&(this._colorSamples.pop(),this._colorSamples.every((t,e,i)=>t===i[0]))?(this._sensors.previousColor=this._sensors.color,this._sensors.color=this.boostColorForIndex(this._colorSamples[0])):this._sensors.color=p.NONE;break;case O.MOTOREXT:case O.MOTORINT:this.motor(i).position=d(t.slice(4,8));break;case O.CURRENT:case O.VOLTAGE:case O.LED:break;default:T.warn("Unknown sensor value! Type: "+n)}break;case I.PORT_FEEDBACK:var s,o=t[4],a=this.motor(i);a&&(s=o&u.IN_PROGRESS,o=o&(u.COMPLETED^u.DISCARDED),!s)&&o&&a.status===L.ON_FOR_ROTATION&&(a.status=L.OFF);break;case I.ERROR:T.warn("Error reported by hub: "+t)}}_pingDevice(){this._ble.read(_.service,_.characteristic,!1)}_registerSensorOrMotor(t,e){(this._ports[t]=e)!==O.MOTORINT&&e!==O.MOTOREXT||(this._motors[t]=new S(this,t));let i=null,o=1;switch(e){case O.MOTORINT:case O.MOTOREXT:i=b.MOTOR_SENSOR;break;case O.COLOR:i=b.COLOR,o=0;break;case O.LED:i=b.LED,this.setLEDMode(),this.setLED(255);break;case O.TILT:i=b.TILT;break;default:i=b.UNKNOWN}e=this.generateInputCommand(t,i,o,!0);this.send(_.characteristic,e)}_clearPort(t){var e=this._ports[t];e===O.TILT&&(this._sensors.tiltX=this._sensors.tiltY=0),e===O.COLOR&&(this._sensors.color=p.NONE),this._ports[t]="none",this._motors[t]=null}}const P={A:"A",B:"B",C:"C",D:"D",AB:"AB",ALL:"ABCD"},v={FORWARD:"this way",BACKWARD:"that way",REVERSE:"reverse"},B={UP:"up",DOWN:"down",LEFT:"left",RIGHT:"right",ANY:"any"};Scratch.extensions.register(new class F{static get EXTENSION_ID(){return"boost"}static get TILT_THRESHOLD(){return 15}constructor(){this.runtime=Scratch.vm.runtime,this._peripheral=new w(this.runtime,F.EXTENSION_ID)}getInfo(){return{id:F.EXTENSION_ID,name:"BOOST",blockIconURI:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpQTFRF////fIel5ufolZ62/2YavsPS+YZOkJmy9/j53+Hk6+zs6N/b6dfO////tDhMHAAAAA50Uk5T/////////////////wBFwNzIAAAA6ElEQVR42uzX2w6DIBAEUGDVtlr//3dLaLwgiwUd2z7MJPJg5EQWiGhGcAxBggQJEiT436CIfqXJPTn3MKNYYMSDFpoAmp24OaYgvwKnFgL2zvVTCwHrMoMi+nUQLFthaNCCa0iwclLkDgYVsQp0mzxuqXgK1MRzoCLWgkPXNN2wI/q6Kvt7u/cX0HtejN8x2sXpnpb8J8D3b0Keuhh3X975M+i0xNVbg3s1TIasgK21bQyGO+s2PykaGMYbge8KrNrssvkOWDXkErB8UuBHETjoYLkKBA8ZfuDkbwVBggQJEiR4MC8BBgDTtMZLx2nFCQAAAABJRU5ErkJggg==",showStatusButton:!0,blocks:[{opcode:"motorOnFor",text:i({id:"boost.motorOnFor",default:"turn motor [MOTOR_ID] for [DURATION] seconds",description:"turn a motor on for some time"}),blockType:e.COMMAND,arguments:{MOTOR_ID:{type:t.STRING,menu:"MOTOR_ID",defaultValue:P.A},DURATION:{type:t.NUMBER,defaultValue:1}}},{opcode:"motorOnForRotation",text:i({id:"boost.motorOnForRotation",default:"turn motor [MOTOR_ID] for [ROTATION] rotations",description:"turn a motor on for rotation"}),blockType:e.COMMAND,arguments:{MOTOR_ID:{type:t.STRING,menu:"MOTOR_ID",defaultValue:P.A},ROTATION:{type:t.NUMBER,defaultValue:1}}},{opcode:"motorOn",text:i({id:"boost.motorOn",default:"turn motor [MOTOR_ID] on",description:"turn a motor on indefinitely"}),blockType:e.COMMAND,arguments:{MOTOR_ID:{type:t.STRING,menu:"MOTOR_ID",defaultValue:P.A}}},{opcode:"motorOff",text:i({id:"boost.motorOff",default:"turn motor [MOTOR_ID] off",description:"turn a motor off"}),blockType:e.COMMAND,arguments:{MOTOR_ID:{type:t.STRING,menu:"MOTOR_ID",defaultValue:P.A}}},{opcode:"setMotorPower",text:i({id:"boost.setMotorPower",default:"set motor [MOTOR_ID] speed to [POWER] %",description:"set the motor's speed without turning it on"}),blockType:e.COMMAND,arguments:{MOTOR_ID:{type:t.STRING,menu:"MOTOR_ID",defaultValue:P.ALL},POWER:{type:t.NUMBER,defaultValue:100}}},{opcode:"setMotorDirection",text:i({id:"boost.setMotorDirection",default:"set motor [MOTOR_ID] direction [MOTOR_DIRECTION]",description:"set the motor's turn direction without turning it on"}),blockType:e.COMMAND,arguments:{MOTOR_ID:{type:t.STRING,menu:"MOTOR_ID",defaultValue:P.A},MOTOR_DIRECTION:{type:t.STRING,menu:"MOTOR_DIRECTION",defaultValue:v.FORWARD}}},{opcode:"getMotorPosition",text:i({id:"boost.getMotorPosition",default:"motor [MOTOR_REPORTER_ID] position",description:"the position returned by the motor"}),blockType:e.REPORTER,arguments:{MOTOR_REPORTER_ID:{type:t.STRING,menu:"MOTOR_REPORTER_ID",defaultValue:P.A}}},{opcode:"whenColor",text:i({id:"boost.whenColor",default:"when [COLOR] brick seen",description:"check for when color"}),blockType:e.HAT,arguments:{COLOR:{type:t.STRING,menu:"COLOR",defaultValue:p.ANY}}},{opcode:"seeingColor",text:i({id:"boost.seeingColor",default:"seeing [COLOR] brick?",description:"is the color sensor seeing a certain color?"}),blockType:e.BOOLEAN,arguments:{COLOR:{type:t.STRING,menu:"COLOR",defaultValue:p.ANY}}},{opcode:"whenTilted",text:i({id:"boost.whenTilted",default:"when tilted [TILT_DIRECTION_ANY]",description:"check when tilted in a certain direction"}),func:"isTilted",blockType:e.HAT,arguments:{TILT_DIRECTION_ANY:{type:t.STRING,menu:"TILT_DIRECTION_ANY",defaultValue:B.ANY}}},{opcode:"getTiltAngle",text:i({id:"boost.getTiltAngle",default:"tilt angle [TILT_DIRECTION]",description:"the angle returned by the tilt sensor"}),blockType:e.REPORTER,arguments:{TILT_DIRECTION:{type:t.STRING,menu:"TILT_DIRECTION",defaultValue:B.UP}}},{opcode:"setLightHue",text:i({id:"boost.setLightHue",default:"set light color to [HUE]",description:"set the LED color"}),blockType:e.COMMAND,arguments:{HUE:{type:t.NUMBER,defaultValue:50}}}],menus:{MOTOR_ID:{acceptReporters:!0,items:[{text:"A",value:P.A},{text:"B",value:P.B},{text:"C",value:P.C},{text:"D",value:P.D},{text:"AB",value:P.AB},{text:"ABCD",value:P.ALL}]},MOTOR_REPORTER_ID:{acceptReporters:!0,items:[{text:"A",value:P.A},{text:"B",value:P.B},{text:"C",value:P.C},{text:"D",value:P.D}]},MOTOR_DIRECTION:{acceptReporters:!0,items:[{text:i({id:"boost.motorDirection.forward",default:"this way",description:"label for forward element in motor direction menu for LEGO Boost extension"}),value:v.FORWARD},{text:i({id:"boost.motorDirection.backward",default:"that way",description:"label for backward element in motor direction menu for LEGO Boost extension"}),value:v.BACKWARD},{text:i({id:"boost.motorDirection.reverse",default:"reverse",description:"label for reverse element in motor direction menu for LEGO Boost extension"}),value:v.REVERSE}]},TILT_DIRECTION:{acceptReporters:!0,items:[{text:i({id:"boost.tiltDirection.up",default:"up",description:"label for up element in tilt direction menu for LEGO Boost extension"}),value:B.UP},{text:i({id:"boost.tiltDirection.down",default:"down",description:"label for down element in tilt direction menu for LEGO Boost extension"}),value:B.DOWN},{text:i({id:"boost.tiltDirection.left",default:"left",description:"label for left element in tilt direction menu for LEGO Boost extension"}),value:B.LEFT},{text:i({id:"boost.tiltDirection.right",default:"right",description:"label for right element in tilt direction menu for LEGO Boost extension"}),value:B.RIGHT}]},TILT_DIRECTION_ANY:{acceptReporters:!0,items:[{text:i({id:"boost.tiltDirection.up",default:"up"}),value:B.UP},{text:i({id:"boost.tiltDirection.down",default:"down"}),value:B.DOWN},{text:i({id:"boost.tiltDirection.left",default:"left"}),value:B.LEFT},{text:i({id:"boost.tiltDirection.right",default:"right"}),value:B.RIGHT},{text:i({id:"boost.tiltDirection.any",default:"any",description:"label for any element in tilt direction menu for LEGO Boost extension"}),value:B.ANY}]},COLOR:{acceptReporters:!0,items:[{text:i({id:"boost.color.red",default:"red",description:"the color red"}),value:p.RED},{text:i({id:"boost.color.blue",default:"blue",description:"the color blue"}),value:p.BLUE},{text:i({id:"boost.color.green",default:"green",description:"the color green"}),value:p.GREEN},{text:i({id:"boost.color.yellow",default:"yellow",description:"the color yellow"}),value:p.YELLOW},{text:i({id:"boost.color.white",default:"white",desription:"the color white"}),value:p.WHITE},{text:i({id:"boost.color.black",default:"black",description:"the color black"}),value:p.BLACK},{text:i({id:"boost.color.any",default:"any color",description:"any color"}),value:p.ANY}]}}}}motorOnFor(e){let i=1e3*r.toNumber(e.DURATION);return i=a.clamp(i,0,15e3),new Promise(t=>{this._forEachMotor(e.MOTOR_ID,t=>{(t=this._peripheral.motor(t))&&t.turnOnFor(i)}),setTimeout(t,i)})}motorOnForRotation(t){let i=360*r.toNumber(t.ROTATION);const o=Math.sign(i),e=(i=Math.abs(a.clamp(i,-36e4,36e4)),[]);return this._forEachMotor(t.MOTOR_ID,t=>{e.push(t)}),t=e.map(t=>{const e=this._peripheral.motor(t);return e?0===e.power?Promise.resolve():new Promise(t=>{e.turnOnForDegrees(i,o),e.pendingRotationPromise=t}):null}),Promise.all(t).then(()=>{})}motorOn(t){return this._forEachMotor(t.MOTOR_ID,t=>{(t=this._peripheral.motor(t))&&t.turnOnForever()}),new Promise(t=>{window.setTimeout(()=>{t()},_.sendInterval)})}motorOff(t){return this._forEachMotor(t.MOTOR_ID,t=>{(t=this._peripheral.motor(t))&&t.turnOff()}),new Promise(t=>{window.setTimeout(()=>{t()},_.sendInterval)})}setMotorPower(i){return this._forEachMotor(i.MOTOR_ID,t=>{var e=this._peripheral.motor(t);if(e)switch(e.power=a.clamp(r.toNumber(i.POWER),0,100),e.status){case L.ON_FOREVER:e.turnOnForever();break;case L.ON_FOR_TIME:e.turnOnFor(e.pendingDurationTimeoutStartTime+e.pendingDurationTimeoutDelay-Date.now())}}),new Promise(t=>{window.setTimeout(()=>{t()},_.sendInterval)})}setMotorDirection(i){return this._forEachMotor(i.MOTOR_ID,t=>{var e=this._peripheral.motor(t);if(e){switch(i.MOTOR_DIRECTION){case v.FORWARD:e.direction=1;break;case v.BACKWARD:e.direction=-1;break;case v.REVERSE:e.direction=-e.direction;break;default:T.warn("Unknown motor direction in setMotorDirection: "+i.DIRECTION)}if(e)switch(e.status){case L.ON_FOREVER:e.turnOnForever();break;case L.ON_FOR_TIME:e.turnOnFor(e.pendingDurationTimeoutStartTime+e.pendingDurationTimeoutDelay-Date.now())}}}),new Promise(t=>{window.setTimeout(()=>{t()},_.sendInterval)})}getMotorPosition(t){let e=null;switch(t.MOTOR_REPORTER_ID){case P.A:e=E.A;break;case P.B:e=E.B;break;case P.C:e=E.C;break;case P.D:e=E.D;break;default:return T.warn("Asked for a motor position that doesnt exist!"),!1}if(null!==e&&this._peripheral.motor(e)){let t=this._peripheral.motor(e).position;return e===E.A&&(t*=-1),a.wrapClamp(t,0,360)}return 0}_forEachMotor(t,e){let i;switch(t){case P.A:i=[E.A];break;case P.B:i=[E.B];break;case P.C:i=[E.C];break;case P.D:i=[E.D];break;case P.AB:i=[E.A,E.B];break;case P.ALL:i=[E.A,E.B,E.C,E.D];break;default:T.warn("Invalid motor ID: "+t),i=[]}for(const o of i)e(o)}whenTilted(t){return this._isTilted(t.TILT_DIRECTION_ANY)}isTilted(t){return this._isTilted(t.TILT_DIRECTION_ANY)}getTiltAngle(t){return this._getTiltAngle(t.TILT_DIRECTION)}_isTilted(t){return t!==B.ANY?this._getTiltAngle(t)>=F.TILT_THRESHOLD:Math.abs(this._peripheral.tiltX)>=F.TILT_THRESHOLD||Math.abs(this._peripheral.tiltY)>=F.TILT_THRESHOLD}_getTiltAngle(t){switch(t){case B.UP:return 90<this._peripheral.tiltY?256-this._peripheral.tiltY:-this._peripheral.tiltY;case B.DOWN:return 90<this._peripheral.tiltY?this._peripheral.tiltY-256:this._peripheral.tiltY;case B.LEFT:return 90<this._peripheral.tiltX?this._peripheral.tiltX-256:this._peripheral.tiltX;case B.RIGHT:return 90<this._peripheral.tiltX?256-this._peripheral.tiltX:-this._peripheral.tiltX;default:T.warn("Unknown tilt direction in _getTiltAngle: "+t)}}whenColor(t){return t.COLOR===p.ANY?this._peripheral.color!==p.NONE&&this._peripheral.color!==this._peripheral.previousColor:t.COLOR===this._peripheral.color}seeingColor(t){return t.COLOR===p.ANY?this._peripheral.color!==p.NONE:t.COLOR===this._peripheral.color}setLightHue(t){var t=r.toNumber(t.HUE),e=360*(t=a.wrapClamp(t,0,100))/100,e=o.hsvToRgb({h:e,s:1,v:1}),e=o.rgbToDecimal(e);return this._peripheral._led=t,this._peripheral.setLED(e),new Promise(t=>{window.setTimeout(()=>{t()},_.sendInterval)})}})}();