package de.fhg.iais.roberta.syntax.action;

import java.util.List;

import de.fhg.iais.roberta.blockly.generated.Block;
import de.fhg.iais.roberta.blockly.generated.Field;
import de.fhg.iais.roberta.factory.BlocklyDropdownFactory;
import de.fhg.iais.roberta.inter.mode.action.IMatataBotMotionAngle;
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

public class MatataBotMotionTurnLeftAngle<V> extends Action<V> {
    private final IMatataBotMotionAngle angle;

    private MatataBotMotionTurnLeftAngle(IMatataBotMotionAngle angle, BlocklyBlockProperties properties, BlocklyComment comment) {
        super(BlockTypeContainer.getByName("MATATABOT_MOTION_TURN_LEFT_ANGLE"), properties, comment);
        Assert.isTrue(angle != null);
        this.angle = angle;
        setReadOnly();
    }

    public static <V> MatataBotMotionTurnLeftAngle<V> make(IMatataBotMotionAngle angle, BlocklyBlockProperties properties, BlocklyComment comment) {
        return new MatataBotMotionTurnLeftAngle<>(angle, properties, comment);
    }

    public IMatataBotMotionAngle getAngle() {
        return this.angle;
    }

    @Override
    public String toString() {
        return "MatataBotMotionTurnLeftAngle [ " + this.angle + "]";
    }

    @Override
    protected V acceptImpl(IVisitor<V> visitor) {
        return ((IMatataBotVisitor<V>) visitor).visitMotionTurnLeftAngle(this);
    }

    public static <V> Phrase<V> jaxbToAst(Block block, AbstractJaxb2Ast<V> helper) {
        List<Field> fields;
        String step;
        BlocklyDropdownFactory factory = helper.getDropdownFactory();
        fields = AbstractJaxb2Ast.extractFields(block, (short) 1);
        step = AbstractJaxb2Ast.extractField(fields, BlocklyConstants.MATATABOT_MOTION_ANGLE);
        System.out.println("MotionTurnleftAngle:" + factory.getMatataBotMotionAngle(step).toString());
        return MatataBotMotionTurnLeftAngle
            .make(factory.getMatataBotMotionAngle(step), AbstractJaxb2Ast.extractBlockProperties(block), AbstractJaxb2Ast.extractComment(block));
    }

    @Override
    public Block astToBlock() {
        Block jaxbDestination = new Block();
        Ast2JaxbHelper.setBasicProperties(this, jaxbDestination);
        Ast2JaxbHelper.addField(jaxbDestination, BlocklyConstants.MATATABOT_MOTION_ANGLE, getAngle().toString());
        return jaxbDestination;
    }
}
