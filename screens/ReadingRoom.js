import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";

export default function ReadingRoom({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "서울캠퍼스", value: "seoul" },
    { label: "세종캠퍼스", value: "sejong" },
  ]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
  });

  return (
    <SafeAreaView>
      <View
        style={[
          styles.dropDownContainer,
          Platform.OS !== "android" ? { zIndex: 1 } : null,
        ]}
      >
        <DropDownPicker
          items={items}
          placeholder="Select a item"
          defaultValue={1}
          containerStyle={{ height: 40 }}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
            color: "#000",
          }}
          selectedLabelStyle={{ color: "#000" }}
          onChangeItem={(item) => this.changeItem(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
    backgroundColor: "#ecf0f1",
    padding: 8,
    minHeight: 500,
    marginBottom: -428,
  },
  test: {
    minHeight: 500,
    marginBottom: -428,
  },
  dropDownContainer: {
    marginHorizontal: 18,
    marginVertical: 18,
    elevation: 10,
  },
});
