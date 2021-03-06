import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChooseOneListComponent from '../ChooseOneListComponent';
import SinglePickerComponent from 'components/core/SinglePickerComponent';
import { DisplayChoice } from 'data/scenario';
import { BulletType } from 'data/scenario/types';
import typography from 'styles/typography';
import space from 'styles/space';
import COLORS from 'styles/colors';

interface Props {
  code: string;
  name: string;
  color?: {
    primary: string;
    tint: string;
  };
  bulletType?: BulletType;
  choices: DisplayChoice[];
  choice?: number;
  optional: boolean;
  onChoiceChange: (code: string, index: number) => void;
  editable: boolean;
  detailed?: boolean;
  firstItem: boolean;
}

export default class ChoiceListItemComponent extends React.Component<Props> {
  _onChoiceChange = (idx: number) => {
    const {
      onChoiceChange,
      code,
    } = this.props;
    onChoiceChange(code, idx);
  };

  render() {
    const {
      name,
      color,
      detailed,
      choices,
      choice,
      editable,
      optional,
      firstItem,
    } = this.props;
    if (detailed) {
      return (
        <>
          <View style={[
            styles.headerRow,
            space.paddingS,
            space.paddingLeftM,
            color ? { backgroundColor: color.tint } : {},
          ]}>
            <View>
              <Text style={[
                typography.mediumGameFont,
                styles.nameText,
              ]}>
                { name }
              </Text>
            </View>
            <View />
          </View>
          <ChooseOneListComponent
            choices={choices}
            selectedIndex={choice}
            editable={editable}
            onSelect={this._onChoiceChange}
            color={color}
            noBullet
          />
        </>
      );
    }
    return (
      <SinglePickerComponent
        choices={choices}
        selectedIndex={choice === undefined ? -1 : choice}
        editable={editable}
        optional={optional}
        title={name}
        onChoiceChange={this._onChoiceChange}
        colors={color ? {
          backgroundColor: color.tint,
          textColor: '#000',
          modalColor: color.primary,
          modalTextColor: '#FFF',
        } : undefined}
        topBorder={firstItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  nameText: {
    fontWeight: '600',
    color: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.divider,
  },
});
