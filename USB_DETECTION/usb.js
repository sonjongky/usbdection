var usb = require('usb');
var device = usb.findByIds(0, 14373);
device.close();