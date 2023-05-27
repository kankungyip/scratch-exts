!async function(t){const i=t.ArgumentType,a=t.BlockType,s=t.Cast,l=t.MathUtil,n=t.formatMessage;var e=await t.require("../repl/repl.js"),r=await t.require("./translations.js");t.extensions.translations(r);const u="[0m\r7> ",o=`\r
[90mundefined[0m\r
`+u;u;const p=t=>new Promise(e=>setTimeout(e,t)),d=e=>!Number.isNaN(Number(e)),N={ON:"on",OFF:"off"},h={NONE:"INPUT",DOWN:"INPUT_PULLDOWN",UP:"INPUT_PULLUP",OUTPUT:"OUTPUT"},c={LOW:"LOW",HIGH:"HIGH"},P={min:0,max:180},g={min:.5,max:2.5};class E extends e{constructor(e,t){super(e,t),this._encoder=new TextEncoder,this._runtime.registerPeripheralExtension(this._extensionId,this),this._files=[],this.state={}}get filters(){return[{usbProductId:10,usbVendorId:11914}]}disconnect(){this._runtime.emit("EXTENSION_DATA_DOWNLOADING",!1),super.disconnect()}async _onConnect(){super._onConnect(),await this.send(".reset"),await p(500),this._runtime.emit("EXTENSION_DATA_DOWNLOADING",!0);try{for(var[e,t]of this._files)await this._put(e,t);await this._setupLED()}catch(e){this._serial._handleRequestError(e)}finally{this._runtime.emit("EXTENSION_DATA_DOWNLOADING",!1)}}async _put(t,i){var e=this._encoder.encode(i),i=`(function (fn,fc){require('fs').writeFile(fn,new TextEncoder().encode(fc))})('${t}', '${i.replaceAll("\\","\\\\").replaceAll("'","\\'").replaceAll("\n","\\n")}');`;try{await this.write("\r.ls\r",`\r
${e.length}	${t}\r
`,500)}catch(e){await this.write(`\r.rm ${t}\r`),await p(500),await this.write("\r.flash -w\r"),await p(500),await this.transfer(this._encoder.encode(i)),await p(500),await this.write("\r.load\r",u),await this.write("\r.flash -e\r","\r\nFlash has erased\r\n")}}async send(e,t=null){return this.write(`\r${e.replaceAll("\n","\\n")}\r`,t)}async _setupLED(){this.state.led="led_"+Date.now(),await this.send(`const ${this.state.led}=board.led(board.LED)`,o)}async led(e){await this.send(this.state.led+`.${e}()`,o)}async toggle(){await this.send(this.state.led+".toggle()",o)}async setPinMode(e,t=h.NONE){this.state[e]=t,await this.send(`pinMode(${e},${t})`,o)}async getPinValue(e){return void 0===this.state[e]&&(await this.setPinMode(e,h.NONE),this.state[e]="ANALOG_INPUT"),"ANALOG_INPUT"!==this.state[e]?(delete this.state[e],this.getPinValue(e)):(e=await this.send(`console.log('
~ pin${e}<'+analogRead(${e})+'>')`,/^~ pin\d+<([\d.]+)>$/m),d(e[1])?parseFloat(e[1]):void 0)}async isPinHigh(e){return void 0===this.state[e]&&await this.setPinMode(e,h.NONE),/^INPUT.*/.test(this.state[e])?"1"===(await this.send(`console.log('
~ pin${e}<'+digitalRead(${e})+'>')`,/^~ pin\d+<(\d)>$/m))[1]:(delete this.state[e],this.isPinHigh(e))}async setPinValue(e,t){if(void 0===this.state[e]&&await this.setPinMode(e,h.OUTPUT),this.state[e]!==h.OUTPUT)return delete this.state[e],this.setPinValue(e,t);void 0===t?await this.send(`digitalToggle(${e})`,o):d(t)?await this.send(`analogWrite(${e},${t})`,o):await this.send(`digitalWrite(${e},${t})`,o)}async setServoAngle(e,t){if(void 0===this.state[e]){this.state[e]="pwm_"+Date.now();const a=g.min/20;await this.send(`const ${this.state[e]}=board.pwm(${e},50,${a})`,o),await this.send(this.state[e]+".start();")}if(!this.state[e].includes("pwm_"))return delete this.state[e],this.setServoAngle(e,t);var i=(g.max-g.min)/P.max;const a=(g.min+t*i)/20;await this.send(`${this.state[e]}.setDuty(${a})`,o)}}t.extensions.register(new class A{static get EXTENSION_ID(){return"rpipico"}static get EXTENSION_NAME(){return n({id:"rpipico.name",default:"RPi Pico"})}get LED_STATE_MENU(){return[{text:n({id:"rpipico.ledStateMenu.on",default:"on"}),value:N.ON},{text:n({id:"rpipico.ledStateMenu.off",default:"off"}),value:N.OFF}]}get PIN_MODE_MENU(){return[{text:n({id:"rpipico.pinModeMenu.none",default:"none"}),value:h.NONE},{text:n({id:"rpipico.pinModeMenu.up",default:"pull up"}),value:h.UP},{text:n({id:"rpipico.pinModeMenu.down",default:"pull down"}),value:h.DOWN}]}get ANALOG_PINS_MENU(){return[{text:"GP26",value:"26"},{text:"GP27",value:"27"},{text:"GP28",value:"28"}]}get DIGITAL_PINS_MENU(){return[{text:"GP0",value:"0"},{text:"GP1",value:"1"},{text:"GP2",value:"2"},{text:"GP3",value:"3"},{text:"GP4",value:"4"},{text:"GP5",value:"5"},{text:"GP6",value:"6"},{text:"GP7",value:"7"},{text:"GP8",value:"8"},{text:"GP9",value:"9"},{text:"GP10",value:"10"},{text:"GP11",value:"11"},{text:"GP12",value:"12"},{text:"GP13",value:"13"},{text:"GP14",value:"14"},{text:"GP15",value:"15"},{text:"GP16",value:"16"},{text:"GP17",value:"17"},{text:"GP18",value:"18"},{text:"GP19",value:"19"},{text:"GP20",value:"20"},{text:"GP21",value:"21"},{text:"GP22",value:"22"}]}get DIGITAL_VALUE_MENU(){return[{text:n({id:"rpipico.digitalValueMenu.low",default:"low"}),value:c.LOW},{text:n({id:"rpipico.digitalValueMenu.high",default:"high"}),value:c.HIGH}]}constructor(){this.runtime=t.vm.runtime,this._peripheral=new E(this.runtime,A.EXTENSION_ID),this.runtime.on("PROJECT_STOP_ALL",()=>this.send(".reset","\r\nsoft reset\r\n"))}async put(e){if(this._peripheral.isConnected()){this.runtime.emit("EXTENSION_DATA_DOWNLOADING",!0);try{for(var[t,i]of e)await this._peripheral._put(t,i)}catch(e){this._peripheral._serial._handleRequestError(e)}finally{this.runtime.emit("EXTENSION_DATA_DOWNLOADING",!1)}}else this._peripheral._files=this._peripheral._files.concat(e)}send(e,t){return this._peripheral.send(e,t)}getInfo(){var e=n.setup().locale;return this._peripheral.setupAddon(A.EXTENSION_ID,A.EXTENSION_NAME,()=>this._peripheral.send(".hi")),{id:A.EXTENSION_ID,name:A.EXTENSION_NAME,blockIconURI:"data:image/png;base64,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",showStatusButton:!0,docsURI:t.require.resolve(`readme.${e}.html`),blocks:[{opcode:"setLEDState",text:n({id:"rpipico.setLEDState",default:"set LED [STATE]"}),blockType:a.COMMAND,arguments:{STATE:{type:i.STRING,menu:"ledState",defaultValue:N.ON}}},{opcode:"toggleLED",text:n({id:"rpipico.toggleLEDState",default:"toggle LED"}),blockType:a.COMMAND},"---",{opcode:"analogValue",text:n({id:"rpipico.analogValue",default:"analog value of pin [PIN]"}),blockType:a.REPORTER,arguments:{PIN:{type:i.NUMBER,menu:"analogPins",defaultValue:this.ANALOG_PINS_MENU[0].value}}},{opcode:"setPullMode",text:n({id:"rpipico.setPullMode",default:"set pin [PIN] to input [MODE]"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value},MODE:{type:i.STRING,menu:"pinModes",defaultValue:h.NONE}}},{opcode:"isPinHigh",text:n({id:"rpipico.isPinHigh",default:"[PIN] pin is high?"}),blockType:a.BOOLEAN,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value}}},"---",{opcode:"setAnalogValue",text:n({id:"rpipico.setAnalogValue",default:"set pin [PIN] analog [VALUE] %"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"analogPins",defaultValue:this.ANALOG_PINS_MENU[0].value},VALUE:{type:i.NUMBER,defaultValue:0}}},{opcode:"setDigitalValue",text:n({id:"rpipico.setDigitalValue",default:"set pin [PIN] digital [VALUE]"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value},VALUE:{type:i.STRING,menu:"digitalValues",defaultValue:c.LOW}}},{opcode:"toggleDigitalValue",text:n({id:"rpipico.toggleDigitalValue",default:"toggle pin [PIN] digital"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value}}},{opcode:"setServoAngle",text:n({id:"rpipico.setServoAngle",default:"set pin [PIN] servo angle [ANGLE]"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value},ANGLE:{type:i.NUMBER,defaultValue:90}}}],menus:{ledState:{acceptReporters:!1,items:this.LED_STATE_MENU},analogPins:{acceptReporters:!1,items:this.ANALOG_PINS_MENU},digitalPins:{acceptReporters:!1,items:this.DIGITAL_PINS_MENU},pinModes:{acceptReporters:!1,items:this.PIN_MODE_MENU},digitalValues:{acceptReporters:!0,items:this.DIGITAL_VALUE_MENU}}}}async setLEDState(e){e=s.toString(e.STATE),await this._peripheral.led(e)}async toggleLED(){await this._peripheral.toggle()}async analogValue(e){return e=s.toNumber(e.PIN),this._peripheral.getPinValue(e)}async setPullMode(e){var t=s.toNumber(e.PIN),e=s.toString(e.MODE);await this._peripheral.setPinMode(t,e)}async isPinHigh(e){return e=s.toNumber(e.PIN),this._peripheral.isPinHigh(e)}async setDigitalValue(e){var t=s.toNumber(e.PIN),e=s.toString(e.VALUE);await this._peripheral.setPinValue(t,e)}async toggleDigitalValue(e){e=s.toNumber(e.PIN),await this._peripheral.setPinValue(e)}async setAnalogValue(e){var t=s.toNumber(e.PIN),e=s.toNumber(e.VALUE)/100;await this._peripheral.setPinValue(t,e)}async setServoAngle(e){var t=s.toNumber(e.PIN),e=s.toNumber(e.ANGLE),e=l.clamp(e,P.min,P.max);await this._peripheral.setServoAngle(t,e)}})}(window.Scratch);