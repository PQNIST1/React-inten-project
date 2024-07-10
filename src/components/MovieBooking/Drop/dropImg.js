import React, {useEffect, useState} from "react";
import DropSelect from "./dropSelect";
import { ImgController } from "../../../controller/SliceReducer/img";


const DropImg = ({data, select}) => {
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        const imgData = data.image;
        const imageUrl = ImgController(imgData);
        setImageSrc(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
    }, [data]);
    return (
        <div className="relative overflow-hidden h-56   ">
            <img className="rounded-lg w-full h-full object-cover" src={imageSrc} alt="" />
            {select === data.name && <DropSelect/>}
        </div>
    )
}
export default DropImg;