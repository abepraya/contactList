import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Styles from './Styles';
import {Picker} from '@react-native-community/picker';

class PickerGender extends Component {
  state = {gender: ''};
  updateGender = (item) => {
    this.setState({gender: item});
  };
  render() {
    return (
      <View style={Styles.textInput}>
        <View style={Styles.optionBox}>
          <Text style={Styles.h2}>Gender:</Text>
          <Picker
            selectedValue={this.state.gender}
            onValueChange={this.updateGender}
            style={Styles.options}
            >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
      </View>
    );
  }
}
export default PickerGender;
