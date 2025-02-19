import React, { useState } from "react";
import LoginImg from "@/assets/images/login.png";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Button, TextInput } from "react-native-paper";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*+]).{8,30}$/;

// Zod schema for form validation.
const loginSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30, { message: "Password must be at most 30 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    register,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: LoginFormData) => {
    router.navigate("/dashboard");
  };

  // Navigate to the Sign Up screen
  const handleSignUp = () => {
    router.navigate("/auth/register");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={LoginImg} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      {/* Username */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Username"}
            error={!!errors.username}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username.message}</Text>
      )}

      {/* Password */}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Password"}
            error={!!errors.password}
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <View style={{ marginTop: 20, width: "100%" }}>
        {/* Sign Up Hyperlink */}
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.hyperlink}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    height: 40,
    width: "100%",
  },

  errorText: {
    color: "red",
    width: "100%",
    marginBottom: 10,
  },

  hyperlink: {
    color: "#007bff",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginBottom: 10,
  },
});
