import { ValueBox } from "./ValueBox";
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export function ValueBoxGroup({ totalCredits, totalDebts }) {
    return (
        <>
            <h4 className="color1 !mb-5">Cálculo do Ciclo Atual:</h4>
            <div className="flex flex-wrap">
                <div className="!mr-2 rounded">
                    <ValueBox value={totalCredits} text={'Total de crédito'} bgColor="bgColor5" iconFontAwesome={faSquarePlus}></ValueBox>
                </div>
                <div className="!mr-2 rounded">
                    <ValueBox value={totalDebts} text={'Total de débitos'} bgColor="bgColor3" iconFontAwesome={faSquareMinus}></ValueBox>
                </div>
                <div className="!mr-2 rounded">
                    <ValueBox value={totalCredits - totalDebts} text={'Total consolidado'} bgColor="bgColor4" iconFontAwesome={faCreditCard}></ValueBox>
                </div>
            </div>
        </>
    )
}
