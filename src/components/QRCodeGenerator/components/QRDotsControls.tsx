import QRDotsColorSelector from "./QRDotsColorSelector";
import QRDotType from "./QRDotType";
import type { TQRControls } from "../QRGeneratorUtils";

export default function QRDotsControls({ options, setOptions }: TQRControls){

    return <div className="qr-section tool-panel">
        <QRDotType options={options} setOptions={setOptions} />
        <QRDotsColorSelector options={options} setOptions={setOptions} />
    </div>
}