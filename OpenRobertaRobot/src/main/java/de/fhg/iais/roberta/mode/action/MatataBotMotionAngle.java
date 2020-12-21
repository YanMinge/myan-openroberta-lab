
package de.fhg.iais.roberta.mode.action;

import java.util.Locale;
import de.fhg.iais.roberta.inter.mode.action.IMatataBotMotionAngle;
import de.fhg.iais.roberta.util.dbc.DbcException;

public enum MatataBotMotionAngle implements IMatataBotMotionAngle {
    ANGLE30( "30°", "30°" ),
    ANGLE36( "36°", "36°" ),
    ANGLE45( "45°", "45°" ),
    ANGLE60( "60°", "60°" ),
    ANGLE72( "72°", "72°" ),
    ANGLE90( "90°", "90°" ),
    ANGLE108( "108°", "108°" ),
    ANGLE120( "120°", "120°" ),
    ANGLE135( "135°", "135°" ),
    ANGLE144( "144°", "144°" ),
    ANGLE150( "150°", "150°" ),
    ANGLE180( "180°", "180°" );
    private final String[] values;

    private MatataBotMotionAngle(String... values) {
        this.values = values;
    }

    public static MatataBotMotionAngle get(String angle) {
        if (angle == null || angle.isEmpty()) {
            throw new DbcException("Invalid motion angle: " + angle);
        }
        String sUpper = angle.trim().toUpperCase(Locale.GERMAN);
        for (MatataBotMotionAngle wd : MatataBotMotionAngle.values()) {
            if (wd.toString().equals(sUpper)) {
                return wd;
            }
            for (String value : wd.getValues()) {
                if (sUpper.equals(value)) {
                    return wd;
                }
            }
        }
        throw new DbcException("Invalid motion angle: " + angle);
    }

    @Override
    public String[] getValues() {
        return this.values;
    }

}