import { useState } from "react";
import { useForm } from "react-hook-form";

type FormState = {
  vocab: string;
  gender: string;
};

export default function Form() {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      vocab: "",
      gender: "",
    },
  });

  const [vocabList, setVocabList] = useState<FormState[]>([]);

  function onSubmit(vocab: FormState) {
    if (vocabList) {
      let newVocabList = vocabList.concat(vocab);
      setVocabList(newVocabList);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Noun:
          <input {...register("vocab", { required: true })} />
        </label>

        <label>
          Genre:
          <select {...register("gender")}>
            <option value="F">Féminin</option>
            <option value="M">Masculin</option>
          </select>
        </label>

        <input type="submit" value="submit" />
      </form>

      <div className="vocabCardContainer">
        {vocabList
          ? vocabList.map((vocab) => {
              return (
                <div className="vocabCard">
                  {vocab.vocab}({vocab.gender})
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
