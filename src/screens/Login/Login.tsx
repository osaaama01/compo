import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { CustomButton } from '../../components/CustomButtonComponent';
import { InputField } from '../../components/InputFieldComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../Home/Home';
import { Provider } from 'react-redux';
import { getPeopleList, addActivity } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import reduxStore, { rootReducer } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  Login: undefined, // undefined because you aren't passing any params to the home screen
  Home: { users: string[] };
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type User = {
  name: string,
  password: string,
};

export type RootState = ReturnType<typeof rootReducer>

const Login = ({ navigation }: Props) => {

  const { users } = useSelector((state: RootState) => state.userReducer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(getPeopleList());
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const onLogin = () => {
    let check = -1;
    // users.map((user: User, index: number) => {
    //   if (user.name === username && user.password === password) {
    //     check = index;
    //   }
    // });
    // if (check != -1)
    //   navigation.navigate('Home', { users: users[check] });
    // else
    //   Alert.alert("Info", 'Invalid username or password', [{ text: 'OK' }]);
    auth().signInWithEmailAndPassword(username,password).then(()=>
    {
      navigation.navigate('Home', { users: users[check] });
    }).
    catch((error)=>
    {
      Alert.alert("Info", 'Invalid username or password', [{ text: 'OK' }]);
    })
  }

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={styles.Container}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Image
            style={styles.Image}
            source={require('../../assets/logos/logo.png')}
          />
        </View>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <View style={{ flex: 0.7, justifyContent: 'space-evenly' }}>
              <InputField placeholder="Username" onChangeText={(value: string) => setUsername(value)} />
              <InputField placeholder="Password" secureTextEntry={true} onChangeText={(value: string) => setPassword(value)} />
            </View>
            <Pressable style={{ flex: 0.1, alignSelf: 'center', justifyContent: 'flex-start' }} onPress={() => console.log("You should have remembered it")}>
              <Text style={{ color: 'black', fontWeight: '400' }}>Forgot Password?</Text>
            </Pressable>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <CustomButton text="LOGIN" foregroundColor="#009dff" backgroundColor="#009dff" onPress={onLogin} />
          </View>
        </View>
      </SafeAreaView>

    );
  }

  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
};


function MainLogin() {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const { Store, persistor } = reduxStore();
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLogin />
      </PersistGate>
    </Provider>
  );
}


const styles = StyleSheet.create({


  Container:
  {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  Image:
  {
    height: 120,
    width: 120,
    alignSelf: 'center',
    borderRadius: 60
  }

});

export default App;

