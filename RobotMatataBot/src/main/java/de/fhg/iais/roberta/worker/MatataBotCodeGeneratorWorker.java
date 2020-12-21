package de.fhg.iais.roberta.worker;

import de.fhg.iais.roberta.bean.UsedHardwareBean;
import de.fhg.iais.roberta.components.Project;
import de.fhg.iais.roberta.visitor.MatataBotStackMachineVisitor;
import de.fhg.iais.roberta.visitor.lang.codegen.AbstractStackMachineVisitor;

public final class MatataBotCodeGeneratorWorker extends AbstractStackMachineGeneratorWorker {
    @Override
    protected AbstractStackMachineVisitor<Void> getVisitor(Project project, UsedHardwareBean usedHardwareBean) {
        return new MatataBotStackMachineVisitor<>(usedHardwareBean, project.getConfigurationAst(), project.getProgramAst().getTree());

    }
}
