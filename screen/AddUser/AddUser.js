import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar,Divider } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect } from 'react';

import {
  Button,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {Form, FormGroup, Label} from 'react-native-clean-form';
// import PickerGender from './Picker';
// import PickerStatus from './Picker1';
import Styles from './Styles';

// const genderOption = [
//   {label: 'Male', value: 'male'},
//   {label: 'Female', value: 'female'},
//   {options: 'Gender'},
// ];

// const statusOption = [
//   {label: 'Married', value: 'married'},
//   {label: 'Single', value: 'single'},
//   {options: 'Status'},
// ];

const AddUser = () => {
  const [nama, setNama] = useState('');
  const [gender, setGender] = useState('');
  const [usia, setUsia] = useState('');
  const [status, setStatus] = useState('');
  const [ImageUri, setImageUri] = useState();
  const [fileExtension, setExtension] = useState();
  const [koordinat, setKoordinat] = useState('');
  const [Longitude, setLongitude] = useState(0);
  const [Latitude, setLatitude] = useState(0);

  useEffect(() => {
      getLocation();
  });

  //   Untuk mendapatkan lokasi
  const getLocation = () => {
      Geolocation.getCurrentPosition(
          (position) => {
              console.log(position)
              setLongitude(position.coords.longitude);
              setLatitude(position.coords.latitude);
          },
          (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true }
      );
  };

  const getMyLocation = () => {
      setKoordinat(`${Longitude}, ${Latitude}`);
  };

  // Untuk Ambil Gambar Dari File di HP
  const captureImage = (type) => {
      let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
          videoQuality: 'low',
          durationLimit: 30, //Video max duration in seconds
          saveToPhotos: true,
      };
      launchCamera(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
          } else if (response.errorCode === 'camera_unavailable') {
              alert('Camera not available on device');
              return;
          } else if (response.errorCode === 'permission') {
              alert('Permission not satisfied');
              return;
          } else if (response.errorCode === 'others') {
              alert(response.errorMessage);
              return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setImageUri(response.uri);
          setExtension(response.uri.split('.').pop());
      });
  };

  
  const chooseFile = (type) => {
      let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
      };
      launchImageLibrary(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
          } else if (response.errorCode === 'camera_unavailable') {
              alert('Camera not available on device');
              return;
          } else if (response.errorCode === 'permission') {
              alert('Permission not satisfied');
              return;
          } else if (response.errorCode === 'others') {
              alert(response.errorMessage);
              return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setImageUri(response.uri);
          setExtension(response.uri.split('.').pop());
      });
  };

  const sendData = () => {
      const uniqId = uuid.v4();
      const id = uniqId.toUpperCase();
      const fileName = `foto-${nama}.${fileExtension}`;
      console.log(fileName);
      const currentDate = new Date();
      const tanggal = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;
      if (ImageUri) {

          // Upload File Ke firebase storage
          const storageRef = storage().ref(`images/${fileName}`);
          storageRef.putFile(`${ImageUri}`)
              .on(
                  storage.TaskEvent.STATE_CHANGED,
                  snapshot => {
                      console.log('snapshot: ' + snapshot.state);
                      console.log('progress: ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                      if (snapshot.state === storage.TaskState.SUCCESS) {
                          console.log('Success');
                      }
                  },
                  error => {
                      console.log('image upload error: ' + error.toString());
                  },
                  () => {
                      // Untuk mendapatkan url dari file yang kita upload
                      storageRef.getDownloadURL()
                          .then((downloadUrl) => {
                              console.log('File available at: ' + downloadUrl);

                              const data = {
                                  id : id,
                                  nama : nama,
                                  gender: gender,
                                  usia: usia,
                                  status: status,
                                  urlGambar : downloadUrl,
                                  namaFile: fileName,
                                  koordinat: koordinat,
                                  update: tanggal,
                              };
                              // Menyimpan semua data di firestore
                              firestore().collection('users')
                                  .doc(id)
                                  .set(data)
                                  .then(() => {
                                      setNama('');
                                      setGender('');
                                      setUsia('');
                                      setStatus('');
                                      setImageUri();
                                      setKoordinat('');
                                  })
                                  .catch((error) => {
                                      alert(error);
                                  });
                          });
                  }
              );
      }
  };

    return (
      <Form>
        <View style={Styles.viewBox}>
          <Text style={Styles.h1}>User Information</Text>
          <TextInput
            placeholder="Name"
            onChangeText={text => setNama(text)}
            value={nama}
            style={Styles.textInput}
          />
          <Divider/>
          <TextInput
            placeholder="Age"
            keyboardType="number-pad"
            onChangeText={text => setUsia(text)}
            value={usia}
            style={Styles.textInput}
          />
          <Divider/>
          <View style={Styles.viewBox}>
                    <Text style={styles.h2}>Gender</Text>
                    <Picker style={styles.options} selectedValue={gender} onValueChange={value => setGender(value)}>
                        <Picker.Item label="Select your gender" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
          </View>
          <Divider/>
          {/* <FormGroup style={Styles.textInput}>
            <Label>Gender</Label>
            <Select
              name="genderOption"
              label="Gender Option"
              options={genderOption}
              placeholder="Gender"
              onValueChange={(option) => this.setState({gender: option})}
            />
          </FormGroup> */}
          <View style={Styles.viewBox}>
                    <Text style={styles.h2}>Status</Text>
                    <Picker style={styles.options} selectedValue={status} onValueChange={value => setStatus(value)}>
                        <Picker.Item label="Select your status" />
                        <Picker.Item label="Single" value="single" />
                        <Picker.Item label="Married" value="married" />
                    </Picker>
          </View>

          <View style={Styles.cameraBox}>
            <View>
              <View
                name="file-image-o"
                // source={{uri: this.state.uri}}
                style={Styles.imagePreview}>
                <Avatar
                  rounded
                  source={{ uri: data.urlGambar }}
                  // style={Styles.imagePreview}
                />
              </View>
            </View>
            <View style={Styles.cameraView}>
              <Icon.Button
                name="camera"
                backgroundColor="#3b5998"
                onPress={() => captureImage('photo')}>
                Take Picture
              </Icon.Button>
              <Icon.Button
                name="file-picture-o"
                backgroundColor="#3b5998"
                onPress={() => chooseFile('photo')}>
                Take Picture
              </Icon.Button>

              {/* <TouchableOpacity
                title="Take Picture"
                style={Styles.cameraButton}
              /> */}
            </View>
          </View>
          <View>
            <TextInput
              placeholder="Latitude/Longtitude"
              onChangeText={text => setKoordinat(text)}
              value={koordinat}
              style={Styles.textInput}
            />
            <Icon.Button
              name="file-picture-o"
                backgroundColor="#3b5998"
                onPress={getMyLocation}>
              Set Location
            </Icon.Button>
          </View>
        </View>
        <View style={Styles.submitButton}>
          <Icon.Button name="save" backgroundColor="green" onPress={sendData}>
            Submit
          </Icon.Button>
        </View>
      </Form>
    );
  }


export default AddUser;
