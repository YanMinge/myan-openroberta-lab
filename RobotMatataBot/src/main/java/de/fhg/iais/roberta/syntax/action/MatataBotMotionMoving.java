package de.fhg.iais.roberta.syntax.action;

import java.util.List;

import de.fhg.iais.roberta.blockly.generated.Block;
import de.fhg.iais.roberta.blockly.generated.Value;
import de.fhg.iais.roberta.factory.BlocklyDropdownFactory;
import de.fhg.iais.roberta.syntax.BlockTypeContainer;
import de.fhg.iais.roberta.syntax.BlocklyBlockProperties;
import de.fhg.iais.roberta.syntax.BlocklyComment;
import de.fhg.iais.roberta.syntax.BlocklyConstants;
import de.fhg.iais.roberta.syntax.Phrase;
import de.fhg.iais.roberta.syntax.lang.expr.Expr;
import de.fhg.iais.roberta.transformer.AbstractJaxb2Ast;
import de.fhg.iais.roberta.transformer.Ast2JaxbHelper;
import de.fhg.iais.roberta.transformer.ExprParam;
import de.fhg.iais.roberta.typecheck.BlocklyType;
import de.fhg.iais.roberta.util.dbc.Assert;
import de.fhg.iais.roberta.visitor.IVisitor;
import de.fhg.iais.roberta.visitor.hardware.IMatataBotVisitor;

public class MatataBotMotionMoving<V> extends Action<V> {
    private final Expr<V> distance;

    private MatataBotMotionMoving(Expr<V> distance, BlocklyBlockProperties properties, BlocklyComment comment) {
        super(BlockTypeContainer.getByName("MATATABOT_MOTION_MOVING"), properties, comment);
        Assert.isTrue(distance != null);
        this.distance = distance;
        setReadOnly();
    }

    public static <V> MatataBotMotionMoving<V> make(Expr<V> distance, BlocklyBlockProperties properties, BlocklyComment comment) {
        return new MatataBotMotionMoving<>(distance, properties, comment);
    }

    public Expr<V> getDistance() {
        return this.distance;
    }

    @Override
    public String toString() {
        return "MatataBotMotionMoving [ " + this.distance + "]";
    }

    @Override
    protected V acceptImpl(IVisitor<V> visitor) {
        return ((IMatataBotVisitor<V>) visitor).visitMotionMoving(this);
    }

    public static <V> Phrase<V> jaxbToAst(Block block, AbstractJaxb2Ast<V> helper) {
        List<Value> values;
        BlocklyDropdownFactory factory = helper.getDropdownFactory();
        values = AbstractJaxb2Ast.extractValues(block, (short) 1);
        Phrase<V> distance = helper.extractValue(values, new ExprParam(BlocklyConstants.MATATABOT_MOTION_POS, BlocklyType.NUMBER));
        System.out.println("MatataBotMotionMoving:" + distance.toString());
        return MatataBotMotionMoving
            .make(helper.convertPhraseToExpr(distance), AbstractJaxb2Ast.extractBlockProperties(block), AbstractJaxb2Ast.extractComment(block));
    }

    @Override
    public Block astToBlock() {
        Block jaxbDestination = new Block();
        Ast2JaxbHelper.setBasicProperties(this, jaxbDestination);
        Ast2JaxbHelper.addValue(jaxbDestination, BlocklyConstants.MATATABOT_MOTION_POS, getDistance());
        return jaxbDestination;
    }
}
