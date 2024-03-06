import React, { useState } from "react";
import * as Yup from "yup";

const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
    country: "",
  });
  const [errors, setErrors] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
    birthDate: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the form from submitting
    //the handleSubmit function is called when the form is submitted.
    //The event.preventDefault() line prevents the form from actually submitting, giving you a chance to validate or process the input before submitting it to the server or updating the state of your React component. When the user clicks the "Submit" button, the input value is logged to the console.
    try {
      await validationSchema.validate(formData, { abortEarly: false }); //abortearly bydefault true which means if first field is error it wont check other field. Here we need to check all the fields
      console.log("Form Submitted", formData);
    } catch (errors) {
      let newErrors = {};

      errors.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests.filter((interest) => interest !== name);
    }
    setFormData({ ...formData, interests: updatedInterests });
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label>FirstName</label>
        <input
          type="text"
          value={formData.firstName}
          name="firstName"
          placeholder="Enter your first name"
          onChange={handleChange}
        />
        {errors?.firstName && <div className="error">{errors?.firstName}</div>}
        <br />
        <label>LastName</label>
        <input
          type="text"
          value={formData.lastName}
          name="lastName"
          placeholder="Enter your last name"
          onChange={handleChange}
        />
        {errors?.lastName && <div className="error">{errors?.lastName}</div>}
        <br />
        <label>Email</label>
        <input
          type="text"
          value={formData.email}
          name="email"
          placeholder="Enter your email name"
          onChange={handleChange}
        />
        {errors?.email && <div className="error">{errors?.email}</div>}
        <br />
        <label>phoneNumber</label>
        <input
          type="text"
          value={formData.phoneNumber}
          name="phoneNumber"
          placeholder="Enter your phoneNumber"
          onChange={handleChange}
        />
        {errors?.phoneNumber && (
          <div className="error">{errors?.phoneNumber}</div>
        )}
        <br />
        <label>password</label>
        <input
          type="password"
          value={formData.password}
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        {errors?.password && <div className="error">{errors?.password}</div>}
        <br />
        <label>confirm password</label>
        <input
          type="password"
          value={formData.confirmPassword}
          name="confirmPassword"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        {errors?.confirmPassword && (
          <div className="error">{errors?.confirmPassword}</div>
        )}
        <br />
        <label>age</label>
        <input
          type="number"
          value={formData.age}
          name="age"
          placeholder="Enter your age"
          onChange={handleChange}
        />
        {errors?.age && <div className="error">{errors?.age}</div>}
        <br />
        <label>gender</label>
        <select value={formData.gender} name="gender" onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors?.gender && <div className="error">{errors?.gender}</div>}
        <br />
        <label>interests</label>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={formData.interests.includes("coding")}
            onChange={handleCheckboxChange}
          />{" "}
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="games"
            checked={formData.interests.includes("games")}
            onChange={handleCheckboxChange}
          />{" "}
          Games
        </label>
        {errors?.interests && <div className="error">{errors?.interests}</div>}
        <br />
        <label>Birthdate</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          placeholder="enter the dateof birth"
          onChange={handleChange}
        />
        {errors?.birthDate && <div className="error">{errors?.birthDate}</div>}
        <br />
        <label>Country</label>
        <input
          type="radio"
          name="country"
          value="India"
          checked={formData.country === "India"}
          onChange={handleChange}
        />{" "}
        India
        <input
          type="radio"
          name="country"
          value="others"
          checked={formData.country === "others"}
          onChange={handleChange}
        />{" "}
        others
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormWithYup;
