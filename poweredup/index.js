(async function(A,e){var t=await e("../legoble/ble-base-blocks.js");const n=await e("../legoble/hub.js"),o=A.formatMessage;class g extends t{static get EXTENSION_ID(){return"poweredup"}constructor(){super(new n(A.vm.runtime,g.EXTENSION_ID,65))}get externalPorts(){return["A","B"]}get multipleExternalPorts(){return["A","B","A+B"]}get hasInternalTiltSensorBlocks(){return!1}getInfo(){return{id:g.EXTENSION_ID,name:"Powered UP",extensionURL:g.extensionURL,blockIconURI:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAAByElEQVR4Ae3YP07DMBiG8QS4ACdBYmQtlwCmzhwAkICFSvzZmZkoCxyBlZ2TcIOEtJKrqlL6fGlqCdonS9y88WfnV0eWUhQeCiiggAIKKKCAAgoooIACCiiggAIKKKCAAgoooIACCiiQV6DsUv728W1QVfWwLIvduiw/Rhcn75P+m3o9YrMXuSndU9XVU9M+rOuiaOSPm/YUcFOvp+dedsYVeH3/2nBt7zG6OltqtLO9NOt58vArfHd5up4RF6rcPIynV3LVXxgu/DPNizqEASeFIkUTRJd7aZJ/OfcV7vnvdFqBaayjg/3UnJ2/vn9m7flGl3vn+/2X9tIdZvIQ7sLuwlkXc/gVPh8Oskzk+eVzWjdX/VUnneZF/d1ESAhyAQGIYgFJCHIBAYhiAUkIcgEBiGIBSQhyAQGIYgFJCHIBAYhiAUkIcgEBiGIBSQhyAQGIYgFJCPLw98Do9zEYrzXOXb914J6BK7AnYHgF5vpinFZervqr+qR5UX9XIAlBLiAAUSwgCUEuIABRLCAJQR7ehaO7EozXGueu3zpwz8AV2BPQ7goooIACCiiggAIKKKCAAgoooIACCiiggAIKKKCAAgookFvgF1zdypav+pVRAAAAAElFTkSuQmCC",showStatusButton:!0,blocks:this.getBlocks(o),menus:this.getMenus(o)}}}A.extensions.register(new g)})(Scratch,require);