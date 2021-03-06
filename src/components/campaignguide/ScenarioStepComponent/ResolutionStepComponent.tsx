import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import SetupStepWrapper from '../SetupStepWrapper';
import ScenarioGuideContext, { ScenarioGuideContextType } from '../ScenarioGuideContext';
import CampaignGuideTextComponent from '../CampaignGuideTextComponent';
import { ResolutionStep } from 'data/scenario/types';
import typography from 'styles/typography';
import space from 'styles/space';

interface Props {
  step: ResolutionStep;
}

export default class ResolutionStepComponent extends React.Component<Props> {
  render() {
    const { step } = this.props;
    return (
      <ScenarioGuideContext.Consumer>
        { ({ processedScenario }: ScenarioGuideContextType) => {
          const resolution = processedScenario.scenarioGuide.resolution(step.resolution);
          if (!resolution) {
            return <Text>Unknown resolution: { step.resolution }</Text>;
          }
          return (
            <>
              { !!step.text && (
                <SetupStepWrapper>
                  <CampaignGuideTextComponent text={step.text} />
                </SetupStepWrapper>
              ) }
              { (!!resolution.text || resolution.steps.length > 0) && (
                <View style={space.marginTopM}>
                  <View style={space.marginSideM}>
                    <Text style={typography.mediumGameFont}>
                      { resolution.title }
                    </Text>
                  </View>
                  { !!resolution.text && (
                    <View style={space.marginSideM}>
                      <CampaignGuideTextComponent
                        text={resolution.text}
                        flavor
                      />
                    </View>
                  ) }
                </View>
              ) }
            </>
          );
        } }
      </ScenarioGuideContext.Consumer>
    );
  }
}
