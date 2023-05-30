import useForm from "../../utils/useForm";

export default function SellForm() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: "Austin",
    price: "2",
    descrption: "nice",
  });
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="name"
        value={inputs.name}
        onChange={handleChange}
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        placeholder="price"
        value={inputs.price}
        onChange={handleChange}
      />
      <button type="button" onClick={clearForm}>
        Clear
      </button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
}
