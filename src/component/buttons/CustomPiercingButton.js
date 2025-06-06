import { useTranslation } from 'react-i18next';

export default function CustomPiercingButton({ children, onClick,  maxWidth, selected, value, def ,buttonStyle,}) {
  const { t } = useTranslation();
  
  const activeColor = `bg-gradient-to-b from-white to-yellow-400 to-10%`;
  const color = `bg-[#e8e2e3]`;
  const buttonName = children.split("-")?.join(" ")

  const dynamicPadding = `${children.split(" ").length > 1 ? "py-2" : "py-2"}`; // Adjust this condition as needed

  return (
    <button
      ref={def}
      className={`${selected === value ? activeColor : color} w-full max-w-[${maxWidth}] ${dynamicPadding} px-2 uppercase md:text-2xl text-sm
      font-bold rounded-lg hover:bg-gradient-to-b from-white to-yellow-400 to-10% select-none`}
      onClick={onClick}
      style={buttonStyle}
    >
      {t(buttonName)}
    </button>
  );
}
