
package de.fhg.iais.roberta.mode.action;

import java.util.Locale;
import de.fhg.iais.roberta.inter.mode.action.IMatataBotMotionStep;
import de.fhg.iais.roberta.util.dbc.DbcException;

public enum MatataBotMotionStep implements IMatataBotMotionStep {
    STEP1( "1 step", "1 step" ),
    STEP2( "2 steps", "2 steps" ),
    STEP3( "3 steps", "3 steps" ),
    STEP4( "4 steps", "4 steps" ),
    STEP5( "5 steps", "5 steps" ),
    STEP6( "6 steps", "6 steps" );
    private final String[] values;

    private MatataBotMotionStep(String... values) {
        this.values = values;
    }

    public static MatataBotMotionStep get(String step) {
        if (step == null || step.isEmpty()) {
            throw new DbcException("Invalid motion steps: " + step);
        }
        String sUpper = step.trim().toUpperCase(Locale.GERMAN);
        for (MatataBotMotionStep wd : MatataBotMotionStep.values()) {
            if (wd.toString().equals(sUpper)) {
                return wd;
            }
            for (String value : wd.getValues()) {
                if (sUpper.equals(value)) {
                    return wd;
                }
            }
        }
        throw new DbcException("Invalid motion steps: " + step);
    }

    @Override
    public String[] getValues() {
        return this.values;
    }

}