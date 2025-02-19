import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { Button, RadioButton, TextInput } from "react-native-paper";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*+]).{8,30}$/;
const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];
// Zod schema for form validation.
const signUpSchema = z
  .object({
    firstName: z.string().nonempty({ message: "First name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Gender is required" }),
    }),
    mobile: z.string().nonempty({ message: "Mobile number is required" }),
    email: z.string().email({ message: "Email address is required" }),
    country: z.string().nonempty({ message: "Country is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(30, { message: "Password must be at most 30 characters" })
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number and special character (-!@#$%^&*+)",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must agree with Terms & Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();

  const {
    register,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      mobile: "",
      email: "",
      country: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  const router = useRouter();

  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch the country list from the REST API.
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const data = await response.json();
        // Format countries
        const formatted = data
          .map((item: any) => ({
            label: item.name.common,
            value: item.name.common,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label));
        setCountries(formatted);
      } catch (error) {
        console.error("Error fetching countries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = (data: SignUpFormData) => {
    // Navigate to the Login screen after successful sign up.
    router.navigate("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* First Name */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"First Name"}
            error={!!errors.firstName}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && (
        <Text style={styles.errorText}>{errors.firstName.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Last Name"}
            error={!!errors.lastName}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && (
        <Text style={styles.errorText}>{errors.lastName.message}</Text>
      )}

      {/* Gender Radio Buttons */}
      <View style={{ marginTop: 10 }}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioContainer}>
          {GENDER_OPTIONS.map((option) => (
            <View key={option.value} style={styles.radioButton}>
              <RadioButton
                // key={option.value}
                value={watch("gender")}
                status={
                  watch("gender") === option.value ? "checked" : "unchecked"
                }
                onPress={() => {
                  setValue(
                    "gender",
                    option.value as "male" | "female" | "other"
                  );
                }}
              />
              <Text>{option.label}</Text>
            </View>
          ))}
        </View>
      </View>
      {errors.gender && (
        <Text style={styles.errorText}>{errors.gender.message}</Text>
      )}

      {/* Mobile Number */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Phone Number"}
            error={!!errors.mobile}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="mobile"
      />
      {errors.mobile && (
        <Text style={styles.errorText}>{errors.mobile.message}</Text>
      )}

      {/* Email */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Email"}
            error={!!errors.email}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Country Dropdown */}
      <View style={{ marginTop: 10 }}>
        <Text style={styles.label}>Select Country</Text>
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, value } }) => (
            <View>
              <Picker
                style={styles.pickerContainer}
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
              >
                <Picker.Item label="Select Country" value="" />
                {countries.map((country) => (
                  <Picker.Item
                    key={country.value}
                    label={country.label}
                    value={country.value}
                  />
                ))}
              </Picker>
            </View>
          )}
        />
      </View>

      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {errors.country && (
        <Text style={styles.errorText}>{errors.country.message}</Text>
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
            secureTextEntry
            error={!!errors.password}
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

      {/* Confirm Password */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Confirm Password"}
            error={!!errors.confirmPassword}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      {/* Terms & Conditions Checkbox */}
      <Controller
        control={control}
        name="terms"
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={value}
              onValueChange={onChange}
              color={value ? "#007BFF" : undefined}
            />
            <Text style={styles.checkboxLabel}>
              Agree with Terms & Conditions
            </Text>
          </View>
        )}
      />
      {errors.terms && (
        <Text style={styles.errorText}>{errors.terms.message}</Text>
      )}

      {/* Sign Up Button */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Sign Up
      </Button>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
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
  },
  pickerContainer: {
    // height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonSelected: {},
  radioText: {
    color: "#000",
  },
  radioTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
