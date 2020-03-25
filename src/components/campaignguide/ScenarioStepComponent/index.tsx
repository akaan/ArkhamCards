import React from 'react';
import {
  Text,
} from 'react-native';

import BranchStepComponent from './BranchStepComponent';
import EncounterSetStepComponent from './EncounterSetStepComponent';
import GenericStepComponent from './GenericStepComponent';
import InputStepComponent from './InputStepComponent';
import RuleReminderStepComponent from './RuleReminderStepComponent';
import StoryStepComponent from './StoryStepComponent';
import ScenarioStep from 'data/scenario/ScenarioStep';

interface Props {
  step: ScenarioStep;
}

export default class ScenarioStepComponent extends React.Component<Props> {
  render() {
    const { step: { step, campaignLog } } = this.props;
    if (!step.type) {
      return <GenericStepComponent step={step} />;
    }
    switch (step.type) {
      case 'branch':
        return (
          <BranchStepComponent
            step={step}
            campaignLog={campaignLog}
          />
        );
      case 'story':
        return (
          <StoryStepComponent
            step={step}
          />
        );
      case 'encounter_sets':
        return <EncounterSetStepComponent step={step} />;
      case 'rule_reminder':
        return <RuleReminderStepComponent step={step} />;
      case 'input':
        return (
          <InputStepComponent
            step={step}
          />
        );
      default:
        return <Text>Unknown step type</Text>;
    }
  }
}
