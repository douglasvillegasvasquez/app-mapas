import React, { Component } from "react";
import {
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  Platform,
  Animated,
  TouchableOpacity, KeyboardAvoidingView,StyleSheet,TextInput,Button
} from "react-native";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { width, height } = Dimensions.get("window");

const MAP_HEIGHT = height * 0.90;
const CARD_HEIGHT = height - MAP_HEIGHT - 20;
const CARD_WIDTH = 100;
const ACCENT_COLOUR = "#008489";

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
}



function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
function MessagesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mensagens!</Text>
      <Text>Boa tarde</Text>
    </View>
  );
}
function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
      title="Go to Details... again"
      onPress={() => navigation.push('Details')}
      />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      
    </View>
  );
}
function SavedScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Lugares Favoritos</Text>
      <Text>Boa tarde</Text>
    </View>
  );
}
function LoginScreen(){
  return(
  <KeyboardAvoidingView>
      <View style={{ justifyContent: 'center' }}>
    <View style={styles.containerLogo}>
    <Image 
      source={require('./assets/logo.png')}
      />
      </View>
    <View style={styles.container}>
    <TextInput
    style={styles.input}
    placeholder="Email"
    autCorrect={false}
    onChangeText={() => {
    
      
    }}
    />
    <TextInput
    style={styles.input}
    placeholder="Senha"
    autCorrect={false}
    onChangeText={() => {
    
      
    }}
    />
    <TouchableOpacity style={styles.btnSubmit}>
      <Text style={styles.submitText}>Acessar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btnRegister}>
      <Text style={styles.registerText}>Criar conta gratuita</Text>
    </TouchableOpacity>
  </View>
  </View>
  </KeyboardAvoidingView>
  );
}
const Tab = createBottomTabNavigator();
export default class App extends Component {
  scrollerRef = null;

  state = {
    properties: [
      {
        id: 1,
        title: "Sao Judas Tadeu",
        type: "Chat livre",
        bedCount: 1,
        price: "CHAT",
        rating: 5,
        reviewsCount: 75,
        imageUrl:
          "http://www.chicroomproperties.com/thumb/property-gallery/items/166/furnished-studio-flat-for-rent-mid-term-in-barcelona-gothic-2.jpg",
        coords: {
          latitude: -23.568993,
          longitude: -46.71379
        }
      },
      {
        id: 2,
        title: "Faria Lima",
        type: "Private room",
        bedCount: 1,
        price: "Chatzao",
        rating: 4,
        reviewsCount: 139,
        imageUrl:
          "https://www.designingbuildings.co.uk/w/images/a/a8/xStudioflat.jpg.pagespeed.ic.xN613dZkvW.jpg",
        coords: {
          latitude: -23.567256,
          longitude: -46.693959
        }
      },
      {
        id: 3,
        title: "Pinheiros",
        type: "Entire flat",
        bedCount: 2,
        price: "PinheirosChat",
        rating: 3,
        reviewsCount: 12,
        imageUrl:
          "http://www.chicroomproperties.com/thumb/property-gallery/items/166/furnished-studio-flat-for-rent-mid-term-in-barcelona-gothic-2.jpg",
        coords: {
          latitude: -23.566425,
          longitude: -46.703054
        }
      },
      {
        id: 4,
        title: "Paulista",
        type: "Private room",
        bedCount: 1,
        price: "Chat",
        rating: 2,
        reviewsCount: 255,
        coords: {
          latitude: -23.55858,
          longitude: -46.659353
        }
      },
      {
        id: 5,
        title: "Chat Cachoeirinha",
        type: "Entire home",
        bedCount: 1,
        price: "Chat",
        rating: 5,
        reviewsCount: 75,
        imageUrl:
          "http://www.chicroomproperties.com/thumb/property-gallery/items/166/furnished-studio-flat-for-rent-mid-term-in-barcelona-gothic-2.jpg",
        coords: {
          latitude: -23.4689,
          longitude: -46.663421
        }
      }
    ],
    selectedProperty: 0
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.scrollerRef &&
      prevState.selectedProperty !== this.state.selectedProperty
    ) {
      this.scrollerRef.scrollTo({
        x: this.state.selectedProperty * CARD_WIDTH,
        y: 0,
        animated: true
      });
    }
  }

  render() {
    const { properties, selectedProperty } = this.state;

    return (
      // The marginTop here is used to move the map above where the navigation would be
      <NavigationContainer>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: -23.56,
            longitude: -46.66,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01
          }}
          loadingEnabled
          showsUserLocation
        >
          {properties.map((property, index) => (
            <MapView.Marker key={property.id} coordinate={property.coords}>
              <View
                style={{
                  backgroundColor:
                    selectedProperty === index ? ACCENT_COLOUR : "#FFFFFF",
                  height: 30,
                  width: 45,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: selectedProperty === index ? "#FFFFFF" : "#000000"
                  }}
                >
                  {property.price}
                </Text>
              </View>
            </MapView.Marker>
          ))}
        </MapView>

        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          ref={ref => (this.scrollerRef = ref)}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 20,
            paddingBottom: 50,
            backgroundColor: "#FFFFFF"
          }}
          contentContainerStyle={{
            paddingRight: 40,
            paddingLeft: 20
          }}
          onMomentumScrollEnd={e => {
            this.setState({
              selectedProperty: Math.round(
                e.nativeEvent.contentOffset.x / CARD_WIDTH
              )
            });
          }}
        >
          {properties.map((property, index) => (
            <View
              key={property.id}
              style={{ width: CARD_WIDTH, marginHorizontal: 5 }}
            >
              <Image
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT
                }}
                source={{ uri: property.imageUrl }}
              />
              {selectedProperty === index && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 4,
                    width: "100%",
                    backgroundColor: ACCENT_COLOUR
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 4
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "bold"
                  }}
                >
                  {property.type.toUpperCase()}
                </Text>

                <View
                  style={{
                    backgroundColor: "#555555",
                    height: 2,
                    width: 2,
                    borderRadius: 2,
                    marginHorizontal: 4
                  }}
                />

                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  {property.bedCount} {property.bedCount === 1 ? "Usuario" : "Pessoa"}
                </Text>
              </View>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
              >
                {property.title}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "100" }}>
                {property.price} 
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 4
                }}
              >
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Icon
                      key={index}
                      color={ACCENT_COLOUR}
                      name={
                        index < property.rating
                          ? Platform.OS === "ios" ? "ios-star" : "md-star"
                          : Platform.OS === "ios"
                            ? "ios-star-outline"
                            : "md-star-outline"
                      }
                      size={14}
                    />
                  ))}
                <Text style={{ fontSize: 12, marginLeft: 4 }}>
                  {property.reviewsCount}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Settings') {
              return (
                <Ionicons
                  name={focused ? 'ios-person' : 'ios-person'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Explorar') {
              return (
                <Ionicons
                  name={focused ? 'ios-search' : 'ios-search'}
                  size={size}
                  color={color}
                />
              );
            }  
            
            else if (route.name =='Salvos'){
              return(
              <Ionicons
                  name={focused ? 'md-heart' : 'md-heart'}
                  size={size}
                  color={color}
                />
                );
            } else if (route.name =='Login'){
              return(
              <Image source={require('./assets/logo.png')}
                style={styles.img}
                />
                );
            } else if (route.name =='Messages'){
              return(
              <HomeIconWithBadge
                  name={focused ? 'ios-mail' : 'ios-mail'}
                  size={size}
                  color={color}
                />
                );
            }

          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        
        <Tab.Screen name="Explorar" component={LoginScreen}  options={{ title: 'Explorar' }} />
      <Tab.Screen name="Salvos" component={SavedScreen} options={{ title: 'Salvos' }} />
      
      <Tab.Screen name="Login" component={DetailsScreen} options={{ title: '' }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ title: 'Mensagens' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Perfil' }} />
      </Tab.Navigator>
    </NavigationContainer>
  


     
    );
  }
}
const styles = StyleSheet.create({
  view:{
    backgroundColor:'#000'
  },
  container: {
    
    alignItems: 'center',
    width:'100%'
  },
  img:{
    marginTop:15,
    height:45,
    width:45,
  },
  containerLogo:{
   marginTop:50,
   justifyContent: 'center',
   alignItems:'center',
     
  },
   background:{
     flex:1,
     alignItems:'center',
     alignContent: 'center',
     backgroundColor: '#191919'
 
   },
   btnSubmit:{
     color:'#35AAFF',
     backgroundColor:'#ff5722',
     width:'90%',
     height:45,
     alignItems:'center',
     justifyContent: 'center',
     borderRadius:7
   },
   submitText:{
     color:'#FFF',
     fontSize:18,
     
   },
   btnRegister:{
     marginTop:15,
 
   },
   registerText:{
     color:'#000'
   },
   input:{
     backgroundColor: '#faf6f6',
     width:'90%',
     marginBottom:15,
     color: '#222',
     fontSize: 16,
     borderRadius: 7,
     padding:10,
   }
  });