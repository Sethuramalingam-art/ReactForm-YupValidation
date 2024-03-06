import React, { useState } from "react";

const FormWithoutYup = () => {
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

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords must match";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (!isValidAge(formData.age)) {
      newErrors.age =
        "You must be at least 18 years old and not older than 100 years";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (formData.interests.length === 0) {
      newErrors.interests = "Select at least one interest";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for basic phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    // Regular expressions for password validation
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  const isValidAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the form from submitting
    //the handleSubmit function is called when the form is submitted.
    //The event.preventDefault() line prevents the form from actually submitting, giving you a chance to validate or process the input before submitting it to the server or updating the state of your React component. When the user clicks the "Submit" button, the input value is logged to the console.
    const isValid = validateForm();
    if (isValid) {
      console.log("Form Submitted", formData);
    } else {
      console.log("Form Validation Failed");
    }
    console.log(formData);
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

export default FormWithoutYup;
