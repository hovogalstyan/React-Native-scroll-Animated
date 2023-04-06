import React, {  useEffect,  useRef, useState } from "react";
import { StyleSheet, View,  ActivityIndicator, Image, Text, Animated, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Store/Api/Api";
import FontAwesome from "react-native-vector-icons/Fontisto";
import { retry } from "@reduxjs/toolkit/query";

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const UsersList = () => {
  const state = useSelector(state => state.UserSlice);
  const [activeLoadMore, setActiveLoadMore] = useState(true);
  const [currentItems, setCurrentItems] = useState(9);
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const sliceItems = state.users.slice(0, currentItems);
  const renderLoading = () => {
    return <View style={{
      width: "100%",
      justifyContent: "center",
      alignItems:'center',
      padding: 20,
    }}>
      <ActivityIndicator size="large" color="#aaa" />
    </View>;
  };

  const loadMore = () => {
    if (state.users.length >= currentItems) {
     setTimeout(()=>{
       setCurrentItems(currentItems +  9);
     },1000)
    }
  };

  const onRefresh = () => {
    dispatch(getUsers());
    setCurrentItems(9);
    setActiveLoadMore(false)
  };
  useEffect(() => {
    console.log(currentItems);
  }, [currentItems]);
  return (
    state.users &&
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      data={sliceItems}
      ListFooterComponent={activeLoadMore ?  renderLoading : null}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
      contentContainerStyle={{ paddingTop: SPACING }}
      refreshControl={<RefreshControl refreshing={state.loading} onRefresh={onRefresh} />}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      renderItem={({ item, index }) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * (index),
          ITEM_SIZE * (index + 2),
        ];
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * (index),
          ITEM_SIZE * (index + .5),
        ];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0],
        });
        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0],
        });
        return <Animated.View style={{
          flexDirection: "row",
          backgroundColor: "red",
          padding: SPACING,
          marginBottom: SPACING,
          borderRadius: SPACING,
          opacity,
          transform: [{ scale }],
        }}>
          <Image source={{ uri: item.picture.medium }} style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: 50,
          }}
          />
          <View style={{
            paddingLeft: SPACING,
          }}>
            <Text style={{
              fontSize: SPACING,
            }}>{item.name.first} {item.name.last}</Text>
            <Text>{item.email}</Text>
          </View>
        </Animated.View>;
      }}
      keyExtractor={(_, index) => index}
    />
  );
};
const styles = StyleSheet.create({
  userBlock: {
    flex: 1,
    paddingHorizontal: 5,
  },
  refresh_styles: {
    marginTop: 60,
  },
});
export default UsersList;
