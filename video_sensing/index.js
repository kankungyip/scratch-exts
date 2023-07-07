(async function(e,i){const t=(await i("./library.js"))["VideoMotion"],I=e.ArgumentType,o=e.BlockType,a=e.Base64Util,n=e.Clone,s=e.Cast,g=e.formatMessage,N={MOTION:"motion",DIRECTION:"direction"},r={STAGE:"Stage",SPRITE:"this sprite"},T={OFF:"off",ON:"on",ON_FLIPPED:"on-flipped"};e.extensions.register(new(class d{constructor(){this.runtime=e.vm.runtime,this.detect=new t,this._lastUpdate=null,this.firstInstall=!0,this.runtime.ioDevices&&(this.runtime.on("PROJECT_LOADED",this.updateVideoDisplay.bind(this)),this.runtime.on("PROJECT_RUN_START",this.reset.bind(this)),this._loop()),this.runtime.on("videoSensing.videoOff",()=>{this.videoToggle({VIDEO_STATE:T.OFF})}),this.runtime.on("videoSensing.videoOn",()=>{this.videoToggle({VIDEO_STATE:T.ON})}),this.runtime.emit("videoSensing.installed",this.globalVideoState)}static get INTERVAL(){return 33}static get DIMENSIONS(){return[480,360]}static get STATE_KEY(){return"Scratch.videoSensing"}static get DEFAULT_MOTION_STATE(){return{motionFrameNumber:0,motionAmount:0,motionDirection:0}}get globalVideoTransparency(){var e=this.runtime.getTargetForStage();return e?e.videoTransparency:50}set globalVideoTransparency(e){var i=this.runtime.getTargetForStage();return i&&(i.videoTransparency=e),e}get globalVideoState(){var e=this.runtime.getTargetForStage();return e?e.videoState:T.OFF}set globalVideoState(e){var i=this.runtime.getTargetForStage();return i&&(i.videoState=e),e}updateVideoDisplay(){this.setVideoTransparency({TRANSPARENCY:this.globalVideoTransparency}),this.videoToggle({VIDEO_STATE:this.globalVideoState})}reset(){this.detect.reset();var i=this.runtime.targets;for(let e=0;e<i.length;e++){var t=i[e].getCustomState(d.STATE_KEY);t&&(t.motionAmount=0,t.motionDirection=0)}}_loop(){var e=Math.max(this.runtime.currentStepTime,d.INTERVAL),e=(this._loopInterval=setTimeout(this._loop.bind(this),e),Date.now()),i=(null===this._lastUpdate&&(this._lastUpdate=e),e-this._lastUpdate);i>d.INTERVAL&&(i=this.runtime.ioDevices.video.getFrame({format:"image-data",dimensions:d.DIMENSIONS}))&&(this._lastUpdate=e,this.detect.addFrame(i.data),this.runtime.emit("videoSensing.frame",{data:a.arrayBufferToBase64(i.data),width:i.width,height:i.height}))}_stopLoop(){clearTimeout(this._loopInterval)}_buildMenu(e){return e.map((e,i)=>{var t={};return t.text=e.name,t.value=e.value||String(i+1),t})}_getMotionState(e){let i=e.getCustomState(d.STATE_KEY);return i||(i=n.simple(d.DEFAULT_MOTION_STATE),e.setCustomState(d.STATE_KEY,i)),i}static get SensingAttribute(){return N}get ATTRIBUTE_INFO(){return[{name:g({id:"videoSensing.motion",default:"motion",description:'Attribute for the "video [ATTRIBUTE] on [SUBJECT]" block'}),value:N.MOTION},{name:g({id:"videoSensing.direction",default:"direction",description:'Attribute for the "video [ATTRIBUTE] on [SUBJECT]" block'}),value:N.DIRECTION}]}static get SensingSubject(){return r}get SUBJECT_INFO(){return[{name:g({id:"videoSensing.sprite",default:"sprite",description:'Subject for the "video [ATTRIBUTE] on [SUBJECT]" block'}),value:r.SPRITE},{name:g({id:"videoSensing.stage",default:"stage",description:'Subject for the "video [ATTRIBUTE] on [SUBJECT]" block'}),value:r.STAGE}]}get VIDEO_STATE_INFO(){return[{name:g({id:"videoSensing.off",default:"off",description:'Option for the "turn video [STATE]" block'}),value:T.OFF},{name:g({id:"videoSensing.on",default:"on",description:'Option for the "turn video [STATE]" block'}),value:T.ON},{name:g({id:"videoSensing.onFlipped",default:"on flipped",description:'Option for the "turn video [STATE]" block that causes the video to be flipped horizontally (reversed as in a mirror)'}),value:T.ON_FLIPPED}]}getInfo(){return this.firstInstall&&(this.globalVideoState=T.ON,this.globalVideoTransparency=50,this.updateVideoDisplay(),this.firstInstall=!1),{id:"videoSensing",name:g({id:"videoSensing.categoryName",default:"Video Sensing",description:"Label for the video sensing extension category"}),blockIconURI:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1ZpZGVvLVNlbnNpbmctQmxvY2s8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iRXh0ZW5zaW9ucy9Tb2Z0d2FyZS9WaWRlby1TZW5zaW5nLUJsb2NrIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utb3BhY2l0eT0iMC4xNSI+CiAgICAgICAgPGcgaWQ9InZpZGVvLW1vdGlvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDEwLjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC1Db3B5IiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGN4PSIzMiIgY3k9IjE2IiByPSI0LjUiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLUNvcHkiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjeD0iMzIiIGN5PSIxMiIgcj0iNC41Ij48L2NpcmNsZT4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC1Db3B5IiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGN4PSIzMiIgY3k9IjgiIHI9IjQuNSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY3g9IjMyIiBjeT0iNCIgcj0iNC41Ij48L2NpcmNsZT4KICAgICAgICAgICAgPHBhdGggZD0iTTIyLjY3MTk0NzcsNC40MTk1NzY0OSBMMTYuNSw4LjQxOTkxMjk4IEwxNi41LDYuMSBDMTYuNSw0LjA4OTc2NDU0IDE0LjkzNzE4MDYsMi41IDEzLDIuNSBMNC4xLDIuNSBDMi4wNzYxNDIzNywyLjUgMC41LDQuMDc2MTQyMzcgMC41LDYuMSBMMC41LDE0IEMwLjUsMTUuOTI3Mzk4NyAyLjA4NDQ5ODM5LDE3LjUxMTg5NzEgNC4xLDE3LjYgTDEzLDE3LjYgQzE0LjkwMTY2MDIsMTcuNiAxNi41LDE1Ljk0NjU0NSAxNi41LDE0IEwxNi41LDExLjcxNjkwNDggTDIyLjc1NzI0NzksMTUuNDcxMjUzNSBMMjIuODUzNTUzNCwxNS41NDY0NDY2IEMyMi44NzM3ODg2LDE1LjU2NjY4MTggMjIuOTUxNTMxLDE1LjYgMjMsMTUuNiBDMjMuMjY2OTg2NSwxNS42IDIzLjUsMTUuMzgyNTIwNyAyMy41LDE1LjEgTDIzLjUsNC44IEMyMy41LDQuODM2NzY1MzggMjMuNDQzODA1OCw0LjcwNTY0NTYzIDIzLjM3MTI1MzUsNC41NTcyNDc4OCBDMjMuMjI1OTA1Niw0LjMxNTAwMTM5IDIyLjk0MTU5MzcsNC4yNTgxMzg5OSAyMi42NzE5NDc3LDQuNDE5NTc2NDkgWiIgaWQ9InZpZGVvXzM3XyIgZmlsbD0iIzRENEQ0RCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",menuIconURI:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1ZpZGVvLVNlbnNpbmctTWVudTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJFeHRlbnNpb25zL1NvZnR3YXJlL1ZpZGVvLVNlbnNpbmctTWVudSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9InZpZGVvLW1vdGlvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDUuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC1Db3B5IiBmaWxsPSIjMEVCRDhDIiBvcGFjaXR5PSIwLjI1IiBjeD0iMTYiIGN5PSI4IiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC1Db3B5IiBmaWxsPSIjMEVCRDhDIiBvcGFjaXR5PSIwLjUiIGN4PSIxNiIgY3k9IjYiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLUNvcHkiIGZpbGw9IiMwRUJEOEMiIG9wYWNpdHk9IjAuNzUiIGN4PSIxNiIgY3k9IjQiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSIjMEVCRDhDIiBjeD0iMTYiIGN5PSIyIiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjMzNTk3MzksMi4yMDk3ODgyNSBMOC4yNSw0LjIwOTk1NjQ5IEw4LjI1LDMuMDUgQzguMjUsMi4wNDQ4ODIyNyA3LjQ2ODU5MDMxLDEuMjUgNi41LDEuMjUgTDIuMDUsMS4yNSBDMS4wMzgwNzExOSwxLjI1IDAuMjUsMi4wMzgwNzExOSAwLjI1LDMuMDUgTDAuMjUsNyBDMC4yNSw3Ljk2MzY5OTM3IDEuMDQyMjQ5MTksOC43NTU5NDg1NiAyLjA1LDguOCBMNi41LDguOCBDNy40NTA4MzAwOSw4LjggOC4yNSw3Ljk3MzI3MjUgOC4yNSw3IEw4LjI1LDUuODU4NDUyNDEgTDguNjI4NjIzOTQsNi4wODU2MjY3NyBMMTEuNDI2Nzc2Nyw3Ljc3MzIyMzMgQzExLjQzNjg5NDMsNy43ODMzNDA5MSAxMS40NzU3NjU1LDcuOCAxMS41LDcuOCBDMTEuNjMzNDkzMiw3LjggMTEuNzUsNy42OTEyNjAzNCAxMS43NSw3LjU1IEwxMS43NSwyLjQgQzExLjc1LDIuNDE4MzgyNjkgMTEuNzIxOTAyOSwyLjM1MjgyMjgyIDExLjY4NTYyNjgsMi4yNzg2MjM5NCBDMTEuNjEyOTUyOCwyLjE1NzUwMDY5IDExLjQ3MDc5NjgsMi4xMjkwNjk1IDExLjMzNTk3MzksMi4yMDk3ODgyNSBaIiBpZD0idmlkZW9fMzdfIiBzdHJva2Utb3BhY2l0eT0iMC4xNSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0iIzRENEQ0RCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",blocks:[{opcode:"whenMotionGreaterThan",text:g({id:"videoSensing.whenMotionGreaterThan",default:"when video motion > [REFERENCE]",description:"Event that triggers when the amount of motion is greater than [REFERENCE]"}),blockType:o.HAT,arguments:{REFERENCE:{type:I.NUMBER,defaultValue:10}}},{opcode:"videoOn",blockType:o.REPORTER,text:g({id:"videoSensing.videoOn",default:"video [ATTRIBUTE] on [SUBJECT]",description:"Reporter that returns the amount of [ATTRIBUTE] for the selected [SUBJECT]"}),arguments:{ATTRIBUTE:{type:I.NUMBER,menu:"ATTRIBUTE",defaultValue:N.MOTION},SUBJECT:{type:I.NUMBER,menu:"SUBJECT",defaultValue:r.SPRITE}}},{opcode:"videoToggle",text:g({id:"videoSensing.videoToggle",default:"turn video [VIDEO_STATE]",description:"Controls display of the video preview layer"}),arguments:{VIDEO_STATE:{type:I.NUMBER,menu:"VIDEO_STATE",defaultValue:T.ON}}},{opcode:"setVideoTransparency",text:g({id:"videoSensing.setVideoTransparency",default:"set video transparency to [TRANSPARENCY]",description:"Controls transparency of the video preview layer"}),arguments:{TRANSPARENCY:{type:I.NUMBER,defaultValue:50}}}],menus:{ATTRIBUTE:{acceptReporters:!0,items:this._buildMenu(this.ATTRIBUTE_INFO)},SUBJECT:{acceptReporters:!0,items:this._buildMenu(this.SUBJECT_INFO)},VIDEO_STATE:{acceptReporters:!0,items:this._buildMenu(this.VIDEO_STATE_INFO)}}}}_analyzeLocalMotion(e){var i=this.runtime.renderer._allDrawables[e.drawableID],e=this._getMotionState(e);return this.detect.getLocalMotion(i,e),e}videoOn(e,i){this.detect.analyzeFrame();let t=this.detect;return e.SUBJECT===r.SPRITE&&(t=this._analyzeLocalMotion(i.target)),e.ATTRIBUTE===N.MOTION?t.motionAmount:t.motionDirection}whenMotionGreaterThan(e,i){return this.detect.analyzeFrame(),this._analyzeLocalMotion(i.target).motionAmount>Number(e.REFERENCE)}videoToggle(e){e=e.VIDEO_STATE,(this.globalVideoState=e)===T.OFF?this.runtime.ioDevices.video.disableVideo():(this.runtime.ioDevices.video.enableVideo(),this.runtime.ioDevices.video.mirror=e===T.ON),this.runtime.emit("videoSensing.state",e)}setVideoTransparency(e){e=s.toNumber(e.TRANSPARENCY),this.globalVideoTransparency=e,this.runtime.ioDevices.video.setPreviewGhost(e)}}))})(Scratch,require);