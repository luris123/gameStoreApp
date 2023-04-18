import {
    StyleSheet,
    TextInput,
  } from "react-native";
  import React, { useState } from "react";


  
  const AppTextInput = ({placeholder, value, onchangetext, secureTextEntry, setEmail }) => {
    const [focused, setFocused] = useState(false);
    
    return (
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        value={value}
        onChangeText={onchangetext}
        secureTextEntry={secureTextEntry}
        
        placeholderTextColor={"#000000"}
        style={[
            {
                fontWeight: "500",
                backgroundColor: '#dae0eb',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 10,
                marginTop: 5,
                borderWidth: 1,
                borderColor: "#838c9c"
            },
            focused && {
                backgroundColor: '#dae0eb',
                borderWidth: 3,
                borderColor: "#0853d4",
                shadowOffset: { width: 4, height: 20 },
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowRadius: 20,
            },
          ]}
        
      />
    );
  };

  
  export default AppTextInput;
  
  const styles = StyleSheet.create({});