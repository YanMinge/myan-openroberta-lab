import { ARobotBehaviour } from "./interpreter.aRobotBehaviour";
import { State } from "./interpreter.state";
import * as C from "./interpreter.constants";
import * as U from "./interpreter.util";

export class RobotMatataBotBehaviour extends ARobotBehaviour {
    private btInterfaceFct;
    private toDisplayFct;
    private timers;
    private commandSyncFlag;
    private matatabot = {};

    constructor( btInterfaceFct: any, toDisplayFct: any ) {
        super();
        this.btInterfaceFct = btInterfaceFct;
        this.toDisplayFct = toDisplayFct;
        this.timers = {};
        this.timers['start'] = Date.now();
        this.commandSyncFlag = {
            motionForwardStepFlag: false,
            motionBackwardStepFlag: false
        };

        U.loggingEnabled( true, true );
    }

    public update( data ) {
        U.info( 'update type:' + data.type + ' state:' + data.state + ' brickid:' + data.brickid );
        U.debug( 'update type:' + data.type + ' state:' + data.state + ' brickid:' + data.brickid );
        if ( data.target !== "matatabot" ) {
            return;
        }
        switch ( data.type ) {
            case "connect":
                if ( data.state == "connected" ) {
                    this.matatabot[data.brickid] = {};
                    this.matatabot[data.brickid]["brickname"] = data.brickname.replace( /\s/g, '' ).toUpperCase();
                    // for some reason we do not get the inital state of the button, so here it is hardcoded
                } else if ( data.state == "disconnected" ) {
                    delete this.matatabot[data.brickid];
                }
                break;
            case "commandResponse":
                if (data.state == "motionForwardStep") {
                    this.commandSyncFlag.motionForwardStepFlag = false;
                }
                else  if (data.state == "motionBackwardStep") {
                    this.commandSyncFlag.motionBackwardStepFlag = false;
                }
                break;
            default:
                // TODO think about what could happen here.
                break;
        }
        U.info( this.matatabot );
    }

    public getConnectedBricks() {
        var brickids = [];
        for ( var brickid in this.matatabot ) {
            if ( this.matatabot.hasOwnProperty( brickid ) ) {
                brickids.push( brickid );
            }
        }
        return brickids;
    }

    public getBrickIdByName( name ) {
        for ( var brickid in this.matatabot ) {
            if ( this.matatabot.hasOwnProperty( brickid ) ) {
                if ( this.matatabot[brickid].brickname === name.toUpperCase() ) {
                    return brickid;
                }
            }
        }
        return null;
    }

    public getBrickById( id ) {
        return this.matatabot[id];
    }

    public close() {
        var ids = this.getConnectedBricks();
        for ( let id in ids ) {
            if ( ids.hasOwnProperty( id ) ) {
                var name = this.getBrickById( ids[id] ).brickname;
            }
        }
    }

    public matatabotMotionForwardStep( name: string, steps: string ) {
        var brickid = this.getBrickIdByName( name );
        const robotText = 'robot: ' + name + ', steps: ' + steps;
        U.debug( robotText + ' matatabotMotionForwardStep' );
        U.info(robotText + brickid);
        const cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionForwardStep', 'step': steps };
        this.commandSyncFlag.motionForwardStepFlag = true;
        this.btInterfaceFct( cmd );
        let count = 0;
        const interval = setInterval(() => {
            if (count > 6000) {
                console.log('matatabotMotionForwardStep timeout!');
                this.commandSyncFlag.motionForwardStepFlag = false;
                clearInterval(interval);
                return 0;
            } else if (this.commandSyncFlag.motionForwardStepFlag == false) {
                clearInterval(interval);
                return 0;
            }
            count += 10;
        }, 10);
    }
 
    public matatabotMotionBackwardStep( name: string, steps: string ) {
        var brickid = this.getBrickIdByName( name );
        const robotText = 'robot: ' + name + ', steps: ' + steps;
        U.debug( robotText + ' matatabotMotionBackwardStep' );
        U.info(robotText + brickid);
        const cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionBackwardStep', 'step': steps };
        this.commandSyncFlag.motionBackwardStepFlag = true;
        this.btInterfaceFct( cmd );
        let count = 0;
        const interval = setInterval(() => {
            if (count > 6000) {
                console.log('matatabotMotionBackwardStep timeout!');
                this.commandSyncFlag.motionBackwardStepFlag = false;
                clearInterval(interval);
                return 0;
            } else if (this.commandSyncFlag.motionBackwardStepFlag == false) {
                clearInterval(interval);
                return 0;
            }
            count += 10;
        }, 10);
    }
    
    public matatabotMotionTurnLeftAngle( name: string, angle: string ) {
        var brickid = this.getBrickIdByName( name );
        const robotText = 'robot: ' + name + ', angle: ' + angle;
        U.debug( robotText + ' matatabotMotionTurnLeftAngle' );
        U.info(robotText + brickid);
        const cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionTurnLeftAngle', 'angle': angle };
        this.btInterfaceFct( cmd );
    }
    
    public matatabotMotionTurnRightAngle( name: string, angle: string ) {
        var brickid = this.getBrickIdByName( name );
        const robotText = 'robot: ' + name + ', angle: ' + angle;
        U.debug( robotText + ' matatabotMotionTurnRightAngle' );
        U.info(robotText + brickid);
        const cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionTurnRightAngle', 'angle': angle };
        this.btInterfaceFct( cmd );
    }
    
    public matatabotMotionMoving( name: string, position: number ) {
        var brickid = this.getBrickIdByName( name );
        const robotText = 'robot: ' + name + ', position: ' + position;
        U.debug( robotText + ' matatabotMotionMoving' );
        U.info(robotText + brickid);
        const cmd = { 'target': 'matatabot', 'type': 'command', 'actuator': 'motor', 'brickid': brickid, 'action': 'motionMoving', 'position': position };
        this.btInterfaceFct( cmd );
    }
}
