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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'

export default function SDaftar({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    console.warn(route.params);

    const [kirim, setKirim] = useState({
        tanggal: new Date(),
        jabatan: 'Mr.',
        nama: '',
        jenis: 'Dewasa',
        bagasi: '',
        kursi: '',
        kode: route.params.kode
    });

    useEffect(() => {
        getData('user').then(u => setKirim({
            ...kirim,
            fid_user: u.id
        }));


    }, []);


    const sendServer = () => {
        console.log(kirim);
        setLoading(true);
        setTimeout(() => {
            axios.post(apiURL + 'add2.php', kirim).then(res => {
                console.log(res.data);
                setLoading(false);
                Alert.alert('ETiket Murah', 'Data berhasil disimpan !')
                console.log(kirim);
                navigation.goBack();
            })
        }, 800)
    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 0.5,
                        paddingRight: 5,
                        paddingTop: 5,
                    }}>
                        <MyPicker iconname="grid" onValueChange={x => setKirim({
                            ...kirim,
                            jabatan: x
                        })} label="Titel" data={[
                            {
                                label: 'Mr.',
                                value: 'Mr.',
                            },
                            {
                                label: 'Mrs.',
                                value: 'Mrs.',
                            },
                            {
                                label: 'Miss.',
                                value: 'Miss.',
                            }
                        ]} />

                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <MyInput label="Nama Penumpang" onChangeText={x => {
                            setKirim({
                                ...kirim,
                                nama: x
                            })
                        }} iconname="person" placeholder="masukan nama penumpang" />
                    </View>
                </View>

                <MyGap jarak={10} />
                <MyPicker iconname="people" onValueChange={x => setKirim({
                    ...kirim,
                    jenis: x
                })} label="Titel" data={[
                    {
                        label: 'Dewasa',
                        value: 'Dewasa',
                    },
                    {
                        label: 'Anak',
                        value: 'Anak',
                    },
                    {
                        label: 'Bayi',
                        value: 'Bayi',
                    }
                ]} />

                <MyGap jarak={10} />
                <MyInput keyboardType="number-pad" label="Bagasi (Kg)" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        bagasi: x
                    })
                }} placeholder="masukan berat bagasi" iconname="cube" />

                <MyGap jarak={10} />
                <MyInput label="Nomor Kursi" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        kursi: x
                    })
                }} placeholder="masukan nomor kursi" iconname="file-tray" />





            </ScrollView>
            {!loading && <MyButton onPress={sendServer} title="Tambahkan" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})