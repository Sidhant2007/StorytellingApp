import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};
let stories = require("../temp_stories.json");

export default class StoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      speakerColor: "grey",
      speakerIcon: "volume-high-outline",
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
  async initiateTTS(title, author, story, moral) {
    const currentColor = this.state.speakerColor;
    this.setState({
      speakerColor: currentColor === "grey" ? "white" : "grey",
    });
    if (currentColor === "grey") {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak("The moral of the story is");
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <View styles={styles.cardContainer}>
            <View styles={styles.storyImage}>
              <Image
                style={{
                  width: Dimensions.get("window").width - 60,
                  height: 250,
                  borderRadius: 10,
                  resizeMode: "contain",
                }}
                source={require("../assets/story_image_1.png")}
              />
            </View>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <View style={styles.storyTitle}>
                  <Text style={styles.storyTitleText}>
                    {this.props.story.title}
                  </Text>
                </View>
                <View style={styles.storyAuthor}>
                  <Text style={styles.storyAuthorText}>
                    {this.props.story.author}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.initiateTTS(
                    this.props.route.params.story.title,
                    this.props.route.params.story.author,
                    this.props.route.params.story.story,
                    this.props.route.params.story.moral
                  );
                }}
              >
                <Ionicons
                  name={this.state.speakerIcon}
                  size={RFValue(30)}
                  color={this.state.speakerColor}
                  style={{ margin: RFValue(15) }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250),
  },
  titleContainer: { paddingLeft: RFValue(20), justifyContent: "center" },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
