import * as React from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator as createStackNavigator } from "@react-navigation/native-stack";

const Stack = createStackNavigator();

function InfoModal({
                       isVisible,
                       onClose,
                       title = "",
                       description = "",
                       buttonText = "OK",
                       secondButtonText = "",
                       secondAction,
                       thirdButtonText = "",
                       thirdAction,
                       bgColor = "black"
                   }) {
    return (
        <Modal isVisible={isVisible}>
            <View style={{
                backgroundColor: bgColor,
                borderRadius: 12,
                padding: 24,
                minWidth: 260
            }}>
                {title ? (
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 12 }}>{title}</Text>
                ) : null}
                <Text style={{ color: "#eee", marginBottom: 18 }}>{description}</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                    <Button title={buttonText} onPress={onClose} />
                    {secondButtonText
                        ? <Button title={secondButtonText} onPress={secondAction} />
                        : null}
                    {thirdButtonText
                        ? <Button title={thirdButtonText} onPress={thirdAction} />
                        : null}
                </View>
            </View>
        </Modal>
    );
}

function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Show Modal" onPress={() => setModalVisible(true)} />
            {modalVisible &&<InfoModal
                isVisible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Second" }]
                    });
                }}
                title="Home Modal"
                description="This is a test modal on the Home screen."
                buttonText="RESET NAVIGATION"
            />
            }
        </View>
    );
}

function SecondScreen() {
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
        setModalVisible(true);
        }, 1000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Second Screen</Text>
            {modalVisible &&<InfoModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Second Modal"
                description="This modal appears when SecondScreen is loaded."
                buttonText="CLOSE"
                bgColor='red'
            />}
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"
            screenOptions={{
            headerShown: false,
            animation: 'none'
            }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Second" component={SecondScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
