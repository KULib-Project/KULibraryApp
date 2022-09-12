import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Styles,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSession } from "expo-auth-session";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

const NV_APP_ID = "7XmyJIpyoR1cwlKpQVPB";
const NV_APP_SECRET = "0fjIeLW6Kb";
const STATE_STRING = "YOUR_SECRET_STRING";

export default function LoginScreen({ navigation }) {
  //useState(), token/code/user
  const [token, setToken] = useState();
  const [code, setCode] = useState();
  const [user, setUser] = useState();

  //authsession
  async function handlePressAsync() {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);
    console.log(encodeURIComponent(redirectUrl));

    const result = await AuthSession.startAsync({
      authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NV_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&state=${STATE_STRING}`,
    });

    console.log("result", result);

    setCode(result.code);

    handleGetAccess();
  }

  //http data request
  async function handleGetAccess() {
    const {
      data: { access_token },
    } = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NV_APP_ID} &client_secret=${NV_APP_SECRET} &code=${code}&state=${STATE_STRING}`
    );

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    setToken(data.access_token);

    const { data } = await axios.get(
      "https://openapi.naver.com/v1/nid/me",
      config
    );
    console.log(data);
    setUser(data);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressAsync}>
        <Text>네이버 아이디로 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
