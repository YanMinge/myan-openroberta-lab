package de.fhg.iais.roberta.visitor.hardware;

import de.fhg.iais.roberta.syntax.action.MatataBotMotionForwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionBackwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnLeftAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnRightAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionMoving;
import de.fhg.iais.roberta.util.dbc.DbcException;

public interface IMatataBotVisitor<V> extends IMatataBotMotionVisitor<V> {

    @Override
    default V visitMotionForwardStep(MatataBotMotionForwardStep<V> matataBotMotionForwardStep) {
        throw new DbcException("operation not supported");
    }

    @Override
    default V visitMotionBackwardStep(MatataBotMotionBackwardStep<V> matataBotMotionBackwardStep) {
        throw new DbcException("operation not supported");
    }

    @Override
    default V visitMotionTurnLeftAngle(MatataBotMotionTurnLeftAngle<V> matataBotMotionTurnLeftAngle) {
        throw new DbcException("operation not supported");
    }

    @Override
    default V visitMotionTurnRightAngle(MatataBotMotionTurnRightAngle<V> matataBotMotionTurnRightAngle) {
        throw new DbcException("operation not supported");
    }

    @Override
    default V visitMotionMoving(MatataBotMotionMoving<V> matataBotMotionMoving) {
        throw new DbcException("operation not supported");
    }
}
