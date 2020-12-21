package de.fhg.iais.roberta.syntax.action;

import java.util.List;

import de.fhg.iais.roberta.blockly.generated.Block;
import de.fhg.iais.roberta.blockly.generated.Field;
import de.fhg.iais.roberta.factory.BlocklyDropdownFactory;
import de.fhg.iais.roberta.inter.mode.action.IMatataBotMotionStep;
import de.fhg.iais.roberta.syntax.BlockTypeContainer;
import de.fhg.iais.roberta.syntax.BlocklyBlockProperties;
import de.fhg.iais.roberta.syntax.BlocklyComment;
import de.fhg.iais.roberta.syntax.BlocklyConstants;
import de.fhg.iais.roberta.syntax.Phrase;
import de.fhg.iais.roberta.transformer.AbstractJaxb2Ast;
import de.fhg.iais.roberta.transformer.Ast2JaxbHelper;
import de.fhg.iais.roberta.util.dbc.Assert;
import de.fhg.iais.roberta.visitor.IVisitor;
import de.fhg.iais.roberta.visitor.hardware.IMatataBotVisitor;

public class MatataBotMotionForwardStep<V> extends Action<V> {
    private final IMatataBotMotionStep steps;

    private MatataBotMotionForwardStep(IMatataBotMotionStep steps, BlocklyBlockProperties properties, BlocklyComment comment) {
        super(BlockTypeContainer.getByName("MATATABOT_MOTION_FORWARD_STEP"), properties, comment);
        Assert.isTrue(steps != null);
        this.steps = steps;
        setReadOnly();
    }

    public static <V> MatataBotMotionForwardStep<V> make(IMatataBotMotionStep steps, BlocklyBlockProperties properties, BlocklyComment comment) {
        return new MatataBotMotionForwardStep<>(steps, properties, comment);
    }

    public IMatataBotMotionStep getSteps() {
        return this.steps;
    }

    @Override
    public String toString() {
        return "MatataBotMotionForwardStep [ " + this.steps + "]";
    }

    @Override
    protected V acceptImpl(IVisitor<V> visitor) {
        return ((IMatataBotVisitor<V>) visitor).visitMotionForwardStep(this);
    }

    public static <V> Phrase<V> jaxbToAst(Block block, AbstractJaxb2Ast<V> helper) {
        List<Field> fields;
        String step;
        BlocklyDropdownFactory factory = helper.getDropdownFactory();
        fields = AbstractJaxb2Ast.extractFields(block, (short) 1);
        step = AbstractJaxb2Ast.extractField(fields, BlocklyConstants.MATATABOT_MOTION_STEP);
        System.out.println("MotionForwardStep:" + factory.getMatataBotMotionStep(step).toString());
        return MatataBotMotionForwardStep
            .make(factory.getMatataBotMotionStep(step), AbstractJaxb2Ast.extractBlockProperties(block), AbstractJaxb2Ast.extractComment(block));
    }

    @Override
    public Block astToBlock() {
        Block jaxbDestination = new Block();
        Ast2JaxbHelper.setBasicProperties(this, jaxbDestination);
        Ast2JaxbHelper.addField(jaxbDestination, BlocklyConstants.MATATABOT_MOTION_STEP, getSteps().toString());
        return jaxbDestination;
    }
}
