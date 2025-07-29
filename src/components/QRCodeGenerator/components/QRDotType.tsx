import type { DotType } from "qr-code-styling";
import { type TQRControls } from "../QRGeneratorUtils";
import { useTranslation } from "../../../context/LanguageContext";
import squareImg from "../../../assets/img/dot_type/square.png";
import dotsImg from "../../../assets/img/dot_type/dots.png"
import roundedImg from "../../../assets/img/dot_type/rounded.png"
import extraRoundedImg from "../../../assets/img/dot_type/extra-rounded.png"
import classyImg from "../../../assets/img/dot_type/classy.png"
import classyRoundedImg from "../../../assets/img/dot_type/classy-rounded.png"

type DotTypeOption = {
  value: DotType;
  imageSrc: string;
};

const dotTypes: DotTypeOption[] = [
  { value: 'square', imageSrc: squareImg },
  { value: 'dots', imageSrc: dotsImg },
  { value: 'rounded', imageSrc: roundedImg },
  { value: 'extra-rounded', imageSrc: extraRoundedImg },
  { value: 'classy', imageSrc: classyImg },
  { value: 'classy-rounded', imageSrc: classyRoundedImg },
];

export default function QRDotType({ options, setOptions }: TQRControls) {
  const { t } = useTranslation();
  const handleDotTypeChange = (type: DotType) => {
    setOptions({ ...options, dotsOptions: { ...options.dotsOptions, type } });
  };
  return <>
    <h3>{t('dots_style_title')}</h3>
    <div className="qr-button-group">
      {dotTypes.map((dot) => {
        const label = t(`dot_type_${dot.value}` as any, dot.value);
        return (
          <button
            key={dot.value}
            onClick={() => handleDotTypeChange(dot.value)}
            className={`dot-button dot-style-button ${options.dotsOptions?.type === dot.value ? 'active' : ''}`}
            title={label}
          >
            <img src={dot.imageSrc} alt={label} />
          </button>
        )
      })}
    </div>
  </>
}