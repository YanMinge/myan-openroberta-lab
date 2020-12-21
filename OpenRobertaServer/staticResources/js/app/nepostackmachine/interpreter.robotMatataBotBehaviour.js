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
define(["require", "exports", "./interpreter.aRobotBehaviour", "./interpreter.util"], function (require, exports, interpreter_aRobotBehaviour_1, U) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RobotMatataBotBehaviour = (function (_super) {
        __extends(RobotMatataBotBehaviour, _super);
        function RobotMatataBotBehaviour(btInterfaceFct, toDisplayFct) {
            var _this = _super.call(this) || this;
            _this.matatabot = {};
            _this.btInterfaceFct = btInterfaceFct;
            _this.toDisplayFct = toDisplayFct;
            _this.timers = {};
            _this.timers['start'] = Date.now();
            _this.commandSyncFlag = {
                motionForwardStepFlag: false,
                motionBackwardStepFlag: false
            };
            U.loggingEnabled(true, true);
            return _this;
        }
        RobotMatataBotBehaviour.prototype.update = function (data) {
            U.info('update type:' + data.type + ' state:' + data.state + ' brickid:' + data.brickid);
            U.debug('update type:' + data.type + ' state:' + data.state + ' brickid:' + data.brickid);
            if (data.target !== "matatabot") {
                return;
            }
            switch (data.type) {
                case "connect":
                    if (data.state == "connected") {
                        this.matatabot[data.brickid] = {};
                        this.matatabot[data.brickid]["brickname"] = data.brickname.replace(/\s/g, '').toUpperCase();
                        // for some reason we do not get the inital state of the button, so here it is hardcoded
                    }
                    else if (data.state == "disconnected") {
                        delete this.matatabot[data.brickid];
                    }
                    break;
                case "commandResponse":
                    if (data.state == "motionForwardStep") {
                        this.commandSyncFlag.motionForwardStepFlag = false;
                    }
                    else if (data.state == "motionBackwardStep") {
                        this.commandSyncFlag.motionBackwardStepFlag = false;
                    }
                    break;
                default:
                    // TODO think about what could happen here.
                    break;
            }
            U.info(this.matatabot);
        };
        RobotMatataBotBehaviour.prototype.getConnectedBricks = function () {
            var brickids = [];
            for (var brickid in this.matatabot) {
                if (this.matatabot.hasOwnProperty(brickid)) {
                    brickids.push(brickid);
                }
            }
            return brickids;
        };
        RobotMatataBotBehaviour.prototype.getBrickIdByName = function (name) {
            for (var brickid in this.matatabot) {
                if (this.matatabot.hasOwnProperty(brickid)) {
                    if (this.matatabot[brickid].brickname === name.toUpperCase()) {
                        return brickid;
                    }
                }
            }
            return null;
        };
        RobotMatataBotBehaviour.prototype.getBrickById = function (id) {
            return this.matatabot[id];
        };
        RobotMatataBotBehaviour.prototype.close = function () {
            var ids = this.getConnectedBricks();
            for (var id in ids) {
                if (ids.hasOwnProperty(id)) {
                    var name = this.getBrickById(ids[id]).brickname;
                }
            }
        };
        RobotMatataBotBehaviour.prototype.matatabotMotionForwardStep = function (name, steps) {
            var _this = this;
            var brickid = this.getBrickIdByName(name);
            var robotText = 'robot: ' + name + ', steps: ' + steps;
            U.debug(robotText + ' matatabotMotionForwardStep');
            U.info(robotText + brickid);
            var cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionForwardStep', 'step': steps };
            this.commandSyncFlag.motionForwardStepFlag = true;
            this.btInterfaceFct(cmd);
            var count = 0;
            var interval = setInterval(function () {
                if (count > 6000) {
                    console.log('matatabotMotionForwardStep timeout!');
                    _this.commandSyncFlag.motionForwardStepFlag = false;
                    clearInterval(interval);
                    return 0;
                }
                else if (_this.commandSyncFlag.motionForwardStepFlag == false) {
                    clearInterval(interval);
                    return 0;
                }
                count += 10;
            }, 10);
        };
        RobotMatataBotBehaviour.prototype.matatabotMotionBackwardStep = function (name, steps) {
            var _this = this;
            var brickid = this.getBrickIdByName(name);
            var robotText = 'robot: ' + name + ', steps: ' + steps;
            U.debug(robotText + ' matatabotMotionBackwardStep');
            U.info(robotText + brickid);
            var cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionBackwardStep', 'step': steps };
            this.commandSyncFlag.motionBackwardStepFlag = true;
            this.btInterfaceFct(cmd);
            var count = 0;
            var interval = setInterval(function () {
                if (count > 6000) {
                    console.log('matatabotMotionBackwardStep timeout!');
                    _this.commandSyncFlag.motionBackwardStepFlag = false;
                    clearInterval(interval);
                    return 0;
                }
                else if (_this.commandSyncFlag.motionBackwardStepFlag == false) {
                    clearInterval(interval);
                    return 0;
                }
                count += 10;
            }, 10);
        };
        RobotMatataBotBehaviour.prototype.matatabotMotionTurnLeftAngle = function (name, angle) {
            var brickid = this.getBrickIdByName(name);
            var robotText = 'robot: ' + name + ', angle: ' + angle;
            U.debug(robotText + ' matatabotMotionTurnLeftAngle');
            U.info(robotText + brickid);
            var cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionTurnLeftAngle', 'angle': angle };
            this.btInterfaceFct(cmd);
        };
        RobotMatataBotBehaviour.prototype.matatabotMotionTurnRightAngle = function (name, angle) {
            var brickid = this.getBrickIdByName(name);
            var robotText = 'robot: ' + name + ', angle: ' + angle;
            U.debug(robotText + ' matatabotMotionTurnRightAngle');
            U.info(robotText + brickid);
            var cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionTurnRightAngle', 'angle': angle };
            this.btInterfaceFct(cmd);
        };
        RobotMatataBotBehaviour.prototype.matatabotMotionMoving = function (name, position) {
            var brickid = this.getBrickIdByName(name);
            var robotText = 'robot: ' + name + ', position: ' + position;
            U.debug(robotText + ' matatabotMotionMoving');
            U.info(robotText + brickid);
            var cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionMoving', 'position': position };
            this.btInterfaceFct(cmd);
        };
        return RobotMatataBotBehaviour;
    }(interpreter_aRobotBehaviour_1.ARobotBehaviour));
    exports.RobotMatataBotBehaviour = RobotMatataBotBehaviour;
});
