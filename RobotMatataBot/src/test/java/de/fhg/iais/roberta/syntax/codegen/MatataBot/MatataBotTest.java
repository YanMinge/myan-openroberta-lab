package de.fhg.iais.roberta.syntax.codegen.MatataBot;

import org.junit.BeforeClass;
import org.junit.Test;

import de.fhg.iais.roberta.factory.IRobotFactory;
import de.fhg.iais.roberta.factory.RobotFactory;
import de.fhg.iais.roberta.util.PluginProperties;
import de.fhg.iais.roberta.util.Util;
import de.fhg.iais.roberta.util.test.UnitTestHelper;

public class MatataBotTest {

    private static IRobotFactory testFactory;

    @BeforeClass
    public static void setup() {
        testFactory = new RobotFactory(new PluginProperties("matatabot", "", "", Util.loadProperties("classpath:/matatabot.properties")));
    }

    @Test
    public void MatataBotEverythingTest() throws Exception {
        // UnitTestHelper.checkGeneratedSourceEqualityWithExportXml(testFactory, "/everything_test.json", "/everything_test.xml");
    }

    @Test
    public void MatataBotAllBlocksTest() throws Exception {
        // UnitTestHelper.checkGeneratedSourceEqualityWithExportXml(testFactory, "/all_blocks_test.json", "/all_blocks_test.xml");
    }

    @Test
    public void motorTest() throws Exception {
        // UnitTestHelper.checkGeneratedSourceEqualityWithExportXml(testFactory, "/motor_test.json", "/motor_test.xml");
    }
}
