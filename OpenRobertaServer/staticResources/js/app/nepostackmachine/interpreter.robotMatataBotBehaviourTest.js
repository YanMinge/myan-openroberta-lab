var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./interpreter.aRobotBehaviour", "./interpreter.constants", "./interpreter.util"], function (require, exports, interpreter_aRobotBehaviour_1, C, U) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RobotMatataBotBehaviourTest = (function (_super) {
        __extends(RobotMatataBotBehaviourTest, _super);
        function RobotMatataBotBehaviourTest(opLog, debug) {
            var _this = _super.call(this) || this;
            _this.timers = {};
            _this.timers['start'] = Date.now();
            U.loggingEnabled(opLog, debug);
            return _this;
        }
        RobotMatataBotBehaviourTest.prototype.clearDisplay = function () {
            U.debug('clear display');
        };
        RobotMatataBotBehaviourTest.prototype.getSample = function (s, name, sensor, port, mode) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            U.debug(robotText + ' getsample from ' + sensor);
            switch (sensor) {
                case "infrared":
                    s.push(5);
                    break;
                case "gyro":
                    s.push(3);
                    break;
                case "buttons":
                    s.push(true);
                    break;
                case C.TIMER:
                    s.push(this.timerGet(port));
                    break;
                default:
                    throw 'invalid get sample for ' + name + ' - ' + port + ' - ' + sensor + ' - ' + mode;
            }
        };
        RobotMatataBotBehaviourTest.prototype.timerReset = function (port) {
            this.timers[port] = Date.now();
            U.debug('timerReset for ' + port);
        };
        RobotMatataBotBehaviourTest.prototype.timerGet = function (port) {
            var now = Date.now();
            var startTime = this.timers[port];
            if (startTime === undefined) {
                startTime = this.timers['start'];
            }
            var delta = now - startTime;
            U.debug('timerGet for ' + port + ' returned ' + delta);
            return delta;
        };
        RobotMatataBotBehaviourTest.prototype.ledOnAction = function (name, port, color) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            U.info(robotText + ' led on color ' + color);
        };
        RobotMatataBotBehaviourTest.prototype.statusLightOffAction = function (name, port) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            U.info(robotText + ' led off');
        };
        RobotMatataBotBehaviourTest.prototype.toneAction = function (name, frequency, duration) {
            var robotText = 'robot: ' + name;
            U.info(robotText + ' piezo: ' + ', frequency: ' + frequency + ', duration: ' + duration);
            return duration;
        };
        RobotMatataBotBehaviourTest.prototype.motorOnAction = function (name, port, duration, speed) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            var durText = duration === undefined ? ' w.o. duration' : (' for ' + duration + ' msec');
            U.info(robotText + ' motor speed ' + speed + durText);
            return 0;
        };
        RobotMatataBotBehaviourTest.prototype.motorStopAction = function (name, port) {
            var robotText = 'robot: ' + name + ', port: ' + port;
            U.info(robotText + ' motor stop');
        };
        RobotMatataBotBehaviourTest.prototype.showTextAction = function (text) {
            var showText = "" + text;
            U.info('show "' + showText + '"');
            return 0;
        };
        RobotMatataBotBehaviourTest.prototype.writePinAction = function (_pin, _mode, _value) {
        };
        RobotMatataBotBehaviourTest.prototype.showImageAction = function (_1, _2) {
            U.info('show image NYI');
            return 0;
        };
        RobotMatataBotBehaviourTest.prototype.displaySetBrightnessAction = function (_value) {
            return 0;
        };
        RobotMatataBotBehaviourTest.prototype.displaySetPixelAction = function (_x, _y, _brightness) {
            return 0;
        };
        RobotMatataBotBehaviourTest.prototype.close = function () {
            // CI implementation. No real robot. No motor off, etc.
        };
        RobotMatataBotBehaviourTest.prototype.encoderReset = function (_port) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.gyroReset = function (_port) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.lightAction = function (_mode, _color, _port) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.playFileAction = function (_file) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype._setVolumeAction = function (_volume) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype._getVolumeAction = function (_s) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.setLanguage = function (_language) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.sayTextAction = function (_text, _speed, _pitch) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.getMotorSpeed = function (_s, _name, _port) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.setMotorSpeed = function (_name, _port, _speed) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.driveStop = function (_name) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.driveAction = function (_name, _direction, _speed, _distance) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.curveAction = function (_name, _direction, _speedL, _speedR, _distance) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.turnAction = function (_name, _direction, _speed, _angle) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.showTextActionPosition = function (_text, _x, _y) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.displaySetPixelBrightnessAction = function (_x, _y, _brightness) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.displayGetPixelBrightnessAction = function (_s, _x, _y) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.setVolumeAction = function (_volume) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.getVolumeAction = function (_s) {
            throw new Error("Method not implemented.");
        };
        RobotMatataBotBehaviourTest.prototype.debugAction = function (_value) {
            var robotText = "> " + _value;
            U.info(' debug action ' + robotText);
        };
        RobotMatataBotBehaviourTest.prototype.assertAction = function (_msg, _left, _op, _right, _value) {
            var robotText = "> Assertion failed: " + _msg + " " + _left + " " + _op + " " + _right;
            U.info(' assert action ' + robotText);
        };
        return RobotMatataBotBehaviourTest;
    }(interpreter_aRobotBehaviour_1.ARobotBehaviour));
    exports.RobotMatataBotBehaviourTest = RobotMatataBotBehaviourTest;
});
