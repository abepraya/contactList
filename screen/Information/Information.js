import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from './style';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Information = (props) => {
  const data = props.route.params.item;

  const hapusData = () => {
    // Hapus data di firestore
    firestore()
      .collection('users')
      .doc(data.id)
      .delete()
      .then(() => {
        // Hapus file di storage
        const storageRef = storage().ref(`images/${data.namaFile}`);
        storageRef.delete().then(() => {
          alert('Data Berhasil Dihapus');
          // Kembali Ke halaman Utama
          props.navigation.navigate('Users');
        });
      });
  };
  const editData = () => {
    props.navigation.navigate('Update', {data});
    console.log('test');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detail User</Text>
      </View>

      <View style={styles.postContent}>
        <Text style={styles.date}>Terakhir Update : {data.update}</Text>
        <View style={styles.profile}>
          <Image style={styles.avatar} source={{uri: data.urlGambar}} />
        </View>
        <Text style={styles.name}>{data.nama}</Text>
        <Text style={styles.text}>Usia : {data.usia} Tahun</Text>
        <Text style={styles.text}>Status : {data.status}</Text>
        <Text style={styles.text}>Alamat : {data.koordinat}</Text>
        <TouchableOpacity
          onPress={() => {
            editData();
          }}
          style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={hapusData} style={styles.shareButton2}>
          <Text style={styles.shareButtonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Information;
