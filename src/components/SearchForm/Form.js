import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ handleChange }) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <form className='form-search' onSubmit={(e) => e.preventDefault()}>
      <input
        type='text'
        placeholder='Search Movies'
        {...register("title_like", { validate: "Enter at leas 1 keyword" })}
        onChange={handleChange}
      />
      {errors.title_like ? <p>{errors.title_like.message}</p> : ""}
    </form>
  );
};

export default Form;
