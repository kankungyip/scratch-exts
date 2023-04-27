const{ArgumentType,BlockType}=Scratch,blockIconURI="data:image/png;base64,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",TOKEN_URL="https://aip.baidubce.com/oauth/2.0/token",DETECT_URL="https://aip.baidubce.com/rest/2.0/face/v3/detect";class FaceSensingBlocks{static get EXTENSION_ID(){return"faceSensing"}constructor(){this.apikey="",this.secret="",this.dataURI="",Scratch.emitter.on("videoSensing.frame",this._setVideoFrame.bind(this))}getInfo(){return{id:FaceSensingBlocks.EXTENSION_ID,name:formatMessage({id:"faceSensing.name",default:"Face Sensing"}),blockIconURI:blockIconURI,docsURI:new URL(`./readme.${locale}.html`,require.baseurl).href,blocks:[{opcode:"whenFaceDetected",text:formatMessage({id:"faceSensing.whenFaceDetected",default:"when a face is detected"}),blockType:BlockType.HAT},{opcode:"isFaceDetected",text:formatMessage({id:"faceSensing.isFaceDetected",default:"a face is detected?"}),blockType:BlockType.BOOLEAN},"---",{opcode:"getXPosition",text:formatMessage({id:"faceSensing.xPosition",default:"face x position"}),blockType:BlockType.REPORTER,disableMonitor:!0},{opcode:"getYPosition",text:formatMessage({id:"faceSensing.yPosition",default:"face y position"}),blockType:BlockType.REPORTER,disableMonitor:!0},{opcode:"getSize",text:formatMessage({id:"faceSensing.size",default:"face size"}),blockType:BlockType.REPORTER,disableMonitor:!0},"---",{opcode:"getTile",text:formatMessage({id:"faceSensing.tile",default:"face tile"}),blockType:BlockType.REPORTER,disableMonitor:!0},{opcode:"getYaw",text:formatMessage({id:"faceSensing.yaw",default:"face yaw"}),blockType:BlockType.REPORTER,disableMonitor:!0},{opcode:"getPitch",text:formatMessage({id:"faceSensing.pitch",default:"face pitch"}),blockType:BlockType.REPORTER,disableMonitor:!0},"---"]}}_setVideoFrame(e){this.dataURI=e||""}async _getToken(){var e=await Scratch.getToken(FaceSensingBlocks.EXTENSION_ID);this.apikey=e.apikey,this.secret=e.secret}whenFaceDetected(){}isFaceDetected(){}}Scratch.extensions.register(new FaceSensingBlocks),formatMessage.setup({translations:{en:{"faceSensing.name":"Face Sensing"},"zh-cn":{"faceSensing.name":"人脸侦测"},"zh-tw":{"faceSensing.name":"人臉偵測"}}});