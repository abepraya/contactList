import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Styles from './Styles';
import {Picker} from '@react-native-community/picker';

class PickerStatus extends Component {
  state = {status: ''};
  updateStatus = (item) => {
    this.setState({status: item});
  };
  render() {
    return (
      <View style={Styles.textInput}>
        <View style={Styles.optionBox}>
          <Text style={Styles.h2}>Status:</Text>
          <Picker
            selectedValue={this.state.status}
            onValueChange={this.updateStatus}
            style={Styles.options}
            >
            <Picker.Item label="Single" value="single" />
            <Picker.Item label="Married" value="married" />
          </Picker>
        </View>
      </View>
    );
  }
}
export default PickerStatus;
