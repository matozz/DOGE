import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Switch, Button } from 'react-native';
import { sizes, lightColors } from "./colorThemes";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

class FormCalendarScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            text: "",
            notification: false,
            obj: {
            }

        };
    }


     formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }



    async save(value) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue);


        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    createAgenda() {

        const DATE = this.formatDate(Date.now());
        const newAgendaObject = {
            [DATE]:[{
                id: DATE,
                name: this.state.text,
                height: this.state.value

            }],
             
        }

        this.save(newAgendaObject).then(console.log(newAgendaObject))
    }




    render() {
        return (
            <SafeAreaView style={{ flex: 1, paddingTop: 16 * 2 }} >

                <View style={{ flex: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', style: styles.header, }} >
                    <Text style={{ color: '#d7dbdd', fontSize: 30, fontWeight: '500' }}>AGENDA</Text>
                    <TouchableOpacity>
                        <View style={styles.avatar}>
                            <MaterialCommunityIcons name="view-dashboard" color={'#283747'} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{}} style={styles.divider} ></View>

                    <View style={{ flex: 0 }} margin={sizes.base}>
                        <View style={{ flex: 0 }} >
                            <Text style={{ color: '#9DA3B4' }}>Text</Text>
                        </View>
                        <TextInput
                            style={[styles.input, styles.inputView]}
                            // secureTextEntry={false}
                            autoComplete="off"
                            contextMenuHidden={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            placeholder="Eg. Go to the Beach..."
                            onChangeText={text => this.setState({ text: text })}


                        />
                    </View>


                    <View style={{}} style={styles.divider} ></View>

                    <View style={{ flex: 0 }} margin={sizes.base}>
                        <View style={{ flex: 0 }} >
                            <Text style={{ color: '#9DA3B4' }}>DateTime</Text>
                        </View>
                    </View>

                    <View style={{}} style={styles.divider} ></View>


                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}    >
                        <Text style={{ color: '#9DA3B4' }}>Alerts</Text>
                        <Switch trackColor={{ false: "#767577", true: "#616c80" }} thumbColor={this.state.notification ? "#283747" : "#d7dbdd"} value={this.state.notification}
                            onValueChange={() => this.state.notification ? this.setState({ notification: false }) : this.setState({ notification: true })}
                        />
                    </View>

                    <View style={{}} style={styles.divider} ></View>

                    <View style={{ flex: 0 }} margin={sizes.base}>
                        <View style={{ flex: 0 }} >
                            <Text style={{ color: '#9DA3B4' }}>Duration</Text>
                        </View>
                        <Text style={{ flex: 1, margin: 16 * 3, color: '#9DA3B4' }} >
                            {this.state.value && +this.state.value.toFixed(3)} Hours
                        </Text>

                        <Slider
                            //style={{ width: 200, height: 40 }}
                            minimumValue={1}
                            maximumValue={24}
                            value={1}
                            step={1}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="#283747"
                            onValueChange={value => this.setState({ value: value })}
                        />
                    </View>


                    <View style={{}} style={styles.divider} ></View>

                    <View style={{ flex: 1, margin: 16 * 3 }} ><Button onPress={() =>   this.props.navigation.navigate('Agenda')  } title="Done" /></View>



                </ScrollView>
            </SafeAreaView>
        );
    }
}

// ...


const styles = StyleSheet.create({


    avatar: {
        height: 16 * 2.4,
        width: 16 * 2.4,
        borderRadius: 16 * 1.2,
    },
    divider: {
        height: 0,
        margin: 16 * 2,
        borderBottomColor: '#d7dbdd',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 0,
        color: '#d7dbdd',
    },
    header: {
        paddingHorizontal: 16 * 2,
        paddingBottom: 8 * 2,
    },
    inputView: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: "#C5CCD6",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#283747',
        borderRadius: sizes.radius,
        fontSize: sizes.font,
        fontWeight: "500",
        color: '#283747',
        height: sizes.base * 3
    },


});

export default FormCalendarScreen;