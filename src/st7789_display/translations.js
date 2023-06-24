(function (Scratch) {
    Scratch.export({
        en: {
            'st7789Display.name': 'ST7789 Display',
            'st7789Display.setSPI': 'set SPI bus [BUS] and SCK [SCK] MOSI [MOSI]',
            'st7789Display.setPins': 'set control pins DC [DC] CS [CS] reset [RST] and backlight [BL]',
            'st7789Display.setResolution': 'set display width [WIDTH] and height [HEIGHT]',
            'st7789Display.setRotation': 'set display rotation [ROTATION]',
            'st7789Display.setBacklight': 'set display backlight [STATE]',
            'st7789Display.rotationUp': 'up',
            'st7789Display.rotationLeft': 'left',
            'st7789Display.rotationDown': 'down',
            'st7789Display.rotationRight': 'right',
            'st7789Display.on': 'on',
            'st7789Display.off': 'off',
            'st7789Display.setMode': 'set display mode [MODE]',
            'st7789Display.direct': 'direct',
            'st7789Display.buffer': 'buffer',
            'st7789Display.displayBuffer': 'display buffer',
            'st7789Display.clearScreen': 'clear screen',
            'st7789Display.fillScreen': 'set screen color to [COLOR]',
            'st7789Display.setPixel': 'set pixel x: [X] y: [Y] color to [COLOR]',
            'st7789Display.setColor': 'set pen color to [COLOR]',
            'st7789Display.setFillColor': 'set fill color to [COLOR]',
            'st7789Display.drawLine': 'draw line from x1: [X1] y: [Y1] to x2: [X2] y2: [Y2]',
            'st7789Display.drawRect': 'draw rectangle at x: [X] y: [Y] of width: [WIDTH] height: [HEIGHT]',
            'st7789Display.fillRect': 'fill rectangle at x: [X] y: [Y] of width: [WIDTH] height: [HEIGHT]',
            'st7789Display.drawCircle': 'draw circle at x: [X] y: [Y] of radius: [R]',
            'st7789Display.fillCircle': 'fill circle at x: [X] y: [Y] of radius: [R]',
            'st7789Display.drawRoundRect': 'draw round rectangle at x: [X] y: [Y] of width: [WIDTH] height: [HEIGHT] and radius: [R]',
            'st7789Display.fillRoundRect': 'fill round rectangle at x: [X] y: [Y] of width: [WIDTH] height: [HEIGHT] and radius: [R]',
            'st7789Display.drawImage': 'draw image [IMAGE] at x: [X] y: [Y] size to [SIZE] and flip [FLIP]',
            'st7789Display.flip.side': 'side to side',
            'st7789Display.flip.updown': 'turn upside down',
            'st7789Display.flip.rotate': 'rotate 180',
            'st7789Display.none': 'none',
            'st7789Display.initialGallery': 'initial pixel gallery [GALLERY] with transparent [COLOR]',
            'st7789Display.getWidth': 'display width',
            'st7789Display.getHeight': 'display height',
        },
        'zh-cn': {
            'st7789Display.name': 'ST7789 显示屏',
            'st7789Display.setSPI': '将 SPI 总线设为 [BUS] 引脚设为 SCK [SCK] MOSI [MOSI]',
            'st7789Display.setPins': '将控制引脚设为 DC [DC] CS [CS] RST [RST] BL [BL]',
            'st7789Display.setResolution': '将显示宽设为 [WIDTH] 高设为 [HEIGHT]',
            'st7789Display.setRotation': '将显示方向设为 [ROTATION]',
            'st7789Display.rotationUp': '向上',
            'st7789Display.rotationLeft': '向左',
            'st7789Display.rotationDown': '向下',
            'st7789Display.rotationRight': '向右',
            'st7789Display.setBacklight': '将背光设为 [STATE]',
            'st7789Display.on': '开启',
            'st7789Display.off': '关闭',
            'st7789Display.setMode': '将显示模式设为 [MODE]',
            'st7789Display.direct': '直接显示',
            'st7789Display.buffer': '缓存更新',
            'st7789Display.displayBuffer': '更新显示',
            'st7789Display.clearScreen': '清除屏幕',
            'st7789Display.fillScreen': '将屏幕颜色设为 [COLOR]',
            'st7789Display.setPixel': '将像素点 x: [X] y: [Y] 的颜色设为 [COLOR]',
            'st7789Display.setColor': '将画笔颜色设为 [COLOR]',
            'st7789Display.setFillColor': '将填充颜色设为 [COLOR]',
            'st7789Display.drawLine': '从 x1: [X1] y1: [Y1] 到 x2: [X2] y2: [Y2] 画线',
            'st7789Display.drawRect': '在 x: [X] y: [Y] 画宽 [WIDTH] 高 [HEIGHT] 的矩形',
            'st7789Display.fillRect': '在 x: [X] y: [Y] 填充宽 [WIDTH] 高 [HEIGHT] 的矩形',
            'st7789Display.drawCircle': '在 x: [X] y: [Y] 画半径 [R] 的圆',
            'st7789Display.fillCircle': '在 x: [X] y: [Y] 填充半径 [R] 的圆',
            'st7789Display.drawRoundRect': '在 x: [X] y: [Y] 画宽 [WIDTH] 高 [HEIGHT] 半径 [R] 的圆角矩形',
            'st7789Display.fillRoundRect': '在 x: [X] y: [Y] 填充宽 [WIDTH] 高 [HEIGHT] 半径 [R] 的圆角矩形',
            'st7789Display.drawImage': '在 x: [X] y: [Y] 画大小为 [SIZE] % 的图 [IMAGE] 并翻转 [FLIP]',
            'st7789Display.flip.side': '左右翻转',
            'st7789Display.flip.updown': '上下翻转',
            'st7789Display.flip.rotate': '旋转180',
            'st7789Display.none': '无',
            'st7789Display.initialGallery': '初始化像素图库 [GALLERY] 并将透明色设为 [COLOR]',
            'st7789Display.getWidth': '显示屏宽',
            'st7789Display.getHeight': '显示屏高',
        },
        'zh-tw': {
            'st7789Display.name': 'ST7789 顯示屏',
            'st7789Display.setSPI': '將 SPI 總線設為 [BUS] 引腳設為 SCK [SCK] MOSI [MOSI]',
            'st7789Display.setPins': '將控制引腳設為 DC [DC] CS [CS] RST [RST] BL [BL]',
            'st7789Display.setResolution': '將顯示寬設為 [WIDTH] 高設為 [HEIGHT]',
            'st7789Display.setRotation': '將顯示方向設為 [ROTATION]',
            'st7789Display.rotationUp': '朝上',
            'st7789Display.rotationLeft': '朝左',
            'st7789Display.rotationDown': '朝下',
            'st7789Display.rotationRight': '朝右',
            'st7789Display.setBacklight': '將背光設為 [STATE]',
            'st7789Display.on': '開啟',
            'st7789Display.off': '關閉',
            'st7789Display.setMode': '將顯示模式設為 [MODE]',
            'st7789Display.direct': '直接顯示',
            'st7789Display.buffer': '緩存更新',
            'st7789Display.displayBuffer': '更新顯示',
            'st7789Display.clearScreen': '清除屏幕',
            'st7789Display.fillScreen': '將屏幕顏色設為 [COLOR]',
            'st7789Display.setPixel': '將像素點 x: [X] y: [Y] 的顏色設為 [COLOR]',
            'st7789Display.setColor': '將畫筆顏色設為 [COLOR]',
            'st7789Display.setFillColor': '將填充顏色設為 [COLOR]',
            'st7789Display.drawLine': '從 x1: [X1] y1: [Y1] 到 x2: [X2] y2: [Y2] 畫線',
            'st7789Display.drawRect': '在 x: [X] y: [Y] 畫寬 [WIDTH] 高 [HEIGHT] 的矩形',
            'st7789Display.fillRect': '在 x: [X] y: [Y] 填充寬 [WIDTH] 高 [HEIGHT] 的矩形',
            'st7789Display.drawCircle': '在 x: [X] y: [Y] 畫半徑 [R] 的圓',
            'st7789Display.fillCircle': '在 x: [X] y: [Y] 填充半徑 [R] 的圓',
            'st7789Display.drawRoundRect': '在 x: [X] y: [Y] 畫寬 [WIDTH] 高 [HEIGHT] 半徑 [R] 的圓角矩形',
            'st7789Display.fillRoundRect': '在 x: [X] y: [Y] 填充寬 [WIDTH] 高 [HEIGHT] 半徑 [R] 的圓角矩形',
            'st7789Display.drawImage': '在 x: [X] y: [Y] 畫大小為 [SIZE] % 的圖 [IMAGE] 並翻轉 [FLIP]',
            'st7789Display.flip.side': '左右翻轉',
            'st7789Display.flip.updown': '上下翻轉',
            'st7789Display.flip.rotate': '旋轉180',
            'st7789Display.none': '無',
            'st7789Display.initialGallery': '初始化像素圖庫 [GALLERY] 並將透明色設為 [COLOR]',
            'st7789Display.getWidth': '顯示屏寬',
            'st7789Display.getHeight': '顯示屏高',
        },
    });
})(window.Scratch);
