package de.fhg.iais.roberta.visitor;

import java.util.List;

import org.json.JSONObject;

import de.fhg.iais.roberta.bean.UsedHardwareBean;
import de.fhg.iais.roberta.components.ConfigurationAst;
import de.fhg.iais.roberta.inter.mode.action.IMatataBotMotionStep;
import de.fhg.iais.roberta.inter.mode.action.IMatataBotMotionAngle;
import de.fhg.iais.roberta.syntax.Phrase;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionForwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionBackwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnLeftAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnRightAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionMoving;
import de.fhg.iais.roberta.syntax.sensor.generic.TimerSensor;
import de.fhg.iais.roberta.util.dbc.DbcException;
import de.fhg.iais.roberta.visitor.hardware.IMatataBotVisitor;
import de.fhg.iais.roberta.visitor.lang.codegen.AbstractStackMachineVisitor;

public final class MatataBotStackMachineVisitor<V> extends AbstractStackMachineVisitor<V> implements IMatataBotVisitor<V> {

    public MatataBotStackMachineVisitor(UsedHardwareBean usedHardwareBean, ConfigurationAst configuration, List<List<Phrase<Void>>> phrases) {
        super(configuration);
    }

    @Override
    protected V app(JSONObject o) {
        this.getOpArray().add(o);
        return null;
    }

    @Override
    protected JSONObject mk(String opCode, Phrase<V> phrase) {
        return super.mk(opCode);
    }

    @Override
    public V visitTimerSensor(TimerSensor<V> timerSensor) {
        JSONObject o;
        switch ( timerSensor.getMode() ) {
            case "DEFAULT":
            case "VALUE":
                o = mk(C.GET_SAMPLE).put(C.GET_SAMPLE, C.TIMER).put(C.PORT, timerSensor.getPort());
                break;
            case "RESET":
                o = mk(C.TIMER_SENSOR_RESET).put(C.PORT, timerSensor.getPort());
                break;
            default:
                throw new DbcException("Invalid Timer Mode " + timerSensor.getMode());
        }
        return app(o);
    }

    @Override
    public V visitMotionForwardStep(MatataBotMotionForwardStep<V> matataBotMotionForwardStep) {
        IMatataBotMotionStep ForwardStep = matataBotMotionForwardStep.getSteps();
        if ( ForwardStep != null ) {
            JSONObject o = mk(C.MATATABOT_MOTION_FORWARD_STEP).put(C.NAME, "matatabot").put(C.STEP, ForwardStep);
            return app(o);
        } else {
            throw new DbcException("No robot name or no port");
        }
    }

    @Override
    public V visitMotionBackwardStep(MatataBotMotionBackwardStep<V> matataBotMotionBackwardStep) {
        IMatataBotMotionStep BackwardStep = matataBotMotionBackwardStep.getSteps();
        if ( BackwardStep != null ) {
            JSONObject o = mk(C.MATATABOT_MOTION_BACKWARD_STEP).put(C.NAME, "matatabot").put(C.STEP, BackwardStep);
            return app(o);
        } else {
            throw new DbcException("No robot name or no port");
        }
    }

    @Override
    public V visitMotionTurnLeftAngle(MatataBotMotionTurnLeftAngle<V> matataBotMotionTurnLeftAngle) {
        IMatataBotMotionAngle LeftAngle = matataBotMotionTurnLeftAngle.getAngle();
        if ( LeftAngle != null ) {
            JSONObject o = mk(C.MATATABOT_MOTION_TURN_LEFT_ANGLE).put(C.NAME, "matatabot").put(C.ANGLE, LeftAngle);
            return app(o);
        } else {
            throw new DbcException("No robot name or no port");
        }
    }

    @Override
    public V visitMotionTurnRightAngle(MatataBotMotionTurnRightAngle<V> matataBotMotionTurnRightAngle) {
        IMatataBotMotionAngle RightAngle = matataBotMotionTurnRightAngle.getAngle();
        if ( RightAngle != null ) {
            JSONObject o = mk(C.MATATABOT_MOTION_TURN_RIGHT_ANGLE).put(C.NAME, "matatabot").put(C.ANGLE, RightAngle);
            return app(o);
        } else {
            throw new DbcException("No robot name or no port");
        }
    }

    @Override
    public V visitMotionMoving(MatataBotMotionMoving<V> matataBotMotionMoving)  {
        if (matataBotMotionMoving.getDistance() != null) {
            matataBotMotionMoving.getDistance().accept(this);
            JSONObject o = mk(C.MATATABOT_MOTION_MOVING).put(C.NAME, "matatabot");
            return app(o);
        } else {
            throw new DbcException("No robot name or no port");
        }
    }
}
