"use client";

interface InputData {
  text: string;
  value: number;
}

const Input: React.FC<InputData> = ({ text, value }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: 700,
        justifyContent: "space-between",
      }}
    >
      <div>{text}</div>
      <input
        type="text"
        value={value}
        // onChange={handleValueChange}
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          borderWidth: 2,
          borderColor: "gray",
          width: 150,
          marginRight: 200,
        }}
        // disabled={!isEdit}
        disabled={true}
      />
    </div>
  );
};

export default Input;
