import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import * as React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      previewImage: "image1",
      dropDownHeight: 40,
    };
  }
  async loadFonts() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontsLoaded: true,
    });
  }
  componentDidMount() {
    this.loadFonts();
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let previewImages = {
        image1: require("../assets/story_image_1.png"),
        image2: require("../assets/story_image_2.png"),
        image3: require("../assets/story_image_3.png"),
        image4: require("../assets/story_image_4.png"),
        image5: require("../assets/story_image_5.png"),
      };
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                  marginLeft: 10,
                }}
              />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Story</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={previewImages[this.state.previewImage]}
                style={styles.previewImage}
              />
              <View style={{ height: RFValue(this.state.dropDownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "image 1", value: "image1" },
                    { label: "image 2", value: "image2" },
                    { label: "image 3", value: "image3" },
                    { label: "image 4", value: "image4" },
                    { label: "image 5", value: "image5" },
                  ]}
                  onOpen={() => {
                    this.setState({ dropDownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropDownHeight: 40 });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10,
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  labelStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  dropDownStyle={{
                    backgroundColor: "red",
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      previewImage: item.value,
                    })
                  }
                />
              </View>
              <TextInput
                style={styles.inputFont}
                onChangeText={(text) => this.setState({ text })}
                placeholder={"Title"}
                placeholderTextColor={"white"}
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(text) => this.setState({ text })}
                placeholder={"Description"}
                placeholderTextColor={"white"}
                multiline={true}
                numberOfLines={4}
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(text) => this.setState({ text })}
                placeholder={"Story"}
                placeholderTextColor={"white"}
                multiline={true}
                numberOfLines={20}
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(text) => this.setState({ text })}
                placeholder={"Moral of the Story"}
                placeholderTextColor={"white"}
                multiline={true}
                numberOfLines={4}
              />
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#15193c" },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: { flex: 0.07, flexDirection: "row" },
  appIcon: { flex: 0.3, justifyContent: "center", alignItems: "center" },
  iconImage: { width: "100%", height: "100%", resizeMode: "contain" },
  appTitleTextContainer: { flex: 0.7, justifyContent: "center" },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  fieldsContainer: { flex: 0.85 },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: { marginTop: RFValue(15) },
  inputTextBig: { textAlignVertical: "top", padding: RFValue(5) },
});
