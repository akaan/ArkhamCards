import React from 'react';
import {
  Text,
} from 'react-native';
import { find, upperFirst } from 'lodash';
import { t } from 'ttag';

import BinaryPrompt from '../../prompts/BinaryPrompt';
import SetupStepWrapper from '../../SetupStepWrapper';
import CardTextComponent from 'components/card/CardTextComponent';
import CampaignGuideContext, { CampaignGuideContextType } from '../../CampaignGuideContext';
import {
  BranchStep,
  CampaignDataCondition,
} from 'data/scenario/types';
import GuidedCampaignLog from 'data/scenario/GuidedCampaignLog';

interface Props {
  step: BranchStep;
  condition: CampaignDataCondition;
  campaignLog: GuidedCampaignLog;
}

export default class CampaignDataConditionComponent extends React.Component<Props> {
  render() {
    const { step, condition, campaignLog } = this.props;
    return (
      <CampaignGuideContext.Consumer>
        { ({ campaignGuide, campaignState }: CampaignGuideContextType) => {
          switch (condition.campaign_data) {
            case 'investigator':
              return (
                <Text>
                  Some condition of an investigator.
                </Text>
              );
            case 'difficulty': {
              const difficulty = upperFirst(campaignLog.campaignData.difficulty);
              return (
                <SetupStepWrapper bulletType={step.bullet_type}>
                  <CardTextComponent
                    text={t`Because you are playing on <b>${difficulty}</b> difficulty:`}
                  />
                </SetupStepWrapper>
              );
            }
            case 'scenario_completed': {
              const chosenScenario = campaignGuide.getScenario(condition.scenario, campaignState);
              const scenarioName =
                chosenScenario && chosenScenario.scenario.scenarioName || condition.scenario;
              const completed = campaignLog.scenarioStatus(condition.scenario) === 'completed';
              return (
                <SetupStepWrapper bulletType={step.bullet_type}>
                  <CardTextComponent text={completed ?
                    t`Because you have already completed <b>${scenarioName}</b>:` :
                    t`Because you have not yet completed <b>${scenarioName}</b>:`
                  } />
                </SetupStepWrapper>
              );
            }
            case 'chaos_bag': {
              // We always write these out.
              return null;
            }
          }
        } }
      </CampaignGuideContext.Consumer>
    );
  }
}
