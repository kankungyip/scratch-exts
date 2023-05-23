!async function(){const e=Scratch.Serial,n=Scratch.formatMessage;Scratch.log;await Scratch.require("https://unpkg.com/xterm@5.1.0/css/xterm.css"),await Scratch.require("https://unpkg.com/xterm@5.1.0/lib/xterm.js"),await Scratch.require("https://unpkg.com/xterm-addon-webgl@0.14.0/lib/xterm-addon-webgl.js"),await Scratch.require("https://unpkg.com/xterm-addon-fit@0.7.0/lib/xterm-addon-fit.js");var i=-1<(i=navigator.platform.toLowerCase()).indexOf("mac")?"darwin":-1<i.indexOf("win")?"win32":-1<i.indexOf("linux")?"linux":void 0;const r={convertEol:!0,cursorBlink:!0,fontFamily:'"Cascadia Code", Menlo, monospace',fontSize:12,lineHeight:1.2,windowsMode:"win32"===i,macOptionIsMeta:"darwin"===i,macOptionClickForcesSelection:"darwin"===i,theme:{cursor:"#f8f8f8",foreground:"#f8f8f8",background:"#2d2e2c",selection:"#5da5d5",black:"#1e1e1d",brightblack:"#262625",red:"#ce5c5c",brightred:"#ff7272",green:"#5bcc5b",brightgreen:"#72ff72",yellow:"#cccc5b",brightyellow:"#ffff72",blue:"#5d5dd3",brightblue:"#7279ff",magenta:"#bc5ed1",brightmagenta:"#e572ff",cyan:"#5da5d5",brightcyan:"#72f0ff",white:"#f8f8f8",brightwhite:"#ffffff"}},a=new WebglAddon.WebglAddon,o=new FitAddon.FitAddon;Scratch.export(class{constructor(e,i){this._serial=null,this._term=null,this._runtime=e,this._extensionId=i,this._decoder=new TextDecoder,this._messages="",this._busy=!1,this._waitingFor={},this._listening={},this.reset=this.reset.bind(this),this._onConnect=this._onConnect.bind(this),this._onMessage=this._onMessage.bind(this),this._onTermData=this._onTermData.bind(this)}setupAddon(e,i,t){var s=n({id:"repl.name",default:"REPL"});Scratch.gui.addon({id:"repl"+(e?"_"+e:""),type:"tab",icon:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjwhLS0gQ3JlYXRlZCB3aXRoIFZlY3Rvcm5hdG9yIChodHRwOi8vdmVjdG9ybmF0b3IuaW8vKSAtLT4KPHN2ZyBoZWlnaHQ9IjEwMCUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIwIDIwIiB3aWR0aD0iMTAwJSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxkZWZzLz4KPGcgaWQ9IuaXoOagh+mimCI+CjxwYXRoIGQ9Ik0zLjQ1NDU1IDQuMThMMTYuNTQ1NSA0LjE4QzE3LjM0ODggNC4xOCAxOCA0LjgzMTIyIDE4IDUuNjM0NTVMMTggMTEuNDUyN0MxOCAxMy44NjI1IDE2LjA0NjIgMTUuODE2NCAxMy42MzY0IDE1LjgxNjRMNi4zNjM2NCAxNS44MTY0QzMuOTUzODIgMTUuODE2NCAyIDEzLjg2MjUgMiAxMS40NTI3TDIgNS42MzQ1NUMyIDQuODMxMjIgMi42NTEyMiA0LjE4IDMuNDU0NTUgNC4xOFpNNS4xMjIxOCA4LjY5NDE4TDYuNDI2MTggOS45OTgxOEw1LjEyMjE4IDExLjMwMjJDNC44NDY1NyAxMS41ODc1IDQuODUwNTEgMTIuMDQxMiA1LjEzMTA0IDEyLjMyMTdDNS40MTE1NyAxMi42MDIyIDUuODY1MTggMTIuNjA2MiA2LjE1MDU1IDEyLjMzMDVMNy45Njg3MyAxMC41MTI0QzguMjUyNjQgMTAuMjI4NCA4LjI1MjY0IDkuNzY4IDcuOTY4NzMgOS40ODRMNi4xNTA1NSA3LjY2NTgyQzUuODY1MTggNy4zOTAyIDUuNDExNTcgNy4zOTQxNCA1LjEzMTA0IDcuNjc0NjhDNC44NTA1MSA3Ljk1NTIxIDQuODQ2NTcgOC40MDg4MiA1LjEyMjE4IDguNjk0MThaTTExLjQ1NDUgMTEuMDg5MUw5LjI3MjczIDExLjA4OTFDOC44NzEwNyAxMS4wODkxIDguNTQ1NDUgMTEuNDE0NyA4LjU0NTQ1IDExLjgxNjRDOC41NDU0NSAxMi4yMTggOC44NzEwNyAxMi41NDM2IDkuMjcyNzMgMTIuNTQzNkwxMS40NTQ1IDEyLjU0MzZDMTEuODU2MiAxMi41NDM2IDEyLjE4MTggMTIuMjE4IDEyLjE4MTggMTEuODE2NEMxMi4xODE4IDExLjQxNDcgMTEuODU2MiAxMS4wODkxIDExLjQ1NDUgMTEuMDg5MVoiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjwvZz4KPC9zdmc+Cg==",title:s+(i?": "+i:""),didMount:e=>{e&&(this._term=new Terminal(r),this._term.open(e),this._term.loadAddon(a),this._term.loadAddon(o),this._term.onData(this._onTermData),e.style.padding="2px",e.style.backgroundColor=r.theme.background,e.querySelector(".xterm").style.position="absolute",o.fit(),this._term.focus(),t)&&t()},didUpdate:()=>{this._term&&o.fit()},willUnmount:()=>{this._term&&(this._term.clear(),this._term.dispose(),this._term=null)}})}get filters(){throw new Error("must override")}scan(){this._serial&&this._serial.disconnect(),this._serial=new e(this._runtime,this._extensionId,{filters:this.filters},this._onConnect,this.reset)}connect(e){this._serial&&this._serial.connectPeripheral(e)}disconnect(){this._serial&&this._serial.disconnect(),this.reset()}reset(){this._serial=null,this._messages="",this._busy=!1,this._waitingFor={},this._listening={}}isConnected(){let e=!1;return e=this._serial?this._serial.isConnected():e}_onConnect(){this._serial.ondata=this._onMessage}_onMessage(e){this._messages+=this._decoder.decode(e),this._receiveWaiting(),this._receiveListening(),this._term&&this._term.write(e)}_onTermData(e){this.write(e)}_receiveWaiting(){Object.entries(this._waitingFor).forEach(([e,i])=>{let t=i.waitFor;var s;t instanceof RegExp?(s=(t=t.multiline?t:new RegExp(i.waitFor,"m"+i.waitFor.flags)).exec(this._messages))&&(i.resolve(s),this._messages=this._messages.replace(t,""),this._removeWaiting(e)):this._messages.includes(t)?(i.resolve(),this._messages=this._messages.replace(t,""),this._removeWaiting(e)):/Error:/.test(t)&&i.reject()})}async write(e,i,t){return!this._busy&&this.isConnected()&&(this._busy=!0,"string"==typeof e?await this._serial.write(e,"text"):await this._serial.write(e,"binary"),this._busy=!1,i)?this._promisesTo(i,t):void 0}async transfer(e){this._busy||this.isConnected()&&(this._busy=!0,await this._serial.transfer("code",e),this._busy=!1)}_promisesTo(s,n=6e4){return new Promise((e,i)=>{const t=setTimeout(()=>this._waitingTimeout(t),n);this._waitingFor[t]={waitFor:s,resolve:e,reject:i}})}_waitingTimeout(e){var i=this._waitingFor[e];i&&i.reject(new Error(`wait for '${i.waitFor}' timeout`)),this._removeWaiting(e)}_removeWaiting(e){clearTimeout(e),this._waitingFor[e]=null,delete this._waitingFor[e]}on(e,i){var t=""+e;e.multiline||(e=new RegExp(e,"m"+e.flags)),this._listening[t]=[e,i]}off(e){delete this._listening[""+e]}_receiveListening(){Object.values(this._listening).forEach(([e,i])=>{var t=e.exec(this._messages);t&&(i(t),this._messages=this._messages.replace(e,""))})}}),Scratch.extensions.translations({en:{"repl.name":"REPL"},"zh-cn":{"repl.name":"交互执行"},"zh-tw":{"repl.name":"REPL"}})}();