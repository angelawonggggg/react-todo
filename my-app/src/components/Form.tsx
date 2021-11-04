import { count } from "console";
import React, { FormEvent, useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";


type FormState = {
  name: string;
  gender: string;
  peopleList: [];
};

export default function Form() {
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: "",
      gender: "",
    },
  });

  const [peopleList, setPeopleList] = useState([
    { name: "Celine", gender: "F" },
    { name: "Emilie", gender: "F" }]
  );

  function submit(people: FormState) {
    let newPeopleList = peopleList.concat([people]);
    setPeopleList(newPeopleList);
  }

  // const formData = JSON.stringify(peopleList);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <label>
          Name:
          <input
            {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })}
          />
        </label>

        <label>
          Gender:
          <select {...register("gender")}>
            <option value="F">F</option>
            <option value="M">M</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>

        <input type="submit" value="submit"/>
      </form>

      <pre>
        peopleList:
        {JSON.stringify(peopleList)}
      </pre>

      <div className="smallCard">
        {getValues("name")}({getValues("gender")})
      </div>
    </div>
  );
}
