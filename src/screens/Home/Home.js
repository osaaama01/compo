import React, { useEffect, useState, useRef } from "react";
import {
    Alert, FlatList, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View,
    Modal,
    ActivityIndicator
} from "react-native";
import { addFirebaseUser } from "../../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { InputField } from '../../components/InputFieldComponent'
import auth from '@react-native-firebase/auth';


export const HomeScreen = ({ route }) => {


    let { user } = useSelector(state => state.userReducer);

    if (user?.length) {
        return (
            <View style={styles.body}>
                <Text>user?.email</Text>
            </View>
        )
    }
    else {
        return (<View><Text>Loading user</Text></View>)
    }


};

export const Logout = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const isMountedVal = useRef(true);

    useEffect(() => {
        // console.log("UseEffect running");
        if (isMountedVal.current) {
            setTimeout(() => {
                // console.log("Call Back running");
                setIsLoading(false);
            }, 1000);
            isMountedVal.current = false;
            auth().signOut().then(() => console.log('User signed out!'));
        }

        return () => {
            console.log("Unmounting");
            navigation.navigate('Login', { users: [] });
        }
    });

    if (isLoading)
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Logging out...</Text>
            </View>
        );
    else {
        return null;
    }
}

export function Home({ navigation, route }) {

    const Drawer = createDrawerNavigator();
    const { user } = route.params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addFirebaseUser(user));
    });

    return (
        <Drawer.Navigator initialRouteName="HomeScreen" >
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    body:
    {
        flex: 1,
        backgroundColor: '#246EE9',
    },
    card:
    {
        height: 80,
        backgroundColor: '#3EB489',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: 1,
        marginTop: 20
    },
    text: {
        fontSize: 20,
        fontStyle: "normal",
        color: '#000000',
        fontFamily: 'ShadowsIntoLight-Regular'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 70,
        height: 40,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5,
        marginTop: 10,
        backgroundColor: "#2196F3",
    },
    buttonOpen: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center"
    }

})
