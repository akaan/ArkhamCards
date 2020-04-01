import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ResultIndicatorIcon from './ResultIndicatorIcon';
import CardTextComponent from 'components/card/CardTextComponent';
import SetupStepWrapper from './SetupStepWrapper';
import { BulletType } from 'data/scenario/types';

interface Props {
  bulletType?: BulletType;
  prompt?: string;
  result: boolean;
  noBorder?: boolean
}

export default function BinaryResult({ bulletType, prompt, result, noBorder }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.step}>
        <SetupStepWrapper bulletType={bulletType}>
          { !!prompt && <CardTextComponent text={prompt} /> }
        </SetupStepWrapper>
      </View>
      <ResultIndicatorIcon result={result} noBorder={noBorder} />
    </View>
  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    flex: 1,
  },
});
