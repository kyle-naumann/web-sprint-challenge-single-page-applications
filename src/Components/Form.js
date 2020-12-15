import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "/Users/teamnaumann/Desktop/Lambda/Unit 2/web-sprint-challenge-single-page-applications/src/images/ivan-torres-MQUqbmszGGM-unsplash.jpg";
import "../App.css";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a valid name")
    .min(2, "That's not a valid input"),
  phone: yup
    .string()
    .required("Please enter a valid phone number")
    .matches(/^[0-9]{10}$/, "Please enter a valid phone number"),
});

const PizzaDiv = styled.div`
  width: 400px;
  background: #d12d21;
  color: white;
  padding: 2%;
  position: fixed;
  margin: 2% 15% 15% 30%;
  border-radius: 15px;
  overflow: hidden;
`;
 
const PizzaForm = (props) => {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    type: {
      Small: false,
      Medium: false,
      Large: false,
      XLarge: false,
      XXLarge: false,
      Meter: false,
    },
    additions: {
      pepperoni: false,
      ham: false,
      Chicken: false,
      Bacon: false,
    },
    instructions: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    schema.isValid(formState).then((valid) => setIsDisabled(!valid));
  }, [formState]);

  const validate = (e) => {
    e.persist();
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => setErrors({ ...errors, [e.target.name]: "" }))
      .catch((err) => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
  };

  const handleChanges = (e) => {
    if (e.target.type === "checkbox") {
      setFormState({
        ...formState,
        additions: {
          ...formState.additions,
          [e.target.value]: e.target.checked,
        },
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "name" || e.target.name === "phone") {
      validate(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
 axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => console.log(res.data) )
      .catch((err) => console.log(err));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.saveOrder(formState);
    setFormState({
      name: "",
      phone: "",
      type: {
        Small: false,
        Medium: false,
        Large: false,
        XLarge: false,
        XXLarge: false,
        Meter: false,
      },
      additions: {
        pepperoni: false,
        ham: false,
        Chicken: false,
        Bacon: false,
      },
      instructions: "",
    });
  };
  return (
    <div>
      <PizzaDiv>
        <h1>Customize your Pizza</h1>
        <form id="pizzaform"
        onSubmit={(e) => {
            if (props.orderToEdit) handleEdit(e);
            else handleSubmit(e);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label>
            {" "}
            Name -
            <input
              name="name"
              value={formState.name}
              placeholder="Enter Name..."
              onChange={handleChanges}
              data-cy="name"
            />
            {errors.name.length > 2 && (
              <p style={{ color: "black" }}>{errors.name}</p>
            )}
          </label>

          <label>
            {" "}
            Phone Number -
            <input
              name="phone"
              value={formState.phone}
              placeholder="Enter Phone number..."
              onChange={handleChanges}
              data-cy="phone"
            />
            {errors.phone.length > 0 && (
              <p style={{ color: "black" }}>{errors.phone}</p>
            )}
          </label>
          <label>
            {" "}
            Pizza Size -
            <select
              name="type"
              data-cy="type"
              defaultValue="Large"
              onChange={handleChanges}
            >
              <option data-cy="Small" value="Small">
                Small
              </option>
              <option data-cy="Medium" value="Medium">
                Medium
              </option>
              <option data-cy="Large" value="Large">
                Large
              </option>
              <option data-cy="XLarge" value="XLarge">
                X Large
              </option>
              <option data-cy="XXLarge" value="XXLarge">
                XX Large
              </option>
              <option data-cy="Meter" value="Meter">
                Meter
              </option>
            </select>
          </label>
          <fieldset style={{ border: "none" }}>
            <label>Toppings </label> <br />
            <label>
              {" "}
              <input
                type="checkbox"
                data-cy="pepperoni"
                name="pepperoni"
                onChange={handleChanges}
                value="pepperoni"
              />
              Pepperoni
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                data-cy="ham"
                name="ham"
                onChange={handleChanges}
                value="ham"
              />
              Ham
            </label>
            <br />
            <label>
              {" "}
              <input
                type="checkbox"
                data-cy="chicken"
                name="chicken"
                onChange={handleChanges}
                value="chicken"
              />
              Chicken
            </label>
            <label>
              {" "}
              <input
                type="checkbox"
                data-cy="bacon"
                name="bacon"
                onChange={handleChanges}
                value="bacon"
              />
              Bacon
            </label>
          </fieldset>

          <label>
            {" "}
            Special Instructions <br />
            <textarea
              placeholder="Anything else..."
              name="instructions"
              data-cy="instructions"
              onChange={handleChanges}
              value={formState.instructions}
            />
          </label>

          <button
            style={{
              background: "black",
              color: "white",
              borderRadius: "8px",
              width: "150px",
              height: "40px",
              fontSize: "1.2rem",
              border: "none",
              marginTop: "2%",
            }}
            type="submit"
            disabled={isDisabled}
            className="order-button"
            data-cy="submit"
          >
            Order Now
          </button>
        </form>
      </PizzaDiv>

      <img
        src={img}
        alt="pizza"
        style={{
          postion: "absolute",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default PizzaForm;
