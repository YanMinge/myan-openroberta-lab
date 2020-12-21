package de.fhg.iais.roberta.visitor.collect;

import com.google.common.collect.ClassToInstanceMap;

import de.fhg.iais.roberta.bean.IProjectBean;
import de.fhg.iais.roberta.components.ConfigurationAst;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionForwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionBackwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnLeftAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnRightAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionMoving;
import de.fhg.iais.roberta.visitor.hardware.IMatataBotVisitor;

public class MatataBotUsedHardwareCollectorVisitor extends AbstractUsedHardwareCollectorVisitor implements IMatataBotVisitor<Void> {

    public MatataBotUsedHardwareCollectorVisitor(ConfigurationAst configuration, ClassToInstanceMap<IProjectBean.IBuilder<?>> beanBuilders) {
        super(configuration, beanBuilders);
    }

    @Override
    public Void visitMotionForwardStep(MatataBotMotionForwardStep<Void> matataBotMotionForwardStep) {
        matataBotMotionForwardStep.getSteps();
        return null;
    }

    @Override
    public Void visitMotionBackwardStep(MatataBotMotionBackwardStep<Void> matataBotMotionBackwardStep) {
        matataBotMotionBackwardStep.getSteps();
        return null;
    }

    @Override
    public Void visitMotionTurnLeftAngle(MatataBotMotionTurnLeftAngle<Void> matataBotMotionTurnLeftAngle) {
        matataBotMotionTurnLeftAngle.getAngle();
        return null;
    }

    @Override
    public Void visitMotionTurnRightAngle(MatataBotMotionTurnRightAngle<Void> matataBotMotionTurnRightAngle) {
        matataBotMotionTurnRightAngle.getAngle();
        return null;
    }

    @Override
    public Void visitMotionMoving(MatataBotMotionMoving<Void> matataBotMotionMoving) {
        matataBotMotionMoving.getDistance();
        return null;
    }
}
