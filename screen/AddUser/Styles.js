import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  h1: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  h2: {
    marginTop: 14,
    marginLeft: 9,
  },
  viewBox: {
    margin: 30,
    marginTop: 80,
  },
  textInput: {
    borderWidth: 5,
    borderColor: 'skyblue',
    borderRadius: 30,
    margin: 10,
    textAlign: 'center',
    // backgroundColor: 'green'
  },
  optionBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'red'
  },
  options: {
    height: 50,
    width: 150,
    marginLeft: 50,
  },
  cameraBox:{
    borderWidth: 5,
    flex: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 10,
    // backgroundColor: 'orange',
    justifyContent:'center',
    // width: 280,
    alignItems: 'center'
  },
  imagePreview:{
    // backgroundColor: "green",
    // flex: 1,
    width: 95,
    height: 90,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'silver',
    justifyContent:'center',
    alignContent: 'flex-start'
  },
  cameraView:{
    flex: 2,
    marginTop: 20,
    marginBottom : 20,
    width:120,
    justifyContent:'center',
    alignContent:'flex-end'
    // backgroundColor: 'yellow'
  },
  submitButton:{
    borderWidth: 5,
    // flex: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    height: 70,
    marginBottom: 20,
    alignItems: 'center',
    // backgroundColor:'blue'
  }
});
