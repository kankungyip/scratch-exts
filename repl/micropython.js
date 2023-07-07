(function(){const t=Scratch.Serial,s="";const o=(...t)=>t.join("\r\n"),e=t=>!Number.isNaN(Number(t)),h=512;const r=/\r?\n|(?<!\n)\r/;const a=new RegExp("<nfy>([\\s\\S]*?)<\\/nfy>"),i=o("import _thread as thread","import uasyncio","import time","import sys","_state = {}","_tasks = []","async def _start_notify ():","    while True:","        deadline = time.ticks_add(time.ticks_ms(), 100)","        for (id, [pin, callback]) in _state.items():","            if pin['mode'] == 'IN':","                try:","                    val = callback(pin['pin'])","                    if pin['value'] != val:","                        pin['value'] = val",'                        sys.stdout.write("<nfy>%s=%s</nfy>"%(id, val))',"                except Exception as err:",'                    sys.stdout.write("<nfy>error=%s</nfy>"%err)',"        period = time.ticks_diff(deadline, time.ticks_ms())","        await uasyncio.sleep_ms(period if period > 0 else 0)","async def _start_listen ():","    while True:","        deadline = time.ticks_add(time.ticks_ms(), 100)","        for i in range(len(_tasks)):","            (task, args) = _tasks.pop(0)","            uasyncio.create_task(task(args))","        period = time.ticks_diff(deadline, time.ticks_ms())","        await uasyncio.sleep_ms(period if period > 0 else 0)","def _async_tasks (task, args):","    _tasks.append((task, args))","async def _main_thread ():","    notify = uasyncio.create_task(_start_notify())","    listen = uasyncio.create_task(_start_listen())","    await uasyncio.gather(notify, listen)","thread.start_new_thread(lambda: uasyncio.run(_main_thread()), ())");Scratch.export(class{constructor(t,i){this._serial=null,this._filters=[],this._decoder=new TextDecoder,this._waitingFor=[],this._messages=[],this._lastMessage="",this._ready=!1,this.state={},this._runtime=t,this._extensionId=i,this.reset=this.reset.bind(this),this._onConnect=this._onConnect.bind(this),this._onMessage=this._onMessage.bind(this)}scan(){this._serial&&this._serial.disconnect(),this._serial=new t(this._runtime,this._extensionId,{filters:this._filters},this._onConnect,this.reset)}connect(t){this._serial&&this._serial.connectPeripheral(t)}disconnect(){this._serial&&this._serial.disconnect(),this.reset()}reset(){this._serial=null,this._waitingFor=[],this._messages=[],this._lastMessage="",this._ready=!1,this.state={}}isConnected(){let t=!1;return t=this._serial?this._serial.isConnected():t}async _onConnect(){this._ready=!0,this._serial.read(this._onMessage),await this.write("",">>> "),await this.write(s,">>> "),await this.write("",">>> "),await this._startNotifications()}_onMessage(t){let i=""+this._lastMessage+this._decoder.decode(t);var s,t=i.match(a),t=(t&&([t,s]=t[1].split("="),"True"===s||"False"===s?this.state[t]="True"===s:e(s)?this.state[t]=Number(s):this.state[t]=s,i=i.replace(a,"")),i.split(r));for(this._lastMessage=t.pop(),this._messages=this._messages.concat(t.filter(t=>0<t.length));10<this._messages.length;)this._messages.shift();this._waitForSent()}_waitForSent(){var s=this._messages.concat(this._lastMessage);for(const n in this._waitingFor){var e=this._waitingFor[n];if(e){let i=!0;for(let t=-1;t>=-e.waitFor.length;t--){var a=e.waitFor.at(t),r=s.at(t);if(i=i&&r===a,r.includes("Error: ")||r.includes("Traceback"))return e.reject(new Error(r)),void this._removeWait(n)}if(i)return e.resolve(),void this._removeWait(n)}}}_removeWait(t){clearTimeout(t),this._waitingFor.splice(t,1)}_waitTimeout(t){var i=this._waitingFor[t];i&&i.reject(new Error(i.waitFor[0]+" timeout")),this._removeWait(t)}_waitFor(e,a=5e3){return e=e.split(r),new Promise((t,i)=>{const s=setTimeout(()=>this._waitTimeout(s),a);this._waitingFor[s]={waitFor:e,resolve:t,reject:i}})}async write(t,i,s){this.isConnected&&this._ready&&(this._ready=!1,await this._serial.write(t,"text"),this._ready=!0,i)&&await this._waitFor(i,s)}async send(t,i){this.isConnected&&await this.write(t=t+`\r
`,`>>> ${t}>>> `,i)}async run(t,i){this.isConnected&&(await this.write("","raw REPL; CTRL-B to exit\r\n>"),await this.write(t),await this.write(s,`>OK${i||""}>`),await this.write("",'Type "help()" for more information.\r\n>>> '))}async setState(t,i,s,e){this.isConnected&&void 0===this.state[t]&&(this.state[t]=i,i=[`'mode': '${s.mode}'`,"'pin': "+s.pin,"'value': "+(s.value||"None")],await this.run([e.replace("def callback",`def ${t}_callback`),`_state['${t}'] = [{${i.join(",")}}, ${t}_callback]`].join("\r\n")))}async _startNotifications(){this.isConnected&&await this.run(i)}async save(i,s){var e=s+"/"+i.name;if(!await this._checkHash(e,i.hash)){var a=["import os","import binascii","os.chdir('/')","try:",`    os.mkdir('${s}')`,"except OSError:","    pass",`with open('${e}', 'wb') as f:`];let t=0;do{var r=t*h,n=Math.min((t+1)*h,i.content.length),r=i.content.slice(r,n);a.push(`    f.write(binascii.a2b_base64('${r}'))`),t++}while(t*h<i.content.length);if(await this.run(o(...a)),!await this._checkHash(e,i.hash))throw new Error(`saving '${i.name}' failed`)}}async _checkHash(t,i){try{return await this.run(o("import os","import binascii","import hashlib","os.chdir('/')","hash = hashlib.sha256()",`with open('${t}', 'rb') as f:`,"    while True:","        c = f.read(512)","        if not c:","           break","        hash.update(c)","print(binascii.hexlify(hash.digest()).decode())"),i+`\r
`),!0}catch(t){return!1}}})})(window.Scratch);