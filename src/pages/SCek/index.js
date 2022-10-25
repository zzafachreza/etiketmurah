import { Alert, StyleSheet, Text, View, Image, FlatList, Linking } from 'react-native'
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


export default function SCek({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([]);
    const [sisa, setSisa] = useState(0);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);


    const __getTransaction = () => {
        axios.post(apiURL + 'data2.php', {
            kode: route.params.kode
        }).then(rz => {
            console.log(rz.data);
            setData(rz.data)
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                margin: 5,
                padding: 10,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs
            }
            }>

                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 28
                        }}>{item.jabatan}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 28,
                            left: 5,
                        }}>{item.nama}</Text>

                    </View>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 28,
                        color: colors.primary,
                    }}>{item.bagasi} kg</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20
                    }}>{item.kursi}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    Alert.alert('ETiket Murah', 'Apakah akan hapus penumpang ?', [
                        {
                            style: 'cancel',
                            text: 'Batal'
                        },
                        {
                            style: 'default',
                            text: 'Hapus',
                            onPress: () => {
                                console.log(item.id);
                                axios.post(apiURL + 'delete_penumpang.php', {
                                    id_penumpang: item.id
                                }).then(res => {
                                    __getTransaction();
                                })
                            }
                        }
                    ])
                }} style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='trash' size={windowWidth / 25} color={colors.primary} />
                </TouchableOpacity>
            </View >
        )
    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    padding: 5,
                    flex: 1,
                }}>
                    <MyButton title="E-Tiket" Icons="document" onPress={() => navigation.navigate('STentang', {
                        pdf: 'https://etiketmurah.zavalabs.com/pdf/etiket.php?kode=' + item.kode
                    })} warna={colors.danger} />
                </View>
                <View style={{
                    padding: 5,
                    flex: 1,
                }}>
                    <MyButton title="Boarding Pass" Icons="airplane" onPress={() => navigation.navigate('STentang', {
                        pdf: 'https://etiketmurah.zavalabs.com/pdf/boarding.php?kode=' + item.kode
                    })} warna={colors.secondary} />
                </View>

            </View>


            <View style={{
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
                    <TouchableOpacity onPress={() => {
                        Alert.alert('ETiket Murah', 'Apakah akan hapus penumpang ?', [
                            {
                                style: 'cancel',
                                text: 'Batal'
                            },
                            {
                                style: 'default',
                                text: 'Hapus',
                                onPress: () => {
                                    console.log(item.id);
                                    axios.post(apiURL + 'delete_header.php', {
                                        kode: item.kode
                                    }).then(res => {
                                        Alert('Berhasil di hapus !');
                                        navigation.goBack();
                                    })
                                }
                            }
                        ])
                    }} style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Icon type='ionicon' name='trash' size={windowWidth / 25} color={colors.danger} />
                    </TouchableOpacity>
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
            </View>



            <FlatList data={data} renderItem={__renderItem} />

            <FloatingAction

                showBackground={false}

                onPressMain={x => navigation.navigate('SDaftar', item)}

            />



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})