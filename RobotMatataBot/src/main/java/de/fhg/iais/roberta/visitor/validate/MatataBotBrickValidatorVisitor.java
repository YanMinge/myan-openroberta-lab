package de.fhg.iais.roberta.visitor.validate;

import com.google.common.collect.ClassToInstanceMap;

import de.fhg.iais.roberta.bean.IProjectBean;
import de.fhg.iais.roberta.components.ConfigurationAst;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionForwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionBackwardStep;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnLeftAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionTurnRightAngle;
import de.fhg.iais.roberta.syntax.action.MatataBotMotionMoving;
import de.fhg.iais.roberta.visitor.hardware.IMatataBotVisitor;

public final class MatataBotBrickValidatorVisitor extends AbstractBoardValidatorVisitor implements IMatataBotVisitor<Void> {

    public MatataBotBrickValidatorVisitor(ConfigurationAst brickConfiguration, ClassToInstanceMap<IProjectBean.IBuilder<?>> beanBuilders) {
        super(brickConfiguration, beanBuilders);
    }

    @Override
    public Void visitMotionForwardStep(MatataBotMotionForwardStep<Void> matataBotMotionForwardStep) {
        return null;
    }

    @Override
    public Void visitMotionBackwardStep(MatataBotMotionBackwardStep<Void> matataBotMotionBackwardStep) {
        return null;
    }

    @Override
    public Void visitMotionTurnLeftAngle(MatataBotMotionTurnLeftAngle<Void> matataBotMotionTurnLeftAngle) {
        return null;
    }

    @Override
    public Void visitMotionTurnRightAngle(MatataBotMotionTurnRightAngle<Void> matataBotMotionTurnRightAngle) {
        return null;
    }

    @Override
    public Void visitMotionMoving(MatataBotMotionMoving<Void> matataBotMotionMoving) {
        return null;
    }
}