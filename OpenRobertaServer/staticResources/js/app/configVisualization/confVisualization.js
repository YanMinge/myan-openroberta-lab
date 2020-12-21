var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
define(["require", "exports", "./wires", "./const.robots", "./robotBlock", "./port"], function (require, exports, wires_1, const_robots_1, robotBlock_1, port_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SEP = 2.5;
    var STROKE = 1.8;
    // fix for IE which does not have the remove function
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }
    var CircuitVisualization = (function () {
        function CircuitVisualization(workspace, dom) {
            var _this = this;
            this.scale = 1;
            this.handler = (function (event) {
                if (window.Blockly.dragMode_ == window.Blockly.DRAG_FREE || this.workspace.isScrolling) {
                    this.renderConnections();
                }
                if (this.workspace.scale !== this.scale) {
                    this.scale = this.workspace.scale;
                    this.renderConnections();
                }
            }).bind(this);
            this.clear = function () {
                while (_this.workspace.getAllBlocks().length) {
                    _this.workspace.getAllBlocks()[0].dispose();
                }
            };
            this.onChangeListener = function (event) {
                _this.renderConnections();
                if (!event.blockId) {
                    return;
                }
                var block = _this.workspace.getBlockById(event.blockId);
                if (event.type !== window.Blockly.Events.UI)
                    _this.renderBlockBackground(block);
                switch (event.type) {
                    case window.Blockly.Events.CREATE:
                        _this.createBlockPorts(block);
                        break;
                    case window.Blockly.Events.CHANGE:
                        _this.updateBlockPorts(block);
                        _this.updateConnections(block);
                        break;
                    case window.Blockly.Events.DELETE:
                        _this.deleteConnections(event.blockId);
                        if (block && block.ports) {
                            block.ports.forEach(function (port) { return port.element.remove(); });
                        }
                        break;
                }
            };
            this.updateBlockPorts = function (block) {
                var positionX = block.width + 4;
                block.ports.forEach(function (port) {
                    var position = port.position;
                    port.moveTo(__assign({}, position, { x: positionX }));
                });
                _this.connections = _this.connections.map(function (_a) {
                    var position = _a.position, others = __rest(_a, ["position"]);
                    if (others.blockId !== block.id) {
                        return __assign({ position: position }, others);
                    }
                    return __assign({ position: __assign({}, position, { x: positionX }) }, others);
                });
            };
            this.createBlockPorts = function (block) {
                block.ports = [];
                block.inputList.forEach(function (input, index) {
                    if (index === 0) {
                        if (_this.robot.getPortByName(block.confBlock)) {
                            _this.appendPortAndConnection(block, input.fieldRow[0].textElement_, name, block.confBlock);
                        }
                    }
                    else {
                        input.fieldRow.forEach(function (_a) {
                            var fieldGroup_ = _a.fieldGroup_, name = _a.name, value_ = _a.value_;
                            name = name || value_;
                            if (name) {
                                var connectedTo = _this.robot.getPortByName(block.confBlock + " " + value_) ? block.confBlock + " " + value_ : _this.robot.getPortByName(block.getFieldValue(name)) ? block.getFieldValue(name) : _this.robot.getPortByName(name) ? name : null;
                                if (connectedTo) {
                                    _this.appendPortAndConnection(block, fieldGroup_, name, connectedTo);
                                }
                            }
                        });
                    }
                });
            };
            this.appendPortAndConnection = function (block, svgElement, name, connectedTo) {
                var matrix = svgElement.transform.baseVal.getItem(0).matrix;
                var position = { x: block.width + 4, y: matrix.f + 6 };
                var port = new port_1.Port(block.getSvgRoot(), name, position);
                block.ports.push(port);
                var wireColor = wires_1.default.getColor(block, name);
                var wireSvg = window.Blockly.createSvgElement('path', {
                    'fill': 'none',
                    'stroke': wireColor,
                    'stroke-width': STROKE,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                }, _this.wireGroup);
                _this.connections.push({
                    blockId: block.id,
                    connectedTo: connectedTo,
                    name: name,
                    position: position,
                    wireSvg: wireSvg,
                });
            };
            this.updateConnections = function (block) {
                var connections = _this.connections.filter(function (connection) { return connection.blockId === block.id; });
                connections = connections.map(function (_a) {
                    var name = _a.name, others = __rest(_a, ["name"]);
                    return (__assign({ name: name }, others, { connectedTo: _this.robot.getPortByName(block.confBlock + " " + block.getFieldValue(name)) ? block.confBlock + " " + block.getFieldValue(name) : block.getFieldValue(name) || others.connectedTo }));
                });
                _this.connections = _this.connections.filter(function (connection) { return connection.blockId !== block.id; });
                _this.connections = _this.connections.concat(connections);
                _this.renderConnections();
            };
            this.deleteConnections = function (blockId) {
                _this.connections = _this.connections.filter(function (connection) {
                    if (connection.blockId === blockId) {
                        connection.wireSvg.remove();
                        return false;
                    }
                    return true;
                });
            };
            this.renderBlockBackground = function (block) {
                if (!block) {
                    return;
                }
                var newWidth = block.width + 16;
                var path = block.svgPath_.getAttribute('d');
                path = path.replace(block.width.toString(), newWidth.toString());
                block.svgPath_.setAttribute('d', path);
            };
            this.dom = dom;
            this.workspace = workspace;
            if (!(window.Blockly)) {
                throw new Error('Blockly required');
            }
            this.components = {};
            this.connections = [];
            this.currentRobot = this.workspace.device + "_" + this.workspace.subDevice;
            this.injectRobotBoard();
            this.workspace.addChangeListener(this.onChangeListener);
            this.wireGroup = window.Blockly.createSvgElement('g', {}, this.workspace.svgGroup_);
            document.getElementById("bricklyDiv").addEventListener('mousemove', this.handler);
            document.getElementById("bricklyDiv").addEventListener('click', this.handler);
            document.getElementById("bricklyDiv").addEventListener('touchmove', this.handler);
        }
        CircuitVisualization.domToWorkspace = function (dom, workspace) {
            var confVis = new CircuitVisualization(workspace, dom);
            return {
                dispose: confVis.dispose.bind(confVis),
                refresh: confVis.refresh.bind(confVis),
                resetRobot: confVis.reset.bind(confVis),
                getXml: confVis.getXml.bind(confVis),
            };
        };
        CircuitVisualization.isRobotVisualized = function (robotGroup, robot) {
            return const_robots_1.ROBOTS[robotGroup + "_" + robot] || const_robots_1.ROBOTS[robotGroup] !== undefined;
        };
        CircuitVisualization.prototype.reset = function () {
            var currentRobot = this.workspace.device + "_" + this.workspace.subDevice;
            if (currentRobot !== this.currentRobot) {
                this.currentRobot = currentRobot;
                this.dom = this.getXml();
                this.clear();
                this.injectRobotBoard();
            }
        };
        CircuitVisualization.prototype.refresh = function () {
            var _this = this;
            this.workspace.getAllBlocks().forEach(function (block) {
                _this.renderBlockBackground(block);
                _this.updateBlockPorts(block);
                _this.renderConnections();
            });
        };
        CircuitVisualization.prototype.dispose = function () {
            this.workspace.removeChangeListener(this.onChangeListener);
            document.getElementById("bricklyDiv").removeEventListener('mousemove', this.handler);
            document.getElementById("bricklyDiv").removeEventListener('touchmove', this.handler);
            document.getElementById("bricklyDiv").removeEventListener('click', this.handler);
            this.wireGroup.remove();
        };
        CircuitVisualization.prototype.getXml = function () {
            var xml = window.Blockly.Xml.workspaceToDom(this.workspace);
            xml.querySelector('block[type=robot]').parentNode.remove();
            return xml;
        };
        CircuitVisualization.prototype.injectRobotBoard = function () {
            if (this.robotXml) {
                this.robotXml.remove();
            }
            window.Blockly.Blocks['robot'] = robotBlock_1.createRobotBlock(this.currentRobot);
            var robotXml = "<instance x=\"250\" y=\"250\"><block type=\"robot\" id=\"robot\"></block></instance>";
            var oParser = new DOMParser();
            this.robotXml = oParser.parseFromString(robotXml, 'text/xml').firstChild;
            this.dom.appendChild(this.robotXml);
            window.Blockly.Xml.domToWorkspace(this.dom, this.workspace);
            this.robot = this.workspace.getBlockById('robot');
        };
        CircuitVisualization.prototype.renderConnections = function () {
            var _this = this;
            if (this.connections.length === 0) {
                return;
            }
            var robotPosition = this.robot.getRelativeToSurfaceXY();
            var matrix = this.workspace.getCanvas().transform.baseVal.getItem(0).matrix;
            this.connections.forEach(function (_a) {
                var blockId = _a.blockId, position = _a.position, connectedTo = _a.connectedTo, wireSvg = _a.wireSvg;
                var block = _this.workspace.getBlockById(blockId);
                if (!block) {
                    return;
                }
                var blockPosition = block.getRelativeToSurfaceXY();
                var origin = {
                    x: matrix.e + _this.workspace.scale * (blockPosition.x + position.x + SEP),
                    y: matrix.f + _this.workspace.scale * (blockPosition.y + position.y + SEP),
                };
                var robotConnection = _this.robot.getPortByName(connectedTo);
                if (!robotConnection) {
                    return;
                }
                var destination = {
                    x: matrix.e + _this.workspace.scale * (robotPosition.x + robotConnection.position.x + SEP),
                    y: matrix.f + _this.workspace.scale * (robotPosition.y + robotConnection.position.y + SEP),
                };
                var drawer = new wires_1.default(origin, destination);
                wireSvg.setAttribute('d', drawer.path);
                wireSvg.setAttribute('stroke-width', STROKE * _this.workspace.scale);
            });
        };
        return CircuitVisualization;
    }());
    exports.CircuitVisualization = CircuitVisualization;
});
