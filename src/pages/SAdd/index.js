import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs } from 'mask-js';

export default function SAdd({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [maskapai, setMaskapai] = useState([]);

    const [kirim, setKirim] = useState({
        tanggal: new Date(),
        kode_booking: '',
        kode_maskapai: '',
        dep_bandara: '',
        dep_tanggal: '',
        dep_jam: '',
        arr_bandara: '',
        arr_tanggal: '',
        arr_jam: '',
        fid_maskapai: '',
    });

    useEffect(() => {
        getData('user').then(u => setKirim({
            ...kirim,
            fid_user: u.id
        }));
        axios.post(apiURL + 'data_maskapai.php').then(res => {
            console.log(res.data);
            setMaskapai(res.data);
        })
    }, []);


    const sendServer = () => {
        console.log(kirim);

        if (kirim.fid_maskapai == '') {
            Alert.alert('Etiket Murah', 'Maskapai wajib di isi !')
        }
        setLoading(true);
        setTimeout(() => {
            axios.post(apiURL + 'add.php', kirim).then(res => {
                console.log(res.data);
                setLoading(false);
                Alert.alert('ETiket Murah', 'Data berhasil disimpan !')

                navigation.goBack();
            })
        }, 1200)
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>



                <MyPicker onValueChange={x => setKirim({
                    ...kirim,
                    fid_maskapai: x
                })} label="Maskapai" data={maskapai} iconname="airplane-outline" />

                <MyGap jarak={5} />
                <MyInput label="Kode Booking" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        kode_booking: x
                    })
                }} iconname="bookmarks-outline" placeholder="masukan kode booking" />
                <MyGap jarak={5} />
                <MyInput label="Kode Penerbangan" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        kode_maskapai: x
                    })
                }} iconname="barcode-outline" placeholder="masukan kode penerbangan" />
                <MyGap jarak={5} />

                {/* keberangakatan */}
                <View style={{
                    marginVertical: 5,
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 10,
                    borderColor: colors.zavalabs,

                }}>

                    <MyInput label="Dari" onChangeText={x => {
                        setKirim({
                            ...kirim,
                            dep_bandara: x
                        })
                    }} iconname="airplane-outline" placeholder="masukan asal penerbangan" />
                    <View style={{
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            flex: 1,
                            paddingHorizontal: 5,
                        }}>
                            <View
                                style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    marginTop: 5,
                                }}>
                                <Icon type="ionicon" name="calendar-outline" color={colors.primary} size={16} />
                                <Text
                                    style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black,
                                        left: 10,
                                        fontSize: 12,

                                    }}>
                                    Tanggal berangkat
                                </Text>
                            </View>
                            <DatePicker
                                style={{ width: '100%' }}
                                date={kirim.dep_tanggal}
                                mode="date"
                                placeholder="Pilih tanggal"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        backgroundColor: colors.zavalabs,
                                        borderColor: colors.zavalabs,
                                        borderRadius: 10,
                                        // borderWidth: 1,
                                        height: 50,
                                        paddingLeft: 10,
                                        paddingVertical: 5,
                                        color: colors.black,
                                        fontSize: 14,
                                        fontFamily: fonts.primary[400],

                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => setKirim({ ...kirim, dep_tanggal: date })}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingHorizontal: 5,
                        }}>
                            <MyInput maxLength={5} value={kirim.dep_jam} keyboardType="number-pad" label="Jam Berangkat" onChangeText={x => {
                                console.log(maskJs('99:99', x))
                                setKirim({
                                    ...kirim,
                                    dep_jam: maskJs('99:99', x)
                                })
                            }} iconname="time-outline" placeholder="Jam berangkat" />
                        </View>

                    </View>

                </View>

                {/* keberangakatan */}
                <View style={{
                    marginVertical: 5,
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 10,
                    borderColor: colors.zavalabs,

                }}>

                    <MyInput label="Tujuan" onChangeText={x => {
                        setKirim({
                            ...kirim,
                            arr_bandara: x
                        })
                    }} iconname="airplane-outline" placeholder="masukan tujuan penerbangan" />
                    <View style={{
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            flex: 1,
                            paddingHorizontal: 5,
                        }}>
                            <View
                                style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    marginTop: 5,
                                }}>
                                <Icon type="ionicon" name="calendar-outline" color={colors.primary} size={16} />
                                <Text
                                    style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black,
                                        left: 10,
                                        fontSize: 12,

                                    }}>
                                    Tanggal Sampai
                                </Text>
                            </View>
                            <DatePicker
                                style={{ width: '100%' }}
                                date={kirim.arr_tanggal}
                                mode="date"
                                placeholder="Pilih tanggal"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        backgroundColor: colors.zavalabs,
                                        borderColor: colors.zavalabs,
                                        borderRadius: 10,
                                        // borderWidth: 1,
                                        height: 50,
                                        paddingLeft: 10,
                                        paddingVertical: 5,
                                        color: colors.black,
                                        fontSize: 14,
                                        fontFamily: fonts.primary[400],

                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => setKirim({ ...kirim, arr_tanggal: date })}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingHorizontal: 5,
                        }}>
                            <MyInput value={kirim.arr_jam} maxLength={5} label="Jam Sampai" onChangeText={x => {
                                console.log(maskJs('99:99', x))
                                setKirim({
                                    ...kirim,
                                    arr_jam: maskJs('99:99', x)
                                })
                            }} iconname="time-outline" placeholder="Jam sampai" />
                        </View>

                    </View>

                </View>


            </ScrollView>
            {!loading && <MyButton onPress={sendServer} title="Simpan Data" warna={colors.primary} Icons="shield-checkmark-outline" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})