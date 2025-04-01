import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ValueBox({value, text, bgColor, iconFontAwesome}){

    return(
        <div className={`flex justify-around !p-[20px] min-w-[200px] w-[400px] h-[400px] rounded-lg ${bgColor}`}>
            <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={iconFontAwesome} size="3x" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3><strong>{text}</strong></h3>
                <h4 className=''>{value}</h4>
            </div>
        </div>
    )
}