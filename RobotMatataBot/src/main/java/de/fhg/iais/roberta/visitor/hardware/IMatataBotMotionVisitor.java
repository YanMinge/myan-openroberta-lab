package de.fhg.iais.roberta.visitor.hardware;

import de.fhg.iais.roberta.syntax.action.MatataBotMotionForwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionBackwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnLeftAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnRightAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionMoving;

public interface IMatataBotMotionVisitor<V> extends IHardwareVisitor<V> {

    V visitMotionForwardStep(MatataBotMotionForwardStep<V> matataBotMotionForwardStep);
    V visitMotionBackwardStep(MatataBotMotionBackwardStep<V> matataBotMotionBackwardStep);
    V visitMotionTurnLeftAngle(MatataBotMotionTurnLeftAngle<V> matataBotMotionTurnLeftAngle);
    V visitMotionTurnRightAngle(MatataBotMotionTurnRightAngle<V> matataBotMotionTurnRightAngle);
    V visitMotionMoving(MatataBotMotionMoving<V> matataBotMotionMoving);
}