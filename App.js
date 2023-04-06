import React  from "react";
import { SafeAreaView,StyleSheet } from "react-native";
import UsersList from "./Componets/UsersList";


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
        <UsersList/>
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'blue',
    paddingHorizontal:7
  }
})
export default App;
