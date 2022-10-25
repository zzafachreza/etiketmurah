import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Home({ navigation }) {

  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
      axios.post(apiURL + 'data.php', {
        id_user: res.id
      }).then(x => {
        console.log(x.data);
        setData(x.data);
      })
    })
  }

  const __renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('SCek', item)} style={{
        margin: 5,
        padding: 10,
        // flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.zavalabs
      }}>

        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,
          }}>
            <Image style={{
              width: 80,
              height: 50,
              resizeMode: 'contain'
            }} source={{
              uri: item.foto_maskapai
            }} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28
            }}>{item.kode_booking}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28
            }}>{item.tanggal}</Text>
          </View>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20
            }}>{item.kode_maskapai}</Text>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>

            <Icon type='ionicon' name='chevron-forward' size={windowWidth / 25} color={colors.primary} />
          </View>
        </View>

        <View style={{
          marginTop: 10,
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              fontSize: windowWidth / 30
            }}>Dari</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.black,
              fontSize: windowWidth / 30
            }}>{item.dep_bandara}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.black,
              fontSize: windowWidth / 30
            }}>{item.dep_tanggal}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.black,
              fontSize: windowWidth / 30
            }}>{item.dep_jam.substring(0, 5)}</Text>
          </View>
          <View style={{
            flex: 1,
          }}>
            <Icon type='ionicon' name='airplane' size={windowWidth / 25} color={colors.primary} />
          </View>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              fontSize: windowWidth / 30
            }}>Tujuan</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.black,
              fontSize: windowWidth / 30
            }}>{item.arr_bandara}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.black,
              fontSize: windowWidth / 30
            }}>{item.arr_tanggal}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              color: colors.black,
              fontSize: windowWidth / 30
            }}>{item.arr_jam.substring(0, 5)}</Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }


  const filterItems = (key, data) => {
    var query = key.toLowerCase();
    return data.filter(function (item) {
      return item.toLowerCase().indexOf(query) >= 0;
    })
  }



  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang,</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{user.nama_lengkap}</Text>
          </View>

          <TouchableOpacity onPress={() => {
            storeData('user', null);

            navigation.replace('Login');
          }} style={{
            paddingHorizontal: 10,

            flexDirection: 'row',
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type="ionicon" size={windowWidth / 30} name="log-out-outline" color={colors.white} />
            <Text style={{
              left: 5,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              color: colors.white
            }}>Keluar</Text>
          </TouchableOpacity>
        </View>

        <MyInput placeholder="Pencarian data" onChangeText={x => {
          console.log('jumlah huruf', x.length);
          const cekk = data.filter(i => i.kode_booking.toString().toLowerCase() == x.toString().toLowerCase());
          if (cekk.length > 0) {
            setData(cekk);
          } else if (x.length == 0) {
            __getTransaction();
          }

        }} />

      </View>


      <FlatList data={data} renderItem={__renderItem} />







      <View style={{
        padding: 10,
      }}>
        <MyButton title="Tambah Baru" Icons="duplicate" onPress={() => navigation.navigate('SAdd')} warna={colors.primary} />
      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 35
  },
  item: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 35
  }
})